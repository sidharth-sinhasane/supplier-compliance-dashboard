// App.jsx
import { useState } from 'react'
import './App.css'
import { PageContent } from './components/content';
import {TopBar} from './components/topBar'


function App() {
   // Add logging
  const [currentPage, setCurrentPage] = useState("home")
  
  return (
    <div >
      <TopBar setCurrentPage={setCurrentPage} />
      <PageContent currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  )
}

export default App;