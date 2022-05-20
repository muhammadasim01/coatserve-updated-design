
import React from 'react'
import { Button, Accordion, Card, CardGroup, Container,Table ,Form} from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Potential () {
  const alert = useAlert();
  const [EmployeeData, setEmployeeData] = React.useState()
  const [PostingDate, setPostingDate] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [PeriodMonthData, setPeriodMonthData] = React.useState()
  const [Remarks, setRemarks] = React.useState()
  const [CollectionLines, setCollectionLines] = React.useState()
  const [PeriodMonthlabel, setPeriodMonthlabel] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()

  const [TableData, setTableData] = React.useState()
  const [Periodlabel, setPeriodlabel] = React.useState()
  const [PeriodCodeData, setPeriodCodeData] = React.useState()
  const [PeriodValue, setPeriodValue] = React.useState()
  
  const [AllowanceValue, setAllowanceValue] = React.useState()
  const [Allowancelabel, setAllowancelabel] = React.useState()
  const [AllowanceData, setAllowanceData] = React.useState()
 
  const Home = () => {
    const alert = useAlert();
  
  }; 
  
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
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
        api: LINKS.sap.HumanResources.Deduction,
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
          setAllowanceData(ItemsDropDown)
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
        api: LINKS.sap.HumanResources.EmployeeDeduction,
        cookie: cookie
      })
      .then(function (res) {
        setCollectionLines(res.data.value)
      
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
          body:  JSON.stringify(body),
          api: `OEDN(${id})`,
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
      U_DocDate:PostingDate ,
      U_DeductionCode:AllowanceValue ,
      U_DeductionName:Allowancelabel ,
      U_PeriodCode:PeriodValue ,
      U_PeriodName:Periodlabel ,
      U_PeriodMonth:PeriodMonthlabel ,
      Remark:Remarks,
    }
    let DocLines = []
    CollectionLines.forEach(element => {
      DocLines.push({
        U_empID:element.U_empID ,
        U_Amount: element.U_Amount
      })
    })
    body["EDN1Collection"]= DocLines

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
    let sapAPi = `OEDN(${TextItemChangedObject})`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data)
        console.log(res.data)
        setCollectionLines(res.data.EDN1Collection)
        console.log(res.data.EDN1Collection)
        if (HeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const submitDeduction = async () => {
    let body={
      U_DocDate:PostingDate ,
      U_DeductionCode:AllowanceValue ,
      U_DeductionName:Allowancelabel ,
      U_PeriodCode:PeriodValue ,
      U_PeriodName:Periodlabel ,
      U_PeriodMonth:PeriodMonthlabel ,
      Remark:Remarks,
    }
    let DocLines = []
    CollectionLines.forEach(element => {
      DocLines.push({
        U_empID:element.U_empID ,
        U_Amount: element.U_Amount
      })
    })

    body["EDN1Collection"]= DocLines
   
 
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:  JSON.stringify(body),
          api: LINKS.sap.HumanResources.EmployeeDeduction,
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
      submitDeduction()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
    return (
        <><NavBar/>
        <h2 style={{textAlign:'center'}}>Employee Deduction</h2>
        <Form onSubmit={handleSubmitted}>
     <CardGroup>
    <DIV3>
      <Container>
        <div style={{marginRight:'5rem'}} >
        <card >
        <div style={{ width: '23.5rem', marginLeft: '2rem' }}>
                <label>DocEntry</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  placeholder={HeaderData && HeaderData.DocEntry}
                  name='DocEntry'
                  readOnly='readOnly'
                  aria-describedby='Number'
                //   onChange={e => {
                //     setCode(e.target.value)
                //   }}
                ></input>
              </div>
            <div style={{ width: '23.5rem', marginLeft: '2rem' }}>
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
              {/* <div style={{ width: '23.5rem', marginLeft: '2rem' }}>
                <label>Period Name</label>
                <input
                  type='text'
                  class='form-control'
                  id='Number'
                  name='DocDate'
                  aria-describedby='Number'
                  onChange={e => {
                    setPeriodName(e.target.value)
                  }}
                ></input>
              </div> */}
              <div style={{ width: '23.5rem', marginLeft: '2rem' }}>
                <label>Deduction Code</label>
                <Select
                placeholder={HeaderData && HeaderData.U_DeductionCode}
                 options={AllowanceData} // Options to display in the dropdown
                  onChange={e => {
                    setAllowanceValue(e.value)
                    setAllowancelabel(e.label)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '2rem' }}>
                <label>Remarks</label>
                <input
                  type='text'
                  class='form-control'
                  id='Number'
                  name='StartDate'
                  defaultValue={HeaderData && HeaderData.Remark}
                  aria-describedby='Number'
                  onChange={e => {
                    setRemarks(e.target.value)
                  }}
                ></input>
              </div>
            
    
    </card>
  </div>
  </Container>
  </DIV3> 
  <DIV4></DIV4>
  <DIV3>
  <Container>
       <card>
       <div style={{ width: '23.5rem' }}>
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
       <div style={{ width: '23.5rem' }}>
                <label>DocNum</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  defaultValue={HeaderData && HeaderData.DocNum}
                  name='DocEntry'
                  readOnly='readOnly'
                  aria-describedby='Number'
                //   onChange={e => {
                //     setCode(e.target.value)
                //   }}
                ></input>
              </div>
    <div style={{ width: '23.5rem' }}>
    <label>Period Code</label>
    <Select
         
         placeholder={HeaderData && HeaderData.U_PeriodCode}
          options={PeriodCodeData} // Options to display in the dropdown
          onChange={e => {
            setPeriodValue(e.value)
            setPeriodlabel(e.label)
          }} // Function will trigger on select event
          // onRemove={requesterDropDownfunc}
          displayValue='label' // Property name to display in the dropdown options
        />
    </div>
    <div style={{ width: '23.5rem' }}>
    <label>Period Month</label>
    <Select
                placeholder={HeaderData && HeaderData.U_PeriodMonth}
                 options={PeriodMonthData} // Options to display in the dropdown
                  onChange={e => {
                    // setAllowanceValue(e.value)
                    setPeriodMonthlabel(e.label)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
    </div>
    <div style={{ width: '23.5rem' }}>
    <label>Deduction Name</label>
    <input
                  type='text'
                  class='form-control'
                  id='Number'
                  defaultValue={HeaderData && HeaderData.U_DeductionName}
                  value={Allowancelabel}
                  name='EndDate'
                  aria-describedby='Number'
                  // onChange={e => {
                  //   setAllowanceName(e.target.value)
                  // }}
                ></input>
    </div>
   
          
        </card>
        </Container>
        </DIV3>
      </CardGroup>
      <div>
      {CollectionLines && (
          <Table responsive striped bordered hover>
        
          <tr>
          <th>#</th>
          <th>Employee No</th>
          <th>Amount</th>
          </tr>
          
          <tbody>
              {CollectionLines.map((item, index) => (
                <tr key={`${index}`}>
                   <td> {index + 1}</td>
          <td>
          <Select
                  placeholder={item.U_empID}
                  options={EmployeeData} // Options to display in the dropdown
                  onChange={e => {
                    tableDropDownchange(e,index,'U_empID')
                    // setEmployeeName(e.label)
                    // setEmployeeValue(e.value)
                  }}
                  // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
          </td>
          
          <td>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_Amount'
                      defaultValue={item.U_Amount}
                      onChange={e => {
                        tabletextchange(e,index)
                        // setAmount(e.target.value)
                      }}
                      aria-describedby='Number'
                      // value={item.U_Percent}
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
          <div style={{marginLeft:'1rem'}}>
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
