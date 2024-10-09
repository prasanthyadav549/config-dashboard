import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'


const fitmentContext = createContext({})

const FitmentContext = ({children}) => {


    const [token, setToken] = useState('');
    const [selectedYear, setSelectedYear] = useState(2024)
    const [selectedLineReview, setSelectedLineReview] = useState("");
    const [selectedReport, setSelectedReport] = useState("");
    const [selectedPartType, setSelectedPartType] = useState("")
    const [partTypeFilter, setPartTypeFilter] = useState([])
    const [lineReviewFilter, setLineReviewFilter] = useState([]);
    const [reportFilter, setReportFilter] = useState([]);
    const [yearFilter,setYearFilter] = useState([])
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
      });
    
    const [fitmentAttribute,setFitmentAttribute] = useState('')
    const [makeFilter, setMakeFilter] = useState([]);
    const [selectedMake, setSelectedMake] = useState('')
    const [modelFilter,setModelFilter] = useState([]) 
    const [selectedModel,setSelectedModel] = useState([])
    const [comparatorFilter, setComparatorFilter] = useState(['=','>','<'])
    const [selectedComparator, setSelectedComparator] = useState('>')
    const [editedRows, setEditedRows] = useState([]);
    const [violationColumns, setViolationColumns] = useState([])
    const [violationData, setViolationData] = useState([])
    const [usVioValue,setUsvioValue] = useState(null)
    const [columns, setColumns] = useState([]);
    const [result, setResult] = useState([])


    const fetchToken = useCallback(() => {
        console.log('token is changed');
        setToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhYXBub25wcm9kLkFBUF9QUk9EVUNUX1BJTV9ERVZfVVNFUi5TSEEyNTY6alFOMjBsR0JXRnZLN2VjQlprZ3YxNDBkVGwrZkd4VU1EMWZkMXpuQkFmND0iLCJzdWIiOiJhYXBub25wcm9kLkFBUF9QUk9EVUNUX1BJTV9ERVZfVVNFUiIsImlhdCI6MTcyODM5NTgzMSwiZXhwIjoxNzMwOTg3ODMxfQ.nosmF5B3E-A6pbaxG1iYMbahwDLcLZ7c2IBkfNF8nM1eokOTufM_QV6iFWVzZjjVU3RTP_peXCdjVVN9W5qvbffIXW9kWdY2zraRsQYC3IiotMHyljydIxV9J7M251znjp2Ku6JAgV8ToIGHvO2b7y321HlAuDot0mV2XyEM5swVSxOdzy34FpyzBogVlJa-vthdDKGZ9uRNrsCmJ-iT2KU2UTQvJS9JDMfBNtt4g6cyGSexiaX6vy6qt7Cv4kRL7WF_YPNgl3jiH8F8GWTH3cBKgZxj-M_NMJZyiXeJgMBjGMcJnt6HNBp6qzwky7LNlOvXGSH69_l52cT7gJ-mFQ'); 
      }, []);

    
    const handleEditedRows = (rows) => {
      // console.log('inside the hadleEditedRows:', rows);
      setEditedRows(rows); // Store the edited rows
  };


    const fetchData = useCallback(async () => {
    try {
        console.log("fetch data is called");
        const response = await axios.post(
        'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
        {
            statement: `call sp_report_filters();`,
            // parameters: {
            //   MULTI_STATEMENT_COUNT: 2
            // },
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
        console.log('response', response);
        var data = response.data.data
        console.log('data:', data[0][0]);
        data = JSON.parse(data[0][0])
        data.forEach((value,index) => {
        if(index === 0) setLineReviewFilter(value)
        else if(index === 1) setReportFilter(value)
        else if(index === 2) setPartTypeFilter(value)
        else if(index === 3) setYearFilter(value)
        })
        
        
    } catch (error) {
        console.error("Error loading data from Snowflake:", error);
        setAlert({
        open: true,
        message: "Failed to load data from Snowflake.",
        type: "error",
        });
    }
    }, [token]);


    const fetchMakeData = useCallback(async () => {
      if (!token || !selectedYear) return; // Ensure token and selectedYear are available
  
      try {
        console.log('Fetching make data for year:', selectedYear);
        const response = await axios.post(
          'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
          {
            statement: `select distinct make from fitment_violations WHERE year = ${selectedYear};`, 
            timeout: 3600,
            database: 'AAP_PRODUCT_DEV_DB',
            schema: 'PRODUCT_DATA_STEWARD',
            warehouse: 'PRODUCT_LOAD_WH',
            role: 'AAP_PRODUCT_DEV_LOAD_ROLE',
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
        console.log('Make data response:', response);
        const data = response.data.data; 
        const makes = data.map((row) => row[0]); 
        setMakeFilter(makes); 
      } catch (error) {
        console.error('Error fetching make data from Snowflake:', error);
        setAlert({
          open: true,
          message: 'Failed to fetch make data from Snowflake.',
          type: 'error',
        });
      }
    }, [token, selectedYear]);




    const fetchModelData = useCallback(async () => {
      if (!token || !selectedMake) return; 
  
      try {
        console.log('Fetching make data for year:', selectedMake);
        const response = await axios.post(
          'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
          {
            statement: `select distinct model from fitment_violations WHERE year = ${selectedYear} and make = '${selectedMake}';`, 
            timeout: 3600,
            database: 'AAP_PRODUCT_DEV_DB',
            schema: 'PRODUCT_DATA_STEWARD',
            warehouse: 'PRODUCT_LOAD_WH',
            role: 'AAP_PRODUCT_DEV_LOAD_ROLE',
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
        console.log('Model data response:', response);
        const data = response.data.data; 
        const model = data.map((row) => row[0]); 
        setModelFilter(model); 
      } catch (error) {
        console.error('Error fetching make data from Snowflake:', error);
        setAlert({
          open: true,
          message: 'Failed to fetch make data from Snowflake.',
          type: 'error',
        });
      }
    }, [token, selectedMake]);


    const fetchViolationsViewData = useCallback(async (sqlQuery) => {
      console.log('fetch violation view data invoked');
      try {
      
        console.log('view sqlQuery:',sqlQuery);
        const response = await axios.post(
          'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
          {
            statement: sqlQuery,
            // parameters: {
            //   MULTI_STATEMENT_COUNT: 2
            // },
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
        console.log('violations view', response);
        setViolationData(response.data.data);
  
        const cols = response.data.resultSetMetaData.rowType;
        const colNames = cols.map(column => column.name);
        setViolationColumns(colNames);
       
      } catch (error) {
        console.error("Error loading data from Snowflake:", error);
        setAlert({
          open: true,
          message: "Failed to load view data from Snowflake.",
          type: "error",
        });
      }
    }, [token]);


    const fetchViolationsData = useCallback(async (sqlQuery) => {
      console.log('fetch violations invoked');
      try {
        console.log('violations query:', sqlQuery)
        const response = await axios.post(
          'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
          {
            statement: sqlQuery,
            // parameters: {
            //   MULTI_STATEMENT_COUNT: 2
            // },
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
          message: "Failed to load Violations data from Snowflake.",
          type: "error",
        });
      }
    }, [token,selectedLineReview,selectedReport]);


    const fetchViolationsDataWrapper = async () => {
      console.log('inside the fetchViolationsDataWrapper');
      let sqlQuery = "SELECT * FROM fitment_violations WHERE 1=1"; 
      let viewSqlQuery = "select VIOLATIONS_ID,TYPE AS VIOLATION_TYPE,VIOLATION_TEXT,US_BVID_VIO,CA_BVID_VIO,FITMENT_RECORDS,ANSWERED,RESPONSE_NOTES FROM vw_fitment_violation_report where 1=1"

      if (selectedLineReview) {
        sqlQuery += ` AND line_review = '${selectedLineReview}'`;
        viewSqlQuery+= `AND line_review = '${selectedLineReview}'`;
      }
  
      if (selectedReport) {
        sqlQuery += ` AND report = '${selectedReport}'`;
        viewSqlQuery += ` AND report = '${selectedReport}'`;
      }
  
      if (selectedPartType) {
        sqlQuery += ` AND part_type = '${selectedPartType}'`;
      }
    
      if (selectedYear) {
        sqlQuery += ` AND year = ${selectedYear}`;
      }
      

      if (selectedMake) {
        sqlQuery += ` AND make = '${selectedMake}'`;
      }
    
      if (selectedModel) {
        sqlQuery += ` AND model = '${selectedModel}'`;
      }
    
      if (usVioValue !== null && selectedComparator) {
        sqlQuery += ` AND us_vio ${selectedComparator} ${usVioValue}`;
      }
  
      if (fitmentAttribute) {
        sqlQuery += ` AND fitment_attributes LIKE '%${fitmentAttribute}%'`;
      }
    
      console.log('Constructed SQL Query:', sqlQuery);
      await fetchViolationsData(sqlQuery);
      await fetchViolationsViewData(viewSqlQuery)

    }

  
    const submitEditedRows = async () => {
      try {
        console.log('edited rows:', editedRows);
        const mergeQueries = editedRows.map((row) => {
          console.log('inside submitEditedRows:', row);
          const {
            VIOLATIONS_ID = '',
            VIOLATION_TYPE = '',
            VIOLATION_TEXT = '',
            US_BVID_VIO = '',
            CA_BVID_VIO = '',
            FITMENT_RECORDS = '',
            ANSWERED = '',
            RESPONSE_NOTES = ''
          } = row;
          
          return `
              MERGE INTO fitment_cm_response AS target
              USING (SELECT '${VIOLATIONS_ID}' AS VIOLATIONS_ID) AS source
              ON target.VIOLATIONS_ID = source.VIOLATIONS_ID
              WHEN MATCHED THEN
                  UPDATE SET 
                  ANSWERED = '${ANSWERED}',
                  RESPONSE_NOTES = '${RESPONSE_NOTES}'
              WHEN NOT MATCHED THEN
                  INSERT (VIOLATIONS_ID,  ANSWERED, RESPONSE_NOTES)
                  VALUES ('${VIOLATIONS_ID}', '${ANSWERED}', '${RESPONSE_NOTES}');
          `;
        }).join(' ');
    
          console.log('mergeQuery:' , mergeQueries);
    
          const response = await axios.post(
              'https://aapnonprod.us-east-1.snowflakecomputing.com/api/v2/statements',
              {
                  statement: mergeQueries,
                   parameters: {
                   MULTI_STATEMENT_COUNT: 0
                   },
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
                      Authorization: `Bearer ${token}`, // Make sure the token is fetched
                  },
              }
          );
          setAlert({
            open: true,
            message: "Merged rows successfully.",
            type: "success",
          });
          // fetchViewData()
          console.log('Merge successful:', response);
          setEditedRows([])
    
      } catch (error) {
          console.error("Error merging data into Snowflake:", error);
      }
    };


    useEffect(() => {
      if (selectedYear) {
        fetchMakeData();
      }
    }, [selectedYear, fetchMakeData]);


    useEffect(() => {
      if(selectedYear && selectedMake ) {
          fetchModelData()
      }
    },[selectedMake,fetchModelData])


    useEffect(() => {
    fetchToken();
    }, [fetchToken]);


    useEffect(() => {
        if (token) {
          fetchData();
        }
      }, [token]); 


  //    useEffect(()=> {
  //     fetchViewData()
 
  //  },[selectedLineReview,selectedReport])
     


    return (
        <fitmentContext.Provider value= {{token,selectedYear,setSelectedYear,selectedLineReview, setSelectedLineReview,
        selectedReport, setSelectedReport,selectedPartType, setSelectedPartType,partTypeFilter, setPartTypeFilter,
        lineReviewFilter, setLineReviewFilter,reportFilter, setReportFilter,alert,setAlert,yearFilter,fitmentAttribute,
        setFitmentAttribute,makeFilter,selectedMake,setSelectedMake,modelFilter,selectedModel,setSelectedModel,
        comparatorFilter, selectedComparator, setSelectedComparator,editedRows,setEditedRows,submitEditedRows,violationColumns,violationData,
        usVioValue,setUsvioValue,result,columns,fetchViolationsDataWrapper
        }}>
            {children}
        </fitmentContext.Provider>
    )
}

export default FitmentContext

export const FitmentState=()=>{
    return useContext(fitmentContext);
}
