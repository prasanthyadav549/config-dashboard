import { Card, CardContent, Typography, Grid } from '@mui/material';
import React from 'react';

const ProductsList = ({ products }) => {
  return (
    <>
    <Typography
          sx={{
            ml:'auto',
            mr:'auto',
            mt: 2,
            mb: 2,
            color: 'red'
          }}
          variant='h4'
          component= 'div'
          >
            Recommended Products
          </Typography>
    <Grid container spacing={2} 
    // sx={{
    //   margin: '16px'
    // }}
    >  
      {products.map((product, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ minWidth: 275, display: 'flex', flexDirection: 'column', height: '100%',
          background:'black'
           }}>
            <CardContent sx={{ flex: 1,
            color: 'yellow'
             }}>
              <Typography variant="h5" component="div">
                {product.itemShortDesc}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default ProductsList;
