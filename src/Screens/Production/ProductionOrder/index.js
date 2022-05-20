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

import { Attachment } from '../../../Component/APDownPaymentRequest';
import {

  Accounting
} from '../../../Component/PurchaseOrder';
import { CONSTANTS, LINKS } from '../../../Utils'
import { Navbar } from '../../../Component/Global'
import { useAlert } from "react-alert";
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import './index.css'
import e from 'cors';

const axios = require('axios')
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function PurchaseOrder() {
  const [SelectShow, setSelectShow] = React.useState()
  const [getudfvalues, setgetudfvalues] = React.useState({})
  const alert = useAlert();
  const [loading, setLoading] = React.useState(false);
  const [getDocDate, setgetDocDate] = React.useState();
  const [gettotalapiresponce, setgettotalapiresponce] = React.useState();
  const [getapichangerdropdown, setgetapichangerdropdown] = React.useState();
  const [update, setUpdate] = React.useState(1)
  const [getTaxDate, setgetTaxDate] = React.useState();
  const [getdirectdoctype, setgetdirectdoctype] = React.useState()
  const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()
  const [itemsDropdownList, setItemsDropdownList] = React.useState();
  const [CommentsValue, setCommentsValue] = React.useState()
  const [getplannedqty, setgetplannedqty] = React.useState(1)
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

  const [MaCustomer, setMaCustomer] = React.useState()
  const [MaUser, setMaUser] = React.useState()

  const [Customer, setCustomer] = React.useState()

  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [ButtonName, setButtonName] = React.useState();
  const [SelectedVendor, setSelectedVendor] = React.useState()

  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  // const [ItemsDropDown, setItemsDropDown] = React.useState()

  const [DelDate, setDelDate] = React.useState()
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [PrProject, setPrProject] = React.useState()
  const [gettaxtotal, setgettaxtotal] = React.useState()
  const [getnetTotal, setgetnetTotal] = React.useState()
  const [PrCost, setPrCost] = React.useState()
  const [WarehouseNo, setWarehouseNo] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [TaxCode, setTaxCode] = React.useState()
  const [Frieght, setFrieght] = React.useState()
  const [PrBuyer, setPrBuyer] = React.useState()
  const [PrOwner, setPrOwner] = React.useState()
  const [PrWhse, setPrWhse] = React.useState()
  const [getStagesDocumentlines, setgetStagesDocumentlines] = React.useState()
  const [WarehouseName, setWarehouseName] = React.useState()

  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [OwnerPrRe, setOwnerPrRe] = React.useState()
  const [Disply, setDisply] = React.useState(false)
  const [getvalues,setgetvalues]=React.useState({})
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [GroupNoDropdown, setGroupNoDropdown] = React.useState()
  const [CP, setCP] = React.useState()
  const [GN, setGN] = React.useState()
  const [Price, setPrice] = React.useState()
  const [Discount, setDiscount] = React.useState()
  const [Tax, setTax] = React.useState()
  const [total, setTotal] = React.useState()
  const [TotalGross, setTotalGross] = React.useState()
  const [BottomTax, setBottomTax] = React.useState()
  const [BottomDiscount, setBottomDiscount] = React.useState()
  const [TotalPayment, setTotalPayment] = React.useState()
  const [getItemsnumber, setgetItemsnumber] = React.useState()
  const [SaleEmployee, setSaleEmployee] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [DiscountTotal, setDiscountTotal] = React.useState(0)
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState()
  const [totalFreight, setTotalFreight] = React.useState(0)
  const [disc, setdisc] = React.useState()
  const [ShipDate, setShipDate] = React.useState()
  // const [OpenQty, setOpenQty] = React.useState()
  const [getBOMQty, setgetBOMQty] = React.useState();
  const [UoMLable, setUoMLable] = React.useState()
  const [getDocumentlines, setgetDocumentlines] = React.useState()
  const [TabLable, setTabLable] = React.useState()
  const [noOfRows, setNoOfRows] = React.useState(1);
  const [getdocumentname, setgetdocumentname] = React.useState("OWOR1");
  const [getdocumenttype, setgetdocumenttype] = React.useState("202")
  const [ModuleName, setModuleName] = React.useState("ProductionOrder")
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [selectedItems, setSelectedItems] = React.useState();

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

  React.useEffect(async () => {
    today()
    setgetdocumentname("OWOR1")
    setModuleName("ProductionOrder")
    setgetdocumenttype("202")
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
    ActiveUser(cook)
    itemsListAPI(cook);
    Project(cook)
    CostCentre(cook)
    ActiveCustomer(cook)
    Buyer(cook)
    Owner(cook)
    Whse(cook)
    // PurchaseQuotation(cook)
    OwnerPurchaseRequest(cook)
    Frieght1(cook)
    TableTaxCode(cook)
  }, [])
  const getBatchQuantities = async (cook) => {
    let sapAPi = `SQLQueries('UDFBagShape')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        UDFBagShape(cook)
        // setBatchNumberQuantityData(res.data.value)
      })
      .catch({})
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
          console.log("res", res)
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

  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: body,
          api: `ProductionOrders(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocNum) {
            alert.success('Form Submitted Sucessfully')
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
  const DocDueDateChange = async e => {
    setDueDate(e.target.value)
  }
  const GetItems = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let sapapi=`Items?$select=ItemCode,ItemName,ItemsGroupCode,ItemWarehouseInfoCollection,PurchaseUnit&$filter=Valid eq 'tYES' and ItemsGroupCode ne 128 &$orderby=ItemCode`
    await axios
      .post(API_TYPES.GET, {
        api: sapapi,
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
    console.log("AAAA", res)
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
          ItemsGroupCode: element.ItemsGroupCode,
          ItemWarehouseInfoCollection: element.ItemWarehouseInfoCollection,
          BaseOpenQuantity: element.BaseOpenQuantity,
          U_MPrice: element.U_MPrice
          // LineVendor:element.LineVendor,
          //  CostingCode:element.CostingCode,
          //  SalesPersonCode:element.SalesPersonCode,
          //  WarehouseCode:element.WarehouseCode,
        }
        ItemsDropDown.push({
          value: element.ItemCode,
          label: element.ItemCode + ' : ' + element.ItemName,
          item: element
        })
      })
      console.log("AAAA", ItemsDropDown)
      await setItemsDropDown(ItemsDropDown)
      // await setItemsDetails(ItemsDetails)
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
  const getitemsvaluefunction = async (e, index, name) => {
    console.log("e.item.ItemName", e.item.ItemName)
    console.log("name", name)
    
    // let obj = ItemsDetails
    // obj[e.value][name] = e.value
    // // obj[index]["ItemDescription"]=e.item.ItemName

    // // setItemsDetails
    // console.log("obj", obj)
    setUoMLable(e.item.PurchaseUnit)
    setTabLable(e.item.ItemName)
    console.log("PurchaseUnit",e.item.PurchaseUnit)


    // setgetItemsnumber(e.item.ItemName)
  }
  const getitemsWarevaluefunction = async (e, index, name) => {
    // console.log("name", name)
    // console.log("e.item.ssss", e.item.ItemName)
    setWarehouseName(e.item.WarehouseName)
   
    console.log("WarehouseName",e.item.WarehouseName)

    // setgetItemsnumber(e.item.ItemName)
  }

  const Add = () => {
    if (noOfRows !== 10) {
      setNoOfRows(noOfRows + 1);
      // setTabLable("")
    }


  }


  const OwnerhandleClose = () => setDisply(false)
  const OwnerhandleShow = () => setDisply(true)

  // const GetItems = async cookie => {
  //   let ItemsResponseResult = {}
  //   const api = `${LINKS.api}/GetApi`
  //   // setLoading(true)
  //   // -------------------------    Items API GET DATA   ------------------------------------------------------
  //   await axios
  //     .post(API_TYPES.GET, {
  //       api: LINKS.sap.MasterData.AllActiveItems,
  //       cookie: cookie
  //     })
  //     .then(function (ItemsResponse) {
  //       ItemsResponseResult = ItemsResponse
  //       // setLoading(false)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  //   let res = apiProcessing(ItemsResponseResult)
  //   if (res) {
  //     let ItemsDropDown = []
  //     let ItemsDetails = []
  //     res.forEach(element => {
  //       ItemsDetails[element.ItemCode] = {
  //         ItemCode: element.ItemCode,
  //         ItemName: element.ItemName,
  //         PurchaseUnit: element.PurchaseUnit,
  //         FreeText: element.FreeText,
  //         RequriedDate: element.RequriedDate,
  //         ShipDate: element.ShipDate,
  //         RequiredQuantity: 1,
  //         BaseOpenQuantity: element.BaseOpenQuantity,
  //         U_MPrice: element.U_MPrice
  //         // LineVendor:element.LineVendor,
  //         //  CostingCode:element.CostingCode,
  //         //  SalesPersonCode:element.SalesPersonCode,
  //         //  WarehouseCode:element.WarehouseCode,
  //       }
  //       ItemsDropDown.push({
  //         value: element.ItemCode,
  //         label: element.ItemCode + ' : ' + element.ItemName
  //       })
  //     })

  //     await setItemsDropDown(ItemsDropDown)
  //     await setItemsDetails(ItemsDetails)
  //   }
  // }
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
  const DocTypeChange = (e) => {
    if (e.value === 'Direct') {
      setgetcopyfromdoctype()
      setgetdirectdoctype('Direct')
    } else if (e.value === 'CopyFrom') {
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
              label: element.WarehouseCode + ' : ' + element.WarehouseName,
              item: element
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
  const ontextChanged = (e, index, PrReIndex) => {
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
    let SAPapi = `Quotations?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${Customer}'`;
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setPrRe(res.data.value);
      })
      .catch({})
    setShow(true)
  }
  const selectPR = async item => {
    setShow(false)
    setSelectedPRDocEntry(item)
    setSearchDocumentLines(item.DocumentLines)
  }
  const ontextItemChanged = e => {
    let obj = TextItemChangedObject
    obj[e.target.name] = e.target.value
    setTextItemChangedObject(obj)
  }
  const SearchAll_Filter_Data = async () => {
    if (SearchNumber === "0") {
      SearchPRNumberAll()
    }
    else {
      SearchPRNumberFilter()
    }
  }
  const SearchPRNumberAll = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `ProductionOrders`
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
    let sapAPi = `ProductionOrders?$filter=DocumentNumber eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0])
        console.log(res.data.value[0])
        console.log(res.data.value[0].ProductionOrderLines)
        setSearchDocumentLines(res.data.value[0].ProductionOrderLines)
        if (HeaderData != "") {
          setButtonName("Update")
        }
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
    doclines[name] = e.label;
    setgetudfvalues(doclines);
  }
  const getvaluesofudf = (e) => {
    let doclines = getudfvalues
    doclines[e.target.name] = e.target.value;
    setgetudfvalues(doclines);
  }
  const submitPatchOrders = async () => {
    let body = {
      "ProductionOrderStatus" : getvalues.Status
    }
    console.log(HeaderData.AbsoluteEntry,body)
    Patch(HeaderData.AbsoluteEntry, body)
  }
  const Submit_PatchFunc = () => {
    if (ButtonName == "Add") {
      console.log("submit")
      submitPR()
    } else if (ButtonName != "Add") {
      console.log("Patch")
      submitPatchOrders()
    }
  }
  const submitPR = async () => {
    let DocLines = []
    let StageDoclines = []
    let body = {}
    console.log("gettotalapiresponce",gettotalapiresponce);
    gettotalapiresponce.forEach(element => {
      if(element.Name){
      StageDoclines.push({
        // "DocEntry": 1,
        StageID:element.StageID,
        SequenceNumber: element.SequenceNumber,
        StageEntry:element.StageEntry,
        Name: element.Name,

        // "StartDate": "2020-01-13",
        // "EndDate": "2020-01-13",
        // "RequiredDays": 0.0,
        // "WaitingDays": 0.0,
        // "CalculationProportion": 100.0
      })
    }
    })
    gettotalapiresponce.forEach(element => {
      if(element.ItemType){
      DocLines.push({
        // DocumentAbsoluteEntry:element.ItemType,
        ItemType:element.ItemType,
        ItemNo: element.ItemCode,
        ItemName: element.ItemName,
        Warehouse: element.Warehouse,
        ProductionOrderIssueType: element.IssueMethod,
        BaseQuantity: element.Quantity / getBOMQty,
        PlannedQuantity: (element.Quantity / getBOMQty) * getplannedqty,
        IssuedQuantity: (element.Quantity / getBOMQty) * getplannedqty,
        ProductionOrderIssueType: element.IssueMethod,
        StageID: element.StageID,
        LineText:element.LineText,
        // 
        // "LineNumber": 0,
        // "PlannedQuantity": 143.3890,
        // "IssuedQuantity": 143.3890,
        // "ProductionOrderIssueType": "im_Manual",
        // "Warehouse": "03",
        // "ItemType": "pit_Item",
        // "LineText": null,
        // "StageID": 1,
        // // "RequiredDays": 0.0,
        // "ItemName": null,
      })
    }
    })

    body['ProductionOrdersStages'] = StageDoclines
    body['ProductionOrderLines'] = DocLines
    body['ProductionOrderType'] = getvalues.Type
    body['ProductionOrderStatus'] = getvalues.Status
    body['ItemNo'] = getvalues.ProductNo
    body['PlannedQuantity'] = getvalues.PlannedQuantity
    body['Warehouse'] = getvalues.Warehouse
    body['RoutingDateCalculation'] = 'raOnStartDate'
    body['InventoryUOM'] = UoMLable
    // body['U_Whse_Nm'] = WarehouseName
    // body['U_Finished_Goods'] = getvalues.FinishedGoods
    // body['U_Sales_ord'] = getvalues.SalesOrderQty
    // body['U_Card_Name'] = getvalues.CustomerName
    // body['U_Weight'] =  Number(getvalues.Weight)
    // body['U_Print_wgt'] = Number(getvalues.PrintingWeight)
    // body['U_Lami_wgt'] = Number(getvalues.LaminatedWeight)
    body['Series'] = getvalues.SeriesValue
    // body['DocumentNumber'] = getnextnumber
    body['PostingDate'] = getvalues.DocDate
    body['StartDate'] = getvalues.TaxDate
    body['DueDate'] = getvalues.DocDueDate 
    body['UserSignature'] = getvalues.User
    body['ProductionOrderOrigin'] ='bopooManual'
    // body['LinkedTo'] = getvalues.LinkedTo
    body['ProductionOrderOriginEntry'] = getvalues.LinkedOrder
    body['U_Prorty'] = getvalues.U_Priority
    body['Priority'] = getvalues.Priority
    body['CustomerCode'] = getvalues.Customer
    body['Project'] = getvalues.Project
    body['Remarks'] = getvalues.Remarks

    console.log("body", body)  
    console.log("body", JSON.stringify(body))  
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.Production.PostProductionOrders,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocNum) {
            alert.success('Operation completed successfully')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const getseriesvaluefunction = async (e) => {
    console.log(e.label)
    setgetseriesvalue(e.value)
    setgetnextnumber(e.item.NextNumber)
  }
  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
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
  const QuantityFun = (e, index) => {
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

  const [modalOne, setModalOne] = React.useState();
  const [modalTwo, setModalTwo] = React.useState();

  const handleClosee = () => setModalOne(false);
  const handleCloseee = () => setModalTwo(false);


  function handleShowModalOne() {
    setModalOne("modal-one");
  }

  const handleShowModalTwo = () => {
    setModalTwo("modal-two")
  }

  const checkboxSelect = (item, index) => {
    console.log(item.isSelected, index)
    let checkboxValue = null
    if (item.isSelected) {
      checkboxValue = false
    }
    else {
      checkboxValue = true
    }
    let prData = PrRe
    console.log(prData)
    prData[index]['isSelected'] = checkboxValue
    setPQDocumentLines(prData);
    console.log(prData)

  }
  const docLineSelectedSwitch = (PrReIndex, item, index) => {
    let checkboxValue = null
    if (item.isSelected) {
      checkboxValue = false
    }
    else {
      checkboxValue = true
    }
    let prData = PQDocumentLines
    prData[PrReIndex].DocumentLines[index]['isSelected'] = checkboxValue;
    setPQDocumentLines(prData);
    console.log(prData)
  }
  const selectrow = async items => {
    PQDocumentLines.forEach(element => {
      element.PQDocumentLines.forEach(docElement => {
        if (docElement.isSelected) {
          setSelectShow(docElement)
          console.log(docElement)
        }
      });
    });
  }
  const netTotalFunc = (e, index, PrReIndex, item) => {
    let doclines = PQDocumentLines;
    const value = e.target.value
    doclines[PrReIndex].DocumentLines[index]['PriceBeforeVat'] = (doclines[PrReIndex].DocumentLines[index].UnitPrice * doclines[PrReIndex].DocumentLines[index].Quantity)

    setPQDocumentLines(doclines);
    console.log(doclines);
    let sum = 0
    let sum1 = 0
    PQDocumentLines.forEach(element => {
      if (element.isSelected) {
        element.DocumentLines.forEach(item => {
          if (item.isSelected && item.LineStatus === "bost_Open") {
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
  const getvaluesformula = () => {
    let sum = 0
    let sum1 = 0
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
  const itemsChange = (e, index) => {
    let obj = selectedItems
    obj[index].detail[e.target.name] = e.target.value
    obj[index].detail["TaxRate"] = 0
    obj[index].detail["PriceAfterVAT"] = obj[index].detail["UnitPrice"]
    obj[index].detail["LineTotal"] = obj[index].detail.PriceAfterVAT * obj[index].detail.RequiredQuantity
    obj[index].detail["TaxAmount_LC"] = (obj[index].detail["PriceAfterVAT"] * (obj[index].detail["RequiredQuantity"] * obj[index].detail["TaxRate"]) / 100)

    obj[index].detail[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    console.log(obj)
    let sum = 0
    let sum1 = 0
    let sum2 = 0
    obj.forEach(element => {
      sum = sum + element.detail.LineTotal
      sum1 = sum1 + element.detail.TaxRate
      sum2 = sum2 + element.detail.Freight
    })
    setTotalbforeDiscount(sum)
    setTotalTaxRate(sum1)
    setTotalFreight(sum2)
    setSelectedItems(obj)
    if (e.target.name === 'QuotedQuantity') {
      discountFormula(e, index)
    }
    else if (e.target.name === 'DiscountPercent') {
      itemsChange22(e, index)
    }
  }
  const onFreightChanged = (e, index, name) => {
    let itemDetail = selectedItems
    itemDetail[index].detail['FreightLC'] = e.target.value
    setSelectedItems(itemDetail)
    let sum = 0
    selectedItems.forEach(element => {
      sum = Number(sum) + Number(element.detail.FreightLC)
    });
    setTotalFreight(sum)
  }
  const itemsChange22 = (e, index) => {
    let obj = selectedItems
    obj[index].detail["PriceAfterVAT"] = (obj[index].detail["UnitPrice"] - (obj[index].detail["UnitPrice"] * obj[index].detail["DiscountPercent"]) / 100)
    obj[index].detail[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0
    let sum1 = 0
    let sum2 = 0
    obj.forEach(element => {
      sum = sum + element.detail.LineTotal
      sum1 = sum1 + element.detail.TaxRate
      sum2 = sum2 + element.detail.Freight
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
        obj[index].detail.RequiredQuantity * obj[index].detail.PriceAfterVAT) / 100

    obj[index].detail[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0
    let sum1 = 0
    let sum2 = 0
    obj.forEach(element => {
      sum = sum + element.detail.LineTotal
      sum1 = sum1 + element.detail.TaxRate
      sum2 = sum2 + element.detail.Freight
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
  const ItemsDropDownfunc = async (selectedList, e) => {
    setSelectedItems(selectedList)
  }
  const getresponcefromapi = async (itemcode) => {
    setgetItemsnumber(itemcode)
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `ProductTrees?$filter=TreeCode eq '${itemcode}'`
    console.log(SAPapi)
    // let SAPapi = `ProductTrees?$top=1`  
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function  (res) {
        console.log("res.data.value",res.data.value[0])
        // setgettotalapiresponce(res.data.value)
        setgettotalapiresponce(res.data.value[0].ProductTreeStages.concat(res.data.value[0].ProductTreeLines))
        setgetBOMQty(res.data.value[0].Quantity)
        setgetStagesDocumentlines(res.data.value[0].ProductTreeStages)
        setgetDocumentlines(res.data.value[0].ProductTreeLines)
      })
      .catch({})
  }
  const getvaluefunction = async (e) => {
    setgetItemsnumber(e.item.ItemName)
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
  const stateOptions = [
    { value: "A", label: "Assembly" },
    { value: "S", label: "Sales" },
    { value: "P", label: "Production" },
    { value: "T", label: "Template" }]

    const valuechangefunction = (e) =>{
      let obj = getvalues
      obj[e.target.name]=e.target.value
      setgetvalues(obj)
      // console.log(obj)
    }
    const getdropdownvaluechanger = async (e,name) =>{
      let obj = getvalues
      obj[name]=e.value
      setgetvalues(obj)
      let cookie = await localStorage.getItem('cookie')
      if (e.value==='ProductionOrder'){
        console.log("ProductionOrder")
       axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.Production.ProductionOrders,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
      let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.DocumentNumber,
              label: element.DocumentNumber + ' : ' + element.ProductDescription
            })
          })
          setgetapichangerdropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
      }else if(e.value==='SalesOrder'){
        console.log("SalesOrder")
         axios
        .post(API_TYPES.GET, {
          api: LINKS.sap.Sales.Orders,
          cookie: cookie
        })
        .then(function (res) {
          console.log(res)
          if (res.data.value) {
        let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.DocNum,
              label: element.DocNum + ' : ' + element.CardName
            })
          })
          setgetapichangerdropdown(ItemsDropDown)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      }
      // console.log(obj)
    }
    const getdropdownvalue = (e, name) => {
      let obj = getvalues
      obj[name] = e.value
      // console.log("name",name)
      // console.log("e.value",e.value)
      setgetvalues(obj)
      // console.log(obj);
    }
    const getdropdownvaluetable = (e,index, name) => {
      let obj = gettotalapiresponce
      obj[index][name] = e.value
      setgettotalapiresponce(obj)
    }
    const getNodropdownvalue = (e, name) => {
      let obj = getvalues
      obj[name] = e.value
      // console.log("name",name)
      // console.log("e.value",e.value)
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
        getdocumentname={getdocumentname} />
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
                  placeholder={HeaderData&&HeaderData.ProductionOrderType}
                  options={[
                    { value: "bopotStandard", label: "Standard" },
                    { value: "bopotSpecial", label: "Special" },
                    { value: "bopotDisassembly", label: "Disassembly" },
                    // { value: "4", label: "Template" }
                  ]} // Options to display in the dropdown
                 
                  onChange={e => {
                    getdropdownvalue(e, 'Type')
                  }}
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <label>Status</label>
              <div style={{ width: '23.5rem', height: 'auto' }} variant='primary'>
                <Select
                  placeholder={HeaderData&&HeaderData.ProductionOrderStatus}
                  options={[
                    { value: "boposPlanned", label: "Planned" },
                    { value: "boposReleased", label: "Released" },
                    { value: "boposCanceled", label: "Canceled" },
                    // { value: "4", label: "Template" }
                  ]}
                 
                  onChange={e => {
                    getdropdownvalue(e, 'Status')
                  }}
                  // op
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
                  <Modal.Title>Production Orders List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {ModalHeaderData && (
                    <Table responsive>
                      <TableHead>
                        <tr>
                          <th>#</th>
                          <th>Document Status</th>
                          <th>Document Number</th>
                          <th>DocEntry</th>
                          <th>Item Code</th>
                          <th>Item Name</th>
                          <th>Creation Date</th>

                        </tr>
                      </TableHead>
                      <tbody>
                        {ModalHeaderData.map((item, index) => (
                          <tr key={`${index}`} onClick={e => {
                            selectPR(item)
                          }}>
                            <TD>{index + 1} </TD>
                            <TD>{item.ProductionOrderStatus === "boposReleased" ? (<p style={{ background: 'green', color: 'white' }}>Released</p>) : item.ProductionOrderStatus === "boposPlanned" ? (<p style={{ background: 'gray', color: 'black' }}>Planned</p>) : item.ProductionOrderStatus === "boposCanceled" ? (<p style={{ background: 'red', color: 'white' }}>Canceled</p>):null}</TD>
                            <TD>{item.DocumentNumber}</TD>
                            <TD>{item.AbsoluteEntry}</TD>
                            <TD>{item.ItemNo}</TD>
                            <TD>{item.ProductDescription}</TD>
                            <TD>{item.CreationDate}</TD>
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
              <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
                <label>Product No.</label>
                <Select
                  placeholder={HeaderData&&HeaderData.ProductionOrderType}
                  options={ItemsDropDown} // Options to display in the dropdown
                  onChange={(e) => {getitemsvaluefunction(e); getresponcefromapi(e.value); getdropdownvalue(e, 'ProductNo')  }} // Function will trigger on select event
                  // onRemove={BusinessPartners} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
            
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Planned Quantity</label>
                <input
                  // value={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard ? HeaderData && HeaderData.NumAtCard : null}
                  type='text'
                  name='PlannedQuantity'
                  defaultValue={getplannedqty || HeaderData&&HeaderData.ProductionOrderType}
                  onChange={e => {
                    setgetplannedqty(e.target.value)
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
                  placeholder={HeaderData&&HeaderData.Warehouse}
                  options={PrWhse} // Options to display in the dropdown
                  onChange={(e) => {
                    getitemsWarevaluefunction(e);getdropdownvalue(e, 'Warehouse')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                  // value={getvalues && getvalues.Warehouse}
                />
              </div>
            
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>Routing Date Calculation</label>
                <input
                  value='On Start Date'
                  type='text'
                  name='RoutingDateCalculation'
                  onChange={e => {
                    valuechangefunction(e.value)
                  }}
                  readOnly
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={HeaderData && HeaderData.RoutingDateCalculation}
                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
                <label>UoM Name</label>
                <input
                  readOnly
                  value={UoMLable}
                  type='text'
                  name='UoMName'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue={HeaderData && HeaderData.UoMEntry}
                ></input>
              </div>
              <div style={{ width: '23.5rem', height: 'auto'}} variant='primary'>
                <label>User</label>
                <Select
                  placeholder={HeaderData && HeaderData.U_Card_Name}
                  options={MaUser} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvalue(e, 'User')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem',height: 'auto' }}>
                <label> Customer</label>
                <Select
                  placeholder={HeaderData && HeaderData.CustomerCode}
                  options={MaCustomer} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvalue(e, 'Customer')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <br />  
            </Container>
          </DIV3>
          <DIV4>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }} variant='primary' >
              <label>Finished Goods</label>
              <Select
                  placeholder={HeaderData && HeaderData.U_Finished_Goods}
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
                placeholder={HeaderData && HeaderData.U_Weight}
              ></input>
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }} variant='primary' >
              <label>Priority</label>
              <Select
                placeholder={HeaderData && HeaderData.U_Prorty}
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
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
                <label>Priority</label>
                <input
                  type='text'
                  name='Priority'
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder={HeaderData && HeaderData.Priority}
                ></input>
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
                placeholder={HeaderData && HeaderData.U_Print_wgt}
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
                placeholder={HeaderData && HeaderData.U_Lami_wgt}
              ></input>
            </div>
          </DIV4>
          <DIV3>
            <Container>
              <div style={{ marginLeft: '3rem' }}>
                <label>No.</label>
                <CardGroup>
                  <br />
                  <div style={{ width: '11.5rem', height: 'auto' }} >
                    <Select
                      // placeholder={HeaderData && HeaderData.RequesterName}
                      options={getserviceseries} // Options to display in the dropdown
                      onChange={e => { getseriesvaluefunction(e); getNodropdownvalue(e, 'SeriesValue') }} // Function will trigger on select event
                      // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                  </div>
                  <div style={{ width: '11.5rem', height: 'auto' }}>
                    <input
                      type='number'
                      onChange={e => {
                        valuechangefunction(e)
                      }}
                      name='NextNumber'
                      readOnly
                      defaultValue={HeaderData && HeaderData.DocumentNumber}
                      value={getnextnumber}
                      placeholder=''
                      class='form-control'
                    /> <br />
                  </div>
                </CardGroup>
              </div>
              <div className="sales"
                style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem', border: '1px solid', borderColor: 'lightgray', borderRadius: '4px' }}
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
                  defaultValue={currentDate || HeaderData && HeaderData.CreationDate}
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
                  defaultValue={currentDate ||  HeaderData && HeaderData.StartDate}
                 
                />
              </div>

              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label>Due Date</label>
                <input
                  type='date'
                  name='DocDueDate'
                  class='form-control'
                  defaultValue={currentDate || HeaderData && HeaderData.DueDate}
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                />
              </div>

             
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Origin</label>
                <input
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
                <Select
                  // placeholder={HeaderData && HeaderData.CardCode}
                  options={[{label:'Production Order',value:'ProductionOrder'},{label:'Sales Order',value:'SalesOrder'}]} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvaluechanger(e,'LinkedTo')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Linked Order</label>
                <Select
                  // placeholder={HeaderData && HeaderData.CardCode}
                  options={getapichangerdropdown} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvalue(e,'LinkedOrder')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
            
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Distr. Rule</label>
                <Select
                  // placeholder={HeaderData && HeaderData.CardCode}
                  // options={PrCost} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvalue(e, 'CostCentre')
                  }} 
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Project</label>
                <Select
                  placeholder={HeaderData && HeaderData.Project}
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
        <Tabs defaultActiveKey="Components" transition={false} id="noanim-tab-example">
          <Tab eventKey="Components" title="Components">
          {gettotalapiresponce && (
              <Table responsive striped bordered hover>
                {Array.isArray(gettotalapiresponce) &&
                  gettotalapiresponce.length > 0 ? (
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Item No.</th>
                      <th>Item Description</th>
                      <th>Base Qty</th>
                      <th>Planned Qty</th>
                      <th>Issued</th>
                      {/* <th>Available</th> */}
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
                  {gettotalapiresponce.sort((a, b) => b.StageID > a.StageID ? -1 : 1).map((item, index) => (
                    
                    <tr key={`${index}`}>
                      <TD>
                      {index + 1}</TD>
                      <TD>{item.ItemType==='pit_Item' ? 'Item':(item.ItemType==='pit_Resource'? 'Resource': item.ItemType==='pit_Text'?'Text':'Route Stage')}</TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              defaultValue={item.Father!=null ? null : item.ItemCode}
                            />
                          </div>
                        </TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              defaultValue={item.Father ? item.Name : item.ItemName}
                            />
                          </div>
                        </TD>
                      <TD>  <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : (item.Quantity / getBOMQty)}
                            />
                          </div>
                        </TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : ((item.Quantity / getBOMQty) * getplannedqty)}
                            />
                          </div></TD>
                      <TD>  <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : ((item.Quantity / getBOMQty) * getplannedqty)}
                            />
                          </div></TD>
                      {/* <TD></TD> */}
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : (item.InventoryUOM)}
                            />
                          </div>
                       </TD>
                      <TD>
                      <div style={{ width: '12.5rem'}}>
                      <Select
                              menuPortalTarget={document.body}
                      isDisabled={item.Father ? true : false}
                  placeholder={item.Warehouse}
                 // Options to display in the dropdown
                  // onChange={e => {
                  //   getdropdownvalue(e, 'Type')
                  // }}
                  displayValue='name' // Property name to display in the dropdown options
                />
                </div></TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? item.StageID : (item.StageID)}
                            />
                          </div>
                        </TD>
                      <TD>
                      <div style={{ width: '12.5rem'}}>
                          <Select
                              menuPortalTarget={document.body}
                      isDisabled={item.Father ? true : false}
                  placeholder='Select'
                  options={[
                    { value: "Planned", label: "Planned" },
                    { value: "InProgress", label: "In Progress" },
                    { value: "Complete", label: "Complete" },
                    // { value: "4", label: "Template" }
                  ]} // Options to display in the dropdown
                  onChange={e => {
                    getdropdownvaluetable(e,index,'Status')
                  }}
                  displayValue='name' // Property name to display in the dropdown options
                /></div>
                        </TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : (item.U_InkCostPU)}
                            />
                          </div></TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : item.U_TotChemCost}
                            />
                          </div>
                       </TD>
                      <TD> <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : item.U_PropInk}
                            />
                          </div></TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : item.U_ChemProp}
                            />
                          </div>
                       </TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : item.U_TotCombQty}
                            />
                          </div></TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : item.U_TotCombCost}
                            />
                          </div></TD>
                      <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : item.U_CombPU}
                            />
                          </div>
                        </TD>
                      <TD>
                        
                      <div style={{ width: '14rem', height: 'auto' }}>
                            <input
                              type='text'
                              name='ItemCode'
                              readOnly={item.Father ? true : false}
                              class='form-control'
                              value={item.Father ? null : item.IssueMethod}
                            />
                          </div></TD>
                      <TD></TD>
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
            {(
              <Table responsive striped bordered hover>
                {Array.isArray(SearchDocumentLines) && SearchDocumentLines.length > 0 ? (

                  <TableHead>
                    <tr>
                    <th>#</th>
                      <th>Type</th>
                      <th>Item No.</th>
                      <th>Item Description</th>
                      <th>Base Qty</th>
                      <th>Planned Qty</th>
                      <th>Issued</th>
                      {/* <th>Available</th> */}
                      <th>UoM Code</th>
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
                  {SearchDocumentLines && SearchDocumentLines.map((item, index) => (
                    <tr key={`${index}`}>
                      <TD>{index + 1}</TD>
                      <TD></TD>
                      <TD>{item.ItemNo}</TD>
                      <TD>{item.ItemName}</TD>
                      <TD>{item.BaseQuantity}</TD>
                      <TD>{item.PlannedQuantity}</TD>
                      <TD>{item.IssuedQuantity}</TD>
                      <TD>{item.UoMCode} </TD>
                      <TD>{item.StageID} </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD> </TD>
                      <TD></TD>
                      <TD></TD>
                    </tr>
                  ))}
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
                  value={SelectedPRDocEntry && "Based on Quotations: " + SelectedPRDocEntry.DocEntry + ". " + SelectedPRDocEntry.Comments || HeaderData && HeaderData.Comments}
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
                  onClick={() => {
                    window.location.href = "/Home"
                  }}>Cancel</Button>
              </div>
            </Container>
          </DIV3>
          <DIV4></DIV4>
          <DIV3>
            <br />
            <div class="form-group" style={{ width: '23.5em', height: 'auto' }}>
              <label for="exampleFormControlTextarea1">Pick and Pack Remarks</label>
              <textarea
                  name="Pick_And_Pack_Remarks"
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                // value={SelectedPRDocEntry && "Based on Quotations: " + SelectedPRDocEntry.DocEntry + ". " + SelectedPRDocEntry.Comments || HeaderData && HeaderData.Comments}
                type='text'
                class='form-control rounded-0'
                id='exampleFormControlTextarea1'
              
                rows='3'
              />
            </div>
            <br />
            <br />
          </DIV3>
        </CardGroup>
      </Form>
    </>
  )
}
