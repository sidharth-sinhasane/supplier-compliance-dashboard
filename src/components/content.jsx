import { HomePage } from "./homePage"
import { NewSupplier } from "./newSupplier"
import { SupplierPage } from "./supplierPage"
import { UploadPage } from "./uploadPage"

export const PageContent = ({currentPage,setCurrentPage}) => {

    if(currentPage == "home"){
        return <HomePage/>
    }
    else if(currentPage == "suppliers-view"){
        return <SupplierPage setCurrentPage= {setCurrentPage}/>
    }
    else if(currentPage == "upload-compliance"){
        return <UploadPage/>
    }
    else if(currentPage == "new-supplier"){
        return <NewSupplier/>
    }
    return <div>
        page not found
    </div>
}


  