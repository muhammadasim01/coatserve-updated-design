

import React from 'react'
import { Button, Accordion, Card, CardGroup, Container,Table,Form } from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Potential () {
  const [Code, setCode] = React.useState()
  const [StartDate, setStartDate] = React.useState()
  const [EndDate, setEndDate] = React.useState()
  const [CollectionLines, setCollectionLines] = React.useState()
  const [LockedValue, setLockedValue] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
  const [Name, setName] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const alert = useAlert();
  const [HeaderData, setHeaderData] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  const Home = () => {
    const alert = useAlert();
  
  }; 
  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
   
    setButtonName("Add") 
    TaxRuleTableData(cook)
  }, [])
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `OFSY('${id}')`,
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
  const submitPatch = async () => {
   
    let body={
      Code:Code,
    Name: Name,
    U_StartDate: StartDate,
    U_EndDate:EndDate,
    U_Locked:LockedValue
    }
    let DocLines = []
    CollectionLines.forEach(element => {
      DocLines.push({
        U_Month:element.U_Month ,
        U_StartDate:element.U_StartDate,
        U_Locked:element.U_Locked ,
        U_MonthCode:element.U_MonthCode ,
        U_EndDate:element. U_EndDate
      })
    })
    body["FSY1Collection"]= DocLines

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
    let sapAPi = `OFSY?$filter=Code eq '${TextItemChangedObject}'`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data.value[0])
        console.log(res.data.value[0])
        setCollectionLines(res.data.value[0].FSY1Collection)
        console.log(res.data.value[0].FSY1Collection)
        if (HeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const submitFiscalYear = async () => {
    let body={
    Code:Code,
    Name: Name,
    U_StartDate: StartDate,
    U_EndDate:EndDate,
    U_Locked:LockedValue
    }
    let DocLines = []
    CollectionLines.forEach(element => {
      DocLines.push({
        U_Month:element.U_Month ,
        U_StartDate:element.U_StartDate,
        U_Locked:element.U_Locked ,
        U_MonthCode:element.U_MonthCode ,
        U_EndDate:element. U_EndDate
    })
})

    body["FSY1Collection"]= DocLines
   
 
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.HumanResources.FiscalYear,
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
  const TaxRuleTableData = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.HumanResources.FiscalYear,
        cookie: cookie
      })
      .then(function (res) {
     setCollectionLines(res.data.value)
      
      })
      .catch(function (error) {
        console.log(error)
      })
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
      submitFiscalYear()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
    return (
        <><NavBar/>
        <h2 style={{textAlign:'center'}}>Fiscal Year</h2>
        <Form onSubmit={handleSubmitted}>
     <CardGroup>
    <DIV3>
    <Container>
        <div style={{marginRight:'5rem'}} >
        <card >
        <div style={{ width: '23.5rem', marginLeft: '' }}>
              <input
                name={'SearchPRNumber'}
                type='Number'
                placeholder=''
                class='form-control'
                onChange={e => {
                  setCode(e.target.value)
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
    <label>Start Date</label>
    <input
      
      type='Date'
      class='form-control'
      id='Number'
      onChange={e => {
        setStartDate(e.target.value)
      }}
      aria-describedby='Number'
      defaultValue={HeaderData && HeaderData.U_StartDate}
    ></input>
    </div>
    <div style={{ width: '23.5rem', marginLeft:'' }}>
    <label>Locked</label>
    <Select
                  placeholder={HeaderData && HeaderData.U_Locked}
                  options={[
                    { label: '0 - No', value: 0 },
                    { label: '1 - Yes', value: 1 },
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    setLockedValue(e.value)
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
    </div>
    <br/>
    <br/>
    <br/>
    </card>
  </div>
  </Container>
  </DIV3>
       <DIV4>
       {/* <Card style={{border:'none'}} >
    
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
       </Card> */}
       </DIV4>    
         <DIV3>
         <Container>
       <card>
       <div style={{ width: '23.5rem',marginLeft:'3rem' }}>
    <label>Name</label>
    <input
       defaultValue={HeaderData && HeaderData.Name}
      type=''
      class='form-control'
      id='text'
      onChange={e => {
        setName(e.target.value)
      }}
      aria-describedby='text'
    ></input>
    
    </div>
    <div style={{ width: '23.5rem',marginLeft:'3rem' }}>
    <label>End Date</label>
    <input
      
      type='date'
      class='form-control'
      id='text'
      defaultValue={HeaderData && HeaderData.U_EndDate}
      onChange={e => {
        setEndDate(e.target.value)
      }}
      aria-describedby='text'
      placeholder='text'
    ></input>
    
    </div>
  
      
      
          
        </card>
        </Container>
        </DIV3>
      </CardGroup>
      <br/>
      <br/>
      <div>
      {CollectionLines && (
          <Table responsive striped bordered hover>
        
          <tr>
          <th>#</th>
          <th>Month Code</th>
          <th>Month</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Locked</th>
          </tr>
          
          <tbody>
          {CollectionLines.map((item, index) => (
                <tr key={`${index}`}>
                  <td> {index + 1}</td>
          <td>
            <div style={{width:'14rem'}}>
          <Select
                 placeholder={item.U_MonthCode}
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
                    tableDropDownchange(e,index,'U_MonthCode')
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
                </div>
          </td>
          <td>
          <div style={{width:'14rem'}}>
          <input
                      type='text'
                      class='form-control'
                      id='Number'
                      name='U_Month'
                      onChange={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      defaultValue={item.U_Month}
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'14rem'}}>
          <input
                      type='date'
                      class='form-control'
                      id='Number'
                      name='U_StartDate'
                      onChange={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      defaultValue={item.U_StartDate}
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'14rem'}}>
          <input
                      type='date'
                      class='form-control'
                      id='Number'
                      name='U_EndDate'
                      onChange={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      defaultValue={item.U_EndDate}
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'14rem'}}>
          <Select
                 placeholder={item.U_Locked}
                  options={[
                    { label: '0 - No', value: 0 },
                    { label: '1 - Yes', value: 1 },
                   
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    tableDropDownchange(e,index,'U_Locked')
                  }} // Function will trigger on select event
                  // onRemove={requesterDropDownfunc}
                  displayValue='label' // Property name to display in the dropdown options
                />
                </div>
          </td>
          </tr>
          ))}
          </tbody>
        </Table>
      )}
          </div>
          <br />
            <br />
            <br />
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
