import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import SignIn from './components/Login'
import moment from 'moment-timezone';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alert from './components/Alert';
import { Home, TableComponent } from './Pages';
import axios from 'axios';
import ModelComponent from './components/Model';
import CmResponse from './Pages/CmResponse';
import { ViolationsTable } from './components';
import { FitmentState } from './Context';

function App() {

  const {token,selectedLineReview,selectedReport,selectedPartType,alert,setAlert} = FitmentState()
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const [formValues, setFormValues] = useState({
    ENABLE_CONFIG: "Y", // Default value for ENABLE_CONFIG
    PRODUCT_LINE: "",
    BASE_LINE: "",
    BASE_BRANDS: "",
    COMP_LINE: "",
    COMP_BRANDS: "",
    PL_LINE: "",
    PL_BRANDS: "",
    PART_TYPE_FILTER: "",
  });

  
  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);


  useEffect(()=> {
    console.log('SelectedlineReview:', selectedLineReview);
  },[selectedLineReview])

   //  token,result,insertRowInSnowflake


  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
         {/* <Route path="/" element = {<SignIn/>}/> */}
         <Route path="/" element = {<CmResponse />}/>
        </Routes>
        <Alert alert={alert} setAlert={setAlert} />
      </div>
    </Router>
  );
}

export default App;