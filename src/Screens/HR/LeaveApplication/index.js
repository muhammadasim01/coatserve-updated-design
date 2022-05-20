
import React from 'react'
import { Button, Accordion, Card, CardGroup, Container,Table,Form } from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import Select from 'react-select'
import { useAlert } from "react-alert";
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
const axios = require('axios')

export default function Potential () {
  const alert = useAlert();
  const [PostingDate, setPostingDate] = React.useState()
  const [LeaveType, setLeaveType] = React.useState()
  const [FromDate, setFromDate] = React.useState()
  const [Reason, setReason] = React.useState()
  const [Responsibility, setResponsibility] = React.useState()
  const [EmployeeName, setEmployeeName] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [EmployeeValue, setEmployeeValue] = React.useState()
  const [ResponsibilityName, setResponsibilityName] = React.useState()
  const [ToDate, setToDate] = React.useState()
  const [EmergencyContact, setEmergencyContact] = React.useState()
  const [Remarks, setRemarks] = React.useState()
  const [EmployeeData, setEmployeeData] = React.useState()
  const [PaidValue, setPaidValue] = React.useState()
  const [LeaveTypeData, setLeaveTypeData] = React.useState()
  const [LeaveTypeName, setLeaveTypeName] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
    TableLeaveType(cook)
    Employee(cook)

    setButtonName("Add") 
  }, [])
  const Employee = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveEmplyeeInfo,
        cookie: cookie
      })
      .then(function (res) {
        // setTableData(res.data.value)
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
  const Home = () => {
    const alert = useAlert();
  
  }; 
  const TableLeaveType = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.HumanResources.LaeveType,
        cookie: cookie
      })
      .then(function (res) {
        // setTableData(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
             ItemsDropDown.push({
              value: element.Code,
              label:
                element.Name,
               
            })
    
          })
          setLeaveType(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body:JSON.stringify(body),
          api: `OLEV(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocNum) {
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
  const submitPatch = async () => {
   
    let body={
      U_DocDate:PostingDate,
      U_LeaveType:LeaveTypeData,
      U_FromDate:FromDate,
      U_Reason:Reason,
      U_Responsibility:Responsibility,
      U_EmployeeName:EmployeeName,
      U_empID:EmployeeValue,
      U_ToDate:ToDate,
      U_EmergencyContact:EmergencyContact,
      Remark:Remarks,
      U_Paid: PaidValue,
      U_ResponsibleName:ResponsibilityName,
      U_LeaveTypeName:LeaveTypeName
    }
   

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
    let sapAPi = `OLEV(${TextItemChangedObject})`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data)
        console.log(res.data)
        if (HeaderData != '') {
          setButtonName('Update')
        }
        // setCollectionLines(res.data.ESD1Collection[0])
        // console.log(res.data.ESD1Collection[0])
      })
      .catch({})
  }
  const submitLeaveApplication = async () => {
    let body={
      U_DocDate:PostingDate,
      U_LeaveType:LeaveTypeData,
      U_FromDate:FromDate,
      U_Reason:Reason,
      U_Responsibility:Responsibility,
      U_EmployeeName:EmployeeName,
      U_empID:EmployeeValue,
      U_ToDate:ToDate,
      U_EmergencyContact:EmergencyContact,
      Remark:Remarks,
      U_Paid: PaidValue,
      U_ResponsibleName:ResponsibilityName,
      U_LeaveTypeName:LeaveTypeName

    }
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:JSON.stringify(body),
          api: LINKS.sap.HumanResources.LeaveApplication,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocNum) {
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
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitLeaveApplication()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
    return (
        <><NavBar/>
        <h2 style={{textAlign:'center'}}>Leave Application</h2>
        <Form onSubmit={handleSubmitted}>
        <CardGroup>
          <DIV3>
        <Container fluid>
    
        <div style={{marginRight:'5rem'}} >
        <card >
        <div style={{ width: '23.5rem', marginLeft: '' }}>
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
        <div style={{ width: '23.5rem', marginLeft:'' }}>
    <label>Doc Entry</label>
    <input
      
      type='Number'
      class='form-control'
      id='Number'
      readOnly='readOnly'
      aria-describedby='Number'
      defaultValue={HeaderData && HeaderData.DocEntry}
    ></input>
    
    </div>
    <div style={{ width: '23.5rem', marginLeft:'' }}>
    <label>Posting Date</label>
    <input
                type='date'
                class='form-control'
                id='Number'
                name='PostingDate'
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.U_DocDate}
                onChange={e => {
                  setPostingDate(e.target.value)
                }}
              ></input>
    
    </div>

    <div style={{ width: '23.5rem', marginLeft:'' }}>
    <label>Leave Type</label>
    <Select
                   placeholder={HeaderData && HeaderData.U_LeaveType}
                  options={LeaveType} // Options to display in the dropdown
                  onChange={e => {
                    setLeaveTypeData(e.value)
                    setLeaveTypeName(e.label)
                  }}
                  // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
    
    </div>
    <div style={{ width: '23.5rem', marginLeft:'' }}>
    <label>From Date</label>
    <input
                type='date'
                class='form-control'
                id='Number'
                name='FromDate'
                defaultValue={HeaderData && HeaderData.U_FromDate}
                aria-describedby='Number'
                onChange={e => {
                  setFromDate(e.target.value)
                }}
              ></input>
    
    </div>
    <div style={{ width: '23.5rem', marginLeft:''}}>
    <label>To Date</label>
    <input
                type='date'
                class='form-control'
                id='Number'
                defaultValue={HeaderData && HeaderData.U_ToDate}
                name='ToDate'
                aria-describedby='Number'
                onChange={e => {
                  setToDate(e.target.value)
                }}
              ></input>
    
    </div>
    <div style={{ width: '23.5rem', marginLeft:'' }}>
    <label>Reason</label>
    <input
                type='text'
                class='form-control'
                id='Number'
                defaultValue={HeaderData && HeaderData.U_Reason}
                name='Code'
                aria-describedby='Number'
                onChange={e => {
                  setReason(e.target.value)
                }}
               
              ></input>
    
    </div>

    <div style={{ width: '23.5rem', marginLeft:'' }}>
    <label>Responsibility</label>
    <Select
                  defaultValue={HeaderData && HeaderData.U_Responsibility}
                  options={EmployeeData} // Options to display in the dropdown
                  onChange={e => {
                    setResponsibility(e.value)
                    setResponsibilityName(e.value)

                  }}
                  // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
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
       <div style={{ width: '23.5rem' ,marginLeft:'3rem' }}>
    <label>DocNum</label>
    <input
      
      type='Number'
      class='form-control'
      id='Number'
      readOnly='readOnly'
      aria-describedby='Number'
      defaultValue={HeaderData && HeaderData.DocNum}
    ></input>
    
    </div>
    <div style={{ width: '23.5rem',marginLeft:'3rem' }}>
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
    {/* <div style={{ width: '23.5rem', marginLeft:'15rem' }}>
    <label>Employee Name</label>
    <input
                type='text'
                class='form-control'
                id='Number'
                name='EmpName'
                aria-describedby='Number'
                onChange={e => {
                  setEmployeeName(e.target.value)
                }}
              ></input>
    
    </div> */}
    
    <div style={{ width: '23.5rem',marginLeft:'3rem'}}>
    <label>Emergency Contact</label>
    <input
                type='number'
                class='form-control'
                id='Number'
                defaultValue={HeaderData && HeaderData.U_EmergencyContact}
                name='Contact'
                aria-describedby='Number'
                onChange={e => {
                  setEmergencyContact(e.target.value)
                }}
              ></input>
    
    </div>
    <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
    <label>Remark</label>
    <input
                type='text'
                class='form-control'
                id='Number'
                defaultValue={HeaderData && HeaderData.Remark}
                name='Remarks'
                aria-describedby='Number'
                onChange={e => {
                  setRemarks(e.target.value)
                }}
              ></input>
    
    </div>
    <div style={{ width: '23.5rem',marginLeft:'3rem'}}>
    <label>Paid</label>
    <Select
                  placeholder={HeaderData && HeaderData.U_Paid}
                  options={[
                    { label: '0 - No', value: 0 },
                    { label: '1 - Yes', value: 1 }
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    setPaidValue(e.value)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
    </div>
        </card>
        
        </Container>
        </DIV3>
      </CardGroup>
      <br/>
      <br/>
      <div style={{marginLeft:''}}>
      <Button 
               style={{ marginLeft: '5%' }}
              
               onClick={() => {
                Submit_PatchFunc()
              }}
              >{ButtonName}</Button>
              <Button 
            style={{ marginLeft: '3%' }}
            onClick={() => {
                  window.location.href="/Home"
                }}
            >Cancel</Button>
          </div> 
          </Form>
        </>
        
    )
}
