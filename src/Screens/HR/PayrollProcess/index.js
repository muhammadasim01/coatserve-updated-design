
import React from 'react'
import { Button, Accordion, Card, CardGroup, Container,Table ,Form} from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import Header from '../../../Component/Global/Navbar'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Potential () {
  const alert = useAlert();
  const [EmployeeData, setEmployeeData] = React.useState()
  const [FYCValue, setFYCValue] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [HeaderData, setHeaderData] = React.useState()
  const [PeriodMonthData, setPeriodMonthData] = React.useState()
  const [Remarks, setRemarks] = React.useState()
  const [FYClabel, setFYClabel] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()

  const [TableData, setTableData] = React.useState()
  const [Periodlabel, setPeriodlabel] = React.useState()
  const [PeriodCodeData, setPeriodCodeData] = React.useState()
  const [PeriodValue, setPeriodValue] = React.useState()
  
  const [MonthValue, setMonthValue] = React.useState()
  const [MonthLabel, setMonthLabel] = React.useState()
  const [FYC, setFYC] = React.useState()
  const [CollectionLines, setCollectionLines] = React.useState()
 
  
  
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    Delete : `${LINKS.api}/DeleteApi`,
  }
  const Home = () => {
    const alert = useAlert();
  
  };
  React.useEffect(async () => {
    setButtonName("Add") 
    let cook = await localStorage.getItem('cookie')
    Allowance(cook)
    AllowanceTableData(cook)
    Employee(cook)
    PeriodData(cook)
    FiscalPeriodMonthData(cook)
  }, [])
  const Employee = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveEmplyeeInfo,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            if(element.MiddleName==null){
             ItemsDropDown.push({
              value: element.EmployeeID,
              label:
                element.FirstName +
                ' ' +
                element.LastName
              
            })
          } else if(element.MiddleName!==null){
          ItemsDropDown.push({
            value: element.EmployeeID,
            label:
              element.FirstName +
              ' ' +
              element.MiddleName +
              ' ' +
              element.LastName
            
          })
        } else if(element.MiddleName==""){
          ItemsDropDown.push({
            value: element.EmployeeID,
            label:
              element.FirstName +
              ' ' +
              element.LastName
            
          })
        }
          })
          setEmployeeData(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Allowance = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.HumanResources.FiscalYear,
        cookie: cookie
      })
      .then(function (res) {
    //  setTableData(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Code + ' : ' + element.Name
            })
          })
          setFYC(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const PeriodData = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.HumanResources.FiscalYear,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res.data.value[0].FSY1Collection)
    //  setTableData(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Code + ' : ' + element.Name
            })
          })
          setPeriodCodeData(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const FiscalPeriodMonthData = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.HumanResources.PeriodMonthFiscalYear,
        cookie: cookie
      })
      .then(function (res) {
       console.log(res.data.value[0].FSY1Collection)
    //  setTableData(res.data.value)
        if (res.data.value[0].FSY1Collection) {
          let ItemsDropDown = []
          res.data.value[0].FSY1Collection.forEach(element => {
            ItemsDropDown.push({
              value: element.U_MonthCode,
              label: element.U_MonthCode + ' : ' + element.U_Month
            })
          })
          setPeriodMonthData(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const AllowanceTableData = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.HumanResources.PayRollProcess,
        cookie: cookie
      })
      .then(function (res) {
        setCollectionLines(res.data.value)
      
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const GetSMLData = async () => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `sml.svc/PAYROLLCALCULATIONSUMMARY?$filter=MonthCode eq '${MonthValue}' `;
    console.log(SAPapi);

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setTableData(res.data.value);
        console.log(res.data.value)

      })
      .catch({})

  }
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body:JSON.stringify(body),
          api: `OPPG(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const submitPatch = async () => {
   
    let body={
        Remark:Remarks ,
        U_FYSCode:FYCValue ,
        U_FYSName: FYClabel,
        U_MonthCode: MonthValue,
        U_MonthName:MonthLabel,
    }
    let DocLines = []
    TableData.forEach(element => {
      DocLines.push({
        U_Amount:element.Amount  || element.U_Amount,
        U_BPLId:element.BPLId  || element.U_BPLId,
        U_BPLName:element.BPLName  || element.U_BPLName,
        U_BasicSalary:element.Basic_Salary  || element.U_BasicSalary,
        U_Code:element.Code  || element.U_Code,
        U_DepartmentCode:element.DepartmentCode  || element.U_DepartmentCode,
        U_DepartmentName:element.DepartmentName || element.U_DepartmentName,
        U_EmpPFAmount:element.EmployeePFAmount  || element.U_EmpPFAmount,
        U_EmpPFPercent:element.EmployeePFPercent  || element.U_EmpPFPercent,
        U_EmployeeName:element.Employee_Name  || element.U_EmployeeName,
        U_EmprPFAmount:element.EmployerPFAmount  || element.U_EmprPFAmount,
        U_EmprPFPercent:element.EmployerPFPercent  || element.U_EmprPFPercent,
        U_EndDate:element.EndDate || element.U_EndDate,
        U_FYSCode:element.FYSCode  || element.U_FYSCode,
        U_FYSName:element.FYSName  || element.U_FYSName,
        U_GrossSalary:element.Gross_Salary  || element.U_GrossSalary,
        U_LocationCode:element.Location  || element.U_LocationCode,
        U_LocationName:element.LocationCode  || element.U_LocationName,
        U_MonthCode:element.MonthCode  || element.U_MonthCode,
        U_MonthName:element.Month  || element.U_MonthName,
        U_Name:element.Name  || element.U_Name,
        U_OcrCode:element.OcrCode  || element.U_OcrCode,
        U_OcrName:element.OcrName || element.U_OcrName,
        U_PositionCode:element.PositionCode  || element.U_PositionCode,
        U_PositionName:element.PositionName  || element.U_PositionName,
        U_PrjCode:element.PrjCode  || element.U_PrjCode,
        U_PrjName:element.PrjName  || element.U_PrjName,
        U_SalaryPerDay:element.Salary_Per_Day  || element.U_SalaryPerDay,
        U_SalaryPerHour:element.Salary_Per_Hour  || element.U_SalaryPerHour,
        U_StartDate:element.StartDate  || element.U_StartDate,
        U_Taxable:element.Taxable  || element.U_Taxable,
        U_TotalDays:element.TotalDays  || element.U_TotalDays,
        U_Type:element.Type || element.U_Type,
        U_WeeklyOff:element.WeeklyOff  || element.U_WeeklyOff,
        U_empID:element.empID  || element.U_empID,
        U_jobTitle:element.jobTitle  || element.U_jobTitle,
        VisOrder:element.VisOrder  || element.VisOrder
      })
    })
    body["PPG1Collection"]= DocLines

    Patch(HeaderData.DocEntry, body)
    console.log(HeaderData.DocEntry, body)
  }
  const ontextItemChanged = e => {
    setTextItemChangedObject(e.target.value)
    console.log(e.target.value)
  }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `OPPG(${TextItemChangedObject})`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
          console.log(res)
          if(res.data.error){
            alert(res.data.error.message.value)
           }else if(res.data){
       setHeaderData(res.data)
        console.log(res.data)
        setTableData(res.data.PPG1Collection)
        console.log(res.data.PPG1Collection)
        if (HeaderData != '') {
          setButtonName('Update')
        }
           }
      })
      .catch({})
  }
  const submitPayrollProcess = async () => {
      console.log(TableData)
      console.log(CollectionLines)
    let body={
        Remark:Remarks ,
        U_FYSCode:FYCValue ,
        U_FYSName: FYClabel,
        U_MonthCode: MonthValue,
        U_MonthName:MonthLabel,
    }
    let DocLines = []
    TableData.forEach(element => {
      DocLines.push({
        U_Amount:element.Amount  || element.U_Amount,
        U_BPLId:element.BPLId  || element.U_BPLId,
        U_BPLName:element.BPLName  || element.U_BPLName,
        U_BasicSalary:element.Basic_Salary  || element.U_BasicSalary,
        U_Code:element.Code  || element.U_Code,
        U_DepartmentCode:element.DepartmentCode  || element.U_DepartmentCode,
        U_DepartmentName:element.DepartmentName || element.U_DepartmentName,
        U_EmpPFAmount:element.EmployeePFAmount  || element.U_EmpPFAmount,
        U_EmpPFPercent:element.EmployeePFPercent  || element.U_EmpPFPercent,
        U_EmployeeName:element.Employee_Name  || element.U_EmployeeName,
        U_EmprPFAmount:element.EmployerPFAmount  || element.U_EmprPFAmount,
        U_EmprPFPercent:element.EmployerPFPercent  || element.U_EmprPFPercent,
        U_EndDate:element.EndDate || element.U_EndDate,
        U_FYSCode:element.FYSCode  || element.U_FYSCode,
        U_FYSName:element.FYSName  || element.U_FYSName,
        U_GrossSalary:element.Gross_Salary  || element.U_GrossSalary,
        U_LocationCode:element.Location  || element.U_LocationCode,
        U_LocationName:element.LocationCode  || element.U_LocationName,
        U_MonthCode:element.MonthCode  || element.U_MonthCode,
        U_MonthName:element.Month  || element.U_MonthName,
        U_Name:element.Name  || element.U_Name,
        U_OcrCode:element.OcrCode  || element.U_OcrCode,
        U_OcrName:element.OcrName || element.U_OcrName,
        U_PositionCode:element.PositionCode  || element.U_PositionCode,
        U_PositionName:element.PositionName  || element.U_PositionName,
        U_PrjCode:element.PrjCode  || element.U_PrjCode,
        U_PrjName:element.PrjName  || element.U_PrjName,
        U_SalaryPerDay:element.Salary_Per_Day  || element.U_SalaryPerDay,
        U_SalaryPerHour:element.Salary_Per_Hour  || element.U_SalaryPerHour,
        U_StartDate:element.StartDate  || element.U_StartDate,
        U_Taxable:element.Taxable  || element.U_Taxable,
        U_TotalDays:element.TotalDays  || element.U_TotalDays,
        U_Type:element.Type || element.U_Type,
        U_WeeklyOff:element.WeeklyOff  || element.U_WeeklyOff,
        U_empID:element.empID  || element.U_empID,
        U_jobTitle:element.jobTitle  || element.U_jobTitle,
        VisOrder:element.VisOrder  || element.VisOrder
      })
    })
    body["PPG1Collection"]= DocLines
   
 
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:JSON.stringify(body),
          api: LINKS.sap.HumanResources.PostPayrollProcess,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocEntry) {
            alert.success('Operation completed successfully')
            window.location.reload();
          } else {
            alert.error(JSON.stringify(res.data.error.message.value))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const handleSubmitted = ({ res, fields,Dropdown, form }) => {
 
    form.reset() 
    Dropdown.reset()
  }
  const tabletextchange = (e,index) => {
    let obj=CollectionLines
    obj[index][e.target.name]=e.target.value
    console.log(obj)
    setCollectionLines(obj)
  }
  const tableDropDownchange = (e,index,name) => {
    console.log(e,index)
    let obj=CollectionLines
    obj[index][name]=e.value
    console.log(obj)
    setCollectionLines(obj)
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitPayrollProcess()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
    return (
        <><NavBar/>
        <h2 style={{textAlign:'center'}}>Payroll Process</h2>
        
     <CardGroup>
    <DIV3>

    <Container>
        <div style={{marginRight:'5rem'}} >
        <card >
        <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>DocEntry</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  name='DocEntry'
                 defaultValue={HeaderData && HeaderData.DocEntry}
                  readOnly='readOnly'
                  aria-describedby='Number'
                //   onChange={e => {
                //     setCode(e.target.value)
                //   }}
                ></input>
              </div>
            <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Fiscal Year Code</label>
                <Select
                placeholder={HeaderData && HeaderData.U_FYSCode}
                 options={FYC} // Options to display in the dropdown
                  onChange={e => {
                    setFYCValue(e.value)
                    setFYClabel(e.label)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
              </div>
             
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Month Code</label>
                <Select
               placeholder={HeaderData && HeaderData.U_MonthCode}
                  options={[
                    { label: 'Month 1', value: 1 },
                    { label: 'Month 2', value: 2 },
                    { label: 'Month 3', value: 3 },
                    { label: 'Month 4', value: 4 },
                    { label: 'Month 5', value: 5 },
                    { label: 'Month 6', value: 6 },
                    { label: 'Month 7', value: 7 },
                    { label: 'Month 8', value: 8 },
                    { label: 'Month 9', value: 9 },
                    { label: 'Month 10', value: 10 },
                    { label: 'Month 11', value: 11 },
                    { label: 'Month 12', value: 12 },
                  
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    setMonthLabel(e.label)
                    setMonthValue(e.value)
                    GetSMLData()
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Remarks</label>
                <input
                  type='text'
                  class='form-control'
                  id='Number'
                  name='StartDate'
                  aria-describedby='Number'
                  onChange={e => {
                    setRemarks(e.target.value)
                  }}
                  defaultValue={HeaderData && HeaderData.Remark}
                ></input>
              </div>
            
    
    </card>
  </div>
  </Container>
  </DIV3> 
  <DIV4>
  {FYC ?null:(
  <Card style={{border:'none'}} >
    
    <div className="inside">
    <img src="/Image/2.png" style={{width:'2.5rem ' ,height:'2.5rem',marginLeft:'15.5rem', marginTop:'10.5rem'}}   class="spine"/>
    <div className="inside">
    <img src="/Image/3.png" style={{width:'2rem' ,height:'2rem',marginLeft:'14rem',marginTop:'9rem'}}  class="spin" />
    <div className="inside">
    <img src="/Image/Logo8.png" style={{width:'1rem' ,height:'1rem',marginLeft:'12.6rem',marginTop:'7.6rem'}}  class="" /> 
    </div>
    </div>
    </div>
       <img src="/Image/1.png" style={{width:'3rem',height:'3rem',marginLeft:'17rem',marginTop:'12rem'}} class="spin"/>  
       </Card>)}
  </DIV4>
  <DIV3>
  <Container>
  
       <card>
       <div style={{ width: '23.5rem'  ,marginLeft:'3rem'}}>
              <input
                name={'SearchPRNumber' }
                type='Number'
                placeholder=''
                class='form-control'
                onChange={e => {
                 
                  ontextItemChanged(e)
                }}
              />
            <br />
            <Button
              onClick={e => {
                SearchPRNumberFilter()
              }}
            >
              Search
            </Button>
            <br />
              </div>
       <div style={{ width: '23.5rem' ,marginLeft:'3rem' }}>
                <label>DocNum</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  name='DocEntry'
                  defaultValue={HeaderData && HeaderData.DocNum}
                  readOnly='readOnly'
                  aria-describedby='Number'
                //   onChange={e => {
                //     setCode(e.target.value)
                //   }}
                ></input>
              </div>
    
    <div style={{ width: '23.5rem'  ,marginLeft:'3rem'}}>
    <label>Month Name</label>
     <input
                  type='text'
                  class='form-control'
                  id='Number'
                  name='DocEntry'
                  defaultValue={MonthLabel && HeaderData && HeaderData.U_MonthName} 
                  readOnly='readOnly'
                  aria-describedby='Number'
                //   onChange={e => {
                //     setCode(e.target.value)
                //   }}
                ></input>
    </div>
   
          
        </card>
        </Container>
        </DIV3>
      </CardGroup>
      <br/>
      <div>
  
          <Table responsive striped bordered hover>
        
          <tr>
          <th>#</th>
          <th>Employee No</th>
          <th>Employee Name</th>
          <th> Code </th>
          <th> Name </th>
          <th> Type </th>
          <th> Basic Salary </th>
          <th> Gross Salary </th>
          <th> Employee PF Percent </th>
          <th> Employer PF Percent </th>
          <th> Employee PF Amount </th>
          <th> Employer PF Amount </th>
          <th> Salary Per Day </th>
          <th> Salary Per Hour </th>
          <th> Amount </th>
          </tr>
          
          <tbody>
              {TableData&&TableData.map((item, index) => (
                <tr key={`${index}`}>
                   <td> {index + 1}
                   <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              </div>
                   </td>
          <td>
              <div style={{width:'15rem'}}>
              <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_empID'
                      defaultValue={item.U_empID}
                      readOnly='readOnly'
                     value={item.empID}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    />
                </div>
          </td>
          
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='text'
                      class='form-control'
                      id='Number'
                      name='U_EmployeeName'
                    //   placeholder={}
                      readOnly='readOnly'
                      defaultValue={item.Employee_Name ? item.U_EmployeeName:null }
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    />
                    </div>
          </td>
          
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      defaultValue={item.U_Code}
                      name='U_Code'
                      readOnly='readOnly'
                      value={item.Code}
                    //   onChange={e => {
                    //     tabletextchange(e,index)
                    //     // setAmount(e.target.value)
                    //   }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='text'
                      class='form-control'
                      id='Number'
                      placeholder=''
                      name='U_Name'
                      readOnly='readOnly'
                     defaultValue={item.Name?item.U_Name:null}
                    //   onChange={e => {
                    //     tabletextchange(e,index)
                    //     // setAmount(e.target.value)
                    //   }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='text'
                      class='form-control'
                      id='Number'
                      name='U_Type'
                      placeholder=''
                      readOnly='readOnly'
                     defaultValue={item.Type?item.U_Type:null}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_BasicSalary'
                      placeholder=''
                      readOnly='readOnly'
                      defaultValue={item.Basic_Salary?item.U_BasicSalary:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_GrossSalary'
                      placeholder=''
                      readOnly='readOnly'
                     defaultValue={item.Gross_Salary?item.U_GrossSalary:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_EmpPFPercent'
                      placeholder=''
                      readOnly='readOnly'
                      defaultValue={item.EmployeePFPercent?item.U_EmpPFPercent:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_EmprPFPercent'
                      placeholder=''
                      readOnly='readOnly'
                      defaultValue={item.EmployerPFPercent?item.U_EmprPFPercent:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_EmpPFAmount'
                      placeholder=''
                      readOnly='readOnly'
                      defaultValue={item.EmployeePFAmount?item.U_EmpPFAmount:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_EmprPFAmount'
                      placeholder=''
                      readOnly='readOnly'
                      defaultValue={item.EmployerPFAmount?item.U_EmprPFAmount:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_SalaryPerDay'
                      placeholder=''
                      readOnly='readOnly'
                     defaultValue={item.Salary_Per_Day?item.U_SalaryPerDay:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_SalaryPerHour'
                      placeholder=''
                      readOnly='readOnly'
                     value={item.Salary_Per_Hour?item.U_SalaryPerHour:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'15rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_Amount'
                      placeholder=''
                      readOnly='readOnly'
                     defaultValue={item.Amount?item.U_Amount:0}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                    ></input>
                    </div>
          </td>
         
          </tr>
         ))}
         </tbody>
       </Table>
     
          </div>
          <br/>
          <br/>
          <div style={{marginLeft:'1rem'}}>
          <Button 
               style={{ marginLeft: '5%' }}
              
               onClick={() => {
                Submit_PatchFunc()
              }}
              >{ButtonName}</Button>
            {/* <Button
              style={{ marginLeft: '5%' }}
                onClick={() => {
                   submitPatch()
                }}
              >
               Update
              </Button> */}
              
              <Button 
            style={{ marginLeft: '3%' }}
            onClick={() => {
                  window.location.href="/Home"
                }}
            >Cancel</Button>
             {/* <Button
             
            style={{ marginLeft: '5%' }}
            onClick={() => {
                submitDelete()
            //   window.location.reload();
            }}
            >Un-Process</Button> */}
          </div>
          
        </>
        
    )
}
