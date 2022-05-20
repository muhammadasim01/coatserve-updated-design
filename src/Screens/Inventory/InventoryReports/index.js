import React from 'react'
import {
  Button,
  Table,
  Container,
  Row,
  Col,
  Card,
  Tab,
  Tabs,
  Form,
  Modal,
  CardGroup
} from 'react-bootstrap'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../../Banking/IncomingPayments/index.css'
import Select from 'react-select'
import { GrDocumentPerformance } from 'react-icons/gr'
import { MdPayment } from 'react-icons/md'
import { Attachment } from '../../../Component/APDownPaymentRequest'
import { useAlert } from 'react-alert'
import { Logo, TextInput, Alert, Navbar } from '../../../Component/Global'
import { CONSTANTS, LINKS } from '../../../Utils'
import {
  input,
  DIV3,
  DIV4,
  DIV5,
  InputD,
  TableHead,
  TD,
  DIV6,
  DIV7
} from './Style'
import { Header } from 'semantic-ui-react'
const axios = require('axios')
export default function InventoryReports () {
      
  const [getalldata, setgetalldata] = React.useState()
  const [getchequetab, setgetchequetab] = React.useState(false)
  const [getcashtab, setgetcashtab] = React.useState(false)
  const [gettransfertab, setgettransfertab] = React.useState(false)
  const [getdefaulttabname, setgetdefaulttabname] = React.useState("Cheque")
      
  const [count, setCount] = React.useState(0)
  const [getProjectCode, setgetProjectCode] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [TransID, setTransID] = React.useState()
  const [getItemsDropdown, setgetItemsDropdown] = React.useState()
  const [TaxCode, setTaxCode] = React.useState()
  const [gettotaldatafromapi, setgettotaldatafromapi] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [getTransferAccount, setgetTransferAccount] = React.useState()
  const [getTransferDate, setgetTransferDate] = React.useState()
  const [gettransfertotal, setgettransfertotal] = React.useState(0)
  const [getReference, setgetReference] = React.useState()
  const [getcardcode, setgetcardcode] = React.useState()
  const [getcashtotal, setgetcashtotal] = React.useState(0)
  const [getcheckamount, setgetcheckamount] = React.useState(0)
  const [getbankcharge, setgetbankcharge] = React.useState(0)
  const [getduebalance, setgetduebalance] = React.useState()
  const [getdocumentlines, setgetdocumentlines] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [ButtonName, setButtonName] = React.useState('Add')
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [getdoctype, setgetdoctype] = React.useState()
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [getcomulativesum, setgetcomulativesum] = React.useState()
  const [getcashaccount, setgetcashaccount] = React.useState()
  const [JournalEntryLines, setJournalEntryLines] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [checked, setChecked] = React.useState(false);
  const [ModalName, setModalName] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [PaymentInvoicesTotalAmountDue, setPaymentInvoicesTotalAmountDue] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [getpaymentonAccount, setgetpaymentonAccount] = React.useState(0)
  const [CurrenciesDropdowon, setCurrenciesDropdowon] = React.useState()
  const [getAccountvalue, setgetAccountvalue] = React.useState(false)
  const [PriceListDropDown, setPriceListDropDown] = React.useState()
  const [SelectedVendor, setSelectedVendor] = React.useState()
  const[getG_LAccount,  setgetG_LAccount]=React.useState()
  const[BanksBranchDropdowon,  setBanksBranchDropdowon]=React.useState()
  const [getStatus, setgetStatus] = React.useState()
  const[BanksAccountDropdowon,  setBanksAccountDropdowon]=React.useState()
  const[getitemcode,  setgetitemcode]=React.useState()
  const[getcheckAccountNo,  setgetcheckAccountNo]=React.useState()
  const[getcheckbankcode,  setgetcheckbankcode]=React.useState()
  const [warehouseDropdown, setWarehouseDropdown] = React.useState()
  const [InvoicesLines, setInvoicesLines] = React.useState()
  const [InvoicesHeaderData, setInvoicesHeaderData] = React.useState()
  const [invoiceTotalAmount, setinvoiceTotalAmount] = React.useState()
  const [AccountinvoiceTotalAmount, setAccountinvoiceTotalAmount] = React.useState(0)
  const [projectsDropDown, setProjectsDropdowon] = React.useState()
  const [show, setShow] = React.useState(false)
  const [show4, setShow4] = React.useState(false)
  const [statuschange, setstatuschange] = React.useState(true)
  const [getfilterddata, setgetfilterddata] = React.useState()
  const [selectedItems, setSelectedItems] = React.useState()
  const [AccountselectedItems, setAccountSelectedItems] = React.useState()
  const [getPaymentchecksdata, setgetPaymentchecksdata] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState()
  const [getProjectvalue, setgetProjectvalue] = React.useState()
  const [getBusinespartnervalue, setgetBusinespartnervalue] = React.useState()
  const [getItesData, setgetItesData] = React.useState()
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState('0')
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [show3, setShow3] = React.useState(false)
  const [BanksDropdowon, setBanksDropdowon] = React.useState()
  const [getvalues, setgetvalues] = React.useState({})
  const [getCustomerdata, setgetCustomerdata] = React.useState()
  const [getVendordata, setgetVendordata] = React.useState()
  const [getvalidto, setgetvalidto] = React.useState()
  const [getvalidfrom, setgetvalidfrom] = React.useState()
  const [getdocumentname, setgetdocumentname] = React.useState("JDT1");
  const [getdocumenttype, setgetdocumenttype] = React.useState("30")
  const [ModuleName, setModuleName] = React.useState("ABReport")
  const [currentDate,setcurrentDate] = React.useState()
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [getdocnumfromcomponent, setgetdocnumfromcomponent] = React.useState()
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const alert = useAlert()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  React.useEffect(async () => {
    today()
    setButtonName("Add")
    setSearchNumber('0')
    setgetdocumentname("RCT1")
  setModuleName("ABReport")
  setgetdocumenttype("24")
  compareDate()
  let cook = await localStorage.getItem('cookie')
  const show = await localStorage.getItem('ShowBranches')
  if (showA == 'true') {
    setShowA(true)
    // setShow1(true)
    compareDate()
    await localStorage.removeItem('ShowBranches')
  }
    if (cook) {
      GetAccountBalanceAll(cook)
      getSQLQueryResponceAll(cook)
      getItemsList(cook)
      GetItems(cook)
      // getPriceList(cook)
      // getBankdetails(cook)
      // getCurrencies(cook)
      // getcountrydetails(cook)
      getProjects(cook)
      // getCostingCode(cook)
      // TableTaxCode(cook)
    }
  }, [])
  const getProjects = async cookie => {
    const api = `Projects?$select=Code,Name&$filter=Active eq 'tYES' `
    let resResult = {}

    // -------------------------    Items API GET DATA   -----------
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (Response) {
        resResult = Response
      })
      .catch(function (error) {
        console.log(error)
      })
    let res = apiProcessing(resResult)
    if (res) {
      let dropdown = []
      res.forEach(element => {
        dropdown.push({
          value: element.Code,
          label: element.Code + ' : ' + element.Name
        })
      })
      setProjectsDropdowon(dropdown)
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
    if (Date.parse(currentComDate) > getDate ) {
      alert.error("License Expired")
      window.location.href="/DisabledHomeScreen";
    } 
  
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const GetAccountBalanceAll = async cook => {
    let body = {
      "SqlCode": "GetIM",
      "SqlName": "GetIM", 
      "SqlText": `Select BASE_REF, TransType, DocDate, DocDueDate,CardCode, CardName, ItemCode, Dscription, InQty, OutQty, CalcPrice, TransValue, PrjCode, DOffDecAcc, OcrCode From OINM`
      //  "SqlText": `Select * from JDT1 Where TransType in (-2, 24,46, 30) and ShortName Like 'C%'`
     }
    let api = `SQLQueries`
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: api,
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

  const getSQLQueryResponceAll = async () => {
    let cook = await localStorage.getItem('cookie');
    let sapAPi = `SQLQueries('GetIM')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("getAllData",res.data.value)
        setgetalldata(res.data.value)
      
      })
      .catch({})
  }
  const getItemsList = async () => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `ChartOfAccounts?$filter=AccountLevel eq 5`
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (ItemsResponse) {
        ItemsResponseResult = ItemsResponse
      })
      .catch(function (error) {
        console.log(error)
      })
    let res = apiProcessing(ItemsResponseResult)
    if (res) {
      let ItemsDropDown = []
      let ItemsDetails = []
      res.forEach(element => {
        ItemsDetails[element.Code] = {
          Code: element.Code,
          Name: element.Name
        }
        ItemsDropDown.push({
          value: element.Code,
          label: element.Code + ' : ' + element.Name,
          item: element
        })
      })
      await setItemsDropDown(ItemsDropDown)
      await setItemsDetails(ItemsDetails)
    }
  }
  const apiProcessing = res => {
    if (res) {
      if (res.data.value) {
        return res.data.value
      } else {
        alert.error(
          `Items Details Response Error : <-- ${res.data.error.message.value} -->`
        )
        setTimeout(() => { window.location.href='/'}, 3000);
        return null
      }
    }
  }
  const GetItems = async () => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `Items`
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.ItemCode,
              label: element.ItemName 
            })
          })
          setgetItemsDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const InventoryGenEntriesPost = async body => {
    let cook = await localStorage.getItem('cookie')
    let api = `IncomingPayments`
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: api,
          cookie: cook
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success('Operation completed successfully')
            window.location.reload();
          } else {
            alert.error(JSON.stringify(res.data.error.message))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  
  const ObjectTypePaymentInvoices = async (docnum,basenum) => {
    console.log(docnum,basenum)
      let sapAPi = `JournalEntries?$filter=BaseReference eq '${basenum}' and JdtNum eq ${docnum}`
      console.log(sapAPi)
      let cook = await localStorage.getItem('cookie')
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          console.log(res)
          setHeaderData(res.data.value[0])
          setJournalEntryLines(res.data.value[0].JournalEntryLines)
        })
        .catch({})
        setShow(true)
  }
  const selectPR = async item => {
    // setShow(false)
    setSelectedPRDocEntry(item)
    localStorage.setItem('getDocEntry',item.DocEntry);
    // setPQDocumentLines(item.DocumentLines)
    // console.log(item.DocumentLines)
  }
  const getDocnumberfun = (invoicedata,cook) => {
    // setSearchDocumentLines(invoicedata)
    console.log("AAA")
        let obj = invoicedata
        let obj2 = invoicedata
        let obj3 = invoicedata.filter(option => {return option.InvoiceType !== 'it_Invoice'} )
        let DocLines = []
        obj.forEach(element => {
      if(element.InvoiceType === 'it_Invoice'){
        let sapAPi2 = `Invoices(${element.DocEntry})`
         axios
          .post(API_TYPES.GET, { api: sapAPi2, cookie: cook })
          .then(function (res) {
            DocLines.push({
              DocNum:res.data.DocNum,
              DocEntry:res.data.DocEntry,
              PostingDate:res.data.DocDate,
              Remarks:res.data.Comments
            })
            // setgetdocumentlines(DocLines)
            getdocnumber(DocLines,obj2,obj3)
          })
          .catch({})
      }else if(element.InvoiceType !== 'it_Invoice'){
        
            getdocnumber(DocLines,obj2,obj3)
       
      }
      })
  }
  const getdocnumber = async (DocLines,obj2,obj3) => {
    let DocLines2 = []
    obj2.forEach(element => {
      DocLines.forEach(element2 => {
      if(element.DocEntry===element2.DocEntry){
        DocLines2.push({
          DocNum:element2.DocNum,
          LineNum:element.LineNum,
          DocEntry:element.DocEntry,
          InvoiceType:element.InvoiceType,
          PostingDate:element2.PostingDate,
          Comments:element.Comments,
          SumApplied:element.SumApplied,
          WTAmount:element.WTAmount,
          Remarks:element2.Remarks
        })
      }
      })
    })
    console.log("DocLines2",DocLines2.concat(obj3))
    setSearchDocumentLines([...DocLines2, ...obj3])
  }
  const requesterDropDownfunc = async selectedOption => {
    setgetdoctype(selectedOption.value)
    let EIapi = `BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'cSupplier' and Valid eq 'tYES'&$orderby=CardCode`
    let Uapi = `BusinessPartners?$select=CardCode,CardName,Phone1&$filter=CardType eq 'cCustomer' and Valid eq 'tYES'&$orderby=CardCode`
    let api = ''
    if (selectedOption.value === 'rSupplier') {
      api = EIapi
      let cook = await localStorage.getItem('cookie')
      if (cook) GetRequesterDetail(cook, api)
      setgetAccountvalue(false)
      setgetProjectvalue(false)
      setgetItesData(false)
      setgetBusinespartnervalue(true)
    } else if (selectedOption.value === 'rCustomer') {
      api = Uapi
      let cook = await localStorage.getItem('cookie')
      if (cook) GetRequesterDetail(cook, api)
      setgetAccountvalue(false)
      setgetProjectvalue(false)
      setgetItesData(false)
      setgetBusinespartnervalue(true)
    } else if (selectedOption.value === 'rAccount') {
     setgetAccountvalue(true)
     setgetItesData(false)
     setgetProjectvalue(false)
     setgetBusinespartnervalue(false)
    }else if (selectedOption.value === 'rProject') {
      setgetAccountvalue(false)
      setgetItesData(false)
      setgetProjectvalue(true)
      setgetBusinespartnervalue(false)
     }else if (selectedOption.value === 'rItem') {
      setgetAccountvalue(false)
      setgetProjectvalue(false)
      setgetItesData(true)
      setgetBusinespartnervalue(false)
     }
   
  }
  const GetRequesterDetail = async (cookie, api) => {
    // -------------------------    Request API GET DATA   -----------------------------------------------------------
    let response = {}
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
        dropdown.push({
          value: element.CardCode,
          label: element.CardCode + ' : ' + element.CardName,
          item: element.eMail
        })
      })
      await setRequesterCodeDropdown(dropdown)
    }
  }
  const getdropdownvalue = (e, name) => {
    let obj = getvalues
    obj[name] = e.value
    console.log("name",name)
    console.log("e.value",e.value)
    setgetvalues(obj)
  }
  const handleShow = async () => {
    if(getdoctype=== 'rCustomer'){
      if(getalldata){
          let filterddata = getalldata.filter(el => {return el.CardCode  === SelectedVendor})
          setgetfilterddata(filterddata)
        }
    }else if(getdoctype=== 'rSupplier'){
       if(getalldata){
        let filterddata = getalldata.filter(el => {return el.CardCode  === SelectedVendor})
       
          setgetfilterddata(filterddata)
      }
    }else if(getdoctype=== 'rAccount' ){
      if(getalldata){
        let filterddata = getalldata.filter(el => {return el.DOffDecAcc  === AccountselectedItems})
          setgetfilterddata(filterddata)
     }
   }else if(getdoctype=== 'rProject' ){
    if(getalldata){
      let filterddata = getalldata.filter(el => {return el.PrjCode  === getProjectCode})
        setgetfilterddata(filterddata)
   }
  }
   else if(getdoctype=== 'rItem' ){
    if(getalldata){
      let filterddata = getalldata.filter(el => {return el.ItemCode  === getitemcode})
        setgetfilterddata(filterddata)
   }
 }
  }
  const checkboxchanger = async () => {
    if(!checked3 === true ){
      console.log(!checked3)
      if(getalldata){
        let filterddata = getalldata.filter(el => {return (el.ShortName  === SelectedVendor) && (el.BalDueDeb - el.BalDueCred !== 0) || (el.Project  === getProjectCode) || (el.ContraAct === AccountselectedItems) })
          let Doclines = []
          let sum = 0
          filterddata.forEach(element=>{
            Doclines.push({
              ComulativeBalance: (sum + element.Debit)  - element.Credit,
              Account:element.Account,
              BalDueCred:element.BalDueCred,
              BalDueDeb:element.BalDueDeb,
              BalFcCred:element.BalFcCred,
              BalFcDeb:element.BalFcDeb,
              ContraAct:element.ContraAct,
              Credit:element.Credit,
              Debit:element.Debit,
              DueDate:element.DueDate,
              FCCredit:element.FCCredit,
              FCDebit:element.FCDebit,
              LineMemo:element.LineMemo,
              Ref1:element.Ref1,
              Ref2:element.Ref2,
              Ref3Line:element.Ref3Line,
              ShortName:element.ShortName,
              TaxDate:element.TaxDate,
              TransId:element.TransId,
              TransType:element.TransType,
            })
            sum = (sum + element.Debit) - element.Credit
          })
          console.log("Doclines",Doclines)
          setgetfilterddata(Doclines)
     }
   }else{
    if(getalldata){
      let filterddata = getalldata.filter(el => {return el.ShortName  === SelectedVendor })
      let Doclines = []
      let sum = 0
      filterddata.forEach(element=>{
        Doclines.push({
          ComulativeBalance: (sum + element.Debit)  - element.Credit,
          Account:element.Account,
          BalDueCred:element.BalDueCred,
          BalDueDeb:element.BalDueDeb,
          BalFcCred:element.BalFcCred,
          BalFcDeb:element.BalFcDeb,
          ContraAct:element.ContraAct,
          Credit:element.Credit,
          Debit:element.Debit,
          DueDate:element.DueDate,
          FCCredit:element.FCCredit,
          FCDebit:element.FCDebit,
          LineMemo:element.LineMemo,
          Ref1:element.Ref1,
          Ref2:element.Ref2,
          Ref3Line:element.Ref3Line,
          ShortName:element.ShortName,
          TaxDate:element.TaxDate,
          TransId:element.TransId,
          TransType:element.TransType,
        })
        sum = (sum + element.Debit) - element.Credit
      })
      console.log("Doclines",Doclines)
      setgetfilterddata(Doclines)
   }
 }
  }
  const checkboxchanger2 = async () => {
      if(getalldata){
        let filterddata = getalldata.filter(el => {return el.ShortName  === SelectedVendor || el.Project  === getProjectCode || el.ContraAct === AccountselectedItems})
          let Doclines = []
          let sum = 0
          filterddata.forEach(element=>{
            Doclines.push({
              ComulativeBalance: (sum + element.Debit)  - element.Credit,
              Account:element.Account,
              BalDueCred:element.BalDueCred,
              BalDueDeb:element.BalDueDeb,
              BalFcCred:element.BalFcCred,
              BalFcDeb:element.BalFcDeb,
              ContraAct:element.ContraAct,
              Credit:element.Credit,
              Debit:element.Debit,
              DueDate:element.DueDate,
              FCCredit:element.FCCredit,
              FCDebit:element.FCDebit,
              LineMemo:element.LineMemo,
              Ref1:element.Ref1,
              Ref2:element.Ref2,
              Ref3Line:element.Ref3Line,
              ShortName:element.ShortName,
              TaxDate:element.TaxDate,
              TransId:element.TransId,
              TransType:element.TransType,
            })
            sum = (sum + element.Debit) - element.Credit
          })
          console.log("Doclines",Doclines)
          setgetfilterddata(Doclines)
     }
  }
  const SearchPRNumberFilterFromComponent = async () => {
    // let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `PurchaseRequests?$filter=DocNum eq ${getdocnumfromcomponent}`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        // setHeaderData(res.data.value[0])
        console.log(res.data.value[0])
      //   if(res.data.value[0].DocumentStatus == 'bost_Open'){
      //     setgetStatus("Open")
      //  }else{
      //     setgetStatus("Close")
      //  }
      //   setPQDocumentLines(res.data.value[0].DocumentLines)
      //   console.log(res.data.value[0].DocumentLines)
      //   if (HeaderData != '') {
      //     setButtonName('Update')
      //   }
      //   if (res.data.value[0].ReqType === '12') {
      //     setUserName('User')
      //   } else if (res.data.value[0].ReqType !== '12') {
      //     setUserName('Employee')
      //   }
      })
      .catch({})
  }
  const handleClose2 = () => {
    setShow1(false)
  }
  const getvaluefromapi = async () => {
          let filterddata = getalldata.filter(el => {return el.ShortName ===SelectedVendor || el.DueDate < (getvalidto.split("-").join("")) && el.DueDate > (getvalidfrom.split("-").join("")) && el.BalDueDeb - el.BalDueCred !== 0})
          console.log("filterddata",filterddata)
          let Doclines = []
          let sum = 0
          filterddata.forEach(element=>{
            Doclines.push({
              ComulativeBalance: (sum + element.Debit)  - element.Credit,
              Account:element.Account,
              BalDueCred:element.BalDueCred,
              BalDueDeb:element.BalDueDeb,
              BalFcCred:element.BalFcCred,
              BalFcDeb:element.BalFcDeb,
              ContraAct:element.ContraAct,
              Credit:element.Credit,
              Debit:element.Debit,
              DueDate:element.DueDate,
              FCCredit:element.FCCredit,
              FCDebit:element.FCDebit,
              LineMemo:element.LineMemo,
              Ref1:element.Ref1,
              Ref2:element.Ref2,
              Ref3Line:element.Ref3Line,
              ShortName:element.ShortName,
              TaxDate:element.TaxDate,
              TransId:element.TransId,
              TransType:element.TransType,
              // TotalComulateBalance:element.ComulateBalance + element.Debit - element.Credit,
            })
            sum = (sum + element.Debit) - element.Credit
          })
          console.log("Doclines",Doclines)
          setgetfilterddata(Doclines)
        //   console.log("data",data)
        //   console.log("data.concat(filterddata)",data.concat(filterddata))
        
   
  }
  const handleClose = () => {
    setShow(false)
  }
  return (
    <>
      <Navbar
      setgetserviceseries={setgetserviceseries}
      getdocumenttype={getdocumenttype}
      ModuleName={ModuleName}
      HeaderData={HeaderData}
      getdocumentname={getdocumentname}
      setgetdocnumfromcomponent={setgetdocnumfromcomponent}
      SearchPRNumberFilterFromComponent={SearchPRNumberFilterFromComponent}
      />
      <h1 style={{ textAlign: 'center' }}>Inventory Reports</h1>
      <CardGroup style={{ marginBottom: '5rem' }}>
        <DIV3>
          <Container fluid>
            <label>Document Type</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder= {HeaderData && HeaderData.DocType === 'rCustomer' ? (
                                <p>
                                 Customer
                                </p>
                              ) : HeaderData && HeaderData.DocType === 'rSupplier' ? (
                                <p >
                                 Vendor
                                </p>
                              ) : HeaderData && HeaderData.DocType === 'rAccount' ? (
                                <p >
                                 Account
                                </p>):null}
                options={[
                  { label: 'Customer', value: 'rCustomer' },
                  { label: 'Vendor', value: 'rSupplier' },
                  { label: 'Account', value: 'rAccount' },
                  { label: 'Project', value: 'rProject' },
                  { label: 'Items', value: 'rItem' },
                ]}
                onChange={requesterDropDownfunc}
                displayValue='label'
              />
            </div><br/>
            {getBusinespartnervalue ?
            <>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Code</label>
              <Select
                placeholder={HeaderData && HeaderData.CardCode+":"+HeaderData && HeaderData.CardName}
                options={RequesterCodeDropdown} // Options to display in the dropdown
                onChange={e => {
                  setSelectedVendor(e.value)
                  getdropdownvalue(e,'Code')
                }}
                displayValue='name'
              />
            </div><br/>
            </>:
                   null}
                    {getItesData ?
            <>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Item Code</label>
              <Select
                placeholder=''
                options={getItemsDropdown} // Options to display in the dropdown
                onChange={e => {
                  setgetitemcode(e.value)
                }}
                displayValue='name'
              />
            </div><br/>
            </>:
                   null}
            {getProjectvalue ?
            <>
            <div style={{ width: '23.5rem', height: 'auto' }}>
                      <label>Project</label>
                      <Select
                        placeholder=''
                        options={projectsDropDown}
                        onChange={e=>{setgetProjectCode(e.value)}}
                        displayValue='name'
                      />
                    </div><br/>
                    </>:
                   null}
           
            {getAccountvalue ?
            <>
            <div style={{ width: '23.5rem', height: 'auto' }}>
                      <label>G/L Account</label>
                      <Select
                        placeholder={getPaymentchecksdata&&getPaymentchecksdata.CheckAccount}
                        options={ItemsDropDown}
                        onChange={e=>{setAccountSelectedItems(e.value)}}
                        displayValue='name'
                      />
                    </div><br/>
                    </>:
                   null}
            <Button variant='primary' onClick={handleShow}>
              Get Data
            </Button>
            <br />
          
              <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Open List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ModalHeaderData && (
            <Table responsive>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>DocNum</th>
                  <th>DocEntry</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Posting Date</th>
                </tr>
              </TableHead>
              <tbody>
                {ModalHeaderData.map((item, index) => (
                  <tr
                    key={`${index}`}
                    onClick={e => {
                      selectPR(item)
                      handleClose2()
                    }}
                  >
                    <TD>{index + 1}</TD>
                    <TD>{item.DocNum}</TD>
                    <TD>{item.DocEntry}</TD>
                    <TD>{item.CardCode}</TD>
                    <TD>{item.CardNam}</TD>
                    <TD>{item.DocDate}</TD>
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
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV5>
          <Container>
          <div style={{marginLeft:'3rem'}}>
          
          <div  class="form-check form-check-inline" style={{marginTop:'0.5rem',marginRight:'15rem'}}>
                <input class="form-check-input"  checked={checked} onChange={e=>{setChecked(!checked)}}   name='Active' type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Posting Date</label>
              </div>
              {checked===true?
              <>
              <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>From</label> <label style={{ marginLeft: '9rem' }}>To</label> 
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
              <input
              defaultValue={currentDate}
                  type='date'
                  name='ValidFrom' 
                  onChange={e => {
                    setgetvalidfrom(e.target.value)
                    // getvaluefromapi(e)
                  }}
                  placeholder=''
                  class='form-control'
                /> 
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
              defaultValue={currentDate}
                  type='date'
                  name='ValidTo'
                  onChange={e => {
                    setgetvalidto(e.target.value)
                  }}
                  class='form-control'
                />
              </div>
              <Button variant='primary' onClick={getvaluefromapi}>
              Get Data
            </Button>
             </CardGroup>
            </div>
            </>: null}
            <div  class="form-check form-check-inline" style={{marginTop:'0.5rem',marginRight:'15rem'}}>
                <input class="form-check-input" checked={checked2} onChange={e=>{setChecked2(!checked2);checkboxchanger2()}}  name='Active' type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Display</label>
              </div>
              <div  class="form-check form-check-inline" style={{marginTop:'0.5rem'}}>
                <input class="form-check-input" checked={checked3} onChange={e=>{setChecked3(!checked3);checkboxchanger()}} name='Active' type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Display Unreconciled Trans. Only</label>
              </div>
           </div>
         
          </Container>
        </DIV5>
      </CardGroup>
      { 
                      <Table responsive striped bordered hover id="table-to-xls">
                        <TableHead>
                          <tr>
                            <th>#</th> 
                            <th>DocNum</th>
                            <th>TransType</th>
                            <th>Posting Date</th>
                            <th>CardCode</th>
                            <th>CardName</th>
                            <th>ItemCode</th>
                            <th>Dscription</th>
                            <th>InQty</th>
                            <th>OutQty</th>
                            <th>CalcPrice</th>
                            <th>TransValue</th>
                            <th>PrjCode</th>
                            <th>DOffDecAcc</th>
                            <th>OcrCode</th>
                           
                          </tr>
                        </TableHead>
                        <tbody>
                          {getfilterddata && getfilterddata.map((item, index) => (
                            <tr key={`${index}`}>
                              <TD>{index + 1}</TD>
                            <TD>{item.BASE_REF}</TD>
                            <TD>{item.TransType}</TD>
                            <TD>{item.DocDate}</TD>
                            <TD>{item.CardCode}</TD>
                            <TD>{item.CardName}</TD>
                            <TD>{item.ItemCode}</TD>
                            <TD>{item.Dscription}</TD>
                            <TD>{item.InQty}</TD>
                            <TD>{item.OutQty}</TD>
                            <TD>{item.CalcPrice}</TD>
                            <TD>{item.TransValue}</TD>
                            <TD>{item.PrjCode}</TD>
                            <TD>{item.DOffDecAcc}</TD>
                            <TD>{item.OcrCode}</TD>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    }
                      <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls"
                  filename={`Inventory Report`}
                  sheet="Inventory Report"
                  buttonText="Export Table"/>
                      {/* --------------------Start Journal Entry Modal------------------ */}
            <Modal
              show={show}
              onHide={handleClose}
              className='Modal-big'
              size='lg'
            >
              <Modal.Header closeButton>
                <Modal.Title id='example-modal-sizes-title-lg'>
                  Journal Entry
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <CardGroup>
                    <DIV7>
                      <Container fluid>
                        <CardGroup>
                          <div style={{ width: '10em', height: 'auto' }}>
                            <label>Series</label>
                            <Select
                              style={{ height: '2px' }}
                              options={[{ label: 'Primary', value: 'Primary' }]}
                            />
                          </div>
                          <div
                            style={{
                              width: '10rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Number</label>
                            <input
                              type='text'
                              readOnly
                              class='form-control'
                              defaultValue={HeaderData && HeaderData.Number}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: '10rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Posting Date</label>
                            <input
                              type='date'
                              name='PostingDate'
                              class='form-control'
                              defaultValue={currentDate || HeaderData && HeaderData.TaxDate}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: '10rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Due Date</label>
                            <input
                              type='date'
                              name='DueDate'
                              class='form-control'
                              defaultValue={currentDate || HeaderData && HeaderData.TaxDate}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: '10rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Doc Date</label>
                            <input
                              type='date'
                              name='DocDate'
                              class='form-control'
                              defaultValue={currentDate || HeaderData && HeaderData.TaxDate}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: '20rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Remarks</label>
                            <input
                              type='text'
                              name='Remarks'
                              class='form-control'
                              defaultValue={HeaderData && HeaderData.Memo}
                            ></input>
                          </div>
                        </CardGroup>
                        <CardGroup>
                          <div style={{ width: '10rem', height: 'auto' }}>
                            <label>Origin No.</label>
                            <input
                              type='text'
                              name='OriginNo'
                              class='form-control'
                              defaultValue={HeaderData && HeaderData.BaseReference}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: '10rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Trans. No</label>
                            <input
                              type='text'
                              name='TransNo'
                              class='form-control'
                              readOnly
                              defaultValue={HeaderData && HeaderData.JdtNum}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: '10rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Project</label>
                            <Select
                              placeholder={HeaderData && HeaderData.ProjectCode}
                            />
                          </div>
                        </CardGroup>
                        <CardGroup>
                          <div style={{ width: '10rem', height: 'auto' }}>
                            <label>Ref.1</label>
                            <input
                              type='text'
                              name='Ref_1'
                              class='form-control'
                              defaultValue={HeaderData && HeaderData.Reference}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: '10rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Ref.2</label>
                            <input
                              type='text'
                              name='Ref_2'
                              class='form-control'
                              defaultValue={HeaderData && HeaderData.Reference2}
                            ></input>
                          </div>
                          <div
                            style={{
                              width: '10rem',
                              height: 'auto',
                              marginLeft: '2rem'
                            }}
                          >
                            <label>Ref.3</label>
                            <input
                              type='text'
                              name='Ref_3'
                              class='form-control'
                              defaultValue={HeaderData && HeaderData.Reference3}
                            ></input>
                          </div>
                          <br />
                          <br />
                        </CardGroup>
                        <div style={{ width: '22rem', height: 'auto' }}>
                          <label>Charts Of Accounts</label>
                          <Select
                            isMulti
                            placeholder='Select'
                            options={ItemsDropDown}
                            // onChange={ItemsDropDownfunc}
                            displayValue='name'
                          />
                        </div>
                      
                      </Container>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </DIV7>
                    <DIV6>
                      <Container></Container>
                    </DIV6>
                  </CardGroup>
                  <Tabs
                    defaultActiveKey='Contents'
                    transition={false}
                    id='noanim-tab-example'
                  >
                    <Tab eventKey='Contents' title='Contents'>
                      <div>
                        {JournalEntryLines && (
                          <Table responsive striped bordered hover>
                          {Array.isArray(JournalEntryLines) &&
                JournalEntryLines.length > 0 ? (
                            <TableHead>
                              <tr>
                                <th> #</th>
                                <th>G/L Acct/BP Code</th>
                                <th>G/L Acct/BP Name</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Empolee id</th>
                                <th>Remarks</th>
                                <th>Ref. 1</th>
                                <th>Ref.3</th>
                                <th>Project</th>
                                <th>Cost Center</th>
                              </tr>
                            </TableHead>
                ):null}
                            <tbody>
                              {JournalEntryLines.map((item, index) => (
                                <tr key={`${index}`}>
                                  <TD>{index + 1}</TD>
                                  <TD>{item.AccountCode}</TD>
                                  <TD>{item.AccountName}</TD>
                                  <TD>{item.Debit}</TD>
                                  <TD>{item.Credit}</TD>
                                  <TD>{item.U_EmployeeID}</TD>
                                  <TD>{item.LineMemo}</TD>
                                  <TD>{item.Reference1}</TD>
                                  <TD>{item.Reference2}</TD>
                                  <TD>{item.ProjectCode}</TD>
                                  <TD>{item.CostingCode}</TD>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </div>
                    </Tab>
                    <Tab eventKey='Attachment' title='Attachment'>
                      <Attachment
                        setattachmentresponse={setattachmentresponse}
                      />
                    </Tab>
                  </Tabs>
                  <DIV3>
                    <Container fluid></Container>
                  </DIV3>
                  <br />
                  <br />
                  <div style={{ marginLeft: '2rem' }}>
                    <Button
                      style={{ marginLeft: '5%' }}
                      type='reset'
                      onClick={() => {
                        handleClose()
                      }}
                    >
                      OK
                    </Button>
                    <Button
                      style={{ marginLeft: '5%' }}
                      onClick={() => {
                        handleClose()
                      }}
                      type='reset'
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
              {/* --------------------End Journal Entry Modal------------------ */}
      <CardGroup>
        <DIV3>
          <br />
          <br />
          <br /> <br />
          <br />
          <br />
          <Container fluid>
          <br />
            <br />
            <div style={{ marginLeft: '2rem' }}>
              <Button
                style={{ marginLeft: '5%' }}
                type='reset'
                onClick={() => {
                  window.location.href = '/Home'
                }}
              >
              OK
              </Button>
            
            </div>
          </Container>
        </DIV3>
     
      </CardGroup>
    </>
  )
}
