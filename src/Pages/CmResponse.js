import { Container, FormControl, InputLabel, Select, MenuItem, Box, Button, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import ViolationsTable from "../components/ViolationsTable"; // Ensure it's imported correctly
import CustomButton from "../components/CustomButton";
import TableComponent from "../components/TableComponent";
import { FitmentState } from "../Context";

const CmResponse = () => {
    const [reports, setReports] = useState(["Parts", "Vehicles", "OE-Comp Products", "Overview", "Violations"]);
    const [report, setReport] = useState('');
    const {selectedLineReview,setSelectedLineReview,selectedPartType,setSelectedPartType,selectedReport,setSelectedReport,lineReviewFilter,reportFilter,partTypeFilter,yearFilter,selectedYear,
        setSelectedYear,setFitmentAttribute,makeFilter,selectedMake,setSelectedMake,modelFilter,selectedModel,setSelectedModel,comparatorFilter,selectedComparator,setSelectedComparator,
        editedRows,setEditedRows,submitEditedRows, violationColumns,violationData,setUsvioValue,columns,result,fetchViolationsDataWrapper} = FitmentState()
   

    const handleLineReviewFilterChange = (event) => {
        setSelectedLineReview(event.target.value);
    };

    const handleReportFilterChange = (event) => {
        setSelectedReport(event.target.value);
    };

    const handleReportChange = (value) => {
        setReport(value);
    };


    return (
        <Container>
            <Box sx={{ display: "flex", gap: 4 }}>
                {/* Line Review Select Block */}
                <FormControl variant = "filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="line-review-label">Line Review</InputLabel>
                    <Select
                        labelId="line-review-label"
                        value={selectedLineReview}
                        label="Line Review"
                        onChange={handleLineReviewFilterChange}
                    >
                        <MenuItem value="">
                         <em>None</em>
                        </MenuItem>
                        {lineReviewFilter.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Report Select Block */}
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="report-label">Report</InputLabel>
                    <Select
                        labelId="report-label"
                        value={selectedReport}
                        label="Report"
                        onChange={handleReportFilterChange}
                    >
                        <MenuItem value="">
                           <em>
                               None
                           </em>
                        </MenuItem>
                        {reportFilter.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Part Type Select Block */}
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="part_type-label">Part Type</InputLabel>
                    <Select
                        label="Part Type"
                        value={selectedPartType}
                        onChange={(e) => setSelectedPartType(e.target.value)}
                    >
                        <MenuItem value="">
                           <em>
                               None
                           </em>
                        </MenuItem>
                        {partTypeFilter.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120, ml: 10 }}>
                    <InputLabel id="year-label">year</InputLabel>
                    <Select
                        label="Year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <MenuItem value="">
                           <em>
                               None
                           </em>
                        </MenuItem>
                        {yearFilter.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="make-label">Make</InputLabel>
                    <Select
                        label="Make"
                        value={selectedMake}
                        onChange={(e) => setSelectedMake(e.target.value)}
                    >
                        <MenuItem value="">
                           <em>
                               None
                           </em>
                        </MenuItem>
                        {makeFilter.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="model-label">Modal</InputLabel>
                    <Select
                        label="model"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        <MenuItem value="">
                           <em>
                               None
                           </em>
                        </MenuItem>
                        {modelFilter.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
               </Box>

                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '8vh',             
                    m: 2, 
                    ml:72
                }}
             >
                <Typography variant="body2" component="span"
                    // sx={{ ml: 40, mt:70}} 
                >
                    Fitment Attribute Contains:
                </Typography>
                 <TextField
                    label="Fitment Attribute"
                    variant="outlined"
                    sx={{ ml: 3}} 
                    onChange={(e) => setFitmentAttribute(e.target.value)}
                   />
                   </Box>

                    <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,                          
                        height: '8vh',                   
                        m: 3,                            
                        ml: 72               
                    }}
                    >
                    <Typography variant="body2" component="span">
                        US VIO
                    </Typography>
                    <FormControl variant = "filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="Enter-comparision-label">Enter comparator</InputLabel>
                    <Select
                        labelId="line-review-label"
                        value={selectedComparator}
                        label="Enter Comparator"
                        onChange={(e)=> setSelectedComparator(e.target.value)}
                    >
                        {comparatorFilter.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    variant="filled"
                    label="Enter Number"
                    onChange = {(e)=> setUsvioValue(e.target.value)}
                />
                </Box>
             <Button 
               sx= {{
                   'color': 'white',
                   backgroundColor: 'red', 
                   '&:hover': {backgroundColor: 'red'},
                   ml:50
                   }}
                   onClick = {fetchViolationsDataWrapper}
             >
                 Fetch Records
             </Button>

            <Box sx={{
                 display: 'flex', 
                 justifyContent: 'space-around',
                 mt:3
                 }}>
                {reports.map((value, index) => (
                    <CustomButton 
                        key={index} 
                        value={value} 
                        handleReportChange={() => handleReportChange(value)} 
                        isActive={value === report} 
                    />
                ))}
                { editedRows &&
                    <Button
                    onClick = {submitEditedRows}
                >
                  submit
                </Button>

                }
                
            </Box>
         
            {/* Conditional Rendering */}
            {report === 'Overview' ? (
                <TableComponent tableColumns={columns} rows={result} />
            ) : report === 'Violations' ? (
                <ViolationsTable tableColumns={violationColumns} rows={violationData} editedRows = {editedRows} setEditedRows = {setEditedRows} />
            ) : null}
        </Container>
    );
};

export default CmResponse;