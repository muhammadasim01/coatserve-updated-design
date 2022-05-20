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
  const [Code, setCode] = React.useState()
  const [StartTime, setStartTime] = React.useState()
  const [EndTime, setEndTime] = React.useState()
  const [WorkHours, setWorkHours] = React.useState()
  const [OverTime, setOverTime] = React.useState()
  const [LateTime, setLateTime] = React.useState()
  const [Break, setBreak] = React.useState()
  const [Name, setName] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add")
  const [HeaderData, setHeaderData] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState()
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
          api: `OWSD('${id}')`,
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
      U_StartTime:StartTime,
      U_EndTime:EndTime,
      U_LateCountTime: LateTime,
      U_OverTimeCountTime: OverTime,
      U_WorkHours:WorkHours,
      U_Break:Break,
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
    let sapAPi = `OWSD?$filter=Code eq '${TextItemChangedObject}'`

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
  const submitWorkShift = async () => {
    let body = {
      Code: Code,
      Name: Name,
      U_StartTime:StartTime,
      U_EndTime:EndTime,
      U_LateCountTime: LateTime,
      U_OverTimeCountTime: OverTime,
      U_WorkHours:WorkHours,
      U_Break:Break,
    
    }
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.HumanResources.WorkShift,
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
      submitWorkShift()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
  return (
    <>
      <NavBar />
      <h2 style={{ textAlign: 'center' }}>Works Shift Setup</h2>
      <Form onSubmit={handleSubmitted}>
      <CardGroup>
        <DIV3>
        <Container fluid>
          <div style={{ marginRight: '5rem' }}>
            <card>
            <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
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
              <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                <label>Start Time</label>
                <input
                  type='time'
                  class='form-control'
                  id='Number'
                  name='Code'
                  defaultValue={HeaderData && HeaderData.U_StartTime}
                  aria-describedby='Number'
                  onChange={e => {
                    setStartTime(e.target.value)
                  }}
                ></input>
              </div>
              <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                <label>Works Hours</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  name='U_WorkHours'
                  aria-describedby='Number'
                  onChange={e => {
                    setWorkHours(e.target.value)
                  }}
                  defaultValue={HeaderData && HeaderData.U_WorkHours}
                ></input>
              </div>
              <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                <label>Over Time Count Time</label>
                <input
                  type='Number'
                  class='form-control'
                  id='Number'
                  name='U_OverTimeCountTime'
                  aria-describedby='Number'
                  onChange={e => {
                    setOverTime(e.target.value)
                  }}
                  defaultValue={HeaderData && HeaderData.U_OverTimeCountTime}
                ></input>
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
            <div style={{ width: '23.5rem', marginLeft:'3rem'}}>
              <label>Name</label>
              <input
                type='text'
                class='form-control'
                id='Text'
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.Name}
                onChange={e => {
                  setName(e.target.value)
                }}
              ></input>
            </div>
            <div style={{ width: '23.5rem', marginLeft:'3rem' }}>
              <label>End Time </label>
              <input
                type='time'
                class='form-control'
                id='Number'
                onChange={e => {
                  setEndTime(e.target.value)
                }}
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.U_EndTime}
              ></input>
            </div>
            <div style={{ width: '23.5rem', marginLeft:'3rem' }}>
              <label>Late Count Time</label>
              <input
                type='Number'
                class='form-control'
                id='Number'
                onChange={e => {
                  setLateTime(e.target.value)
                }}
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.U_LateCountTime}
              ></input>
            </div>
            <div style={{ width: '23.5rem', marginLeft:'3rem' }}>
              <label>Break</label>
              <input
                type='Number'
                class='form-control'
                id='Number'
                onChange={e => {
                  setBreak(e.target.value)
                }}
                aria-describedby='Number'
                defaultValue={HeaderData && HeaderData.U_Break}
              ></input>
            </div>
          </card>
         
        </Container>
        </DIV3>
      </CardGroup>
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