from typing import List, Dict
from datetime import datetime
#from llama3 import Llama3Model
from .models import ComplianceRecord
from transformers import AutoTokenizer, pipeline
from tqdm import tqdm
import re
import torch
import json

if torch.cuda.is_available():
    torch.cuda.set_device(0)
else:
    print("CUDA is not available. Using CPU instead.")
model_id = "unsloth/llama-3-8b-Instruct-bnb-4bit"
device = torch.device(f'cuda:0')
text_generator = pipeline(
        "text-generation",
        model=model_id,
        model_kwargs={
            "torch_dtype": torch.float16,
            "quantization_config": {"load_in_8bit": True},
            "low_cpu_mem_usage": True,
        },
        device_map="auto"
    )
model = text_generator.model
tokenizer = AutoTokenizer.from_pretrained(model_id)

def analyze_compliance_data(compliance_records: List[ComplianceRecord]) -> Dict[str, int]:
    data_for_analysis = [
        f"Date: {record.date_recorded}, Metric: {record.metric}, Result: {record.result}, Status: {record.status}"
        for record in compliance_records
    ]
    
    multi_line_string = '\n'.join(data_for_analysis)

    system_prompt = """I want you to analyze given compliance records for the supplier and identify patterns in only non-compliance status. Provide categorized issues (e.g., 'delivery delays', 'quality inconsistencies') output as a json with categorized issues as keys and counts as values for those keys. Dont give me nested JSON output"""
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": multi_line_string}
    ]
    prompt = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    input_ids = tokenizer(prompt, return_tensors="pt").input_ids.to(device)
    outputs = model.generate(
        input_ids=input_ids,
        max_new_tokens=500,
        do_sample=True,
        top_p=0.95,
        temperature=0.6,
    )
    response = outputs[0][input_ids.shape[-1]:]
    categorized_issues = tokenizer.decode(response, skip_special_tokens=True)
    print(categorized_issues)
    json_start = categorized_issues.find('{')
    json_end = categorized_issues.rfind('}') + 1
    json_output = categorized_issues[json_start:json_end]
    categorized_issues_dict = eval(json_output)
    return {k: int(v) for k, v in categorized_issues_dict.items()}
    ''''
    try:
        categorized_issues_dict = eval(categorized_issues)
        if not isinstance(categorized_issues_dict, dict):
            raise ValueError("Output is not a valid dictionary")
        return {k: int(v) for k, v in categorized_issues_dict.items()}
    except:
        return {"parsing_error": 1}'''

def generate_compliance_suggestions(categorized_issues: Dict[str, int]) -> str:
    system_prompt = "Based on the following categorized compliance issues, generate specific suggestions for improving supplier compliance. Provide a list of 3-5 actionable suggestions to improve compliance. Format the response as a JSON array of strings."
    
    issues_str = ", ".join([f"{k}: {v}" for k, v in categorized_issues.items()])
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": issues_str}
    ]
    
    prompt = tokenizer.apply_chat_template(
        messages,
        tokenize=False,
        add_generation_prompt=True
    )
    
    input_ids = tokenizer(prompt, return_tensors="pt").input_ids.to(device)
    
    outputs = model.generate(
        input_ids=input_ids,
        max_new_tokens=500,
        do_sample=True,
        top_p=0.95,
        temperature=0.6,
    )
    
    response = tokenizer.decode(outputs[0][input_ids.shape[-1]:], skip_special_tokens=True)
    print(response)
    json_start = response.find('[')
    json_end = response.rfind(']') + 1
    suggestions = response[json_start:json_end]
    insights = []
    insights = [suggestion.strip() for suggestion in suggestions.split(",")]
    print(insights)
    '''
    if json_start != -1 and json_end != -1:
        suggestions = response[json_start:json_end]
        try:
            suggestions = json.loads(json_str)
            if isinstance(suggestions, list) and 3 <= len(suggestions) <= 5:
                return json.dumps(suggestions)
        except json.JSONDecodeError:
            pass
    
    # Fallback if JSON parsing fails or doesn't meet criteria
    suggestions = [s.strip('- ') for s in response.split('\n') if s.strip()]
    suggestions = suggestions[:min(5, max(3, len(suggestions)))]'''
    return insights
'''
def assess_weather_impact(delivery_date: datetime, latitude: float, longitude: float) -> str:
    # This function would typically call a weather API to get historical weather data
    # For this example, we'll use a mock prompt
    prompt = f"""Assess the potential weather impact on a delivery scheduled for {delivery_date} at coordinates ({latitude}, {longitude}).
    Determine if there were any severe weather conditions that could have caused a delivery delay.
    Respond with either "Excused - Weather Delay" or "No significant weather impact"."""

    response = llama3.generate(prompt, max_tokens=50)

    return response.strip()'''
