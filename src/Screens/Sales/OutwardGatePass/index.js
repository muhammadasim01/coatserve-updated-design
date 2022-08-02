import React from 'react'
import Select from 'react-select'
import {
  Logistics,
  Accounting
} from '../../../Component/OutwardGatePass';
import { Attachment} from '../../../Component/APDownPaymentRequest';
import { LINKS } from '../../../Utils'
import { Button, CardGroup, Table, Container, Modal,Tabs,Tab,Card } from 'react-bootstrap'
import { Navbar } from '../../../Component/Global'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import { useAlert } from "react-alert";
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.css';
import Switch from "react-switch";
import { useSelector } from "react-redux";

const axios = require('axios')
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default function OGP () {
  const redux_response = useSelector((state) => state.colorReducer);
  const alert = useAlert();
  const classes = useStyles();
  const [bothbodies, setbothbodies] = React.useState(false)
  const [SelectShow, setSelectShow]=React.useState()
  const [ButtonDropdown, setButtonDropdown] = React.useState();
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [getProjectCode, setgetProjectCode] = React.useState();
  const [show, setShow] = React.useState(false)
  const [UpdatePurchaseRequest, setUpdatePurchaseRequest] = React.useState()
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState()
  const [Customer, setCustomer] = React.useState()
  const [PRDocumentLines, setPRDocumentLines] = React.useState()
  const [TimeOutChange, setTimeOutChange] = React.useState([])
  const [TimeChange, setTimeChange] = React.useState([])
  const [ContactNo, setContactNo] = React.useState([])
  const [CNIC, setCNIC] = React.useState([])
  const [show1, setShow1] = React.useState(false)
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [From, setFrom] = React.useState([])
  const [Address, setAddress] = React.useState([])
  const [Dated, setDated] = React.useState([])
  const [To, setTo] = React.useState([])
  const [Receiver, setReceiver] = React.useState([])
  const [SearchNumber, setSearchNumber] = React.useState()
  const [ButtonName, setButtonName] = React.useState();
  const [DriverName, setDriverName] = React.useState([])
  const [VahicalNo, setVahicalNo] = React.useState([])
  const [RefNo, setRefNo] = React.useState([])
  const [DropDown, setDropDown] = React.useState([])
  const [BaseNum, setBaseNum] = React.useState()
  const [Textchange, setTextchange] = React.useState([])
  const [CustomerDropDown, setCustomerDropDown] = React.useState([])
  const [CustomerRefNo, setCustomerRefNo] = React.useState()
  const [BaseDropDown, setBaseDropDown] = React.useState([])
  const [LineRemarks, setLineRemarks] = React.useState([])
  const [Quantity, setQuantity] = React.useState([])
  const [SearchPR, setSearchPR] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [selectedPRVender, setselectedPRVender] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState()
  const [SelectedItems, setSelectedItems] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [DocDate, setDocDate] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [PrVendor, setPrVendor] = React.useState()
  const [PrProject, setPrProject] = React.useState()
  const [PrCost, setPrCost] = React.useState()

  const [TaxCode, setTaxCode] = React.useState()
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
  const [Pq, setPq] = React.useState()
  const [CP, setCP] = React.useState()
  const [GN, setGN] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )
  const [showA, setShowA] = React.useState(false)
