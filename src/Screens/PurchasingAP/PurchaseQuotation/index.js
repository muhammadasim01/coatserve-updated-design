import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown'
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Modal,
  Tabs,
  Tab,
  Form
} from 'react-bootstrap'
import { Logistics, Accounting } from '../../../Component/PurchaseQuotation'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Attachment } from '../../../Component/APDownPaymentRequest'
import { useAlert } from 'react-alert'
import { ArrowRight, Filter, MenuUp } from 'react-bootstrap-icons'
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles'
import { Backdrop } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Navbar } from '../../../Component/Global'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import MaterialTable from 'material-table'
import XLSX from 'xlsx'
import './index.css'
import Switch from 'react-switch'
const axios = require('axios')
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))
export default function PurchaseRequest () {
  const alert = useAlert()
  const classes = useStyles()
  const [show, setShow] = React.useState(false)
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [showA, setShowA] = React.useState(false)

  const [getdocumentstatus, setgetdocumentstatus]=React.useState()
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [TotalLC, setTotalLC] = React.useState()
  const [PQFindDocumentLines, setPQFindDocumentLines] = React.useState()
  const [SelectedOwner, setSelectedOwner] = React.useState()
  const [OwnerDropdown, setOwnerDropdown] = React.useState()
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState()
  const [getdocumentname, setgetdocumentname] = React.useState("PQT2");
  const [ModuleName, setModuleName] = React.useState("PurchaseQuotations")
  const [getdocumenttype, setgetdocumenttype] = React.useState("540000006")
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [PRDocumentLines, setPRDocumentLines] = React.useState()
   const [ButtonName, setButtonName] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [getStatus, setgetStatus] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [update, setUpdate] = React.useState(1)
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [ReqDate, setReqDate] = React.useState()
  const [TaxDate, setTaxDate] = React.useState()
  const [DocDate, setDocDate] = React.useState()
  const [ShipDate, setShipDate] = React.useState()
  const [DocDueDate, setDocDueDate] = React.useState()
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [SelectedCP, setSelectedCP] = React.useState()
  const [SelectedVendor, setSelectedVendor] = React.useState()
  const [PrProject, setPrProject] = React.useState()
  const [PrCost, setPrCost] = React.useState()
  const [FreightValue, setFreightValue] = React.useState()
  const [Frieght, setFrieght] = React.useState()
  const [PrBuyer, setPrBuyer] = React.useState()
  const [PrOwner, setPrOwner] = React.useState()
  const [PrWhse, setPrWhse] = React.useState()
  const [TodayDate, setTodayDate] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [OwnerPrRe, setOwnerPrRe] = React.useState()
  const [Disply, setDisply] = React.useState(false)
  const [bothbodies, setbothbodies] = React.useState(false)
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState()
  const [CPDropdown, setCPDropdown] = React.useState()
  const [GroupNoDropdown, setGroupNoDropdown] = React.useState()
  const [Pq, setPq] = React.useState()
  const [CP, setCP] = React.useState()
  const [GN, setGN] = React.useState()
  const [Price, setPrice] = React.useState()
  const [Discount, setDiscount] = React.useState()


  //Component Hooks---
  const [getAddress, setgetAddress] = React.useState()
  const [getAddress2, setgetAddress2] = React.useState()
  const [getTransportationCode, setgetTransportationCode] = React.useState()
  const [getGroupNumber, setgetGroupNumber] = React.useState()
  const [getJournalMemo, setgetJournalMemo] = React.useState()
  const [getProject, setgetProject] = React.useState()
  const [getCancelDate, setgetCancelDate] = React.useState()

  const [modalTwo, setModalTwo] = React.useState()
  const handleCloseee = () => setModalTwo(false)
  const handleShowModalTwo = () => {
    setModalTwo('modal-two')
  }

  const [Tax, setTax] = React.useState()
  const [total, setTotal] = React.useState()
  const [TotalGross, setTotalGross] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()
  const [BottomTax, setBottomTax] = React.useState()
  const [BottomDiscount, setBottomDiscount] = React.useState()
  const [TotalPayment, setTotalPayment] = React.useState()
  const [DiscountTotal, setDiscountTotal] = React.useState()
  const [TaxCode, setTaxCode] = React.useState()
  const [disc, setdisc] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )



