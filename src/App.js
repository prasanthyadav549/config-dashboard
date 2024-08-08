import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alert from './components/Alert';
import { Home, TableComponent } from './Pages';

function App() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhYXBub25wcm9kLkFBUF9QUk9EVUNUX1BJTV9ERVZfVVNFUi5TSEEyNTY6alFOMjBsR0JXRnZLN2VjQlprZ3YxNDBkVGwrZkd4VU1EMWZkMXpuQkFmND0iLCJzdWIiOiJhYXBub25wcm9kLkFBUF9QUk9EVUNUX1BJTV9ERVZfVVNFUiIsImlhdCI6MTcyMzA5MDYxMCwiZXhwIjoxNzI1NjgyNjEwfQ.QyNnEI4QXIUQrfC4tjThkyzuhBk4J4nuPV2DhaIfliOPtI-kKyiY7T7jhK_c_JLg7xZaQkjzd2nC5edqQdNT1q61Hi8iDvcD-bthNFUpiQ6nUDXJ5rhhVVAxcz5i0_KD0bhcRHrTDXtz-vbXV_0YJhb-CLvbQeeH44gN8f6zspXTxwYkMwSdBccML-KiCtkao2fZJHHmReVAyoePRlkEVk4Ysc8Uo0Msok6bN1QM9yQp2lGzFpIXt8Ni6lnHJONeTfj3fam99caO9gg3C13nqR5WcyDh4CGyAkQk0eKpyrlZLC3YOyLWT5qi4GNW2qBK9Xl6vQEtOcy612BMe7Iz2Q');
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Token:", token);
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* <Route path="/" element={<SignIn setAlert={setAlert} setProducts={setProducts} setCustomerNum={setCustomerNum} setCustomerName={setCustomerName} />} />
          <Route path="/sign-up" element={<SignUp setAlert={setAlert} />} />
          <Route path="/success-login" element={<ProductsList products={products} />} /> */}
          <Route path="/" element={<TableComponent />} />
        </Routes>
        <Alert alert={alert} setAlert={setAlert} />
      </div>
    </Router>
  );
}

export default App;
