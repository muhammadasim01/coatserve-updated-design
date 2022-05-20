import React from 'react'
import {
  Button,
  Accordion,
  Card,
  CardGroup,
  Table,
  Container,
  Form
} from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import { Collection } from 'react-bootstrap-icons'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Potential () {
  const alert = useAlert();
  const [DocEntry, setDocEntry] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [StartDate, setStartDate] = React.useState()
  
  const [EmployeeName, setEmployeeName] = React.useState()
  const [GrossSalary, setGrossSalary] = React.useState()
  const [EmployeeValue, setEmployeeValue] = React.useState()
  const [BasicSalary, setBasicSalary] = React.useState()
  const [Remarks, setRemarks] = React.useState()
  const [getEmployeeData, setgetEmployeeData] = React.useState()
  const [CollectionLines, setCollectionLines] = React.useState()
  const [EmployeeData, setEmployeeData] = React.useState()
  const [Automaticallowance, setAutomaticallowance] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [TableData, setTableData] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
    GetData(cook)
    Owner(cook)
    Allowance(cook)
    
    setButtonName("Add") 
  }, [])
  const Home = () => {
    const alert = useAlert();
  
  }; 
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `OESD(${id})`,
          cookie: cook
          
        }
       
        ) 
      
        .then(function (res) {
          console.log(res)
          if (res==="null") {
           console.log('Operation completed successfully')
           
          } else {
            console.log("res.data.error.message.value")
          }
       
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const submitPatch = async () => {
   
    let body={
      U_empID: EmployeeValue,
      U_EmployeeName:EmployeeName,
      U_StartDate: StartDate,
      U_BasicSalary: BasicSalary,
      U_GrossSalary: GrossSalary,
      Remark: Remarks,
    }
    let Collection = []
    TableData.forEach(element => {
      Collection.push({
        U_AllowanceCode:element.Code,
          U_AllowancePercent:element.U_Percent,
          U_AllowanceAmount:element.U_AllowanceAmount
      })
    })
    body["ESD1Collection"]= Collection

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
    let sapAPi = `OESD(${TextItemChangedObject})`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        if(res.data.error){
         alert(res.data.error.message.value)
        }else if(res.data){
       setHeaderData(res.data)
        console.log(res.data)
        setCollectionLines(res.data.ESD1Collection[0])
        console.log(res.data.ESD1Collection[0])
        if (HeaderData != '') {
          setButtonName('Update')
        }
        }
      })
      .catch({})
  }
  const submitEmployeeSalaryDetail = async () => {
    let body = {
      U_empID: EmployeeValue,
      U_EmployeeName:EmployeeName,
      U_StartDate: StartDate,
      U_BasicSalary: BasicSalary,
      U_GrossSalary: GrossSalary,
      Remark: Remarks,
      DocEntry: DocEntry
    }
    console.log(TableData)
    let DocLines = []
    TableData.forEach(element => {
      DocLines.push({
        U_AllowanceCode:element.Code,
          U_AllowancePercent:element.U_Percent,
          U_AllowanceAmount:element.U_AllowanceAmount
      })
    })
    body["ESD1Collection"]=DocLines
   

    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.HumanResources.EmployeeSalaryDetails,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
           if (res.data.DocNum) {
            alert.success('Operation completed successfully')
            window.location.reload();
          } else {
            alert.errror(JSON.stringify(res.data.error.message.value))
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
    let obj=TableData
    obj[index][e.target.name]=e.target.value
    console.log(obj)
    setTableData(obj)
  }
  const Owner = async (cookie, e) => {
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
                element.EmployeeID +
                ' : ' +
                element.FirstName +
                ' ' +
                element.LastName
              
            })
          } else if(element.MiddleName!==null){
          ItemsDropDown.push({
            value: element.EmployeeID,
            label:
              element.EmployeeID +
              ' : ' +
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
        api: LINKS.sap.HumanResources.AutomaticAllowance,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res.data.value)
        setTableData(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Code + ' : ' + element.Name
            })
          })
          setAutomaticallowance(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const GetData = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.HumanResources.EmployeeSalaryDetails,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res.data.value[0].ESD1Collection)
        setgetEmployeeData(res.data.value[0].ESD1Collection)
        // setgetEmployeeData(res.data.value)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Calculation=()=>{
    console.log(TableData)
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitEmployeeSalaryDetail()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
  
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: 'center' }}>Employee Salary Detail</h2>
      <Form onSubmit={handleSubmitted}>
      <CardGroup>
        <DIV3>
        <Container fluid>
          
          <div style={{ marginRight: '5rem' }}>
            <card>
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>DocEntry</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  readOnly='readOnly'
                  aria-describedby='Number'
                  onChange={e => {
                    setDocEntry(e.target.value)
                  }}
                  placeholder={HeaderData && HeaderData.DocEntry}
                ></input>
              </div>
              {/* <div style={{ width: '23.5rem', marginLeft: '2rem' }}>
                <label>Employee Name</label>
                <input
                  type='text'
                  class='form-control'
                  id='Number'
                  aria-describedby='Number'
                  onChange={e => {
                    setEmployeeName(e.target.value)
                  }}
                  placeholder=''
                ></input>
              </div> */}
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Start Date</label>
                <input
                  type='Date'
                  class='form-control'
                  id='Date'
                  aria-describedby='Date'
                  onChange={e => {
                    setStartDate(e.target.value)
                  }}
                  defaultValue={HeaderData && HeaderData.U_StartDate}
                ></input>
              </div>

              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Gross Salary</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  onChange={e => {
                    setGrossSalary(e.target.value)
                    Calculation()
                    
                  }}
                  aria-describedby='Number'
                  defaultValue={HeaderData && HeaderData.U_GrossSalary}
                ></input>
                <br />
                <br />
                <br />
              </div>
            </card>
          </div>
          </Container>
          </DIV3>
          <DIV4>
          {EmployeeData ?null:(
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
          <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
              <input
                name={'SearchPRNumber'}
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
            <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
              <label>Employee No</label>
              <Select
                  placeholder={HeaderData && HeaderData.U_empID}
                  options={EmployeeData} // Options to display in the dropdown
                  onChange={e => {
                    setEmployeeName(e.label)
                    setEmployeeValue(e.value)
                  }}
                  // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
            </div>
            <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
              <label>Basic Salary</label>
              <input
                type='Number'
                class='form-control'
                id='Number'
                onChange={e => {
                  setBasicSalary(e.target.value)
                }}
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.U_BasicSalary}
              ></input>
            </div>
            <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
              <label>Remark</label>
              <input
                type='text'
                class='form-control'
                id='text'
                aria-describedby='text'
                onChange={e => {
                  setRemarks(e.target.value)
                }}
                defaultValue={HeaderData && HeaderData.Remark}
              ></input>
            </div>
          </card>
        </Container>
        </DIV3>
      </CardGroup>
      <br/>
      <div>
        {TableData && (
          <Table responsive striped bordered hover>
            <tr>
              <th>#</th>
              <th>Allowance Code</th>
              <th>Allowance Percent</th>
              <th>Allowance Amount</th>
            </tr>

            <tbody>
              {TableData.map((item, index) => (
                <tr key={`${index}`}>
                  <td> {index + 1}</td>
                  <td>{item.Name}
                  {/* <Select
                  // placeholder={HeaderData && HeaderData.ReqType}
                  //options={Automaticallowance} // Options to display in the dropdown
                  onChange={e => {
                    tabletextchange(e,index)
                  }}
                  value=
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                /> */}
                  </td>
                  <td>
                    <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      placeholder={CollectionLines && CollectionLines.U_AllowancePercent}
                      name='U_AllowancePercent'
                      onChange={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      defaultValue={item.U_Percent}
                    ></input>
                  </td>
                  <td>
                    <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_AllowanceAmount'
                      placeholder={CollectionLines && CollectionLines.U_AllowanceAmount}
                      onClick={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      defaultValue={(item.U_Amount + ((item.U_Percent * GrossSalary)/100))}
                    ></input>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <br/>
      <br/>
      <div style={{marginLeft:'2rem'}}>
      <Button 
               style={{ marginLeft: '5%' }}
              
               onClick={() => {
                Submit_PatchFunc()
              }}
              >{ButtonName}</Button>
        <Button 
        style={{ marginLeft: '5%' }}
        onClick={() => {
                  window.location.href="/Home"
                }}
        >Cancel</Button>
      </div>
      </Form>
    </>
  )
}
