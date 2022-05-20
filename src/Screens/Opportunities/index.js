import React from 'react'
import { CONSTANTS, LINKS } from '../../Utils'
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
  Tabs,
  Tab,
  Dropdown,
  DropdownButton,
  ButtonGroup
} from 'react-bootstrap'
import './oppor.css'
import NavBar from '../../Component/Global/Navbar'
import { Attachment } from '../../Component/APDownPaymentRequest'
import {
  Summary,
  General,
  Competitors,
  Partner,
  Stages,
  Potential,
  Accounting,
  Logistics
} from '../../Component/SalesOpportunities'

import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
//import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import Select from 'react-select'
import { Logo, TextInput, Alert } from '../../Component/Global'

const axios = require('axios')

export default function PurchaseRequest () {
  const [PRBody, setPRBody] = React.useState({})
  const [show1, setShow1] = React.useState(false)
  const [ButtonName, setButtonName] = React.useState()
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [BusinessPartnerName, setBusinessPartnerName] = React.useState()
  //const [BusinessPartner, setBusinessPartner] = React.useState({})
  const [CustomerPartner, setCustomerPartner] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ContactPersonName, setContactPersonName] = React.useState()
  const [MaxLocalTotal, setMaxLocalTotal] = React.useState()
  const [CustomerDropDown, setCustomerDropDown] = React.useState()
  const [Customer, setCustomer] = React.useState()
  const [BusinessPartner, setBusinessPartner] = React.useState()
  const [ContactPerson, setContactPerson] = React.useState()
  const [TotalAmount, setTotalAmount] = React.useState()
  const [
    BusinessPartnerTerritory,
    setBusinessPartnerTerritory
  ] = React.useState()
  const [Owner, setOwner] = React.useState()
  const [OpportunityName, setOpportunityName] = React.useState()
  const [OpportunityNo, setOpportunityNo] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [Status, setStatus] = React.useState()
  const [StartDate, setStartDate] = React.useState()
  const [ClosingDate, setClosingDate] = React.useState(false)
  const [OpenActivities, setOpenActivities] = React.useState()
  const [Closing, setClosing] = React.useState()
  const [CP, setCP] = React.useState()
  const [SP, setSP] = React.useState()
  const [Employee, setEmployee] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [EmployeeInfoDropdown, setEmployeeInfoDropdown] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [SalesPersonDropdown, setSalesPersonDropdown] = React.useState()
  const [SalesEmployee, setSalesEmployee] = React.useState()
  const [BusinessPartnerCode, setBusinessPartnerCode] = React.useState()
  const [DiscountTotal, setDiscountTotal] = React.useState()
  const [ButtonDropdown, setButtonDropdown] = React.useState()
  const [GeneralData, setGeneralData] = React.useState()
  const [BPContactGeneralData, setBPContactGeneralData] = React.useState()
  const [BusinessPartnerNameData, setBusinessPartnerNameData] = React.useState()
  const [IndustryGeneralData, setIndustryGeneralData] = React.useState()
  const [PredictedpotentialDate, setPredictedpotentialDate] = React.useState()
  const [RemarksGeneralData, setRemarksGeneralData] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [WeightedAmountPotentialData, setWeightedSumLC] = React.useState()
  const [DocumentTypeSummary, setDocumentTypeSummary] = React.useState()
  const [DocumentSummaryNo, setDocumentSummaryNo] = React.useState()
  const [StartDateStage, setStartDateStage] = React.useState()
  const [MaxSystemTotal, setMaxSystemTotal] = React.useState()
  const [ClosingDateStage, setClosingDateStage] = React.useState()
  const [LevelOfInterest, setLevelOfInterest] = React.useState()
  const [GrossProfitPotential, setGrossProfitPotential] = React.useState()
  const [PottentialAmountData, setPottentialAmountData] = React.useState()
  const [
    GrossProfitPotentialData,
    setGrossProfitPotentialData
  ] = React.useState()
  const [BusinessP, setBusinessP] = React.useState()
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

    Branches(cook)
    ContactP(cook)
    SalesP(cook)
    EmployeeInfo(cook)
    customer(cook)
    BP(cook)
  }, [])
  const ContactP = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.ContactPerson, cookie: cookie }
      )
      .then(function (res) {
        setCP(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.ContactEmployees[0].InternalCode,
              label: element.ContactEmployees[0].Name
            })
          })
          console.log(ItemsDropDown)
          console.log('ItemsDropDown')
          setContactPersonDropdown(ItemsDropDown)
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
      alert.error("License Expired")
      window.location.href="/DisabledHomeScreen";
    } 
  
      })
      .catch(function (error) {
        console.log(error)
      })
  }

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

  const Branches = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.Branches,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.BPLID,
              label: element.BPLID + ' : ' + element.BPLName
            })
          })
          // setBrancheCodeDropdown(ItemsDropDown)
          setButtonName('Add')
          setSearchNumber('0')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const SalesP = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.salesEmployee, cookie: cookie }
      )
      .then(function (res) {
        setSP(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.SalesEmployeeCode,
              label: element.SalesEmployeeName
            })
          })
          setSalesPersonDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const EmployeeInfo = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseRequest.emplyeeInfo, cookie: cookie }
      )
      .then(function (res) {
        setEmployee(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.EmployeeID,
              label: element.FirstName
            })
          })
          setEmployeeInfoDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const customer = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveCustomer, cookie: cookie }
      )
      .then(function (res) {
        setCustomer(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardName
            })
          })
          setCustomerDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const onevent = (e, name) => {
    setButtonDropdown('You Clicked On', name)
    console.log(ButtonDropdown)
    console.log(name)
  }

  const submitOpportunities = async () => {
    let body = PRBody
    let DocLines = []
    DocLines.push({
      //MaxLocalTotal: 33,
      //MaxSystemTotal: 22,
      // MaxLocalTotal: MaxLocalTotal,
      MaxLocalTotal: MaxSystemTotal,
      StartDate: StartDate,
      //setBusinessPartnerNameDataBPChanelName:BPChannelNameData,
      //ContactPerson: ContactPerson,
      ClosingDate: ClosingDate,
      //BPChanelCode:GeneralData,
      DocumentType: DocumentTypeSummary,
      // BPChannelContact:BPContactGeneralData,
      // Industry:IndustryGeneralData,
      //SalesPerson:SalesEmployee,
      //CardCode:BusinessPartnerCode,
      //CardCode:CustomerPartner,
      CardName: CustomerPartner,

      InterestLevel: LevelOfInterest,

      PredictedClosingDate: PredictedpotentialDate,
      WeightedAmountLocal: WeightedAmountPotentialData,
      GrossProfitTotalLocal: GrossProfitPotentialData,
      // CustomerGeneralData:ContactPerson,
      ContactPerson: BusinessPartner,
      BPChannelContact: 1
      //SalesPerson:SalesEmployee,
    })

    console.log(BPContactGeneralData)
    body['OpportunityName'] = OpportunityName
    body['SalesOpportunitiesLines'] = DocLines
    body['Industry'] = IndustryGeneralData
    body['PredictedClosingDate'] = PredictedpotentialDate

    //body['CardName'] = CustomerPartner
    body['SalesPerson'] = SalesEmployee
    body['AttachmentEntry'] = attachmentresponse
    body['CardCode'] = BusinessPartnerCode
    //body['EmployeeID'] = Owner
    body['Status'] = Status
    body['BPChanelCode'] = GeneralData
    //body['BPChannelContact']=1
    body['BPChanelName'] = BusinessPartnerName
    body['Remarks'] = RemarksGeneralData
    body['SalesPerson'] = body['PredictedClosingDate'] = PredictedpotentialDate
    // body ['GrossProfitTotalLocal']=GrossProfitPotentialData
    // body ['WeightedAmountLocal']=WeightedAmountPotentialData
    body['DocumentType'] = DocumentTypeSummary
    body['DocumentNumber'] = DocumentSummaryNo
    body['StartDate'] = StartDateStage
    body['ClosingDate'] = ClosingDateStage
    body['CardCode'] = BusinessPartnerCode
    body['GrossProfit'] = GrossProfitPotential

    console.log(body)

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: body,
          api: LINKS.sap.Sales.SalesOpportunities,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const BP = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ActiveCustomer, cookie: cookie }
      )
      .then(function (res) {
        setBusinessP(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardCode + ' : ' + element.CardName
            })
          })
          setBusinessPartner(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const SearchAll_Filter_Data = async () => {
    if (SearchNumber === '0') {
      console.log('Show All Data')
      SearchPRNumberAll()
    } else {
      console.log('Show Filter Data')
      SearchPRNumberFilter()
    }
  }
  const SearchPRNumberAll = async () => {
    // let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `SalesOpportunities`
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
    let sapAPi = `SalesOpportunities?$filter=SequentialNo eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value)
        setPQDocumentLines(res.data.value[0].SalesOpportunitiesLines)
        if (HeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const selectPR = async item => {
    setShow1(false)
    setSelectedPRDocEntry(item)
    setPQDocumentLines(item.SalesOpportunitiesLines)
    console.log('item')
    console.log(item)
  }
  const Patch = async (id, body) => {
    let DraftResponseResult = null
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: body,
          api: `SalesOpportunities(${id})`,
          cookie: cook
        })

        .then(function (res) {
          console.log(res)
          DraftResponseResult = res
          if (DraftResponseResult) {
            console.log(DraftResponseResult)
            alert.show(DraftResponseResult.error.value.message)
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
    let body = PRBody
    let DocLines = []
    DocLines.push({
      //MaxLocalTotal: 33,
      //MaxSystemTotal: 22,
      // MaxLocalTotal: MaxLocalTotal,
      MaxLocalTotal: MaxSystemTotal,
      StartDate: StartDate,
      //setBusinessPartnerNameDataBPChanelName:BPChannelNameData,
      //ContactPerson: ContactPerson,
      ClosingDate: ClosingDate,
      //BPChanelCode:GeneralData,
      DocumentType: DocumentTypeSummary,
      // BPChannelContact:BPContactGeneralData,
      // Industry:IndustryGeneralData,
      //SalesPerson:SalesEmployee,
      //CardCode:BusinessPartnerCode,
      //CardCode:CustomerPartner,
      CardName: CustomerPartner,

      InterestLevel: LevelOfInterest,

      PredictedClosingDate: PredictedpotentialDate,
      WeightedAmountLocal: WeightedAmountPotentialData,
      GrossProfitTotalLocal: GrossProfitPotentialData,
      // CustomerGeneralData:ContactPerson,
      ContactPerson: BusinessPartner,
      BPChannelContact: 1
      //SalesPerson:SalesEmployee,
    })

    console.log(BPContactGeneralData)
    body['OpportunityName'] = OpportunityName
    body['SalesOpportunitiesLines'] = DocLines
    body['Industry'] = IndustryGeneralData
    body['PredictedClosingDate'] = PredictedpotentialDate
    //body['CardName'] = CustomerPartner
    body['SalesPerson'] = SalesEmployee
    body['AttachmentEntry'] = attachmentresponse
    body['CardCode'] = BusinessPartnerCode
    //body['EmployeeID'] = Owner
    body['Status'] = Status
    body['BPChanelCode'] = GeneralData
    //body['BPChannelContact']=1
    body['BPChanelName'] = BusinessPartnerName
    body['Remarks'] = RemarksGeneralData
    body['SalesPerson'] = body['PredictedClosingDate'] = PredictedpotentialDate
    // body ['GrossProfitTotalLocal']=GrossProfitPotentialData
    // body ['WeightedAmountLocal']=WeightedAmountPotentialData
    body['DocumentType'] = DocumentTypeSummary
    body['DocumentNumber'] = DocumentSummaryNo
    body['StartDate'] = StartDateStage
    body['ClosingDate'] = ClosingDateStage
    body['CardCode'] = BusinessPartnerCode
    body['GrossProfit'] = GrossProfitPotential

    console.log(body)
    console.log(HeaderData.SequentialNo, body)
    Patch(HeaderData.SequentialNo, body)
  }
  const Submit_PatchFunc = () => {
    if (ButtonName == 'Add') {
      console.log('submit')
      submitOpportunities()
    } else if (ButtonName != 'Add') {
      console.log('Patch')
      submitPatch()
    }
  }

  return (
    <>
      <NavBar />
      <h1 style={{ textAlign: 'center' }}>Opportunity Type</h1>

      <div>
        {/* Upper Side++++++++ */}

        <CardGroup>
          <DIV3>
            <Container fluid>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadio1'
                  value='option1'
                />
                <label class='form-check-label' for='inlineRadio1'>
                  <b>Sales</b>
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadio2'
                  value='option2'
                />
                <label class='form-check-label' for='inlineRadio2'>
                  <b>Purchasing</b>
                </label>
              </div>

              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>BP Partner</label>
                <Select
                  placeholder={
                    SelectedPRDocEntry && SelectedPRDocEntry.CardCode
                      ? HeaderData && HeaderData.CardCode
                      : null
                  }
                  options={BusinessPartner} // Options to display in the dropdown
                  // onSelect={GroupNo} // Function will trigger on select event
                  // onRemove={GroupNo} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                  onChange={e => {
                    setContactPersonName(e.label)
                    setBusinessPartner(e.value)
                  }}
                />
              </div>

              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Contact Person</label>

                {/* {ContactPersonDropdown && ( */}
                <Select
                  // value={ContactPersonDropdown.filter(
                  //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                  // )}
                  placeholder={
                    SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                      ? HeaderData && HeaderData.ContactPerson
                      : null
                  }
                  options={ContactPersonDropdown} // Options to display in the dropdown
                  // onSelect={GroupNo} // Function will trigger on select event
                  // onRemove={GroupNo} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                  onChange={e => {
                    setContactPerson(e.value)
                  }}
                />
              </div>

              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Total Amount Invoiced</label>
                <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='text'
                  class='form-control'
                  id='exampleInputEmail1'
                  readOnly
                  aria-describedby='emailHelp'
                  onChange={e => {
                    setTotalAmount(e.target.value)
                  }}
                ></input>
              </div>

              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Business Partner Territory</label>

                {/* {ContactPersonDropdown && ( */}
                <Select
                  placeholder={
                    SelectedPRDocEntry && SelectedPRDocEntry.Territory
                      ? HeaderData && HeaderData.Territory
                      : null
                  }
                  options={CustomerDropDown}
                  displayValue='name'
                  onChange={e => {
                    //setCustomerPartner(e.label)
                    setBusinessPartnerTerritory(e.value)
                  }}
                />
                {/* )} */}
              </div>
              <label>Sales Employees</label>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                {/* {ContactPersonDropdown && ( */}
                <Select
                  // value={ContactPersonDropdown.filter(
                  //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                  // )}
                  placeholder={
                    SelectedPRDocEntry && SelectedPRDocEntry.SalesPerson
                      ? HeaderData && HeaderData.SalesPerson
                      : null
                  }
                  options={SalesPersonDropdown} // Options to display in the dropdown
                  // onSelect={GroupNo} // Function will trigger on select event
                  // onRemove={GroupNo} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                  onChange={e => {
                    setSalesEmployee(e.value)
                  }}
                />
                {/* )} */}
              </div>
              <label>Owner</label>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                {/* {ContactPersonDropdown && ( */}
                <Select
                  // value={ContactPersonDropdown.filter(
                  //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                  // )}
                  placeholder={
                    SelectedPRDocEntry && SelectedPRDocEntry.DataOwnershipfield
                      ? HeaderData && HeaderData.DataOwnershipfield
                      : null
                  }
                  options={EmployeeInfoDropdown} // Options to display in the dropdown
                  // onSelect={GroupNo} // Function will trigger on select event
                  // onRemove={GroupNo} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                  onChange={e => {
                    setOwner(e.value)
                  }}
                />
                {/* )} */}
              </div>
              <br />
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='checkbox'
                  id='inlineCheckbox1'
                  value='option1'
                />
                <label class='form-check-label' for='inlineCheckbox1'>
                  Display in System Currency
                </label>
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
              <label style={{marginLeft:'3rem'}}>Opportunity No</label>
              <div className="oppor" style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem',borderColor:'lightgray' }}>
               
                <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon4" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
                <input
                  name={'SearchPRNumber'}
                  type='Number'
                  placeholder='Number'
                  class='form-control4'
                  onChange={e => {
                    setSearchNumber(e.target.value)
                  }}
                />
                {/* <br />
                <Button
            
                  onClick={e => {
                    SearchAll_Filter_Data()
                  }}
                >
                  Search
                </Button> */}
                <br />

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
                            <th>Status</th>
                            <th>Sequential No</th>
                            <th>Customer Code</th>
                            <th>Start Date</th>
                            <th>Close Date</th>
                          </tr>
                        </TableHead>
                        <tbody>
                          {ModalHeaderData.map((item, index) => (
                            <tr
                              key={`${index}`}
                              onClick={e => {
                                console.log(item)
                                selectPR(item)
                                handleClose2()
                              }}
                            >
                              <TD>{index + 1}</TD>
                              <TD>
                                {item.Status === 'sos_Open' ? (
                                  <p
                                    style={{
                                      background: 'gray',
                                      color: 'white'
                                    }}
                                  >
                                    Open
                                  </p>
                                ) : item.Status === 'sos_Close' ? (
                                  <p
                                    style={{
                                      background: 'red',
                                      color: 'white'
                                    }}
                                  >
                                    Closed
                                  </p>
                                ) : null}
                              </TD>

                              <TD>{item.SequentialNo}</TD>
                              <TD>{item.CardCode}</TD>
                              <TD>{item.StartDate}</TD>
                              <TD>{item.ClosingDate}</TD>
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
              </div>
              <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
                <label>Opportunity Name</label>
                <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='text'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={
                    SelectedPRDocEntry && SelectedPRDocEntry.OpportunityName
                      ? HeaderData && HeaderData.OpportunityName
                      : null
                  }
                  onChange={e => {
                    setOpportunityName(e.target.value)
                  }}
                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
                <label>Status</label>
                <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='text'
                  class='form-control'
                  readOnly
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={
                    SelectedPRDocEntry && SelectedPRDocEntry.Status
                      ? HeaderData && HeaderData.Status
                      : ''
                  }
                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
                <label>Start Date</label>
                <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='Date'
                  class='form-control'
                  id='date'
                  aria-describedby='date'
                  defaultValue={
                    currentDate || SelectedPRDocEntry && SelectedPRDocEntry.StartDate
                      ? HeaderData && HeaderData.StartDate
                      : null
                  }
                  onChange={e => {
                    setStartDate(e.target.value)
                  }}
                ></input>
              </div>

              <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
                <label>Closing Date</label>
                <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='date'
                  class='form-control'
                  id='date'
                  readOnly
                  aria-describedby='date'
                  defaultValue={
                    currentDate || SelectedPRDocEntry && SelectedPRDocEntry.ClosingDate
                      ? HeaderData && HeaderData.ClosingDate
                      : null
                  }
                  onChange={e => {
                    setClosingDate(e.target.value)
                  }}
                ></input>
              </div>

              <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
                <label>Open Activities</label>
                <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='text'
                  class='form-control'
                  id='Number'
                  readOnly
                  aria-describedby='emailHelp'
                  // value={SelectedPRDocEntry && SelectedPRDocEntry.ClosingDate || HeaderData && HeaderData.ClosingDate }
                  onChange={e => {
                    setOpenActivities(e.target.value)
                  }}
                ></input>
              </div>

              <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
                <label>Closing%</label>
                {/* <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='text'
                  class='form-control'
                  id='Percentage'
                  aria-describedby='emailHelp'
                  placeholder=''
                  onChange={e => {
                    setClosing(e.target.value)
                  }}
                ></input> */}
                <div class='progress'>
                  <div
                    class='progress-bar progress-bar-striped active'
                    role='progressbar'
                    aria-valuenow='40'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{ width: '40%' }}
                  ></div>
                </div>
              </div>
            </Container>
          </DIV3>
        </CardGroup>

        <div>
          <Tabs
            defaultActiveKey='Potential'
            transition={false}
            id='noanim-tab-example'
          >
            <Tab eventKey='Potential' title='Potential'>
              <Potential
                SelectedPRDocEntry={SelectedPRDocEntry}
                HeaderData={HeaderData}
                setPredictedpotentialDate={setPredictedpotentialDate}
                setMaxLocalTotal={setMaxLocalTotal}
                setWeightedSumLC={setWeightedSumLC}
                setLevelOfInterest={setLevelOfInterest}
                setGrossProfitPotential={setGrossProfitPotential}
                setMaxSystemTotal={setMaxSystemTotal}
                setPottentialAmountData={setPottentialAmountData}
                setGrossProfitPotentialData={setGrossProfitPotentialData}
              />
            </Tab>
            <Tab eventKey='General' title='General'>
              <General
                setGeneralData={setGeneralData}
                SelectedPRDocEntry={SelectedPRDocEntry}
                HeaderData={HeaderData}
                setBPContactGeneralData={setBPContactGeneralData}
                setBusinessPartnerNameData={setBusinessPartnerNameData}
                setIndustryGeneralData={setIndustryGeneralData}
                setRemarksGeneralData={setRemarksGeneralData}
              />
            </Tab>
            <Tab eventKey='Stages' title='Stages'>
              <Stages
                setStartDateStage={setStartDateStage}
                SelectedPRDocEntry={SelectedPRDocEntry}
                HeaderData={HeaderData}
                setClosingDateStage={setClosingDateStage}
              />
            </Tab>
            <Tab eventKey='Partner' title='Partner'>
              <Partner />
            </Tab>
            <Tab eventKey='Competitors' title='Competitors'>
              <Competitors />
            </Tab>
            <Tab eventKey='Summary' title='Summary'>
              <Summary
                setDocumentTypeSummary={setDocumentTypeSummary}
                setDocumentSummaryNo={setDocumentSummaryNo}
                SelectedPRDocEntry={SelectedPRDocEntry}
                HeaderData={HeaderData}
              />
            </Tab>
            <Tab eventKey='Attachment' title='Attachment'>
              <Attachment setattachmentresponse={setattachmentresponse} />
            </Tab>
          </Tabs>
        </div>
      </div>
      <br />
      <div>
        <Button
          style={{ marginLeft: '5%' }}
          onClick={() => {
            Submit_PatchFunc()
          }}
        >
          {ButtonName}
        </Button>

        <Button type='reset' style={{ marginLeft: '5%' }}
          onClick={() => {
                  window.location.href="/Home"
                }}>
          Cancel
        </Button>
      </div>
    </>
  )
}
