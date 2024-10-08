import { Container, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react'

const TableComponent = ({tableColumns, rows}) => {


    const [header, setHeader] = useState("Fitment Report");
    const columns = useMemo(()=> {
      return  tableColumns?.map((value)=> (
            {
                accessorKey: value,
                header: value
            }
        ))
    },[tableColumns])

    const data = useMemo(() => {
        return rows?.map(row => {
            const rowData = {};
            tableColumns?.forEach((col, index) => {
                rowData[col] = row[index];
            });
            return rowData;
        });
    }, [tableColumns, rows]);

    useEffect(()=> {
      console.log('inside table component rows:', rows);
      console.log('inside table component columns:', tableColumns);
    },[])
    
    const table = useMaterialReactTable({
        columns,
        data
    })

  

    return (
        <Container> 
            <Typography
                variant="h6"
                style={{ margin: 18, fontFamily: "Montserrat" }}
            >
                {header}
            </Typography>
            <MaterialReactTable table={table} />
        </Container>
    )
}

export default TableComponent