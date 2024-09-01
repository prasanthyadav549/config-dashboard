import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import moment from 'moment-timezone';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alert from './components/Alert';
import { Home, TableComponent } from './Pages';
import axios from 'axios';
import ModelComponent from './components/Model';

function App() {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  
  const [token, setToken] = useState('');
  const [result, setResult] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
    const [formValues, setFormValues] = useState({
      ENABLE_CONFIG: "Y", // Default value for ENABLE_CONFIG
      PRODUCT_LINE: "",
      BASE_LINE: "",
      BASE_BRANDS: "",
      COMP_LINE: "",
      COMP_BRANDS: "",
      PL_LINE: "",
      PL_BRANDS: "",
      PART_TYPE_FILTER: "",
    });
  
    const handleDialogOpen = () => setIsDialogOpen(true);
    const handleDialogClose = () => setIsDialogOpen(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const fetchToken = useCallback(() => {
    setToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhYXBub25wcm9kLkFBUF9QUk9EVUNUX1BJTV9ERVZfVVNFUi5TSEEyNTY6alFOMjBsR0JXRnZLN2VjQlprZ3YxNDBkVGwrZkd4VU1EMWZkMXpuQkFmND0iLCJzdWIiOiJhYXBub25wcm9kLkFBUF9QUk9EVUNUX1BJTV9ERVZfVVNFUiIsImlhdCI6MTcyNTAxODQ4MSwiZXhwIjoxNzI3NjEwNDgxfQ.rzFFuYd44GhhGLobjYlzBtzxc6e2uLWmmsNUAGDwfDd6ICTDk3Uugj7-IHHPmMREdrFFTcpU_YmXI_xneIOjlnhhRt2w6poAQRAA7Cj5KepONkeRfd6va1QPZPOUn_P4BPxoTNqw2Ee_5sOIX08ANHQABGBbzPREIXsvhNxWaVUXqW4-HECjxNgZOL-hn8Gnw1d7LIJulr_z9D2Gb5zk-GS9eltaFqHDIA2VRu2aZi_a_6j4J94tynrHJC8wRMI8vicr9ve80dwToaOZoj926cJUZmpc94eAy9NtM7YxrOn_zEC6RHEdr7ORYU6Gd-5CKpOIP9Ul9nl_hc4PGR8oQQ');
  }, []);

  const fetchData = useCallback(async () => {
    try {
      console.log("fetch data is called");
      const response = await axios.post(
        'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
        {
          statement: `SELECT * FROM T_FITMENT_REPORT_CONFIGURATION;`,
          timeout: 3600,
          database: "AAP_PRODUCT_DEV_DB",
          schema: "PRODUCT_DATA_STEWARD",
          warehouse: "PRODUCT_LOAD_WH",
          role: "AAP_PRODUCT_DEV_LOAD_ROLE"
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Snowflake-Authorization-Token-Type': 'KEYPAIR_JWT',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response', response.data.data);
      setResult(response.data.data);

      const cols = response.data.resultSetMetaData.rowType;
      const colNames = cols.map(column => column.name);
      setColumns(colNames);
      
    } catch (error) {
      console.error("Error loading data from Snowflake:", error);
      setAlert({
        open: true,
        message: "Failed to load data from Snowflake.",
        type: "error",
      });
    }
  }, [token]);

  const updateRowInSnowflake = async (updatedRow) => {
    try {
      const updateStatement = `
        UPDATE T_FITMENT_REPORT_CONFIGURATION
        SET ${Object.keys(updatedRow).map(col => `${col} = '${updatedRow[col]}'`).join(', ')}
        WHERE ID = '${updatedRow.ID}';
      `;

      const response = await axios.post(
        'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
        {
          statement: updateStatement,
          timeout: 3600,
          database: "AAP_PRODUCT_DEV_DB",
          schema: "PRODUCT_DATA_STEWARD",
          warehouse: "PRODUCT_LOAD_WH",
          role: "AAP_PRODUCT_DEV_LOAD_ROLE"
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Snowflake-Authorization-Token-Type': 'KEYPAIR_JWT',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({
        open: true,
        message: "Row updated successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating row in Snowflake:", error);
      setAlert({
        open: true,
        message: "Failed to update row in Snowflake.",
        type: "error",
      });
    }
  };

  const insertRowInSnowflake = async (newRow) => {
    try {
      const currentESTTimestamp = moment().tz('America/NEW_YORK').format('YYYY-MM-DD HH:mm:ss');
      newRow['CONFIG_UPDATED_DATE'] = currentESTTimestamp
      newRow['ID'] =  result.length + 1
      const insertStatement = `
        INSERT INTO T_FITMENT_REPORT_CONFIGURATION (${Object.keys(newRow).join(', ')})
        VALUES (${Object.values(newRow).map(value => `'${value}'`).join(', ')});
      `;

      console.log('insert statement', insertStatement);

      const response = await axios.post(
        'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
        {
          statement: insertStatement,
          timeout: 3600,
          database: "AAP_PRODUCT_DEV_DB",
          schema: "PRODUCT_DATA_STEWARD",
          warehouse: "PRODUCT_LOAD_WH",
          role: "AAP_PRODUCT_DEV_LOAD_ROLE"
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Snowflake-Authorization-Token-Type': 'KEYPAIR_JWT',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('row inserted successfully:', response);
      setAlert({
        open: true,
        message: "Row inserted successfully.",
        type: "success",
      });
      // Optionally update the local state to include the new row

      setResult([...result, 
        [newRow.ID, ...Object.values(newRow).filter((value, index) => index !== Object.keys(newRow).indexOf('ID'))]
      ]);
    } catch (error) {
      console.error("Error inserting row in Snowflake:", error);
      setAlert({
        open: true,
        message: "Failed to insert row in Snowflake.",
        type: "error",
      });
    }
  };

  const handleFormSubmit = async (e) => {
    
    console.log("Form submitted with values:", formValues);
    const isDuplicate  = result.some(
      (row) => 
      row.PRODUCT_LINE === formValues.PRODUCT_LINE && 
      row.BASE_LINE === formValues.BASE_LINE && 
      row.COMP_LINE === formValues.COMP_LINE && 
      row.PL_LINE === formValues.PL_LINE
      );

      if(isDuplicate) {
        setAlert({
          open: true,
          message: "Duplicate combination of PRODUCT_LINE, BASE_LINE, COMP_LINE, and PL_LINE found.",
          type: "error",
        });
      }

      else {
        e.preventDefault();
        // Step 3: If no duplicate, insert the new row into Snowflake
        try {
          await insertRowInSnowflake(formValues);
          setAlert({
            open: true,
            message: "Row inserted successfully.",
            type: "success",
          });
    
          // Clear the form values
          setFormValues({
            ENABLE_CONFIG: "Y", // Reset to default values if needed
            PRODUCT_LINE: "",
            BASE_LINE: "",
            BASE_BRANDS: "",
            COMP_LINE: "",
            COMP_BRANDS: "",
            PL_LINE: "",
            PL_BRANDS: "",
            PART_TYPE_FILTER: "",
          });
    
          handleDialogClose(); // Close dialog after submission
        } catch (error) {
          console.error("Error inserting row in Snowflake:", error);
          setAlert({
            open: true,
            message: "Failed to insert row in Snowflake.",
            type: "error",
          });
        }
      }
   // e.target.preventDefault()
    // await insertRowInSnowflake(formValues); // Insert new row in Snowflake
    handleDialogClose(); // Close dialog after submission
  };

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);    //  token,result,insertRowInSnowflake
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <TableComponent 
                tableColumns={columns} 
                rows={result} 
                updateRowInSnowflake={updateRowInSnowflake}
                insertRowInSnowflake={insertRowInSnowflake}
                isDialogOpen = {isDialogOpen}
                setIsDialogOpen = {setIsDialogOpen}
                formValues = {formValues}
                setFormValues = {setFormValues}
                handleDialogOpen = {handleDialogOpen}
                handleDialogClose = {handleDialogClose}
                handleInputChange = {handleInputChange}
                handleFormSubmit = {handleFormSubmit}
              />
              
            } 
          />
        </Routes>
        <Alert alert={alert} setAlert={setAlert} />
      </div>
    </Router>
  );
}

export default App;

