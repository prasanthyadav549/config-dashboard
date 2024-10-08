import { Button } from '@mui/material';
import React from 'react';

const CustomButton = ({ value, handleReportChange, isActive }) => {

    // console.log('active', isActive);
    return (
        <Button
    onClick={handleReportChange}
    sx={{
        backgroundColor: isActive ? 'black !important' : 'initial',
        color: isActive ? 'white' : 'black',
        '&:hover': {
            backgroundColor: isActive ? 'black' : 'rgba(0, 0, 0, 0.08)', // Ensure hover state is controlled
        },
    }}
>
    {value}
</Button>

    );
};

export default CustomButton;