const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [Price, setPrice] = React.useState()
  const [Discount, setDiscount] = React.useState()
  const [Tax, setTax] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()
  const [total, setTotal] = React.useState()
  const [TotalGross, setTotalGross] = React.useState()
  const [BottomTax, setBottomTax] = React.useState()
  const [BottomDiscount, setBottomDiscount] = React.useState()
  const [TotalPayment, setTotalPayment] = React.useState()
  const [DiscountTotal, setDiscountTotal] = React.useState()
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState()
  const [disc, setdisc] = React.useState()
  const [downpayment, setdownpayment] = React.useState()
  const [DeliveryDate, setDeliveryDate] = React.useState()

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  const Home = () => {
    const alert = useAlert();
  };
  React.useEffect(async () => {
    today()
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
    if (cook) GetItems(cook)
    Vendor(cook)
    Project(cook)
    CostCentre(cook)
    Buyer(cook)
    Owner(cook)
    Whse(cook)
    BusinessPartners(cook)
    ContactP(cook)
    TableTaxCode(cook)
  }, [])
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `OGP(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocNum) {
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
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      SubmitOGP()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatchOGP()
    }
  }
  const submitPatchOGP = async () => {
    let DocLines = []
    let body = PRBody
    SearchDocumentLines.forEach(element => {
      DocLines.push({
        Quantity:element.Quantity,
        FreeText:element.FreeText
      })
    })
    body['DocumentLines'] = DocLines
    body['AttachmentEntry'] =attachmentresponse
    console.log(body)
 console.log(HeaderData.DocEntry, body)
    Patch(HeaderData.DocEntry, body)
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

  const SubmitOGP = async () => {
    console.log(PQDocumentLines)
    let DocLines = []
    let body = PRBody
    PQDocumentLines.forEach(element => {
      if( element.isSelected ){
        element.DocumentLines.forEach(element => {
          if( element.isSelected && element.LineStatus === "bost_Open" ){
            // console.log(element);
            console.log(element);
      DocLines.push({
        U_BaseEntry: element.DocEntry,
        U_BaseType: 15,
        U_BaseLine: element.LineNum,
        Remarks:element.U_Remarks,
        U_Quantity:element.Quantity,
        ItemCode:element.ItemCode,
        U_Description:element.ItemDescription,
    })
    body['U_RcvdFrm'] = From
    body['U_Test2'] = Address
    body['CreateDate'] = Dated
    body['U_TEst'] = To
    body['U_Test3'] = Receiver
    body['U_DriverEmpName'] = DriverName
    body['U_DriverEmpCell'] = ContactNo
    body['U_CNIC'] = CNIC
    body['U_Vehicle'] = VahicalNo
    body['U_TimeIn'] = TimeChange
    body['U_TimeOut'] = TimeOutChange
    body['U_Project'] = getProjectCode
    body['OGPROWCollection'] = DocLines
    // body['U_CardCode'] = SelectedPRDocEntry.CardCode
    body['U_Dated'] = Dated
    body['AttachmentEntry'] =attachmentresponse
    //body['U_BaseType'] = BaseDropDown
    console.log(body)
  }
});
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
          api: LINKS.sap.Sales.OutwardGatePass,
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
          api: LINKS.sap.Sales.OutwardGatePass,
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
  const ContactP = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.MasterData.ContactPerson, cookie: cookie }
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
  const OwnerhandleClose = () => setDisply(false)
  const OwnerhandleShow = () => setDisply(true)

  const GetItems = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // setLoading(true)
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveSalesItems,
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
          U_MPrice: element.U_MPrice
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

      await setItemsDropDown(ItemsDropDown)
      await setItemsDetails(ItemsDetails)
    }
  }
  
  const BusinessPartners = async (e) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')

    let SAPapi = LINKS.sap.MasterData.ActiveCustomer

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
  const Vendor = async (cookie, e) => {
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
          setPrVendor(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
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
        api: LINKS.sap.MasterData.ACtiveCostingCode,
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
  const TableTaxCode = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActiveSalesTax,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name + ' : ' + element.Code,
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
        api: LINKS.sap.MasterData.ActiveSalesEmployee,
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
        api: LINKS.sap.MasterData.ActiveEmplyeeInfo,
        cookie: cookie
      })
      .then(function (res) {
        setOwnerPrRe(res.data.value)
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
        api: LINKS.sap.MasterData.ActiveWarehouse,
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
    let sapAPi = `Out_GP_V1?$filter=Status eq 'O'` 
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
  const dateChange = e => {
    let prBody = PRBody
    prBody[e.target.name] = e.target.value
    console.log(prBody)
    setPRBody(prBody)
  }
  const DocDateChange = async e => {
    setDocDate(e.target.value)
    console.log(e.target.value)
  }
  const ontextChanged = (e, index) => {
    let itemDetail = PQDocumentLines
    itemDetail[index][e.target.name] = e.target.value
    setPQDocumentLines(itemDetail)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = async () => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `DeliveryNotes?$filter=CardCode eq '${Customer}'and DocumentStatus eq 'bost_Open' `
    console.log(SAPapi)

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
    setHeaderData(item)
    console.log(item)
    setPQDocumentLines(item.DocumentLines)
    console.log(item.DocumentLines)
  }
  const ontextItemChanged = e => {
    let obj = TextItemChangedObject
    obj[e.target.name] = e.target.value
    setTextItemChangedObject(obj)
  }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `Out_GP_V1?$filter=DocNum eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res.data.value)
        setHeaderData(res.data.value[0])
        setSearchDocumentLines(res.data.value[0].OGPROWCollection)
        console.log(res.data.value[0].OGPROWCollection)
        if(HeaderData!=""){
          setButtonName("Update")
        }
      })
      .catch({})
  }
  const DocLinesDropDownOnChange = (selectedItem, index, name) => {
    // let taxcodeDetai=TaxCode.find(o => o.value === selectedItem.value);
    console.log(selectedItem)
    let itemDetail = PQDocumentLines
    itemDetail[index][name] = selectedItem.value
    // itemDetail[index]['GrossPrice'] = selectedItem.item.VatGroups_Lines[0].Rate
    // console.log(selectedItem.item.VatGroups_Lines[0].Rate)
    setPQDocumentLines(itemDetail)
  }
  const VatGroup = (selectedItem, index, name) => {
    // let taxcodeDetai=TaxCode.find(o => o.value === selectedItem.value);
    console.log(selectedItem)
    let itemDetail = PQDocumentLines
    itemDetail[index][name] = selectedItem.value
    itemDetail[index]['GrossPrice'] = selectedItem.item.VatGroups_Lines[0].Rate
    console.log(selectedItem.item.VatGroups_Lines[0].Rate)
    setPQDocumentLines(itemDetail)
  }
  const VendorChange = e => {
    setCustomer(e.value)
  }
  const priceFunc = (e, index) => {
    let doclines = PQDocumentLines
    const value = e.target.value
    doclines[index]['PriceAfterVAT'] =
      value - (value * doclines[index].DiscountPercent) / 100
    doclines[index]['GrossPriceAfterDisc'] =
      doclines[index].PriceAfterVAT + doclines[index].GrossPrice
    doclines[index]['QuotedQty'] = value
    doclines[index]['UnitPrice'] = value
    setPQDocumentLines(doclines)
    let sum = 0
    PQDocumentLines.forEach(element => {
      sum = sum + element.LineTotal
    })

    setTotalbforeDiscount(sum)
  }
  const QuantityFun = index => {
    let doclines = PQDocumentLines
    doclines[index]['Total_LC'] =
      doclines[index].Quantity * doclines[index].PriceAfterVAT
    console.log(doclines[index].Quantity * doclines[index].PriceAfterVAT)

    setPQDocumentLines(doclines)
  }

  const getPrice = async e => {
    setTotal(Price - (Price * Discount) / 100)
  }

  const getTotalPrice = async e => {
    setTotalGross(Tax + total)
  }
  const TotalPaymentDue = async e => {
    setTotalPayment(totalbforeDiscount - downpayment + BottomTax)
  }
  const DownPayment = async e => {
    let doclines = PQDocumentLines

    setPQDocumentLines(doclines)
    let sum = 0
    PQDocumentLines.forEach(element => {
      sum = sum + element.LineTotal
    })

    setTotalbforeDiscount(sum)
  }
  const CustomerDropDownFun = e => {
    setCustomerDropDown(e.value)
  }
  const DropDownValue = e => {
    setDropDown(e.value)
    console.log(DropDown)
  }

  const BaseNumberFun = e => {
    console.log(e.value)
    setBaseNum(e.target.value)
  }

  const TimeOutChangeFun = e => {
    setTimeOutChange(e.target.value)
  }
  const TimeChaneFun = e => {
    setTimeChange(e.target.value)
  }
  const CNICFun = e => {
    setCNIC(e.target.value)
  }
  const ContactNoFun = e => {
    setContactNo(e.target.value)
  }
  const DriverNameFun = e => {
    setDriverName(e.target.value)
  }
  const RefNoFun = e => {
    setRefNo(e.target.value)
  }
  const VehicalNoFun = e => {
    setVahicalNo(e.target.value)
  }
  const TextChangeFun = e => {
    setTextchange(e.target.value)
  }
  const BaseDropDownFun = e => {
    setBaseDropDown(e.value)
  }
  const RequiredQuantity = e => {
    setQuantity(e.target.value)
  }
  const LineRemarksFun = (e, index,PrReIndex) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index]["LineRemarks"] = e.target.value
    setPQDocumentLines(itemDetail)
    // setLineRemarks(e.target.value)
    // console.log(e.target.value)
  }
  const SearchLineRemarksFun = (e, index) => {
    let itemDetail = SearchDocumentLines
    itemDetail[index]["LineRemarks"] = e.target.value
    setSearchDocumentLines(itemDetail)
    // setLineRemarks(e.target.value)
    // console.log(e.target.value)
  }

  const FromFun = e => {
    setFrom(e.target.value)
  }
  const AddressFun = e => {
    setAddress(e.target.value)
  }
  const DatedFun = e => {
    setDated(e.target.value)
  }
  const ToFun = e => {
    setTo(e.target.value)
  }
  const ReceiverFun = e => {
    setReceiver(e.target.value)
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
    console.log(PrReIndex)
    console.log(item)
    console.log(index)
   
    
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

  return (
    <>
     <style>{`
    .nav-tabs .nav-link{
      color: white !important;
      background-color: ${
        redux_response.color ? redux_response.color : "rgb(69 70 73)"
      } !important;  
      width: 12rem  !important;
      height: 24px !important;
      padding: 0 !important;
      text-align: center !important;
    }
   
       
  `}</style>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Outward Gate Pass</h1>
    
      <div className='main_container'>
        <div className='left'>
            <div className="header_items_container">
            <label>Customer</label>
              <Select
                placeholder={HeaderData && HeaderData.CardCode}
                options={VendorCodeDropdown} // Options to display in the dropdown
                onChange={e => {
                  VendorChange(e)
                }} 
                 displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          
            <Modal show={show} onHide={handleClose} className="Modal-big" size="lg">
              <Modal.Header closeButton>
                <Modal.Title  id="example-modal-sizes-title-lg">Open Delivery List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {PrRe && (
                  <Table responsive>
                    <TableHead>
                      <tr>
                        <th>#</th>
                        <th>Document No.</th>
                        <th>Customer Code</th>
                        <th>Customer Name</th>
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
                          <TD>{item.BPLName}</TD>
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
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Open DeliveryNotes List</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Table responsive striped bordered hover>
          <TableHead>
            <tr>
              <th>#</th>
              <th>Bar Code</th>
              <th>Item No.</th>
              <th>Descripction</th>
              <th>UoM</th>
              <th>DO Quantity</th>
              <th>Quantity</th>
              <th>Project</th>
              <th>Base No.</th>
              <th>Base Line</th>
            </tr>
          </TableHead>
          <tbody>
            {PQDocumentLines.map((PrReItem, PrReIndex) => (
              PrReItem.isSelected && 
              PrReItem.DocumentLines.map((item, index) => (
                item.LineStatus === 'bost_Open' && (
                  <tr key={`${index}`}>
                     <TD> 
                     {index + 1}
                         <input
                      type='checkbox'
                      onChange={() => {
                        console.log("item",item)
                        docLineSelectedSwitch(
                          PrReIndex,
                          item,
                          index
                        )
                      }}
                      checked={item.isSelected}
                    /></TD>
                    <TD></TD>
                    <TD>{item.ItemCode}</TD>
                    <TD>{item.ItemDescription}</TD>
                    <TD>{item.UoMCode}</TD>
                    <TD>
                    <div style={{width:'15em'}}>
                      <input
                      readOnly='readOnly'
                        onChange={e => {
                          RequiredQuantity(e)
                        }}
                        type='number'
                        class='form-control'
                        defaultValue={item.BaseOpenQuantity}
                      />
                      </div>
                    </TD>
                    <TD>
                    <div style={{width:'15em'}}>
                      <input
                        onChange={e => {
                          setQuantity(e.target.value)
                        }}
                        type='number'
                        class='form-control'
                        defaultValue={item.Quantity}
                      />
                      </div>
                    </TD>
                    <TD>{item.ProjectCode}</TD>
                   
                    <TD>
                      {item.DocEntry}
                     
                    </TD>
                    <TD>{item.LineNum}</TD>
                  </tr>
                )
                ))
           
                ))}
          </tbody>
        </Table>
              </Modal.Body>
              <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseee}>
    Choose
  </Button>
    </Modal.Footer>
              </Modal>
              <div className="header_items_container">
              <label></label>

              <Select
               options={[
                  { label: 'Cylinder - Cylinder', value: 'Cylinder' },
                  { label: 'Fixed Asset - Fixed Asset', value:'Fixed Asset'},
                ]}
                // onChange={e => {
                //   BaseDropDownFun(e)
                // }} 
                 displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div className="header_items_container">
              <label>Vehicle</label>
              <input
                defaultValue={HeaderData && HeaderData.DocEntry}
                type='number'
                class='input'
                name='Vehicle'
                aria-describedby='emailHelp'
                placeholder=''
              />
            </div>
            {/* <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:''}}>
              <label>Base Doc Number</label>
              <input
                defaultValue={HeaderData && HeaderData.DocEntry}
                type='number'
                class='form-control'
                name='BaseDocNum'
                aria-describedby='emailHelp'
                placeholder=''
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>OGP Type</label>
              <input
                type='e-mail'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                defaultValue={HeaderData && HeaderData.U_BaseType}
              />
            </div>
            
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Create Date</label>
              <input
                onChange={e => {
                  DatedFun(e)
                }}
                defaultValue={HeaderData && HeaderData.CreateDate}
                type='Date'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>From </label>
              <input
                type='text'
                class='form-control'
                name='Form'
                aria-describedby='emailHelp'
                defaultValue={HeaderData && HeaderData.U_RcvdFrm}
                onChange={e => {
                  FromFun(e)
                }}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Address</label>
              <input
                type='text'
                class='form-control'
                name='Address'
                aria-describedby='emailHelp'
                defaultValue={HeaderData && HeaderData.U_Test2}
                onChange={e => {
                  AddressFun(e)
                }}
              />
            </div>
           
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Vehicle No.</label>
              <input
               type='text'
                class='form-control'
                name='VehicleNo'
                aria-describedby='emailHelp'
                defaultValue={HeaderData && HeaderData.U_Vehicle}
                onChange={e => {
                  VehicalNoFun(e)
                }}
              />
            </div>
            
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>CNIC #</label>
              <input
                type='number'
                class='form-control'
                placeholder='XXXXX-XXXXXXX-X'
                name='CNIC#'
                aria-describedby='emailHelp'
                defaultValue={HeaderData && HeaderData.U_CNIC}
                onChange={e => {
                  CNICFun(e)
                }}
              />
            </div>
            <label>Base Type</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
               options={[
                  { label: 'General', value: 0 },
                  { label: 'ODLN', value: 1 },
                  { label: 'OIGE', value: 2 },
                  { label: 'OIGP', value: 3 },
                  { label: 'OWTR', value: 2 }
                ]}
                onChange={e => {
                  BaseDropDownFun(e)
                }} 
                 displayValue='name' // Property name to display in the dropdown options
              />
            </div> */}
        </div>
       
        <div className='right'>
        <div className="Outward header_items_container">

              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon7" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
          <input
              name={'SearchPRNumber'}
              type='Number'
              placeholder='Number'
              class='input'
              onChange={e => {
                setSearchNumber(e.target.value)
              }}
            />
            </div>
            <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Open Outward GatePass List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ModalHeaderData && (
            <Table responsive>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>DocNum</th>
                  <th>Document Status</th>
                  <th>CreateDate</th>
                  <th>Create Time</th>
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
                    <TD>{item.DocNum}</TD>
                    <TD>{item.Status === "O" ? (<p style={{ background: 'gray', color: 'white' }}>Open</p>) : item.Status !== "O" ? (<p style={{ background: 'red', color: 'white' }}>Closed</p>) : null}</TD>
                         
                    <TD>{item.CreateDate}</TD>
                    <TD>{item.CreateTime}</TD>
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
      <div className="header_items_container">
              <label>DocNum</label>
              <input
              readOnly
                defaultValue={HeaderData && HeaderData.DocNum}
                type='text'
                class='input'
                id='DocNum'
                aria-describedby='emailHelp'
                placeholder=''
              />
            </div><br/>
            <div className="header_items_container">
            <label>Reversible</label>
              <Select
               options={[
                  { label: 'YES - YES', value: 'YES' },
                  { label: 'NO - NO', value:'NO'},
                ]}
                // onChange={e => {
                //   BaseDropDownFun(e)
                // }} 
                 displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <div className="header_items_container">
              <label>Date</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
                type='Date'
                class='input'
                name='Date'
                aria-describedby='emailHelp'
                defaultValue={HeaderData && HeaderData.CreateTime ? HeaderData && HeaderData.CreateTime : currentDate}
                // onChange={e => {
                //   DriverNameFun(e)
                // }}
              />
            </div>
            {/* <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
            <label>Receiver Name</label>
              <input
                type='text'
                class='form-control'
                name='RecieverName'
                aria-describedby='emailHelp'
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.U_Test3||HeaderData && HeaderData.U_Test3}
                onChange={e => {
                  ReceiverFun(e)
                }}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
            <label>To</label>
              <input
                type='text'
                class='form-control'
                name='To'
                aria-describedby='emailHelp'
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.U_TEst||HeaderData && HeaderData.U_TEst}
                onChange={e => {
                  ToFun(e)
                }}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
              <label>Driver Name</label>
              <input
                type='text'
                class='form-control'
                name='DriverName'
                aria-describedby='emailHelp'
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.U_DriverEmpName||HeaderData && HeaderData.U_DriverEmpName}
                onChange={e => {
                  DriverNameFun(e)
                }}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem'}}>
              <label>Driver Cell #</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
                type='number'
                class='form-control'
                name='DriverCell#'
                aria-describedby='emailHelp'
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.U_DriverEmpCell||HeaderData && HeaderData.U_DriverEmpCell}
                onChange={e => {
                 ContactNoFun (e)
                }}
              />
            </div>
            
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
              <label>Create Time</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
                type='Time'
                class='form-control'
                name='CreateTime'
                aria-describedby='emailHelp'
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.CreateTime||HeaderData && HeaderData.CreateTime}
                // onChange={e => {
                //   DriverNameFun(e)
                // }}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
              <label>Time In</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
                type='time'
                class='form-control'
                name='timein'
                aria-describedby='emailHelp'
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.U_TimeIn||HeaderData && HeaderData.U_TimeIn}
                onChange={e => {
                  TimeChaneFun(e)
                }}
              />
            </div>
           
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
              <label>Time Out</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.CardName}
                type='time'
                class='form-control'
                name='TimeOut'
                aria-describedby='emailHelp'
                defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.U_TimeOut||HeaderData && HeaderData.U_TimeOut}
                onChange={e => {
                  TimeOutChangeFun(e)
                }}
              />
            </div> */} 
              <div className="header_items_container">
          <label class="form-check-label" for="inlineCheckbox1">Sync A</label>
          <input class="form-check-input" checked={bothbodies} name='Sync' onChange={e => setbothbodies(!bothbodies)} type="checkbox" id="inlineCheckbox1" value="option1" />
        </div>
        </div>
      </div>
      {/* Table+++++++++ */}
      <Tabs defaultActiveKey="Contents" transition={false} id="noanim-tab-example">
    <Tab eventKey="Contents" title="Contents">
      {PQDocumentLines &&(
        <Table responsive striped bordered hover>
           { Array.isArray(PQDocumentLines) && PQDocumentLines.length>0?(
          <TableHead>
            <tr>
              <th>#</th>
              <th>Cylinder Code</th>
              <th>Cylinder Description</th>
              <th>Reversible</th>
              <th>Cylinder Purpose</th>
              <th>No of Cylinder</th>
              <th>Total No of Cylinder</th>
              <th>Fixed Asset</th>
              <th>Quantity</th>
            </tr>
          </TableHead>
            ):null}
          <tbody>
          {PQDocumentLines && PQDocumentLines.map((PrReItem, PrReIndex) => (
              PrReItem.isSelected && 
              PrReItem.DocumentLines.map((item, index) => (
                item.isSelected &&
                  item.LineStatus === "bost_Open" &&
                  <tr key={`${index}`}>
                    <TD>{index + 1}</TD>
                    <TD>{item.ItemCode}</TD>
                    <TD>{item.ItemDescription}</TD>
                    <TD>
                    <div style={{width:'15em'}}>
                      <input
                      readOnly='readOnly'
                        onChange={e => {
                          RequiredQuantity(e)
                        }}
                        type='text'
                        name='Reversible'
                        class='form-control'
                        // defaultValue={item.BaseOpenQuantity}
                      />
                      </div>
                    </TD>
                    <TD>
                    <div style={{width:'15em'}}>
                      <input
                      readOnly='readOnly'
                        onChange={e => {
                          RequiredQuantity(e)
                        }}
                        type='text'
                        name='CylinderPurpose'
                        class='form-control'
                        // defaultValue={item.BaseOpenQuantity}
                      />
                      </div>
                    </TD>
                    <TD>
                    <div style={{width:'15em'}}>
                      <input
                        onChange={e => {
                          setQuantity(e.target.value)
                        }}
                        type='number'
                        name='NoofCylinder'
                        class='form-control'
                        defaultValue={item.Quantity}
                      />
                      </div>
                    </TD>
                    <TD> <div style={{width:'15em'}}>
                      <input
                        onChange={e => {
                          setQuantity(e.target.value)
                        }}
                        type='number'
                        name='TotalNoofCylinder'
                        class='form-control'
                        defaultValue={item.Quantity}
                      />
                      </div></TD>
                    <TD>
                      <div style={{width:'15em'}}>
              <Select
                                            menuPortalTarget={document.body}
               options={[
                  { label: 'Fixed Asset - Fixed Asset', value: 'FixedAsset' },
                  { label: 'Parts - Parts', value:'Parts'},
                ]}
                // onChange={e => {
                //   BaseDropDownFun(e)
                // }} 
                 displayValue='name' // Property name to display in the dropdown options
              />
            </div>
                    </TD>
                    <TD>
                    <div style={{width:'15em'}}>
                      <input
                        onChange={e => {
                          setQuantity(e.target.value)
                        }}
                        type='number'
                        name='Quantity'
                        class='form-control'
                        defaultValue={item.Quantity}
                      />
                      </div>
                    </TD>
                  </tr>
                )
          )))}
          </tbody>
        </Table>
      )}
        {SearchDocumentLines && (
        <Table responsive striped bordered hover>
           { Array.isArray(SearchDocumentLines) && SearchDocumentLines.length>0?(
         
          <TableHead>
            <tr>
            <th>#</th>
              <th>Cylinder Code</th>
              <th>Cylinder Description</th>
              <th>Reversible</th>
              <th>Cylinder Purpose</th>
              <th>No of Cylinder</th>
              <th>Total No of Cylinder</th>
              <th>Fixed Asset</th>
              <th>Quantity</th>
            </tr>
          </TableHead>
         
         ):null}
          <tbody>
          {SearchDocumentLines && SearchDocumentLines.map((item, index) => (
                   <tr key={`${index}`}>
                   <TD>{index + 1}</TD>
                   <TD>{item.ItemCode}</TD>
                   <TD>{item.ItemDescription}</TD>
                   <TD>
                   <div style={{width:'15em'}}>
                     <input
                     readOnly='readOnly'
                       onChange={e => {
                         RequiredQuantity(e)
                       }}
                       type='text'
                       name='Reversible'
                       class='form-control'
                       // defaultValue={item.BaseOpenQuantity}
                     />
                     </div>
                   </TD>
                   <TD>
                   <div style={{width:'15em'}}>
                     <input
                     readOnly='readOnly'
                       onChange={e => {
                         RequiredQuantity(e)
                       }}
                       type='text'
                       name='CylinderPurpose'
                       class='form-control'
                       // defaultValue={item.BaseOpenQuantity}
                     />
                     </div>
                   </TD>
                   <TD>
                   <div style={{width:'15em'}}>
                     <input
                       onChange={e => {
                         setQuantity(e.target.value)
                       }}
                       type='number'
                       name='NoofCylinder'
                       class='form-control'
                       defaultValue={item.Quantity}
                     />
                     </div>
                   </TD>
                   <TD> <div style={{width:'15em'}}>
                     <input
                       onChange={e => {
                         setQuantity(e.target.value)
                       }}
                       type='number'
                       name='TotalNoofCylinder'
                       class='form-control'
                       defaultValue={item.Quantity}
                     />
                     </div></TD>
                   <TD>
                     <div style={{width:'15em'}}>
             <Select
                                            menuPortalTarget={document.body}
              options={[
                 { label: 'Fixed Asset - Fixed Asset', value: 'FixedAsset' },
                 { label: 'Parts - Parts', value:'Parts'},
               ]}
               // onChange={e => {
               //   BaseDropDownFun(e)
               // }} 
                displayValue='name' // Property name to display in the dropdown options
             />
           </div>
                   </TD>
                   <TD>
                   <div style={{width:'15em'}}>
                     <input
                       onChange={e => {
                         setQuantity(e.target.value)
                       }}
                       type='number'
                       name='Quantity'
                       class='form-control'
                       defaultValue={item.Quantity}
                     />
                     </div>
                   </TD>
                 </tr>
                // )
                ))}
          </tbody>
        </Table>
      )}
      </Tab>
      <Tab eventKey="Logistics" title="Logistics">
        <Logistics/>
        </Tab>
      <Tab eventKey="Accounting" title="Accounting">
        <Accounting/>
      </Tab>
      <Tab eventKey="Attachment" title="Attachment">
        <Attachment
      setattachmentresponse={setattachmentresponse}
        />
        </Tab>
    </Tabs>
      {/* Bottom Side+++++++++ */}
      <div className='main_container'>
        <div className='left'>
           
       
             
        </div>
        <div className="right"></div>
      </div>
      {localStorage.getItem("documentcontroller") === "R" ? (
            <div className="button_main_container">
              <div className="button_container">
                <button
                  onClick={() => {
                    window.location.href = "/Home";
                  }}
                  className="form_button"
                  style={{ backgroundColor: `${redux_response.color}` }}
                >
                  OK
                </button>
                <button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = "/Home";
                  }}
                  className="form_button"
                  style={{ backgroundColor: `${redux_response.color}` }}
                >
                  Cancel
                </button>
              </div>
              <div className="button_container">
                <button
                  style={{ backgroundColor: `${redux_response.color}` }}
                  className="form_button"
                  onClick={handleShow}
                >
                  Copy From
                </button>{" "}
                <button
                  style={{ backgroundColor: `${redux_response.color}` }}
                  className="form_button"
                >
                  Copy To
                </button>
              </div>
            </div>
          ) : (
            <div className="button_main_container">
              <div className="button_container">
                <button
                  onClick={() => {
                    Submit_PatchFunc();
                  }}
                  className="form_button"
                  style={{ backgroundColor: `${redux_response.color}` }}
                >
                  {ButtonName}
                </button>
                <button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = "/Home";
                  }}
                  className="form_button"
                  style={{ backgroundColor: `${redux_response.color}` }}
                >
                  Cancel
                </button>
              </div>
              <div className="button_container">
                <button
                  style={{ backgroundColor: `${redux_response.color}` }}
                  className="form_button"
                  onClick={handleShow}
                >
                  Copy From
                </button>
                <button
                  style={{ backgroundColor: `${redux_response.color}` }}
                  className="form_button"
                >
                  Copy To
                </button>
              </div>
            </div>
          )}
    </>
  )
}
