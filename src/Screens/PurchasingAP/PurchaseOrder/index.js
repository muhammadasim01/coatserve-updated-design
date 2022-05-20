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
import {MdDelete} from 'react-icons/md'
import { Navbar } from '../../../Component/Global'
import { useAlert } from "react-alert";
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import './index.css'
import Switch from "react-switch";
const axios = require('axios')
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function PurchaseOrder() {
  const alert = useAlert();
  const [SelectShow, setSelectShow]=React.useState()
  const [getdisabledvalue, setgetdisabledvalue]=React.useState(false)
  const [getpostingdate, setgetpostingdate]=React.useState()
  const [bothbodies, setbothbodies] = React.useState(false)
  const [getdeliverydate, setgetdeliverydate]=React.useState()
  const [getautounitprice, setgetautounitprice]=React.useState()
  const [CurrencyRateData, setCurrencyRateData] = React.useState()
  const [gettablecontroller, setgettablecontroller] = React.useState("selectedItems")
  const [getcomments, setgetcomments]=React.useState()
  const [loading, setLoading] = React.useState(false);
  const [valuechanger, setvaluechanger] = React.useState(true)
  const [CurrencyDropdown, setCurrencyDropdown] = React.useState()
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [update, setUpdate] = React.useState(1)
  const [getdocumenttype, setgetdocumenttype] = React.useState("22")
  const [getdocumentname, setgetdocumentname] = React.useState("POR2");
  const [ModuleName, setModuleName] = React.useState("PurchaseOrders")
  const [getcurrencycode, setgetcurrencycode] = React.useState()
  const [getcurrencyrate, setgetcurrencyrate] = React.useState()
  const [getserviceseries, setgetserviceseries] = React.useState()
  const classes = useStyles();
  const [show, setShow] = React.useState(false)
  const [CPDropdown, setCPDropdown] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [OpenQty, setOpenQty] = React.useState()
  const [SelectedCP, setSelectedCP] = React.useState()
  const [SelectedOwner, setSelectedOwner] = React.useState()
  const [SelectedBuyer, setSelectedBuyer] = React.useState()
  const [SearchPR, setSearchPR] = React.useState()
  const [getprioity, setgetprioity] = React.useState()
  const [getStatus, setgetStatus] = React.useState()
  const [text, settext] = React.useState("")
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [ButtonName, setButtonName] = React.useState();
  const [SelectedVendor, setSelectedVendor] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState()
  const [SelectedItems, setSelectedItems] = React.useState([{'ItemCode':'','UOM_Name':'' }])
  const [PRBody, setPRBody] = React.useState({})
  const [getnumatcard, setgetnumatcard] = React.useState()
  const [DelDate, setDelDate] = React.useState()
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [PrProject, setPrProject] = React.useState()
  const [PrCost, setPrCost] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [showA, setShowA] = React.useState(false)

  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [TaxCode, setTaxCode] = React.useState()
  const [Frieght, setFrieght] = React.useState()
  const [PrBuyer, setPrBuyer] = React.useState()
  const [PrOwner, setPrOwner] = React.useState()
  const [PrWhse, setPrWhse] = React.useState()
  const [TodayDate, setTodayDate] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState('0020545074')
const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [OwnerPrRe, setOwnerPrRe] = React.useState()
  const [Disply, setDisply] = React.useState(false)
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [getdocumentstatus, setgetdocumentstatus]=React.useState()
  const [GroupNoDropdown, setGroupNoDropdown] = React.useState()
  const [CP, setCP] = React.useState()
  const [getseriesnumbring, setgetseriesnumbring]=React.useState()
  const [GN, setGN] = React.useState()
  const [Price, setPrice] = React.useState()
  const [Discount, setDiscount] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()
  const [Tax, setTax] = React.useState()
  const [gettaxtotal, setgettaxtotal] = React.useState(0)
  const [getnetTotal, setgetnetTotal] = React.useState(0)
  const [total, setTotal] = React.useState()
  const [TotalGross, setTotalGross] = React.useState()
  const [BottomTax, setBottomTax] = React.useState()
  const [BottomDiscount, setBottomDiscount] = React.useState()
  const [TotalPayment, setTotalPayment] = React.useState()
  const [DiscountTotal, setDiscountTotal] = React.useState(0)
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

   const [getdirectdoctype, setgetdirectdoctype] = React.useState('Direct')
   const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState()
 
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  }
  React.useEffect(async () => {
    today()
    compareDate()
    setLiveGetInstallationNumber2('0020545074')
    await setgetdocumentname("POR2")
    await setModuleName("PurchaseOrders")
    await setgetdocumenttype("22")
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
    getcurrencyratefunction(cook)
    getaddcurrencyfunction(cook)
    BusinessPartners(cook)
    Project(cook)
    CostCentre(cook)
    Buyer(cook)
    Owner(cook)
    // Whse(cook)
    PurchaseQuotation(cook)
    OwnerPurchaseRequest(cook)
    Frieght1(cook)
    TableTaxCode(cook)
  
  }, [])
 
  const getaddcurrencyfunction = async (cook) => {
    let sapAPi = `SQLQueries('currencyrate')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("CurrencyRate",res)
        setCurrencyRateData(res.data.value)
      })
      .catch({})
  }
  const getcurrencyratefunction = async cook => {
    let body = {
      "SqlCode": "currencyrate",
      "SqlName": "currencyrate",
      "SqlText": "Select RateDate, Currency, Rate, UserSign From ORTT"
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
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const Currencies = async (e) => {
    console.log(e.item.Currency)
    let cook = await localStorage.getItem('cookie')
    const api = `${LINKS.api}/GetApi`
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    if(e.item.Currency === "##"){
    let SAPapi = `Currencies?$select=Code,Name,DocumentsCode`
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
              value: element.Code,
              label: element.Code + ' : ' + element.Name
            })
          })
          setCurrencyDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }else if(e.item.Currency !== "##"){
      let SAPapi = `Currencies?$select=Code,Name,DocumentsCode &$filter=Code eq '${e.item.Currency}'`
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
                value: element.Code,
                label: element.Code + ' : ' + element.Name
              })
            })
            setCurrencyDropdown(ItemsDropDown)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else{
      let SAPapi = `Currencies?$select=Code,Name,DocumentsCode`
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
                value: element.Code,
                label: element.Code + ' : ' + element.Name
              })
            })
            setCurrencyDropdown(ItemsDropDown)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
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
  const today = () =>{
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    setgetpostingdate(year + "-" + month + "-" + day)
    setgetdeliverydate(year + "-" + month + "-" + day)
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
        console.log(res)
   if (Date.parse(currentComDate) > getDate ) {
      alert.error("License Expired")
      window.location.href="/DisabledHomeScreen";
    } 
    // else  if (res.data !=  LiveGetInstallationNumber2 ) {
    //   alert.error("Provided Key Does not match")
    //   // window.location.href="/DisabledHomeScreen";
    // }
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
              label: element.CardCode + ' : ' + element.CardName,
              item:element
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

  const GetItems = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.purchaseItems,
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
          ItemsGroupCode:element.ItemsGroupCode,
          RequiredQuantity: 1,
          ItemWarehouseInfoCollection:element.ItemWarehouseInfoCollection,
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
  const ItemsDropDownfunc = async (selectedList,index,name) => {
    // PriceListFromAPI(selectedList.item.SWW)
    let doclines = SelectedItems
    doclines[index]['ItemCode'] = selectedList.value
    doclines[index]['ItemName'] = selectedList.item.ItemName
    doclines[index]['LineNum'] = index
    doclines[index]['PurchaseUnit'] = selectedList.item.PurchaseUnit
    doclines[`ùpdate${update + 1}`]= update + 1;
    setUpdate(update + 1);
    setSelectedItems(doclines)
}
//   const ItemsDropDownfunc = async selectedList => {
//     let list = []
//     selectedList.forEach(element => {
// if(element.item.ItemsGroupCode === 128){
//   setgetdisabledvalue(false)
// }else{
//   setgetdisabledvalue(true)
// }
//       list.push(element.value)
//     })
//     await setSelectedItems(list)
//   }
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
          `Items Details Response Error : <-- ${res.data.error.message} -->`
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
  const getUnitPricesfromCardcode = async (getCardCode) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    
    let cook = await localStorage.getItem('cookie')
    let SAPapi = `SpecialPrices?$select=CardCode,DiscountPercent,ItemCode,Price &$filter=CardCode eq '${getCardCode}'`
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cook
      })
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let CardCodeDetails = []
          res.data.value.forEach(element => {
            CardCodeDetails[element.ItemCode] = {
              ItemCode: element.ItemCode,
              CardCode:element.CardCode,
              Price:element.Price,
              DiscountPercent:element.DiscountPercent,
            }
          })
          console.log('CardCodeDetails',CardCodeDetails)
          setgetautounitprice(CardCodeDetails)
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
  
  const TableTaxCode = async (cook) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
  
    let SAPApi = `VatGroups?$select=Code,Name,VatGroups_Lines&$filter=Inactive eq 'tNO' and Category eq 'bovcInputTax'`
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
  const dateChange = e => {
    let prBody = PRBody
    prBody[e.target.name] = e.target.value
    setPRBody(prBody)
  }
  const ShipDateChange = (e, index,PrReIndex, name) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index]['ShipDate'] = e.target.value
    setShipDate(itemDetail)
  }
  const SearchShipDateChange = (e, index, name) => {
    let itemDetail = SearchDocumentLines
    itemDetail[index]['ShipDate'] = e.target.value
    setSearchDocumentLines(itemDetail)
  }
  const DeliveryDateChange = async e => {
    setDelDate(e.target.value)
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
  const DiscountontextChanged = (e, item) => {
    let SelectedDocLines = []
    let itemDetail = SelectedItems
    itemDetail[item][e.target.name] = e.target.value
    itemDetail[item]["PriceAfterDiscount"] =(itemDetail[item].UnitPrice - ( itemDetail[item].UnitPrice * itemDetail[item].Discount / 100)) 
    itemDetail[item]["GrossPriceAfterDiscount"] =(itemDetail[item].PriceAfterDiscount ) 
    itemDetail[item]["Total_LC"] =(Number(itemDetail[item].PriceAfterDiscount) * Number(itemDetail[item].Quantity) )
    itemDetail[item]["GrossTotal"] =(Number(itemDetail[item].GrossPriceAfterDiscount) * Number(itemDetail[item].Quantity))
  
    // SelectedItems.forEach(element => {
    //   SelectedDocLines.push({
    //     Total_LC: ItemsDetails[element]['Total_LC'],
    //   })
    // })
    let sum = 0
    itemDetail.forEach(element => {
            sum = sum + Number([element.Total_LC])      
    })
    setgetnetTotal(sum)
    itemDetail[item][`ùpdate${update+1}`]= update+1;
    setUpdate(update+1);
    setSelectedItems(itemDetail)
  }
  const unitPriceontextChanged = (e, item) => {
    let SelectedDocLines = []
    let itemDetail = SelectedItems
    itemDetail[item][e.target.name] = e.target.value
    itemDetail[item]["PriceAfterDiscount"] = itemDetail[item].UnitPrice
    itemDetail[item]["GrossPriceAfterDiscount"] =itemDetail[item].UnitPrice
    itemDetail[item]["Total_LC"] = itemDetail[item].UnitPrice * itemDetail[item].Quantity 
    itemDetail[item]["GrossTotal"] = itemDetail[item].UnitPrice * itemDetail[item].Quantity 
  
    // SelectedItems.forEach(element => {
    //   SelectedDocLines.push({
    //     Total_LC: ItemsDetails[element]['Total_LC'],
    //     Freight: ItemsDetails[element]['Freight']
    //   })
    // })
    // let sum = 0
    // let sum1 = 0
    // SelectedDocLines.forEach(element => {
    //   console.log("element",element)
    //       sum = sum + element.Total_LC  
    //       sum1 = sum1 + (element.Freight ? Number(element.Freight) : 0 )    
    // })
    let sum = 0
    itemDetail.forEach(element => {
          sum = sum + Number([element.Total_LC])        
    })
    setgetnetTotal(sum)
    // setTotalFreight(sum1)
    itemDetail[item][`ùpdate${update+1}`]= update+1;
    setUpdate(update+1);
    console.log("itemDetail",itemDetail)
    setSelectedItems(itemDetail)
  }
  const testing = (e, item) => {
    
    let SelectedDocLines = []
    let itemDetail = SelectedItems
    itemDetail[item][e.target.name] = e.target.value
    itemDetail[item]["UnitPrice"] =getautounitprice && getautounitprice[itemDetail[item]['ItemCode']].Price + (getautounitprice && getautounitprice[itemDetail[item]['ItemCode']].Price * getautounitprice && getautounitprice[itemDetail[item]['ItemCode']].DiscountPercent / 100)
    itemDetail[item]["DiscountPercent"] = getautounitprice && getautounitprice[itemDetail[item]['ItemCode']].DiscountPercent 
    // itemDetail[item]["AfterDiscount"] =(itemDetail[item].No_Cylinder * itemDetail[item].UnitPrice - (itemDetail[item].No_Cylinder * itemDetail[item].Discount * (itemDetail[item].Discount / 100)))
    itemDetail[item]["Total_LC"] = getautounitprice && getautounitprice[itemDetail[item]['ItemCode']].Price * itemDetail[item].Quantity
  
    // SelectedItems.forEach(element => {
    //   SelectedDocLines.push({
    //     Total_LC: ItemsDetails[element]['Total_LC'],
    //   })
    // })
    // let sum = 0
    // SelectedDocLines.forEach(element => {
    //         sum = sum + element.Total_LC         
    // })
    let sum = 0
    let sum2 = 0
    itemDetail.forEach(element => {
      if(element.ItemCode){
            sum = sum + Number([element.Total_LC]) 
            sum2 = sum2 + Number([element.TaxAmount]) 
          }
    })
    setgetnetTotal(sum)
    setgettaxtotal(sum2)
    itemDetail[item][`ùpdate${update+1}`]= update+1;
    setUpdate(update+1);
    setSelectedItems(itemDetail)
  }
  const ontextChanged = (e, item) => {
    
    let SelectedDocLines = []
    let itemDetail = SelectedItems
    itemDetail[item][e.target.name] = e.target.value
    itemDetail[item]["UnitPrice"] =(itemDetail[item].Circumference * itemDetail[item].FaceLength / 100) * itemDetail[item].Rate
    itemDetail[item]["AfterDiscount"] =(itemDetail[item].No_Cylinder * itemDetail[item].UnitPrice - (itemDetail[item].No_Cylinder * itemDetail[item].Discount * (itemDetail[item].Discount / 100)))
    itemDetail[item]["Total_LC"] =itemDetail[item].AfterDiscount  + itemDetail[item].TaxAmount 
  
    // SelectedItems.forEach(element => {
    //   SelectedDocLines.push({
    //     Total_LC: ItemsDetails[element]['Total_LC'],
    //   })
    // })
    // let sum = 0
    // SelectedDocLines.forEach(element => {
    //         sum = sum + element.Total_LC         
    // })
    let sum = 0
    let sum2 = 0
    itemDetail.forEach(element => {
      if(element.ItemCode){
            sum = sum + Number([element.Total_LC]) 
            sum2 = sum2 + Number([element.TaxAmount]) 
          }
    })
    setgetnetTotal(sum)
    setgettaxtotal(sum2)
    itemDetail[item][`ùpdate${update+1}`]= update+1;
    setUpdate(update+1);
    setSelectedItems(itemDetail)
  }
  const DocLinesDropDownOnChange2 = (selectedItem, item,name) => {
    let itemDetail = SelectedItems
    let SelectedDocLines = []
      itemDetail[item][name] = selectedItem.value
      itemDetail[item]['TaxAmount'] = itemDetail[item].PriceAfterVAT * (selectedItem.item.VatGroups_Lines[0].Rate / 100)
      itemDetail[item]['TaxTotalAmount'] = selectedItem.item.VatGroups_Lines[0].Rate * Number(itemDetail[item].Quantity)
      itemDetail[item]["GrossPriceAfterDiscount"] =(itemDetail[item].PriceAfterDiscount +  itemDetail[item].TaxAmount ) 
      itemDetail[item]["Total_LC"] =((Number(itemDetail[item].PriceAfterDiscount * Number(itemDetail[item].Quantity)) ) )
      itemDetail[item]["GrossTotal"] =((itemDetail[item].GrossPriceAfterDiscount * Number(itemDetail[item].Quantity)))
      // SelectedItems.forEach(element => {
      //   SelectedDocLines.push({
      //     Total_LC: ItemsDetails[element]['Total_LC'],
      //     TaxAmount: ItemsDetails[element]['TaxAmount'],
      //   })
      // })
      let sum = 0
      let sum2 = 0
      let sum3 = 0
     
      itemDetail.forEach(element => {
        if(element.ItemCode){
        sum = sum + Number([element.Total_LC])    
        sum2 = sum2 + Number([element.TaxAmount])     
      }  
})
      setgetnetTotal(sum)
      setgettaxtotal(sum2)
    itemDetail[item][`ùpdate${update+1}`]= update+1;
    setUpdate(update+1);
    setSelectedItems(itemDetail);
  }
  const DocLinesDropDownOnChange22 = (selectedItem, item,name) => {
    let itemDetail = SelectedItems
    itemDetail[item][name] = selectedItem.value
    itemDetail['update'] = update + 1
    setUpdate(update + 1)
    setSelectedItems(itemDetail);
  }
  const ontextChanged2222 = (e,item) => {
    let itemDetail = SelectedItems
    itemDetail[item][e.target.name] = e.target.value
    setSelectedItems(itemDetail)
  }
  const SearchontextChanged = (e, index,item) => {
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
    let SAPapi = `PurchaseQuotations?$filter=DocumentStatus eq 'bost_Open' and CardCode eq '${SelectedVendor}' &$orderby=DocNum asc`;
    
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
    setHeaderData(item)
    localStorage.setItem('getDocEntry',item.DocEntry);
    setgettablecontroller("SearchDocumentLines")
    setSearchDocumentLines(item.DocumentLines)
    // setcurrentDate(item.DocDate)
    if(item.DocumentStatus == 'bost_Open'){
      setgetStatus("Open")
      setButtonName('Update')
   }else{
      setgetStatus("Close")
      setButtonName('OK')
   }
//    let sum = 0
//    item.DocumentLines.forEach(item => {
//     sum = sum + item.LineTotal         
// })
// setgetnetTotal(sum)
  }
  const ontextItemChanged = e => {
    let itemDetail = TextItemChangedObject
    itemDetail[e.target.name] = e.target.value
    setTextItemChangedObject(itemDetail)
  }
  const SearchAll_Filter_Data = async () => {
    if(SearchNumber==="0"){
      SearchPRNumberAll()
    }
    else{
      SearchPRNumberFilter()
    }
  }
  const SearchPRNumberAll = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let cook = await localStorage.getItem('cookie')
    if(getdocumentstatus){
      let sapAPi = `PurchaseOrders?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum desc` 
      await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
      })
      .catch({})
    setShow1(true)
    }else{
      let sapAPi = `PurchaseOrders?$orderby=DocNum desc` 
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
  const deleteobject = (e,item,index) =>{
    var newArrayList = [] ;
    let obj=SelectedItems
    var filtered = obj.filter(function (el) {
      return el != null || el != [];
    });
    filtered[index]['LineNum'] = index
    newArrayList = filtered.filter(element => element.LineNum != index );
    let sum = 0
    newArrayList.forEach(element => {
      if(element.ItemCode){
          sum = sum + element.Total_LC 
      }      
    })
    setgetnetTotal(sum)  
    newArrayList['update'] = update + 1
    console.log("newArrayList",newArrayList)
    setSelectedItems(newArrayList)
    setUpdate(update + 1)
  }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `PurchaseOrders?$filter=DocNum eq ${SearchNumber} &$orderby=DocNum asc`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res)
       setHeaderData(res.data.value[0])
       localStorage.setItem('getDocEntry',res.data.value[0].DocEntry);
       setgettablecontroller("SearchDocumentLines")
        setSearchDocumentLines(res.data.value[0].DocumentLines)
        if(res.data.value[0].DocumentStatus == 'bost_Open'){
          setgetStatus("Open")
       }else{
          setgetStatus("Close")
       }
      // let sum = 0
      //   res.data.value[0].DocumentLines.forEach(item => {
      //           sum = sum + item.LineTotal         
      //   })
      //   setgetnetTotal(sum)
        if(HeaderData!=""){
          setButtonName("Update")
        }
      })
      .catch({})
  }
  const DocLinesDropDownOnChange = (selectedItem, index, PrReIndex,name) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value
    itemDetail[PrReIndex].DocumentLines[index]['GrossPrice'] = selectedItem.item.VatGroups_Lines[0].Rate
    setPQDocumentLines(itemDetail);
  }
 
  const SearchDocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = SearchDocumentLines
    itemDetail[index][name] = selectedItem.value
    itemDetail[index]['GrossPrice'] = selectedItem.item.VatGroups_Lines[0].Rate
    setSearchDocumentLines(itemDetail);
  }
  const Home = () => {
    const alert = useAlert();
  
  };
  const VendorChange = e => {
    setSelectedVendor(e.value)
  }
  const OpenQtyFunction = (e, index) => {
    let doclines = PQDocumentLines;
    const value = e.target.value
    doclines[index]['RemainingOpenQuantity'] = (value);
    setPQDocumentLines(doclines);
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
        Quantity:element.Quantity,
        RequriedDate: element.RequiredDate,
        RequiredQuantity: element.Quantity,
        BaseOpenQuantity: element.RemainingOpenQuantity,
        U_MPrice: element.U_MPrice,
        LineVendor: element.LineVendor,
        CostingCode: element.CostingCode,
        ProjectCode: element.ProjectCode,
        SalesPersonCode: element.SalesPersonCode,
        WarehouseCode: element.WarehouseCode,
      })
    })
    let body = {
      Comments: getcomments,
      DocumentLines: docLines,
      DocCurrency : getcurrencycode,
      DocRate : getcurrencycode === "PKR" ? 1 : getcurrencyrate ,
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
    var filtered = SelectedItems.filter(function (el) {
      return el != null || el != [];
    });
    let DocLines = []
    let SelectedDocLines = []
    let body = PRBody
    if(getdirectdoctype === 'Direct'){
      filtered.forEach(element => {
        if(element.ItemCode){
        SelectedDocLines.push({
          ItemCode: element.ItemCode,
          FreeText: element.FreeText,
          LineTotal: element.Total_LC,
          TaxCode: element.VatGroup,
          Quantity: element.Quantity,
          DiscountPercent: element.Discount,
          Price:element.PriceAfterDiscount,
          VatGroup: element.VatGroup === undefined ? "P2" : element.VatGroup,
          UnitPrice: element.UnitPrice,
          ProjectCode: element.Project,
          WarehouseCode: element.Whse,
          DistributeExpense: 'tYES',
          DocumentLineAdditionalExpenses: [
            {
              ExpenseCode: element.FreightCode,
              LineTotal:element.Freight
            }
          ],
        })
      }
      })
      body['DocumentLines'] = SelectedDocLines
      body['CardCode'] = SelectedVendor
      body['NumAtCard'] = getnumatcard
      body["DiscountPercent"]=disc
      body['AttachmentEntry'] =attachmentresponse
       //Component posting------
       body['Address'] = getAddress
       body['Address2'] = getAddress2
       body['TransportationCode'] = getTransportationCode
       body['JournalMemo'] = getJournalMemo
       body['GroupNumber'] = getGroupNumber
       body['Project'] = getProject
       body['Series'] = getseriesvalue
       body['DocDate'] = getpostingdate 
       body['DocumentsOwner'] = SelectedOwner
      //  "BPL_IDAssignedToInvoice": 1,
      // body['BPL_IDAssignedToInvoice'] = 1
      //  body['U_Priority'] = getprioity
       body['DocCurrency'] = getcurrencycode
       body['DocRate'] = getcurrencycode === "PKR" ? 1 : getcurrencyrate
       body['SalesPersonCode'] = SelectedBuyer
       body['DocDueDate'] = getdeliverydate
       body['CancelDate'] = getCancelDate
       body['Comments'] = getcomments
       // body['Indicator'] = IndicatorAccounting
    }else{
      PQDocumentLines.forEach(element => {
        if( element.isSelected ){
          element.DocumentLines.forEach(item => {
            if( item.isSelected && item.LineStatus === "bost_Open" ){
        DocLines.push({
          BaseEntry: item.DocEntry,
          BaseType: 540000006,
          BaseLine: item.LineNum,
          "DistributeExpense": "tYES",
          "DocumentLineAdditionalExpenses": [
              {
                  "ExpenseCode": 1,
                  "LineTotal": item.FreightCharges
              }
          ],
      })
      body['DocumentLines'] = DocLines
      body['CardCode'] = SelectedVendor
      body["DiscountPercent"]=disc
      body['NumAtCard'] = getnumatcard
      body['AttachmentEntry'] =attachmentresponse
       //Component posting------
       body['Address'] = getAddress
       body['Address2'] = getAddress2
       body['SalesPersonCode'] = SelectedBuyer
        body['DocumentsOwner'] = SelectedOwner
       body['TransportationCode'] = getTransportationCode
       body['JournalMemo'] = getJournalMemo
       body['GroupNumber'] = getGroupNumber
       body['Project'] = getProject
       body['Series'] = getseriesvalue
       body['DocDate'] = getpostingdate
       body['DocDueDate'] = getdeliverydate
       body['CancelDate'] = getCancelDate
       body['Comments'] = getcomments
      // body['U_Priority'] = getprioity
       // body['Indicator'] = IndicatorAccounting
    }
  });
  }
  })
    }
    console.log("JSON.stringify(body)",JSON.stringify(body))
    console.log("body",body)
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
          api: LINKS.sap.PurchaseOrder.PostPurchaseorder,
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
          api: LINKS.sap.PurchaseOrder.PostPurchaseorder,
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

    setgetnetTotal(sum)

  }
  const QuantityFun = (e,index) => {
    let doclines = PQDocumentLines;
    doclines[index]['Total_LC'] = (doclines[index].PriceAfterVAT * doclines[index].RemainingOpenQuantity);
    setPQDocumentLines(doclines);
  }
 
  const onFreightChanged = (e, index, name) => {
    let itemDetail = PQDocumentLines
    itemDetail[index]['FreightLC'] = e.target.value
    setPQDocumentLines(itemDetail)
    let sum = 0
    PQDocumentLines.forEach(element => {
      sum = sum + element.FreightLC
    });
    setTotalFreight(sum)
  }
  const FreightDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = PQDocumentLines
    itemDetail[index]['Freight'] = selectedItem.value
  }
  const getPrice = async e => {
    setTotal(Price - (Price * Discount) / 100)
  }

  const getTotalPrice = async e => {
    setTotalGross(Tax + total)
  }
  const TotalPaymentDue = async e => {
    setTotalPayment(getnetTotal - DiscountTotal + BottomTax)
  }
  const DiscountPercentage = async e => {
    setDiscountTotal(total * BottomDiscount / 100)
  }

  const [modalOne,setModalOne]=React.useState();
  const [modalTwo,setModalTwo]=React.useState();
 
//   const [modalThree,setModalThree]=React.useState();
//   const [modalFour,setModalFour]=React.useState();
const handleClosee = () => setModalOne(false);
const handleCloseee = () => setModalTwo(false);


function handleShowModalOne() {
    setModalOne("modal-one");
  }
  const handleShowModalTwo = () => {
    setModalTwo ("modal-two")
  }
  const checkboxSelect = (item,index) => {
    let checkboxValue = null
    if(item.isSelected){
      checkboxValue = false
    }
    else{
      checkboxValue = true
    }
    let prData = PrRe
    prData[index]['isSelected'] = checkboxValue
    setPQDocumentLines(prData);
    
  }
  const docLineSelectedSwitch=(PrReIndex,item,index)=>{
    setgettablecontroller("PQDocumentLines")
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
    
  }
  const selectrow = async items => {
    PQDocumentLines.forEach(element => {
      element.PQDocumentLines.forEach(docElement => {
        if(docElement.isSelected){
          setSelectShow(docElement)
        }
        
      });
     
    });
     
  }
  const getvaluesformula = ()=>{
let sum=0
let sum1=0
PQDocumentLines.forEach(element => {
  if (element.isSelected) {
    element.DocumentLines.forEach(item => {
      if (item.isSelected && item.LineStatus === 'bost_Open') {
        sum = sum + item.LineTotal
        sum1 = sum1 + item.TaxTotal
      }
      setgetnetTotal(sum)
      setgettaxtotal(sum1)
    })
  }
})

  }
  const getseriesvaluefunction = async (e) =>{

    setgetseriesnumbring(e.item.Name)
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
  const DocTypeChange = (e) =>{
if(e.value==='Direct'){
  setgettablecontroller("selectedItems")
  setgetcopyfromdoctype()
  setgetdirectdoctype('Direct')
}else if(e.value==='CopyFrom'){
  setSelectedItems(null)
  setgetdirectdoctype()
  setgetcopyfromdoctype('CopyFrom')
}
  }
  const currencychanger = (e) =>{
  let str = getpostingdate;
  let stringToAdd = str.replace('-', '')
  let str2 = stringToAdd.replace('-', '')
    CurrencyRateData.forEach(item=>{
      if(item.Currency === e.value && str2 >= item.RateDate){
        setgetcurrencyrate(item.Rate)
      }
    })
    setgetcurrencycode(e.value)
  }
  return (
    <>
      <Navbar 
      setgetserviceseries={setgetserviceseries}
      getdocumentname={getdocumentname}
      getdocumenttype={getdocumenttype}
      ModuleName={ModuleName}
      />
      {/* {loading && <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>} */}
      <h1 style={{ textAlign: 'center' }}>Purchase Order</h1>
      {/* Upper Side++++++++ */}
{/* <Form> */}
      <CardGroup>
        <DIV3>
          <Container fluid>
          <label>Doc Type</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
              <Select
                placeholder='Direct'
                options={[
                  { label: 'Direct', value: 'Direct' },
                  { label: 'Copy From', value: 'CopyFrom' }
                ]} // Options to display in the dropdown
                onChange={e => {
                  DocTypeChange(e)
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>Vendor</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
              <Select
                placeholder={HeaderData && HeaderData.CardCode+" : "+HeaderData && HeaderData.CardName }
                options={VendorCodeDropdown} // Options to display in the dropdown
                onChange={e => {
                  getUnitPricesfromCardcode(e.value)
                  Currencies(e)
                  VendorChange(e)
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
              {/* {HeaderData ? 
              <Select
    value = {
      VendorCodeDropdown&&VendorCodeDropdown.filter(option => 
          option.value == HeaderData&&HeaderData.CardCode)
    }
             
    // onChange = {value => VendorCodeDropdown.onChange(value)}
    onBlur={() => VendorCodeDropdown.onBlur(VendorCodeDropdown.value)}
    // options={VendorCodeDropdown}
    placeholder=''
  />
  : null} */}
            </div>
            <label>Contact Person</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' onClick={ContactPerson}>
              {/* {ContactPersonDropdown && ( */}
              <Select
                placeholder={ HeaderData && HeaderData.ContactPersonCode}
                options={CPDropdown} // Options to display in the dropdown
                displayValue='name' // Property name to display in the dropdown options
                onChange={e => {
                  CPChange(e)
                }}
              />
              {/* )} */}
            </div>
            <br />
            {getcopyfromdoctype ? (
            <Button variant='primary' onClick={handleShow}>
              Copy From
      </Button>):null}
            <Modal show={show} onHide={handleClose} className="Modal-big" size="lg">
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Open Purchase Quotations List</Modal.Title>
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
                  onChange={()=>{checkboxSelect(item,index)}}
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
            <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Orders List</Modal.Title>
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
                  <tr key={`${index}`} onClick={e => {
                    selectPR(item)
                    handleClose2()
                  }}>
                    <TD>
                      {index + 1}
                      
                    </TD>
                    <TD>{item.DocumentStatus === "bost_Open" ? (<p style={{ background: 'gray', color: 'white' }}>Open</p>) : item.DocumentStatus === "bost_Close" ? (<p style={{ background: 'red', color: 'white' }}>Closed</p>) : null}</TD>
                         
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
            <br />
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Vendor Ref.No</label>
              <input
                value={HeaderData && HeaderData.NumAtCard}
                type='text'
                class='form-control'
                id='exampleInputEmail1'
                onChange={e=>{setgetnumatcard(e.target.value)}}
                aria-describedby='emailHelp'
                placeholder=''
              ></input>
            </div>
            <label>Currency</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary'>
              <Select
              isDisabled={CurrencyRateData ? false : true}
                placeholder={ HeaderData && HeaderData.DocCurrency}
                options={CurrencyDropdown} // Options to display in the dropdown
                displayValue='name' // Property name to display in the dropdown options
                onChange={e => {
                  currencychanger(e)
                }}
              />
            </div>
            <label>Exchange Rate</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary'>
              <input
                defaultValue={getcurrencycode === "PKR" ? 1 : getcurrencyrate || HeaderData && HeaderData.DocRate}
                type='number'
                class='form-control'
                id='exampleInputEmail1'
                onChange={e=>{setgetcurrencyrate(e.target.value)}}
                aria-describedby='emailHelp'
                placeholder=''
              />
            </div>
            <div style={{ marginTop: '5%', marginLeft: '47%', width: '50%' }}>
              {RequesterCodeDropdown && (
                <Select
                  placeholder=''
                  options={RequesterCodeDropdown} // Options to display in the dropdown
                  // onSelect={RequesterCodeDropdownfunc} // Function will trigger on select event
                  // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              )}
            </div>
            {/* {getdirectdoctype?(
              <>
                <label>Select Item(s)</label>
                <div style={{ width: '23.5rem', height: 'auto' }}>
                    <Select
                      isMulti
                      placeholder='Select Items'
                      options={ItemsDropDown} // Options to display in the dropdown
                      onChange={ItemsDropDownfunc} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                </div><br/>
                </>
            ):null} */}
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV3>
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
                  value={getnextnumber?getnextnumber:HeaderData && HeaderData.DocNum}
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
          <div className="Order"
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' ,border:'1px solid',borderColor:'lightgray',borderRadius:'4px'}}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon13" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
          <input
              name={'SearchPRNumber'}
              type='Number'
              placeholder='Number'
              class='form-control13'
              onChange={e => {
                setSearchNumber(e.target.value)
              }}
            />
              </div>
            <br/>
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
              <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
            <label> Posting Date</label>
            <input
              type='date'
              name='DocDate'
              class='form-control'
              onChange={e=>{setgetpostingdate(e.target.value)}}
              defaultValue={HeaderData && HeaderData.DocDueDate ? HeaderData && HeaderData.DocDueDate : getpostingdate}
            />
            </div>
            <div style={{ width: '23.5rem' ,marginLeft:'3rem'}}>
            <label> Delivery Date</label>
            <input
              type='date'
              name='DocDate'
              class='form-control'
              onChange={e=>{setgetdeliverydate(e.target.value)}}
              defaultValue={HeaderData && HeaderData.DocDueDate ? HeaderData && HeaderData.DocDueDate : getdeliverydate }
            />
            </div>
            {/* <br/>
            <div class="form-check form-check-inline" style={{marginLeft:'3rem'}}>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e => setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
        </div> */}
            {/* <label>Priority</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
              <Select
                placeholder='Select'
                options={[
                  { label: 'Low', value: 'Low' },
                  { label: 'Moderate', value: 'Moderate' },
                  { label: 'High', value: 'High' }
                ]} // Options to display in the dropdown
                onChange={e => {
                  setgetprioity(e.value)
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div> */}
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
      {/* Table+++++++++ */}
    <Tabs defaultActiveKey="Contents" transition={false} id="noanim-tab-example">
    <Tab eventKey="Contents" title="Contents">
    {gettablecontroller === "selectedItems" ? (
            <Table responsive striped bordered hover>
              <TableHead>
                <tr>
                <th>#</th>
                <th>Bar Code</th>
                <th>Item No.</th>
                <th>Item Description</th>
                <th>UoM Name</th>  
                <th>Free Text</th>
                <th>Required Date</th>
                {/* <th>Open Qty</th> */}
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>Tax Code</th>
                <th>Tax Percentage</th>
                <th>Price after Discount</th>
                <th>Gross Price after Disc.</th>
                <th>Freight Code</th>
                <th>Freight 1</th>
                <th>Tax Amount</th>
                <th>Gross Total</th>
                <th>Total(LC)</th>
                <th>Whse</th>
                <th>Project</th>
                <th>Buyer</th>
                <th>Cost Centre</th>
                </tr>
              </TableHead>
              <tbody>
                {SelectedItems&&SelectedItems.map((item, index) => (
                  <tr key={`${index}`}>
                    <TD>{index + 1}
                    <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" rel=""  onClick={e=>{deleteobject(e,item,index)}}> <MdDelete /> </a>
                  </TD>
                    <TD></TD>
                    <TD> <div style={{ width: '13.5rem', height: 'auto' }}>
                  {ItemsDropDown && (
                    <Select
                    menuPortalTarget={document.body}
                    value={ItemsDropDown.filter(
                      option => option.value === item.ItemCode
                    )}
                      placeholder={item.ItemCode ? item.ItemCode : 'Select' }
                      options={ItemsDropDown} // Options to display in the dropdown
                      onChange={e=>{ItemsDropDownfunc(e,index,'ItemCode')
                      setSelectedItems([...SelectedItems,[]])}}  // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                )} 
                </div>
                    </TD>
                    <TD>{item.ItemName}</TD>
                    <TD>{item.PurchaseUnit}</TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='text'
                          name='FreeText'
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? item.FreeText : ''}
                          onChange={e => {
                            ontextChanged(e, index)
                          }}
                        />
                      </div>
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='date'
                          name='RequiredDate'
                          onChange={e => {
                            ontextChanged2222(e, index)
                          }}
                          // readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={getpostingdate}
                        />
                      </div>
                    </TD>
                    {/* <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='OpenQty'
                          // onChange={e => {
                          //   ontextChanged2222(e, item)
                          // }}
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          defaultValue={ItemsDetails[item].ItemWarehouseInfoCollection[0].InStock}
                        />
                      </div>
                    </TD> */}
                 
                    <TD>   {getautounitprice && getautounitprice[item.ItemCode] ? (
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='Quantity'
                          // readOnly="readOnly"
                          onChange={e => {
                            testing(e, index)
                          }}
                          value={item.ItemCode ? item.Quantity :''}
                          class='form-control'
                          aria-describedby='Requesterid'
                        />
                      </div>) : (
                          <div style={{ width: '14rem', height: 'auto' }}>
                          <input
                            type='number'
                            name='Quantity'
                            // readOnly="readOnly"
                            onChange={e => {
                              ontextChanged(e, index)
                            }}
                            value={item.ItemCode ? item.Quantity : ''}
                            class='form-control'
                            aria-describedby='Requesterid'
                          />
                        </div>
                      )}
                    </TD>
                    <TD>
                    {getautounitprice && getautounitprice[item.ItemCode] ? (
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='UnitPrice'
                          readOnly
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? getautounitprice && getautounitprice[item.ItemCode].Price: ''}
                          />
                      </div>):( <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='UnitPrice'
                          onChange={e => {
                            unitPriceontextChanged(e, index)
                          }}
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? item.UnitPrice : ''}
                        />
                      </div>) }
                    </TD>
                    <TD> {getautounitprice && getautounitprice[item.ItemCode] ? (
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='Discount'
                          readOnly
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? getautounitprice && getautounitprice[item.ItemCode].DiscountPercent : ''}
                    />
                      </div>):( <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='Discount'
                          onChange={e => {
                            DiscountontextChanged(e, index)
                          }}
                          // readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.RemainingOpenQuantity}
                        />
                      </div>) }
                    </TD>
                    <TD>{getseriesnumbring == "2" ? (
                      <div style={{ width: '14rem', height: 'auto' }}>
                       {TaxCode && (
                    <Select
                     value={TaxCode.filter(
                          option => option.value === "P2"
                        )}
                  menuPortalTarget={document.body}
                                      placeholder='Select..'
                                      options={TaxCode} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange2(e, index,'VatGroup')
                                      }}
                                      displayValue='name' // Property name to display in the dropdown options
                                    />)}
                      </div>): (
                      <div style={{ width: '14rem', height: 'auto' }}>
                      <Select
                  menuPortalTarget={document.body}
                                      placeholder='Select..'
                                      options={TaxCode} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange2(e, index,'VatGroup')
                                      }}
                                      displayValue='name' // Property name to display in the dropdown options
                                    />
                      </div>)}
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='TaxCode'
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? item.TaxAmount : null}
                        />
                      </div>
                    </TD>
                    <TD> {getautounitprice && getautounitprice[item.ItemCode] ? (
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='PriceafterDiscount'
                          onChange={e => {
                            ontextChanged2222(e, index)
                          }}
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? getautounitprice && getautounitprice[item.ItemCode].Price : ''}
                        />
                      </div>): (
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='PriceafterDiscount'
                          onChange={e => {
                            ontextChanged2222(e, index)
                          }}
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? item.PriceAfterDiscount : ''}
                        />
                      </div>)}
                    </TD>
                    <TD> {getautounitprice && getautounitprice[item.ItemCode] ? (
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='GrossPriceafterDisc'
                          // onChange={e => {
                          //   ontextChanged2222(e, item)
                          // }}
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={ item.ItemCode ? Number(item.TaxRate) + Number(getautounitprice && getautounitprice[item.ItemCode].Price) : ''}
                        />
                      </div>) : ( <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='GrossPriceafterDisc'
                          // onChange={e => {
                          //   ontextChanged2222(e, item)
                          // }}
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? item.GrossPriceAfterDiscount: ''}
                        />
                      </div>)}
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                      <Select
                  menuPortalTarget={document.body}
                                      placeholder='Select..'
                                      options={Frieght} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          'FreightCode'
                                        )
                                      }}
                                      // onSelect={CostCentre} // Function will trigger on select event
                                      // onRemove={CostCentre} //Function will trigger on remove event
                                      displayValue='name' // Property name to display in the dropdown options
                                    />
                      </div>
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='Freight'
                          onChange={e => {
                            unitPriceontextChanged(e, index)
                          }}
                          // readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          // defaultValue={item.RemainingOpenQuantity}
                        />
                      </div>
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='TaxTotalAmount'
                          // onChange={e => {
                          //   ontextChanged2222(e, item)
                          // }}
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? item.TaxAmount : ''}
                        />
                      </div>
                    </TD>
                    <TD>{getautounitprice && getautounitprice[item.ItemCode] ? (
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='GrossTotal'
                          // onChange={e => {
                          //   ontextChanged2222(e, item)
                          // }}
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? ((item.TaxAmount + getautounitprice && getautounitprice[item.ItemCode].Price) * item.Quantity) : ''}
                   />
                      </div>):( <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='GrossTotal'
                          // onChange={e => {
                          //   ontextChanged2222(e, item)
                          // }}
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? item.GrossTotal : ''}
                        />
                      </div>)}
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='Total'
                          readOnly="readOnly"
                          class='form-control'
                          aria-describedby='Requesterid'
                          value={item.ItemCode ? item.Total_LC : ''}
                        />
                      </div>
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                      {PrWhse && (
                      <Select
                      menuPortalTarget={document.body}
                        value={PrWhse.filter(
                          option => option.value === item.Whse
                        )}
                                      options={PrWhse} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          'Whse'
                                        )
                                      }}
                                      // onSelect={CostCentre} // Function will trigger on select event
                                      // onRemove={CostCentre} //Function will trigger on remove event
                                      displayValue='name' // Property name to display in the dropdown options
                                    />)}
                      </div>
                    </TD>
                 
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                      {PrProject && (
                      <Select
                      menuPortalTarget={document.body}
                        value={PrProject.filter(
                          option => option.value === item.Project
                        )}
                                      placeholder='Select..'
                                      options={PrProject} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          'Project'
                                        )
                                      }}
                                      // onSelect={CostCentre} // Function will trigger on select event
                                      // onRemove={CostCentre} //Function will trigger on remove event
                                      displayValue='name' // Property name to display in the dropdown options
                                    />)}
                      </div>
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                      {PrBuyer && (
                      <Select
                      menuPortalTarget={document.body}
                        value={PrBuyer.filter(
                          option => option.value === item.Buyer
                        )}
                                      placeholder='Select..'
                                      options={PrBuyer} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          'Buyer'
                                        )
                                      }}
                                      // onSelect={CostCentre} // Function will trigger on select event
                                      // onRemove={CostCentre} //Function will trigger on remove event
                                      displayValue='name' // Property name to display in the dropdown options
                                    />)}
                      </div>
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                      {PrCost && (
                      <Select
                      menuPortalTarget={document.body}
                        value={PrCost.filter(
                          option => option.value === item.CostCentre
                        )}
                                      placeholder='Select..'
                                      options={PrCost} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange22(
                                          e,
                                          index,
                                          'CostCentre'
                                        )
                                      }}
                                      // onSelect={CostCentre} // Function will trigger on select event
                                      // onRemove={CostCentre} //Function will trigger on remove event
                                      displayValue='name' // Property name to display in the dropdown options
                                    />)}
                      </div>
                    </TD>
                    
                  </tr>
                ))}
              </tbody>
              </Table>)
       :  gettablecontroller === "PQDocumentLines" ? ( 
 
            <Table responsive striped bordered hover
             id="table-to-xls"
            >
                 { Array.isArray(PQDocumentLines) && PQDocumentLines.length>0?(
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
                ):null}
              <tbody>
                {PQDocumentLines && PQDocumentLines.map((PrReItem, PrReIndex) => (
              PrReItem.isSelected && 
              PrReItem.DocumentLines.map((item, index) => (
                item.isSelected &&item.LineStatus === "bost_Open" &&
                  <tr key={`${index}`}>
                    <TD>{index + 1}</TD>
                    <TD></TD>
                    <TD>{item.ItemCode}</TD>
                    <TD>{item.ItemDescription}</TD>
                    <TD>{item.MeasureUnit}</TD>
                    <TD>
                      {/* { ()=>{ontextChanged2222( index,PrReIndex)}} */}
                      <div style={{ width: '14rem', height: 'auto' }}>
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
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='QuotedQty'
                          readOnly="readOnly"
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
                          onChange={e => {
                            ShipDateChange(e, index,PrReIndex)
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
                              DocLinesDropDownOnChange(e, index, PrReIndex,'WarehouseCode')
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
                    {item.DocumentLineAdditionalExpenses[0]?item.DocumentLineAdditionalExpenses[0].LineTotal : ""}
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
               ))))}
              </tbody>
              </Table>) 
      :  gettablecontroller === "SearchDocumentLines" ? ( 
            <Table responsive striped bordered hover>
              { Array.isArray(SearchDocumentLines) && SearchDocumentLines.length>0?( <TableHead>
                <tr>
                  <th>#</th>
                  <th>Bar Code</th>
                  <th>Item No.</th>
                  <th>Item Description</th>
                  <th>UoM Name</th>
                  <th>Free Text</th>
                  <th>Quantity</th>
                  <th>Required Date</th>
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
              {SearchDocumentLines && SearchDocumentLines.map((item, index) => (
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
                          defaultValue={item.FreeText}
                          aria-describedby='Requesterid'
                          // value={text}
                          onChange={(e) => {
                            SearchontextChanged(e, index)
                          }}
                        />
                      </div>
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                        <input
                          type='number'
                          name='Quantity'
                          class='form-control'
                          aria-describedby='Requesterid'
                          defaultValue={item.Quantity}
                          onChange={e => {
                            SearchontextChanged(e,index)
                          }}
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
                            SearchShipDateChange(e,index)
                          }}
                          defaultValue={item.ShipDate}
                        />
                      </div>
                    </TD>
                    <TD>{item.RemainingOpenQuantity || OpenQty} </TD>
                    <TD>
                    <div style={{ width: '15em' }}>
                        {/* {PrWhse && ( */}
                          <Select
                            // value={PrWhse.filter(
                            //   option => option.value === item.WarehouseCode
                            // )}
                            placeholder={item.WarehouseCode}
                            options={PrWhse} // Options to display in the dropdown
                            onChange={e => {
                              SearchDocLinesDropDownOnChange(e, index, 'WarehouseCode')
                            }}
                            // onSelect={CostCentre} // Function will trigger on select event
                            // onRemove={CostCentre} //Function will trigger on remove event
                            displayValue='name' // Property name to display in the dropdown options
                          />
                       {/* )} */}
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
                          placeholder= {item.VatGroup+" : "+item.TaxPercentagePerRow+"%"}
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
                    {item.DocumentLineAdditionalExpenses[0]?item.DocumentLineAdditionalExpenses[0].LineTotal : ""}
                    </TD>
                    <TD>
                    {item.LineTotal}
                    </TD>
                    <TD>
                   {item.GrossTotal}
                    </TD>
                    <TD>
                      <div style={{ width: '14rem', height: 'auto' }}>
                      {PrProject && (
                      <Select
                      menuPortalTarget={document.body}
                          value={PrProject.filter(
                            option => option.value === item.ProjectCode
                          )}
                              placeholder='Select..'
                              options={PrProject} // Options to display in the dropdown
                              onChange={e => {
                                DocLinesDropDownOnChange22(
                                  e,
                                  item,
                                  'Project'
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
           </Table>)
           : null }     
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
      <Tab eventKey="Attachment" title="Attachment">
        <Attachment
      setattachmentresponse={setattachmentresponse}
        />
      </Tab>
      </Tabs>
      
      {/* Bottom Side+++++++++ */}
      <CardGroup>
        <DIV3>
          <Container fluid>
            <div style={{ width: '23.5em', height: 'auto' }}>
              <label>Buyer</label>
            
              <Select
                placeholder={HeaderData && HeaderData.SalesPersonCode}
                options={PrBuyer} // Options to display in the dropdown
                onChange={e => setSelectedBuyer(e.value)}
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }} >
              <label>Owner</label>
              <Select
                
                options={PrOwner}
                onChange={e => setSelectedOwner(e.value)} // Options to display in the dropdown
                // onSelect={Owner} // Function will trigger on select event
                // onRemove={Owner} //Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Remarks</label>
              <div style={{ width:'23.5rem'}}>
              <textarea 
                defaultValue={HeaderData && + "Document Entry" +HeaderData && HeaderData.DocEntry + ":" + HeaderData.Comments}
                type='text'
                class='form-control rounded-0'
                id='exampleFormControlTextarea1'
                name='Comments'
                rows='3'
                onChange={e => {
                  setgetcomments(e.target.value)
                }}
              />
              </div>
            </div>
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
               Net Total </label>
              <input
              readOnly
                type='number'
                step='any'
               value = {getnetTotal ? getnetTotal : HeaderData &&  (HeaderData.DocTotalFc != 0 ? (HeaderData.DocTotalFc + HeaderData.TotalDiscountFC - HeaderData.VatSumFc) : (HeaderData.DocTotal + HeaderData.TotalDiscount + HeaderData.VatSum))}
               //value={((SelectedPRDocEntry && SelectedPRDocEntry.DocTotal ||  HeaderData && HeaderData.DocTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.TotalDiscountSC || HeaderData && HeaderData.TotalDiscountSC || 0)) - ((PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || 0) + (SelectedPRDocEntry && SelectedPRDocEntry.VatSumSys || HeaderData && HeaderData.VatSumSys || 0))}
                // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                class='form-control' />
            </div>
            <div style={{marginLeft:'4rem'}}>
            <label>Discount</label>
            <CardGroup>
            <div style={{ width: '11.75rem' }}>
            <input
              type='number'
              value={disc || HeaderData && HeaderData.DiscountPercent }
              onChange={e => {
                setdisc(e.target.value)
                setDiscountTotal((e.target.value * getnetTotal) / 100)
              }}
              class='form-control'
              name='TaxAmount(LC)'
            />
            </div>
            <div  style={{ width: '11.75rem' }}>
            <input
              type='number'
              // value={DiscountTotal}
                  onChange={e => {
                    setDiscountTotal(e.target.value)
                    setdisc((e.target.value / getnetTotal) * 100)
                  }}
              class='form-control'
              name='TaxAmount(LC)'
              value={DiscountTotal || HeaderData &&(HeaderData.DocTotalFc != 0 ? HeaderData.TotalDiscountFC : HeaderData.TotalDiscount) }
            />
            </div>
            </CardGroup>
            </div>
          </div>
          <div style={{ width: '23.5rem'  , marginLeft:'4rem'}}>
            <label>Freight</label>
            <input
              value={totalFreight}
              readOnly='readOnly'
              class='form-control'
              //value={PQDocumentLines[0] && PQDocumentLines[0].DocumentLineAdditionalExpenses[0].LineTotal || "null"}
              // value={PQDocumentLines && PQDocumentLines.DocumentLineAdditionalExpenses[0].LineTotal}
            />
          </div>
          <br />
          <div style={{ width: '23.5rem'  , marginLeft:'4rem' }}>
          <label>Tax</label>
            <input
              type='number'
              // onChange={e => setBottomTax(+e.target.value)}
              // defaultValue={gettaxtotal}
              class='form-control'
              name='TaxAmount(LC)'
              readOnly='readOnly'
              defaultValue={gettaxtotal|| HeaderData && (HeaderData.DocTotalFc != 0 ? HeaderData.VatSumFc : HeaderData.VatSum) }
            />
          </div>
          <div style={{ width: '23.5rem'  , marginLeft:'4rem' }}>
            <label>Total Payment Due:</label>
            <input type='text'
             value={(( getnetTotal - DiscountTotal ) + Number(gettaxtotal) + totalFreight) || HeaderData && (HeaderData.DocTotalFc != 0 ? HeaderData.DocTotalFc : HeaderData.DocTotal)}
              readOnly='readOnly'
              class='form-control' />
          </div>
        </DIV3>
      </CardGroup>
    {/* //  </Form> */}
    </>
  )
}