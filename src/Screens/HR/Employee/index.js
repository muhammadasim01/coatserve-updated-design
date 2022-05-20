import React from 'react'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Multiselect } from 'multiselect-react-dropdown'
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Tabs,
  Tab,
  Nav,
  NavDropdown,
  Form,
  Modal,
  FormControl,
  Dropdown,
  DropdownButton,
  ButtonGroup,
 
} from 'react-bootstrap'
import { useAlert } from "react-alert";
import NavBar from '../../../Component/Global/Navbar'
import {

  Address,
  Administration,
  Finance,
  Membership,
  Personal,
  Remarks
} from '../../../Component/EmployeeData'
import {  Attachment} from '../../../Component/APDownPaymentRequest';

import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
//import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import Select from 'react-select'
import { Logo, TextInput, Alert } from '../../../Component/Global'

const axios = require('axios')

const EmployeeMasterData = ({}) => {
   const alert = useAlert();
  const [show1, setShow1] = React.useState(false)
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [SearchNumberBody, setSearchNumberBody] = React.useState()
  const [ButtonName, setButtonName] = React.useState()
  const [TelephoneNo, setTelephoneNo] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [HeaderData, setHeaderData] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState({})
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [DepartmentsDropdown, setDepartmentsDropdown] = React.useState()
  const [SalesEmployeeDropdown, setSalesEmployeeDropdown] = React.useState()
  const [CostCenterDropdown, setCostCenterDropdown] = React.useState()
  const [UserCodeDropdown, setUserCodeDropdown] = React.useState([])
  const [PositionDropdown, setPositionDropdown] = React.useState()
  const [ManagerDropdown, setManagerDropdown] = React.useState()
  const [BusinessPartnerName, setBusinessPartnerName] = React.useState()
  const [LinkedVendorDropdown, setLinkedVendorDropdown] = React.useState()
  const [SelectedItem, setSelectedItem] = React.useState()
  const [ButtonDropdown, setButtonDropdown] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')

    Departments(cook)
    SalesEmployee(cook)
    CostCenter(cook)
    UserCode(cook)
    Position(cook)
    Manager(cook)
    LinkedVendor(cook)
  }, [])
  const Home = () => {
    const alert = useAlert();
  
  }; 
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
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body:  JSON.stringify(body),
          api: `EmployeesInfo(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.value) {
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
  const SubmitPatch = async () => {
    let body = {

      //------Main Posting
      
        AttachmentEntry:attachmentresponse,
       LastName: PQDocumentLines.LastName,
       FirstName: PQDocumentLines.FirstName,
       MiddleName: PQDocumentLines.MiddleName,
       JobTitle: PQDocumentLines.JobTitle,
       Department: PQDocumentLines.Departments,
       Manager:PQDocumentLines.Manager ,
       OfficePhone: PQDocumentLines.OfficePhone,
       MobilePhone: PQDocumentLines.MobilePhone,
       Pager: PQDocumentLines.Pager,
       HomePhone: PQDocumentLines.HomePhone,
       Fax: PQDocumentLines.Fax,
       eMail: PQDocumentLines.E_Mail,
       Position: PQDocumentLines.Position,
       //SalesPersonCode: PQDocumentLines.SalesEmployee,
       CostCenterCode: PQDocumentLines.CostCenterCode,
       LinkedVendor: PQDocumentLines.LinkedVendor,
       //ApplicationUserID:PQDocumentLines.ApplicationUserID,
       OfficeExtension:   PQDocumentLines.OfficeExtension,
       ExternalEmployeeNumber:PQDocumentLines.ExternalEmployeeNumber,
       U_EmplId:PQDocumentLines.U_EmplId,
      
      //  DailyWager: PQDocumentLines.DailyWager,
      //  EOBI: PQDocumentLines.EOBI,
      //  Graduity: PQDocumentLines.Graduity,
      //  OverTime: PQDocumentLines.OverTime,
      //  ProvidentFund: PQDocumentLines.ProvidentFund,
      //  Tax: PQDocumentLines.Tax,
       // -------Address Component Posting
       
       WorkBuildingFloorRoom:PQDocumentLines.WorkBuildingFloorRoom,
       HomeStreet: PQDocumentLines.HomeStreet,
       HomeCity:  PQDocumentLines.HomeCity,
       HomeBlock: PQDocumentLines.HomeBlock,
       HomeStreetNumber: PQDocumentLines.HomeStreetNumber,
       WorkStateCode: PQDocumentLines.WorkStateCode,
       WorkStreetNumber:PQDocumentLines.WorkStreetNumber,
       WorkStreet: PQDocumentLines.WorkStreet,
       WorkBlock: PQDocumentLines.WorkBlock,
       HomeBuildingFloorRoom: PQDocumentLines.HomeBuildingFloorRoom,
       HomeCountry:PQDocumentLines.HomeCountry,
       WorkCountryCode:PQDocumentLines.WorkCountryCode,
 
       // -------Administration Component Posting
 
       StartDate:PQDocumentLines.StartDate,
       TerminationDate:PQDocumentLines.TerminationDate,
      TreminationReason:PQDocumentLines.TreminationReason,
       StatusCode:PQDocumentLines.StatusCode,
 
 
 
        // -------Personal Component Posting
        
        //CitizenshipCountryCode:PQDocumentLines. CitizenshipCountryCode,
        Gender:PQDocumentLines. Gender,
        DateOfBirth:PQDocumentLines. DateOfBirth,
       // CountryOfBirth:PQDocumentLines. CountryOfBirth,
        MartialStatus:PQDocumentLines. MartialStatus,
        NumOfChildren:PQDocumentLines. NumOfChildren,
        IdNumber:PQDocumentLines. IdNumber,
        PassportNumber:PQDocumentLines. PassportNumber,
        PassportExpirationDate:PQDocumentLines. PassportExpirationDate,
        PassportIssueDate:PQDocumentLines. PassportIssueDate,
        PassportIssuer:PQDocumentLines. PassportIssuer,
 
     // -------Finance Component Posting
 
        SalaryUnit: "scu_Month",
        EmployeeCostUnit: "scu_Month",
        Salary:PQDocumentLines. Salary,
        EmployeeCosts:PQDocumentLines. EmployeeCosts,
        BankCode:-1,
        //BankCode:PQDocumentLines. BankCode,
        BankAccount:PQDocumentLines. BankAccount,
        // -------Remarks Component Posting
        Remarks:PQDocumentLines.Remarks
     }
    
     Patch(SearchNumberBody.EmployeeID||HeaderData.EmployeeID, body)
     console.log(SearchNumberBody.EmployeeID, body)
    
  }
  const Position = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.EmployeeMasterData.EmployeePosition, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.PositionID,
              label: element.Name
            })
          })
          setPositionDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Manager = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveEmplyeeInfo, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          console.log(res.data.value)
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.EmployeeID,
              label: element.FirstName+" : "+element.FirstName
            })
          })
          setManagerDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const UserCode = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveUsers, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          let 
          
          ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.UserCode,
              label: element.UserName,
              item:element
             
            })
          })
         
          setUserCodeDropdown(ItemsDropDown)
          console.log(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Departments = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.EmployeeMasterData.Departments, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name,
              item: element
            })
          })
          setDepartmentsDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const SalesEmployee = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveSalesEmployee, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.SalesEmployeeCode,
              label: element.SalesEmployeeName
            })
          })
          setSalesEmployeeDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const CostCenter = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ACtiveCostingCode, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CenterCode,
              label: element.CenterName
            })
          })
          setCostCenterDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const LinkedVendor = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveVendor, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardName
            })
          })
          setLinkedVendorDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const BusinessPartnerFun = e => {
    setBusinessPartnerName(e.label)
    setSelectedItem(e.value)
    setTelephoneNo(e.item.Phone1)
  }
 
  const submitEmployeeMasterData = async () => {
    let body = {
     //------Main Posting
      LastName: PQDocumentLines.LastName,
      FirstName: PQDocumentLines.FirstName,
      MiddleName: PQDocumentLines.MiddleName,
      JobTitle: PQDocumentLines.JobTitle,
      Department: PQDocumentLines.Departments,
      Manager:PQDocumentLines.Manager ,
      OfficePhone: PQDocumentLines.OfficePhone,
      MobilePhone: PQDocumentLines.MobilePhone,
      Pager: PQDocumentLines.Pager,
      HomePhone: PQDocumentLines.HomePhone,
      Fax: PQDocumentLines.Fax,
      eMail: PQDocumentLines.E_Mail,
      Position: PQDocumentLines.Position,
      //SalesPersonCode: PQDocumentLines.SalesEmployee,
      CostCenterCode: PQDocumentLines.CostCenterCode,
      LinkedVendor: PQDocumentLines.LinkedVendor,
     // ApplicationUserID:PQDocumentLines.ApplicationUserID,
      OfficeExtension:   PQDocumentLines.OfficeExtension,
      ExternalEmployeeNumber:PQDocumentLines.ExternalEmployeeNumber,
      U_EmplId:PQDocumentLines.U_EmplId,
     
      // DailyWager: PQDocumentLines.DailyWager,
      // EOBI: PQDocumentLines.EOBI,
      // Graduity: PQDocumentLines.Graduity,
      // OverTime: PQDocumentLines.OverTime,
      // ProvidentFund: PQDocumentLines.ProvidentFund,
      // Tax: PQDocumentLines.Tax,

      // -------Address Component Posting
      
      WorkBuildingFloorRoom:PQDocumentLines.WorkBuildingFloorRoom,
      HomeStreet: PQDocumentLines.HomeStreet,
      HomeCity:  PQDocumentLines.HomeCity,
      HomeBlock: PQDocumentLines.HomeBlock,
      HomeStreetNumber: PQDocumentLines.HomeStreetNumber,
      WorkStateCode: PQDocumentLines.WorkStateCode,
      WorkStreetNumber:PQDocumentLines.WorkStreetNumber,
      WorkStreet: PQDocumentLines.WorkStreet,
      WorkBlock: PQDocumentLines.WorkBlock,
      HomeCountry:PQDocumentLines.HomeCountry,
      WorkCountryCode:PQDocumentLines.WorkCountryCode,
      HomeBuildingFloorRoom: PQDocumentLines.HomeBuildingFloorRoom,

      // -------Administration Component Posting

      StartDate:PQDocumentLines.StartDate,
      TerminationDate:PQDocumentLines.TerminationDate,
     TreminationReason:PQDocumentLines.TreminationReason,
      StatusCode:PQDocumentLines.StatusCode,



       // -------Personal Component Posting
       
       //CitizenshipCountryCode:PQDocumentLines. CitizenshipCountryCode,
       Gender:PQDocumentLines. Gender,
       DateOfBirth:PQDocumentLines. DateOfBirth,
      // CountryOfBirth:PQDocumentLines. CountryOfBirth,
       MartialStatus:PQDocumentLines. MartialStatus,
       NumOfChildren:PQDocumentLines. NumOfChildren,
       IdNumber:PQDocumentLines. IdNumber,
       PassportNumber:PQDocumentLines. PassportNumber,
       PassportExpirationDate:PQDocumentLines. PassportExpirationDate,
       PassportIssueDate:PQDocumentLines. PassportIssueDate,
       PassportIssuer:PQDocumentLines. PassportIssuer,

    // -------Finance Component Posting

       SalaryUnit: "scu_Month",
       EmployeeCostUnit: "scu_Month",
       Salary:PQDocumentLines. Salary,
       EmployeeCosts:PQDocumentLines. EmployeeCosts,
       BankCode:-1,
       //BankCode:PQDocumentLines. BankCode,
       BankAccount:PQDocumentLines. BankAccount,
       // -------Remarks Component Posting
       Remarks:PQDocumentLines.Remarks
    }
    let AbsenceInfoLines = [];
      AbsenceInfoLines.push({
        FromDate: PQDocumentLines.absFromDate,
        ToDate: PQDocumentLines.absToDate,
        Reason: PQDocumentLines.absReason,
        ApprovedBy: PQDocumentLines.absApprovedBy,
       
      })
    let EducationInfoLines = [];
      EducationInfoLines.push({
        FromDate: PQDocumentLines.eduFromDate,
        ToDate: PQDocumentLines.eduToDate,
        EducationType: 1,
        //  EducationType: PQDocumentLines.eduEducationType,
        Institute: PQDocumentLines.eduInstitute,
        Major: PQDocumentLines.eduMajor,
        Diploma: PQDocumentLines.eduDiploma,
      })
    let ReviewsInfoLines = [];
    
      ReviewsInfoLines.push({
        Date: PQDocumentLines.revDate,
        ReviewDescription: PQDocumentLines.revReviewDescription,
        Manager: PQDocumentLines.revManager,
        Grade: PQDocumentLines.revGrade,
        Remarks: PQDocumentLines.revRemarks,
      
      })
  
    let PreviousEmpoymentInfoLines = [];
      PreviousEmpoymentInfoLines.push({
        FromDtae: PQDocumentLines.prvFromDtae,
        ToDate: PQDocumentLines.prvToDate,
        Employer: PQDocumentLines.prvEmployer,
        Position: PQDocumentLines.prvPosition,
        Remarks: PQDocumentLines.prvRemarks,
    
    })
    body["EmployeeAbsenceInfoLines"]= AbsenceInfoLines
    body["EmployeeEducationInfoLines"]= EducationInfoLines
    body["EmployeeReviewsInfoLines"]= ReviewsInfoLines
    body['AttachmentEntry'] =attachmentresponse
    body["EmployeePreviousEmpoymentInfoLines"]= PreviousEmpoymentInfoLines

    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body:  JSON.stringify(body),
          api: LINKS.sap.EmployeeMasterData.EmployeesInfo,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.value) {
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
  const ontextItemChanged = (e,name) => {
    let obj = PQDocumentLines
    obj[name] = e.value
    console.log(obj)
    setPQDocumentLines(obj)
  }
 
  const ontextChanged = e => {
    let itemDetail = PQDocumentLines
    itemDetail[e.target.name] = e.target.value
    setPQDocumentLines(itemDetail)
    console.log(PQDocumentLines)
  }
  const onmodaltextChanged = (e,index,name) => {
    console.log(e,index,name)
    let obj 
    obj[index][name] = e.value
    console.log(obj)
    // setModalInfoLines(obj)
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
    // let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `EmployeesInfo` 
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
    // let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `EmployeesInfo${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value)
        // setPQDocumentLines(res.data.value[0].SalesOpportunitiesLines)
        if(HeaderData!=""){
          setButtonName("Update")
        }
      })
      .catch({})
  }
  const selectPR = async item => {
    setShow1(false)
    setSelectedPRDocEntry(item)
    // setPQDocumentLines(item.SalesOpportunitiesLines)
    console.log("item")
    console.log(item)
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submitEmployeeMasterData()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      SubmitPatch()
    }
  }
  return (
    <>
    
      <NavBar />
      <h1 style={{ textAlign: 'center' }}>Employee Master Data</h1>
      <Form onSubmit={handleSubmitted}>
      <CardGroup>
        <DIV3>
          <Container fluid>
            <label>First Name</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
              defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.FirstName?HeaderData && HeaderData.FirstName:null}
                type='text'
                class='form-control'
                name='FirstName'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
              />
            </div>
            <label>Middle Name</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
               defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.MiddleName?HeaderData && HeaderData.MiddleName:null}
                type='text'
                class='form-control'
                name='MiddleName'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
               // placeholder=''
              />
            </div>
            <label>Last Name</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
              // placeholder={SearchNumberBody.LastName}
                type='text'
                class='form-control'
                name='LastName'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.LastName?HeaderData && HeaderData.LastName:null}
                placeholder=''
              />
            </div>
            <label>Job Title</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
              //value={SearchNumberBody.JobTitle}
                type='text'
                class='form-control'
                name='JobTitle'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.JobTitle?HeaderData && HeaderData.JobTitle:null}
                placeholder=''
              />
            </div>
            <label>Position</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.Position?HeaderData && HeaderData.Position:null}
                options={PositionDropdown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'Position')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>Department</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
         
              <Select
             
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.Department?HeaderData && HeaderData.Department:null}
                options={DepartmentsDropdown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'Departments')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
           
            </div>
            <label>Manager</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.Manager?HeaderData && HeaderData.Manager:null}
                options={ManagerDropdown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'Manager')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>User Code</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // value={ContactPersonDropdown.filter(
                //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                // )}
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.ApplicationUserID?HeaderData && HeaderData.ApplicationUserID:null}
                options={UserCodeDropdown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'ApplicationUserID')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>Sales Empolyee</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // value={ContactPersonDropdown.filter(
                //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                // )}
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.SalesEmployee?HeaderData && HeaderData.SalesEmployee:null}
                options={SalesEmployeeDropdown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'SalesEmployee')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>Cost Center</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // value={ContactPersonDropdown.filter(
                //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                // )}
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.CostCenterCode?HeaderData && HeaderData.CostCenterCode:null}
                options={CostCenterDropdown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'CostCenterCode')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>EOBI</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // placeholder={SearchNumberBody && SearchNumberBody.Position}
                options={[{label:"Yes",value:"Y"},{label:"No",value:"N"}]} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'EOBI')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div> <label>Tax</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // placeholder={SearchNumberBody && SearchNumberBody.Position}
                options={[{label:"Yes",value:"Y"},{label:"No",value:"N"}]} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'Tax')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div> <label>Over Time</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // placeholder={SearchNumberBody && SearchNumberBody.Position}
                options={[{label:"Yes",value:"Y"},{label:"No",value:"N"}]} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'OverTime')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>Provident Fund</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                //placeholder={SearchNumberBody && SearchNumberBody.Position}
                options={[{label:"Yes",value:"Y"},{label:"No",value:"N"}]} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'ProvidentFund')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </Container>
        </DIV3>
        <DIV4>
        {DepartmentsDropdown ?null:(
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
       </Card>
       )}
        </DIV4>
        <DIV3>
          <Container>
          <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
             <input
                  name={'SearchPRNumber'}
                  type='Number'
                  placeholder='Number'
                  class='form-control'
                  onChange={e => {
                    setSearchNumber(e.target.value)
              }}
            />
              
            <br/>
            <Button
              onClick={e => {
                SearchAll_Filter_Data()
              }}
            >
              Search
            </Button></div> <br/>
            <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Open Sales Opportunities List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ModalHeaderData && (
            <Table responsive>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>JobTitle</th>
                  <th>Department</th>
                  
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
                     
                    <TD>{item.EmployeeID}</TD>
                    <TD>{item.FirstName+":"+item.LastName}</TD>
                    <TD>{item.Gender}</TD>
                    <TD>{item.JobTitle}</TD>
                    <TD>{item.Department}</TD>
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
            <br />
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
            <label>Employee No.</label>
           
              <input
                type='text'
                class='form-control'
                name='EmployeeID'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.EmployeeID?HeaderData && HeaderData.EmployeeID:null}
              />
            </div>
             <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
            <label>Old Employee Id</label>
           
              <input
                type='text'
                class='form-control'
                name='U_EmplId'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.U_EmplId?HeaderData && HeaderData.U_EmplId:null}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
            <label>Ext. Employee No.</label>
           
              <input
                type='text'
                class='form-control'
                name='ExternalEmployeeNumber'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.ExternalEmployeeNumber?HeaderData && HeaderData.ExternalEmployeeNumber:null}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>Office Phone</label>
           
              <input
                type='text'
                class='form-control'
                name='OfficePhone'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.OfficePhone?HeaderData && HeaderData.OfficePhone:null}
              />
            </div>
             <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
            <label>Ext.</label>
           
              <input
                type='text'
                class='form-control'
                name='OfficeExtension'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.OfficeExtension?HeaderData && HeaderData.OfficeExtension:null}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>Mobile Phone </label>
            
              <input
                type='text'
                class='form-control'
                name='MobilePhone'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.MobilePhone?HeaderData && HeaderData.MobilePhone:null}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
            <label>Pager</label>
          
              <input
                type='text'
                class='form-control'
                name='Pager'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.Pager?HeaderData && HeaderData.Pager:null}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>Home Phone</label>
          
              <input
                type='text'
                class='form-control'
                name='HomePhone'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.HomePhone?HeaderData && HeaderData.HomePhone:null}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>Fax</label>
            
              <input
                type='text'
                class='form-control'
                name='Fax'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.Fax?HeaderData && HeaderData.Fax:null}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>E-Mail</label>
           
              <input
                type='text'
                class='form-control'
                name='E_Mail'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.eMail?HeaderData && HeaderData.eMail:null}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'   }}>
            <label>Linked Vendor</label>
           
              <Select
             
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.LinkedVendor?HeaderData && HeaderData.LinkedVendor:null}
                options={LinkedVendorDropdown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'LinkedVendor')} // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>Graduity</label>
        
              <Select
                //placeholder={SearchNumberBody && SearchNumberBody.Position}
                options={[{label:"Yes",value:"Y"},{label:"No",value:"N"}]}// Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'Graduity')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
             <label>Daily Wager</label>
            
              <Select
                //placeholder={SearchNumberBody && SearchNumberBody.Position}
                options={[{label:"Yes",value:"Y"},{label:"No",value:"N"}]}// Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'DailyWager')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </Container>
        </DIV3>
      </CardGroup>
      <br />
      <br />
      <Tabs defaultActiveKey="Address" transition={false} id="noanim-tab-example">
      <Tab eventKey="Address" title="Address">
     <Address
      ontextChanged={ontextChanged}
      ontextItemChanged={ontextItemChanged}
      SearchNumberBody={SearchNumberBody}
      />
        </Tab>
        <Tab eventKey="Membership" title="Membership">
        <Membership 
       ontextChanged={ontextChanged}
       ontextItemChanged={ontextItemChanged}
       SearchNumberBody={SearchNumberBody}
      />
      </Tab>
      <Tab eventKey="Administration" title="Administration">
        
        <Administration
        ontextChanged={ontextChanged}
        ontextItemChanged={ontextItemChanged}
        SearchNumberBody={SearchNumberBody}
        onmodaltextChanged={onmodaltextChanged}
        />
        </Tab>
        <Tab eventKey="Personal" title="Personal">
        <Personal 
       ontextChanged={ontextChanged}
       ontextItemChanged={ontextItemChanged}
       SearchNumberBody={SearchNumberBody}
      />
        </Tab>
        <Tab eventKey="Finance" title="Finance">
        <Finance 
       ontextChanged={ontextChanged}
       ontextItemChanged={ontextItemChanged}
       SearchNumberBody={SearchNumberBody}
      />
        </Tab>
        <Tab eventKey="Remarks" title="Remarks">
        <Remarks 
       ontextChanged={ontextChanged}
       SearchNumberBody={SearchNumberBody}
      />
        </Tab>
        <Tab eventKey="Attachment" title="Attachment">
        <Attachment
      setattachmentresponse={setattachmentresponse}
        />
      </Tab>
    </Tabs>
     

      {/* {ButtonDropdown == 'Attachment' && } */}
      {/* {ButtonDropdown == 'Address' } */}
      {/* {ButtonDropdown == 'Administration' && (
       
      )} */}
      {/* {ButtonDropdown == 'Finance' && } */}
      {/* {ButtonDropdown == 'Membership' && } */}
      {/* {ButtonDropdown == 'Personal' && } */}
      {/* {ButtonDropdown == 'Remarks' && } */}

      <br />
      <br />
      <br />
      <div style={{ marginTop: '10%' }}>
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

export default EmployeeMasterData;
