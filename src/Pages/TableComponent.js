import { Button, Container, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import moment from 'moment-timezone';
import ModelComponent from '../components/Model';

const TableComponent = ({ tableColumns, rows, updateRowInSnowflake, insertRowInSnowflake, isDialogOpen,setIsDialogOpen, formValues, setFormValues, handleDialogOpen, handleDialogClose, handleInputChange, handleFormSubmit}) => {
    const [header, setHeader] = useState("Fitment Configuration Management");

    const handleCreateUser = async ({ values, table }) => {
        const currentESTTimestamp = moment().tz('America/NEW_YORK').format('YYYY-MM-DD HH:mm:ss');
        values['CONFIG_UPDATED_DATE'] = currentESTTimestamp
        console.log("New row values:", values);
        await insertRowInSnowflake(values); // Call to insert the new row in Snowflake
        table.setCreatingRow(null); // Exit creating mode
    };

    const columns = useMemo(() => {
        return tableColumns
            .filter(col => col !== 'ID') // Exclude 'ID' column from the table
            .map(col => {
                // Configure the 'ENABLE_CONFIG' column as a select menu
                if (col === 'ENABLE_CONFIG') {
                    return {
                        accessorKey: col,
                        header: col.split('_').join(' '),
                        enableEditing: true, // Allow editing for 'ENABLE_CONFIG'
                        editVariant: 'select',
                        editSelectOptions: ['Y', 'N'],   
                    };
            }
    
                // Configuration for other columns
                return {
                    accessorKey: col,
                    header: col.split('_').join(' '),
                    enableEditing: !['CONFIG_UPDATED_DATE','BASE_LINE','COMP_LINE','PL_LINE'].includes(col), // Disable editing for 'CONFIG_UPDATE_DATE'
                    muiTableBodyCellEditTextFieldProps: ({ row }) => {
                        if (row.original && row.original.ID === undefined && col === 'CONFIG_UPDATE_DATE') {
                            // When creating a new row (row.original.ID is undefined), hide CONFIG_UPDATE_DATE
                            return { sx: { display: 'none' } }; // Hide the CONFIG_UPDATE_DATE field
                        }
                        return {};
                    },
                };
            });
    }, [tableColumns]);
    

    const data = useMemo(() => {
        return rows.map(row => {
            const rowData = {};
            tableColumns.forEach((col, index) => {
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
        createDisplayMode: 'modal',
        onCreatingRowSave: handleCreateUser,
        muiTableContainerProps: {
            sx: (theme) => ({
                "td[data-pinned='true']::before, th[data-pinned='true']::before": {
                    background: theme.palette.primary.main,
                },
                "td[data-pinned='true']::before, th[data-pinned='true']": {
                    color: theme.palette.primary.contrastText,
                },
            }),
        },
        onEditingRowSave: async ({ row, values }) => {
            values['ID'] = row.original.ID;  // Ensure ID is preserved during edit
            console.log("Updated row values:", values);
            await updateRowInSnowflake(values);
            table.setEditingRow(null);
        },

        enableMultiRowSelection: false,
        initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
        renderTopToolbarCustomActions: ({ table }) => (
            //<Button
            //     onClick={() => {
            //         table.setCreatingRow(true); 
            //         console.log("Creating a new comparison");
            //     }}
            // >
            //     Create New Comparison
            // </Button>
            <ModelComponent 
            isDialogOpen= {isDialogOpen}  
            handleDialogClose = {handleDialogClose}
            formValues = {formValues}
            handleInputChange = {handleInputChange}
            handleDialogOpen = {handleDialogOpen}
            handleFormSubmit = {handleFormSubmit}
            />
        ),
    });

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
    );
};

export default TableComponent;
