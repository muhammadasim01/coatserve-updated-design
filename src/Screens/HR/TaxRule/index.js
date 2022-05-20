
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
  const [Code, setCode] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [StartDate, setStartDate] = React.useState()
  const [EndDate, setEndDate] = React.useState()
  const [TableData, setTableData] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
  const [Name, setName] = React.useState()
  const [CollectionLines, setCollectionLines] = React.useState()

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
   
    TaxRuleTableData(cook)
    setButtonName("Add") 
  }, [])
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body:JSON.stringify(body),
          api: `OTRD('${id}')`,
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
      Name: Name,
      U_StartDate: StartDate,
      U_EndDate:EndDate,
      }
      let DocLines = []
      CollectionLines.forEach(element => {
        DocLines.push({
          U_TotalIncome:element.U_TotalIncome,
          U_TaxableAmount:element.U_TaxableAmount,
                U_TaxRate:element.U_TaxRate,
            U_Description:element.U_Description,
             U_Slab:element.U_Slab
      })
    })
      body["TRD1Collection"]= DocLines

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
    let sapAPi = `OTRD?$filter=Code eq '${TextItemChangedObject}'`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data.value[0])
        console.log(res.data.value[0])
        setCollectionLines(res.data.value[0].TRD1Collection)
        console.log(res.data.value[0].TRD1Collection)
        if (HeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const submitTaxRule = async () => {
    let body={
    Code:Code,
    Name: Name,
    U_StartDate: StartDate,
    U_EndDate:EndDate,
    }
    let DocLines = []
    CollectionLines.forEach(element => {
      DocLines.push({
        U_TotalIncome:element.U_TotalIncome,
        U_TaxableAmount:element.U_TaxableAmount,
              U_TaxRate:element.U_TaxRate,
          U_Description:element.U_Description,
           U_Slab:element.U_Slab
    })
})

    body["TRD1Collection"]= DocLines
   
 
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:JSON.stringify(body),
          api: LINKS.sap.HumanResources.TaxRule,
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
        api: LINKS.sap.HumanResources.TaxRule,
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
      submitTaxRule()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
    return (
        <><NavBar/>
        <h2 style={{textAlign:'center'}}>Tax Rule</h2>
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
                  type='date'
                  class='form-control'
                  id='Number'
                  name='StartDate'
                  defaultValue={HeaderData && HeaderData.U_StartDate}
                  aria-describedby='Number'
                  onChange={e => {
                    setStartDate(e.target.value)
                  }}
                ></input>
    <br/>
    <br/>
    <br/>
    </div>
    
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
       <div style={{ width: '23.5rem'  ,marginLeft:'3rem'}}>
    <label>Name</label>
    <input
                  type='text'
                  class='form-control'
                  id='Number'
                  name='Name'
                  defaultValue={HeaderData && HeaderData.Name}
                  aria-describedby='Number'
                  onChange={e => {
                    setName(e.target.value)
                  }}
                ></input>
    </div>
    <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
    <label>End Date</label>
    <input
                  type='date'
                  class='form-control'
                  id='Number'
                  name='EndDate'
                  defaultValue={HeaderData && HeaderData.U_EndDate}
                  aria-describedby='Number'
                  onChange={e => {
                    setEndDate(e.target.value)
                  }}
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
          <th>Tax Slab</th>
          <th>Description</th>
          <th>Total Income</th>
          <th>Tax Rate</th>
          <th>Taxable Amount</th>
          </tr>
          
          <tbody>
          {CollectionLines.map((item, index) => (
                <tr key={`${index}`}>
                  <td> {index + 1}</td>
          <td>
            <div style={{width:'14rem'}}>
          <Select
                  // placeholder={HeaderData && HeaderData.ReqType}
                  options={[
                    { label: 'Slab 1', value: 1 },
                    { label: 'Slab 2', value: 2 },
                    { label: 'Slab 3', value: 3 },
                    { label: 'Slab 4', value: 4 },
                    { label: 'Slab 5', value: 5 },
                    { label: 'Slab 6', value: 6 },
                    { label: 'Slab 7', value: 7 },
                    { label: 'Slab 8', value: 8 },
                    { label: 'Slab 9', value: 9 },
                    { label: 'Slab 10', value: 10 },
                    { label: 'Slab 11', value: 11 },
                    { label: 'Slab 12', value: 12 },
                    { label: 'Slab 13', value: 13},
                    { label: 'Slab 14', value: 14 },
                    { label: 'Slab 15', value: 15 },
                  ]} // Options to display in the dropdown
                  placeholder={item.U_Slab}
                  onChange={e => {
                    tableDropDownchange(e,index,'U_Slab')
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
                      defaultValue={item.U_Description}
                      name='U_Description'
                      onChange={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      // value={item.U_Percent}
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'14rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      defaultValue={item.U_TotalIncome}
                      name='U_TotalIncome'
                      onChange={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      // value={item.U_Percent}
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'14rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_TaxRate'
                      defaultValue={item.U_TaxRate}
                      onChange={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      // value={item.U_Percent}
                    ></input>
                    </div>
          </td>
          <td>
          <div style={{width:'14rem'}}>
          <input
                      type='Number'
                      class='form-control'
                      id='Number'
                      name='U_TaxableAmount'
                      defaultValue={item.U_TaxableAmount}
                      onChange={e => {
                        tabletextchange(e,index)
                      }}
                      aria-describedby='Number'
                      // value={item.U_Percent}
                    ></input>
                    </div>
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
