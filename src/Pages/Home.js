import { Container, Paper, Table, TableContainer, Typography } from '@mui/material'
import React, { useState } from 'react'

const Home = () => {
    const [header, setHeader] = useState("Fitment Configuration Management")
    return (
        <Container style = {{textAlign: "center"}}>
            <Typography
                variant="h6"
                style = {{margin: 18, fontFamily: "Montserrat"}}
            >
                {header}
            </Typography>
            <TableContainer component = {Paper}>
                <Table >
                    
               </Table>
        </TableContainer>
        </Container>
    )
}

export default Home
