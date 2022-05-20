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
import { MenuUp } from 'react-bootstrap-icons';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Logistics, Accounting } from '../../../Component/PurchaseQuotation'
import {  Attachment} from '../../../Component/APDownPaymentRequest';
import { CONSTANTS, LINKS } from '../../../Utils'
import { Navbar } from '../../../Component/Global'
import { useAlert } from "react-alert";
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
// import './index.css'
import Switch from "react-switch";
const axios = require('axios')
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function BillOfMaterial() {
  const alert = useAlert();
  const [TabLable, setTabLable]=React.useState()
  const [getdatafromtable, setgetdatafromtable]=React.useState({})
  const [getChartofAccount, setgetChartofAccount]=React.useState()
  const[UoMLable, setUoMLable]=React.useState()
  const [SelectShow, setSelectShow]=React.useState()
  const [getdisabledvalue, setgetdisabledvalue]=React.useState(false)
  const [getstageid, setgetstageid]=React.useState(0)
  const [getproductiondesc, setgetproductiondesc]=React.useState()
  const [getpostingdate, setgetpostingdate]=React.useState()
  const [dimensionsdropdown, setdimensionsdropdown]=React.useState()
  const [getdeliverydate, setgetdeliverydate]=React.useState()
  const [getcomments, setgetcomments]=React.useState()
  const [loading, setLoading] = React.useState(false);
  const [noOfRows, setNoOfRows] = React.useState(1);
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [update, setUpdate] = React.useState(1)
  const [getdocumenttype, setgetdocumenttype] = React.useState("66")
  const [getdocumentname, setgetdocumentname] = React.useState("OITT1");
  const [ModuleName, setModuleName] = React.useState("BOM")
  const [getserviceseries, setgetserviceseries] = React.useState()
  const classes = useStyles();
  const [show, setShow] = React.useState(false)
  const [CPDropdown, setCPDropdown] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [OpenQty, setOpenQty] = React.useState()
  const [SelectedCP, setSelectedCP] = React.useState()
  const [getPriceListDropdown, setgetPriceListDropdown] = React.useState()
  const [SelectedOwner, setSelectedOwner] = React.useState()
  const [SelectedBuyer, setSelectedBuyer] = React.useState()
  const [SearchPR, setSearchPR] = React.useState()
  const [getStatus, setgetStatus] = React.useState()
  const [text, settext] = React.useState("")
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [ButtonName, setButtonName] = React.useState();
  const [SelectedVendor, setSelectedVendor] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ItemsDropDown2, setItemsDropDown2] = React.useState()
  const [ItemsDropDown3, setItemsDropDown3] = React.useState()
  const [ItemsDropDown11, setItemsDropDown11] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [ItemsDetails2, setItemsDetails2] = React.useState()
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState()
  const [SelectedItems, setSelectedItems] = React.useState([{'Type':'','ItemCode':'','ItemName':'','UoMCode':'' }])
  const [PRBody, setPRBody] = React.useState({})
  const [getnumatcard, setgetnumatcard] = React.useState()
  const [DelDate, setDelDate] = React.useState()
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [PrProject, setPrProject] = React.useState()
  const [PrCost, setPrCost] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [TaxCode, setTaxCode] = React.useState()
  const [Frieght, setFrieght] = React.useState()
  const [PrBuyer, setPrBuyer] = React.useState()
  const [PrOwner, setPrOwner] = React.useState()
  const [PrWhse, setPrWhse] = React.useState()
  const [TodayDate, setTodayDate] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [OwnerPrRe, setOwnerPrRe] = React.useState()
  const [Disply, setDisply] = React.useState(false)
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [GroupNoDropdown, setGroupNoDropdown] = React.useState()
  const [CP, setCP] = React.useState()
  const [GN, setGN] = React.useState()
  const [Price, setPrice] = React.useState()
  const [Discount, setDiscount] = React.useState()
  const [Tax, setTax] = React.useState()
  const [gettaxtotal, setgettaxtotal] = React.useState()
  const [getnetTotal, setgetnetTotal] = React.useState()
  const [total, setTotal] = React.useState()
  const [itemsDropdownList, setItemsDropdownList] = React.useState()
  const [TotalGross, setTotalGross] = React.useState()
  const [BottomTax, setBottomTax] = React.useState()
  const [getItemsnumber, setgetItemsnumber] = React.useState({})
  const [currentDate,setcurrentDate] = React.useState()
  const [BottomDiscount, setBottomDiscount] = React.useState()
  const [TotalPayment, setTotalPayment] = React.useState()
  const [DiscountTotal, setDiscountTotal] = React.useState()
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState()
  const [totalFreight, setTotalFreight] = React.useState(0)
  const [disc, setdisc] = React.useState()
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState()
  const [ShipDate, setShipDate] = React.useState()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [getreportnumber, setgetreportnumber] = React.useState()
  const [getbase64data, setgetbase64data] = React.useState()
  const [Total_LC, setTotal_LC] = React.useState();
  //Component Hooks---
  const [getAddress, setgetAddress] = React.useState()
  const [getAddress2, setgetAddress2] = React.useState()
  const [getTransportationCode, setgetTransportationCode] = React.useState()
  const [getGroupNumber, setgetGroupNumber] = React.useState()
  const [getJournalMemo, setgetJournalMemo] = React.useState()
  const [getProject, setgetProject] = React.useState()
  const [getCancelDate, setgetCancelDate] = React.useState()
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState('0020545074')
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState('0021105591')
  const [showA, setShowA] = React.useState(false)
  const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [getitemdoctype, setgetitemdoctype] = React.useState()
  const [getresourcedoctype, setgetresourcedoctype] = React.useState()
  const [gettextdoctype, setgettextdoctype] = React.useState()
  const [getroutestagedoctype, setgetroutestagedoctype] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  }
  React.useEffect(async () => {
    today()
    await setgetdocumentname("OITT1")
    await setModuleName("BOM")
    await setgetdocumenttype("66")
    compareDate()
    let cook = await localStorage.getItem('cookie')
    const show = await localStorage.getItem('ShowBranches')
    if (showA == 'true') {
      setShowA(true)
      // setShow1(true)
      compareDate()
      await localStorage.removeItem('ShowBranches')
    }
    setButtonName('Add')
    setSearchNumber('0')
    if (cook) GetItems(cook)
     GetItems2(cook)
    GetResources(cook)
    getItemsList(cook)
    getdimensions(cook)
    GetRouteStage(cook)
    PriceListValue(cook)
    BusinessPartners(cook)
    Project(cook)
    itemsListAPI(cook);
    CostCentre(cook)
    Buyer(cook)
    Owner(cook)
    Whse(cook)
    PurchaseQuotation(cook)
    OwnerPurchaseRequest(cook)
    Frieght1(cook)
    TableTaxCode(cook)
  
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
      setIsSubmitting(true)
       await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `PurchaseOrders(${id})`,
          cookie: cook
        })
        .then(function (res) {
          setIsSubmitting(false)
          if (res.data.DocNum) {
            alert.success('Operation completed successfully')
           
          } else {
            alert.error("res.data.error.message.value")
          }
        })
        .catch(function (error) {
          setIsSubmitting(false)
        })
        
      }
  }
  const getItemsList = async (cook) => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    let SAPapi = `ChartOfAccounts?$filter=AccountLevel eq 5`
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cook
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
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.Code,
          label: element.Code + ' : ' + element.Name,
          item: element
        })
      })
      await setgetChartofAccount(ItemsDropDown)
    }
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
        setCP(res.data.value)
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
  const OwnerhandleClose = () => setDisply(false)
  const OwnerhandleShow = () => setDisply(true)
  const GetItems2 = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.AllActiveItems,
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
          item:element
        })
      })

      await setItemsDropDown(ItemsDropDown)
      await setItemsDetails(ItemsDetails)
    }
  }
  const GetItems = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveAllItems,
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
          item:element
        })
      })

      await setItemsDropDown11(ItemsDropDown)
      await setItemsDetails2(ItemsDetails)
    }
  }
  const GetResources = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveResources,
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
        // ItemsDetails[element.ItemCode] = {
        //   ItemCode: element.ItemCode,
        //   ItemName: element.ItemName,
        //   PurchaseUnit: element.PurchaseUnit,
        //   FreeText: element.FreeText,
        //   RequriedDate: element.RequriedDate,
        //   ShipDate: element.ShipDate,
        //   ItemsGroupCode:element.ItemsGroupCode,
        //   RequiredQuantity: 1,
        //   ItemWarehouseInfoCollection:element.ItemWarehouseInfoCollection,
        //   BaseOpenQuantity: element.BaseOpenQuantity,
        //   U_MPrice: element.U_MPrice
        //   // LineVendor:element.LineVendor,
        //   //  CostingCode:element.CostingCode,
        //   //  SalesPersonCode:element.SalesPersonCode,
        //   //  WarehouseCode:element.WarehouseCode,
        // }
        ItemsDropDown.push({
          value: element.Code,
          label: element.Code + ' : ' + element.Name,
          item:element
        })
      })

      await setItemsDropDown2(ItemsDropDown)
      // await setItemsDetails(ItemsDetails)
    }
  }
  const GetRouteStage = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveRouteStage,
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
        // ItemsDetails[element.ItemCode] = {
        //   ItemCode: element.ItemCode,
        //   ItemName: element.ItemName,
        //   PurchaseUnit: element.PurchaseUnit,
        //   FreeText: element.FreeText,
        //   RequriedDate: element.RequriedDate,
        //   ShipDate: element.ShipDate,
        //   ItemsGroupCode:element.ItemsGroupCode,
        //   RequiredQuantity: 1,
        //   ItemWarehouseInfoCollection:element.ItemWarehouseInfoCollection,
        //   BaseOpenQuantity: element.BaseOpenQuantity,
        //   U_MPrice: element.U_MPrice
        //   // LineVendor:element.LineVendor,
        //   //  CostingCode:element.CostingCode,
        //   //  SalesPersonCode:element.SalesPersonCode,
        //   //  WarehouseCode:element.WarehouseCode,
        // }
        ItemsDropDown.push({
          value: element.Code,
          label: element.Code + ' : ' + element.Description,
          item:element
        })
      })

      await setItemsDropDown3(ItemsDropDown)
      // await setItemsDetails(ItemsDetails)
    }
  }
  const AddRowFunction = async (selectedList) => {
await  setSelectedItems([...SelectedItems,selectedList])
  }
  const ItemsDropDownfunc = async (selectedList,index,name) => {
    let doclines = SelectedItems
    doclines[index]['ItemCode'] = selectedList.value
    doclines[index]['ItemName'] = selectedList.item.ItemName
    doclines[index]['Sequence'] = getstageid
    setSelectedItems([...SelectedItems,doclines])
  
}
const ItemsDropDownfunc22 = async (selectedList,index,name) => {
  let doclines = SelectedItems
  doclines[index]['ResourceName'] = selectedList.item.Name
  doclines[index]['ResourceUnit'] = selectedList.item.UnitOfMeasure
  doclines[index]['Sequence'] = getstageid
  doclines[index][name] = selectedList.value
  setSelectedItems([...SelectedItems,doclines])
}
const ItemsDropDownfunc33 = async (selectedList,index,name) => {
  let doclines = SelectedItems
  doclines[index][name] = selectedList.item.Description
  doclines[index]['StageEntry'] = selectedList.item.InternalNumber
  doclines[index]['Sequence'] = getstageid + 1
  setgetstageid(doclines[index]['Sequence'])
  doclines[`ùpdate${update+1}`]= update+1;
  setUpdate(update+1);
  setSelectedItems([...SelectedItems,doclines])
}
  const CPChange = e => {
    setSelectedCP(e.value)
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
  const getdimensions = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActvieDimensions,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.DimensionCode,
              label: element.DimensionCode + ' : ' + element.DimensionName
            })
          })
          setdimensionsdropdown(ItemsDropDown)
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
              value: element.ExpensCode,
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
        api: LINKS.sap.PurchaseOrder.purchaseTax,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
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
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.SalesEmployeeCode,
              label: element.SalesEmployeeCode + ' : ' + element.SalesEmployeeName
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
  const PurchaseQuotation = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseQuotation.PurchaseQuotation,
        cookie: cookie
      })
      .then(function (res) {
        // setPrRe(res.data.value)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const PriceListValue = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
   let sapAPI=`PriceLists?$select=PriceListNo,PriceListName`
    await axios
      .post(API_TYPES.GET, {
        api: sapAPI,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.PriceListNo,
              label: element.PriceListNo + ' : ' + element.PriceListName
            })
          })
          setgetPriceListDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `PurchaseOrders?$filter=DocNum eq ${SearchNumber} &$orderby=DocNum asc`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data.value)
       localStorage.setItem('getDocEntry',res.data.value[0].DocEntry);
        setSearchDocumentLines(res.data.value[0].DocumentLines)
        if(res.data.value[0].DocumentStatus == 'bost_Open'){
          setgetStatus("Open")
       }else{
          setgetStatus("Close")
       }
      let sum = 0
        res.data.value[0].DocumentLines.forEach(item => {
                sum = sum + item.LineTotal         
        })
        setTotalbforeDiscount(sum)
        if(HeaderData!=""){
          setButtonName("Update")
        }
      })
      .catch({})
  }
  const submitPatchPO = async () => {
    let docLines = []
    SearchDocumentLines.forEach(element => {
      docLines.push({
        RequiredDate: element.RequiredDate,
        ItemCode: element.ItemCode,
        ItemDescription: element.ItemDescription,
        MeasureUnit: element.MeasureUnit,
        FreeText: element.FreeText,
        RequriedDate: element.RequiredDate,
        RequiredQuantity: element.Quantity,
        BaseOpenQuantity: element.RemainingOpenQuantity,
        U_MPrice: element.U_MPrice,
        LineVendor: element.LineVendor,
        CostingCode: element.CostingCode,
        ProjectCode: element.ProjectCode,
        SalesPersonCode: element.SalesPersonCode,
        WarehouseCode: element.WarehouseCode,
        "DistributeExpense": "tYES",
        "DocumentLineAdditionalExpenses": [
            {
                "ExpenseCode": 1,
                "LineTotal": element.FreightCharges
            }
        ],
      })
    })
    let body = {
      Comments: getcomments,
      DocumentLines: docLines,
      AttachmentEntry:attachmentresponse
    }
    Patch(HeaderData.DocEntry, body)
  }
  const Submit_PatchFunc=()=>{

    if(ButtonName=="Add"){
      submitPO()
    }else if(ButtonName!="Add"){
      submitPatchPO()
    }
  }
  const submitPO = async () => {
    let DocLines = []
    let SelectedDocLines = []
    let body = {}
    SelectedItems.forEach(element => {
      DocLines.push({
        "Father": getItemsnumber.productNo,
        "StageID": element.Sequence,
        // "SequenceNumber": 1,
        "StageEntry":element.StageEntry,
        "Name": element.RouteStage
      })
    })
      SelectedItems.forEach(element => {
        if(element.Type==='pit_Text'){
          SelectedDocLines.push({
            LineText:element.LineRemarks,
            ItemType: element.Type,
            StageID:element.Sequence=== 0 ? null : element.Sequence
          })
        }else{
        SelectedDocLines.push({
          ItemCode: element.ItemCode ? element.ItemCode : element.Resource ,
          Quantity: element.Quantity,
          // Price: element.UnitPrice,
          Warehouse: element.warehouse,
          // WipAccount: element.wip_account,
          ParentItem: getItemsnumber.productNo,
          IssueMethod: element.issueMethod,
          // "InventoryUOM": null,
          Comment:  element.Comments,
          // "PriceList": 1,
          AdditionalQuantity: element.addtionalqty,
          Project:  element.project,
          ItemType: element.Type,
          StageID:element.Sequence=== 0 ? null : element.Sequence
          // "U_Comments": null
        })
      }
      })
      // body['ProductTreeLines'] = SelectedDocLines.slice(0,-1)
      // body['ProductTreeLines'] = SelectedDocLines.filter(function (el) {return el.ItemCode !== null ;});
      body['ProductTreeStages'] = DocLines.filter((el)=> {return el.Name !== undefined  && JSON.stringify(el) !== '{}' ;})
      body['ProductTreeLines'] = SelectedDocLines.filter( (el)=> {return el.ItemType !== undefined && el.ItemType !== "RouteStage" && JSON.stringify(el) !== '{}';});
      // body['ProductTreeStages'] = SelectedDocLines.filter(function (el) {return el.ItemType === "RouteStage" && el.ItemCode !== null;});
      
      // body['ProductTreeLines'] = SelectedDocLines.filter(function (el) {return el.ItemCode != null || el.Resource != null || el.RouteStage != null;});
     
      body['TreeCode'] = getItemsnumber.productNo
      body['PlanAvgProdSize'] = getItemsnumber.avrageProductionSize
      body['Quantity'] = getItemsnumber.Quantity
      body['TreeType'] = getItemsnumber.bomType
      // body['ProductDescription'] = getproductiondesc
      // body["DistributionRule"]=getItemsnumber.dimensions
      body['Project'] = getItemsnumber.project
      body['PriceList'] =  getItemsnumber.pricelist
      body['Warehouse'] = getItemsnumber.warehouse
      // body['AttachmentEntry'] =attachmentresponse
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.Production.BOM,
          cookie: cook
        })
        .then(function (res) {
          if (res.data.TreeCode) {
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
  const handleSubmitted = ({ res, fields,Dropdown, form }) => {
 
    form.reset() 
    Dropdown.reset()
  }

  const getinputvalues = async (e) =>{
    let obj = getItemsnumber
    obj[e.target.name] = e.target.value
    setgetItemsnumber(obj)
  }
  const getdropdownvalues = async (e,name) =>{
    let obj = getItemsnumber
    obj[name] = e.value
    setgetItemsnumber(obj)
  
  }
  const itemsChange = async (e,index) =>{
    let obj = SelectedItems
    obj[index][e.target.name]=e.target.value
    setSelectedItems(obj)
  }
  const itemsChange22 = async (name,value,index) =>{
    let obj = SelectedItems
    obj[index][name]=value
  obj[index]['Sequence'] = getstageid
  setgetstageid(obj[index]['Sequence'])
  obj[`ùpdate${update+1}`]= update+1;
  setUpdate(update+1);
    setSelectedItems([...SelectedItems,obj])
  }
  const getdropdownvalue = async (e,index,name) =>{
    let obj = SelectedItems
    obj[index][name]=e.value
    setSelectedItems(obj)
  }
  const DocTypeChange = (e,index,name) =>{
    let doclines = SelectedItems
    doclines[index][name] = e.value
  doclines[`ùpdate${update+1}`]= update+1;
  setUpdate(update+1);
    setSelectedItems(doclines)
if(e.value === 'pit_Item'){
  setgetitemdoctype('pit_Item')
  setgetresourcedoctype()
  setgettextdoctype()
  setgetroutestagedoctype()
}else if(e.value==='pit_Resource'){
  setgetitemdoctype()
  setgetresourcedoctype('pit_Resource')
  setgettextdoctype()
  setgetroutestagedoctype()
}else if(e.value==='pit_Text'){
  setgetitemdoctype()
  setgetresourcedoctype()
  setgettextdoctype('pit_Text')
  setgetroutestagedoctype()
}else if(e.value==='RouteStage'){
  setgetitemdoctype()
  setgetresourcedoctype()
  setgettextdoctype()
  setgetroutestagedoctype('RouteStage')
}
  }
  const stateOptions = [
    { value: "A", label: "Assembly" },
    { value: "S", label: "Sales" },
    { value: "P", label: "Production" },
    { value: "T", label: "Template" }]
    const typeOptions = [
      { value: "Item", label: "Item" },
      { value: "Text", label: "Text" },
      { value: "Route_Stage", label: "Route Stage" },
      { value: "4", label: "Template" }]

      const Add = () => {
        if (noOfRows !== 10) {
          setNoOfRows(noOfRows + 1);
          // setTabLable("")
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
      {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <h1 style={{ textAlign: 'center' }}>Bill of Materials</h1>
      {/* Upper Side++++++++ */}
<Form onSubmit={handleSubmitted}>
      <CardGroup>
        <DIV3>
          <Container fluid>
          {/* <label>Doc Type</label> */}
          <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Product No.</label>
              <Select
                placeholder={ HeaderData && HeaderData.CardName||SelectedPRDocEntry&&SelectedPRDocEntry.ContactPersonCode}
                options={ItemsDropDown} // Options to display in the dropdown
                onChange={e=>{getdropdownvalues(e,'productNo'); setgetproductiondesc(e.item.ItemName)}} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Production Description</label>
              <input
              readOnly
              value={getproductiondesc}
                // value={SelectedPRDocEnStry && SelectedPRDocEntry.NumAtCard||HeaderData && HeaderData.NumAtCard}
                type='text'
                class='form-control'
                id='exampleInputEmail1'
            
                // onChange={e=>{setgetnumatcard(e.target.value)}}
                // aria-describedby='emailHelp'
                placeholder=''
              ></input>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Quantity</label>
              <input
                // value={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard||HeaderData && HeaderData.NumAtCard}
                type='text'
                class='form-control'
                id='exampleInputEmail1'
                name='Quantity'
                onChange={e=>{getinputvalues(e)}}
                placeholder=''
              ></input>
              </div>
            <label>BOM Type</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
              <Select
                placeholder={ HeaderData && HeaderData.CardName||SelectedPRDocEntry&&SelectedPRDocEntry.ContactPersonCode}
                options={stateOptions} // Options to display in the dropdown
                onChange={e=>{getdropdownvalues(e,'bomType')}} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Production Std Cost</label>
              <input
                // value={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard||HeaderData && HeaderData.NumAtCard}
                type='text'
                class='form-control'
                id='exampleInputEmail1'
                name='stdCost'
                onChange={e=>{getinputvalues(e)}}
                placeholder=''
              ></input>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Planned Average Production Size</label>
              <input
                // value={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard||HeaderData && HeaderData.NumAtCard}
                type='number'
                class='form-control'
                id='exampleInputEmail1'
                name='avrageProductionSize'
                onChange={e=>{getinputvalues(e)}}
                placeholder=''
              ></input>
            </div>
            <br />
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV3>
          <Container>
          {/* <div style={{marginLeft:'3rem'}}>
          <label>BOM Type</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
              <Select
                placeholder={ HeaderData && HeaderData.CardName||SelectedPRDocEntry&&SelectedPRDocEntry.ContactPersonCode}
                options={VendorCodeDropdown} // Options to display in the dropdown
                onChange={e => {
                  VendorChange(e)
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
             </div>
        
            <br/> */}
            {/* <Button
             style={{marginLeft:'3rem'}}
              onClick={e => {
                SearchAll_Filter_Data()
              }}
            >
              Search
            </Button><br/> */}
            {/* <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
            <label>No</label>
            <input
              type='number'
              readOnly='readOnly'
              defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocNum|| HeaderData && HeaderData.DocNum}
              class='form-control' />
              </div> */}
              
                <div style={{ width: '23.5rem', height: 'auto'  , marginLeft:'3rem' }}>
                <label>Warehouse</label>
                  {/* {ItemsDropDown && ( */}
                    <Select
                      // isMulti
                      placeholder='Select '
                      options={PrWhse} // Options to display in the dropdown
                      onChange={e=>{getdropdownvalues(e,'warehouse')}} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                    </div>
                    <div style={{ width: '23.5rem', height: 'auto'  , marginLeft:'3rem' }}>
                <label>Price List</label>
                  {/* {ItemsDropDown && ( */}
                    <Select
                      placeholder='Select'
                      options={getPriceListDropdown} // Options to display in the dropdown
                      onChange={e=>{getdropdownvalues(e,'pricelist')}} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                    </div>
              <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
            <label>Distr. Rule</label>
            <Select
                placeholder={ HeaderData && HeaderData.CardName||SelectedPRDocEntry&&SelectedPRDocEntry.ContactPersonCode}
                options={dimensionsdropdown} // Options to display in the dropdown
                onChange={e=>{getdropdownvalues(e,'dimensions')}}// Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
            <label>Project</label>
            <Select
                placeholder={ HeaderData && HeaderData.CardName||SelectedPRDocEntry&&SelectedPRDocEntry.ContactPersonCode}
                options={PrProject} // Options to display in the dropdown
                onChange={e=>{getdropdownvalues(e,'project')}} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
              {/* <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
            <label> Document Date</label>
            <input
              type='date'
              name='DocumentDate'
              class='form-control'
              value={SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate||HeaderData && HeaderData.DocDueDate}
              onChange={e => {
                dateChange(e)
              }}
            />
            </div> */}
           <br/>
          </Container>
        </DIV3>
      </CardGroup>
        <Table responsive striped bordered hover>
          <TableHead>
            <tr>
            <th>#</th>
                  <th>Type</th>
                  <th>No.</th>
                  <th>Description</th>
                  <th>UoM Name</th>
                  <th>Quantity</th>
                  <th>Warehouse</th>
                  <th>Issue Method</th>
                  <th>Prduction Std Cost</th>
                  <th>Total Production Std Cost</th>
                 <th>Comments</th>
                 <th>Distr. Rule</th>
                 <th>Additional Quantity</th>
                 <th>Project</th>
                 <th>Route Sequence</th>
            </tr>
          </TableHead>
          <tbody>
            {SelectedItems&&SelectedItems.map((element, index) => (
              <tr >
                <TD>{index + 1}</TD>
                <TD>
            <div style={{width: '14rem', height: 'auto' }} variant='primary' >
              <Select id="1"
                                            menuPortalTarget={document.body}
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.DocType||HeaderData && HeaderData.DocType}
                options={[
                  { label: 'Item', value: 'pit_Item' },
                  { label: 'Resource', value: 'pit_Resource' },
                  { label: 'Text', value: 'pit_Text' },
                  { label: 'Route Stage', value: 'RouteStage' },
                ]} // Options to display in the dropdown
                onChange={e => {
                  DocTypeChange(e,index,'Type')
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div></TD>
                <TD>
                {element.Type === 'pit_Item'?(
              <>
                <div style={{width: '14rem', height: 'auto' }}>
                  {/* {ItemsDropDown && ( */}
                    <Select id="item_1"
                                            menuPortalTarget={document.body}
                      placeholder='Select'
                      options={ItemsDropDown11} // Options to display in the dropdown
                      onChange={e=>{ItemsDropDownfunc(e,index,'ItemCode')}} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                  {/* )} */}
                </div><br/>
                </>
            ):null}
             {element.Type === 'pit_Resource'?(
              <>
                <div style={{width: '14rem', height: 'auto' }}>
                  {/* {ItemsDropDown && ( */}
                    <Select
                                            menuPortalTarget={document.body}
                      placeholder='Select'
                      options={ItemsDropDown2} // Options to display in the dropdown
                      onChange={e=>{ItemsDropDownfunc22(e,index,'Resource')}} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                </div><br/>
                </>
            ):null}
             {element.Type === 'pit_Text'?(
              <>
                <div style={{width: '14rem', height: 'auto' }}>
                    <Select
                                            menuPortalTarget={document.body}
                      isDisabled={element.Type==='pit_Text'?true:false}
                      options={ItemsDropDown} // Options to display in the dropdown
                      onChange={e=>{ItemsDropDownfunc(e,index,'Text')}} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                </div><br/>
                </>
            ):null}
              {element.Type === 'RouteStage'?(
              <>
                <div style={{width: '14rem', height: 'auto' }}>
                    <Select
                                            menuPortalTarget={document.body}
                      placeholder='Select'
                      options={ItemsDropDown3} // Options to display in the dropdown
                      onChange={e=>{ItemsDropDownfunc33(e,index,'RouteStage')}} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                </div><br/>
                </>
            ):null}
                  </TD>
                <TD>
                  <div style={{ width: '14rem', height: 'auto' }}>
                    <input
                      name='Description'
                      type='text'
                      class='form-control'
                      readOnly
                      value={element.Type === 'RouteStage' ? (element.RouteStage):(element.ItemCode?ItemsDetails2[element.ItemCode].ItemName:element.ResourceName)}
                    />
                  </div>
                 </TD>
                <TD>
                  {element.Type === 'RouteStage' ? null :(element.ItemCode?ItemsDetails2[element.ItemCode].PurchaseUnit:element.ResourceUnit)
                  }
                </TD>
                <TD>
                  <div style={{ width: '14rem', height: 'auto' }}>
                    <input
                      type='number'
                      name='Quantity'
                      disabled={element.Type==='pit_Text'|| element.Type === 'RouteStage'?true:false}
                      class='form-control'
                      aria-describedby='Requesterid'
                      // defaultValue={item.RequiredQuantity}
                      onChange={e => {
                        itemsChange(e, index)
                      }}
                    />
                  </div>
                </TD>
                <TD>
                  <div style={{ width: '14rem', height: 'auto' }}>
                  {/* {ItemsDropDown && ( */}
                    <Select
                                            menuPortalTarget={document.body}
                      isDisabled={element.Type==='pit_Text' || element.Type === 'RouteStage'?true:false}
                      placeholder='Select '
                      options={PrWhse} // Options to display in the dropdown
                      onChange={e=>{getdropdownvalue(e,index,'warehouse')}}// Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                    </div>
                </TD>
                <TD>
            <div style={{width: '14rem', height: 'auto' }} variant='primary' >
              <Select 
                                            menuPortalTarget={document.body}
               isDisabled={element.Type==='pit_Text' || element.Type === 'RouteStage' ?true:false}
                options={[
                  { label: 'Manual', value: 'im_Manual' },
                  { label: 'Backflush', value: 'im_Backflush' },
                ]} // Options to display in the dropdown
                onChange={e=>{getdropdownvalue(e,index,'issueMethod')}} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div></TD>
                <TD>
                  <div style={{ width: '14rem', height: 'auto' }}>
                    <input
                      type='number'
                      name='std_cost'
                      class='form-control'
                      readOnly
                      // onChange={e => {
                      //   itemsChange(e, index)
                      // }}
                      // defaultValue={it/QuotedQuantity}
                    />
                  </div>
                </TD>
                <TD>
                  <div style={{ width: '14rem', height: 'auto' }}>
                    <input
                      name='total_std_cost'
                      type='number'
                      class='form-control'
                      readOnly
                    />
                  </div>
                </TD>
                <TD>
                 {element.Type==='pit_Text'?(
                  <div style={{ width: '14rem', height: 'auto' }}>
                    <input
                      name='LineRemarks'
                      type='text'
                      class='form-control'
                      // onChange={e => {
                      //   itemsChange22(e, index)
                      // }}
                      onKeyPress={(e) => {
                        if(e.key === 'Enter' || e.key === 'NumpadEnter'){
                          itemsChange22(e.target.name,e.target.value,index)
                        }
                      }}
                    />
                  </div>):
                   <div style={{ width: '14rem', height: 'auto' }}>
                   <input
                     name='Comments'
                     // readOnly={element.Type==='pit_Text'?false:true}
                     type='text'
                     disabled={ element.Type === 'RouteStage'? true : false}
                     class='form-control'
                     onChange={e => {
                       itemsChange(e, index)
                     }}
                   />
                 </div>
                  }
                </TD>
                  <TD>
                <div style={{ width: '14rem', height: 'auto' }}>
                    <Select
                                            menuPortalTarget={document.body}
                      // isMulti
                      isDisabled={element.Type==='pit_Text' || element.Type === 'RouteStage'?true:false}
                      placeholder='Select '
                      options={dimensionsdropdown} // Options to display in the dropdown
                      onChange={e=>{getdropdownvalue(e,index,'dimensions')}} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                    </div>
                </TD>
                <TD>
                  <div style={{ width: '14rem', height: 'auto' }}>
                    <input
                      name='addtionalqty'
                      type='number'
                      disabled={element.Type==='pit_Text' || element.Type === 'RouteStage'?true:false}
                      class='form-control'
                      onChange={e => {
                        itemsChange(e, index)
                      }}
                    />
                  </div>
                </TD>
                <TD>
                <div style={{ width: '14rem', height: 'auto' }}>
                    <Select
                                            menuPortalTarget={document.body}
                      // isMulti
                      isDisabled={element.Type==='pit_Text' || element.Type === 'RouteStage'?true:false}
                      placeholder='Select '
                      options={PrProject} // Options to display in the dropdown
                      onChange={e=>{getdropdownvalue(e,index,'project')}} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                    </div>
                </TD>
                <TD>
                  <div style={{ width: '14rem', height: 'auto' }}>
                    <input
                      name='Sequence'
                      type='number'
                      readOnly
                      value={element.Sequence}
                      class='form-control'
                      // onChange={e => {
                      //   
                      // }}
                    />
                  </div>
                </TD>
              </tr>
            ))} 
          </tbody>
        </Table>
   
      {/* Bottom Side+++++++++ */}
      <CardGroup>
        <DIV3>
          <Container fluid>
            
            
            <br />
            <br />
            <br />
            <br />
            <div>
            <Button style={{ marginLeft: '5%' }} onClick={() => {Submit_PatchFunc()}} disabled={isSubmitting}>
            {ButtonName}
            </Button>
              <Button variant="secondary" style={{ marginLeft: '5%' }}
                onClick={() => {
                  window.location.href="/Home"
                }}
              >Cancel</Button>
            </div>
          </Container>
        </DIV3>
        <DIV4></DIV4>
        <DIV3>
          <div>
            <div style={{ width: '23.5rem'  , marginLeft:'4rem' }}>
              <label style={{ marginTop: '10%' }}>
               Product Price</label>
              <input
              readOnly='readOnly'
                type='number'
                step='any'
                // value={getnetTotal||totalbforeDiscount}
               //value={((SelectedPRDocEntry && SelectedPRDocEntry.DocTotal ||  HeaderData && HeaderData.DocTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.TotalDiscountSC || HeaderData && HeaderData.TotalDiscountSC || 0)) - ((PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.VatSumSys || HeaderData && HeaderData.VatSumSys || 0))}
                // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                class='form-control' />
            </div>
        </div>
        </DIV3>
      </CardGroup>
      </Form>
    </>
  )
}
