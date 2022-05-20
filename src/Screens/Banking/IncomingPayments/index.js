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
export default function IncomingPayments () {
      
  const [bothbodies, setbothbodies] = React.useState(false)
  const [getcredittab, setgetcredittab] = React.useState(false)
  const [getchequetab, setgetchequetab] = React.useState(false)
  const [getcashtab, setgetcashtab] = React.useState(false)
  const [gettransfertab, setgettransfertab] = React.useState(false)
  const [getdefaulttabname, setgetdefaulttabname] = React.useState("Cheque")
  const [currentDate,setcurrentDate] = React.useState()
 
  const [count, setCount] = React.useState(0)
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [TransID, setTransID] = React.useState()
  const [TaxCode, setTaxCode] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
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
  const [ButtonName, setButtonName] = React.useState('Add')
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [getdoctype, setgetdoctype] = React.useState()
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [getcashaccount, setgetcashaccount] = React.useState()
  const [JournalEntryLines, setJournalEntryLines] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [ModalName, setModalName] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [PaymentInvoicesTotalAmountDue, setPaymentInvoicesTotalAmountDue] = React.useState(0)
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [checkboxchanger, setcheckboxchanger] = React.useState(false)
  const [getpaymentonAccount, setgetpaymentonAccount] = React.useState(0)
  const [CurrenciesDropdowon, setCurrenciesDropdowon] = React.useState()
  const [getAccountvalue, setgetAccountvalue] = React.useState(false)
  const [PriceListDropDown, setPriceListDropDown] = React.useState()
  const [SelectedVendor, setSelectedVendor] = React.useState()
  const[getG_LAccount,  setgetG_LAccount]=React.useState()
  const[BanksBranchDropdowon,  setBanksBranchDropdowon]=React.useState()
  const [getStatus, setgetStatus] = React.useState()
  const[BanksAccountDropdowon,  setBanksAccountDropdowon]=React.useState()
  const[getbranchaccount,  setgetbranchaccount]=React.useState()
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
  const [costingCodeDropDown, setCostingCodeDropDown] = React.useState()
  const [selectedItems, setSelectedItems] = React.useState()
  const [AccountselectedItems, setAccountSelectedItems] = React.useState()
  const [getPaymentchecksdata, setgetPaymentchecksdata] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState()
  const [getPaymentAccountsdata, setgetPaymentAccountsdata] = React.useState()
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState('0')
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [show3, setShow3] = React.useState(false)
  const [BanksDropdowon, setBanksDropdowon] = React.useState()
  const [getvalues, setgetvalues] = React.useState({})
  const [CountryDropdowon, setCountryDropdowon] = React.useState()
  const [remarks, setRemarks] = React.useState('')
  const [TotalWTaxAmount, setTotalWTaxAmount] = React.useState(0)
  const [TotalAmountDue, setTotalAmountDue] = React.useState(0)
  const [getdocumentname, setgetdocumentname] = React.useState("RCT1");
  const [getdocumenttype, setgetdocumenttype] = React.useState("24")
  const [ModuleName, setModuleName] = React.useState("IncomingPayments")
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [getdocnumfromcomponent, setgetdocnumfromcomponent] = React.useState()
  const alert = useAlert()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  }
  React.useEffect(async () => {
    today()
    setButtonName("Add")
    setSearchNumber('0')
    setgetdocumentname("RCT1")
  setModuleName("IncomingPayments")
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
      getItemsList(cook)
      getPriceList(cook)
      getBankdetails(cook)
      getCurrencies(cook)
      getcountrydetails(cook)
      GetPaymentOnAccountData(cook)
      GetJECustomerData(cook)
      getProjects(cook)
      getCostingCode(cook)
      TableTaxCode(cook)
    }
  }, [])

  
  const GetJECustomerData = async cook => {
    let body = {
      "SqlCode": "GetCuOJE",
      "SqlName": "GetCuOJE",
      "SqlText": `Select BalDueDeb,TransType,DueDate, BalDueCred, Debit, Credit, ShortName, TransId From JDT1 Where TransType in (-2, 24,46, 30) and ShortName Like 'C%'`
      
      // "SqlText": `Select FldValue, Descr From UFD1 Where TableID = 'ORDR' and FieldID = 12`
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

  const GetPaymentOnAccountData = async cook => {
    let body = {
      "SqlCode": "GetPOA",
      "SqlName": "GetPOA",
      "SqlText": `select NoDocSum,DocEntry,DocNum from ORCT`
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
  const TableTaxCode = async (cook) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
     let SAPApi = `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcOutputTax'`
    await axios
      .post(API_TYPES.GET, {
        api: SAPApi,
        cookie: cook
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name + " : " + element.Code,
              item: element
            })
          })
          setTaxCode(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getcountrydetails = async cookie => {
    const api = `Countries`
    let resResult = {}
    // -------------------------    Items API GET DATA   -----------
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (Response) {
        console.log(Response)
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
      setCountryDropdowon(dropdown)
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
  const getPriceList = async cookie => {
    const api = `PriceLists?$select=PriceListNo,PriceListName`
    let resResult = null
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (Response) {
        console.log(Response)
        resResult = Response
      })
      .catch(function (error) {
        console.log(error)
      })
    let res = await apiProcessing(resResult)
    if (res) {
      let PriceListDropDown = []
      res.forEach(element => {
        PriceListDropDown.push({
          value: element.PriceListNo,
          label: element.PriceListName
        })
      })
      console.log(PriceListDropDown)
      await setPriceListDropDown(PriceListDropDown)
    }
  }
  const getItemsList = async () => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `ChartOfAccounts?$select=Code,AccountLevel,Name&$filter=ActiveAccount eq 'tYES' &$orderby=Code`
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
  const ContactPerson = async () => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq '${SelectedVendor}'`
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
              value: element.CardCode,
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
  const getCostingCode = async cookie => {
    const api = `ProfitCenters?$select=CenterCode,CenterName&$filter=Active eq 'tYES'`
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
          value: element.CenterCode,
          label: element.CenterCode + ' : ' + element.CenterName
        })
      })
      setCostingCodeDropDown(dropdown)
    }
  }
  const Submit_PatchFunc = () => {
    if (ButtonName == 'Add') {
      submit()
    } else if (ButtonName != 'Add') {
      submitPatch()
    }
  }
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `IncomingPayments(${id})`,
          cookie: cook
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success('Operation completed successfully')
            // window.location.reload()
          } else {
            alert.error(JSON.stringify(res.data.error.message))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const submitPatch = async () => {
    let body = {
      Comments: remarks,
      AttachmentEntry: attachmentresponse
    }
    console.log(HeaderData.DocNum, body)
    Patch(HeaderData.DocNum, body)
  }
  const submit = async () => {
    let PaymentMeansdocLines = []
    let IncomingPaymentdocLines = []
    let PaymentAccountsdocLines = []
    let body = {}
    if(getdoctype==='rAccount'){
      console.log("ACCOUNT")
      if(AccountselectedItems){
      AccountselectedItems.forEach(element => {
        PaymentAccountsdocLines.push({
          // "LineNum":ItemsDetails[element][''],
          AccountCode: ItemsDetails[element]['Code'],
          SumPaid: ItemsDetails[element]['Net_Amount'],
          Decription: ItemsDetails[element]['Remarks'],
          AccountName:ItemsDetails[element]['Name'],
          GrossAmount: Number(ItemsDetails[element]['Net_Amount']) + (Number(AccountinvoiceTotalAmount) * Number(TotalWTaxAmount)/100),
          ProfitCenter: ItemsDetails[element]['CostCentre'],
          VatGroup: ItemsDetails[element]['Tax_Definition'],
          ProjectCode: ItemsDetails[element]['Project'],
          // VatAmount: ItemsDetails[element]['TaxRate']
        })
        setgetcardcode(ItemsDetails[element]['Code'])
      })
    }
    if(selectedItems){
      selectedItems.forEach(element => {
        PaymentMeansdocLines.push({
          // "LineNum":ItemsDetails[element][''],
          DueDate: ItemsDetails[element]['PostingDate'],
          // "CheckNumber":ItemsDetails[element][''] ,
          BankCode: ItemsDetails[element]['BankName'],
          // "AccounttNum":ItemsDetails[element][''],
          // {item.DocumentStatus === "bost_Open" ? (<p style={{ background: 'gray', color: 'white' }}>Open</p>) : item.DocumentStatus === "bost_Close" ? (<p style={{ background: 'red', color: 'white' }}>Closed</p>) : null}
          CheckSum:ItemsDetails[element]['CheckAmount'],
          // Currency: 'PKR',
          CountryCode: ItemsDetails[element]['Country'],
          CheckAccount: ItemsDetails[element]['Code'],
          Branch:getbranchaccount,
            AccounttNum: getcheckAccountNo,
        })
      })
    }
     body = {
        DocType: getdoctype,
        DocDate: getvalues.PostingDate ? getvalues.PostingDate : currentDate,
        TaxDate: getvalues.TaxDate ? getvalues.TaxDate : currentDate,
        DueDate: getvalues.DocDueDate ? getvalues.DocDueDate : currentDate,
        CardCode: getcardcode,
        CashAccount:getcashaccount,
        CashSum: getcashaccount===undefined?undefined:(Number(getcashtotal)),
        Address: getvalues.Address,
        Remarks: getvalues.Remarks,
        JournalRemarks: getvalues.Journal_Remarks,
        // ContactPersonCode: getvalues.Contact_Person,
        // "VatDate": "2017-07-07",
        TransactionCode: '',
        DocCurrency: getvalues.Currency ,
        CounterReference:getvalues.Ref_2,
        // "TransferRealAmount": 0.0,
        // ItemsDetails[element]['CheckAmount'] === undefined ? 0 : ItemsDetails[element]['CheckAmount']
        PaymentChecks: PaymentMeansdocLines.length > 0 ? PaymentMeansdocLines : [],
        PaymentAccounts: PaymentAccountsdocLines,
        
      "TransferAccount": getTransferAccount===undefined ? undefined:getTransferAccount,
      "TransferSum": gettransfertotal===undefined ? undefined:(Number(gettransfertotal)),
      "TransferDate": getTransferDate===undefined ? undefined:getTransferDate,
      "TransferReference":getReference===undefined ? undefined:getReference,
      }
    }else if(ModalName === "A/R" || ModalName === "A/P"){
      console.log("Get Data")
      if(selectedItems){
        selectedItems.forEach(element => {
          PaymentMeansdocLines.push({
            // "LineNum":ItemsDetails[element][''],
            DueDate: ItemsDetails[element]['PostingDate'],
            // "CheckNumber":ItemsDetails[element][''] ,
            BankCode: ItemsDetails[element]['BankName'],
            // "AccounttNum":ItemsDetails[element][''],
            // {item.DocumentStatus === "bost_Open" ? (<p style={{ background: 'gray', color: 'white' }}>Open</p>) : item.DocumentStatus === "bost_Close" ? (<p style={{ background: 'red', color: 'white' }}>Closed</p>) : null}
            CheckSum:ItemsDetails[element]['CheckAmount'],
            // Currency: 'PKR',
            CountryCode: ItemsDetails[element]['Country'],
            CheckAccount: ItemsDetails[element]['Code'],
            Branch:getbranchaccount,
            AccounttNum: getcheckAccountNo,
          })
        })
      }
    PQDocumentLines.forEach(element => {
      if (element.isSelected) {
        console.log(element)
        IncomingPaymentdocLines.push({
          // "LineNum":element.Line,
          // "DueDate":element.DocDueDate,
          DocEntry: element.DocEntry || element.TransId,
          AppliedSys: Number(element.TotalPayment) === undefined ? (element.DocTotal - element.PaidToDate) : Number(element.TotalPayment),
          WitholdingTaxApplied: element.WTAmount,
          SumApplied: Number(element.TotalPayment) === undefined ? (element.DocTotal - element.PaidToDate) : Number(element.TotalPayment),
          // DocT
          // "AccounttNum":element.,
          // "CheckSum":element.,
          // "Currency": "PKR",
          // "CountryCode":element.,
          // "CheckAccount":element. ,
        })
      }
    })
    body = {
      DocType: getdoctype,
      DocDate: getvalues.PostingDate ? getvalues.PostingDate : currentDate,
      CardCode: getvalues.Code,
      CashAccount:getcashaccount,
      CashSum: getcashaccount===undefined ? undefined:(Number(getcashtotal)),
      Address: getvalues.Address,
      Remarks: getvalues.Remarks,
      JournalRemarks: getvalues.Journal_Remarks,
      // ContactPersonCode: getvalues.Contact_Person,
      TaxDate: getvalues.TaxDate ? getvalues.TaxDate : currentDate,
      DueDate: getvalues.DocDueDate ? getvalues.DocDueDate : currentDate,
      // "VatDate": "2017-07-07",
      TransactionCode: '',
      DocCurrency: getvalues.Currency,
      CounterReference:getvalues.Ref_2,

      "TransferAccount": getTransferAccount===undefined ? undefined:getTransferAccount,
      "TransferSum": gettransfertotal===undefined ? undefined:(Number(gettransfertotal)),
      "TransferDate": getTransferDate===undefined ? undefined:getTransferDate,
      "TransferReference":getReference===undefined ? undefined:getReference,

      // "TransferRealAmount": 0.0,
      // ItemsDetails[element]['CheckAmount'] === undefined ? 0 : ItemsDetails[element]['CheckAmount']
      PaymentChecks: PaymentMeansdocLines.length > 0 ? PaymentMeansdocLines : [],
      PaymentInvoices: IncomingPaymentdocLines,
      PaymentAccounts: PaymentAccountsdocLines

    }
    }
    else if(ModalName === undefined && checkboxchanger === true && getdoctype === 'rCustomer' || 'rSupplier' ){
      console.log("Direct Payment")
    if(selectedItems){
      selectedItems.forEach(element => {
        PaymentMeansdocLines.push({
          // "LineNum":ItemsDetails[element][''],
          DueDate: ItemsDetails[element]['PostingDate'],
          // "CheckNumber":ItemsDetails[element][''] ,
          BankCode: ItemsDetails[element]['BankName'],
          // "AccounttNum":ItemsDetails[element][''],
          // {item.DocumentStatus === "bost_Open" ? (<p style={{ background: 'gray', color: 'white' }}>Open</p>) : item.DocumentStatus === "bost_Close" ? (<p style={{ background: 'red', color: 'white' }}>Closed</p>) : null}
          CheckSum:ItemsDetails[element]['CheckAmount'],
          // Currency: 'PKR',
          CountryCode: ItemsDetails[element]['Country'],
          CheckAccount: ItemsDetails[element]['Code'],
          Branch:getbranchaccount,
          AccounttNum: getcheckAccountNo,
        })
      })
    }
     body = {
        DocType: getdoctype,
        DocDate: getvalues.PostingDate ? getvalues.PostingDate : currentDate,
        CardCode: SelectedVendor,
        CashAccount:getcashaccount,
        CashSum: getcashaccount===undefined?undefined:(Number(getcashtotal)),
        Address: getvalues.Address,
        Remarks: getvalues.Remarks,
        JournalRemarks: getvalues.Journal_Remarks,
        // ContactPersonCode: getvalues.Contact_Person,
        TaxDate: getvalues.TaxDate ? getvalues.TaxDate : currentDate,
        DueDate: getvalues.DocDueDate ? getvalues.DocDueDate : currentDate,
        // "VatDate": "2017-07-07",
        TransactionCode: '',
        DocCurrency: getvalues.Currency,
        CounterReference:getvalues.Ref_2,
        // "TransferRealAmount": 0.0,
        // ItemsDetails[element]['CheckAmount'] === undefined ? 0 : ItemsDetails[element]['CheckAmount']
        PaymentChecks: PaymentMeansdocLines.length > 0 ? PaymentMeansdocLines : [],
        // PaymentAccounts: PaymentAccountsdocLines,
        
      "TransferAccount": getTransferAccount===undefined ? undefined:getTransferAccount,
      "TransferSum": gettransfertotal===undefined ? undefined:(Number(gettransfertotal)),
      "TransferDate": getTransferDate===undefined ? undefined:getTransferDate,
      "TransferReference":getReference===undefined ? undefined:getReference,
      }
    } 
   
    console.log('Body', body)
    if (bothbodies) {
      PostInSecondDB(body)
     }else{
       PostInFirstDB(body)
     }
  }
  const PostInFirstDB = async(body) =>{
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: `IncomingPayments`,
          cookie: cook
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success('Operation completed successfully')
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            alert.error(JSON.stringify(res.data.error.message))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const PostInSecondDB = async(body) =>{
    let cook = await localStorage.getItem('secondcookie')
    if (cook) {
      await axios
        .post(API_TYPES.SECONDPOST, {
          body: JSON.stringify(body),
          api: `IncomingPayments`,
          cookie: cook
        })
        .then(function (res) {
          if (res.data.DocNum) {
           PostInFirstDB(body)
            // alert.success('Operation completed successfully')
            // setTimeout(() => {
            //   // window.location.reload();
            // }, 3000);
          } else {
            alert.error(JSON.stringify(res.data.error.message))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const SearchAll_Filter_Data = async () => {
    if (SearchNumber === '0') {
      SearchPRNumberAll()
    } else {
      SearchPRNumberFilter()
    }
  }
  const Paymentmeansfunction = async () => {
    setShow3(true)
  }
  const selectPR = async item => {
    setShow(false)
    setHeaderData(item)
    localStorage.setItem('getDocEntry',item.DocEntry);
    // setPQDocumentLines(item.DocumentLines)
    // console.log(item.DocumentLines)
  }
  const SearchPRNumberAll = async () => {
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `IncomingPayments`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res)
        setModalHeaderData(res.data.value)
        if (ModalHeaderData !== '') {
          setButtonName('Update')
        }
      })
      .catch({})
    setShow1(true)
  }
  const handleClose3 = () => {
    setShow3(false)
  }
  const PMtabscontroller = async (value) =>{
    let cook = await localStorage.getItem('cookie');
    let sapAPi = `SQLQueries('GetPOA')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("res",res)
        if(res.data.value){
           res.data.value.forEach(element =>{
             if(element.DocEntry === value.DocEntry && element.NoDocSum !== 0){
              setgetpaymentonAccount(element.NoDocSum)
              setstatuschange(true)
              setcheckboxchanger(true)
             }
           })
        }
      })
      .catch({})
      if((Array.isArray(value.PaymentChecks) && value.PaymentChecks.length > 0) && (value.CashAccount && value.CashSum) && (value.TransferAccount && value.TransferSum)){
        setgetdefaulttabname("Cheque")
        setgettransfertab(false)
        setgetcashtab(false)
        setgetchequetab(false)
        setgetcredittab(true)
      }
      else if((Array.isArray(value.PaymentChecks) && value.PaymentChecks.length > 0) && (value.CashAccount && value.CashSum) ){
        setgetdefaulttabname("Cheque")
        setgettransfertab(false)
        setgetcashtab(false)
        setgetchequetab(true)
        setgetcredittab(true)
      }else if((Array.isArray(value.PaymentChecks) && value.PaymentChecks.length > 0) && (value.TransferAccount && value.TransferSum)){
        setgetdefaulttabname("Cheque")
        setgettransfertab(false)
        setgetcashtab(true)
        setgetchequetab(false)
        setgetcredittab(true)
      }else if( (value.CashAccount && value.CashSum) && (value.TransferAccount && value.TransferSum)){
        setgetdefaulttabname("BankTransfer")
        setgettransfertab(false)
        setgetcashtab(false)
        setgetchequetab(true)
        setgetcredittab(true)
      }else if(value.TransferAccount && value.TransferSum){
      setgetdefaulttabname("BankTransfer")
      setgettransfertab(false)
      setgetcashtab(true)
      setgetchequetab(true)
      setgetcredittab(true)
    }else if(value.CashAccount && value.CashSum){
      setgetdefaulttabname("Cash")
      setgettransfertab(true)
      setgetcashtab(false)
      setgetchequetab(true)
      setgetcredittab(true)
    }else if(Array.isArray(value.PaymentChecks) && value.PaymentChecks.length > 0){
      setgetdefaulttabname("Cheque")
      setgettransfertab(true)
      setgetcashtab(true)
      setgetchequetab(false)
      setgetcredittab(true)
    }
  }
  const SearchPRNumberFilter = async () => {
    let sapAPi = `IncomingPayments?$filter=DocNum eq ${SearchNumber}`
    console.log(sapAPi)
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(async function (res) {
        setHeaderData(res.data.value[0])
       await PMtabscontroller(res.data.value[0])
        console.log(res.data.value[0])
        localStorage.setItem('getDocEntry',res.data.value[0].DocEntry);
        getDocnumberfun(res.data.value[0].PaymentInvoices,cook)
        let sum = 0
        res.data.value[0].PaymentInvoices.forEach(element => {
            sum = sum + element.SumApplied
          })
          setPaymentInvoicesTotalAmountDue(sum)
        setgetPaymentchecksdata(res.data.value[0].PaymentChecks)
        setgetPaymentAccountsdata(res.data.value[0].PaymentAccounts)
        let sum1=0
        res.data.value[0].PaymentAccounts.forEach(element => {
            sum1 = sum1 + element.SumPaid
        })
        setinvoiceTotalAmount(sum1)
        if (HeaderData !== '') {
          setButtonName('Update')
        }
      })
      .catch({})
    let sapAPi2 = `JournalEntries?$filter=OriginalJournal eq 'ttReceipt' and BaseReference eq  '${SearchNumber}' &$ select=JdtNum`
    await axios
      .post(API_TYPES.GET, { api: sapAPi2, cookie: cook })
      .then(function (res) {
        setTransID(res.data.value[0].JdtNum)
      })
      .catch({})
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
  const TransactionNumber = async () => {
    let sapAPi = `JournalEntries?$filter=OriginalJournal eq 'ttReceipt' and BaseReference eq '${SearchNumber}'`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0])
        setJournalEntryLines(res.data.value[0].JournalEntryLines)
        if (HeaderData !== '') {
          setButtonName('Update')
        }
      })
      .catch({})
    setShow(true)
  }
  const ObjectTypePaymentInvoices = async (docnum,doctype) => {
    console.log(docnum,doctype)
    if(doctype==='it_Invoice'){ 
    let sapAPi = `Invoices(${docnum})`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res)
        setInvoicesHeaderData(res.data)
        setInvoicesLines(res.data.DocumentLines)
        let sum=0
        res.data.DocumentLines.forEach(element => {
            sum = sum + element.LineTotal
        })
        setinvoiceTotalAmount(sum)
        if (HeaderData !== '') {
          setButtonName('Update')
        }
      })
      .catch({})
    setShow4(true)
    }else if(doctype==='it_Receipt'){
      let sapAPi = `JournalEntries?$filter=OriginalJournal eq 'ttReceipt' and JdtNum eq ${docnum}`
      console.log(sapAPi)
      let cook = await localStorage.getItem('cookie')
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setHeaderData(res.data.value[0])
          setJournalEntryLines(res.data.value[0].JournalEntryLines)
          if (HeaderData !== '') {
            setButtonName('Update')
          }
        })
        .catch({})
        setShow(true)
    }else if(doctype==='it_OpeningBalance'){
      let sapAPi = `JournalEntries?$filter=OriginalJournal eq 'ttOpeningBalance' and JdtNum eq ${docnum}`
      console.log(sapAPi)
      let cook = await localStorage.getItem('cookie')
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setHeaderData(res.data.value[0])
          setJournalEntryLines(res.data.value[0].JournalEntryLines)
          if (HeaderData !== '') {
            setButtonName('Update')
          }
        })
        .catch({})
        setShow(true)
    }
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
    } else if (selectedOption.value === 'rCustomer') {
      api = Uapi
      let cook = await localStorage.getItem('cookie')
      if (cook) GetRequesterDetail(cook, api)
      setgetAccountvalue(false)
    }
    else if (selectedOption.value === 'rAccount') {
     setgetAccountvalue(true)
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
  const getProjects = async cookie => {
    const api = `Projects?$select=Code,Name&$filter=Active eq 'tYES' and (ValidTo lt '2021-01-11' or ValidTo eq '2021-01-11' or  ValidTo eq null)`
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
  const getseriesvaluefunction = async (e) =>{
    if(e.item.Name =='2'){
      setbothbodies(false)
      setgetseriesvalue(e.item.Series)
      setgetnextnumber(e.item.NextNumber)
    }else if(e.item.Name =='1'){
    setbothbodies(true)
    setgetseriesvalue(e.item.Series)
    setgetnextnumber(e.item.NextNumber)
    }
  }
  const getCurrencies = async cookie => {
    const api = `Currencies`
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
      setCurrenciesDropdowon(dropdown)
    }
  }
  const checkboxSelect = (item, index) => {
    let checkboxValue = null
    if (item.isSelected) {
      checkboxValue = false
    } else {
      checkboxValue = true
    }
    let prData = PrRe
    prData[index]['isSelected'] = checkboxValue
    setPQDocumentLines(prData)
    let sum = 0
    let sum2 = 0
    prData.forEach(element => {
      if (element.isSelected) {
        sum = sum + (element.DocTotal ? (element.DocTotal - element.PaidToDate) : (element.BalDueDeb - element.BalDueCred))
        sum2 = sum2 + element.WTAmount || 0
      }
      setTotalAmountDue(sum)
      setTotalWTaxAmount(sum2)
    })
  }
  const getDoctotalvalues = (e,index) => {
    let prData = PrRe 
    prData[index][e.target.name]= e.target.value
console.log("PrRe",prData)
    let sum = 0
    prData.forEach(element => {
      if (element.isSelected) {
        sum = sum + Number( element.TotalPayment === undefined ? ((element.DocTotal - element.PaidToDate) || (element.BalDueDeb - element.BalDueCred)) : element.TotalPayment)
      }
    })
    console.log(sum)
    setTotalAmountDue(sum)
  }
  const getinputvalues = e => {
    let obj = getvalues
    obj[e.target.name] = e.target.value
    setgetvalues(obj)
  }
  const gettableinputvalues = (e, item) => {
    let obj = ItemsDetails
    let name = e.target.name
    obj[item][name] = e.target.value
    obj[item]['CheckAmount'] = e.target.value
    obj[item]['Amount'] =
      Number(TotalAmountDue) -
      Number(TotalWTaxAmount) +
      Number(getpaymentonAccount) -
      Number(e.target.value)
    setItemsDetails(obj)
    console.log(obj)
  }
  const getdropdownvalue = (e, name) => {
    let obj = getvalues
    obj[name] = e.value
    console.log("name",name)
    console.log("e.value",e.value)
    setgetvalues(obj)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleClose4 = () => {
    setShow4(false)
  }
  
  const getBatchQuantities = async (data) => {
    let cook = await localStorage.getItem('cookie');
    let sapAPi = `SQLQueries('GetCuOJE')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("res",res)
        if(res.data.value){
          let filterddata = res.data.value.filter(el => {return el.ShortName  === SelectedVendor && el.BalDueDeb - el.BalDueCred !== 0})
          setPrRe(data.concat(filterddata))
          console.log("data",data)
          console.log("filterddata",filterddata)
          console.log("data.concat(filterddata)",data.concat(filterddata))
        }
        // setBatchNumberQuantityData(res.data.value)
      })
      .catch({})
  }
  const handleShow = async () => {
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    if(getdoctype === 'rCustomer' ){
      let SAPapi = `Invoices?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${SelectedVendor}' &$orderby=DocNum asc`
      await axios
        .post(API_TYPES.GET, {
          api: SAPapi,
          cookie: cookie
        })
        .then(function (res) {
          console.log(res)
          getBatchQuantities(res.data.value)
          // setPrRe([...res.data.value,PrRe])
          setModalName("A/R")
        })
        .catch({})
    } else if(getdoctype==='rSupplier'){
      let SAPapi = `PurchaseInvoices?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${SelectedVendor}' &$orderby=DocNum asc`
      await axios
        .post(API_TYPES.GET, {
          api: SAPapi,
          cookie: cookie
        })
        .then(function (res) {
          setPrRe(res.data.value)
          setModalName("A/P")
        })
        .catch({})
    }
    // if(getdoctype==='rAccount')
  
  }
  const disabledinput = () => {
    setCount(count + 1)
    if (count % 2 == 0) {
      setstatuschange(false)
      setcheckboxchanger(true)
    } else {
      setstatuschange(true)
      setcheckboxchanger(false)
    }
  }
  const ItemsDropDownfunc = async selectedList => {
    let list = []
    selectedList.forEach(element => {
      list.push(element.value)
    })
    await setSelectedItems(list)
  }
  const ItemsDropDownfunc2 = async selectedList => {
    let list = []
    selectedList.forEach(element => {
      list.push(element.value)
    })
    await setAccountSelectedItems(list)
  }
  const getBankdetails = async cookie => {
    const api = `Banks`
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
          value: element.BankCode,
          label: element.BankCode + ' : ' + element.BankName
        })
      })
      setBanksDropdowon(dropdown)
    }
  }
  const getaccountnofromapi = async value =>{
    let cook = await localStorage.getItem('cookie')  
    const api = `HouseBankAccounts?$filter=BankCode eq '${value}'`
    let resResult = {}
    // -------------------------    Items API GET DATA   -----------
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cook })
      .then(function (Response) {
        resResult = Response
      })
      .catch(function (error) {
        console.log(error)
      })
    let res = apiProcessing(resResult)
    if (res) {
      setgetG_LAccount(res[0].GLAccount)
      // setgetcheckAccountNo(res[0].AccNo)
      let dropdown = []
      let dropdown2 = []
      res.forEach(element => {
        dropdown.push({
          value: element.Branch,
          label: element.Branch 
        })
      })
      res.forEach(element => {
        dropdown2.push({
          value: element.AccNo,
          label: element.AccNo 
        })
      })
      setBanksBranchDropdowon(dropdown)
      setBanksAccountDropdowon(dropdown2)
    }
  }
  const DocLinesDropDownOnChange = (selectedItem, item, name) => {
    let itemDetail = ItemsDetails
    itemDetail[item][name] = selectedItem.value
    itemDetail[item]['TaxRate'] =selectedItem.item.VatGroups_Lines[0].Rate
    setTotalWTaxAmount(selectedItem.item.VatGroups_Lines[0].Rate)
    console.log(itemDetail)
    setItemsDetails(itemDetail)
  }
  const DocLinesDropDownOnChange44 = (selectedItem, item, name) => {
    let itemDetail = ItemsDetails
    itemDetail[item][name] = selectedItem.value
    setItemsDetails(itemDetail)
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
      <h1 style={{ textAlign: 'center' }}>Incoming Payments</h1>
      <CardGroup>
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
                  { label: 'Account', value: 'rAccount' }
                ]}
                onChange={requesterDropDownfunc}
                displayValue='label'
              />
            </div>
            {getAccountvalue?
            <>  
            <br />
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Project</label>
              <Select
                placeholder={HeaderData && HeaderData.ProjectCode}
                onChange={e => {
                  getdropdownvalue(e, 'Project')
                }}
                // options={branchesDropDown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Doc. Currency</label>
              <Select
                placeholder={HeaderData && HeaderData.BPLName}
                onChange={e => {
                  getdropdownvalue(e, 'Currency')
                }}
                options={CurrenciesDropdowon}
              />
            </div>
            <br />
          
            <div style={{ width: '23.5rem', height: 'auto' }}>
                      <label>G/L Account</label>
                      <Select
                        isMulti
                    placeholder={getPaymentchecksdata&&getPaymentchecksdata.CheckAccount}
                        options={ItemsDropDown}
                        onChange={ItemsDropDownfunc2}
                        displayValue='name'
                      />
                    </div>
            </>:
            <>
         
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Code</label>
              <Select
                placeholder={HeaderData && HeaderData.CardCode+":"+HeaderData && HeaderData.CardName}
                options={RequesterCodeDropdown} // Options to display in the dropdown
                onChange={e => {
                  setSelectedVendor(e.value)
                  getdropdownvalue(e, 'Code')
                }}
                displayValue='name'
              />
            </div><br/>
            <label>Contact Person</label>
            <div
              style={{ width: '23.5rem', height: 'auto' }}
              variant='primary'
              onClick={ContactPerson}
            >
              <Select
                placeholder={HeaderData && HeaderData.ContactPersonCode}
                options={ContactPersonDropdown}
                onChange={e => {
                  getdropdownvalue(e, 'Contact_Person')
                }}
                displayValue='name'
              />
            </div><br/>
            <Button variant='primary' onClick={handleShow}>
              Get Data
            </Button>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Bill To</label>
              <Select
                // placeholder={HeaderData && HeaderData.BPLName}
                onChange={e => {
                  getdropdownvalue(e, 'Address,')
                }}
                // options={branchesDropDown}
              />
              <br />
              <TextInput
                name='Address,'
                onChange={e => {
                  getinputvalues(e)
                }}
                type='text'
                defaultValue={HeaderData && HeaderData.Address}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Project</label>
              <Select
                placeholder={HeaderData && HeaderData.ProjectCode}
                onChange={e => {
                  getdropdownvalue(e, 'Project')
                }}
                // options={branchesDropDown}
              />
            </div>
            <br />
            </>
            }
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
              <label>No.</label>
            <CardGroup>
            <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
                <Select
                  // placeholder={HeaderData && HeaderData.RequesterName}
                  options={getserviceseries} // Options to display in the dropdown
                  onChange={e=>{getseriesvaluefunction(e)
                    // TableTaxCode(e.item.Name)
                  }}// Function will trigger on select event
                  // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='number'
                  name='Discount'
                  readOnly
                  value={getnextnumber}
                  placeholder=''
                  class='form-control'
                /> <br/>
              </div>
             </CardGroup>
             </div>
            <div className="Incoming"
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem',borderColor: 'lightgray' }}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon2" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
              <input
                name={'SearchPRNumber'}
                type='Number'
                placeholder='Number'
                class='form-control2'
                onChange={e => {
                  setSearchNumber(e.target.value)
                }}
              />
            </div>
            <br />
            <div
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}
            >
              <label>Posting Date</label>
              <input
                type='date'
                name='PostingDate'
                class='form-control'
                defaultValue={HeaderData && HeaderData.DocDate ? HeaderData && HeaderData.DocDate : currentDate }
                onChange={e => {
                  getinputvalues(e)
                }}
              ></input>
            </div>
            <div
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}
            >
              <label>Due Date</label>
              <input
                type='date'
                class='form-control'
                name='DocDueDate'
                onChange={e => {
                  getinputvalues(e)
                }}
                defaultValue={HeaderData && HeaderData.DueDate ? HeaderData && HeaderData.DueDate : currentDate  }
              ></input>
            </div>
            <div
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}
            >
              <label>Document Date</label>
              <input
                type='date'
                class='form-control'
                name='TaxDate'
                onChange={e => {
                  getinputvalues(e)
                }}
                defaultValue={HeaderData && HeaderData.TaxDate ? HeaderData && HeaderData.TaxDate : currentDate}
              ></input>
            </div>
            <div
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}
            >
              <label>Reference</label>
              <TextInput
                onChange={e => {
                  getinputvalues(e)
                }}
                name='Ref_2'
                type='text'
                defaultValue={HeaderData && HeaderData.CounterReference}
              />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <label style={{ marginLeft: '2rem' }}>Transaction No.</label>
              <CardGroup>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => TransactionNumber()}
                >
                  {' '}
                  <GrDocumentPerformance />
                </a>
                <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                  <input
                    type='number'
                    value={TransID}
                    readOnly
                    class='form-control'
                    name='TaxAmount(LC)'
                  />
                </div>
              </CardGroup>
            </div>
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
                              defaultValue={HeaderData && HeaderData.TaxDate}
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
                              defaultValue={HeaderData && HeaderData.TaxDate}
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
                              defaultValue={HeaderData && HeaderData.TaxDate}
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
                              // defaultValue={HeaderData && HeaderData.TaxDate}
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
                              defaultValue={HeaderData && HeaderData.TaxDate}
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
                            onChange={ItemsDropDownfunc}
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
                                  <TD>{ItemsDetails[item.AccountCode].Name}</TD>
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
            <br />
              {/* --------------------Start Invoices Modal------------------ */}
              <Modal
              show={show4}
              onHide={handleClose4}
              className='Modal-big'
              size='lg'
            >
              <Modal.Header closeButton>
                <Modal.Title id='example-modal-sizes-title-lg'>
                  {ModalName} Invoices
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form >
        <CardGroup>
          <DIV3>
            <Container fluid>
             
              <label>Vendor</label>
              <div style={{ width: '23.5rem', height: 'auto' }}  >
                <Select
                 placeholder={InvoicesHeaderData && InvoicesHeaderData.CardCode }
                displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <label>Contact Person</label>
              <div
                style={{ width: '23.5rem', height: 'auto' }} >
                <Select
               placeholder={InvoicesHeaderData && InvoicesHeaderData.ContactPersonCode }
                  displayValue='name' // Property name to display in the dropdown options
                  />
              </div>
              <br />
              <br />
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Vendor Ref.No</label>
                <input
                  defaultValue={InvoicesHeaderData && InvoicesHeaderData.NumAtCard }
                  type='text'
                  class='form-control'
                  readOnly
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                ></input>
              </div>
            </Container>
          </DIV3>
           <DIV3>
            <Container style={{marginLeft:'43rem' }}>
              <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
              <label>No</label>
              <input
                type='number'
                readOnly='readOnly'
                defaultValue={InvoicesHeaderData && InvoicesHeaderData.DocNum }
                class='form-control'
              /></div>
              <br />
              <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
              <label> Status</label>
              <input
                type='text'
                readOnly
                class='form-control'
                defaultValue={InvoicesHeaderData && InvoicesHeaderData.DocumentStatus }
              /></div>
               <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
              <label>Posting Date</label>
              <input
                type='date'
                name='DocDate'
                class='form-control'
                defaultValue={InvoicesHeaderData && InvoicesHeaderData.DocDate }
              /></div>
               <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'  }}>
              <label> Due Date</label>
              <input
                type='date'
                name='DocDueDate'
                class='form-control'
                defaultValue={InvoicesHeaderData && InvoicesHeaderData.DocDueDate }
              /></div>
               <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
              <label> Document Date</label>
              <input
                type='date'
                name='DocumentDate'
                class='form-control'
                defaultValue={InvoicesHeaderData && InvoicesHeaderData.TaxDate }
               
              /></div>
              <br />
            </Container>
          </DIV3>
        </CardGroup>
        {/* Table+++++++++ */}
        <Tabs
          defaultActiveKey='Contents'
          transition={false}
          id='noanim-tab-example'
        >
          <Tab eventKey='Contents' title='Contents'>
            { (
              <Table responsive striped bordered hover>
                {Array.isArray(InvoicesLines) &&
                InvoicesLines.length > 0 ? (
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Bar Code</th>
                      <th>Item No.</th>
                      <th>Item Description</th>
                      <th>UoM Name</th>
                      <th>Free Text</th>
                      <th>Quantity</th>
                      <th>Delivery Date</th>
                      <th>Open Qty</th>
                      <th>Whse</th>
                      <th>Unit Price</th>
                      <th>Discount</th>
                      <th>Price after Discount</th>
                      <th>Tax Code : Rate</th>
                      <th>Tax Amount(LC)</th>
                      <th>Gross Price After Disc.</th>
                      <th>Freight 1</th>
                      <th>Freight 1 (LC)</th>
                      <th>Line Total</th>
                      <th>Gross Total(LC)</th>
                      <th>Project</th>
                      <th>Buyer</th>
                      <th>Cost Centre</th>
                    </tr>
                  </TableHead>
                ) : null}
                <tbody>
                  {InvoicesLines && InvoicesLines.map(
                    (item, index) =>
                      item.LineStatus === 'bost_Open' && (
                        <tr key={`${index}`}>
                          <TD>{index + 1}</TD>
                          <TD></TD>
                          <TD>{item.ItemCode}</TD>
                          <TD>{item.ItemDescription}</TD>
                          <TD>{item.MeasureUnit}</TD>
                          <TD>
                            <div style={{ width: '14rem', height: 'auto' }}>
                              <input
                                type='text'
                                name='FreeText'
                                class='form-control'
                                aria-describedby='Requesterid'
                                defaultValue={item.FreeText}
                               
                              />
                            </div>
                            {item.FreeText}
                          </TD>
                          <TD>
                            <div style={{ width: '14rem', height: 'auto' }}>
                              <input
                                type='number'
                                name='QuotedQty'
                                readOnly='readOnly'
                                class='form-control'
                                aria-describedby='Requesterid'
                                defaultValue={item.RemainingOpenQuantity}
                              />
                            </div>
                          </TD>
                          <TD>
                            <div style={{ width: '14rem', height: 'auto' }}>
                              <input
                                type='date'
                                name='ShipDate'
                                readOnly='readOnly'
                                class='form-control'
                                defaultValue={item.ShipDate}
                              />
                            </div>
                          </TD>
                          <TD>{item.RemainingOpenQuantity } </TD>
                          <TD>
                            <div style={{ width: '15em' }}>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder={item.WarehouseCode} displayValue='name' // Property name to display in the dropdown options
                                />
                            </div>
                          </TD>
                          <TD>{item.UnitPrice}</TD>
                          <TD>{item.DiscountPercent}</TD>
                          <TD>{item.Price}</TD>
                          <TD>
                            <div style={{ width: '14rem' }}>
                              <Select
                              menuPortalTarget={document.body}
                                placeholder={
                                  item.VatGroup +
                                  '  : ' +
                                  item.TaxPercentagePerRow +
                                  '%'
                                } displayValue='name' // Property name to display in the dropdown options
                              />
                            </div>
                          </TD>
                          <TD>{item.TaxTotal}</TD>
                          <TD>{item.GrossTotalSC}</TD>
                          <TD>
                            <div style={{ width: '14rem' }}>
                              <Select
                              menuPortalTarget={document.body}
                                // placeholder= {item.DocumentLineAdditionalExpenses[0].ExpenseCode || "null"}
                              displayValue='name' // Property name to display in the dropdown options
                              />
                            </div>
                          </TD>
                          <TD>
                           </TD>
                          <TD>{item.LineTotal}</TD>
                          <TD>{item.GrossTotal}</TD>
                          <TD>
                            <div style={{ width: '14rem' }}>
                              <Select
                              menuPortalTarget={document.body}
                                placeholder={item.ProjectCode}
                                displayValue='name' // Property name to display in the dropdown options
                              />
                            </div>
                          </TD>
                          <TD>
                            <div style={{ width: '14rem' }}>
                              <Select
                              menuPortalTarget={document.body}
                                placeholder={item.SalesPersonCode}
                                displayValue='name' // Property name to display in the dropdown options
                              />
                            </div>
                          </TD>
                          <TD>
                            <div style={{ width: '14rem' }}>
                              <Select
                              menuPortalTarget={document.body}
                                placeholder={item.CostingCode}
                                displayValue='name' // Property name to display in the dropdown options
                              />
                            </div>
                          </TD>
                        </tr>
                      )
                  )}
                </tbody>
              </Table>
            )}
          </Tab>
          <Tab eventKey='Logistics' title='Logistics'>
          </Tab>
          <Tab eventKey='Accounting' title='Accounting'>
          </Tab>
          <Tab eventKey='Attachment' title='Attachment'>
          </Tab>
        </Tabs>
        {/* Bottom Side+++++++++ */}
        <CardGroup>
          <DIV3>
            <Container fluid>
              <div style={{ width: '23.5em', height: 'auto' }}>
                <label>Buyer</label>
                <input
                  type='text'
                  class='form-control'
                  placeholder=''
                defaultValue={InvoicesHeaderData && InvoicesHeaderData.SalesPersonCode }
                />
              
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Owner</label>
                <Select
                
                placeholder={InvoicesHeaderData && InvoicesHeaderData.DocumentsOwner }
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div class='form-group'>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label for='exampleFormControlTextarea1'>Remarks</label>
                <div style={{ width:'23.5rem'}}>
                <textarea
                  defaultValue={
                    InvoicesHeaderData &&
                    'Based on Goods Receipt PO: ' +
                      InvoicesHeaderData.DocEntry +
                      '. ' +
                      InvoicesHeaderData.Comments
                     
                  }
                  type='text'
                  class='form-control rounded-0'
                  id='exampleFormControlTextarea1'
                  name='Comments'
                  rows='3'
                /> </div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div>
                <Button
                  style={{ marginLeft: '5%' }}
                  onClick={() => {
                    handleClose4()
                  }}
                >
                OK
                </Button>
                <Button style={{ marginLeft: '5%' }} 
                variant="secondary"
                onClick={() => {
                  handleClose4()
                }}
                >Cancel</Button>
              </div>
            </Container>
          </DIV3>
          <DIV4>
          </DIV4>
          <DIV3>
          <div>
           <div style={{ width: '23.5rem' ,marginLeft:'4rem'}}>
              <label style={{ marginTop: '10%' }}>Net Total </label>
              <input
              readOnly='readOnly'
                type='number'
                value={invoiceTotalAmount}
               class='form-control' />
            </div>
            <div style={{marginLeft:'4rem'}}>
            <label>Discount</label>
            <CardGroup>
            <div style={{ width: '11.75rem' }}>
            <input
              type='number'
              value={InvoicesHeaderData && InvoicesHeaderData.DiscountPercent }
              class='form-control'
              name='TaxAmount(LC)'
            />
            </div>
            <div  style={{ width: '11.75rem' }}>
            <input
              type='number'
              class='form-control'
              name='TaxAmount(LC)'
              value={InvoicesHeaderData && InvoicesHeaderData.TotalDiscountSC  }
            />
            </div>
            </CardGroup>
            </div>
          </div>
          <div style={{marginLeft:'4rem'}}>
              <label>DPM</label>
              <CardGroup>
              <div style={{width:'11.75rem'}}>
              <input
                type='number'
                name='DPM%'
                class='form-control'
                value={InvoicesHeaderData&&InvoicesHeaderData.DownPaymentPercentage}
              />
              </div>
              <div style={{width:'11.75rem'}}>
              <input
                type='number'
                name='DPMPKR'
                class='form-control'
                value={InvoicesHeaderData&&InvoicesHeaderData.DownPaymentAmountSC}
              />
              </div>
              </CardGroup>
            </div>
          <div style={{width:'23.5rem',marginLeft:'4rem'}}>
          <label>Tax</label>
          <input
            type='number'
            class='form-control'
            value={InvoicesHeaderData&&InvoicesHeaderData.VatSumSys}
            name='TaxAmount(LC)'
          />
          </div>
           <div style={{width:'23.5rem',marginLeft:'4rem'}}>
            <label>Total Payment Due:</label>
            <input type='text' value={InvoicesHeaderData&&InvoicesHeaderData.DocTotal} placeholder='' class='form-control' />
            </div>
            <div style={{width:'23.5rem',marginLeft:'4rem'}}>
            <label>Blanace Due:</label>
            <input type='text' value={InvoicesHeaderData&&InvoicesHeaderData.DocTotalSys}  placeholder='' class='form-control' />
            </div>
        </DIV3>
        </CardGroup>
      </Form>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
              {/* --------------------End Invoices Modal------------------ */}
            <br />
          </Container>
        </DIV5>
      </CardGroup>
      <Tabs
        defaultActiveKey='Contents'
        transition={false}
        id='noanim-tab-example'
      >
        <Tab eventKey='Contents' title='Contents'>
        {AccountselectedItems && (
                      <Table responsive>
                      {Array.isArray(AccountselectedItems) &&
                AccountselectedItems.length > 0 ? (
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>G/L Account</th>
                            <th>Account Name</th>
                            <th>Doc. Remarks</th>
                            <th>Tax Definition</th>
                            <th>Net Amount</th>
                            <th>Cost Centre</th>
                            <th>Project</th>
                          </tr>
                        </TableHead>
                ):null}
                        <tbody>
                          {AccountselectedItems.map((item, index) => (
                            <tr key={`${index}`}>
                              <TD>{index + 1}</TD>
                              <TD>{ItemsDetails[item].Code}</TD>
                              <TD>{ItemsDetails[item].Name}</TD>
                              <TD>
                                <input
                                  type='text'
                                  name='Remarks'
                                  class='form-control'
                                  onChange={e => {
                                    gettableinputvalues(e, item)
                                  }}
                                ></input>
                              </TD>
                              <TD>
                              <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={TaxCode}
                                  onChange={e => {
                                    DocLinesDropDownOnChange(e, item, 'Tax_Definition')
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                              <TD>
                                {' '}
                                <input
                                  type='number'
                                  name='Net_Amount'
                                  class='form-control'
                                  onChange={e => {
                                    setAccountinvoiceTotalAmount(
                                     e.target.value
                                    )
                                    gettableinputvalues(e, item)
                                  }}
                                ></input>
                              </TD>
                              <TD>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={costingCodeDropDown}
                                  onChange={e => {
                                    DocLinesDropDownOnChange(e, item, 'CostCentre')
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                              <TD>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={projectsDropDown}
                                  onChange={e => {
                                    DocLinesDropDownOnChange(e, item, 'Project')
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                              {/* <TD>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={BanksDropdowon}
                                  onChange={e => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      item,
                                      'BankName'
                                    )
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                           
                             */}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                    {getPaymentAccountsdata && (
                      <Table responsive>
                      {Array.isArray(getPaymentAccountsdata) &&
                getPaymentAccountsdata.length > 0 ? (
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>G/L Account</th>
                            <th>Account Name</th>
                            <th>Doc. Remarks</th>
                            <th>Tax Definition</th>
                            <th>Net Amount</th>
                            <th>Cost Centre</th>
                            <th>Project</th>
                          </tr>
                        </TableHead>
                        ) : null}
                        <tbody>
                          {getPaymentAccountsdata.map((item, index) => (
                            <tr key={`${index}`}>
                              <TD>{index + 1}</TD>
                              <TD>{item.AccountCode}</TD>
                              <TD>{item.AccountName}</TD>
                              <TD> {item.Decription}</TD>
                              <TD> {item.VatGroup}</TD>
                              <TD> {item.SumPaid}</TD>
                              <TD> {item.ProfitCenter} </TD>
                              <TD> {item.ProjectCode}</TD>
                              {/* <TD>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={BanksDropdowon}
                                  onChange={e => {
                                    DocLinesDropDownOnChange(
                                      e,
                                      item,
                                      'BankName'
                                    )
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                           
                             */}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
          {PrRe && (
            <Table responsive>
            {Array.isArray(PrRe) &&
                PrRe.length > 0 ? (
              <TableHead>
                <tr>
                  <th>Selected</th>
                  <th>Document No.</th>
                  <th>Document Type</th>
                  <th> Date</th>
                  <th>Doc. Remarks</th>
                  <th>Total</th>
                  <th>WTax Amount</th>
                  <th>Total Payment</th>
                </tr>
              </TableHead>
              ) : null}
              <tbody>
                {PrRe.map((item, index) => (
                  <tr key={`${index}`}>
                    <TD>
                      <input
                        type='checkbox'
                        onChange={() => {
                          checkboxSelect(item, index)
                        }}
                        checked={item.isSelected}
                      />
                    </TD>
                    <TD>{item.DocNum||item.TransId}</TD>
                    <TD>
                    {/* {item.InvoiceType === 'it_Invoice' ? (
                               
                               "IN"
                           ) : item.InvoiceType === 'it_Receipt' ? (
                           
                               "JE"
                           ): item.InvoiceType === 'it_OpeningBalance' ? (
                            
                              "OB"
                           ) : null} */}
                    {item.DownPaymentType === 'dptInvoice' ? "IN" : item.TransType === "-2" ? "OB" : "JE"}
                   </TD>
                    <TD>{item.DocDate || item.DueDate}</TD>
                    <TD>{item.Comments}</TD>
                    <TD>{item.DocTotal||item.Debit-item.Credit}</TD>
                    <TD>{item.WTAmount|| 0 }</TD>
                    <TD>
                    <input
                    type='text'
                    name='TotalPayment'
                    defaultValue={item.DocTotal - item.PaidToDate || item.BalDueDeb - item.BalDueCred}
                    onChange={e=>{getDoctotalvalues(e,index)}}
                    class='form-control'
                  />
                  </TD>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {SearchDocumentLines && (
            <Table responsive>
            {Array.isArray(SearchDocumentLines) &&
                SearchDocumentLines.length > 0 ? (
              <TableHead>
                <tr>
                  <th>Selected</th>
                  <th>Document No.</th>
                  <th>Document Type</th>
                  <th> Date</th>
                  <th>Doc. Remarks</th>
                  <th>Total Payment</th>
                  <th>WTax Amount</th>
                </tr>
              </TableHead>
              ) : null}
              <tbody>
                {SearchDocumentLines.map((item, index) => (
                  <tr key={`${index}`}>
                    <TD>
                      <input
                        type='checkbox'
                        onChange={() => {
                          checkboxSelect(item, index)
                        }}
                        checked
                      />
                    </TD>
                    <TD>
                    <a
                  style={{ marginRight:'3%',cursor: 'pointer' }}
                  onClick={() => ObjectTypePaymentInvoices(item.DocEntry,item.InvoiceType)}
                >
                  {' '}
                  <GrDocumentPerformance />
                </a>
                    {item.DocNum ? item.DocNum : item.DocEntry }</TD>
                    <TD>
                    {item.InvoiceType === 'it_Invoice' ? (
                               
                                  "IN"
                              ) : item.InvoiceType === 'it_Receipt' ? (
                              
                                  "JE"
                              ): item.InvoiceType === 'it_OpeningBalance' ? (
                               
                                 "OB"
                              ) : null}
                   </TD>
                    <TD>{item.PostingDate}</TD>
                    <TD>{item.Remarks}</TD>
                    <TD>{item.SumApplied}</TD>
                    <TD>{item.WTAmount||0}</TD>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        <Tab eventKey='Attachment' title='Attachment'>
          <Attachment setattachmentresponse={setattachmentresponse} />
        </Tab>
        <Tab eventKey='Payment Means' title='Payment Means'>
          <br />
          <br />
          <br />
             {/* --------------------Start Payment Means Modal------------------ */}
          <Button onClick={Paymentmeansfunction}>Payment Means</Button>
          <Modal
            show={show3}
            onHide={handleClose3}
            className='Modal-big'
            size='lg'
          >
            <Modal.Header closeButton>
              <Modal.Title>Payment Means</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <div style={{ width: '23.5rem', height: 'auto' }}>
                  <label>Currency</label>
                  <input
                    type='text'
                    name='Currency'
                    readOnly
                    defaultValue={'PKR'||getPaymentchecksdata&&getPaymentchecksdata.Currency}
                    class='form-control'
                  ></input>
                </div>
                <br />
              </Container>
              <Container fluid>
                <Tabs
                  defaultActiveKey={getdefaulttabname }
                  transition={false}
                  id='noanim-tab-example'
                >
                  <Tab disabled={getchequetab} eventKey='Cheque' title='Cheque'>
                    <div style={{ width: '22rem', height: 'auto' }}>
                      <label>G/L Account</label>
                      <Select
                        isMulti
                    placeholder={getPaymentchecksdata&&getPaymentchecksdata.CheckAccount || HeaderData&&HeaderData.CheckAccount}
                        options={ItemsDropDown}
                        onChange={ItemsDropDownfunc}
                        displayValue='name'
                      />
                    </div>
                    {selectedItems && (
                      <Table responsive>
                      {Array.isArray(selectedItems) &&
                selectedItems.length > 0 ? (
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Due Date</th>
                            <th>Amount</th>
                            <th>Country</th>
                            <th>Bank Name</th>
                            <th>Bank Branch</th>
                            <th>Account</th>
                          </tr>
                        </TableHead>
                        ) : null}
                        <tbody>
                          {selectedItems.map((item, index) => (
                            <tr key={`${index}`}>
                              <TD>{index + 1}</TD>
                              <TD>
                                <input
                                  type='date'
                                  name='PostingDate'
                                  class='form-control'
                                  onChange={e => {
                                    gettableinputvalues(e, item)
                                  }}
                                ></input>
                              </TD>
                              <TD>
                                {' '}
                                <input
                                  type='number'
                                  name='CheckAmount'
                                  class='form-control'
                                  onChange={e => {
                                    setgetduebalance(
                                      Number(TotalAmountDue) -
                                        Number(TotalWTaxAmount) +
                                        Number(getpaymentonAccount) -
                                        Number(e.target.value)
                                    )
                                    gettableinputvalues(e, item)
                                    setgetcheckamount(e.target.value)
                                  }}
                                ></input>
                              </TD>
                              <TD>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={CountryDropdowon}
                                  onChange={e => {
                                    DocLinesDropDownOnChange44(e, item, 'Country')
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                              <TD>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={BanksDropdowon}
                                  onChange={e => {
                                    
                                    getaccountnofromapi(e.value)
                                    DocLinesDropDownOnChange44(
                                      e,
                                      item,
                                      'BankName'
                                    )
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                              <TD>
                              {' '}
                              <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={BanksBranchDropdowon}
                                  onChange={e=>{setgetbranchaccount(e.value)}}
                                  displayValue='name'
                                />
                              </TD>
                             
                              <TD>
                                {' '}
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder='Select'
                                  options={BanksAccountDropdowon}
                                  onChange={e=>{setgetcheckAccountNo(e.value)}}
                                  displayValue='name'
                                />
                              </TD>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                    {getPaymentchecksdata && (
                      <Table responsive>
                      {Array.isArray(getPaymentchecksdata) &&
                getPaymentchecksdata.length > 0 ? (
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Due Date</th>
                            <th>Amount</th>
                            <th>Country</th>
                            <th>Bank Name</th>
                            <th>Account</th>
                          </tr>
                        </TableHead>
                        ) : null}
                        <tbody>
                          {getPaymentchecksdata.map((item, index) => (
                            <tr key={`${index}`}>
                              <TD>{index + 1}</TD>
                              <TD>
                                <input
                                  type='date'
                                  name='PostingDate'
                                  readOnly
                                  defaultValue={item.DueDate}
                                  class='form-control'
                                  onChange={e => {
                                    gettableinputvalues(e, item)
                                  }}
                                ></input>
                              </TD>
                              <TD>
                                {' '}
                                <input
                                  type='number'
                                  name='Amount'
                                  readOnly
                                  defaultValue={item.CheckSum}
                                  class='form-control'
                                  onChange={e => {
                                    setgetduebalance(
                                      Number(TotalAmountDue) -
                                        Number(TotalWTaxAmount) +
                                        Number(getpaymentonAccount) -
                                        Number(e.target.value)
                                    )
                                    gettableinputvalues(e, item)
                                  }}
                                ></input>
                              </TD>
                              <TD>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder={item.CountryCode}
                                  options={CountryDropdowon}
                                  onChange={e => {
                                    DocLinesDropDownOnChange(e, item, 'Country')
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                              <TD>
                                <Select
                              menuPortalTarget={document.body}
                                  placeholder={item.BankCode}
                                  options={BanksDropdowon}
                                  onChange={e => {
                                    getaccountnofromapi(e.value)
                                    DocLinesDropDownOnChange(
                                      e,
                                      item,
                                      'BankName'
                                    )
                                  }}
                                  displayValue='name'
                                />
                              </TD>
                            
                              <TD>
                                {' '}
                                <input
                                  type='number'
                                  name='Account'
                                  readOnly
                                  defaultValue={item.AccounttNum}
                                  class='form-control'
                                  onChange={e => {
                                    gettableinputvalues(e, item)
                                  }}
                                ></input>
                              </TD>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Tab>
                  <Tab  disabled={gettransfertab} eventKey='BankTransfer' title='Bank Transfer'>
                    <CardGroup>
                      <DIV3>
                        <Container fluid>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>G/L Account</label>
                            <Select
                    placeholder={getPaymentchecksdata&&getPaymentchecksdata.CheckAccount || HeaderData&&HeaderData.TransferAccount}
                              options={ItemsDropDown}
                              onChange={e=>{setgetTransferAccount(e.value)}}
                              displayValue='name'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Transfer Date</label>
                            <input
                              name={'TransferDate'}
                              type='date'
                              onChange={e=>{setgetTransferDate(e.target.value)}}
                              class='form-control'
                              defaultValue={getPaymentchecksdata&&getPaymentchecksdata.DueDate || HeaderData&&HeaderData.TransferDate}
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Reference</label>
                            <input
                              name={'Reference'}
                              onChange={e=>{setgetReference(e.target.value)}}
                              type='text'
                              class='form-control'
                              defaultValue={ HeaderData&&HeaderData.TransferReference}
                            />
                          </div>
                        </Container>
                      </DIV3>
                      <DIV4></DIV4>
                      <DIV3>
                        <Container fluid>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Total</label>
                            <input
                              name={'TransferTotal'}
                              type='text'
                              class='form-control'
                              defaultValue={HeaderData&&HeaderData.TransferSum}
                              onChange={e => {
                                setgettransfertotal(e.target.value)
                                setgetduebalance(
                                  Number(getduebalance) - Number(e.target.value)
                                )
                              }}
                            />
                          </div>
                        </Container>
                      </DIV3>
                    </CardGroup>
                  </Tab>
                  <Tab disabled={getcredittab}  eventKey='CreditCard' title='Credit Card'>
                    <CardGroup>
                      <DIV3>
                        <Container fluid>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Credit Card Name</label>
                            <Select
                              isMulti
                              placeholder='Select'
                              options={ItemsDropDown}
                              onChange={ItemsDropDownfunc}
                              displayValue='name'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>G/L Account</label>
                            <Select
                              isMulti
                    placeholder={getPaymentchecksdata&&getPaymentchecksdata.CheckAccount}
                              options={ItemsDropDown}
                              onChange={ItemsDropDownfunc}
                              displayValue='name'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Credit Card No.</label>
                            <input
                              name={'TransferDate'}
                              type='date'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Valid Until</label>
                            <input
                              name={'validUntil'}
                              type='date'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>ID No.</label>
                            <input
                              name={'TransferDate'}
                              type='number'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Telephone No.</label>
                            <input
                              name={'TransferDate'}
                              type='number'
                              class='form-control'
                              defaultValue='+92'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Payment Method</label>
                            <input
                              name={'TransferDate'}
                              type='text'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Amount Due</label>
                            <input
                              name={'TransferDate'}
                              type='text'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>No. of Payments</label>
                            <input
                              name={'TransferDate'}
                              type='text'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>First Partial Payment</label>
                            <input
                              name={'TransferDate'}
                              type='text'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Each Add. Payment</label>
                            <input
                              name={'TransferDate'}
                              type='text'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Voucher No.</label>
                            <input
                              name={'TransferDate'}
                              type='text'
                              class='form-control'
                            />
                          </div>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Transaction Type</label>
                            <input
                              name={'TransferDate'}
                              type='text'
                              class='form-control'
                              readOnly
                              defaultValue='Regular'
                            />
                          </div>
                        </Container>
                      </DIV3>
                      <DIV4></DIV4>
                      <DIV3>
                        <label>Vouchers</label>
                        {
                          <Table responsive>
                            <TableHead>
                              <tr>
                                <th>#</th>
                                <th>Define New</th>
                              </tr>
                            </TableHead>
                            <tbody>
                              {selectedItems &&
                                selectedItems.map((item, index) => (
                                  <tr key={`${index}`}>
                                    <TD>{index + 1}</TD>
                                    <TD>
                                      <input
                                        type='text'
                                        name='PostingDate'
                    defaultValue={getPaymentchecksdata&&getPaymentchecksdata.DueDate}
                                        class='form-control'
                                      ></input>
                                    </TD>
                                    <TD>
                                      {' '}
                                      <input
                                        type='number'
                    defaultValue={getPaymentchecksdata&&getPaymentchecksdata.CheckSum}
                                        name='Amount'
                                        class='form-control'
                                      ></input>
                                    </TD>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        }
                      </DIV3>
                    </CardGroup>{' '}
                  </Tab>
                  <Tab disabled={getcashtab} eventKey='Cash' title='Cash'>
                    <CardGroup>
                      <DIV3>
                        <Container fluid>
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>G/L Account</label>
                            <Select
                    placeholder={getPaymentchecksdata&&getPaymentchecksdata.CheckAccount || HeaderData&&HeaderData.CashAccount}
                              options={ItemsDropDown}
                              onChange={e=>{setgetcashaccount(e.value)}}
                              displayValue='name'
                            />
                          </div>
                        </Container>
                      </DIV3>
                      <DIV4></DIV4>
                      <DIV3>
                        <Container fluid>
                          <br />
                          <br />
                          <div style={{ width: '22rem', height: 'auto' }}>
                            <label>Total</label>
                            <input
                              name={'CashTotal'}
                              type='text'
                              class='form-control'
                              defaultValue={HeaderData&&HeaderData.CashSum}
                              onChange={e => {
                                setgetcashtotal(e.target.value)
                                setgetduebalance(
                                  Number(getduebalance) - Number(e.target.value)
                                )
                              }}
                            />
                          </div>
                        </Container>
                      </DIV3>
                    </CardGroup>
                  </Tab>
                </Tabs>
              </Container>
              <CardGroup>
                <DIV3>
                  <Container fluid>
                    <br />
                    <br />
                    <br />
                    <div style={{ width: '23.5rem', height: 'auto' }}>
                      <label>Overall Amount</label>
                      <input
                        name='Journal_Remarks'
                        class='form-control'
                        readOnly
                        type='number'
                        defaultValue={HeaderData&&HeaderData.CashSum}
                        value={Number(AccountinvoiceTotalAmount) + Number(Number(AccountinvoiceTotalAmount) * Number(TotalWTaxAmount)/100)||( Number(TotalAmountDue) - Number(TotalWTaxAmount) + Number(getpaymentonAccount)) || (PaymentInvoicesTotalAmountDue + getpaymentonAccount) }
                      />
                    </div>
                    <div style={{ width: '23.5rem', height: 'auto' }}>
                      <label>Balance Due</label>
                      <input
                        name='BalanceDue'
                        class='form-control'
                        readOnly
                        type='number'
                        value={HeaderData&&HeaderData.DocNum ? "" : (( Number(TotalAmountDue) - Number(TotalWTaxAmount) + Number(getpaymentonAccount)) - (Number(gettransfertotal) + Number(getcheckamount) +Number(getcashtotal)) ) + Number(getbankcharge)}
                        // value={(( Number(TotalAmountDue) - Number(TotalWTaxAmount) + Number(getpaymentonAccount)) - (Number(gettransfertotal) + Number(getcheckamount) +Number(getcashtotal)) ) + Number(getbankcharge) || (Number(AccountinvoiceTotalAmount) + Number(Number(AccountinvoiceTotalAmount) * Number(TotalWTaxAmount)/100) - (Number(gettransfertotal) + Number(getcheckamount) +Number(getcashtotal)) )}
                      />
                    </div>
                    <div style={{ width: '23.5rem', height: 'auto' }}>
                      <label>Bank Charge</label>
                      <input
                        name='BankCharge'
                        onChange={e => {
                          setgetbankcharge(e.target.value)
                        }}
                        type='number'
                        class='form-control'
                      />
                    </div>
                    <br />
                  </Container>
                </DIV3>
                <DIV4></DIV4>
                <DIV3>
                  <Container fluid>
                    <br />
                    <br />
                    <br /> <br />
                    <br />
                    <br /> <br />
                    <br />
                    <br />
                    <div
                      style={{
                        width: '23.5rem',
                        height: 'auto',
                        marginLeft: '3rem'
                      }}
                    >
                      <label>Paid</label>
                      <input
                        type='Number'
                        name='Paid'
                        readOnly
                        class='form-control'
                        defaultValue={HeaderData&&HeaderData.CashSum}
                        value={(Number(gettransfertotal) + Number(getcheckamount) + Number(getcashtotal)) - Number(getbankcharge) || (PaymentInvoicesTotalAmountDue + getpaymentonAccount)}
                      ></input>
                    </div>
                  </Container>
                </DIV3>
              </CardGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose3}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
             {/* --------------------End Payment Means Modal------------------ */}
        </Tab>
      </Tabs>
      <CardGroup>
        <DIV3>
          <br />
          <br />
          <br /> <br />
          <br />
          <br />
          <Container fluid>
            <div
              class='form-group'
              style={{ width: '23.5rem', height: 'auto' }}
            >
              <label for='exampleFormControlTextarea1'>Remarks</label>
              <textarea
                class='form-control rounded-0'
                name='Remarks'
                onChange={e => {
                  getinputvalues(e)
                }}
                id='exampleFormControlTextarea1'
                rows='3'
                defaultValue={HeaderData && HeaderData.Remarks}
              ></textarea>
            </div>
            <label>Journal Remark</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                name='Journal_Remarks'
                 class='form-control'
                onChange={e => {
                  getinputvalues(e)
                }}
                type='text'
                defaultValue={HeaderData && HeaderData.JournalRemarks}
              />
            </div>
            <br />
            <br />
            <div style={{ marginLeft: '2rem' }}>
              <Button
                style={{ marginLeft: '5%' }}
                type='reset'
                onClick={() => {
                  Submit_PatchFunc()
                }}
              >
                {ButtonName}
              </Button>
              <Button
                style={{ marginLeft: '3%' }}
                onClick={() => {
                  window.location.href = '/Home'
                }}
                type='reset'
              >
                Cancel
              </Button>
            </div>
          </Container>
        </DIV3>
        <DIV4></DIV4>
       {getdoctype==='rAccount'?(
          <>
          <DIV3>
           <br />
           <br />
           <br /> <br />
           <br />
           <br />
           <div>
             <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
               <label style={{ marginTop: '10%' }}>Net Total</label>
               <input
                 type='number'
                 readOnly
                 value={AccountinvoiceTotalAmount}
                 placeholder=''
                 class='form-control'
               />
             </div>
             <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
               <label>Tax Amount</label>
               <input
                 type='number'
                 name='Discount%'
                 value={Number(AccountinvoiceTotalAmount) * Number(TotalWTaxAmount)/100}
                 class='form-control'
                 readOnly
               />
             </div>
           </div>
           <div style={{ marginLeft: '2rem' }}>
             <label style={{ marginLeft: '2rem' }}>Total Amount Due</label>
             <CardGroup>
               <a
                 style={{ cursor: 'pointer' }}
                 onClick={() => Paymentmeansfunction()}
               >
                 {' '}
                 <MdPayment />
               </a>
               <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                 <input
                   class='form-control'
                   readOnly='readOnly'
                   // SumApplied
                   value={Number(AccountinvoiceTotalAmount) + Number(Number(AccountinvoiceTotalAmount) * Number(TotalWTaxAmount)/100)}
                  //  value={
                  //   ( Number(TotalAmountDue) - Number(TotalWTaxAmount) + Number(getpaymentonAccount) ) || PaymentInvoicesTotalAmountDue || invoiceTotalAmount
                  //  }
                 />
               </div>
             </CardGroup>
           </div>
           <div style={{ width: '23.5rem', marginLeft: '4rem' }}></div>
           <br />
           {/* <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
             <label>Open Balance</label>
             <input
               type='number'
               readOnly
               class='form-control'
               name='TaxAmount(LC)'
             />
           </div> */}
         </DIV3>
         </>
       ): 
       (
         <>
         <DIV3>
          <br />
          <br />
          <br /> <br />
          <br />
          <br />
          <div>
            <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
              <input
                type='checkbox'
                id='chkPassport'
                onChange={disabledinput}
                checked={checkboxchanger}
              />
              <label style={{ marginTop: '10%' }}>Payment on Account</label>
              <input
                type='number'
                readOnly={statuschange}
                value={getpaymentonAccount}
                onChange={e => {
                  setgetpaymentonAccount(e.target.value)
                }}
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
              <label>WTax Amount</label>
              <input
                type='number'
                name='Discount%'
                class='form-control'
                readOnly
              />
            </div>
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <label style={{ marginLeft: '2rem' }}>Total Amount Due</label>
            <CardGroup>
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => Paymentmeansfunction()}
              >
                {' '}
                <MdPayment />
              </a>
              <div style={{ width: '23.5rem', marginLeft: '1rem' }}>
                <input
                  class='form-control'
                  readOnly='readOnly'
                  // SumApplied
                  // defaultValue={AccountinvoiceTotalAmount}
                  value={
                   ( Number(TotalAmountDue) - Number(TotalWTaxAmount) + Number(getpaymentonAccount) ) || PaymentInvoicesTotalAmountDue + getpaymentonAccount || invoiceTotalAmount
                  }
                />
              </div>
            </CardGroup>
          </div>
          <div style={{ width: '23.5rem', marginLeft: '4rem' }}></div>
          <br />
          <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
            <label>Open Balance</label>
            <input
              type='number'
              readOnly
              class='form-control'
              name='TaxAmount(LC)'
            />
          </div>
        </DIV3>
        </>)}
      </CardGroup>
    </>
  )
}
