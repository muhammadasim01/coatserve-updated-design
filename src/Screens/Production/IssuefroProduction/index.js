import React from 'react'
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Modal,
  Tab,
  Tabs,
  Form
} from 'react-bootstrap'
import Switch from "react-switch";
import { MenuUp } from 'react-bootstrap-icons';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import {  Attachment} from '../../../Component/APDownPaymentRequest';
import {
  Logistics,
  Accounting
} from '../../../Component/PurchaseOrder';
import { GrDocumentPerformance } from 'react-icons/gr'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Navbar } from '../../../Component/Global'
import { useAlert } from "react-alert";
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import './index.css'

const axios = require('axios')
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function PurchaseOrder() {
  const [SelectShow, setSelectShow]=React.useState()
  const [getudfvalues, setgetudfvalues]=React.useState({})
  const alert = useAlert();
  const [show4, setShow4] = React.useState(false)
  const [currentDate,setcurrentDate] = React.useState()
  const [show3, setShow3] = React.useState(false)
  const [show33, setShow33] = React.useState(false)
  const [getbatchnumbers, setgetbatchnumbers]=React.useState()
  const [loading, setLoading] = React.useState(false);
  const [FindDocumentLines, setFindDocumentLines] = React.useState();
  const [valuechacker, setvaluechacker]=React.useState()
  const [update, setUpdate] = React.useState(1)
  const [getTaxDate, setgetTaxDate] = React.useState();
  const [getdirectdoctype, setgetdirectdoctype] = React.useState()
  const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState()
  const [itemsDropdownList, setItemsDropdownList] = React.useState();
  const [BatchNumbersData, setBatchNumbersData]=React.useState()
  const [CommentsValue, setCommentsValue] = React.useState()
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [TotalTaxRate, setTotalTaxRate] = React.useState()
  const classes = useStyles();
  const [DocStatus, setDocStatus] = React.useState()
  const [show, setShow] = React.useState(false)
  const [udfshow, setudfShow] = React.useState(false)
  const [DueDate, setDueDate] = React.useState()
  const [UpdatePurchaseRequest, setUpdatePurchaseRequest] = React.useState()
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [OpenQty, setOpenQty] = React.useState()
  const [SelectedCP, setSelectedCP] = React.useState()

  const [Customer, setCustomer] = React.useState()
  const [SearchPR, setSearchPR] = React.useState()

  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [ButtonName, setButtonName] = React.useState();
  const [SelectedVendor, setSelectedVendor] = React.useState()

  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [DelDate, setDelDate] = React.useState()
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [PrProject, setPrProject] = React.useState()
  const [gettaxtotal, setgettaxtotal] = React.useState()
  const [getnetTotal, setgetnetTotal] = React.useState()
  const [PrCost, setPrCost] = React.useState()
  const[SelectedOwner, setSelectedOwner]=React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [TaxCode, setTaxCode] = React.useState()
  const [Frieght, setFrieght] = React.useState()
  const [PrBuyer, setPrBuyer] = React.useState()
  const [getvalues,setgetvalues]=React.useState({})

  const [getItemsnumber, setgetItemsnumber] = React.useState()

  const [PrOwner, setPrOwner] = React.useState()
  const [PrWhse, setPrWhse] = React.useState()
  const [InvoicesHeaderData, setInvoicesHeaderData] = React.useState()

  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [OwnerPrRe, setOwnerPrRe] = React.useState()
  const [Disply, setDisply] = React.useState(false)
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [InvoicesLines, setInvoicesLines] = React.useState()
  const [CP, setCP] = React.useState()
  const [GN, setGN] = React.useState()
  const[UoMLable, setUoMLable]=React.useState()
  const [TabLable, setTabLable]=React.useState()
  const [noOfRows, setNoOfRows] = React.useState(1);
  const [getDocumentlines, setgetDocumentlines] = React.useState()
  const [Price, setPrice] = React.useState()
  const [Discount, setDiscount] = React.useState()
  const [Tax, setTax] = React.useState()
  const [total, setTotal] = React.useState()
  const [TotalGross, setTotalGross] = React.useState()
  const [BottomTax, setBottomTax] = React.useState()
  const [BottomDiscount, setBottomDiscount] = React.useState()
  const [TotalPayment, setTotalPayment] = React.useState()
  const [SaleEmployee, setSaleEmployee] = React.useState()
  const [DiscountTotal, setDiscountTotal] = React.useState(0)
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState()
  const [totalFreight, setTotalFreight] = React.useState(0)
  const [disc, setdisc] = React.useState()
  const [ShipDate, setShipDate] = React.useState()
  // const [OpenQty, setOpenQty] = React.useState()
  const [Total_LC, setTotal_LC] = React.useState();
  const [MaUser, setMaUser] = React.useState()
  const [MaCustomer, setMaCustomer] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [getdocumentname, setgetdocumentname] = React.useState("IGE2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("60")
  const [ModuleName, setModuleName] = React.useState("IssueForProduction")
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [selectedItems, setSelectedItems] = React.useState();
  const [WarehouseName, setWarehouseName] = React.useState()

  
  const [seletedBatchnumber, setseletedBatchnumber] = React.useState()
  const [seletedBatchnumber2, setseletedBatchnumber2] = React.useState([])
  const [BatchNumberQuantityData, setBatchNumberQuantityData] = React.useState()
 
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

  React.useEffect(async () => {
    today()
    setgetdocumentname("IGE2")
    setModuleName("IssueForProduction")
    setgetdocumenttype("60")
    setButtonName("Add")
    setSearchNumber('0')
    compareDate()
    let cook = await localStorage.getItem('cookie')
    const show = await localStorage.getItem('ShowBranches')
    if (showA == 'true') {
      setShowA(true)
      // setShow1(true)
      compareDate()
      await localStorage.removeItem('ShowBranches')
    }
    if (cook) 
    BusinessPartners(cook)
    getBatchQuantities(cook)
    GetItems(cook)
    getBatchNumbersfromAPI(cook)
    ActiveCustomer(cook)
    itemsListAPI(cook);
    Project(cook)
    ActiveUser(cook)
    CostCentre(cook)
    Buyer(cook)
    Owner(cook)
    Whse(cook)
    UDFBagShape(cook)
    // PurchaseQuotation(cook)
    OwnerPurchaseRequest(cook)
    Frieght1(cook)
    TableTaxCode(cook)
  }, [])
  const getBatchQuantities = async (cook) => {
    let sapAPi = `SQLQueries('BatchNoQuantities')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("getBatchQuantities",res.data.value)
        setBatchNumberQuantityData(res.data.value)
      })
      .catch({})
  }
  const handleClose3 = () => {
    setShow33(false)
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

  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `InventoryGenExits(${id})`,
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
  const DocDueDateChange = async e => {
    setDueDate(e.target.value)
  }
  
  const UDFBagShape = async cook => {
    let body = {
      "SqlCode": "UDFBagShape",
      "SqlName": "UDFBagShape",
      "SqlText": `Select FldValue, Descr From UFD1 Where TableID = 'ORDR' and FieldID = 12`
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
          console.log("res",res)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const BusinessPartners = async (cook) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    
    let SAPapi = LINKS.sap.MasterData.ActiveCustomer
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cook
      })
      .then(function (res) {
        console.log(res)
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

    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq '${Customer}'`
    console.log(SAPapi);

    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res.data.value)
        if (res.data.value) {          
          let ItemsDropDown = []
          console.log(res.data.value)
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

  const OwnerhandleClose = () => setDisply(false)
  const OwnerhandleShow = () => setDisply(true)

  const GetItems = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
     let AllActiveItems=`Items?$select=ItemCode,ItemName,InventoryItem,ItemsGroupCode,ManageBatchNumbers,PurchaseUnit &$orderby=ItemCode`
    await axios
      .post(API_TYPES.GET, {
        api: AllActiveItems,
        cookie: cookie
      })
      .then(function (ItemsResponse) {
        ItemsResponseResult = ItemsResponse
        // setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
    let res = apiProcessing(ItemsResponseResult)
    if (res) {
      let ItemsDropDown = []
      let ItemsDetails = []
      res.forEach(element => {
        ItemsDetails[element.ItemCode] = {
          ItemCode: element.ItemCode,
          ItemName: element.ItemName,
          PurchaseUnit: element.PurchaseUnit,
          FreeText: element.FreeText,
          RequriedDate: element.RequriedDate,
          ShipDate: element.ShipDate,
          RequiredQuantity: 1,
          BaseOpenQuantity: element.BaseOpenQuantity,
          U_MPrice: element.U_MPrice,
          ManageBatchNumbers : element.ManageBatchNumbers 
          // LineVendor:element.LineVendor,
          //  CostingCode:element.CostingCode,
          //  SalesPersonCode:element.SalesPersonCode,
          //  WarehouseCode:element.WarehouseCode,
        }
        ItemsDropDown.push({
          value: element.ItemCode,
          label: element.ItemCode + ' : ' + element.ItemName
        })
      })

      await console.log("ItemsDetails",ItemsDetails)
      await setItemsDropDown(ItemsDropDown)
      await setItemsDetails(ItemsDetails)
    }
  }
  const itemsListAPI = async (cookie) => {
    let res = await getApiResponce(LINKS.sap.MasterData.ActiveSalesItems, cookie);
    if (res) {
      let dropdownList = await getDropdownListWithValue(res, 'ItemName', 'ItemCode');
      setItemsDropdownList(dropdownList);
    }
  }
  const getApiResponce = async (api, cookie) => {
    let result = null
    await axios.post(LINKS.SERVER_GET, {
      api: api,
      cookie: cookie
    }).then(function (res) {
      if (res.data.value) {
        result = res.data.value;
      }
      else {
        Notification(`[SAP Error in ${api}]: - - - `, JSON.stringify(res.data.error.message.value));
        result = null;
      }
    }).catch(function (error) {
      Notification(`Network Error in ${api}`, JSON.stringify(error));
      result = null;
    });
    return result;
  }
  const DocTypeChange = (e) =>{
    if(e.value==='Direct'){
      setgetcopyfromdoctype()
      setgetdirectdoctype('Direct')
    }else if(e.value==='CopyFrom'){
      setgetdirectdoctype()
      setgetcopyfromdoctype('CopyFrom')
    }
     }
  const CPChange = e => {
    setSelectedCP(e.value)
  }

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
          dropdown.push({ id: element.UserCode, name: element.UserName })
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
  {
    /* Table API's Call++++++++ */
  }
  const Project = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.projects,
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
        api: LINKS.sap.PurchaseRequest.costingCode,
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
              label: element.ExpensCode + " : " + element.Name
            })
          })
          setFrieght(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const TableTaxCode = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveSalesTax,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          console.log(res.data.value)
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name + " : " + element.Code,
              item: element,
            })
          })
          setTaxCode(ItemsDropDown)
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
        console.log(res)
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
  const Owner = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.emplyeeInfo,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.EmployeeID,
              label:
                element.EmployeeID +
                ' : ' +
                element.FirstName +
                ' : ' +
                element.LastName

            })
          })
          setPrOwner(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Whse = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.warehouse,
        cookie: cookie
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
  const dateChange = e => {
    let prBody = PRBody
    prBody[e.target.name] = e.target.value
    setPRBody(prBody)
  }
  const handleClose4 = () => {
    setShow4(false)
  }
  const ShipDateChange = (e, index, PrReIndex) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index]['ShipDate'] = e.target.value
    setShipDate(itemDetail)
  }
  const SearchShipDateChange = (e, index) => {
    let itemDetail = PQDocumentLines
    itemDetail[index]['ShipDate'] = e.target.value
    setSearchDocumentLines(itemDetail)
  }
  const DeliveryDateChange = async e => {
    setDelDate(e.target.value)
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
  const ontextChanged = (e, index,PrReIndex) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value
    setPQDocumentLines(itemDetail)
  }
  const SearchontextChanged = (e, index) => {
    let itemDetail = SearchDocumentLines
    itemDetail[index][e.target.name] = e.target.value
    setSearchDocumentLines(itemDetail)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = async () => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `ProductionOrders?$orderby=DocumentNumber desc &$filter=ProductionOrderStatus eq 'boposReleased' `;
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res)
        setPrRe(res.data.value);
      })
      .catch({})
    setShow(true)
  }
  const selectPR2 = async (item) => {
    setShow(false)
    setHeaderData(item)
    setFindDocumentLines(item.DocumentLines)
    // setSelectedItems(item)
  }
  const selectPR = async item => {
    getbatchnumberdata(item)
    setShow(false)
    setSelectedPRDocEntry(item)
    console.log(item);
    setSearchDocumentLines(item.ProductionOrderLines.filter(function(i){ return i.PlannedQuantity > 0 && i.PlannedQuantity > i.IssuedQuantity }))
    console.log("DocumentLines",item.ProductionOrderLines.filter(function(i){ return i.PlannedQuantity > 0 && i.PlannedQuantity > i.IssuedQuantity   }))
  }
  const ontextItemChanged = e => {
    let obj = TextItemChangedObject
    obj[e.target.name] = e.target.value
    setTextItemChangedObject(obj)
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
    let sapAPi = `InventoryGenExits?$top=10` 
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
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
  const udfhandleClose = () => {
    setudfShow(false)
  }
  const udfhandleshow = () => {
    setudfShow(true)
  }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `InventoryGenExits?$filter=DocNum eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data.value[0])
       console.log(res.data.value[0])
        setFindDocumentLines(res.data.value[0].DocumentLines)
        if(HeaderData!=""){
          setButtonName("Update")
        }
      })
      .catch({})
  }


  const getresponcefromapi = async (DocumentNumber) => {
    setgetItemsnumber(DocumentNumber)
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `ProductionOrders?$filter=DocumentNumber eq '${DocumentNumber}'`
    console.log(SAPapi)
    // let SAPapi = `ProductTrees?$top=1`  
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log("res.data.value", res.data.value[0].ProductionOrderLines)
        setgetDocumentlines(res.data.value[0].ProductionOrderLines)
      })
      .catch({})
  }

  const DocLinesDropDownOnChange = (selectedItem, index, name) => {
    console.log(selectedItem)
    let itemDetail = PQDocumentLines
    itemDetail[index][name] = selectedItem.value
    // itemDetail[index]['GrossPrice'] = selectedItem.item.VatGroups_Lines[0].Rate
    // console.log(selectedItem.item.VatGroups_Lines[0].Rate);
    setPQDocumentLines(itemDetail);
  }
  const Home = () => {
    const alert = useAlert();
  };
  const VendorChange = e => {
    setCustomer(e.value)
  }
  const OpenQtyFunction = (e, index) => {
    let doclines = PQDocumentLines;
    const value = e.target.value
    doclines[index]['RemainingOpenQuantity'] = (value);
    setPQDocumentLines(doclines);
  }
  const getlabelofudf = (e, name) => {
    let doclines = getudfvalues
    doclines[name]= e.label;
    setgetudfvalues(doclines);
  }
  const getvaluesofudf = (e) => {
    let doclines = getudfvalues
    doclines[e.target.name] = e.target.value;
    setgetudfvalues(doclines);
  }
  const submitPatchOrders = async () => {
    let DocLines = []
    let body = PRBody
    SearchDocumentLines.forEach(element => {
      DocLines.push({
        Quantity:element.Quantity,
        FreeText:element.FreeText
      })
    })
    body['Comments'] = CommentsValue
    body['DocumentLines'] = DocLines
    body['AttachmentEntry'] =attachmentresponse
    console.log(body)
 console.log(HeaderData.DocEntry, body)
    Patch(HeaderData.DocEntry, body)
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      console.log(getvalues);
      submitO()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatchOrders()
    }
  }
  const submitO = async () => {
    
    console.log("SearchDocumentLines",SearchDocumentLines)
    let DocLines = []
    let docLines2 = []
    let body = {}
    var filtered = seletedBatchnumber2.filter(function (el) {
      return el == el.length == 0
    });
    console.log("filtered",filtered)
    if(valuechacker){
      console.log("AAAAAA")
      filtered.forEach(Docelement => {
        Docelement.forEach(Docelement2 => {
          console.log("Docelement2",Docelement2)
         docLines2.push({
               Quantity: Docelement2.SelectedQty,
               BaseLineNumber: Docelement2.BaseLineNumber,
               ItemCode: Docelement2.ItemCode,
               SystemSerialNumber: Docelement2.SysNumber,
               BatchNumber: Docelement2.DistNumber,
         })
       })
       })
    SearchDocumentLines.forEach(item => {
      DocLines.push({
        BaseType: 202,
        BaseEntry: item.DocumentAbsoluteEntry,
        BaseLine:item.LineNumber,
        BatchNumbers: docLines2.filter(function(i){ return i.ItemCode === item.ItemNo; }),
        // "U_Sec_UM_No": "31.0",
        // "U_markline": null,
        // "U_mtrsize": null,
        // "U_cylcolor": null,
        // "U_prtmethod": null,
        // "U_mtr": null,
        // "U_cylstatus": null,
        // "U_OpenQty": null,
      })
    // body['DocDueDate'] = DueDate
    // body['DocDate'] = getDocDate
    // body['TaxDate'] = getTaxDate
    body['DocumentLines'] = DocLines
    body['PostingDate'] = getvalues.DocDate
    body['ItemNo'] = getvalues.ProductNo
    body['ProductDescription'] = getItemsnumber
    body['HFGF'] = getItemsnumber
})
 }
 else{
 SearchDocumentLines.forEach(item => {
  DocLines.push({
    BaseType: 202,
    BaseEntry: item.DocumentAbsoluteEntry,
    BaseLine:item.LineNumber,
        // "U_Sec_UM_No": "31.0",
        // "U_markline": null,
        // "U_mtrsize": null,
        // "U_cylcolor": null,
        // "U_prtmethod": null,
        // "U_mtr": null,
        // "U_cylstatus": null,
        // "U_OpenQty": null,
  })
//   body['DocDueDate'] = DueDate
// body['DocDate'] = getDocDate
// body['TaxDate'] = getTaxDate
body['DocumentLines'] = DocLines
body['PostingDate'] = getvalues.DocDate
body['ItemNo'] = getvalues.ProductNo
body['ProductDescription'] = getItemsnumber
body['HFGF'] = getItemsnumber
 })
 }
console.log("body",JSON.stringify(body))
// let cook = await localStorage.getItem('cookie')
// if (cook) {
//   await axios
//     .post(API_TYPES.POST, {
//       body: JSON.stringify(body),
//       api: LINKS.sap.Production.PostIssueForProduction,
//       cookie: cook
//     })
//     .then(function (res) {
//       console.log(res)
//       if (res.data.DocNum) {
//         alert.success('Form Submitted Sucessfully')
//         // window.location.reload();
//       } else {
//         alert.error(JSON.stringify(res.data.error.message))
//       } 
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }
  }
  const getseriesvaluefunction = async (e) =>{
    console.log(e.label)
    setgetseriesvalue(e.value)
    setgetnextnumber(e.item.NextNumber)
  }
  const ActiveUser = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveUsers,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.UserCode,
              label: element.UserCode + ' : ' + element.UserName
            })
          })
          setMaUser(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleSubmitted = ({ res, fields,Dropdown, form }) => {
    form.reset() 
    Dropdown.reset()
  }
  const priceFunc = (e, index) => {
    let doclines = PQDocumentLines;
    const value = e.target.value
    doclines[index]['PriceAfterVAT'] = (value - (value * doclines[index].DiscountPercent) / 100);
    doclines[index]['GrossPriceAfterDisc'] = (doclines[index].PriceAfterVAT + doclines[index].GrossPrice);
    doclines[index]['UnitPrice'] = value;
    setPQDocumentLines(doclines);
    let sum = 0
    PQDocumentLines.forEach(element => {
      sum = sum + element.PriceAfterVAT
    });
    setTotalbforeDiscount(sum)
  }
  const QuantityFun = (e,index) => {
    let doclines = PQDocumentLines;
    doclines[index]['Total_LC'] = (doclines[index].PriceAfterVAT * doclines[index].RemainingOpenQuantity);
    console.log(doclines[index].PriceAfterVAT * doclines[index].RemainingOpenQuantity);
    setPQDocumentLines(doclines);
  }
  // const onFreightChanged = (e, index, name) => {
  //   let itemDetail = PQDocumentLines
  //   itemDetail[index]['FreightLC'] = e.target.value
  //   setPQDocumentLines(itemDetail)
  //   console.log(itemDetail);
  //   let sum = 0
  //   PQDocumentLines.forEach(element => {
  //     sum = sum + element.FreightLC
  //   });
  //   setTotalFreight(sum)
  // }
  const FreightDropDownOnChange = (selectedItem, index, name) => {
    // let taxcodeDetai=TaxCode.find(o => o.value === selectedItem.value);
    console.log(selectedItem)
    let itemDetail = PQDocumentLines
    itemDetail[index]['Freight'] = selectedItem.value
    console.log(selectedItem.value);
  }
  const getPrice = async e => {
    setTotal(Price - (Price * Discount) / 100)
  }
  const getTotalPrice = async e => {
    setTotalGross(Tax + total)
  }
  const TotalPaymentDue = async e => {
    setTotalPayment(totalbforeDiscount - DiscountTotal + BottomTax)
  }
  const DiscountPercentage = async e => {
    setDiscountTotal(total * BottomDiscount / 100)
  }

  const [modalOne,setModalOne]=React.useState();
  const [modalTwo,setModalTwo]=React.useState();
 
const handleClosee = () => setModalOne(false);
const handleCloseee = () => setModalTwo(false);


function handleShowModalOne() {
    setModalOne("modal-one");
  }

  const handleShowModalTwo = () => {
    setModalTwo ("modal-two")
  }

  const checkboxSelect = (item,index) => {
    console.log(item.isSelected,index)
    let checkboxValue = null
    if(item.isSelected){
      checkboxValue = false
    }
    else{
      checkboxValue = true
    }
    let prData = PrRe
    console.log(prData)
    prData[index]['isSelected'] = checkboxValue
    setPQDocumentLines(prData);
    console.log(prData)
    
  }
  const docLineSelectedSwitch=(PrReIndex,item,index)=>{
    
    let checkboxValue = null
    if(item.isSelected){
      checkboxValue = false
    }
    else{
      checkboxValue = true
    }
    let prData = PQDocumentLines
    prData[PrReIndex].DocumentLines[index]['isSelected'] = checkboxValue;
    setPQDocumentLines(prData);
    console.log(prData)
  }
  const getbatchnumberdata = async(item) =>{
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `Items?$filter=ItemCode eq '${item.ItemNo}' and ManageBatchNumbers eq 'tYES'`
    console.log("SAPAPI",SAPapi)
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setgetbatchnumbers(res.data.value)
        // setShow3(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const selectrow = async items => {
    PQDocumentLines.forEach(element => {
      element.PQDocumentLines.forEach(docElement => {
        if(docElement.isSelected){
          setSelectShow(docElement)
        console.log(docElement)
        }
      });
    });
  }
  const netTotalFunc = (e, index,PrReIndex,item) => {
    let doclines = PQDocumentLines;
    const value = e.target.value
    doclines[PrReIndex].DocumentLines[index]['PriceBeforeVat'] =  (doclines[PrReIndex].DocumentLines[index].UnitPrice * doclines[PrReIndex].DocumentLines[index].Quantity)
   
    setPQDocumentLines(doclines);
    console.log(doclines);
    let sum = 0
    let sum1 = 0
    PQDocumentLines.forEach(element => {
      if( element.isSelected ){
        element.DocumentLines.forEach(item => {
          if( item.isSelected && item.LineStatus === "bost_Open" ){
            console.log(item);
            sum = sum + item.PriceBeforeVat
           }
     setTotalbforeDiscount(sum)
    console.log("sum")
    console.log(sum)
  });
}
})
  }
  const getvaluesformula = () =>{
    let sum=0
    let sum1=0
    PQDocumentLines.forEach(element => {
      if (element.isSelected) {
        element.DocumentLines.forEach(item => {
          if (item.isSelected && item.LineStatus === 'bost_Open') {
            console.log(item);
            sum = sum + item.LineTotal
            sum1 = sum1 + item.TaxTotal
          }
          console.log('sum1')
          console.log(sum1);
           console.log('sum')
          console.log(sum);
          setTotalbforeDiscount(sum)
          setTotalTaxRate(sum1)
        })
      }
    })
    
      }
      const ActiveCustomer = async (cookie, e) => {
        // -------------------------    Items API GET DATA   ------------------------------------------------------
        await axios
          .post(API_TYPES.GET, {
            api: LINKS.sap.MasterData.ActiveCustomer,
            cookie: cookie
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
              setMaCustomer(ItemsDropDown)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      const itemsChange = (e, index) => {
        let obj = selectedItems
        obj[index].detail[e.target.name] = e.target.value
        obj[index].detail["TaxRate"] = 0 
        obj[index].detail["PriceAfterVAT"] = obj[index].detail["UnitPrice"] 
        obj[index].detail["LineTotal"] = obj[index].detail.PriceAfterVAT * obj[index].detail.RequiredQuantity
        obj[index].detail["TaxAmount_LC"] = (obj[index].detail["PriceAfterVAT"] * (obj[index].detail["RequiredQuantity"] * obj[index].detail["TaxRate"]) / 100)
       
        obj[index].detail[`ùpdate${update+1}`]= update+1;
        setUpdate(update+1);
        console.log(obj)
        let sum = 0
        let sum1 = 0
        let sum2 = 0
        obj.forEach(element => {
           sum= sum + element.detail.LineTotal
           sum1= sum1 + element.detail.TaxRate
           sum2= sum2 + element.detail.Freight
             })
              setTotalbforeDiscount(sum)
              setTotalTaxRate(sum1)
              setTotalFreight(sum2)
        setSelectedItems(obj)
        if(e.target.name === 'QuotedQuantity'){
          discountFormula(e, index)
        }
        else if(e.target.name === 'DiscountPercent'){
          itemsChange22(e, index)
        }
      }
      const getqauntityfromtable = (e, index) => {
        let itemDetail = SearchDocumentLines
        itemDetail[index][e.target.name] = e.target.value
        setSearchDocumentLines(itemDetail)
      }
      const getdropdowntqauntityfromtable = (e, index,name) => {
        let itemDetail = SearchDocumentLines
        itemDetail[index][name] = e.value
        setSearchDocumentLines(itemDetail)
      }
      const ObjectTypePaymentInvoices = async (docnum) => {
        console.log(docnum)
        let sapAPi = `ProductionOrders?$filter=DocumentNumber eq '${docnum}'`
        let cook = await localStorage.getItem('cookie')
        await axios
          .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
          .then(function (res) {
            console.log(res)
            setInvoicesHeaderData(res.data.value[0])

            setInvoicesLines(res.data.value[0].ProductionOrderLines)
            // let sum=0
            // res.data.value[0].DocumentLines.forEach(element => {
            //     sum = sum + element.LineTotal
            // })
            // setinvoiceTotalAmount(sum)
            // if (HeaderData !== '') {
            //   setButtonName('Update')
            // }
          })
          .catch({})
        setShow4(true)
       
      }


      const getvaluefunction = async (e) => {
        setgetItemsnumber(e.item.ItemName)
       
      }
      const itemsChange22 = (e, index) => {
        let obj = selectedItems
        obj[index].detail["PriceAfterVAT"] = (obj[index].detail["UnitPrice"] - (obj[index].detail["UnitPrice"] * obj[index].detail["DiscountPercent"]) / 100)
        obj[index].detail[`ùpdate${update+1}`]= update+1;
        setUpdate(update+1);
        let sum = 0
        let sum1 = 0
        let sum2 = 0
        obj.forEach(element => {
           sum= sum + element.detail.LineTotal
           sum1= sum1 + element.detail.TaxRate
           sum2= sum2 + element.detail.Freight
             })
              setTotalbforeDiscount(sum)
              setTotalTaxRate(sum1)
              setTotalFreight(sum2)
        setSelectedItems(obj)
      }
      const DocLinesDropDownOnChange22 = (selectedItem, index, name) => {
         let obj = selectedItems
        obj[index].detail["TaxRate"] = selectedItem.item.VatGroups_Lines[0].Rate
        obj[index].detail["LineTotal"] = obj[index].detail.PriceAfterVAT * obj[index].detail.RequiredQuantity + obj[index].detail.TaxRate
        obj[index].detail['TaxAmount_LC'] =
        (obj[index].detail.PriceAfterVAT *
        obj[index].detail.RequiredQuantity *  obj[index].detail.PriceAfterVAT)/100 
    
        obj[index].detail[`ùpdate${update+1}`]= update+1;
        setUpdate(update+1);
        let sum = 0
        let sum1 = 0
        let sum2 = 0
        obj.forEach(element => {
           sum= sum + element.detail.LineTotal
           sum1= sum1 + element.detail.TaxRate
           sum2= sum2 + element.detail.Freight
             })
              setTotalbforeDiscount(sum)
              setTotalTaxRate(sum1)
              setTotalFreight(sum2)
      }
      const getDropdownListWithValue = (list, label, value) => {
        let ItemsDropDown = []
        list.forEach(element => {
          ItemsDropDown.push({
            value: element[value],
            label: element[value] + ' : ' + element[label],
            detail: element
          })
        })
        return ItemsDropDown;
      }
      const discountFormula = (e, index) => {
        let obj = selectedItems
        obj[index].detail[e.target.name] = e.target.value
        setSelectedItems(obj)
      }
      const ItemsDropDownfunc = async (selectedList,e) => {  
        setSelectedItems(selectedList)
       }
       const getitemsvaluefunction = async (e,index,name) =>{
        // console.log("e.item.ItemName",e.item.ItemName)
        // console.log("name",name)
        console.log("ItemsDetails",ItemsDetails)
        let obj = ItemsDetails
        obj[e.value][name]=e.value
        // obj[index]["ItemDescription"]=e.item.ItemName
    
        // setItemsDetails
        console.log("obj",obj)
        // setUoMLable(e.item.PurchaseUnit)
        // setTabLable(e.item.ItemName)
       
    
        // setgetItemsnumber(e.item.ItemName)
      } 
      const valuechangefunction = (e) =>{
        let obj = getvalues
        obj[e.target.name]=e.target.value
        setgetvalues(obj)
        console.log(obj)
      }
      const getdropdownvalue = (e, name) => {
        let obj = getvalues
        obj[name] = e.value
        // console.log("name",name)
        // console.log("e.value",e.value)
        setgetvalues(obj)
        // console.log(obj);
      }
      const modalshow = (item,index) =>{
        let Batchlines = []
        console.log("SearchDocumentLines",SearchDocumentLines)
        console.log("BatchNumberQuantityData",BatchNumberQuantityData.sort((a, b) => b.ItemCode > a.ItemCode ? -1 : 1))
        SearchDocumentLines.forEach(element => {
          BatchNumberQuantityData.forEach(docElement => {
              if(element.ItemNo === docElement.ItemCode  && element.Warehouse === docElement.WhsCode){
              Batchlines.push({
                BaseLineNumber:index,
                AbsEntry: docElement.AbsEntry,
                ItemCode: docElement.ItemCode,
                MdAbsEntry: docElement.MdAbsEntry,
                Quantity: docElement.Quantity,
                SysNumber: docElement.SysNumber,
                WhsCode: docElement.WhsCode,
              })
            }
        });
    })
    setShow3(true)
    whsecodematching(Batchlines,item)
  }
    const whsecodematching = async (Batchlines,item) => {
    
      let Batchlines2 = []
      Batchlines.forEach(element => {
        BatchNumbersData.forEach(docElement => {
          if(element.ItemCode === docElement.ItemCode && element.SysNumber === docElement.SysNumber){
            Batchlines2.push({
              BaseLineNumber:element.BaseLineNumber,
              DistNumber:docElement.DistNumber,
              AbsEntry: element.AbsEntry,
              ItemCode: element.ItemCode,
              MdAbsEntry: element.MdAbsEntry,
              Quantity: element.Quantity,
              SysNumber: element.SysNumber,
              WhsCode: element.WhsCode,
            });
          }
       });
      });
      console.log("Batchlines2",Batchlines2)
      itemcodematching(Batchlines2,item)
    }
    const itemcodematching = async (Batchlines2,item) => {
    let docline = []
    Batchlines2.forEach(element => {
      if(element.ItemCode === item.ItemNo){
        docline.push({
          BaseLineNumber:element.BaseLineNumber,
          DistNumber:element.DistNumber,
          AbsEntry: element.AbsEntry,
          ItemCode: element.ItemCode,
          MdAbsEntry: element.MdAbsEntry,
          Quantity: element.Quantity,
          SysNumber: element.SysNumber,
          WhsCode: element.WhsCode,
        })
      }
    })
    setseletedBatchnumber(docline)
    setShow33(true)
    }
    const getBatchNumbersfromAPI = async (cook) => {
      let sapAPi = `SQLQueries('BatchNo')/List`
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          console.log("getBatchNumbersfromAPI",res.data.value)
          setBatchNumbersData(res.data.value)
        })
        .catch({})
    }
      const getvaluefrombatchtable = (e,index,PrReIndex) =>{
        let itemDetail = seletedBatchnumber
        itemDetail[index][e.target.name] = e.target.value
          // itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value
        setTimeout(function(){ getfinalvaluefromtable(itemDetail) }, 4000);
      }
      const getfinalvaluefromtable = (itemDetail) =>{
        setseletedBatchnumber2([...seletedBatchnumber2,itemDetail])
        setvaluechacker(itemDetail)
      }

      const getNodropdownvalue = (e, name) => {
        let obj = getvalues
        obj[name] = e.value
        // console.log("name",name)
        console.log("e.value",e.value)
        setgetvalues(obj)
        // console.log(obj);
      }
  return (
    <>
      <Navbar 
      setgetserviceseries={setgetserviceseries}
       getdocumenttype={getdocumenttype}
       ModuleName={ModuleName}
       HeaderData={HeaderData}
       getdocumentname={getdocumentname}/>
      {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <h1 style={{ textAlign: 'center' }}>Issue for Production</h1>
<Form onSubmit={handleSubmitted}>
      <CardGroup>
        <DIV3>
          <Container fluid>
        
             <div style={{}}>
              <label>No.</label>
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
                <Select
                  // placeholder={HeaderData && HeaderData.RequesterName}
                  options={getserviceseries} // Options to display in the dropdown
                  onChange={e => { getseriesvaluefunction(e); getNodropdownvalue(e, 'SeriesValue') }} // Function will trigger on select event
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
             <Modal
        show={show33}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
      >
       <Modal.Header closeButton>
          <Modal.Title>Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {seletedBatchnumber && (
              <Table responsive striped bordered hover>
                <TableHead>
                <tr>
                  <th>#</th>
                  <th>Batch Number</th>
                  <th>Item Code</th>
                  <th>Whse Code</th>
                  <th>Quantity</th>
                  <th>Selected Quantity</th>
                  <th>BaseLine Number</th>
                </tr>
                </TableHead>
                <tbody>
                  {seletedBatchnumber.map((item, index) => (
            
                        <tr key={`${index}`}>
                          <TD>{index + 1}</TD>
                          <TD>
                    <div style={{ width: '11rem'  }}>
                <input
                  type='text'
                  name='DistNumber'
                  readOnly
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={item.DistNumber}
                  // onChange={e => {
                  //   getvaluefrombatchtable(e, index)
                  // }}
                />
              </div>
                    </TD>
                   <TD>
                    <div style={{ width: '11rem'  }}>
                <input
                  type='text'
                  name='ItemCode'
                  readOnly
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={item.ItemCode}
                  // onChange={e => {
                  //   getvaluefrombatchtable(e, index)
                  // }}
                />
              </div>
                    </TD>
                    <TD>
                    <div style={{ width: '11rem'  }}>
                <input
                  type='text'
                  name='WhsCode'
                  class='form-control'
                  readOnly
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={item.WhsCode}
                  // onChange={e => {
                  //   getvaluefrombatchtable(e, index)
                  // }}
                />
              </div>
                    </TD>
                    <TD>  <div style={{ width: '11rem'  }}>
                <input
                  type='number'
                  name='Quantity'
                  class='form-control'
                  id='exampleInputEmail1'
                  readOnly
                  aria-describedby='emailHelp'
                  defaultValue= {item.Quantity}
                  // onChange={e => {
                  //   getvaluefrombatchtable(e, index)
                  // }}
                />
              </div></TD>
                    <TD>  <div style={{ width: '11rem'  }}>
                <input
                  type='number'
                  name='SelectedQty'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  onChange={e => {
                    getvaluefrombatchtable(e,index)
                  }}
                />
              </div></TD>
              <TD>  <div style={{ width: '11rem'  }}>
                <input
                  type='number'
                  name='SelectedQty'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={item.BaseLineNumber}
                  // onChange={e => {
                  //   getvaluefrombatchtable(e, index)
                  // }}
                />
              </div></TD>
            
                        </tr>
                  ))}
                </tbody>
              </Table>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose3}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
           <br/><br/>
            <Button variant='primary' onClick={handleShow}>
              Production Order
              </Button>
              <Modal show={show} onHide={handleClose} className="Modal-big" size="lg">
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Open Production Order List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {PrRe && (
                  <Table responsive>
                    <TableHead>
                      <tr>
                        <th>#</th>
                        <th>Document No.</th>
                        <th>Production Order Type</th>
                        <th>Due Date</th>
                        <th>Product No.</th>
                        <th>Product Description</th>

                      </tr>
                    </TableHead>
                    <tbody>
                      {PrRe.map((item, index) => (
                        <tr key={`${index}`} onClick={e => {
                            selectPR(item)
                            handleClose()
                          }}>
                           <TD>
                  {index + 1}
                </TD>
                          <TD>{item.DocumentNumber}</TD>
                          <TD>{item.ProductionOrderType}</TD>
                          <TD>{item.DueDate}</TD>
                          <TD>{item.ItemNo}</TD>
                          <TD>{item.ProductDescription}</TD>

                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Modal.Body>

              <Modal.Footer>
              <Button variant='secondary'  onClick={()=>{handleShowModalTwo();handleClose()}}>
                  Choose
                  </Button>
                <Button variant='primary' onClick={handleClose}>
                  Cancel
          </Button>
              </Modal.Footer>
            </Modal>
<Modal show={modalTwo === "modal-two"} className="Modal-big" size="lg">
<Modal.Title id="example-modal-sizes-title-lg">List of Purchase Quotations</Modal.Title>
<Modal.Body>
<Table responsive striped bordered hover>
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
              <tbody>
                {PQDocumentLines && PQDocumentLines.map((PrReItem, PrReIndex) => (
              PrReItem.isSelected && 
              PrReItem.DocumentLines.map((item, index) => (
                  item.LineStatus === "bost_Open" &&
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
                    <TD> </TD>
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
                          // onChange={e => {
                          //   ontextChanged(e, index)
                          // }}
                        />
                      </div>
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='QuotedQty'
                          readOnly="readOnly"
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
                            ShipDateChange(e, index)
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
                              DocLinesDropDownOnChange(e, index, 'WarehouseCode')
                            }}
                            // onSelect={CostCentre} // Function will trigger on select event
                            // onRemove={CostCentre} //Function will trigger on remove event
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        )}
                      </div>
                    </TD>
                    <TD>
                    {item.UnitPrice}
                    </TD>
                    <TD>
                    {item.DiscountPercent}
                    </TD>
                    <TD>
                    {item.Price}
                    </TD>
                    <TD>
                    <div style={{ width: '14rem' }}>
                        <Select
                                            menuPortalTarget={document.body}
                        // disabled={true}
                          placeholder= {item.VatGroup+"  : "+item.TaxPercentagePerRow+"%"}
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
                    <TD>
                     {item.TaxTotal}
                    </TD>
                    <TD>
                    {item.GrossTotalSC}
                    </TD>
                    <TD>
                    <div style={{ width: '14rem' }}>
                        <Select
                                            menuPortalTarget={document.body}
                         // placeholder= {item.DocumentLineAdditionalExpenses[0].ExpenseCode || "null"}
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
                    <TD>
                    {item.LineTotal}
                    </TD>
                    <TD>
                   {item.GrossTotal}
                    </TD>
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
                          placeholder=  {item.SalesPersonCode}
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
                          placeholder=   {item.CostingCode}
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
                ))
                ))}
              </tbody>
            </Table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={()=>{getvaluesformula();handleCloseee()}}>
    Choose
  </Button>
    </Modal.Footer>
  </Modal>

  <Modal
              show={show4}
              onHide={handleClose4}
              className='Modal-big'
              size='lg'
            >
              <Modal.Header closeButton>
                <Modal.Title id='example-modal-sizes-title-lg'>
  
      {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <h1 style={{ textAlign: 'center' }}>Production Order</h1>
      <Form onSubmit={handleSubmitted}>
        <CardGroup>
          <DIV3>
            <Container fluid>
              <label>Type</label>
              <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
                <Select
                  options={[
                    { value: "bopotStandard", label: "Standard" },
                    { value: "bopotSpecial", label: "Special" },
                    { value: "bopotDisassembly", label: "Disassembly" },
                    // { value: "4", label: "Template" }
                  ]} // Options to display in the dropdown
                 
                  onChange={e => {
                    getdropdownvalue(e, 'Type')
                  }}
                  // op
              placeholder={InvoicesHeaderData && InvoicesHeaderData.ProductionOrderType}
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <label>Status</label>
              <div style={{ width: '23.5rem', height: 'auto' }} variant='primary'>
                <Select
                  // placeholder={HeaderData && HeaderData.CardCode}
                  options={[
                    { value: "boposPlanned", label: "boposPlanned" },
                    // { value: "4", label: "Template" }
                  ]}
                 
                  onChange={e => {
                    getdropdownvalue(e, 'Status')
                  }}
                  placeholder={InvoicesHeaderData && InvoicesHeaderData.ProductionOrderStatus}

                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>

              {getcopyfromdoctype ? (
                <Button variant='primary' onClick={handleShow}>
                  Copy From
                </Button>) : null}
              <Modal show={show} onHide={handleClose} className="Modal-big" size="lg">
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">Open Quotations List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {PrRe && (
                    <Table responsive>
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Document No.</th>
                          <th>Vendor Code</th>
                          <th>Vendor Name</th>
                          <th>Posting Date</th>
                        </tr>
                      </TableHead>
                      <tbody>
                        {PrRe.map((item, index) => (
                          <tr key={`${index}`} >
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
                  <Button variant='secondary' onClick={() => { handleShowModalTwo(); handleClose() }}>Choose</Button>
                  <Button variant='primary' onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={modalTwo === "modal-two"} onHide={handleClose} className="Modal-big" size="lg">
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">Open Quotations List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Table responsive striped bordered hover>
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
                        <th>Whse</th>
                        <th>Unit Price</th>
                        <th>Project</th>
                        {/* <th>Buyer</th> */}
                        <th>Cost Centre</th>
                      </tr>
                    </TableHead>
                    <tbody>
                      {PQDocumentLines && PQDocumentLines.map((PrReItem, PrReIndex) => (
                        PrReItem.isSelected &&
                        PrReItem.DocumentLines.map((item, index) => (
                          item.LineStatus === "bost_Open" &&
                          <tr key={`${index}`}>
                            <TD>{index + 1}
                              <input
                                type='checkbox'
                                onChange={() => { docLineSelectedSwitch(PrReIndex, item, index) }}
                                checked={item.isSelected}
                              />
                            </TD>
                            <TD>
                            </TD>
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
                                // onChange={e => {
                                //   ontextChanged(e, index)
                                // }}
                                />
                              </div>
                            </TD>
                            <TD>
                              <div style={{ width: '14rem', height: 'auto' }}>
                                <input
                                  type='number'
                                  name='QuotedQty'
                                  readOnly="readOnly"
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
                                  // onChange={e => {
                                  //   ShipDateChange(e, index)
                                  // }}
                                  value={item.ShipDate}
                                />
                              </div>
                            </TD>
                            {/* <TD>{item.RemainingOpenQuantity ? OpenQty:0} </TD> */}
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
                                    // onChange={e => {
                                    //   DocLinesDropDownOnChange(e, index, 'WarehouseCode')
                                    // }}
                                    // onSelect={CostCentre} // Function will trigger on select event
                                    // onRemove={CostCentre} //Function will trigger on remove event
                                    displayValue='name' // Property name to display in the dropdown options
                                  />
                                )}
                              </div>
                            </TD>
                            <TD>
                              {item.UnitPrice}
                            </TD>
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
                            {/* <TD>
                    <div style={{ width: '14rem' }}>
                        <Select
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
                    </TD> */}
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
                        ))
                      ))}
                    </tbody>
                  </Table>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => { getvaluesformula(); handleCloseee() }}>
                    Choose
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={show1} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Open Quotations List</Modal.Title>
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
                          <th>Vendor Code</th>
                          <th>Posting Date</th>

                        </tr>
                      </TableHead>
                      <tbody>
                        {ModalHeaderData.map((item, index) => (
                          <tr key={`${index}`} onClick={e => {
                            console.log(item)
                            selectPR2(item)
                            handleClose2()
                          }}>
                            <TD>
                              {index + 1}

                            </TD>
                            <TD>{item.DocumentStatus === "bost_Open" ? (<p style={{ background: 'gray', color: 'white' }}>Open</p>) : item.DocumentStatus === "bost_Close" ? (<p style={{ background: 'red', color: 'white' }}>Closed</p>) : null}</TD>

                            <TD>{item.DocNum}</TD>
                            <TD>{item.DocEntry}</TD>
                            <TD>{item.CardCode}</TD>
                            <TD>{item.DocDate}</TD>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  {/* <Button variant='secondary' onClick={handleClose2}>
                    Close
                  </Button>
                  <Button variant='primary' onClick={handleClose2}>
                    Cancel
                  </Button> */}
                </Modal.Footer>
              </Modal>


              <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
                <label>Product No.</label>
                <Select
                 placeholder={InvoicesHeaderData && InvoicesHeaderData.ItemNo}
                  options={ItemsDropDown} // Options to display in the dropdown
                  onChange={(e) => {getitemsvaluefunction(e); getresponcefromapi(e.value); getdropdownvalue(e, 'ProductNo')  }} // Function will trigger on select event
                  // onRemove={BusinessPartners} Function will trigger on remove event
                
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Product Description  </label>
                <input
                  value={getItemsnumber}
                  type='text'
                  readOnly
                  name='ProductDescription'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder={InvoicesHeaderData && InvoicesHeaderData.ProductDescription}
          
                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Planned Quantity</label>
                <input
                  value={InvoicesHeaderData && InvoicesHeaderData.PlannedQuantity}
                  type='text'
                  name='PlannedQuantity'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  class='form-control'
                  id='exampleInputEmail1'
                  // aria-describedby='emailHelp'
                  // placeholder={HeaderData && HeaderData.NumAtCard}
                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Warehouse</label>
              
                <Select
                  // placeholder={HeaderData && HeaderData.CardCode}
                  options={PrWhse} // Options to display in the dropdown
                  onChange={(e) => {
                    getdropdownvalue(e, 'Warehouse')
                  }} 
                  placeholder={InvoicesHeaderData && InvoicesHeaderData.Warehouse}

                  displayValue='name' // Property name to display in the dropdown options
                  // value={getvalues && getvalues.Warehouse}
                />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Priority</label>
                <input
                  value={InvoicesHeaderData && InvoicesHeaderData.Priority}
                 
                  type='text'
                  name='Priority'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
            
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  // placeholder={HeaderData && HeaderData.NumAtCard}
                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Routing Date Calculation</label>
                <input
                  type='text'
                  name='RoutingDateCalculation'
                  onChange={e => {
                    valuechangefunction(e.value)
                  }}
                  readOnly
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  value={InvoicesHeaderData && InvoicesHeaderData.RoutingDateCalculation}

                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>UoM Name</label>
                <input
                  readOnly
                  type='text'
                  name='UoMName'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  value={UoMLable||InvoicesHeaderData && InvoicesHeaderData.InventoryUOM}

                ></input>
              </div>

              <br />
              <div style={{ width: '23.5rem', height: 'auto' }}>
                {getdirectdoctype ? (
                  <>
                    <label>Select Items</label>
                    <Select
                      placeholder='Select..'
                      isMulti
                      options={itemsDropdownList}
                      onChange={e => { ItemsDropDownfunc(e) }}
                      displayValue='name' // Property name to display in the dropdown options
                    />
                  </>
                ) : null}
              </div>
            </Container>
          </DIV3>
          <DIV4>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }} variant='primary' >
              <label>Finished Goods</label>
              <Select
                placeholder='Select'
                options={ItemsDropDown} // Options to display in the dropdown
                onChange={e => { getvaluefunction(e);getdropdownvalue(e, 'FinishedGoods') }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                // onChange={e => {
                //   getdropdownvalue(e, 'Priority')
                // }} 
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }} variant='primary' >
              <label>Sales Order Qty</label>
              <Select
                placeholder='Select'
                options={ItemsDropDown} // Options to display in the dropdown
                onChange={e => { getvaluefunction(e); getdropdownvalue(e, 'SalesOrderQty') }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }} variant='primary' >
              <label>Customer Name</label>
              <Select
                placeholder='Select'
                options={ItemsDropDown} // Options to display in the dropdown
                onChange={e => { getvaluefunction(e) ;getdropdownvalue(e, 'CustomerName') }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
              <label>Weight</label>
              <input
                type='text'
                name='Weight'
                onChange={e => {
                  valuechangefunction(e)
                }}
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder={HeaderData && HeaderData.NumAtCard}
              ></input>
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }} variant='primary' >
              <label>Priority</label>
              <Select
                placeholder='Select'
                options={[
                    { value: "Low", label: "Low" },
                    { value: "Moderate", label: "Moderate" },
                    { value: "High", label: "High" },
                    
                    // { value: "4", label: "Template" }
                  ]} // Options to display in the dropdown
                onChange={e => { getdropdownvalue(e, 'U_Priority') }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }} variant='primary' >
              <label>Warehouse Name</label>
              <input
                value={WarehouseName}
                type='text'
                name='WarehouseName'
                onChange={e => {
                  valuechangefunction(e)
                }} readOnly
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder={HeaderData && HeaderData.NumAtCard}
              ></input>
              {/* <Select
                placeholder='Select'
                options={ItemsDropDown} // Options to display in the dropdown
                onChange={e=>{getvaluefunction(e)}} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              /> */}
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
              <label>Printing Weight (Kgs)</label>
              <input
                // value={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard ? HeaderData && HeaderData.NumAtCard : null}
                type='text'
                name="PrintingWeight"
                onChange={e => {
                  valuechangefunction(e)
                }}
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                // placeholder={HeaderData && HeaderData.NumAtCard}
              ></input>
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
              <label>Laminated Weight (Kgs)</label>
              <input
                // value={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard ? HeaderData && HeaderData.NumAtCard : null}
                type='text'
                name='LaminatedWeight'
                onChange={e => {
                  valuechangefunction(e)
                }}
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                // placeholder={HeaderData && HeaderData.NumAtCard}
              ></input>
            </div>
          </DIV4>
          <DIV3>
            <Container>
              <div style={{ marginLeft: '3rem' }}>
                <label>No.</label>
                <CardGroup>
                  <br />
                  <div style={{ width: '10.5rem', height: 'auto' }} >
                    <Select
                      // placeholder={HeaderData && HeaderData.RequesterName}
                      options={getserviceseries} // Options to display in the dropdown
                      onChange={e => { getseriesvaluefunction(e); getNodropdownvalue(e, 'SeriesValue') }} // Function will trigger on select event
                      // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                  placeholder={InvoicesHeaderData && InvoicesHeaderData.Series}
                      
                      displayValue='name' // Property name to display in the dropdown options
                    />
                  </div>
                  <div style={{ width: '10.5rem', height: 'auto' }}>
                    <input
                      type='number'
                      onChange={e => {
                        valuechangefunction(e)
                      }}
                      name='NextNumber'
                      readOnly
                      value={getnextnumber}
                      placeholder={InvoicesHeaderData && InvoicesHeaderData.DocumentNumber}

                      class='form-control'
                    /> <br />
                  </div>
                </CardGroup>
              </div>
              <div className="sales"
                style={{ width: '22.5rem', height: 'auto', marginLeft: '3rem', border: '1px solid', borderColor: 'lightgray', borderRadius: '4px' }}
              >
                <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{ cursor: 'pointer' }}> <svg class="svg-icon5" viewBox="0 0 20 20">
                    <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                  </svg></a>
                <input
                  name={'SearchPRNumber'}
                  type='Number'
                  placeholder='Number'
                  class='form-control5'
                  onChange={e => {
                    setSearchNumber(e.target.value)
                  }}
                />
              </div>
              <br />
              {/* <Button
              onClick={e => {
                SearchAll_Filter_Data()
              }}
            >
              Search
            </Button><br/> */}
              {/*            
            <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
            <label>No</label>
            <input
              type='number'
              readOnly='readOnly'
              defaultValue={HeaderData && HeaderData.DocNum}
              class='form-control' />
            </div> */}


              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Order Date</label>
                <input
                  type='date'
                  name='DocDate'
                  class='form-control'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  defaultValue={InvoicesHeaderData && InvoicesHeaderData.PostingDate}
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label>Start Date</label>
                <input
                  class='form-control'
                  aria-describedby='emailHelp'
                  type='date'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  name='TaxDate'
                  defaultValue={InvoicesHeaderData && InvoicesHeaderData.StartDate }
                  />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label>Due Date</label>
                <input
                  type='date'
                  name='DocDueDate'
                  class='form-control'
                  defaultValue={InvoicesHeaderData && InvoicesHeaderData.DueDate }
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                />
              </div>
              <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }} variant='primary'>
                <label>User</label>
                <Select
                  placeholder={InvoicesHeaderData && InvoicesHeaderData.UserSignature}
                  options={MaUser} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvalue(e, 'User')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Origin</label>
                <input
                  placeholder={InvoicesHeaderData && InvoicesHeaderData.UserSignature}
                     readOnly
                  name="Origin"
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  class='form-control'
                  value='Manual'  
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Linked To</label>
                <input
                   name='LinkedTo'
                   onChange={e => {
                     valuechangefunction(e)
                   }}
                  type='text'
                  class='form-control'
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Linked Order</label>
                <input
                  value={InvoicesHeaderData && InvoicesHeaderData.ProductionOrderOriginNumber}
                  name='LinkedOrder'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  type='text'
                  class='form-control'
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Customer</label>
                <Select
                  placeholder={InvoicesHeaderData && InvoicesHeaderData.CustomerCode}
                  options={MaCustomer} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvalue(e, 'Customer')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Project</label>
                <Select
                  placeholder={InvoicesHeaderData && InvoicesHeaderData.Project}
                  options={PrProject} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvalue(e, 'Project')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
            </Container>
          </DIV3>
        </CardGroup>
        {/* Table+++++++++ */}
        <Tabs defaultActiveKey="Components" transition={false} id="noanim-tab-example1">
          <Tab eventKey="Components" title="Components">
            {InvoicesLines && (
              <Table responsive striped bordered hover>
                {Array.isArray(InvoicesLines) &&
                  InvoicesLines.length > 0 ? (
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Item No.</th>
                      <th>Item Description</th>
                      <th>Base Ratio</th>
                      <th>Planned Qty</th>
                      <th>Issued</th>
                      <th>Available</th>
                      <th>UoM Name</th>
                      <th>Warehouse</th>
                      <th>Route Sequence</th>
                      <th>Status</th>
                      <th>Item Code PU Issued</th>
                      <th>Total Chemical Cost</th>
                      <th>Perpotion Per Ink</th>
                      <th>Perpotion of Chemical</th>
                      <th>Total Combination Qty</th>
                      <th>Total Combination Cost</th>
                      <th>Combination PU Cost</th>
                      <th>Issued Method</th>
                      <th>Procurement Doc.</th>
                      <th>Allow Procuremt Doc.</th>

                    
                    </tr>
                  </TableHead>
                ) : null}
                <tbody>
                  {InvoicesLines.map((item, index) => (
                    <tr key={`${index}`}>
                      <TD>{index + 1}</TD>
                      <TD>{item.ItemType}</TD>
                      <TD>{item.ItemCode}</TD>
                      <TD>{item.ItemName}</TD>
                      <TD>{item.BaseQuantity}</TD>
                      <TD>{item.PlannedQuantity}</TD>
                      <TD>{item.IssuedQuantity}</TD>
                      <TD></TD>
                      <TD>{item.InventoryUOM}</TD>
                      <TD>{item.Warehouse}</TD>
                      <TD>{item.SequenceNumber}</TD>
                      <TD>{item.ProductionOrderStatus}</TD>
                      <TD>{item.U_InkCostPU}</TD>
                      <TD>{item.U_TotChemCost}</TD>
                      <TD>{item.U_PropInk}</TD>
                      <TD>{item.U_ChemProp}</TD>
                      <TD>{item.U_TotCombQty}</TD>
                      <TD>{item.U_TotCombCost}</TD>
                      <TD>{item.U_CombPU}</TD>
                      <TD>{item.IssueMethod}</TD>
                      <TD></TD>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {(
              <Table responsive striped bordered hover>
                {Array.isArray(PQDocumentLines) && PQDocumentLines.length > 0 ? (

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
                  {PQDocumentLines && PQDocumentLines.map((PrReItem, PrReIndex) => (
                    PrReItem.isSelected &&
                    PrReItem.DocumentLines.map((item, index) => (
                      item.isSelected &&
                      item.LineStatus === "bost_Open" &&
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
                                ontextChanged(e, index, PrReIndex)
                              }}
                            />
                          </div>
                        </TD>
                        <TD>
                          <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='number'
                              name='QuotedQty'
                              readOnly="readOnly"
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
                                ShipDateChange(e, index, PrReIndex)
                              }}
                              defaultValue={item.ShipDate}
                            />
                          </div>
                        </TD>
                        <TD>{item.RemainingOpenQuantity ? OpenQty : 0} </TD>
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
                                // onChange={e => {
                                //   DocLinesDropDownOnChange(e, index,PrReIndex, 'WarehouseCode')
                                // }}
                                // onSelect={CostCentre} // Function will trigger on select event
                                // onRemove={CostCentre} //Function will trigger on remove event
                                displayValue='name' // Property name to display in the dropdown options
                              />
                            )}
                          </div>
                        </TD>
                        <TD>
                          <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='FreeText'
                              class='form-control'
                              aria-describedby='Requesterid'
                              defaultValue={item.FreeText}
                              onChange={e => {
                                netTotalFunc(e, index, PrReIndex, item)
                              }}
                            />
                          </div>
                        </TD>
                        <TD>
                          {item.DiscountPercent}
                        </TD>
                        <TD>
                          {item.Price}
                        </TD>
                        <TD>
                          <div style={{ width: '14rem' }}>
                            <Select
                                            menuPortalTarget={document.body}
                              // disabled={true}
                              placeholder={item.VatGroup + "  : " + item.TaxPercentagePerRow + "%"}
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
                        <TD>
                          {item.TaxTotal}
                        </TD>
                        <TD>
                          {item.GrossTotalSC}
                        </TD>
                        <TD>
                          <div style={{ width: '14rem' }}>
                            <Select
                                            menuPortalTarget={document.body}
                              // placeholder= {0 || item.DocumentLineAdditionalExpenses[0].ExpenseCode }
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
                          {/* {0 ||item.DocumentLineAdditionalExpenses[0].LineTotal} */}
                        </TD>
                        <TD>
                          {item.LineTotal}
                        </TD>
                        <TD>
                          {item.GrossTotal}
                        </TD>
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
                    ))))}
                </tbody>
              </Table>
            )}
          </Tab>
          <Tab eventKey="Summary" title="Summary">
            {/* <Summary/> */}
          </Tab>
          <Tab eventKey='Attachment' title='Attachment'>
            <Attachment
              setattachmentresponse={setattachmentresponse}
            />
          </Tab>
        </Tabs>

        {/* Bottom Side+++++++++ */}
        <CardGroup>
          <DIV3>
            <Container fluid>
              <br />
              <div class="form-group" style={{ width: '23.5em', height: 'auto' }}>
                <label for="exampleFormControlTextarea1">Remarks</label>
                <textarea
                   name="Remarks"
                   onChange={e => {
                     valuechangefunction(e)
                   }}
                  value={InvoicesHeaderData && InvoicesHeaderData.Remarks}
                  type='text'
                  class='form-control rounded-0'
                  id='exampleFormControlTextarea1'
                  rows='3'
                />
              </div>
              <br />
              <br />
              <div>
                <Button
                  style={{ marginLeft: '5%' }}
                  type="reset"
                  onClick={() => {
                    Submit_PatchFunc()
                  }}
                >{ButtonName}</Button>
                <Button style={{ marginLeft: '5%' }}
                  onClick={handleClose4}>Cancel</Button>
              </div>
            </Container>
          </DIV3>
          <DIV4></DIV4>
          <DIV3>
            <br />
        
            <br />
            <br />
          </DIV3>
        </CardGroup>
      </Form>
                </Modal.Title>


                
              </Modal.Header>
              <Modal.Body>
           
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>


     
        
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV3>
          <Container>
        
          <div className="sales"
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' ,border:'1px solid',borderColor:'lightgray',borderRadius:'4px'}}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon5" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
          <input
              name={'SearchPRNumber'}
              type='Number'
              placeholder='Number'
              class='form-control5'
              onChange={e => {
                setSearchNumber(e.target.value)
              }}
            />
            </div>
            <br/>
            <div style={{ width: '23.5rem' , marginLeft: '3rem'}}>
            <label> Posting Date</label>
            <input
              type='date'
              name='DocDate'
              class='form-control'
              onChange={e => {
                    valuechangefunction(e)
                  }}
              // defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocDate||HeaderData && HeaderData.DocDate}
            />
             </div>
           
             <div style={{ width: '23.5rem' , marginLeft: '3rem'}}>
            <label> Ref.2</label>
            <input
              type='text'
              class='form-control'
              onChange={e => {
                    valuechangefunction(e)
                  }}
             name="Ref_2"
              // readOnly
              // defaultValue={ DocStatus }
            />
             </div>
          </Container>
        </DIV3>
      </CardGroup>
   
    <Tabs defaultActiveKey="Contents" transition={false} id="noanim-tab-example">
    <Tab eventKey="Contents" title="Contents">
    {FindDocumentLines && (
    <Table responsive striped bordered hover>
      { Array.isArray(FindDocumentLines) && FindDocumentLines.length>0?(
      <TableHead>
        <tr>
      <th>#</th>
      <th>Item No.</th>
      <th>Item Description</th>
      {/* <th>Batch</th> */}
      <th>Planned</th>
      <th>Quantity</th>
      {/* <th>Item Cost</th> */}
      <th>UoM Name</th>
      <th>Secondary UoM Qty</th>
      <th>Secondary UoM</th>
      <th>Order No.</th>
      <th>Whse</th>
      <th>Mark Line</th>
      <th>Material Size</th>
      <th>Cylinder Colors</th>
      <th>Printing Method</th> 
      <th>Material</th> 
      <th>Cylinder Status</th>
      <th>Open Qty</th>
        </tr>
      </TableHead>
      ):null}
      <tbody>
      {FindDocumentLines&&FindDocumentLines.map((item, index) => (
          <tr key={`${index}`}>
            <TD>{index + 1}</TD>
            <TD>{item.ItemCode}</TD>
            <TD>{item.ItemDescription}</TD>
            {/* <TD>{ItemsDetails[item.ItemNo] ? (ItemsDetails[item.ItemNo].ManageBatchNumbers === 'tYES' ? (<Button onClick={(e)=>{modalshow(item,index)}}> Batch </Button>) : null)   : null }</TD> */}
            {/* { Array.isArray(getbatchnumbers) && getbatchnumbers.length > 0?( <TD>
                    <Button onClick={(e)=>{modalshow(item,index)}}> Batch </Button>
                  </TD>) :null} */}
            {/* <TD></TD> */}
            <TD>{item.PlannedQuantity}</TD>
            <TD>
            <div style={{ width: '14rem', height: 'auto' }}>
                <input
                  type='number'
                  name='Quantity'
                  class='form-control'
                  aria-describedby='Requesterid'
                  defaultValue={item.Quantity}
                  onChange={e => {
                    getqauntityfromtable(e,index)
                  }}
                />
              </div>
            
            </TD>
            {/* <TD></TD> */}
          
            <TD>{item.UoMCode}</TD>
            <TD>{item.U_Sec_UM_No}</TD>
            <TD>{item.U_Secd_UOM}</TD>
            <TD>
            <a
          style={{ marginRight:'3%',cursor: 'pointer' }}
          onClick={() => ObjectTypePaymentInvoices(item.BaseEntry)}
        >
          {' '}
          <GrDocumentPerformance />
        </a> 
             {item.BaseEntry}
            </TD>
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
                    // onChange={e => {
                    //   DocLinesDropDownOnChange(e, index,PrReIndex, 'WarehouseCode')
                    // }}
                    // onSelect={CostCentre} // Function will trigger on select event
                    // onRemove={CostCentre} //Function will trigger on remove event
                    displayValue='name' // Property name to display in the dropdown options
                  />
                )}
              </div>
            </TD>
            <TD>
            <div style={{ width: '14rem', height: 'auto' }}>
                <input
                  type='text'
                  name='MarkLine'
                  readOnly
                  class='form-control'
                  aria-describedby='Requesterid'
                  defaultValue={item.U_markline}
                  onChange={e => {
                    getqauntityfromtable(e,index)
                  }}
                />
              </div>
            </TD>
            <TD>
            <div style={{ width: '14rem', height: 'auto' }}>
                <input
                  type='text'
                  name='MaterialSize'
                  readOnly
                  class='form-control'
                  aria-describedby='Requesterid'
                  defaultValue={item.U_mtrsize}
                  onChange={e => {
                    getqauntityfromtable(e,index)
                  }}
                />
              </div>
            </TD>
            <TD>
            <div style={{ width: '14rem', height: 'auto' }}>
                <input
                  type='text'
                  name='CylinderColors'
                  readOnly
                  class='form-control'
                  aria-describedby='Requesterid'
                  defaultValue={item.U_cylcolor}
                  onChange={e => {
                    getqauntityfromtable(e,index)
                  }}
                />
              </div> </TD>
            <TD> 
            <div style={{ width: '14rem', height: 'auto' }}>
                <input
                  type='text'
                  name='PrintingMethod'
                  readOnly
                  class='form-control'
                  aria-describedby='Requesterid'
                  defaultValue={item.U_prtmethod}
                  onChange={e => {
                    getqauntityfromtable(e,index)
                  }}
                />
              </div>
            </TD>
            <TD> <div style={{ width: '14rem', height: 'auto' }}>
                <input
                  type='text'
                  name='Material'
                  readOnly
                  class='form-control'
                  aria-describedby='Requesterid'
                  defaultValue={item.U_mtr}
                  onChange={e => {
                    getqauntityfromtable(e,index)
                  }}
                />
              </div> </TD>
          
            <TD><div style={{ width: '14rem', height: 'auto' }}>
            <Select
                                            menuPortalTarget={document.body}
                  placeholder={item.U_cylstatus}
                  options={[{label:'New - New',value:'New'},{label:'Remake - Remake',value:'Remake'},{label:'Rechrome - Rechrome',value:'Rechrome'}]} // Options to display in the dropdown
                  onChange={e => {
                    getdropdowntqauntityfromtable(e, index, 'Cly_Status')
                  }}
                  // onSelect={CostCentre} // Function will trigger on select event
                  // onRemove={CostCentre} //Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div> </TD>
              <TD> <div style={{ width: '14rem', height: 'auto' }}>
                <input
                  type='number'
                  name='OpenQty'
                  readOnly
                  class='form-control'
                  aria-describedby='Requesterid'
                  defaultValue={item.U_OpenQty}
                  onChange={e => {
                    getqauntityfromtable(e,index)
                  }}
                />
              </div></TD>
          </tr>
      ))}
      </tbody>
    </Table>
  )}
            {(
            <Table responsive striped bordered hover>
               { Array.isArray(SearchDocumentLines) && SearchDocumentLines.length>0?(
              
              <TableHead>
                <tr>
              <th>#</th>
              <th>Item No.</th>
              <th>Item Description</th>
              <th>Batch</th>
              <th>Avail</th>
              <th>Planned</th>
              <th>Issued</th>
              <th>Item Cost</th>
              <th>Quantity</th>
              <th>UoM Name</th>
              <th>Secondary UoM Qty</th>
              <th>Secondary UoM</th>
              <th>Order No.</th>
              <th>Whse</th>
              <th>Mark Line</th>
              <th>Material Size</th>
              <th>Cylinder Colors</th>
              <th>Printing Method</th> 
              <th>Material</th> 
              <th>Cylinder Status</th>
              <th>Open Qty</th>
                </tr>
              </TableHead>
                ):null}
              <tbody>
              {SearchDocumentLines && SearchDocumentLines.map((item, index) => (
                  <tr key={`${index}`}>
                    <TD>{index + 1}</TD>
                    <TD>{item.ItemNo}</TD>
                    <TD>{item.ItemName}</TD>
                    <TD>{ItemsDetails[item.ItemNo].ManageBatchNumbers === 'tYES' ? <Button onClick={(e)=>{modalshow(item,index)}}> Batch </Button> : null }</TD>
                    {/* { Array.isArray(getbatchnumbers) && getbatchnumbers.length > 0?( <TD>
                            <Button onClick={(e)=>{modalshow(item,index)}}> Batch </Button>
                          </TD>) :null} */}
                    <TD></TD>
                    <TD>{item.PlannedQuantity}</TD>
                    <TD>{item.IssuedQuantity}</TD>
                    <TD></TD>
                    <TD> <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='Quantity'
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.FreeText}
                          onChange={e => {
                            getqauntityfromtable(e,index)
                          }}
                        />
                      </div></TD>
                    <TD>{item.UoMCode}</TD>
                    <TD>{item.UoMCode}</TD>
                    <TD>{item.UoMCode}</TD>
                    <TD>
                    <a
                  style={{ marginRight:'3%',cursor: 'pointer' }}
                  onClick={() => ObjectTypePaymentInvoices(item.DocumentAbsoluteEntry)}
                >
                  {' '}
                  <GrDocumentPerformance />
                </a> 
                     {item.DocumentAbsoluteEntry}
                    </TD>
                    <TD>
                    <div style={{ width: '15em' }}>
                        {PrWhse && (
                          <Select
                          menuPortalTarget={document.body}
                            value={PrWhse.filter(
                              option => option.value === item.Warehouse
                            )}
                            placeholder='Select..'
                            options={PrWhse} // Options to display in the dropdown
                            // onChange={e => {
                            //   DocLinesDropDownOnChange(e, index,PrReIndex, 'WarehouseCode')
                            // }}
                            // onSelect={CostCentre} // Function will trigger on select event
                            // onRemove={CostCentre} //Function will trigger on remove event
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        )}
                      </div>
                    </TD>
                    <TD>
                    <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='MarkLine'
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.FreeText}
                          onChange={e => {
                            getqauntityfromtable(e,index)
                          }}
                        />
                      </div>
                    </TD>
                    <TD>
                    <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='MaterialSize'
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.FreeText}
                          onChange={e => {
                            getqauntityfromtable(e,index)
                          }}
                        />
                      </div>
                    </TD>
                    <TD>
                    <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='CylinderColors'
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.FreeText}
                          onChange={e => {
                            getqauntityfromtable(e,index)
                          }}
                        />
                      </div> </TD>
                    <TD> 
                    <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='PrintingMethod'
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.FreeText}
                          onChange={e => {
                            getqauntityfromtable(e,index)
                          }}
                        />
                      </div>
                    </TD>
                    <TD> <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='Material'
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.FreeText}
                          onChange={e => {
                            getqauntityfromtable(e,index)
                          }}
                        />
                      </div> </TD>
                    <TD> <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='CylinderStatus'
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.FreeText}
                          onChange={e => {
                            getqauntityfromtable(e,index)
                          }}
                        />
                      </div></TD>
                    <TD><div style={{ width: '14rem', height: 'auto' }}>
                    <Select
                                            menuPortalTarget={document.body}
                          placeholder=''
                          options={[{label:'New - New',value:'New'},{label:'Remake - Remake',value:'Remake'},{label:'Rechrome - Rechrome',value:'Rechrome'}]} // Options to display in the dropdown
                          onChange={e => {
                            getdropdowntqauntityfromtable(e, index, 'Cly_Status')
                          }}
                          // onSelect={CostCentre} // Function will trigger on select event
                          // onRemove={CostCentre} //Function will trigger on remove event
                          displayValue='name' // Property name to display in the dropdown options
                        />
                      </div> </TD>
                  </tr>
             ))}
              </tbody>
            </Table>
          )}
      </Tab>
      <Tab eventKey="Attachments" title="Attachments">
        {/* <Attachments/> */}
        </Tab>
      
      </Tabs>
      
      {/* Bottom Side+++++++++ */}
      <CardGroup>
        <DIV3>
          <Container fluid>
       
            <br />
            <div class="form-group" style={{ width: '23.5em', height: 'auto' }}>
                <label for="exampleFormControlTextarea1">Remarks</label>
                <textarea
                   name="Remarks"
                   onChange={e => {
                     valuechangefunction(e)
                   }}
                  value={SelectedPRDocEntry && "Based on  " + SelectedPRDocEntry.JournalRemarks || HeaderData && HeaderData.Comments}
                  type='text'
                  class='form-control rounded-0'
                  id='exampleFormControlTextarea1'
                
                  rows='3'
                />
              </div>

              <div class="form-group" style={{ width: '23.5em', height: 'auto' }}>
              <label for="exampleFormControlTextarea1">Journal Remark</label>
              <input
                  name="JournalRemark"
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                value="Issue for Production"
                type='text'
                class='form-control rounded-0'
                id='exampleFormControlTextarea1'ty
              
                rows='3'
              />
            </div>
            <br />
            <div>
            <Button 
               style={{ marginLeft: '5%' }}
               type="reset"
               onClick={() => {
                Submit_PatchFunc()
              }}
              >{ButtonName}</Button>
             
              <Button style={{ marginLeft: '5%' }}
              onClick={() => {
                  window.location.href="/Home"
                }}>Cancel</Button>
            </div>
          </Container>
        </DIV3>
        <DIV4></DIV4>
        <DIV3>
      
        </DIV3>
      </CardGroup>
      </Form>
    </>
  )
}
