import React from 'react'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Multiselect } from 'multiselect-react-dropdown'
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Modal,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Tabs,
  Tab
} from 'react-bootstrap'
import NavBar from '../../../Component/Global/Navbar'
import './index.css'
import {  Attachment} from '../../../Component/APDownPaymentRequest';
import {

  General,
 Content,
 LinkedDocument
} from '../../../Component/Activity'

import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
//import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import Select from 'react-select'
import { Logo, TextInput, Alert } from '../../../Component/Global'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function Activity () {
  const alert = useAlert();
  const [CP, setCP] = React.useState(false)
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [SP, setSP] = React.useState()
  const [ButtonName, setButtonName] = React.useState("Add");
  const [ModalHeaderData, setModalHeaderData] = React.useState();
  const [ActivityType, setActivityType] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [Activity, setActivity] = React.useState()
  const [TelephoneNo, setTelephoneNo] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [ContentRemarks, setContentRemarks] = React.useState()
  const [StartTime, setStartTime] = React.useState()
  const [EndTime, setEndTime] = React.useState()
  const [StartDate, setStartDate] = React.useState()
  const [getDate, setgetDate] = React.useState('2022/12/31')
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [EndDate, setEndDate] = React.useState()
  const [ContactPerson, setContactPerson] = React.useState([])
  const [SalesEmployee, setSalesEmployee] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [BusinessPartner, setBusinessPartner] = React.useState()
  const [BusinessPartnerName, setBusinessPartnerName] = React.useState()
  const [ActivityTypeDropdown, setActivityTypeDropdown] = React.useState()
  const [Duration, setDuration] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [SelectedItem, setSelectedItem] = React.useState()
  const [ButtonDropdown, setButtonDropdown] = React.useState()
  const[Remarks, setRemarks]=React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

  React.useEffect(async () => {
    compareDate()
    let cook = await localStorage.getItem('cookie')
    const show = await localStorage.getItem('ShowBranches')
    if (showA == 'true') {
      setShowA(true)
      // setShow1(true)
      compareDate()
      await localStorage.removeItem('ShowBranches')
    }
setButtonName("Add")
    ContactP(cook)
    ActivityTypes(cook)
    BusinessPartners(cook)
  }, [])
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body:  JSON.stringify(body),
          api: `Activities(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
            if (res.data.DocNum) {
            alert.success('Form Submitted Sucessfully')
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

  const compareDate = async () => {

    let cook = await localStorage.getItem('cookie')
    let SAPapi = `LicenseService_GetInstallationNumber`
    await axios
      .post(`${LINKS.api}/GetLicenseApi`, {
        api: SAPapi,
        cookie: cook
      })
      .then(function (res) {
    if (currentComDate > getDate ) {
      alert.error("License Expired")
      window.location.href="/DisabledHomeScreen";
    } 
  
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const submitPatchActivity = async () => {
    let body = {
      ActivityProperty: "cn_Conversation",
       Phone:TelephoneNo,
       CardCode: SelectedItem,
       //Duration: 15,
       DurationType: 'du_Minuts',
       EndDueDate: EndDate,
       EndTime: EndTime,
       ReminderType: 'du_Minuts',
       StartDate: StartDate,
       StartTime: StartTime,
       Remarks:ContentRemarks,
  AttachmentEntry:attachmentresponse
       //ContactPersonCode:ContactPerson
 
      
     }
    console.log(body)
 console.log(SelectedPRDocEntry.DocEntry || HeaderData.DocEntry, body)
    Patch(SelectedPRDocEntry.DocEntry || HeaderData.DocEntry , body)
  }
  const submitActivity = async () => {
    let body = {
     ActivityProperty: "cn_Conversation",
      Phone:TelephoneNo,
      CardCode: SelectedItem,
      //Duration: 15,
      DurationType: 'du_Minuts',
      EndDueDate: EndDate,
      EndTime: EndTime,
      ReminderType: 'du_Minuts',
      StartDate: StartDate,
      StartTime: StartTime,
      Remarks:ContentRemarks,
      AttachmentEntry:attachmentresponse 
    }
    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
            body:  JSON.stringify(body),
          api: LINKS.sap.Activity.PostActivities,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data) {
            alert.success('Operation completed successfully')
          } else {
            alert.error(JSON.stringify(res.data.error.message.value))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitActivity()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatchActivity()
    }
  }
  const AttachmentFunc=()=>{
    console.log(attachmentresponse)
  }
  const SearchAll_Filter_Data = async () => {
    if(SearchNumber==="0"){
      console.log("Show All Data")
      SearchPRNumberAll()
    }
    else{
      console.log("Show Filter Data")
      SearchPRNumberFilter()
    }
  }
  const SearchPRNumberAll = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `Activities` 
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
        console.log(res.data.value)
        if (ModalHeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
      
    setShow1(true)
  }
  const handleClose2 = () => {
    setShow1(false)
  }

  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `Activities?$filter=ActivityCode eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data.value[0])
       console.log(res.data.value[0])

        if(HeaderData!=""){
          setButtonName("Update")
        }
      })
      .catch({})
  }
  const Home = () => {
    const alert = useAlert();
  
  };
  const GetRequesterDetail = async (cookie, api) => {
    let response = {}

    // -------------------------    Items API GET DATA   -----------------------------------------------------------
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (res) {
        response = res
      })
      .catch(function (error) {
        console.log(error)
      })
    let res = apiProcessing(response)
    if (res) {
      let dropdown = []
      res.forEach(element => {
        if (element.UserCode) {
          dropdown.push({ value: element.UserCode, label: element.UserName })
        } else {
          dropdown.push({
            value: element.EmployeeID,
            label:
              element.FirstName +
              '  ' +
              element.MiddleName +
              '  ' +
              element.LastName
          })
        }
      })
      await setRequesterCodeDropdown(dropdown)
    }
  }
  const apiProcessing = res => {
    if (res) {
      if (res.data.value) {
        return res.data.value
      } else {
        alert(
          `Items Details Response Error : <-- ${res.data.error.message.value} -->`
        )
        return null
      }
    }
  }
  
  const ContactP = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.ContactPerson, cookie: cookie }
      )
      .then(function (res) {
        setCP(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.ContactPerson,
              label: element.ContactPerson
            })
          })
          setContactPersonDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const ActivityTypes = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.Activity.ActivityTypes, cookie: cookie }
      )
      .then(function (res) {
        setSP(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name
            })
          })
          setActivityTypeDropdown(ItemsDropDown)
          setButtonName("Add")
          setSearchNumber('0')
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

        { api: LINKS.sap.MasterData.ActiveCustomer, cookie: cookie }
      )
      .then(function (res) {
        setSP(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardName,
              item: element,
            })
          })
          console.log(ItemsDropDown)
          setBusinessPartner(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const BusinessPartnerFun = (e) => {
    setBusinessPartnerName(e.label)
    setSelectedItem(e.value)
    setTelephoneNo(e.item.Phone1)
   
  }
  const requesterDropDownfunc = async e => {
    let api = ''
    if (e.value === 171) {
      api = LINKS.sap.MasterData.ActiveEmplyeeInfo
      console.log(e.label)
    } else {
      api = LINKS.sap.MasterData.ActiveUsers
      console.log(e.label)
    }
    setPRBody(e.label)
    setSalesEmployee(e.value)
    
    let cook = await localStorage.getItem('cookie')
    if (cook) GetRequesterDetail(cook, api)
  }
  const ontextItemChanged = e => {
    let obj = TextItemChangedObject
    obj[e.target.name] = e.target.value
    setTextItemChangedObject(obj)
  }
  // const SearchPRNumberFilter = async () => {
  //   let obj = TextItemChangedObject
  //   console.log(obj.SearchPRNumber)
  //   const api = `${LINKS.api}/GetApi`
  //   let sapAPi = `Activities?$filter=DocNum eq '${obj.SearchPRNumber}'`

  //   let cook = await localStorage.getItem('cookie')
  //   await axios
  //     .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
  //     .then(function (res) {
  //       console.log(res)
  //       setPQDocumentLines(res.data.value[0])
  //       console.log(res.data.value[0])
  //     })
  //     .catch({})
  // }

  const addData=()=>{
      console.log(StartTime)
      console.log(StartDate)
      console.log(EndTime)
      console.log(EndDate)
      console.log(ContentRemarks)
  }
  const selectPR = async item => {
    setShow1(false)
    setSelectedPRDocEntry(item)
    console.log(item)
    
  }
 
  return (
    <>
      <NavBar />
      <h1 style={{ textAlign: 'center' }}>Activity</h1>

      {/* Upper Side++++++++ */}

      <CardGroup>
        <DIV3>
          <Container fluid>
       
            <label>Activity</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                onChange={e => setActivity(e.target.value)}
                // placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.Action  || HeaderData && HeaderData.Action}
              ></input>
             
            </div>
            <label>Type</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              {/* {ContactPersonDropdown && ( */}
              <Select
                // value={ContactPersonDropdown.filter(
                //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                // )}
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.ActivityType  ? HeaderData && HeaderData.ActivityType:null}
                options={ActivityTypeDropdown} // Options to display in the dropdown
                onChange={e => setActivityType(e.value)} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              {/* )} */}
            </div>
            <label>Subject</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              {/* {ContactPersonDropdown && ( */}
              <Select
                // value={ContactPersonDropdown.filter(
                //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                // )}
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.Subject  ? HeaderData && HeaderData.Subject:null}
                //options={ContactPersonDropdown} // Options to display in the dropdown
                // onSelect={GroupNo} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              {/* )} */}
            </div>
            <div>
              <label>Assigned To</label>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <Select
                //  placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.BPLName  || HeaderData && HeaderData.BPLName}
                  options={[
                    { label: 'User', value: 12 },
                    { label: 'Employee', value: 171 }
                  ]} // Options to display in the dropdown
                  onChange={e => requesterDropDownfunc(e)} // Function will trigger on select event
                  //onRemove={requesterDropDownfunc} // Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                {RequesterCodeDropdown && (
                  <Select
                  // placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.BPLName  || HeaderData && HeaderData.BPLName}
                    options={RequesterCodeDropdown} // Options to display in the dropdown
                    onChange={e => console.log(e.label)} // Function will trigger on select event
                    // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                    displayValue='name' // Property name to display in the dropdown options
                  />
                )}
              </div>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Assigned By</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                onChange={e => console.log(e.target.value)}
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.BPLName ? HeaderData && HeaderData.BPLName:null}
              ></input>
            </div>
          </Container>
        </DIV3>
        <DIV4>
        {BusinessPartner ?null:(
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
          <div className="Activity"
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' ,border:'1px solid',borderColor:'lightgray',borderRadius:'4px'}}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon20" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
          <input
              name={'SearchPRNumber'}
              type='Number'
              placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.BPLName?HeaderData && HeaderData.BPLName:null}
              class='form-control20'
              onChange={e => {
                setSearchNumber(e.target.value)
              }}
            /><br/>
            {/* <Button
             
              onClick={e => {
                SearchAll_Filter_Data()
              }}
            >
              Search
            </Button> */}
            </div><br/>

            <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Open Activity List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ModalHeaderData && (
            <Table responsive>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>Activity Code</th>
                  <th>Card Code</th>
                  <th>Start Date</th>
                  <th>End Due Daate</th>
                  
                  
                </tr>
              </TableHead>
              <tbody>
                {ModalHeaderData.map((item, index) => (
                  <tr key={`${index}`} onClick={e => {
                    console.log(item)
                    selectPR(item)
                    handleClose2()
                  }}>
                    <TD>
                      {index + 1}
                      
                    </TD>
                    <TD>{item.ActivityCode}</TD>
                  
                    <TD>{item.CardCode}</TD>
                    <TD>{item.StartDate}</TD>
                    <TD>{item.EndDueDate}</TD>
                    
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose2}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose2}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
              <label>BP Name</label>
              <Select
                // value={ContactPersonDropdown.filter(
                //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                // )}
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.CardName?HeaderData && HeaderData.CardName:null}
                options={BusinessPartner} // Options to display in the dropdown
                onChange={e => BusinessPartnerFun(e)} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
              <label>BP Code</label>
              <input
                value={SelectedItem }
                type='text'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.CardCode? HeaderData && HeaderData.CardCode:null}
              ></input>
             
            </div>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
              <label>Telephone No.</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                defaultValue={TelephoneNo }
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.Phone?HeaderData && HeaderData.Phone:null}
              ></input>
            </div>  
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
            <label>Contact Person</label>
           
              <Select
                // value={ContactPersonDropdown.filter(
                //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                // )}
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.ContactPersonCode?HeaderData && HeaderData.ContactPersonCode:null}
                options={ContactPersonDropdown} // Options to display in the dropdown
                onChange={e => setContactPerson(e.value)} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </Container>
        </DIV3>
      </CardGroup>
      <br /><br />
    <Tabs defaultActiveKey="General" transition={false} id="noanim-tab-example">
    <Tab eventKey="General" title="General">
      <General   
    setStartDate={setStartDate}
    setStartTime={setStartTime}
    setEndDate={setEndDate}
      setEndTime={setEndTime}
      SelectedPRDocEntry={SelectedPRDocEntry}
      HeaderData={HeaderData}
      />
      </Tab>
      <Tab eventKey="Content" title="Content">
      <Content setContentRemarks={setContentRemarks}
        SelectedPRDocEntry={SelectedPRDocEntry}
        HeaderData={HeaderData}
      />
      </Tab>
      <Tab eventKey="LinkedDocument" title="LinkedDocument">
      <LinkedDocument
       SelectedPRDocEntry={SelectedPRDocEntry}
       HeaderData={HeaderData}
      />
      </Tab>
      <Tab eventKey="Attachment" title="Attachment">
        <Attachment
      setattachmentresponse={setattachmentresponse}
      AttachmentFunc={AttachmentFunc}
        />
      </Tab>
      </Tabs>

<br/>
<br/>
<br/>
     
      <div style={{ marginTop: '10%' }}>
      <Button 
               style={{ marginLeft: '5%' }}
               type="reset"
               onClick={() => {
                Submit_PatchFunc()
              }}
              >{ButtonName}</Button>
        {/* <Button
          onClick={() => {
            //addData()
            submitActivity()
          }}
        >
          Add
        </Button> */}
        <Button style={{ marginLeft: '3%' }}
         onClick={() => {
                  window.location.href="/Home"
                }}
        >Cancel</Button>
      </div>
    </>
  )
}
