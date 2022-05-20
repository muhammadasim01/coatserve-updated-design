import React from 'react'
import { Button, Accordion, Card, CardGroup, Container,Form } from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Potential () {
  const [EmployeeName, setEmployeeName] = React.useState()
  const [EmployeeValue, setEmployeeValue] = React.useState()
  const [PostingDate, setPostingDate] = React.useState()
  const [Amount, setAmount] = React.useState()
  const [StartDate, setStartDate] = React.useState()
  const [NoOfInstallment, setNoOfInstallment] = React.useState()
  const [Reason, setReason] = React.useState()
  const [Remarks, setRemarks] = React.useState()
  const [LoanType, setLoanType] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [Stop, setStop] = React.useState()
  const [EmployeeData, setEmployeeData] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const alert = useAlert();
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
   
    Employee(cook)
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
          api: `OLOA(${id})`,
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
        U_empID:EmployeeValue,
        U_EmployeeName:EmployeeName,
        U_LoanType:LoanType,
        U_Amount:Amount,
        U_NoOfInstallments:NoOfInstallment,
        U_StartDate:StartDate,
        U_Reason:Reason,
        U_Stop:Stop,
        Remark:Remarks
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
    let sapAPi = `OLOA(${TextItemChangedObject})`

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
  const submitLoan_Advance = async () => {
    let body = {
        U_DocDate:PostingDate,
        U_empID:EmployeeValue,
        U_EmployeeName:EmployeeName,
        U_LoanType:LoanType,
        U_Amount:Amount,
        U_NoOfInstallments:NoOfInstallment,
        U_StartDate:StartDate,
        U_Reason:Reason,
        U_Stop:Stop,
        Remark:Remarks
    
    }
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:JSON.stringify(body),
          api: LINKS.sap.HumanResources.Loan_AdvanceApliation,
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
  const handleSubmitted = ({ res, fields,Dropdown, form }) => {
 
    form.reset() 
    Dropdown.reset()
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitLoan_Advance()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: 'center' }}>Loan/Advance Appliation</h2>
     
      <CardGroup>
        <DIV3>
        <Container fluid>
          <div style={{ marginRight: '5rem' }}>
            <card>
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
            <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>DocEntry</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  name='DocEntry'
                  readOnly='readOnly'
                  defaultValue={HeaderData && HeaderData.DocEntry}
                  aria-describedby='Number'
                //   onChange={e => {
                //     setCode(e.target.value)
                //   }}
                ></input>
              </div>
            <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Posting Date</label>
                <input
                  type='date'
                  class='form-control'
                  id='Number'
                  name='DocDate'
                  defaultValue={HeaderData && HeaderData.U_DocDate}
                  aria-describedby='Number'
                  onChange={e => {
                    setPostingDate(e.target.value)
                  }}
                ></input>
              </div>
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Employee Name</label>
                <Select
                  placeholder={HeaderData && HeaderData.U_EmployeeName}
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
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Amount</label>
                <input
                  type='number'
                  class='form-control'
                  id='Number'
                  name='Code'
                  aria-describedby='Number'
                  onChange={e => {
                    setAmount(e.target.value)
                  }}
                  defaultValue={HeaderData && HeaderData.U_Amount}
                ></input>
              </div>
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Start Date</label>
                <input
                  type='date'
                  class='form-control'
                  id='Number'
                  name='StartDate'
                  aria-describedby='Number'
                  onChange={e => {
                    setStartDate(e.target.value)
                  }}
                  defaultValue={HeaderData && HeaderData.U_StartDate}
                ></input>
              </div>
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Stop</label>
                <Select
                  placeholder={HeaderData && HeaderData.U_Stop}
                  options={[
                    { label: '0 - No', value: 0 },
                    { label: '1 - Yes', value: 1 },
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    setStop(e.value)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
              </div>
            </card>
          </div>
          </Container>
          </DIV3>
          <br />
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
            <div style={{ width: '23.5rem'  ,marginLeft:'3rem' }}>
              <label>DocNum</label>
              <input
                type='text'
                class='form-control'
                id='Text'
                readOnly='readOnly'
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.DocNum}
                // onChange={e => {
                //   setName(e.target.value)
                // }}
              ></input>
            </div>
           
            <div style={{ width: '23.5rem' ,marginLeft:'3rem' }}>
              <label>Loan Type</label>
              <Select
                     placeholder={HeaderData && HeaderData.U_LoanType}
                  options={[
                    { label: '0 - Advance Salary', value: 0 },
                    { label: '1 - Personal Loan', value: 1 },
                    { label: '2 - Provident Fund Loan', value: 2 }
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    setLoanType(e.value)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
            </div>
            <div style={{ width: '23.5rem' ,marginLeft:'3rem' }}>
              <label>No Of Installments</label>
              <input
                type='Number'
                class='form-control'
                id='Number'
                onChange={e => {
                  setNoOfInstallment(e.target.value)
                }}
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.U_NoOfInstallments}
              ></input>
            </div>
            <div style={{ width: '23.5rem'  ,marginLeft:'3rem'}}>
              <label>Reason</label>
              <input
                type='text'
                class='form-control'
                id='Number'
                onChange={e => {
                  setReason(e.target.value)
                }}
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.U_Reason}
              ></input>
            </div>
            <div style={{ width: '23.5rem' ,marginLeft:'3rem' }}>
              <label>Remarks</label>
              <input
                type='text'
                class='form-control'
                id='Number'
                onChange={e => {
                  setRemarks(e.target.value)
                }}
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.Remark}
              ></input>
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
          
    </>
  )
}
