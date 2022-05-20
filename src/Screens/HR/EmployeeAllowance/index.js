
import React from 'react'
import { Button, Accordion, Card, CardGroup, Container,Table,Form } from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Potential () {
  const [EmployeeData, setEmployeeData] = React.useState()
  const [PostingDate, setPostingDate] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [PeriodMonthData, setPeriodMonthData] = React.useState()
  const [Remarks, setRemarks] = React.useState()
  const [PeriodMonthlabel, setPeriodMonthlabel] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")

  const [TableData, setTableData] = React.useState()
  const [Periodlabel, setPeriodlabel] = React.useState()
  const [PeriodCodeData, setPeriodCodeData] = React.useState()
  const [PeriodValue, setPeriodValue] = React.useState()
  
  const [AllowanceValue, setAllowanceValue] = React.useState()
  const [Allowancelabel, setAllowancelabel] = React.useState()
  const [AllowanceData, setAllowanceData] = React.useState()
  const [CollectionLines, setCollectionLines] = React.useState()
 
  const alert = useAlert();
  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')

    setButtonName("Add") 
  }, [])
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  const Home = () => {
    const alert = useAlert();
  
  }; 
  const handleSubmitted = ({ res, fields,Dropdown, form }) => {
 
    form.reset() 
    Dropdown.reset()
  }
  React.useEffect(async () => {
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
        api: LINKS.sap.HumanResources.Allowance,
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
        api: LINKS.sap.HumanResources.EmployeeAllowance,
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
          api: `OEAE(${id})`,
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
      U_AllowanceCode:AllowanceValue ,
      U_AllowanceName:Allowancelabel ,
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
    body["EAE1Collection"]= DocLines

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
    let sapAPi = `OEAE(${TextItemChangedObject})`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data)
        console.log(res.data)
        setCollectionLines(res.data.EAE1Collection)
        console.log(res.data.EAE1Collection)
        if (HeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const submitAllowance = async () => {
    let body={
      U_DocDate:PostingDate ,
      U_AllowanceCode:AllowanceValue ,
      U_AllowanceName:Allowancelabel ,
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

    body["EAE1Collection"]= DocLines
   
 
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:  JSON.stringify(body),
          api: LINKS.sap.HumanResources.EmployeeAllowance,
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
      submitAllowance()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
    return (
        <><NavBar/>
        <h2 style={{textAlign:'center'}}>Employee Allowance</h2>
        <Form onSubmit={handleSubmitted}>
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
                    placeholder={HeaderData && HeaderData.DocEntry}
                  readOnly='readOnly'
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
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Allowance Code</label>
                <Select
                  placeholder={HeaderData && HeaderData.U_AllowanceCode}
                 options={AllowanceData} // Options to display in the dropdown
                  onChange={e => {
                    setAllowanceValue(e.value)
                    setAllowancelabel(e.label)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: ' ' }}>
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
  {PeriodCodeData ?null:(
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
    <div style={{ width: '23.5rem' ,marginLeft:'3rem' }}>
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
    <div style={{ width: '23.5rem'  ,marginLeft:'3rem'}}>
    <label>Allowance Name</label>
    <input
                  type='text'
                  class='form-control'
                  id='Number'
                  defaultValue={Allowancelabel}
                  placeholder={HeaderData && HeaderData.U_AllowanceName}
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
      <br/>
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
                      placeholder={item.U_Amount}
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
