import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

export default function MenuAppBar() {
  const navigate = useNavigate();

  const logOut =  () => {
    

    
    // setAlert({
    //   open: true,
    //   type: 'success',
    //   message: 'Logout Successfull !',
    // });

    navigate('/'); // Redirect to the home page
  };

  return (
    <div>
     
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static"
           sx={{
    backgroundImage: `linear-gradient(90deg, black 0%, black 100%)`
  }}
          >
            <Toolbar>
            <img  src='/advance-logo.png' alt='Advance Auto Parts'
              style ={{
                width: '150px',
                height: 'auto',
                marginRight: '10px',
                marginLeft: '0px'
              }}
            />
              <Typography variant="h6" component="span"
              sx={{
                color: 'yellow'
              }}
              >
                Fitment Configuration Dashboard
              </Typography>
              <Box sx={{ flexGrow: 1 }} />


              {/* {user && (
                <Button variant="contained" onClick={logOut}>
                  <Typography variant="h6" component="span">
                    LogOut
                  </Typography>
                </Button>
              )} */}
              {/* {
                customerNum && (
                  <>
                  <Typography variant="h6" component="span"
                   sx={{
                color: 'yellow'
              }}
                  >
                       Name:{customerName}
                  </Typography>
                  <div
                  style={{marginLeft: '10px'}}
                  >
                  <Typography variant="h6" component="span"
                  sx={{
                color: 'yellow'
              }}
                  >
                       Id:{customerNum}
                  </Typography>
                  </div>
                  </>
                )
              } */}
            </Toolbar>
          </AppBar>
        </Box>
      
    </div>
  );
}
