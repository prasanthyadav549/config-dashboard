import { Button, Container, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';

const TableComponent = () => {
    const [header, setHeader] = useState("Fitment Configuration Management");
    
    const columns = useMemo(() => [
        { accessorKey: "REPORT_ID", header: "Report ID" },
        { accessorKey: "LINE_REVIEW", header: "Line Review" },
        { accessorKey: "REPORT_IS_ACTIVE", header: "Report Is Active" },
        { accessorKey: "BASE_LINE", header: "Base Line" },
        { accessorKey: "BASE_FILTER", header: "Base Filter" },
        { accessorKey: "COMP_LINE", header: "Comp Line" },
        { accessorKey: "COMP_FILTER", header: "Comp Filter" },
        { accessorKey: "PL_LINE", header: "PL Line" },
        { accessorKey: "PL_FILTER", header: "PL Filter" },
        { accessorKey: "CONFIG_IS_ACTIVE", header: "Config Is Active" },
        { accessorKey: "LAST_RUN", header: "Last Run" },
        { accessorKey: "PART_TYPE_FILTER", header: "Part Type Filter" }
    ], []);
    
    const data = useMemo(() => [
        {
            REPORT_ID: 1,
            LINE_REVIEW: "Review 1",
            REPORT_IS_ACTIVE: "true",
            BASE_LINE: "Base 1",
            BASE_FILTER: "Filter 1",
            COMP_LINE: "Comp 1",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 1",
            PL_FILTER: "Filter 3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 1"
        },

        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        },
        {
            REPORT_ID: 2,
            LINE_REVIEW: "Review 2",
            REPORT_IS_ACTIVE: true,
            BASE_LINE: "Base 2",
            BASE_FILTER: "Filter 2",
            COMP_LINE: "Comp 2",
            COMP_FILTER: "Filter 2",
            PL_LINE: "PL 2",
            PL_FILTER: "F1,f2,f3",
            CONFIG_IS_ACTIVE: false,
            LAST_RUN: "2023-01-01",
            PART_TYPE_FILTER: "Type 2"
        }

        // Add more data objects as needed
    ], []);
    
    // const table = useMaterialReactTable({
    //     columns,
    //     data,
    //     enableClickToCopy: true,
    //     enableRowSelection: true,
    //     enableA
    //     initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
    // });
    const table = useMaterialReactTable({
        columns,
        data,
        enableClickToCopy: true,
        enableRowSelection: true,
        enableStickyHeader: true,
        enableColumnResizing: true,
        enableColumnPinning: true,
        enableMultiRowSelection: false,
        initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
        renderTopToolbarCustomActions: ({ table }) => (
          <Button
            onClick={() => {
              const rowSelection = table.getState().rowSelection; //read state
                    const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
                console.log("selected rows:", selectedRows)
            }}
          >
            Download Selected Users
          </Button>
        ),
      });
      
      useEffect(() => {
        //fetch data based on row selection state or something
      }, [table.getState().rowSelection]);
    
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
