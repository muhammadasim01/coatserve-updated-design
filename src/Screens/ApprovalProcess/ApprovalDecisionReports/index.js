import React from 'react'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Button, CardGroup, Table, Container,Card } from 'react-bootstrap'
import NavBar from '../../../Component/Global/Navbar'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import Select from 'react-select'
const axios = require('axios')

export default function ApprovalStatusReport () {
    const [UserDropDown, setUserDropDown] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()

    const [TemplateDropDown, setTemplateDropDown] = React.useState()
    const [VendorDropDown, setVendorDropDown] = React.useState()
    const [getDate, setgetDate] = React.useState(Date.parse("2022-2-1"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
    const [DropDownValues, setDropDownValues] = React.useState()

    const API_TYPES = {
        GET: `${LINKS.api}/GetApi`,
        POST: `${LINKS.api}/POSTApi`,
        PATCH: `${LINKS.api}/PATCHApi`
      }
    
      React.useEffect(async () => {
        today()
        compareDate()
        let cook = await localStorage.getItem('cookie')
        const show = await localStorage.getItem('ShowBranches')
        if (showA == 'true') {
          setShowA(true)
          // setShow1(true)
          compareDate()
          await localStorage.removeItem('ShowBranches')
        }
        ApprovalTemplate(cook)
        ActiveUsers(cook)
        BusinessPartners(cook)
      }, [])

      const today = () =>{
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        setcurrentDate(year + "-" + month + "-" + day ) 
        // console.log("Today",currentDate)
      }
    const ActiveUsers = async cookie => {
        // -------------------------    Items API GET DATA   ------------------------------------------------------
        await axios
          .post(
            API_TYPES.GET,
    
            { api: LINKS.sap.MasterData.ActiveUsers, cookie: cookie }
          )
          .then(function (res) {
            console.log(res)
            if (res.data.value) {
              let ItemsDropDown = []
    
              res.data.value.forEach(element => {
                ItemsDropDown.push({
                  value: element.UserCode,
                  label: element.UserName
                })
              })
              setUserDropDown(ItemsDropDown)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      const compareDate = async () => {

        let cook = await localStorage.getItem('cookie')
        let SAPapi = `LicenseService_GetInstallationNumber`
        await axios
          .post(`${LINKS.api}/GetLicenseApi`, {
            api: SAPapi,
            cookie: cook
          })
          .then(function (res) {
       if (Date.parse(currentComDate) > getDate ) {
          console.log(currentComDate)
          console.log(getDate)
          alert.error("License Expired")
          window.location.href="/DisabledHomeScreen";
        } 
      
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      const BusinessPartners = async cookie => {
        // -------------------------    Items API GET DATA   ------------------------------------------------------
        await axios
          .post(
            API_TYPES.GET,
    
            { api: LINKS.sap.MasterData.ActiveVendor, cookie: cookie }
          )
          .then(function (res) {
            console.log(res)
            if (res.data.value) {
              let ItemsDropDown = []
    
              res.data.value.forEach(element => {
                ItemsDropDown.push({
                  value: element.CardCode,
                  label:element.CardCode+" : "+ element.CardName
                })
              })
              setVendorDropDown(ItemsDropDown)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      const ApprovalTemplate = async cookie => {
        // -------------------------    Items API GET DATA   ------------------------------------------------------
        await axios
          .post(
            API_TYPES.GET,
    
            { api: LINKS.sap.ApprovalProcess.ActiveTemplates, cookie: cookie }
          )
          .then(function (res) {
            console.log(res)
            if (res.data.value) {
              let ItemsDropDown = []
    
              res.data.value.forEach(element => {
                ItemsDropDown.push({
                  value: element.Code,
                  label: element.Name
                })
              })
              setTemplateDropDown(ItemsDropDown)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      const DropDownChangeFun = (e,name) =>{
          let obj={}
          obj[name]=e.label
          setDropDownValues(obj)
        console.log(obj)
      }
      const TextValueChangeFun = (e) =>{
        let obj={}
        obj[e.target.name]=e.target.value
        setDropDownValues(obj)
      console.log(obj)
    }
   const  checkvalue=(e)=>{
    
        console.log((e.target.name), (e.target.checked))
    }
  return (
    <>
      <NavBar />
      <h1 style={{ textAlign: 'center' }}>Approval Decision Report</h1>
     <div style={{marginLeft:'1rem'}}>
      <h3><u>Decision</u></h3>
      <div  class="form-check form-check-inline">
                <input class="form-check-input"  name='Pending' onChange={e=>checkvalue(e)} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">No Decision Yet</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='Approved' onChange={e=>checkvalue(e)} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label"  for="inlineCheckbox1">Approved</label>
              </div><br/> <div  class="form-check form-check-inline">
                <input class="form-check-input" name='Rejected' onChange={e=>checkvalue(e)} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Rejected</label>
              </div> <br /><br />
             </div>
              <CardGroup>
              <DIV3>
              <Container fluid>
            <label>Originator From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options={UserDropDown} // Options to display in the dropdown
                onChange={(e)=>DropDownChangeFun(e,'OriginatorFrom')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <label>Authorizer From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options={UserDropDown} // Options to display in the dropdown
                onChange={(e)=>DropDownChangeFun(e,'AuthorizerFrom')}// Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <label>Template From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select   
                placeholder=''
                options={TemplateDropDown} // Options to display in the dropdown
                onChange={(e)=>DropDownChangeFun(e,'TemplateFrom')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <label>Request Date From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                value={currentDate}
                type='date'
                class='form-control'
                name='RequestDateFrom'
                onChange={e=>TextValueChangeFun(e)}
                aria-describedby='emailHelp'
                // value={HeaderData && HeaderData.DateTo}
              />
            </div>
           
            </Container>
              </DIV3>
              <DIV4>
              {UserDropDown ? null:(
              <Card style={{border:'none'}} >
    
    <div className="inside">
    <img src="/Image/2.png" style={{width:'2.5rem ' ,height:'2.5rem',marginLeft:'15.5rem', marginTop:'0.5rem'}}   class="spine"/>
    <div className="inside">
    <img src="/Image/3.png" style={{width:'2rem' ,height:'2rem',marginLeft:'14rem',marginTop:'-1.85rem'}}  class="spin" />
    <div className="inside">
    <img src="/Image/Logo8.png" style={{width:'1rem' ,height:'1rem',marginLeft:'12.6rem',marginTop:'-5.6rem'}}  class="" /> 
    </div>
    </div>
    </div>
       <img src="/Image/1.png" style={{width:'3rem',height:'3rem',marginLeft:'17rem',marginTop:'2rem'}} class="spin"/>  
       </Card>)}
              </DIV4>
              <DIV3>
              <Container>
              <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
              <label>To</label>
           
              <Select
                placeholder=''
                options={UserDropDown} // Options to display in the dropdown
                onChange={(e)=>DropDownChangeFun(e,'OriginatorTo')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto'  ,marginLeft:'3rem' }}>
            <label>To</label>
           
              <Select
                placeholder=''
                options={UserDropDown} // Options to display in the dropdown
                onChange={(e)=>DropDownChangeFun(e,'AuthorizerTo')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto'  ,marginLeft:'3rem' }}>
            <label>To</label>
         
              <Select
                placeholder=''
                options={TemplateDropDown} // Options to display in the dropdown
                onChange={(e)=>DropDownChangeFun(e,'TemplateTo')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto'  ,marginLeft:'3rem' }}>
            <label>To</label>
           
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                type='date'
                class='form-control'
                name='RequestDateTo'
                onChange={e=>TextValueChangeFun(e)}
                aria-describedby='emailHelp'
                value={currentDate}

              />
            </div>
           
            </Container>
              </DIV3>
            
              </CardGroup><br/><br/>
              <div>

              <Button
              style={{ marginLeft: '3%' }}
                // onClick={() => {
                //   submitTimeSheet()
                // }}
              >
                Add
              </Button>
            
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
