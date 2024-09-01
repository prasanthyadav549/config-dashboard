import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  
  const ModelComponent = ({isDialogOpen, handleDialogClose, formValues, handleInputChange, handleDialogOpen, handleFormSubmit}) => {
    
    return (
      <>
        <Dialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="dialog-title">Enter Configuration Details</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>ENABLE_CONFIG</InputLabel>
              <Select
                name="ENABLE_CONFIG"
                value={formValues.ENABLE_CONFIG}
                onChange={handleInputChange}
              >
                <MenuItem value="Y">Y</MenuItem>
                <MenuItem value="N">N</MenuItem>
              </Select>
            </FormControl>
            {/* Repeat similar blocks for each field */}
            <TextField
              label="PRODUCT_LINE"
              name="PRODUCT_LINE"
              value={formValues.PRODUCT_LINE}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="BASE_LINE"
              name="BASE_LINE"
              value={formValues.BASE_LINE}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="BASE_BRANDS"
              name="BASE_BRANDS"
              value={formValues.BASE_BRANDS}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="COMP_LINE"
              name="COMP_LINE"
              value={formValues.COMP_LINE}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="COMP_BRANDS"
              name="COMP_BRANDS"
              value={formValues.COMP_BRANDS}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="PL_LINE"
              name="PL_LINE"
              value={formValues.PL_LINE}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="PL_BRANDS"
              name="PL_BRANDS"
              value={formValues.PL_BRANDS}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="PART_TYPE_FILTER"
              name="PART_TYPE_FILTER"
              value={formValues.PART_TYPE_FILTER}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={handleFormSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
  
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDialogOpen} // Open dialog on button click
          style={{ marginLeft: "10px" }}
        >
          Create New Configuration
        </Button>
      </>
    );
  };
  
  export default ModelComponent;