const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState()
  const [totalFreight, setTotalFreight] = React.useState()
  const [TotalFreightLC, setTotalFreightLC] = React.useState()
  const [GrossPriceAfterDisc, setGrossPriceAfterDisc] = React.useState()
  const [OpenQty, setOpenQty] = React.useState()
  const [TotalTaxRate, setTotalTaxRate] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [ShippingTypesLogistics, setShippingTypesLogistics] = React.useState()
  const [Shippingtypes, setShippingtypes] = React.useState()
  const [IndicatorAccounting, setIndicatorAccounting] = React.useState()
  const [FinalDocumentLines, setFinalDocumentLines] = React.useState()
  const [PaymentTermsAccounting, setPaymentTermsAccounting] = React.useState()
  const [JournalRemarkAccounting, setJournalRemarkAccounting] = React.useState()

  
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()

  
  const [colDefs, setColDefs] = React.useState()
  const [data, setData] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  }
  React.useEffect(() => {
    setTestGetInstallationNumber('0020545074')
    setLiveGetInstallationNumber2('0021105591')
    // GetInstallationNumberFunc()
  })
  React.useEffect(async () => {
    today()
    compareDate()
    
    setgetdocumentname("PQT2")
    setModuleName("PurchaseQuotations")
    setgetdocumenttype("540000006")
    let cook = await localStorage.getItem('cookie')
    const show = await localStorage.getItem('ShowBranches')
    if (showA == 'true') {
      setShowA(true)
      // setShow1(true)
      compareDate()
      await localStorage.removeItem('ShowBranches')
    }
    if (cook) 
    Project(cook)
    CostCentre(cook)
    Buyer(cook)
    Owner(cook)
    // Whse(cook)
    OwnerPurchaseRequest(cook)
    GroupNo(cook)
    BusinessPartners(cook)
    Frieght1(cook)
    TableTaxCode(cook)
    setButtonName('Add')
    setSearchNumber('0')
  }, [])

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)

    });
    return rows
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
  const TableTaxCode = async (cook) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
  
    let SAPApi = `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcInputTax' `
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
  const BusinessPartners = async (cook) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
   
    const api = `${LINKS.api}/GetApi`
    let SAPapi = LINKS.sap.MasterData.ActiveVendor
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cook
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardCode + ' : ' + element.CardName
            })
          })
          setVendorCodeDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const ContactPerson = async () => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')

    // let SAPapi = `sml.svc/ACTIVECONTACTPERSON?$filter=CardCode eq '${SelectedVendor}' &$orderby=CntctCode`
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq  '${SelectedVendor}'`

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
              value: element.ContactPerson,
              label: element.ContactPerson 
            })
          })
          setCPDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const GroupNo = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.GroupNumber, cookie: cookie }
      )
      .then(function (res) {
        setGN(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.GroupNumber,
              label: element.GroupNumber
            })
          })
          setGroupNoDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const OwnerhandleClose = () => setDisply(false)
  const OwnerhandleShow = () => setDisply(true)

  const Project = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveProjects,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Code + ' : ' + element.Name
            })
          })
          setPrProject(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const CostCentre = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveCostingCode,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CenterCode,
              label: element.CenterCode + ' : ' + element.CenterName
            })
          })
          setPrCost(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Frieght1 = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.Freight,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Name,
              label: element.Name,
              item:element.RevenuesAccount
            })
          })
          setFrieght(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Buyer = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.salesEmployee,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.SalesEmployeeCode,
              label:
                element.SalesEmployeeCode + ' : ' + element.SalesEmployeeName
            })
          })
          setPrBuyer(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Owner = async () => {
    let ItemsResponseResult = {}
    // -------------------------    Items API GET DATA   ------------------------------------------------------

    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = LINKS.sap.MasterData.ActiveEmplyeeInfo

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
              value: element.EmployeeID,
              label: element.EmployeeID + ' : ' + element.FirstName
            })
          })
          setOwnerDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Whse = async (name) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let cook = await localStorage.getItem('cookie')
    let SAPApi = `Warehouses?$select=WarehouseCode,GlobalLocationNumber,WarehouseName&$filter=(GlobalLocationNumber eq '${name}' or GlobalLocationNumber eq null) &$orderby=WarehouseCode `
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
              value: element.WarehouseCode,
              label: element.WarehouseCode + ' : ' + element.WarehouseName
            })
          })
          setPrWhse(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const NumAtCardFun = e => {
    let prBody = PRBody
    prBody[e.target.name] = e.target.value
    setPRBody(prBody)
  }
  const CommentsFun = e => {
    let prBody = PRBody
    prBody[e.target.name] = e.target.value
    setPRBody(prBody)
  }
  const requireDateChange = async e => {
    setReqDate(e.target.value)
  }
  const DocDateChange = async e => {
    setDocDate(e.target.value)
  }
  const DocDueDateChange = async e => {
    setDocDueDate(e.target.value)
  }
  const TaxDateChange = async e => {
    setTaxDate(e.target.value)
  }
  const ShipDateChange = (e, index, PrReIndex) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index]['ShipDate'] = e.target.value
    setShipDate(itemDetail)
  }
  const SearchShipDateChange = (e, index) => {
    let itemDetail = SearchDocumentLines
    itemDetail[index]['ShipDate'] = e.target.value
    setSearchDocumentLines(itemDetail)
  }
  const OwnerPurchaseRequest = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.emplyeeInfo,
        cookie: cookie
      })
      .then(function (res) {
        setOwnerPrRe(res.data.value)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const ontextChanged = (e, index, PQIndex) => {
    let itemDetail = PQDocumentLines
    itemDetail[PQIndex].DocumentLines[index][e.target.name] = e.target.value
    setPQDocumentLines(itemDetail)
  }
  const SearchontextChanged = (e, index) => {
    let itemDetail = SearchDocumentLines
    itemDetail[index][e.target.name] = e.target.value
    setSearchDocumentLines(itemDetail)
  }
  const onFreightChanged = (e, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index]['FreightLC'] = e.target.value
    PQDocumentLines[PrReIndex][`ùpdate${update+1}`]= update+1;
    setUpdate(update+1);
    setPQDocumentLines(itemDetail)
let sum1=0
    PQDocumentLines.forEach(element => {
      if (element.isSelected) {
        element.DocumentLines.forEach(item => {
          if (item.isSelected && item.LineStatus === 'bost_Open') {
            sum1 = Number(sum1) + Number(item.FreightLC)
          }
          setTotalFreight(sum1)
        })
      }
    })
  }
  const SearchonFreightChanged = (e, index, name) => {
    let itemDetail = SearchDocumentLines
    itemDetail[index]['FreightLC'] = e.target.value
    setSearchDocumentLines(itemDetail)
    let sum = 0
    SearchDocumentLines.forEach(element => {
      sum = sum + element.FreightLC
    })
    setTotalFreight(sum)
  }
  const handleClose = () => {
    setShow(false)
  }
  const PurchaseRequest = async () => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `PurchaseRequests?$filter=DocumentStatus eq 'bost_Open' &$orderby=DocNum asc`

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setPrRe(res.data.value)
      })
      .catch({})
    setShow(true)
  }
  const selectPR = async item => {
    setShow(false)
    setPQFindDocumentLines(item)
    if(item.DocumentStatus == 'bost_Open'){
      setgetStatus("Open")
      setButtonName('Update')
   }else{
      setgetStatus("Close")
      setButtonName('Update')
   }
    let sum = 0
    let sum2 = 0
    localStorage.setItem('getDocEntry',item.DocEntry);
    item.DocumentLines.forEach(item => {
            sum = sum + item.LineTotal 
            sum2 = sum2 + item.DocumentLineAdditionalExpenses[0].LineTotal         
    })
    setTotalbforeDiscount(sum)
    setTotalFreightLC(sum2)
    if(item.DocumentStatus == 'bost_Open'){
      setgetStatus("Open")
   }else{
      setgetStatus("Close")
   }
    setSearchDocumentLines(item.DocumentLines)
  }
  const ontextItemChanged = e => {
    let obj = TextItemChangedObject
    obj[e.target.name] = e.target.value
    setTextItemChangedObject(obj)
  }
  const SearchAll_Filter_Data = async () => {
    if (SearchNumber === '0') {
      SearchPRNumberAll()
    } else {
      SearchPRNumberFilter()
    }
  }
  const SearchPRNumberAll = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let cook = await localStorage.getItem('cookie')
    if(getdocumentstatus){
      let sapAPi = `PurchaseQuotations?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum` 
      await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
      })
      .catch({})
    setShow1(true)
    }else{
      let sapAPi = `PurchaseQuotations?$orderby=DocNum` 
      await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
      })
      .catch({})
    setShow1(true)
    }
   
  }
  
  const handleClose2 = () => {
    setShow1(false)
  }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `PurchaseQuotations?$filter=DocNum eq ${SearchNumber} &$orderby=DocNum asc`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        localStorage.setItem('getDocEntry',res.data.value[0].DocEntry);
        setPQFindDocumentLines(res.data.value[0])
        if(res.data.value[0].DocumentStatus == 'bost_Open'){
          setgetStatus("Open")
       }else{
          setgetStatus("Close")
       }
        setSearchDocumentLines(res.data.value[0].DocumentLines)
        let sum = 0
        let sum2 = 0
        res.data.value[0].DocumentLines.forEach(item => {
                sum = sum + item.LineTotal    
                sum2 = sum2 + item.DocumentLineAdditionalExpenses[0].LineTotal        
        })
        setTotalbforeDiscount(sum)
        setTotalFreightLC(sum2)

        if (PQFindDocumentLines != '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const DocLinesDropDownOnChange = (selectedItem, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value
    itemDetail[PrReIndex].DocumentLines[index]['TaxRate'] =selectedItem.item.VatGroups_Lines[0].Rate

    itemDetail[PrReIndex].DocumentLines[index]['TaxTotal'] =
    (itemDetail[PrReIndex].DocumentLines[index].PriceAfterVAT *
    itemDetail[PrReIndex].DocumentLines[index].RemainingOpenQuantity *  itemDetail[PrReIndex].DocumentLines[index].TaxRate)/100 
   
    PQDocumentLines[PrReIndex][`ùpdate${update+1}`]= update+1;
    setUpdate(update+1);
     let sum1=0
      PQDocumentLines.forEach(element => {
      if (element.isSelected) {
        element.DocumentLines.forEach(item => {
          if (item.isSelected && item.LineStatus === 'bost_Open') {
            sum1 = sum1 + item.TaxTotal
          }
          setTotalTaxRate(sum1)
        })
      }
    })
    setPQDocumentLines(itemDetail)
  }
  const DocLinesDropDownOnChangeFun = (
    selectedItem,
    index,
    PrReIndex,
    name
  ) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value
    setPQDocumentLines(itemDetail)
  }
  const SearchDocLinesDropDownOnChangeFun = (selectedItem, index, name) => {
    // let taxcodeDetai=TaxCode.find(o => o.value === selectedItem.value);
    let itemDetail = SearchDocumentLines
    itemDetail[index][name] = selectedItem.value
    setSearchDocumentLines(itemDetail)
  }
  const FreightDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = PQDocumentLines
    // itemDetail[index][name] =
    itemDetail[index]['Freight'] = selectedItem.value
    setPQDocumentLines(itemDetail)
  }
  const VendorChange = e => {
    setSelectedVendor(e.value)
  }
  const CPChange = value => {
    setSelectedCP(value)
  }
  const Submit_PatchFunc = () => {
    if (ButtonName == 'Add') {
      submitPQ()
    } else if (ButtonName != 'Add') {
      submitPQPatch()
    }
  }
  const submitPQ = async () => {
    let DocLines = []
    let body = PRBody
    PQDocumentLines.forEach(element => {
      if (element.isSelected) {
        element.DocumentLines.forEach(item => {
          if (item.isSelected && item.LineStatus === 'bost_Open') {
            DocLines.push({
              BaseEntry: item.DocEntry,
              BaseType: 1470000113,
              BaseLine: item.LineNum,
              FreeText: item.FreeText,
              Quantity: item.RemainingOpenQuantity,
              ShipDate: item.ShipDate,
              DiscountPercent: item.DiscountPercent,
              Price:item.PriceAfterVAT,
              VatGroup: item.VatGroup,
              UnitPrice: item.UnitPrice,
              DistributeExpense: 'tYES',
              DocumentLineAdditionalExpenses: [
                {
                  ExpenseCode: 1,
                  LineTotal: item.FreightLC
                }
              ]
            })
            body['DocumentLines'] = DocLines
            body['CardCode'] = SelectedVendor
            body['DocDate'] = DocDate ? DocDate : currentDate
            body['DocDueDate'] = DocDueDate ? DocDueDate : currentDate
            body['ContactPersonCode'] = SelectedCP
            body['TaxDate'] = TaxDate
            body['AttachmentEntry'] = attachmentresponse
            body['DiscountPercent'] = disc || DiscountTotal            
            body['RequriedDate'] = ReqDate ? ReqDate : currentDate
            body['NumAtCard'] = PRBody.NumAtCard
            body['NumAtCard'] = totalFreight
            body['Series'] = getseriesvalue
            body['Comments'] = PRBody.Comments
            //Component posting------
            body['Address'] = getAddress
            body['Address2'] = getAddress2
            body['TransportationCode'] = getTransportationCode
            body['JournalMemo'] = getJournalMemo
            body['GroupNumber'] = getGroupNumber
            body['Project'] = getProject
            body['CancelDate'] = getCancelDate ? getCancelDate : currentDate
            // body['Indicator'] = IndicatorAccounting
          }
        })
      }
    })
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
          api: LINKS.sap.PurchaseQuotation.PostPurchaseQuotation,
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
          api: LINKS.sap.PurchaseQuotation.PostPurchaseQuotation,
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
    //  else  if (res.data !==  LiveGetInstallationNumber2 ) {
    //   if(res.data !== TestGetInstallationNumber){
    //   alert("Provided Key Does not match")
    //   window.location.href="/DisabledHomeScreen";
    //   }
    // }
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
    form.reset()
    Dropdown.reset()
  }
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `PurchaseQuotations(${id})`,
          cookie: cook
        })
        .then(function (res) {
          if (res.data.DocNum) {
            alert.success('Operation completed successfully')
          } else {
            alert.error(JSON.stringify(res.data.error.message))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const submitPQPatch = async () => {
    let DocLines = []
    let body = PRBody
    SearchDocumentLines.forEach(element => {
      DocLines.push({
        FreeText: element.FreeText,
        DiscountPercent: element.DiscountPercent,
        VatGroup: element.VatGroup,
        UnitPrice: element.UnitPrice,
        ShippingMethod: Shippingtypes,
        // TaxAmounUnitPricet: element.NetTaxAmount,
        // Frieght1 : element.Frieght,
        //     //Frieght1(LC) :
        // Total:element.LineTotal,
        // GrossTotal: element.GrossTotal,
        DistributeExpense: 'tYES',
        DocumentLineAdditionalExpenses: [
          {
            ExpenseCode: 1,
            LineTotal: element.FreightCharges
          }
        ]
      })
    })

    body['DocumentLines'] = DocLines
    body['Indicator'] = IndicatorAccounting
    body['JournalMemo'] = JournalRemarkAccounting

    body['AttachmentEntry'] = attachmentresponse
    Patch(PQFindDocumentLines.DocEntry, body)
  }
  const getPrice = async e => {
    setTotal(Price - (Price * Discount) / 100)
  }
  const getTotalPrice = async e => {
    setTotalGross(Tax + total)
  }
  const TotalPaymentDue = async e => {
    setTotalPayment(TotalLC - DiscountTotal + BottomTax)
  }
  const DiscountPercentage = async e => {
    setDiscountTotal((total * BottomDiscount) / 100)
  }
  const PriceAfterVATFun = (e, PrReIndex, index) => {
    let doclines = PQDocumentLines
    doclines[PrReIndex].DocumentLines[index]['TotalLC'] =
      doclines[PrReIndex].DocumentLines[index].PriceAfterVAT *
      doclines[PrReIndex].DocumentLines[index].RemainingOpenQuantity
   
    setPQDocumentLines(doclines)
  }
  const PriceFun = (e, index, PrReIndex) => {
    let doclines = PQDocumentLines
    doclines[PrReIndex].DocumentLines[index]['UnitPrice'] = e.target.value

    PQDocumentLines[PrReIndex].DocumentLines[index]['PriceAfterVAT'] = (PQDocumentLines[PrReIndex].DocumentLines[index].UnitPrice -
      (PQDocumentLines[PrReIndex].DocumentLines[index].UnitPrice * PQDocumentLines[PrReIndex].DocumentLines[index].DiscountPercent / 100))
       PQDocumentLines[PrReIndex].DocumentLines[index]['Total_LC']=(PQDocumentLines[PrReIndex].DocumentLines[index].PriceAfterVAT * PQDocumentLines[PrReIndex].DocumentLines[index].Quantity)
      // doclines[PrReIndex].DocumentLines[index]['PricebeforeVAT'] = e.target.value * doclines[PrReIndex].DocumentLines[index].RemainingOpenQuantity
    PQDocumentLines[PrReIndex].DocumentLines[index]['GrossPriceAfterDisc'] =
    PQDocumentLines[PrReIndex].DocumentLines[index].PriceAfterVAT +
    PQDocumentLines[PrReIndex].DocumentLines[index].GrossPrice

    PQDocumentLines[PrReIndex].DocumentLines[index]['TaxTotal'] =
    (PQDocumentLines[PrReIndex].DocumentLines[index].PriceAfterVAT *
    PQDocumentLines[PrReIndex].DocumentLines[index].RemainingOpenQuantity *  PQDocumentLines[PrReIndex].DocumentLines[index].TaxRate)/100 
     PQDocumentLines[PrReIndex][`ùpdate${update+1}`]= update+1;
   setUpdate(update+1);
    setPQDocumentLines(doclines)
  }
  const PriceFun22 = (e, index, PrReIndex) => {
   PQDocumentLines[PrReIndex].DocumentLines[index]['DiscountPercent'] = e.target.value
    PQDocumentLines[PrReIndex].DocumentLines[index]['PriceAfterVAT'] = (PQDocumentLines[PrReIndex].DocumentLines[index].UnitPrice -
      (PQDocumentLines[PrReIndex].DocumentLines[index].UnitPrice * PQDocumentLines[PrReIndex].DocumentLines[index].DiscountPercent / 100))
       PQDocumentLines[PrReIndex].DocumentLines[index]['GrossPriceAfterDisc'] =
    PQDocumentLines[PrReIndex].DocumentLines[index].PriceAfterVAT +
    PQDocumentLines[PrReIndex].DocumentLines[index].GrossPrice
    PQDocumentLines[PrReIndex].DocumentLines[index]['TaxTotal'] =
    (PQDocumentLines[PrReIndex].DocumentLines[index].PriceAfterVAT *
    PQDocumentLines[PrReIndex].DocumentLines[index].RemainingOpenQuantity *  PQDocumentLines[PrReIndex].DocumentLines[index].TaxRate)/100 
    PQDocumentLines[PrReIndex].DocumentLines[index]['Total_LC']=PQDocumentLines[PrReIndex].DocumentLines[index].PriceAfterVAT * PQDocumentLines[PrReIndex].DocumentLines[index].Quantity
   PQDocumentLines[PrReIndex][`ùpdate${update+1}`]= update+1;
   setUpdate(update+1);
    let sum = 0
    let sum1 = 0
    PQDocumentLines.forEach(element => {
      if (element.isSelected) {
        element.DocumentLines.forEach(item => {
          if (item.isSelected && item.LineStatus === 'bost_Open') {
            sum = sum + item.Total_LC
            sum1 = sum1 + item.TaxTotal
          }
          setTotalbforeDiscount(sum)
          setTotalTaxRate(sum1)
        })
      }
    })
  }
  const OpenQtyFunction = (e, index, PrReIndex) => {
    let doclines = PQDocumentLines
    const value = e.target.value
    doclines[PrReIndex].DocumentLines[index]['RemainingOpenQuantity'] = value
    setPQDocumentLines(doclines)
  }
  const SearchOpenQtyFunction = (e, index) => {
    let doclines = SearchDocumentLines
    const value = e.target.value
    doclines[index]['RemainingOpenQuantity'] = value
    setSearchDocumentLines(doclines)
  }
  React.useEffect(() => {
  }, [PQDocumentLines])
  const Home = () => {
    const alert = useAlert()
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
  }
  const docLineSelectedSwitch = (PrReIndex, item, index) => {
    let checkboxValue = null
    if (item.isSelected) {
      checkboxValue = false
    } else {
      checkboxValue = true
    }
    let prData = PQDocumentLines
    prData[PrReIndex].DocumentLines[index]['isSelected'] = checkboxValue
    setPQDocumentLines(prData)
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
  return (
    <>
      <Navbar 
      setgetserviceseries={setgetserviceseries}
getdocumentname={getdocumentname}
getdocumenttype={getdocumenttype}
        ModuleName={ModuleName}
      />
      {loading && (
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <h1 style={{ textAlign: 'center' }}>Purchase Quotation</h1>
      <Form onSubmit={handleSubmitted}>
        <CardGroup>
          <DIV3>
            <Container fluid>
              <label>Vendor</label>
              <div
                style={{ width: '23.5rem', height: 'auto' }}
                // onClick={BusinessPartners}
              >
                <Select
                  placeholder={
                    PQFindDocumentLines && PQFindDocumentLines.CardCode 
                  }
                  options={VendorCodeDropdown} // Options to display in the dropdown
                  onChange={e => {
                    VendorChange(e)
                  }} // Function will trigger on select event
                  // onRemove={BusinessPartners} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <label>Contact Person</label>
              <div
                style={{ width: '23.5rem', height: 'auto' }}
                variant='primary'
                onClick={ContactPerson}
              >
                <Select
                  placeholder={
                    PQFindDocumentLines && PQFindDocumentLines.ContactPersonCode
                  }
                  options={CPDropdown} // Options to display in the dropdown
                  onChange={e => {
                    CPChange(e.value)
                  }}
                  // onSelect={GroupNo} // Function will trigger on select event
                  // onRemove={GroupNo} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>{' '}<br/>
              {/* Upper Side++++++++ */}
              <Button variant='primary' onClick={PurchaseRequest}>
                Copy From
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                className='Modal-big'
                size='lg'
              >
                <Modal.Header closeButton>
                  <Modal.Title id='example-modal-sizes-title-lg'>
                    List of Purchase Requests
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {PrRe && (
                    <Table responsive>
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Document No.</th>
                          <th>Requester</th>
                          <th>Requester Name</th>
                          <th>Posting Date</th>
                        </tr>
                      </TableHead>
                      <tbody>
                        {PrRe.map((item, index) => (
                          <tr key={`${index}`}>
                            <TD>
                              {index + 1}
                              <input
                                type='checkbox'
                                onChange={() => {
                                  checkboxSelect(item, index)
                                }}
                                checked={item.isSelected}
                              />
                            </TD>
                            <TD>{item.DocNum}</TD>
                            <TD>{item.Requester}</TD>
                            <TD>{item.RequesterName}</TD>
                            <TD>{item.DocDate}</TD>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      handleShowModalTwo()
                      handleClose()
                    }}
                  >
                    Choose
                  </Button>
                  <Button variant='primary' onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
              <br />
              <Modal
                show={modalTwo === 'modal-two'}
                className='Modal-big'
                size='lg'
              >
                <Modal.Title id='example-modal-sizes-title-lg'>
                  List of Purchase Requests
                </Modal.Title>
                <Modal.Body>
                  <Table responsive striped bordered hover>
                    <TableHead>
                      <tr>
                        <th>#</th>
                        <th>Item No.</th>
                        <th>Item Description</th>
                        <th>UoM Name</th>
                        <th>Free Text</th>
                        <th>Quantity</th>
                        <th>Delivery Date</th>
                        <th>Open Qty</th>
                      </tr>
                    </TableHead>
                    <tbody>
                      {PQDocumentLines &&
                        PQDocumentLines.map(
                          (PrReItem, PrReIndex) =>
                            PrReItem.isSelected &&
                            PrReItem.DocumentLines.map(
                              (item, index) =>
                                item.LineStatus === 'bost_Open' && (
                                  <tr key={`${index}`}>
                                    <TD>{index + 1}
                                    <input
                                        type='checkbox'
                                        onChange={() => {
                                          docLineSelectedSwitch(
                                            PrReIndex,
                                            item,
                                            index
                                          )
                                        }}
                                        checked={item.isSelected}
                                      /></TD>
                                   
                                    <TD>{item.ItemCode}</TD>
                                    <TD>{item.ItemDescription}</TD>
                                    <TD>{item.MeasureUnit}</TD>
                                    <TD>
                                      <div
                                        style={{
                                          width: '14rem',
                                          height: 'auto'
                                        }}
                                      >
                                        <input
                                          type='text'
                                          name='FreeText'
                                          class='form-control'
                                          aria-describedby='Requesterid'
                                          defaultValue={item.FreeText}
                                        />
                                      </div>
                                    </TD>
                                    <TD>
                                      <div
                                        style={{
                                          width: '14rem',
                                          height: 'auto'
                                        }}
                                      >
                                        <input
                                          type='number'
                                          name='QuotedQty'
                                          readOnly='readOnly'
                                          class='form-control'
                                          aria-describedby='Requesterid'
                                          defaultValue={
                                            item.RemainingOpenQuantity
                                          }
                                          // onChange={e=>OpenQtyFunction(e, index)
                                          // setOpenQty(e.target.value)
                                          // }
                                          // onChange={e => {
                                          //   OpenQtyFunction(e, index)
                                          //   setOpenQty(e.target.value)
                                          // }}
                                        />
                                      </div>
                                    </TD>
                                    <TD>
                                      <div
                                        style={{
                                          width: '14rem',
                                          height: 'auto'
                                        }}
                                      >
                                        <input
                                          type='date'
                                          name='ShipDate'
                                          readOnly='readOnly'
                                          class='form-control'
                                          defaultValue={item.ShipDate}
                                        />
                                      </div>
                                    </TD>
                                    <TD>
                                      {item.RemainingOpenQuantity || OpenQty}{' '}
                                    </TD>
                                  </tr>
                                )
                            )
                        )}
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='secondary' onClick={handleCloseee}>
                  Choose
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={show1} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Purchase Quotation List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {ModalHeaderData && (
                    <Table responsive>
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Document Status</th>
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
                           
                            <TD>
                      {item.DocumentStatus === 'bost_Open' ? (
                        <p style={{ background: 'gray', color: 'white' }}>
                          Open
                        </p>
                      ) : item.DocumentStatus === 'bost_Close' ? (
                        <p style={{ background: 'red', color: 'white' }}>
                          Closed
                        </p>
                      ) : null}
                    </TD>
                            <TD>{item.DocNum}</TD>
                            <TD>{item.DocEntry}</TD>
                            <TD>{item.CardCode}</TD>
                            <TD>{item.CardName}</TD>
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
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Vendor Ref. No.</label>
                <input
                  defaultValue={PQFindDocumentLines && PQFindDocumentLines.NumAtCard
                  }
                  type='text'
                  name={'NumAtCard'}
                  class='form-control'
                  // placeholder={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard}
                  onChange={e => {
                    NumAtCardFun(e)
                  }}
                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Group No</label>
                <input
                  defaultValue={
                    PQFindDocumentLines && PQFindDocumentLines.GroupNumber
                  }
                  type='text'
                  class='form-control'
                  id='GropNO'
                  aria-describedby='B'
                  //placeholder={PQFindDocumentLines && PQFindDocumentLines.GroupNumber}
                ></input>
              </div>
            </Container>
          </DIV3>
          <DIV4>
          </DIV4>
          <DIV3>
            <Container fluid>
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
                    Whse(e.item.Name)}} // Function will trigger on select event
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
             <div style={{ width: '23.5rem' , marginLeft: '3rem'}}>
            <label> Status</label>
            <Select
                placeholder={getStatus}
                isDisabled={getStatus?true:false}
                options={[
                  { label: 'Open', value: 'bost_Open' },
                  { label: 'Close', value: 'bost_Close' },
                  { label: 'All', value: null },
                  // { label: 'Draft', value: 'bost_Draft' }
                ]} // Options to display in the dropdown
                onChange={e => {
                  setgetdocumentstatus(e.value)
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
             </div><br/>
            <div className="Quotation"
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' ,border:'1px solid',borderColor:'lightgray',borderRadius:'4px'}}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon12" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
                <input
                  name={'SearchPRNumber'}
                  type='Number'
                  placeholder='Number'
                  class='form-control12'
                  onChange={e => {
                    setSearchNumber(e.target.value)
                  }}
                />
              </div>
              <br />
              {/* <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
                <label>No</label>
                <input
                  type='number'
                  value={
                    SelectedPRDocEntry && SelectedPRDocEntry.DocNum
                      || PQFindDocumentLines && PQFindDocumentLines.DocNum
                  }
                  class='form-control'
                  readOnly='readOnly'
                  placeholder=''
                />
              </div> */}
            
              <div style={{ width: '23.5rem',marginLeft:'3rem' }}>
                <label> Posting Date</label>
                <input
                  type='date'
                  name='DocDate'
                  class='form-control'
                  defaultValue={
                    PQFindDocumentLines && PQFindDocumentLines.DocDate? PQFindDocumentLines && PQFindDocumentLines.DocDate: currentDate
                  }
                  // value={SelectedPRDocEntry && SelectedPRDocEntry.DocDate}
                  onChange={e => {
                    DocDateChange(e)
                  }}
                />
              </div>
              <div style={{ width: '23.5rem',marginLeft:'3rem' }}>
                <label> Valid Date</label>
                <input
                  type='date'
                  name='DocDueDate'
                  class='form-control'
                  defaultValue={ PQFindDocumentLines && PQFindDocumentLines.DocDueDate? PQFindDocumentLines && PQFindDocumentLines.DocDueDate: currentDate}
                  onChange={e => {
                    DocDueDateChange(e)
                  }}
                />
              </div>
              {/* <div style={{ width: '23.5rem',marginLeft:'3rem' }}>
                <label> Document Date</label>
                <input
                  type='date'
                  name='TaxDate'
                  class='form-control'
                  defaultValue={
                    SelectedPRDocEntry && SelectedPRDocEntry.TaxDate
                      || PQFindDocumentLines && PQFindDocumentLines.TaxDate
                  }
                  onChange={e => {
                    TaxDateChange(e)
                  }}
                />
              </div> */}
              <div style={{ width: '23.5rem',marginLeft:'3rem' }}>
                <label>Required Date</label>
                <input
                  type='date'
                  name='RequriedDate'
                  class='form-control'
                  defaultValue={PQFindDocumentLines && PQFindDocumentLines.RequriedDate? PQFindDocumentLines && PQFindDocumentLines.RequriedDate: currentDate}
                  onChange={e => {
                    requireDateChange(e)
                  }}
                />
              </div>
              {/* <br/>
            <div class="form-check form-check-inline" style={{marginLeft:'3rem'}}>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e => setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
        </div> */}
            </Container>
          </DIV3>
        </CardGroup>
        <Tabs
          defaultActiveKey='Contents'
          transition={false}
          id='noanim-tab-example'
        >
          <Tab eventKey='Contents' title='Contents'>
<ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="PurchaseQuotation"
                    sheet="PurchaseQuotation"
                    buttonText="XLS"/>
            {
              <Table responsive striped bordered hover
              id="table-to-xls"
              >
                {Array.isArray(PQDocumentLines) &&
                PQDocumentLines.length > 0 ? (
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Bar Code</th>
                      <th>Item No.</th>
                      <th>Item Description</th>
                      <th>UoM Name</th>
                      <th>Free Text</th>
                      <th>Requried Qty</th>
                      <th>Quoted Qty</th>
                      <th>Quoted Date</th>
                      <th>Open Qty</th>
                      <th>Whse</th>
                      <th>Unit Price</th>
                      <th>Discount</th>
                      <th>Tax Code</th>
                      <th>Price after Discount</th>
                      <th>Gross Price after Disc.</th>
                      <th>Tax Amount</th>
                      <th>Freight Code</th>
                      <th>Freight 1</th>
                      <th>Line Total</th>
                      <th>Gross Total</th>
                      <th>Project</th>
                      <th>Buyer</th>
                      <th>Cost Centre</th>
                    </tr>
                  </TableHead>
                ) : null}
                <tbody>
                  {PQDocumentLines &&
                    PQDocumentLines.map(
                      (PrReItem, PrReIndex) =>
                        PrReItem.isSelected &&
                        PrReItem.DocumentLines.map(
                          (item, index) =>
                            item.isSelected &&
                            item.LineStatus === 'bost_Open' && (
                              <tr key={`${index}`}>
                                <TD>{index + 1}</TD>
                                <TD></TD>
                                <TD>{item.ItemCode}</TD>
                                <TD>{item.ItemDescription}</TD>
                                <TD>{item.MeasureUnit}</TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='text'
                                      name='FreeText'
                                      class='form-control'
                                      aria-describedby='Requesterid'
                                      defaultValue={item.FreeText}
                                      onChange={e => {
                                        ontextChanged(e, index, PrReIndex)
                                      }}
                                    />
                                  </div>
                                </TD>
                                <TD>{item.RemainingOpenQuantity}</TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='number'
                                      name='QuotedQty'
                                      class='form-control'
                                      aria-describedby='Requesterid'
                                      defaultValue={item.RemainingOpenQuantity}
                                      onChange={e => {
                                        OpenQtyFunction(e, index, PrReIndex)
                                        setOpenQty(e.target.value)
                                      }}
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='date'
                                      name='ShipDate'
                                      class='form-control'
                                      onChange={e => {
                                        ShipDateChange(e, index, PrReIndex)
                                      }}
                                    />
                                  </div>
                                </TD>
                                <TD>{OpenQty} </TD>
                                <TD>
                                  <div style={{ width: '15em' }}>
                                    {PrWhse && (
                                      <Select
                                      menuPortalTarget={document.body}
                                        value={PrWhse.filter(
                                          option =>
                                            option.value === item.WarehouseCode
                                        )}
                                        placeholder='Select..'
                                        options={PrWhse} // Options to display in the dropdown
                                        onChange={e => {
                                          DocLinesDropDownOnChangeFun(
                                            e,
                                            index,
                                            PrReIndex,
                                            'WarehouseCode'
                                          )
                                        }}
                                        // onSelect={CostCentre} // Function will trigger on select event
                                        // onRemove={CostCentre} //Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    )}
                                  </div>
                                </TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      name='UnitPrice'
                                      type='number'
                                      class='form-control'
                                      aria-describedby='Requesterid'
                                      onChange={e => {
                                        PriceFun(e, index, PrReIndex)
                                        // setTotalLC(
                                        //   item.PriceAfterVAT * item.RemainingOpenQuantity
                                        // )
                                      }}
                                      placeholder='0'
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='number'
                                      name='DiscountPercent'
                                      class='form-control'
                                      aria-describedby='Requesterid'
                                      onChange={e =>
                                        // ontextChanged(e, index,PrReIndex)
                                        PriceFun22(e, index, PrReIndex)
                                      }
                                      placeholder=''
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: '14rem' }}>
                                    <Select
                                      placeholder='Select..'
                                      menuPortalTarget={document.body}
                                      options={TaxCode} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange(
                                          e,
                                          index,
                                          PrReIndex,
                                          'VatGroup'
                                        )
                                      }}
                                      // onSelect={CostCentre} // Function will trigger on select event
                                      // onRemove={CostCentre} //Function will trigger on remove event
                                      displayValue='name' // Property name to display in the dropdown options
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      // readOnly='readOnly'
                                      name='PriceAfterVAT'
                                      class='form-control'
                                      aria-describedby='Requesterid'
                                   value= {item.PriceAfterVAT}
                                    />
                                  </div>
                                </TD>
                                <TD>
                                <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='number'
                                      class='form-control'
                                      id='Requesterid'
                                      aria-describedby='Requesterid'
                                      value={
                                        (item.TaxRate + item.PriceAfterVAT) 
                                      }
                                      name='GrossPriceAfterDisc'
                                    />
                                  </div>
                                </TD>
                                <TD>
                                <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='number'
                                      class='form-control'
                                      id='Requesterid'
                                      aria-describedby='Requesterid'
                                      value={(item.PriceAfterVAT * item.RemainingOpenQuantity * item.TaxRate) /100}
                                        // ((item.TaxRate * item.PriceAfterVAT) /
                                        //   100) *
                                        // item.RemainingOpenQuantity
                                    
                                      name='TaxAmount'
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: '14rem' }}>
                                    <Select
                                      placeholder='Select..'
                                      menuPortalTarget={document.body}
                                      options={Frieght} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChangeFun(
                                          e,
                                          index,
                                          PrReIndex,
                                          'Freight'
                                        )
                                      }}
                                      // onSelect={CostCentre} // Function will trigger on select event
                                      // onRemove={CostCentre} //Function will trigger on remove event
                                      displayValue='name' // Property name to display in the dropdown options
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='number'
                                      class='form-control'
                                      id='Requesterid'
                                      aria-describedby='Requesterid'
                                      name='FreightLC'
                                      // value={item.NetTaxAmount}
                                      onChange={e => {
                                        onFreightChanged(e, index, PrReIndex)
                                        setFreightValue(e.target.value)
                                      }}
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='number'
                                      class='form-control'
                                      id='Requesterid'
                                      aria-describedby='Requesterid'
                                      // onClick={() => {
                                      //   setTotalLC(item.PriceAfterVAT * item.RemainingOpenQuantity)
                                      // }}
                                      placeholder={
                                        item.PriceAfterVAT *
                                        item.RemainingOpenQuantity
                                      }
                                      name='TotalLC'
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div
                                    style={{ width: '14rem', height: 'auto' }}
                                  >
                                    <input
                                      type='number'
                                      class='form-control'
                                      id='Requesterid'
                                      name='GrossTotal'
                                      placeholder={ (item.TaxRate + item.PriceAfterVAT) 
                                         *
                                        item.RemainingOpenQuantity
                                      }
                                      aria-describedby='Requesterid'
                                      onChange={e => {
                                        ontextChanged(e, index, PrReIndex)
                                      }}
                                    />
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: '15em' }}>
                                    {PrProject && (
                                      <Select
                                      menuPortalTarget={document.body}
                                        value={PrProject.filter(
                                          option =>
                                            option.value === item.ProjectCode
                                        )}
                                        placeholder='Select..'
                                        options={PrProject} // Options to display in the dropdown
                                        onChange={e => {
                                          DocLinesDropDownOnChangeFun(
                                            e,
                                            index,
                                            PrReIndex,
                                            'ProjectCode'
                                          )
                                        }}
                                        // onSelect={Project} // Function will trigger on select event
                                        // onRemove={Project} //Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    )}
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: '15em' }}>
                                    {PrBuyer && (
                                      <Select
                                      menuPortalTarget={document.body}
                                        value={PrBuyer.filter(
                                          option =>
                                            option.value ===
                                            item.SalesPersonCode
                                        )}
                                        placeholder='Select..'
                                        options={PrBuyer} // Options to display in the dropdown
                                        onChange={e => {
                                          DocLinesDropDownOnChangeFun(
                                            e,
                                            index,
                                            PrReIndex,
                                            'SalesPersonCode'
                                          )
                                        }}
                                        // onSelect={CostCentre} // Function will trigger on select event
                                        // onRemove={CostCentre} //Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    )}
                                  </div>
                                </TD>
                                <TD>
                                  <div style={{ width: '14rem' }}>
                                    {PrCost && (
                                      <Select
                                      menuPortalTarget={document.body}
                                        value={PrCost.filter(
                                          option =>
                                            option.value === item.CostingCode
                                        )}
                                        placeholder='Select..'
                                        options={PrCost} // Options to display in the dropdown
                                        onChange={e => {
                                          DocLinesDropDownOnChangeFun(
                                            e,
                                            index,
                                            PrReIndex,
                                            'CostingCode'
                                          )
                                        }}
                                        // onSelect={CostCentre} // Function will trigger on select event
                                        // onRemove={CostCentre} //Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    )}
                                  </div>
                                </TD>
                              </tr>
                            )
                        )
                    )}
                </tbody>
              </Table>
            }
            {SearchDocumentLines && (
              <Table responsive striped bordered hover>
                {Array.isArray(SearchDocumentLines) &&
                SearchDocumentLines.length > 0 ? (
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
                  {SearchDocumentLines &&
                    SearchDocumentLines.map((item, index) => (
                      // item.LineStatus === "bost_Open" &&
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
                              onChange={e => {
                                SearchontextChanged(e, index)
                              }}
                            />
                          </div>
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
                              // onChange={e=>OpenQtyFunction(e, index)
                              // setOpenQty(e.target.value)
                              // }
                              // onChange={e => {
                              //   OpenQtyFunction(e, index)
                              //   setOpenQty(e.target.value)
                              // }}
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
                              onChange={e => {
                                SearchShipDateChange(e, index)
                              }}
                              defaultValue={item.ShipDate}
                            />
                          </div>
                        </TD>
                        <TD>{item.RemainingOpenQuantity || OpenQty} </TD>
                        <TD>
                          <div style={{ width: '15em' }}>
                            {PrWhse && (
                              <Select
                              menuPortalTarget={document.body}
                                value={PrWhse.filter(
                                  option => option.value === item.WarehouseCode
                                )}
                                placeholder='Select..'
                                options={PrWhse} // Options to display in the dropdown
                                onChange={e => {
                                  SearchDocLinesDropDownOnChangeFun(
                                    e,
                                    index,
                                    'WarehouseCode'
                                  )
                                }}
                                // onSelect={CostCentre} // Function will trigger on select event
                                // onRemove={CostCentre} //Function will trigger on remove event
                                displayValue='name' // Property name to display in the dropdown options
                              />
                            )}
                          </div>
                        </TD>
                        <TD>{item.UnitPrice}</TD>
                        <TD>{item.DiscountPercent}</TD>
                        <TD>{item.Price}</TD>
                        <TD>
                          <div style={{ width: '14rem' }}>
                            <Select
                                            menuPortalTarget={document.body}
                              // disabled={true}
                              placeholder={
                                item.VatGroup +
                                '  : ' +
                                item.TaxPercentagePerRow +
                                '%'
                              }
                              // options={TaxCode} // Options to display in the dropdown
                              // onChange={e => {
                              //   DocLinesDropDownOnChange(e, index, 'VatGroup')
                              // }}
                              // onSelect={CostCentre} // Function will trigger on select event
                              // onRemove={CostCentre} //Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          </div>
                        </TD>
                        <TD>{item.TaxTotal}</TD>
                        <TD>{item.GrossTotalSC}</TD>
                        <TD>
                          <div style={{ width: '14rem' }}>
                            <Select
                                            menuPortalTarget={document.body}
                              placeholder= {item.DocumentLineAdditionalExpenses[0]?item.DocumentLineAdditionalExpenses[0].ExpenseCode :"" }
                              options={Frieght} // Options to display in the dropdown
                              // onChange={e => {
                              //   FreightDropDownOnChange(e, index, 'Freight')
                              // }}
                              // onSelect={CostCentre} // Function will trigger on select event
                              // onRemove={CostCentre} //Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          </div>
                        </TD>
                        <TD>
                    {item.DocumentLineAdditionalExpenses[0]?item.DocumentLineAdditionalExpenses[0].LineTotal : 0}
                        </TD>
                        <TD>{item.LineTotal}</TD>
                        <TD>{item.GrossTotal}</TD>
                        <TD>
                          <div style={{ width: '14rem' }}>
                            <Select
                                            menuPortalTarget={document.body}
                              placeholder={item.ProjectCode}
                              // options={Frieght} // Options to display in the dropdown
                              // onChange={e => {
                              //   FreightDropDownOnChange(e, index, 'Freight')
                              // }}
                              // onSelect={CostCentre} // Function will trigger on select event
                              // onRemove={CostCentre} //Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          </div>
                        </TD>
                        <TD>
                          <div style={{ width: '14rem' }}>
                            <Select
                                            menuPortalTarget={document.body}
                              placeholder={item.SalesPersonCode}
                              // options={Frieght} // Options to display in the dropdown
                              // onChange={e => {
                              //   FreightDropDownOnChange(e, index, 'Freight')
                              // }}
                              // onSelect={CostCentre} // Function will trigger on select event
                              // onRemove={CostCentre} //Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          </div>
                        </TD>
                        <TD>
                          <div style={{ width: '14rem' }}>
                            <Select
                                            menuPortalTarget={document.body}
                              placeholder={item.CostingCode}
                              // options={Frieght} // Options to display in the dropdown
                              // onChange={e => {
                              //   FreightDropDownOnChange(e, index, 'Freight')
                              // }}
                              // onSelect={CostCentre} // Function will trigger on select event
                              // onRemove={CostCentre} //Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          </div>
                        </TD>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Tab>
          <Tab eventKey='Logistics' title='Logistics'>
            <Logistics
            getDatafromParent={SelectedPRDocEntry}
            getDatafromParent22={ModalHeaderData}
            setgetAddress={setgetAddress}
              setgetAddress2={setgetAddress2}
              setgetTransportationCode={setgetTransportationCode}
            />
          </Tab>
          <Tab eventKey='Accounting' title='Accounting'>
            <Accounting
              setgetJournalMemo={setgetJournalMemo}
              setgetGroupNumber={setgetGroupNumber}
              setgetProject={setgetProject}
              setgetCancelDate={setgetCancelDate}
            />
          </Tab>
          <Tab eventKey='Attachment' title='Attachment'>
            <Attachment setattachmentresponse={setattachmentresponse} />
          </Tab>
        </Tabs>
      
        {/* Table+++++++++ */}

        {/* Bottom Side+++++++++ */}
        <CardGroup>
          <DIV3>
            <Container fluid>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Buyer</label>
                {/* <input
                  type='text'
                  class='form-control'
                  placeholder=''
                  defaultValue={
                    PQFindDocumentLines && PQFindDocumentLines.SalesEmployeeName
                  }
                /> */}
                <Select
                placeholder={PQFindDocumentLines && PQFindDocumentLines.SalesEmployeeName}
                options={PrBuyer} // Options to display in the dropdown
                displayValue='name' // Property name to display in the dropdown options
              />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }} onClick={Owner}>
              <label>Owner</label>
                <Select
                  placeholder={PQFindDocumentLines && PQFindDocumentLines.Owner}
                  options={OwnerDropdown}
                  onChange={e => setSelectedOwner(e.value)} // Options to display in the dropdown
                  // onSelect={Owner} // Function will trigger on select event
                  // onRemove={Owner} //Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <br />
              <div class='form-group'>
                <label for='exampleFormControlTextarea1'>Remarks</label>
                <div style={{ width:'23.5rem'}}>
                <textarea
                  defaultValue={PQFindDocumentLines && 'Based On Purchase Request : ' +   PQFindDocumentLines.DocNum +
                      '. ' +
                      PQFindDocumentLines.Comments
                  }
                  // placeholder={SelectedPRDocEntry && "Base On Purchase Request : " + SelectedPRDocEntry.DocNum + ". " + SelectedPRDocEntry.Comments}
                  type='text'
                  class='form-control rounded-0'
                  id='exampleFormControlTextarea1'
                  name='Comments'
                  rows='3'
                  onChange={e => {
                    CommentsFun(e)
                  }}
                />
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div>
                <Button
                  style={{ marginLeft: '5%' }}
                  type='reset'
                  onClick={() => {
                    Submit_PatchFunc()
                  }}
                >
                  {ButtonName}
                </Button>

                <Button variant="secondary" style={{ marginLeft: '5%' }}
                onClick={() => {
                  window.location.href="/Home"
                }}
                >Cancel</Button>
                {/* <Button
               
              >
               {ButtonName}
              </Button> */}
              </div>
            </Container>
          </DIV3>
          <DIV4></DIV4>
          <DIV3>
            <div>
              <div style={{ width: '23.5rem' ,marginLeft:'4rem'}}>
                <label style={{ marginTop: '10%' }}>
                  Total Before Discount:
                </label>
                <input
                  type='number'
                  readOnly
                  defaultValue={totalbforeDiscount}
                  placeholder=''
                  class='form-control'
                />
              </div>
 <div style={{marginLeft:'4rem'}}>
           
                <label>Discount</label>
               <CardGroup>
                <div style={{ width: '11.75rem' }}>
                <input
                  type='number'
                  name='Discount%'
                  class='form-control'
                  value={disc || PQFindDocumentLines && PQFindDocumentLines.DiscountPercent}
                  onChange={e => {
                    setdisc(e.target.value)
                    setDiscountTotal((e.target.value * totalbforeDiscount) / 100)
                  }}
                  placeholder='%'
                />
              </div>
              
              <div style={{ width: '11.75rem' }}>
                <input
                  type='number'
                  name='Discount'
                  // onChange={e => setBottomDiscount(e.target.value)}
                  placeholder='PKR'
                  class='form-control'
                  value={DiscountTotal}
                  onChange={e => {
                    setDiscountTotal(e.target.value)
                    setdisc((e.target.value / totalbforeDiscount) * 100)
                  }}
                />
              </div>
              </CardGroup>
              </div>
            </div>
            <div style={{ width: '23.5rem', marginLeft:'4rem'}}>
              <label>Freight</label>
              <input
                value={totalFreight || TotalFreightLC}
                class='form-control'
                readOnly='readOnly'
              />
            </div>
            <br />
            <div style={{ width: '23.5rem' , marginLeft:'4rem' }}>
              <label>Tax</label>
              <input
                type='number'
                readOnly
                placeholder={TotalTaxRate}
                // onChange={e => setBottomTax(+e.target.value)}
                value={PQFindDocumentLines && PQFindDocumentLines.VatSumSys }
                class='form-control'
                // value={SelectedPRDocEntry && SelectedPRDocEntry.VatSumSys || HeaderData && HeaderData.VatSumSys }
                name='TaxAmount(LC)'
              />
            </div>
            {/* <button onClick={TotalPaymentDue}>Total</button> */}

            <div style={{ width: '23.5rem' , marginLeft:'4rem'}}>
              <label>Total Payment Due:</label>
              <input
                type='number'
                value={totalbforeDiscount  + DiscountTotal + TotalTaxRate} 
                readOnly
                placeholder={PQFindDocumentLines && PQFindDocumentLines.DocTotalSys}
                class='form-control'
              />
            </div>
          </DIV3>
        </CardGroup>
      </Form>
    </>
  )
}
