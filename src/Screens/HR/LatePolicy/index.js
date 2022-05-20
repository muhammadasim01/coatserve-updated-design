import React from 'react'
import { Button, Accordion, Card, CardGroup, Container ,Form} from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../../Utils'
import NavBar from '../../../Component/Global/Navbar'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Potential () {
  const alert = useAlert();
  const [DeductionType, setDeductionType] = React.useState()
  const [Code, setCode] = React.useState()
  const [LateDays, setLateDays] = React.useState()
  const [Deduction, setDeduction] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [Name, setName] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
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
  }, [])
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `OLPD('${id}')`,
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
      Code: Code,
      U_Deduction: Deduction,
      Name: Name,
      U_DeductionType:DeductionType,
      U_LateDays:LateDays,
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
    let sapAPi = `OLPD?$filter=Code eq '${TextItemChangedObject}'`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data.value[0])
        console.log(res.data.value[0])
        if (HeaderData != '') {
          setButtonName('Update')
        }
        // setCollectionLines(res.data.ESD1Collection[0])
        // console.log(res.data.ESD1Collection[0])
      })
      .catch({})
  }
  const submitLatePolicy = async () => {
    let body = {
      Code: Code,
      U_Deduction: Deduction,
      Name: Name,
      U_DeductionType:DeductionType,
      U_LateDays:LateDays,
     
    }
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:JSON.stringify(body),
          api: LINKS.sap.HumanResources.LatePolicy,
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
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitLatePolicy()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: 'center' }}>Late Policy</h2>
      <Form onSubmit={handleSubmitted}>
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
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Late Days</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  name='Code'
                  aria-describedby='Number'
                  onChange={e => {
                    setLateDays(e.target.value)
                  }}
                  defaultValue={HeaderData && HeaderData.U_LateDays}
                ></input>
              </div>
              <div style={{ width: '23.5rem', marginLeft: '' }}>
                <label>Deduction Type</label>
                <Select
                   placeholder={HeaderData && HeaderData.U_DeductionType}
                  options={[
                    { label: '0 - Leave', value: 0 },
                    { label: '1 - Salary', value: 1 }
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    setDeductionType(e.value)
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
            <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
              <label>Name</label>
              <input
                type='text'
                class='form-control'
                id='Number'
                name='Code'
                aria-describedby='Number'
                onChange={e => {
                  setName(e.target.value)
                }}
                defaultValue={HeaderData && HeaderData.Name}
              ></input>
            </div>
            <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
              <label>Deduction</label>
              <input
                type='Number'
                class='form-control'
                id='Number'
                name='Code'
                aria-describedby='Number'
                onChange={e => {
                  setDeduction(e.target.value)
                }}
                defaultValue={HeaderData && HeaderData.U_Deduction}
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
          </Form>
    </>
  )
}
