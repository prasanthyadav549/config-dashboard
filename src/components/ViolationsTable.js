import { Container, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';

const ViolationsTable = ({ tableColumns, rows, handleEditedRows, editedRows, setEditedRows }) => {
    
    const [pageSize, setPageSize] = useState(5); // State to store the page size
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5, //customize the default page size
      });

      useEffect(() => {
        //do something when the pagination state changes
        console.log('pageSize changed:', pagination);
      }, [pagination.pageIndex, pagination.pageSize]);



    const columns = useMemo(() => {
        return tableColumns
            .filter((value) => value !== 'VIOLATIONS_ID')
            .map((col) => ({
                accessorKey: col,
                header: col.split('_').join(' '),
                enableEditing: !['VIOLATION_TYPE', 'VIOLATION_TEXT', 'US_BVID_VIO', 'CA_BVID_VIO', 'FITMENT_RECORDS'].includes(col),
            }));
    }, [tableColumns]);

    const data = useMemo(() => {
        return rows.map((row) => {
            const rowData = {};
            tableColumns?.forEach((col, index) => {
                rowData[col] = row[index];
            });
            return rowData;
        });
    }, [tableColumns, rows]);

    const table = useMaterialReactTable({
        columns,
        data,
        enableClickToCopy: true,
        enableEditing: true,
        enableStickyHeader: true,
        enableColumnResizing: true,
        onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
        state: { pagination }, //pass the pagination state to the table
        onEditingRowSave: async ({ row, values }) => {
            const updatedRow = { ...row.original, ...values }; 
            setEditedRows((prev) => [...prev, updatedRow]); 
            table.setEditingRow(null);
        },
        createDisplayMode: 'modal',
    });

    useEffect(() => {
        console.log('Edited rows:', editedRows);
    }, [editedRows]);

    useEffect(() => {
        console.log('page changed:', pageSize);
    },[pageSize])

    return (
        <Container>
            <Typography variant="h6" style={{ margin: 18, fontFamily: 'Montserrat' }}>
                Violation Report
            </Typography>
            <MaterialReactTable table={table} />
        </Container>
    );
};

export default ViolationsTable;
