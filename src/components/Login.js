import * as React from 'react';
import {useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';
import GoogleButton from 'react-google-button';
import axios from 'axios'

 
export default function SignIn({setAlert, setProducts,setCustomerNum, setCustomerName}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();

  const handleSubmit = async() => {
    if(!email || !password){
      setAlert({open:true,message:"Please enter email and password",type:"error"});
      return;
  }

try {
  const {data}= await axios.post('http://localhost:8080/login', {
        email: email,
        password: password
},
{method:'GET',
  headers: {
     'Content-Type': 'application/json',
  },
}
  )
  setProducts(data.products);
  setCustomerNum(data.userId)
  if(data.userId === 6276027707) {
     setCustomerName("Giel's Automotive")
  }
  else if(data.userId === 9210008799) {
     setCustomerName("Goodyear #2264 Gadsden");
  }
  else if(data.userId === 1001019472) {
     setCustomerName("Mahone Tire Service")
  }
  else if(data.userId === 1217004036) {
    setCustomerName("DNU Leeson")
  }
  else if(data.userId === 1872856362) {
    setCustomerName("Integrity Diesel Repair")
  }
   
  setAlert({open:true,message:`${email} is successfully logged in`,type:"success"});
//setAlert({open:true,message:`user is successfully logged in`,type:"success"});
  navigate('/success-login');
}
catch (error) {
  console.log(error);
  setAlert({open:true,message:error.message,type:"error"});
  return ;
}
  };

  const signInWithGoogle = () => {
    return ;

  }

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"
          sx={{
            color:'black'
          }}
          >
            Sign in
          </Typography>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
               value = {email}
               onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value = {password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,
              background:'black'
               }}
              onClick={handleSubmit}
            >
           <Typography variant="" component="span"
              sx={{
                color: 'yellow'
              }}
              >
                Sign in
              </Typography>
            </Button>
            <Grid container>
              <Grid item>
                <Link
                 to="/sign-up" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box  >
                  <span>
                    OR
                  </span>
                  <GoogleButton
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
        </Box> 
      </Container>
   
  );
}