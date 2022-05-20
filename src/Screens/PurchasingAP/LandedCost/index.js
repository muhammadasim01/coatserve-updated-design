import React from 'react'
import {
  Button,
  Card,
  Dropdown,
  CardGroup,
  Table,
  Container,
  Modal,
  Tab,
  Tabs,
  Form
} from 'react-bootstrap'
import { MenuUp } from 'react-bootstrap-icons'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles'
import { Backdrop } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Logistics, Accounting } from '../../../Component/PurchaseQuotation'
import { Attachment } from '../../../Component/APDownPaymentRequest'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Navbar } from '../../../Component/Global'
import { useAlert } from 'react-alert'
import { input, DIV3, DIV4, DIV6, DIV7, InputD, TableHead, TD } from './Style'
import './index.css'
import Switch from 'react-switch'
import { getByLabelText } from '@testing-library/react'
import NumberFormat from 'react-number-format'
import { FcCancel } from 'react-icons/fc'
import { GrClose, GrView } from 'react-icons/gr'
import { IoReload } from 'react-icons/io5'
const axios = require('axios')
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export default function Invoice() {

  const alert = useAlert()
  const [SelectShow, setSelectShow] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [Vendorvalue, setVendorvalue] = React.useState()
  const [Brokervalue, setBrokervalue] = React.useState()

  const [cancelbutton, setcancelbutton] = React.useState(false)
  const classes = useStyles()
  const [update, setUpdate] = React.useState(1)
  const [show, setShow] = React.useState(false)
  const [showLa, setShowLa] = React.useState(false)
  const [changer, setchanger] = React.useState(false)

  const [getStatus, setgetStatus] = React.useState()
  const [getcomments, setgetcomments] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [OpenQty, setOpenQty] = React.useState()
  const [getdirectdoctype, setgetdirectdoctype] = React.useState()
  const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState()
  const [SelectedCP, setSelectedCP] = React.useState()
  const [SearchItemLines, setSearchItemLines] = React.useState()
  const [SearchCostLines, setSearchCostLines] = React.useState()
  const [SearchPR, setSearchPR] = React.useState()
  const [SearchDocumentLines, setSearchDocumentLines] = React.useState()
  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})
  const [ButtonName, setButtonName] = React.useState()
  const [CostDocumentline, setCostDocumentline] = React.useState()
  const [ButtonNameLA, setButtonNameLA] = React.useState("Ok")
  const [getTransNum, setgetTransNum] = React.useState();

  const [SelectedVendor, setSelectedVendor] = React.useState()
  const [CustomValue, setCustomValue] = React.useState()
  const [gettaxtotal, setgettaxtotal] = React.useState()
  const [getnetTotal, setgetnetTotal] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState()
  const [discountpercent, setdiscountpercent] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [DelDate, setDelDate] = React.useState()
  const [AccountselectedItems, setAccountSelectedItems] = React.useState()
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [Bra, setBra] = React.useState()
  const [PrProject, setPrProject] = React.useState()
  const [PrCost, setPrCost] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [showA, setShowA] = React.useState(false)

  const [showAR, setShowAR] = React.useState(false)
  const [showAP, setShowAP] = React.useState(false)
  const [showLC, setShowLC] = React.useState(false)
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )



  const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())

  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [TaxCode, setTaxCode] = React.useState()
  const [Frieght, setFrieght] = React.useState()
  const [LCSelectedPRDocEntry, setLCSelectedPRDocEntry] = React.useState()
  const [PrOwner, setPrOwner] = React.useState()
  const [getvalues, setgetvalues] = React.useState({})
  const [LineTotalValue, setLineTotalValue] = React.useState()

  const [JEHeaderData, setJEHeaderData] = React.useState()
  const [JournalEntryLines, setJournalEntryLines] = React.useState()
  const [gettotaldebit, setgettotaldebit] = React.useState(0)
  const [gettotalcredit, setgettotalcredit] = React.useState(0)

  const [getPriceListDropdown, setgetPriceListDropdown] = React.useState()

  const [PrWhse, setPrWhse] = React.useState()
  const [Amount, setAmount] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [ARSelectedPRDocEntry, setARSelectedPRDocEntry] = React.useState()

  const [PrRe, setPrRe] = React.useState()
  const [ARIN, setARIN] = React.useState()
  const [APIN, setAPIN] = React.useState()

  const [LACO, setLACO] = React.useState()


  const [OwnerPrRe, setOwnerPrRe] = React.useState()
  const [Disply, setDisply] = React.useState(false)
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [PDNDocumentLines, setPDNDocumentLines] = React.useState()

  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState()
  const [LaCost, setLaCost] = React.useState()
  const [TotalQuantity, setTotalQuantity] = React.useState()
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [bothbodies, setbothbodies] = React.useState(false)
  const [AlloctionCost, setAlloctionCost] = React.useState()
  const [gettax2, setgettax2] = React.useState(0)
  const [gettax1, setgettax1] = React.useState(0)
  const [totalbforeDiscount, setTotalbforeDiscount] = React.useState()
  const [gettotalbeforetax, setgettotalbeforetax] = React.useState(0)
  const [totalFreight, setTotalFreight] = React.useState()
  const [disc, setdisc] = React.useState()
  const [ShipDate, setShipDate] = React.useState()
  const [currentDate, setcurrentDate] = React.useState()

  // const [OpenQty, setOpenQty] = React.useState()
  const [Total_LC, setTotal_LC] = React.useState()

  //Component Hooks---
  const [getdocumenttype, setgetdocumenttype] = React.useState("69")
  const [getdocumentname, setgetdocumentname] = React.useState("IPF2");
  const [ModuleName, setModuleName] = React.useState("LandedCosts")
  const [getserviceseries, setgetserviceseries] = React.useState()

  const [AllocCostTotalValue, setAllocCostTotalValue] = React.useState(0)
  const [DocumentNumber, setDocumentNumber] = React.useState()
  const [getTransportationCode, setgetTransportationCode] = React.useState()
  const [LCDocumentLines, setLCDocumentLines] = React.useState()
  const [getdocentry, setgetdocentry] = React.useState()

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  }

  React.useEffect(async () => {
    today()
    compareDate()
    await setgetdocumentname("IPF2")
    await setModuleName("LandedCosts")
    await setgetdocumenttype("69")
    setButtonName('Add')
    setSearchNumber('0')
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
    Project(cook)
    LandedCostCode(cook)
    getItemsList(cook)
    PriceListValue(cook)
    // CostCentre(cook)
    // Buyer(cook)
    // Owner(cook)
    // Whse(cook)
    // PurchaseQuotation(cook)
    // OwnerPurchaseRequest(cook)
    // Frieght1(cook)
    // TableTaxCode(cook)
  }, [])
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `PurchaseInvoices(${id})`,
          cookie: cook
        })
        .then(function (res) {
          if (res.data.DocNum) {
            console.log('Operation completed successfully')
          } else {
            console.log('res.data.error.message.value')
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
        if (Date.parse(currentComDate) > getDate) {


          alert.error("License Expired")
          window.location.href = "/DisabledHomeScreen";
        }
        //  else  if (res.data !==  LiveGetInstallationNumber2 ) {
        //   if(res.data !== TestGetInstallationNumber){
        //   alert("Provided Key Does not match")
        //   // window.location.href="/DisabledHomeScreen";
        //   }
        // }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const today = () => {

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    setcurrentDate(year + "-" + month + "-" + day)
    // console.log("Today",currentDate)
  }
  const submitLCS = async () => {

    let body = {}
    body['Code'] = getvalues.Code
    body['Name'] = getvalues.Name
    body['AllocationBy'] = getvalues.AllocationBy
    body['LandedCostsAllocationAccount'] = getvalues.LandedCostsAllocationAccount

    console.log("body", JSON.stringify(body))

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.LandedCost.PostLandedCostCodes,
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
          let ItemsDetails = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardCode + ' : ' + element.CardName,
              item: element
            })
          })
          setVendorCodeDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // const ContactPerson = async () => {
  //   // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
  //   let ItemsResponseResult = {}
  //   const api = `${LINKS.api}/GetApi`
  //   let cookie = await localStorage.getItem('cookie')

  //   // let SAPapi = `sml.svc/ACTIVECONTACTPERSON?$filter=CardCode eq '${SelectedVendor}' &$orderby=CntctCode`
  //   let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq  '${SelectedVendor}'`

  //   await axios
  //     .post(API_TYPES.GET, {
  //       api: SAPapi,
  //       cookie: cookie
  //     })
  //     .then(function (res) {
  //       if (res.data.value) {
  //         let ItemsDropDown = []
  //         res.data.value.forEach(element => {
  //           ItemsDropDown.push({
  //             value: element.ContactPerson,
  //             label: element.ContactPerson 
  //           })
  //         })
  //         setContactPersonDropdown(ItemsDropDown)
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
  const OwnerhandleClose = () => setDisply(false)
  const OwnerhandleShow = () => setDisply(true)

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
        setTimeout(() => { window.location.href = '/' }, 3000);

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



  const valuechangefunction = (e) => {
    let obj = getvalues
    obj[e.target.name] = e.target.value
    setgetvalues(obj)
    console.log(obj)
  }
  const valuechangeamountfunction = async (e, index) => {
    let obj = LaCost
    obj[index]["Amount"] = e.target.value
    obj[index]["CostFactor"] = 100 / Number(totalbforeDiscount) * Number(obj[index]["Amount"])
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    let sum = 0;
    let sum2 = 0;
    let sum3 = 0;
    let custom = 0;
    obj.forEach(item => {
      if (item.Amount && item.AllocationBy === "ab_Quantity") {
        sum = sum + Number(item.Amount)
      } else if (item.Amount && item.AllocationBy === "ab_CashValueBeforeCustoms") {
        sum2 = sum2 + Number(item.Amount)
      } else if (item.Amount && item.AllocationBy === "ab_CashValueAfterCustoms") {
        console.log("AC")
        sum3 = sum3 + Number(item.Amount)
      }
    })
    console.log("obj", obj)
    setLaCost(obj)
    if (sum !== 0 && sum2 !== 0 && sum3 !== 0) {
      setAllocCostTotalValue(sum + sum2 + sum3)
      QTY_BC_AC(sum, sum2, sum3)
    } else if (sum !== 0 && sum2 !== 0) {
      setAllocCostTotalValue(sum + sum2)
      QTY_BC(sum, sum2)
    } else if (sum !== 0 && sum3 !== 0) {
      setAllocCostTotalValue(sum + sum3)
      QTY_AC(sum, sum3)
    } else if (sum2 !== 0 && sum3 !== 0) {
      setAllocCostTotalValue(sum2 + sum3)
      BC_AC(sum2, sum3)
    } else if (sum !== 0) {
      setAllocCostTotalValue(sum)
      quantity(sum)
    } else if (sum2 !== 0) {
      setAllocCostTotalValue(sum2)
      cashvaluebeforecustom(sum2)
    } else if (sum3 !== 0) {
      setAllocCostTotalValue(sum3)
      cashvalueaftercustom(sum3)
    }

  }
  const checkboxValuechanger = async (e, index) => {
    let obj = LaCost
    obj[index][e.target.name] = e.target.value
    console.log("obj", obj)
    setLaCost(obj)

  }
  const QTY_BC = (getqtyamount, getbcamount) => {
    console.log("QTY_BC")
    let obj = PDNDocumentLines
    let totalsum = 0
    let lines = []
    obj.forEach(item => {
      lines.push({
        DocEntry: item.DocEntry,
        LineNum: item.LineNum,
        ItemCode: item.ItemCode,
        Quantity: item.Quantity,
        Customs_Value: item.Customs_Value || 0,
        LineTotal: item.LineTotal,
        UnitPrice: item.UnitPrice,
        ProjectCustoms: item.Customs_Value / item.Quantity,
        WarehouseCode: item.WarehouseCode,
        Allocated_CostA: ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal),
        Expenditure: ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) / item.Quantity,
        WhsePrice: item.UnitPrice + (((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) / item.Quantity),
        LineTotal1: item.LineTotal + ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) + Number(item.Customs_Value)
      })
      totalsum = totalsum + Number(item.LineTotal + ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) + Number(item.Customs_Value))
    })
    console.log("totalsum", totalsum)
    setgettotalbeforetax(totalsum)
    setPDNDocumentLines(lines)
  }
  const QTY_AC = (getqtyamount, getacamount) => {
    console.log("QTY_AC")
    let obj = PDNDocumentLines
    let lines = []
    let totalsum = 0
    obj.forEach(item => {
      lines.push({
        DocEntry: item.DocEntry,
        LineNum: item.LineNum,
        ItemCode: item.ItemCode,
        Quantity: item.Quantity,
        LineTotal: item.LineTotal,
        Customs_Value: item.Customs_Value,
        ProjectCustoms: item.Customs_Value / item.Quantity,
        UnitPrice: item.UnitPrice,
        WarehouseCode: item.WarehouseCode,
        Allocated_CostA: ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))),
        Expenditure: ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) / item.Quantity,
        WhsePrice: item.UnitPrice + (item.Customs_Value / item.Quantity) + ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) / item.Quantity,
        LineTotal1: item.LineTotal + ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + Number(item.Customs_Value)
      })
      totalsum = totalsum + Number(item.LineTotal + ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + Number(item.Customs_Value))
    })
    setgettotalbeforetax(totalsum)
    setPDNDocumentLines(lines)
  }
  const BC_AC = (getbcamount, getacamount) => {
    console.log("BC_AC")
    console.log("CustomValue", CustomValue)
    let obj = PDNDocumentLines
    let lines = []
    let totalsum = 0
    obj.forEach(item => {
      lines.push({
        DocEntry: item.DocEntry,
        LineNum: item.LineNum,
        ItemCode: item.ItemCode,
        Quantity: item.Quantity,
        Customs_Value: item.Customs_Value,
        LineTotal: item.LineTotal,
        UnitPrice: item.UnitPrice,
        ProjectCustoms: item.Customs_Value / item.Quantity,
        WarehouseCode: item.WarehouseCode,
        Allocated_CostA: (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal),
        Expenditure: (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) / item.Quantity,
        WhsePrice: item.UnitPrice + (item.Customs_Value / item.Quantity) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) / item.Quantity,
        LineTotal1: item.LineTotal + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) + Number(item.Customs_Value)
      })
      totalsum = totalsum + Number(item.LineTotal + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) + Number(item.Customs_Value))
    })
    setgettotalbeforetax(totalsum)
    setPDNDocumentLines(lines)
  }
  const QTY_BC_AC = (getqtyamount, getbcamount, getacamount) => {
    console.log("ALL")
    console.log("AC", (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))))))

    let obj = PDNDocumentLines
    let lines = []
    let totalsum = 0
    obj.forEach(item => {
      console.log("Item", item)
      console.log("AC", (item.LineTotal + Number(item.Customs_Value)))
      console.log("AC", (item.LineTotal, "VVVV", Number(item.Customs_Value)))
      lines.push({
        DocEntry: item.DocEntry,
        LineNum: item.LineNum,
        ItemCode: item.ItemCode,
        Quantity: item.Quantity,
        LineTotal: item.LineTotal,
        Customs_Value: item.Customs_Value,
        ProjectCustoms: item.Customs_Value / item.Quantity,
        UnitPrice: item.UnitPrice,
        WarehouseCode: item.WarehouseCode,
        Allocated_CostA: ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal),

        Expenditure: (((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal)) / item.Quantity,
        WhsePrice: item.UnitPrice + (item.Customs_Value / item.Quantity) + ((((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal)) / item.Quantity),
        LineTotal1: item.LineTotal + ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) + Number(item.Customs_Value)
      })
      totalsum = totalsum + Number(item.LineTotal + ((Number(getqtyamount / TotalQuantity) * item.Quantity)) + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) + Number(item.Customs_Value))
    })
    setgettotalbeforetax(totalsum)
    console.log("lines", lines)
    setPDNDocumentLines(lines)
  }
  const cashvaluebeforecustom = (getbcamount) => {

    console.log("BC", getbcamount)
    let obj = PDNDocumentLines
    // obj[e.target.name] = e.target.value
    let lines = []
    let totalsum = 0
    console.log("Amount", Number(getbcamount) / Number(totalbforeDiscount))
    obj.forEach(item => {
      lines.push({
        DocEntry: item.DocEntry,
        LineNum: item.LineNum,
        ItemCode: item.ItemCode,
        Quantity: item.Quantity,
        Customs_Value: item.Customs_Value || 0,
        LineTotal: item.LineTotal,
        UnitPrice: item.UnitPrice,
        ProjectCustoms: item.Customs_Value / item.Quantity,
        WarehouseCode: item.WarehouseCode,
        // Allocated_CostA:item.Allocated_CostA,
        Allocated_CostA: Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal,
        Expenditure: (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) / item.Quantity,
        WhsePrice: item.UnitPrice + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) / item.Quantity,
        LineTotal1: item.LineTotal + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) + Number(item.Customs_Value)
      })
      totalsum = totalsum + Number(item.LineTotal + (Number(getbcamount / Number(totalbforeDiscount)) * item.LineTotal) + Number(item.Customs_Value))
    })
    setgettotalbeforetax(totalsum)
    console.log("lines", lines)
    setPDNDocumentLines(lines)
    //  setAlloctionCost(lines)
    //  console.log("obj",obj)
  }
  const quantity = (getqtyamount) => {
    console.log("QTY", getqtyamount)
    let obj = PDNDocumentLines
    // obj[e.target.name] = e.target.value
    let lines = []
    let totalsum = 0
    console.log(getqtyamount, "____", TotalQuantity)
    console.log("Amount", Number(Amount) / Number(TotalQuantity))
    obj.forEach(item => {
      console.log("item", item)
      lines.push({
        DocEntry: item.DocEntry,
        LineNum: item.LineNum,
        ItemCode: item.ItemCode,
        Quantity: item.Quantity,
        LineTotal: item.LineTotal,
        Customs_Value: item.Customs_Value || 0,
        UnitPrice: item.UnitPrice,
        ProjectCustoms: item.Customs_Value / item.Quantity,
        WarehouseCode: item.WarehouseCode,
        // Allocated_CostA:item.Allocated_CostA,
        Allocated_CostA: Number((Number(getqtyamount / TotalQuantity) * item.Quantity)),
        // Allocated_CostA:item.Allocated_CostA,
        Expenditure: Number((Number(getqtyamount / TotalQuantity) * item.Quantity)) / item.Quantity,
        WhsePrice: item.UnitPrice + (Number((Number(getqtyamount / TotalQuantity) * item.Quantity)) / item.Quantity),
        LineTotal1: item.LineTotal + Number((Number(getqtyamount / TotalQuantity) * item.Quantity)) + Number(item.Customs_Value)
      })
      totalsum = totalsum + (Number(item.LineTotal + Number((Number(getqtyamount / TotalQuantity) * item.Quantity)) + Number(item.Customs_Value)))
    })
    setgettotalbeforetax(totalsum)
    console.log("lines", lines)
    setPDNDocumentLines(lines)
    //  setAlloctionCost(lines)
    //  console.log("obj",obj)
  }
  const cashvalueaftercustom = (getacamount) => {
    console.log("AC", getacamount)
    let obj = PDNDocumentLines
    // obj[e.target.name] = e.target.value
    let lines = []
    let totalsum = 0
    obj.forEach(item => {
      lines.push({
        DocEntry: item.DocEntry,
        LineNum: item.LineNum,
        ItemCode: item.ItemCode,
        Quantity: item.Quantity,
        LineTotal: item.LineTotal,
        Customs_Value: item.Customs_Value,
        ProjectCustoms: item.Customs_Value / item.Quantity,
        UnitPrice: item.UnitPrice,
        WarehouseCode: item.WarehouseCode,
        // Allocated_CostA:item.Allocated_CostA,
        Allocated_CostA: Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value))),
        // Allocated_CostA:item.Allocated_CostA,
        Expenditure: (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) / item.Quantity,
        WhsePrice: item.UnitPrice + (item.Customs_Value / item.Quantity) + ((Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) / item.Quantity),
        LineTotal1: (item.LineTotal + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + Number(item.Customs_Value))
      })
      console.log("item.LineTotal1", (item.LineTotal + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + Number(item.Customs_Value)))
      totalsum = totalsum + (item.LineTotal + (Number(Number(getacamount) / (Number(totalbforeDiscount + Number(CustomValue))) * (item.LineTotal + Number(item.Customs_Value)))) + Number(item.Customs_Value))
    })
    console.log("totalsum", totalsum)
    setgettotalbeforetax(totalsum)
    setPDNDocumentLines(lines)
    //  setAlloctionCost(lines)
    //  console.log("obj",obj)
  }
  const valuedropfunction = (e, index, name) => {
    let obj = LaCost
    let lines = []
    obj[index][name] = e.value
    setLaCost(obj)
    // if(e.value == 'ab_Quantity'){
    //   console.log(e)
    //   // quantity(e)
    // } 

  }
  // const valueonchange = (e,index) => {
  //   let obj = PDNDocumentLines
  //   obj[index][e.target.name]=e.target.value
  //   setPDNDocumentLines(obj)
  //   let sum = 0
  //   obj.forEach(element => {
  //           sum = sum + Number(element.Customs_Value)  
  //   })
  //  setCustomValue(sum)

  // }
  const valuechangerfunction = (e, index) => {
    let obj = PDNDocumentLines
    obj[index][e.target.name] = e.target.value
    console.log("chacker", obj)
    let sum = 0
    obj.forEach(element => {
      sum = sum + Number(element.Customs_Value)
    })
    console.log("sumcustom", sum)
    setCustomValue(sum)
    setPDNDocumentLines(obj)
  }
  const valuechangerfunction1 = (e, index) => {
    let obj = LCDocumentLines
    obj[index][e.target.name] = e.target.value
    let sum = 0
    obj.forEach(element => {
      sum = sum + Number(element.Customs_Value)
    })
    setCustomValue(sum)
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setLCDocumentLines(obj)
  }
  const valuechanger2221 = (e, index) => {
    console.log(LCDocumentLines)
    let obj = LCDocumentLines
    obj[index][e.target.name] = e.target.value
    obj[index]['Customs_Value'] = Number(obj[index]['Projected_Customs']) * Number(obj[index]['Quantity'])
    obj[index]['LineTotal2'] = Number(obj[index]['LineTotal']) + Number(obj[index]['Customs_Value'])
    obj[index]['Total_Costs'] = Number(obj[index]['Quantity']) * Number(obj[index]['Projected_Customs'])
    obj[index]['Whse_Price'] = Number(obj[index]['BaseDocumentPrice']) + Number(obj[index]['Projected_Customs'])
    obj[index]['Whse_Price1'] = Number(obj[index]['BaseDocumentPrice']) + Number(obj[index]['Expenditure']) + Number(obj[index]['Projected_Customs'])
    obj[index]['LineTotal1'] = Number(obj[index]['Customs_Value']) + Number(obj[index]['Allocated_Cost']) + Number(obj[index]['LineTotal'])
    obj[index]['Total_Costs1'] = (Number(obj[index]['Quantity']) * Number(obj[index]['Projected_Customs'])) + (Number(obj[index]['Quantity']) * Number(obj[index]['Expenditure']))
    let sum = 0
    obj.forEach(element => {
      sum = sum + Number(element.Customs_Value)
    })
    setCustomValue(sum)
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setLCDocumentLines(obj)
  }


  const valuechanger222 = (e, index) => {
    let obj = PDNDocumentLines
    obj[index][e.target.name] = e.target.value
    obj[index]['Customs_Value'] = Number(obj[index]['Projected_Customs']) * Number(obj[index]['Quantity'])
    obj[index]['LineTotal2'] = Number(obj[index]['LineTotal']) + Number(obj[index]['Customs_Value'])
    obj[index]['Total_Costs'] = Number(obj[index]['Quantity']) * Number(obj[index]['Projected_Customs'])
    obj[index]['Whse_Price'] = Number(obj[index]['UnitPrice']) + Number(obj[index]['Projected_Customs'])
    obj[index]['Whse_Price1'] = Number(obj[index]['UnitPrice']) + Number(obj[index]['Expenditure']) + Number(obj[index]['Projected_Customs'])
    obj[index]['LineTotal1'] = Number(obj[index]['Customs_Value']) + Number(obj[index]['Allocated_Cost']) + Number(obj[index]['LineTotal'])
    obj[index]['Total_Costs1'] = (Number(obj[index]['Quantity']) * Number(obj[index]['Projected_Customs'])) + (Number(obj[index]['Quantity']) * Number(obj[index]['Expenditure']))
    // obj[index]['Allocated_CostA'] = (Amount / TotalQuantity) * Number(obj[index]['Quantity'])
    // console.log(obj[index]['Allocated_CostA'])
    let sum = 0
    // let sum1 = 0
    obj.forEach(element => {
      // sum1 =  sum1 +  Number(element.LineTotal1)
      sum = sum + Number(element.Customs_Value)
    })
    setCustomValue(sum)
    //  setTotalbforeDiscount(sum1)
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setPDNDocumentLines(obj)
  }
  const valuechanger = (e, index) => {
    let obj = PDNDocumentLines
    obj[index][e.target.name] = e.target.value

    obj[index]['Whse_Price'] = Number(obj[index]['UnitPrice']) + Number(obj[index]['Expenditure'])
    obj[index]['Whse_Price1'] = Number(obj[index]['UnitPrice']) + Number(obj[index]['Expenditure']) + Number(obj[index]['Projected_Customs'])
    obj[index]['Allocated_Cost'] = Number(obj[index]['Quantity']) * Number(obj[index]['Expenditure'])
    obj[index]['LineTotal2'] = Number(obj[index]['LineTotal']) + Number(obj[index]['Allocated_Cost'])
    obj[index]['LineTotal1'] = Number(obj[index]['Customs_Value']) + Number(obj[index]['Allocated_Cost']) + Number(obj[index]['LineTotal'])
    obj[index]['Total_Costs'] = Number(obj[index]['Quantity']) * Number(obj[index]['Expenditure'])
    obj[index]['Total_Costs1'] = (Number(obj[index]['Quantity']) * Number(obj[index]['Projected_Customs'])) + (Number(obj[index]['Quantity']) * Number(obj[index]['Expenditure']))
    // let sum = 0
    let sum1 = 0
    obj.forEach(element => {
      // sum =  sum +  Number(element.LineTotal1)
      sum1 = sum1 + Number(element.Allocated_Cost)
    })
    //  setTotalbforeDiscount(sum)
    //  setLineTotal1(Number(obj[index]['LineTotal1']) )
    //  console.log(sum);
    setAllocCostTotalValue(sum1)
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1); (
      setPDNDocumentLines(obj))

  }

  const valuechanger1 = (e, index) => {
    let obj = LCDocumentLines
    obj[index][e.target.name] = e.target.value
    obj[index]['Whse_Price'] = Number(obj[index]['BaseDocumentPrice']) + Number(obj[index]['Expenditure'])
    obj[index]['Whse_Price1'] = Number(obj[index]['BaseDocumentPrice']) + Number(obj[index]['Expenditure']) + Number(obj[index]['Projected_Customs'])
    obj[index]['Allocated_Cost'] = Number(obj[index]['Quantity']) * Number(obj[index]['Expenditure'])

    // obj[index]['Customs_Value']= Number(obj[index]['Projected_Customs']) * Number(obj[index]['Quantity'])
    obj[index]['LineTotal2'] = Number(obj[index]['LineTotal']) + Number(obj[index]['Allocated_Cost'])
    obj[index]['LineTotal1'] = Number(obj[index]['Customs_Value']) + Number(obj[index]['Allocated_Cost']) + Number(obj[index]['LineTotal'])
    obj[index]['Total_Costs'] = Number(obj[index]['Quantity']) * Number(obj[index]['Expenditure'])
    obj[index]['Total_Costs1'] = (Number(obj[index]['Quantity']) * Number(obj[index]['Projected_Customs'])) + (Number(obj[index]['Quantity']) * Number(obj[index]['Expenditure']))
    let sum = 0
    let sum1 = 0
    obj.forEach(element => {
      sum = sum + Number(element.LineTotal1)
      sum1 = sum1 + Number(element.Allocated_Cost)
    })
    setLineTotalValue(sum)
    setAllocCostTotalValue(sum1)
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1); (
      setLCDocumentLines(obj))
  }


  const getdropdownvalue = (e, name) => {
    let obj = getvalues
    obj[name] = e.value
    // console.log("name",name)
    // console.log("e.value",e.value)
    setgetvalues(obj)
    // console.log(obj);
  }
  const getVendordropdownvalue = (e, name) => {
    let obj = getvalues
    obj[name] = e.value
    // console.log("name",name)
    // console.log("e.value",e.value)
    setgetvalues(obj)
    // console.log(obj);
  }
  // const getLabel = (e, name) => {
  //   let obj = getlabela
  //   obj[name] = e.value
  //   // console.log("name",name)
  //   // console.log("e.value",e.value)
  //   setgetlabela(obj)
  //   // console.log(obj);
  // }

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
  const ShipDateChange = (e, index, name, PrReIndex) => {
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
        setPrRe(res.data.value)
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
  // const ontextChanged = (e, item) =>{
  //   let SelectedDocLines = []
  //   let itemDetail = ItemsDetails
  //   itemDetail[item][e.target.name] = e.target.value

  //   itemDetail[item]["UnitPrice"] =(itemDetail[item].LineTotal + Number(getvalues.Expenditure) )
  //   console.log("Unit Price",itemDetail[item].LineTotal + Number(getvalues.Expenditure))
  //   PDNDocumentLines.forEach(element => {
  //     SelectedDocLines.push({
  //       UnitPrice: ItemsDetails[element]['UnitPrice']

  //     })
  //   })

  // }
  // const ontextChanged = (e, index, PrReIndex) => {
  //   let itemDetail = PQDocumentLines
  //   itemDetail[PrReIndex].DocumentLines[index][e.target.name] = e.target.value
  //   setPQDocumentLines(itemDetail)
  // }
  // const SearchontextChanged = (e, index) => {
  //   let itemDetail = SearchDocumentLines
  //   itemDetail[index][e.target.name] = e.target.value
  //   setSearchDocumentLines(itemDetail)
  // }
  const handleClose = () => {
    setShow(false)
  }
  const handleCloseLC = () => {
    setShowLC(false)
  }
  const handleCloseAR = () => {
    setShowAR(false)
  }
  const handleCloseAP = () => {
    setShowAP(false)
  }
  const handleShow = async () => {
    console.log("SelectedVendor", SelectedVendor)
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `PurchaseDeliveryNotes?$filter=CardCode eq '${SelectedVendor}' `
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setPrRe(res.data.value)
        // setDocumentNumber(res.data.value)
        // console.log(res.data.value)
      })
      .catch({})

    setShow(true)
  }
  const handleShowAR = async () => {
    console.log("SelectedVendor", SelectedVendor)
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `PurchaseInvoices?$filter=CardCode eq '${SelectedVendor}' and DocumentStatus eq 'bost_Open'`
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setARIN(res.data.value)
        // setDocumentNumber(res.data.value)
        // console.log(res.data.value)
      })
      .catch({})

    setShowAR(true)
  }
  const handleShowAP = async () => {
    console.log("SelectedVendor", SelectedVendor)
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `Invoices?$filter=CardCode eq '${SelectedVendor}'`
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setAPIN(res.data.value)
        // setDocumentNumber(res.data.value)
        // console.log(res.data.value)
      })
      .catch({})

    setShowAP(true)
  }
  const handleShowLC = async () => {
    console.log("SelectedVendor", SelectedVendor)
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `LandedCosts?$filter=VendorCode eq '${SelectedVendor}'`
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        setLACO(res.data.value)
        // setDocumentNumber(res.data.value)
        console.log(res.data.value)
      })
      .catch({})

    setShowLC(true)
  }
  const handleDelete = async () => {
    console.log(SelectedVendor)
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/DeleteApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `LandedCostsCodes?$filter=CardCode eq '19'`
    console.log(SAPapi);
    await axios
      .delete(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log("delete", res.data.value);
        // setPrRe(res.data.value)
      })
      .catch({})

    // setShow(true)
  }
  //   function onLinkClick(e) {
  //     e.preventDefault();
  //     // further processing happens here
  //  }
  const LandedCostCode = async () => {

    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `LandedCostsCodes`
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log("LandedCost", res.data.value)
        setLaCost(res.data.value)
        console.log("Landed Cost Code", res.data.value)

      })
      .catch({})
  }
  const selectPR = async (item) => {
    setShow(false)
    console.log(item)
    setHeaderData(item)
    setchanger(true)
    setgetdocentry(item.DocEntry)
    setcancelbutton(true)
    setgetTransNum(item.TransactionNumber)
    console.log("item.LandedCost_ItemLines", item.LandedCost_ItemLines)
    console.log("item.LandedCost_CostLines", item.LandedCost_CostLines)
    setSearchItemLines(item.LandedCost_ItemLines)
    setSearchCostLines(item.LandedCost_CostLines)
    setDocumentNumber(item.DocNum)
    let sum = 0
    let Qty = 0
    // item.DocumentLines.forEach(item => {
    //   console.log("item",item)
    //  sum = sum + item.LineTotal 
    //  Qty = Qty + item.Quantity
    // })
    console.log("Qty", Qty)
    setTotalbforeDiscount(sum)
    setTotalQuantity(Qty)
    setPDNDocumentLines(item.DocumentLines)
    console.log("PDNDocumentLines", item.DocumentLines);
  }

  const selectAR = async (item) => {
    console.log("item.DocumentLines", item.DocumentLines)
    setShow(false)
    setARSelectedPRDocEntry(item)
    setDocumentNumber(item.DocNum)
    console.log("PDNDocumentLines", item.DocumentLines);
    let sum = 0
    let Qty = 0
    let custom = 0
    item.DocumentLines.forEach(item => {
      sum = sum + item.LineTotal
      Qty = Qty + item.Quantity
      custom = custom + Number(item.Customs_Value)
    })
    setCustomValue(custom)
    setTotalbforeDiscount(sum)
    setTotalQuantity(Qty)
    setPDNDocumentLines(item.DocumentLines)
  }
  const selectLandedcost = async (item) => {
    setShow(false)
    console.log("item", item)
    setLCSelectedPRDocEntry(item)
    setLCDocumentLines(item.LandedCost_ItemLines)
    setSearchCostLines(item.LandedCost_CostLines)
    console.log("LandedCost_ItemLines", item.LandedCost_ItemLines);
    let sum = 0
    let price = 0
    item.LandedCost_ItemLines.forEach(item => {
      sum = sum + item.LineTotal

    })
    setTotalbforeDiscount(sum)
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
    let sapAPi = `LandedCosts?$orderby=LandedCostNumber`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res)
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
  const handleCloseLa = () => {
    setShowLa(false)
  }
  const handleShowLa = () => {
    setShowLa(true)
  }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `LandedCosts?$filter=LandedCostNumber eq ${SearchNumber} &$orderby=LandedCostNumber`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res.data.value)
        setHeaderData(res.data.value[0])
        setgetdocentry(res.data.value[0].DocEntry)
        setgetTransNum(res.data.value[0].TransactionNumber)
        localStorage.setItem('getDocEntry', res.data.value[0].DocEntry);
        console.log("ItemLines", res.data.value[0].LandedCost_ItemLines)
        setSearchItemLines(res.data.value[0].LandedCost_ItemLines)
        setSearchCostLines(res.data.value[0].LandedCost_CostLines)
        setchanger(true)
        setcancelbutton(true)
        // let sum = 0
        // res.data.value[0].DocumentLines.forEach(item => {
        //         sum = sum + item.LineTotal         
        // })
        if (res.data.value[0].DocumentStatus == 'bost_Open') {
          setgetStatus("Open")
          setButtonName('Update')
        } else {
          setgetStatus("Close")
          setButtonName('OK')
        }
      })
      .catch({})
  }

  const PriceListValue = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let sapAPI = `PriceLists?$select=PriceListNo,PriceListName`
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

  const getvendorvaluefunction = async (e) => {
    console.log(e.label)

    console.log(e.value)
    setVendorvalue(e.item.CardName)
  }
  const getBrokervaluefunction = async (e) => {
    console.log(e.label)

    console.log(e.value)
    setBrokervalue(e.item.CardName)

  }



  const DocLinesDropDownOnChange = (selectedItem, index, PrReIndex, name) => {
    let itemDetail = PQDocumentLines
    itemDetail[PrReIndex].DocumentLines[index][name] = selectedItem.value
    itemDetail[PrReIndex].DocumentLines[index]['GrossPrice'] =
      selectedItem.item.VatGroups_Lines[0].Rate
    setPQDocumentLines(itemDetail)
  }
  const SearchDocLinesDropDownOnChange = (selectedItem, index, name) => {
    let itemDetail = SearchDocumentLines
    itemDetail[index][name] = selectedItem.value
    itemDetail[index]['GrossPrice'] = selectedItem.item.VatGroups_Lines[0].Rate
    setSearchDocumentLines(itemDetail)
  }

  const Home = () => {
    const alert = useAlert()
  }
  const VendorChange = e => {
    console.log("eeeeeeeeee", e);
    setSelectedVendor(e.value)

  }
  const OpenQtyFunction = (e, index) => {
    let doclines = PQDocumentLines
    const value = e.target.value
    doclines[index]['RemainingOpenQuantity'] = value
    setPQDocumentLines(doclines)
  }
  const submitPatchPO = async () => {
    let docLines = []
    PQDocumentLines.forEach(element => {
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
        WarehouseCode: element.WarehouseCode
      })
    })
    let body = {
      Comments: getcomments,
      DocumentLines: docLines,
      AttachmentEntry: attachmentresponse
    }
    Patch(HeaderData.DocEntry, body)
  }
  const Submit_PatchFunc = () => {
    if (ButtonName == 'Add') {
      submitLC()
    } else if (ButtonName != 'Add') {
      submitPatchPO()
    }
  }
  const Submit_PatchLLCSFunc = () => {
    if (ButtonName == 'OK') {
      handleCloseLa()
    } else if (ButtonName != 'Update') {
      submitLCS()
    }
  }
  const submitLC = async () => {
    let ItemLines = []
    let CostLines = []
    let body = {}
    console.log("ARSelectedPRDocEntry", ARSelectedPRDocEntry);
    console.log("PDNDocumentLines", PDNDocumentLines);
    PDNDocumentLines.forEach(element => {
      ItemLines.push({
        BaseDocumentType: "asPurchaseInvoice",
        BaseEntry: element.DocEntry,
        BaseLine: element.LineNum,
        Number: element.ItemCode,
        Quantity: element.Quantity,
        BaseDocumentPrice: element.UnitPrice,
        // CorrectedBaseDocumentValue: element.LineTotal,
        Project: element.Project,
        // ProjectedCustoms:element.Projected_Customs,
        CustomsValue: element.Customs_Value,
        Expenditure: element.Expenditure,
        AllocatedCostsLineTotal: element.Allocated_CostA,
        WarehousePrice: element.WhsePrice,
        LineTotal: element.LineTotal1,
        TotalCosts: Number(element.Allocated_CostA) + Number(element.Customs_Value),
        Warehouse: element.WarehouseCode,
        ReleaseNumber: '',
        VariantCosts: '0.00',
        CustomsGroupRate: element.Customs_Value,
        Customs: element.Customs_Value,
        FOBandIncludedCosts: element.LineTotal,
        Project: getvalues.Project,

      })
    })
    LaCost.forEach(element => {
      if (element.AllocationBy && element.Amount) {
        CostLines.push({
          LandedCostCode: element.Code,
          AllocationBy: element.AllocationBy === 'ab_CashValueBeforeCustoms' ? (
            'asCashValueBeforeCustoms'
          ) : element.AllocationBy === 'ab_CashValueAfterCustoms' ? (
            'asCashValueAfterCustoms'
          ) : element.AllocationBy === 'ab_Quantity' ? (
            'asQuantity'
          ) : element.AllocationBy === 'ab_Weight' ? (
            'asWeight'
          ) : element.AllocationBy === 'ab_Volume' ? (
            'asVolume'
          ) : null,
          Amount: element.Amount,
          Factor: element.CostFactor,
          // "Factor": 0.001928,
          // IncludeForCustoms: element.PlannedQuantity,
        })
      }
    })
    body['LandedCost_ItemLines'] = ItemLines
    body['LandedCost_CostLines'] = CostLines
    body['Series'] = getseriesvalue
    body['VendorCode'] = getvalues.Vendor
    body['Broker'] = getvalues.Broker
    body['Remarks'] = getvalues.Comments
    body['PostingDate'] = currentDate
    body['DueDate'] = getvalues.DocDueDate  ? getvalues.DocDueDate : currentDate
    body['Reference'] = getvalues.Reference
    body['FileNumber'] = getvalues.File_No
    body['BeforeTax'] = gettotalbeforetax
    body['ProjectedCustoms'] = CustomValue
    body['ActualCustoms'] = CustomValue
    body['Tax1'] = gettax1
    body['Tax2'] = gettax2
    body['Total'] = gettotalbeforetax + Number(gettax2) + Number(gettax1)
    body['TotalFreightCharges'] = AllocCostTotalValue
    // body['AmountToBalance'] = '0.00'
    body['DocumentCurrency'] = 'PKR'
    // body['DocumentRate'] = ARSelectedPRDocEntry.DocRate
    console.log("body", JSON.stringify(body))
    console.log("body", body)

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
          api: LINKS.sap.LandedCost.PostLandedCost,
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
          api: LINKS.sap.LandedCost.PostLandedCost,
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
  const getseriesvaluefunction = async (e) => {
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
  // const getvendorvaluefunction = async (e) =>{
  //   setgetVendorName(item.CardName)
  // }
  const handleSubmitted = ({ res, fields, Dropdown, form }) => {
    form.reset()
    Dropdown.reset()
  }
  const [modalOne, setModalOne] = React.useState()
  const [modalTwo, setModalTwo] = React.useState()
  const [JEshow, setJEShow] = React.useState(false)

  //   const [modalThree,setModalThree]=React.useState();
  //   const [modalFour,setModalFour]=React.useState();
  const handleClosee = () => setJEShow(false)
  const handleCloseee = () => setModalTwo(false)
  function handleShowModalOne() {
    setModalOne('modal-one')
  }
  const documentcancel = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `Invoices(${getdocentry})/Cancel`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("res", res)
        if (res.data.error) {
          alert.error(JSON.stringify(res.data.error.message))
        } else {
          alert.success('Operation completed successfully')
        }
      })
      .catch({})
  }
  const TransactionNumber = async () => {
    let sapAPi = `JournalEntries?$filter=OriginalJournal eq 'ttLandedCosts' and JdtNum  eq ${getTransNum}`
    console.log("SAPapi", sapAPi)
    let sum = 0
    let sum2 = 0
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res)
        setJEHeaderData(res.data.value[0])
        setJournalEntryLines(res.data.value[0].JournalEntryLines)
        res.data.value[0].JournalEntryLines.forEach(item => {
          sum = sum + Number(item.Debit)
          sum2 = sum2 + Number(item.Credit)
        })
        setgettotaldebit(sum)
        setgettotalcredit(sum2)
      })
      .catch({})
    setJEShow(true)
  }
  const handleShowModalTwo = () => {
    setModalTwo('modal-two')
  }
  const ItemsDropDownfunc2 = async selectedList => {
    let list = []
    selectedList.forEach(element => {
      list.push(element.value)
    })
    await setAccountSelectedItems(list)
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
  const selectrow = async items => {
    PQDocumentLines.forEach(element => {
      element.PQDocumentLines.forEach(docElement => {
        if (docElement.isSelected) {
          setSelectShow(docElement)
        }
      })
    })
  }
  const getvaluesformula = () => {
    let sum = 0
    let sum1 = 0
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
  const DocTypeChange = (e) => {
    if (e.value === 'Service') {
      setgetcopyfromdoctype()
      setgetdirectdoctype('Service')
    } else if (e.value === 'Item') {
      setgetdirectdoctype()
      setgetcopyfromdoctype('Item')
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
      <h1 style={{ textAlign: 'center' }}>Landed Cost </h1>
      {/* Upper Side++++++++ */}
      <Form onSubmit={handleSubmitted}>
        <ContextMenuTrigger id="contextmenu">
          <CardGroup>
            <DIV3>
              <Container fluid>

                <label>Vendor</label>
                <div
                  style={{ width: '23.5rem', height: 'auto' }}
                  variant='primary'
                >
                  <Select
                    isDisabled={changer}
                    placeholder={HeaderData && HeaderData.VendorCode + " : +" + HeaderData.VendorName}
                    options={VendorCodeDropdown} // Options to display in the dropdown
                    onChange={e => {
                      getdropdownvalue(e, 'Vendor'); VendorChange(e); getvendorvaluefunction(e)
                    }}
                    displayValue='name' // Property name to display in the dropdown options
                  />
                </div>

                <label>Broker</label>
                <div
                  style={{ width: '23.5rem', height: 'auto' }}
                  variant='primary'
                // onClick={ContactPerson}
                >
                  <Select
                    isDisabled={changer}
                    placeholder={HeaderData && HeaderData.Broker + " : +" + HeaderData.BrokerName}
                    options={VendorCodeDropdown}
                    displayValue='name' // Property name to display in the dropdown options
                    onChange={e => {
                      getdropdownvalue(e, 'Broker'); getBrokervaluefunction(e)
                    }}
                  />
                  {/* )} */}
                </div>

                <br />

                {/* <Button variant='primary' onClick={handleShow}>
              Copy From
      </Button> */}
                {/* --------------------Start Journal Entry Modal------------------ */}
                <Modal
                  show={JEshow}
                  onHide={handleClosee}
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
                                  defaultValue={JEHeaderData && JEHeaderData.Number}
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
                                  defaultValue={JEHeaderData && JEHeaderData.TaxDate}
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
                                  defaultValue={JEHeaderData && JEHeaderData.TaxDate}
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
                                  defaultValue={JEHeaderData && JEHeaderData.TaxDate}
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
                                  defaultValue={JEHeaderData && JEHeaderData.Memo}
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
                                  defaultValue={JEHeaderData && JEHeaderData.Reference}
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
                                  defaultValue={JEHeaderData && JEHeaderData.JdtNum}
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
                                  placeholder={JEHeaderData && JEHeaderData.ProjectCode}
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
                                  defaultValue={JEHeaderData && JEHeaderData.Reference}
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
                                  defaultValue={JEHeaderData && JEHeaderData.Reference2}
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
                                  defaultValue={JEHeaderData && JEHeaderData.Reference3}
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
                                ) : null}
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
                                  <tr>
                                    <TD></TD>
                                    <TD></TD>
                                    <TD></TD>
                                    <TD>{gettotaldebit}</TD>
                                    <TD>{gettotalcredit}</TD>
                                    <TD></TD>
                                    <TD></TD>
                                    <TD></TD>
                                    <TD></TD>
                                    <TD></TD>
                                    <TD></TD>
                                  </tr>
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
                            handleClosee()
                          }}
                        >
                          OK
                        </Button>
                        <Button
                          style={{ marginLeft: '5%' }}
                          onClick={() => {
                            handleClosee()
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
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Copy From
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShow} >Goods Receipt PO</Dropdown.Item>
                    {/* <Dropdown.Item onClick={handleShowLC}>Landed Cost</Dropdown.Item> */}
                    <Dropdown.Item onClick={handleShowAR} >A/P Invoice</Dropdown.Item>
                    {/* <Dropdown.Item  onClick={handleShowAP}>A/P Invoice</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
                <Modal
                  show={show}
                  onHide={handleClose}
                  className='Modal-big'
                  size='lg'
                >
                  <Modal.Header closeButton>
                    <Modal.Title id='example-modal-sizes-title-lg'>
                      Open GRPO List
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {PrRe && (
                      <Table responsive>
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Document No.</th>
                            <th>Vendor</th>
                            <th>Remarks</th>
                            <th>DocumentStatus</th>
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
                              <TD>{item.DocNum}</TD>
                              <TD>{item.CardName}</TD>
                              <TD>{item.Comments}</TD>
                              <TD>{item.DocumentStatus}</TD>
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
                <Modal
                  show={showLC}
                  onHide={handleCloseLC}
                  className='Modal-big'
                  size='lg'
                >
                  <Modal.Header closeButton>
                    <Modal.Title id='example-modal-sizes-title-lg'>
                      Document List
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {LACO && (
                      <Table responsive>
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Vendor</th>
                            <th>Remarks</th>
                            <th>Posting Date</th>
                          </tr>
                        </TableHead>
                        <tbody>
                          {LACO.map((item, index) => (
                            <tr key={`${index}`} onClick={e => {
                              selectLandedcost(item)
                              handleCloseLC()
                            }}>
                              <TD>
                                {index + 1}

                              </TD>
                              <TD>{item.VendorName}</TD>
                              <TD>{item.Remarks}</TD>
                              <TD>{item.PostingDate}</TD>
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

                        handleCloseLC()
                      }}
                    >
                      Choose
                    </Button>
                    <Button variant='primary' onClick={handleClose}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal
                  show={showAR}
                  onHide={handleCloseAR}
                  className='Modal-big'
                  size='lg'
                >
                  <Modal.Header closeButton>
                    <Modal.Title id='example-modal-sizes-title-lg'>
                      Open Invoice List
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {ARIN && (
                      <Table responsive>
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Document No.</th>
                            <th>Vendor</th>
                            <th>Remarks</th>
                            <th>DocumentStatus</th>
                          </tr>
                        </TableHead>
                        <tbody>
                          {ARIN.map((item, index) => (
                            <tr key={`${index}`} onClick={e => {
                              selectAR(item)
                              handleCloseAR()
                            }}>
                              <TD>
                                {index + 1}
                              </TD>
                              <TD>{item.DocNum}</TD>
                              <TD>{item.CardName}</TD>
                              <TD>{item.Comments}</TD>
                              <TD>{item.DocumentStatus}</TD>
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

                        handleCloseAR()
                      }}
                    >
                      Choose
                    </Button>
                    <Button variant='primary' onClick={handleClose}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal
                  show={showAP}
                  onHide={handleCloseAP}
                  className='Modal-big'
                  size='lg'
                >
                  <Modal.Header closeButton>
                    <Modal.Title id='example-modal-sizes-title-lg'>
                      Open Invoice List
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {APIN && (
                      <Table responsive>
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Document No.</th>
                            <th>Vendor</th>
                            <th>Remarks</th>
                            <th>DocumentStatus</th>
                          </tr>
                        </TableHead>
                        <tbody>
                          {APIN.map((item, index) => (
                            <tr key={`${index}`} onClick={e => {
                              selectAR(item)
                              handleCloseAP()
                            }}>
                              <TD>
                                {index + 1}
                              </TD>
                              <TD>{item.DocNum}</TD>
                              <TD>{item.CardName}</TD>
                              <TD>{item.Comments}</TD>
                              <TD>{item.DocumentStatus}</TD>
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

                        handleCloseAP()
                      }}
                    >
                      Choose
                    </Button>
                    <Button variant='primary' onClick={handleCloseAP}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal
                  show={showLa}
                  onHide={handleCloseLa}
                  className='Modal-big'
                  size='lg'
                >
                  <Modal.Header closeButton>
                    <Modal.Title id='example-modal-sizes-title-lg'>
                      Landed Cost - Setup
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {LaCost && (
                      <Table responsive>
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Allocation By</th>
                            <th>Landed Cost Alloc. Account</th>
                          </tr>
                        </TableHead>
                        <tbody>
                          {LaCost.map((item, index) => (
                            <tr
                              key={`${index}`}
                            //  onClick={e => {
                            // selectPR(item)
                            // handleClose()
                            // }}
                            >
                              <TD>
                                {index + 1}
                                {/* {setCostindex(index + 1)} */}

                              </TD>
                              <TD><div >
                                <input
                                  placeholder={item.Code}
                                  type='text'
                                  name='Code'
                                  class='form-control'
                                  readOnly
                                />
                              </div></TD>
                              <TD><div >
                                <input
                                  placeholder={item.Name}
                                  type='text'
                                  name='Code'
                                  class='form-control'
                                  onChange={e => {
                                    valuechangefunction(e); setButtonNameLA("Update")
                                  }}
                                />
                              </div></TD>
                              <TD> <div >
                                <Select
                          menuPortalTarget={document.body}
                                  placeholder={item.AllocationBy === 'ab_CashValueBeforeCustoms' ? (
                                    <p>
                                      Cash Value Before Customs
                                    </p>
                                  ) : item.AllocationBy === 'ab_CashValueAfterCustoms' ? (
                                    <p >
                                      Cash Value After Customs
                                    </p>
                                  ) : item.AllocationBy === 'ab_Quantity' ? (
                                    <p >
                                      Quantity
                                    </p>
                                  ) : item.AllocationBy === 'ab_Weight' ? (
                                    <p >
                                      Weight
                                    </p>
                                  ) : item.AllocationBy === 'ab_Volume' ? (
                                    <p >
                                      Volume
                                    </p>) : null}
                                  options={[{ value: "asCashValueBeforeCustoms", label: "Cash Value Before Customs" },
                                  { value: "asCashValueAfterCustoms", label: "Cash Value After Customs" },
                                  { value: "asQuantity", label: "Quantity" },
                                  { value: "asWeight", label: "Weight" },
                                  { value: "asVolume", label: "Volume" }]}// Options to display in the dropdown
                                  onChange={e => { valuedropfunction(e, index, 'AllocationBy') }
                                  }
                                  displayValue='name' // Property name to display in the dropdown options
                                />

                              </div></TD>
                              <TD> <div>
                                <Select
                          menuPortalTarget={document.body}
                                  placeholder={item.LandedCostsAllocationAccount}
                                  options={ItemsDropDown} // Options to display in the dropdown
                                  onChange={e => { getVendordropdownvalue(e, 'LandedCostsAllocationAccount') }}

                                  displayValue='name' // Property name to display in the dropdown options
                                />

                              </div></TD>
                            </tr>

                          ))}
                          <tr>
                            <TD></TD>
                            <TD>  <div >
                              <input
                                type='text'
                                name='Code'
                                class='form-control'


                                // defaultValue={item.FreeText}
                                onChange={e => {
                                  valuechangefunction(e);; setButtonNameLA("Update")
                                }}
                              />
                            </div></TD>
                            <TD>  <div >
                              <input
                                type='text'
                                name='Name'
                                class='form-control'
                                // defaultValue={item.FreeText}
                                onChange={e => {
                                  valuechangefunction(e);; setButtonNameLA("Update")
                                }}
                              />
                            </div></TD>
                            <TD> <div >
                              <Select
                          menuPortalTarget={document.body}
                                placeholder='Select..'
                                options={[{ value: "ab_CashValueBeforeCustoms", label: "Cash Value Before Customs" },
                                { value: "ab_CashValueAfterCustoms", label: "Cash Value After Customs" },
                                { value: "ab_Quantity", label: "Quantity" },
                                { value: "ab_Weight", label: "Weight" },
                                { value: "ab_Volume", label: "Volume" }]}// Options to display in the dropdown
                                onChange={e => { getVendordropdownvalue(e, 'AllocationBy'); setButtonNameLA("Update") }}
                                displayValue='name' // Property name to display in the dropdown options
                              />

                            </div></TD>
                            <TD> <div>
                              <Select
                          menuPortalTarget={document.body}
                                placeholder='Select..'
                                options={ItemsDropDown} // Options to display in the dropdown
                                onChange={e => { getVendordropdownvalue(e, 'LandedCostsAllocationAccount'); setButtonNameLA("Update") }}

                                displayValue='name' // Property name to display in the dropdown options
                              />

                            </div></TD>
                          </tr>
                        </tbody>
                      </Table>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant='secondary'
                      onClick={() => {
                        Submit_PatchLLCSFunc()
                        LandedCostCode()
                        // afterSubmission(e)
                        // handleCloseLa()

                      }}
                    >
                      {ButtonNameLA}
                    </Button>
                    <Button variant='primary' onClick={handleDelete}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal
                  show={modalTwo === 'modal-two'}
                  className='Modal-big'
                  size='lg'
                >
                  <Modal.Title id='example-modal-sizes-title-lg'>
                    List of GRPO
                  </Modal.Title>
                  <Modal.Body>
                    {PQDocumentLines && (
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
                          {[...Array(PQDocumentLines)].map((item, index) => (
                            <tr key={`${index}`}>
                              <TD>{index + 1}
                              </TD>
                              <TD>

                              </TD>
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
                                {item.RemainingOpenQuantity ? OpenQty : 0}{' '}
                              </TD>
                              <TD>
                                <div style={{ width: '15em' }}>
                                  {PrWhse && (
                                    <Select
                                    menuPortalTarget={document.body}
                                      value={PrWhse.filter(
                                        option =>
                                          option.value ===
                                          item.WarehouseCode
                                      )}
                                      placeholder='Select..'
                                      options={PrWhse} // Options to display in the dropdown
                                      onChange={e => {
                                        DocLinesDropDownOnChange(
                                          e,
                                          index,
                                          'WarehouseCode'
                                        )
                                      }}
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
                                    placeholder={
                                      item.VatGroup +
                                      '  : ' +
                                      item.TaxPercentagePerRow +
                                      '%'
                                    }
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
                                    options={Frieght} // Options to display in the dropdown
                                    displayValue='name' // Property name to display in the dropdown options
                                  />
                                </div>
                              </TD>
                              <TD>
                                {/* {item.DocumentLineAdditionalExpenses[0].LineTotal || "null"} */}
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
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={() => { getvaluesformula(); handleCloseee() }}>
                      Choose
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show1} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Landed Cost List</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {ModalHeaderData && (
                      <Table responsive>
                        <TableHead>
                          <tr>
                            <th>#</th>
                            <th>DocNum</th>
                            <th>DocEntry</th>
                            <th>Vendor</th>
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

                              <TD>{item.LandedCostNumber}</TD>
                              <TD>{item.DocEntry}</TD>
                              <TD>{item.VendorCode + " : " + item.VendorName}</TD>
                              <TD>{item.PostingDate}</TD>
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
                  </Modal.Footer>
                </Modal>
                <label>Currency</label>
                <div
                  style={{ width: '23.5rem', height: 'auto' }}
                  variant='primary'
                // onClick={ContactPerson}
                >
                  <Select
                  placeholder={'PKR'}
                    options={[{label:'PKR',value:'PKR'}]}
                    displayValue='name' // Property name to display in the dropdown options
                    onChange={e => {
                      getdropdownvalue(e, 'Broker'); getBrokervaluefunction(e)
                    }}
                  />
                  {/* )} */}
                </div>

                <br />
                <br />
              </Container>
            </DIV3>
            <DIV4>
            </DIV4>
            <DIV3>
              <Container>
                <div style={{ marginLeft: '3rem' }}>
                  <label>No.</label>
                  <CardGroup>
                    <br />
                    <div style={{ width: '11.5rem', height: 'auto' }} >
                      <Select
                        isDisabled={changer}
                        // placeholder={HeaderData && HeaderData.RequesterName}
                        options={getserviceseries} // Options to display in the dropdown
                        onChange={e=>{getseriesvaluefunction(e)
                          Whse(e.item.Name)}} // Function will trigger on select event
                        // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                        displayValue='name' // Property name to display in the dropdown options
                      />
                    </div>
                    <div style={{ width: '11.5rem', height: 'auto' }}>
                      <input
                        type='number'
                        name='DocNum'
                        readOnly
                        value={getnextnumber || HeaderData && HeaderData.LandedCostNumber}
                        placeholder=''
                        class='form-control'
                      /> <br />
                    </div>
                  </CardGroup>
                </div>
                <div className="invoice"
                  style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem', border: '1px solid', borderColor: 'lightgray', borderRadius: '4px' }}
                >
                  <a onClick={e => {
                    SearchAll_Filter_Data()
                  }} style={{ cursor: 'pointer' }}> <svg class="svg-icon19" viewBox="0 0 20 20">
                      <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                    </svg></a>
                  <input
                    name={'SearchPRNumber'}
                    type='Number'
                    placeholder='Number'
                    class='form-control19'
                    onChange={e => {
                      setSearchNumber(e.target.value)
                    }}
                  /></div>
                <br />
                {/* <br />
              <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
              <label>No</label>
              <input
                type='number'
                readOnly='readOnly'
                defaultValue={
                  SelectedPRDocEntry && SelectedPRDocEntry.DocNum
                    ? HeaderData && HeaderData.DocNum
                    : null
                }
                class='form-control'
              /></div>
              <br /> */}

                <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
                  <label>Posting Date</label>
                  <input
                    type='date'
                    name='DocDate'
                    disabled={changer}
                    class='form-control'
                    defaultValue={HeaderData && HeaderData.PostingDate ? HeaderData && HeaderData.PostingDate : currentDate}
                    onChange={e => {
                      setcurrentDate(e.target.value)
                    }}
                  /></div>
                <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
                  <label> Due Date</label>
                  <input
                    type='date'
                    name='DocDueDate'
                    disabled={changer}
                    defaultValue={HeaderData && HeaderData.PostingDate ? HeaderData && HeaderData.PostingDate : currentDate}
                    class='form-control'
                    onChange={e => {
                      valuechangefunction(e)
                    }}
                  /></div>
                <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
                  <label>Reference</label>
                  <input
                    defaultValue={HeaderData && HeaderData.Reference}
                    type='text'
                    onChange={e => {
                      valuechangefunction(e)
                    }}
                    name='Reference'
                    class='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    disabled={changer}
                  ></input>
                </div>
                <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
                  <label>File No.</label>
                  <input
                    defaultValue={HeaderData && HeaderData.FileNumber}
                    onChange={e => {
                      valuechangefunction(e)
                    }}
                    name='File_No'
                    type='text'
                    class='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    disabled={changer}
                  ></input>
                </div>
                {/* <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
              <label> Document Date</label>
              <input
                type='date'
                name='DocumentDate'
                class='form-control'
                defaultValue={
                  SelectedPRDocEntry && SelectedPRDocEntry.TaxDate
                    ? HeaderData && HeaderData.TaxDate
                    : null
                }
                onChange={e => {
                  dateChange(e)
                }}
              /></div> */}
                <br />
              </Container>
            </DIV3>
          </CardGroup>
          {/* Table+++++++++ */}
          <Tabs
            defaultActiveKey='Items'
            transition={false}
            id='noanim-tab-example'
          >
            <Tab eventKey='Items' title='Items'>
              {PDNDocumentLines && (
                <Table responsive striped bordered hover>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Item No.</th>
                      <th>Item Description</th>
                      <th>Quantity</th>
                      <th>Base Doc. Price</th>
                      <th>Base Doc. Value</th>
                      <th>Proj. cust.</th>
                      <th>Customs value</th>
                      <th>Expenditure</th>
                      <th>Alloc.Costs Val.</th>
                      <th>Whse Price</th>
                      <th>Total</th>
                      <th>Total Costs</th>
                      <th>Whse</th>
                      <th>Release No.</th>
                      <th>Var. Costs</th>
                      <th>Const. Costs</th>
                      <th>Expected Customs</th>
                      <th>FOB and Included Costs</th>
                      <th>Project</th>
                      <th>Distr. Rule</th>
                      <th>UoM Code</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {PDNDocumentLines && PDNDocumentLines.map((item, index) => (
                      <tr key={`${index}`}>
                        <TD>{index + 1}
                        </TD>
                        <TD>
                          {item.ItemCode}
                        </TD> 
                        <TD>
                          {item.ItemDescription}
                        </TD>
                        <TD>{item.Quantity}</TD>
                        <TD>{item.UnitPrice}</TD>
                        <TD>{item.LineTotal}</TD>

                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              placeholder='PKR 0.00'
                              type='text'
                              class='form-control'
                              defaultValue={item.ProjectCustoms}

                              onChange={e => {
                                valuechanger222(e, index)
                              }}
                              name='Projected_Customs'
                            />
                          </div>
                        </TD>
                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              defaultValue={item.Customs_Value}
                              placeholder='PKR 0.00'
                              type='number'
                              class='form-control'
                              onChange={e => {
                                valuechangerfunction(e, index)
                              }}
                              name='Customs_Value'
                            />
                          </div></TD>
                        <TD><div style={{ width: '10.5rem' }}>
                          <input
                            placeholder='PKR 0.00'
                            type='number'
                            class='form-control'
                            defaultValue={item.Expenditure}
                            onChange={e => {
                              valuechanger(e, index)
                            }}
                            name='Expenditure'
                          />
                        </div></TD>
                        {/* {AlloctionCost.map(item => { */}
                        <TD> <div style={{ width: '10.5rem' }}>
                          <input
                            placeholder='PKR 0.00'
                            defaultValue={item.Allocated_CostA}

                            type='number'
                            class='form-control'
                            onChange={e => {
                              valuechanger(e, index)
                            }}
                            name='Allocated_Cost'
                          />
                        </div></TD>
                        {/* })} */}

                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              placeholder='PKR 0.00'
                              defaultValue={item.WhsePrice}
                              type='number'
                              readOnly
                              class='form-control'
                              name='WhsePrice'
                            />
                          </div>
                        </TD>

                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              placeholder='PKR 0.00'
                              defaultValue={item.LineTotal1}
                              type='number'
                              readOnly
                              class='form-control'
                              name='LineTotal1'
                            />
                          </div>
                        </TD>

                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              placeholder='PKR 0.00'
                              value={Number(item.Allocated_CostA) + Number(item.Customs_Value)}
                              type='number'
                              readOnly
                              class='form-control'
                              name='Total_Costs'
                            />
                          </div>
                        </TD>
                        <TD>{item.WarehouseCode}</TD>
                        <TD></TD>
                        <TD></TD>
                        <TD></TD>
                        <TD></TD>
                        <TD>{item.LineTotal}</TD>
                        <TD> <div
                          style={{ width: '10.5rem', height: 'auto' }}
                          variant='primary'
                        >
                          <Select
                          menuPortalTarget={document.body}
                            // Value={SelectedVendor}
                            options={PrProject} // Options to display in the dropdown
                            onChange={e => {
                              getdropdownvalue(e, 'Project')
                            }}
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        </div></TD>
                        <TD><div
                          style={{ width: '10.5rem', height: 'auto' }}
                          variant='primary'
                        >
                          <Select
                          menuPortalTarget={document.body}
                            // Value={SelectedVendor}
                            // options={PrProject} // Options to display in the dropdown
                            onChange={e => {
                              getdropdownvalue(e, 'Vendor')
                            }}
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        </div></TD>
                        <TD>{item.UoMCode}</TD>

                      </tr>
                    )

                    )}
                  </tbody>
                </Table>
              )}

              {LCDocumentLines && (
                <Table responsive striped bordered hover>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Item No.</th>
                      <th>Quantity</th>
                      <th>Base Doc. Price</th>
                      <th>Base Doc. Value</th>
                      <th>Proj. cust.</th>
                      <th>Customs value</th>
                      <th>Expenditure</th>
                      <th>Alloc.Costs Val.</th>
                      <th>Whse Price</th>
                      <th>Total</th>
                      <th>Total Costs</th>
                      <th>Whse</th>
                      <th>Release No.</th>
                      <th>Var. Costs</th>
                      <th>Const. Costs</th>
                      <th>Expected Customs</th>
                      <th>FOB and Included Costs</th>
                      <th>Project</th>
                      <th>Distr. Rule</th>
                      <th>UoM Code</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {LCDocumentLines && LCDocumentLines.map((item, index) => (
                      <tr key={`${index}`}>
                        <TD>{index + 1}
                        </TD>
                        <TD>
                          {item.VendorCode}
                        </TD>
                        <TD>{item.Quantity}</TD>
                        <TD>{item.BaseDocumentPrice}</TD>
                        <TD>{item.BaseDocumentValueLineTotal}</TD>

                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              defaultValue={item.ProjectedCustoms}
                              placeholder='PKR 0.00'

                              type='text'
                              class='form-control'


                              onChange={e => {
                                valuechanger2221(e, index)
                              }}
                              name='Projected_Customs'
                            />
                          </div>
                        </TD>
                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              Value={item.Customs_Value ? item.Customs_Value : item.CustomsValue}
                              placeholder='PKR 0.00'
                              type='number'
                              class='form-control'
                              onChange={e => {
                                valuechangerfunction1(e, index); valuechanger2221(e, index)
                              }}
                              name='Customs_Value'
                            />
                          </div></TD>
                        <TD><div style={{ width: '10.5rem' }}>
                          <input
                            defaultValue={item.Expenditure}
                            placeholder='PKR 0.00'

                            type='number'
                            class='form-control'
                            onChange={e => {
                              valuechanger1(e, index)
                            }}
                            name='Expenditure'
                          />
                        </div></TD>
                        <TD> <div style={{ width: '10.5rem' }}>
                          <input
                            placeholder={'PKR 0.00'}
                            value={item.Allocated_Cost || item.AllocatedCostsLineTotal}

                            type='number'
                            class='form-control'
                            onChange={e => {
                              valuechanger1(e, index)
                            }}
                            name='Allocated_Cost'
                          />
                        </div></TD>

                        <TD>{item.Whse_Price1 ? item.Whse_Price1 : item.Whse_Price ? item.Whse_Price : item.WarehousePrice} </TD>
                        <TD>{item.LineTotal1 ? item.LineTotal1 : item.LineTotal2 ? item.LineTotal2 : item.LineTotal}</TD>

                        <TD>{item.Total_Costs1 ? item.Total_Costs1 : item.Total_Costs ? item.Total_Costs : item.TotalCosts}</TD>
                        <TD>{item.Warehouse}</TD>
                        <TD>{item.ReleaseNumber}</TD>
                        <TD>{item.VariantCosts}</TD>
                        <TD></TD>
                        <TD></TD>
                        <TD>{item.FOBandIncludedCosts}</TD>
                        <TD> <div
                          style={{ width: '10.5rem', height: 'auto' }}
                          variant='primary'
                        >
                          <Select
                          menuPortalTarget={document.body}
                            defaultValue={item.Project}
                            options={PrProject} // Options to display in the dropdown
                            onChange={e => {
                              getdropdownvalue(e, 'Project')
                            }}
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        </div></TD>
                        <TD><div
                          style={{ width: '10.5rem', height: 'auto' }}
                          variant='primary'
                        >
                          <Select
                          menuPortalTarget={document.body}
                            defaultValue={item.DistributionRule}
                            // options={PrProject} // Options to display in the dropdown
                            onChange={e => {
                              getdropdownvalue(e, 'Vendor')
                            }}
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        </div></TD>
                        <TD>{item.InventoryUoM}</TD>

                      </tr>
                    )

                    )}
                  </tbody>
                </Table>
              )}
              {SearchItemLines && (
                <Table responsive striped bordered hover>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Item No.</th>
                      <th>Quantity</th>
                      <th>Base Doc. Price</th>
                      <th>Base Doc. Value</th>
                      <th>Proj. cust.</th>
                      <th>Customs value</th>
                      <th>Expenditure</th>
                      <th>Alloc.Costs Val.</th>
                      <th>Whse Price</th>
                      <th>Total</th>
                      <th>Total Costs</th>
                      <th>Whse</th>
                      <th>Release No.</th>
                      <th>Var. Costs</th>
                      <th>Const. Costs</th>
                      <th>Expected Customs</th>
                      <th>FOB and Included Costs</th>
                      <th>Project</th>
                      <th>Distr. Rule</th>
                      <th>UoM Code</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {SearchItemLines && SearchItemLines.map((item, index) => (
                      <tr key={`${index}`}>
                        <TD>{index + 1}
                        </TD>
                        <TD>
                          {item.VendorCode}
                        </TD>
                        <TD>{item.Quantity}</TD>
                        <TD>{item.BaseDocumentPrice}</TD>
                        <TD>{item.BaseDocumentValueLineTotal}</TD>

                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              defaultValue={item.ProjectedCustoms}
                              placeholder='PKR 0.00'
                              type='text'
                              class='form-control'
                              disabled={changer}
                              onChange={e => {
                                valuechanger2221(e, index)
                              }}
                              name='Projected_Customs'
                            />
                          </div>
                        </TD>
                        <TD>
                          <div style={{ width: '10.5rem' }}>
                            <input
                              Value={item.Customs_Value ? item.Customs_Value : item.CustomsValue}
                              placeholder='PKR 0.00'
                              type='number'
                              class='form-control'
                              onChange={e => {
                                valuechangerfunction1(e, index); valuechanger2221(e, index)
                              }}
                              name='Customs_Value'
                            />
                          </div></TD>
                        <TD><div style={{ width: '10.5rem' }}>
                          <input
                            defaultValue={item.Expenditure}
                            placeholder='PKR 0.00'
                            disabled={changer}
                            type='number'
                            class='form-control'
                            onChange={e => {
                              valuechanger1(e, index)
                            }}
                            name='Expenditure'
                          />
                        </div></TD>
                        <TD> <div style={{ width: '10.5rem' }}>
                          <input
                            placeholder={'PKR 0.00'}
                            value={item.Allocated_Cost || item.AllocatedCostsLineTotal}
                            disabled={changer}
                            type='number'
                            class='form-control'
                            onChange={e => {
                              valuechanger1(e, index)
                            }}
                            name='Allocated_Cost'
                          />
                        </div></TD>

                        <TD>{item.Whse_Price1 ? item.Whse_Price1 : item.Whse_Price ? item.Whse_Price : item.WarehousePrice} </TD>
                        <TD>{item.LineTotal1 ? item.LineTotal1 : item.LineTotal2 ? item.LineTotal2 : item.LineTotal}</TD>

                        <TD>{item.Total_Costs1 ? item.Total_Costs1 : item.Total_Costs ? item.Total_Costs : item.TotalCosts}</TD>
                        <TD>{item.Warehouse}</TD>
                        <TD>{item.ReleaseNumber}</TD>
                        <TD>{item.VariantCosts}</TD>
                        <TD></TD>
                        <TD></TD>
                        <TD>{item.FOBandIncludedCosts}</TD>
                        <TD> <div
                          style={{ width: '10.5rem', height: 'auto' }}
                          variant='primary'
                        >
                          <Select
                          menuPortalTarget={document.body}
                            isDisabled={changer}
                            defaultValue={item.Project}
                            options={PrProject} // Options to display in the dropdown
                            onChange={e => {
                              getdropdownvalue(e, 'Project')
                            }}
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        </div></TD>
                        <TD><div
                          style={{ width: '10.5rem', height: 'auto' }}
                          variant='primary'
                        >
                          <Select
                          menuPortalTarget={document.body}
                            isDisabled={changer}
                            defaultValue={item.DistributionRule}
                            // options={PrProject} // Options to display in the dropdown
                            onChange={e => {
                              getdropdownvalue(e, 'Vendor')
                            }}
                            displayValue='name' // Property name to display in the dropdown options
                          />
                        </div></TD>
                        <TD>{item.InventoryUoM}</TD>

                      </tr>
                    )

                    )}
                  </tbody>
                </Table>
              )}
              <CardGroup>
                <DIV3>
                  <Container fluid>

                    <div style={{ width: '23.5em', height: 'auto' }}>
                      <label>Projected Customs</label>
                      <input
                        readOnly
                        value={CustomValue || HeaderData && HeaderData.ProjectedCustoms}
                        type='text'
                        class='form-control'
                        placeholder=''

                        // onChange={e => {
                        //   valuechangefunction(e)
                        // }}
                        name='Projected_Customs'
                      />
                      {/* <Select
                placeholder='Select..'
                options={PrBuyer} // Options to display in the dropdown
                displayValue='name' // Property name to display in the dropdown options
              /> */}
                    </div>
                    <div style={{ width: '23.5rem', height: 'auto' }}>
                      <label>Actual Customs</label>
                      <input
                        defaultValue={CustomValue || HeaderData && HeaderData.ActualCustoms}
                        type='text'
                        class='form-control'
                        name={'Actual_Customs' || 'Customs_Value'}
                        placeholder=''
                        disabled={changer}
                      />
                    </div>
                    <div style={{ width: '23.5rem', height: 'auto' }}>
                      <label>Customs Date</label>
                      <input
                        type='date'
                        class='form-control'
                        disabled={changer}
                        defaultValue={HeaderData && HeaderData.ActualCustoms || currentDate}
                        onChange={e => {
                          valuechangefunction(e)
                        }}
                        name='Customs_Date'

                      />
                    </div>
                    <br />
                    <div>

                      <input
                        type='checkbox'
                        onChange={e => {
                          valuechangefunction(e)
                        }}
                        name='Customs_Affects_Inventory'
                        value='True'
                        disabled={changer}
                      />
                      <label style={{ paddingLeft: '8px' }}>Customs Affects Inventory</label>
                    </div>


                    <div class='form-group'>
                      <div style={{ width: '23.5rem', height: 'auto' }}>
                        <label for='exampleFormControlTextarea1'>Remarks</label>
                        <div style={{ width: '23.5rem' }}>
                          <textarea
                            defaultValue={
                              ARSelectedPRDocEntry && "Based on A/P Invoice  " + ARSelectedPRDocEntry.DocNum || LCSelectedPRDocEntry && "Based on Landed Costs " + LCSelectedPRDocEntry.BaseEntry || HeaderData && HeaderData.Remarks
                            }
                            type='text'
                            class='form-control rounded-0'
                            id='exampleFormControlTextarea1'
                            name='Comments'
                            rows='3'
                            onChange={e => {
                              valuechangefunction(e)
                            }}
                          /> </div>
                      </div>
                    </div>

                  </Container>
                </DIV3>
                <DIV4></DIV4>
                <DIV3>
                  <div>
                    <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
                      <label style={{ marginTop: '10%' }}>
                        Total Freight Charges </label>
                      {/* {PDNDocumentLines && ( */}
                      <input
                        readOnly
                        type='number'
                        defaultValue={AllocCostTotalValue || HeaderData && HeaderData.TotalFreightCharges}

                        onChange={e => {
                          valuechangefunction(e)
                        }}
                        name='Total_Freight_Charges'
                        // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                        class='form-control' />
                      {/* )} */}
                    </div>
                    {/* <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
                      <label>
                        Amount to Balance</label>
                      <input
                        readOnly
                        placeholder={'-' + AllocCostTotalValue}
                        onChange={e => {
                          valuechangefunction(e)
                        }}
                        name='Amount_To_Balance'
                        type='number'
                        value={HeaderData && HeaderData.AmountToBalance}
                        // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                        class='form-control' />
                    </div> */}
                    <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
                      <label>
                        Before Tax </label>
                      <input
                        readOnly
                        value={gettotalbeforetax || HeaderData && HeaderData.BeforeTax}

                        type='number'
                        onChange={e => {
                          valuechangefunction(e)
                        }}
                        name='Before_Tax'
                        // placeholder={PQFindDocumentLines && PQFindDocumentLines.DocumentsOwner}
                        class='form-control' />
                    </div>
                    <div style={{ marginLeft: '4rem' }}>
                      <label>Tax 1</label><label style={{ marginLeft: '10rem' }}>Tax 2</label>
                      <CardGroup>
                        <div style={{ width: '11.75rem' }}>
                          <input
                            type='number'

                            value={HeaderData && HeaderData.Tax1}
                            // value={discountpercent || SelectedPRDocEntry && SelectedPRDocEntry.DiscountPercent || HeaderData && HeaderData.DiscountPercent }
                            onChange={e => {
                              setgettax1(e.target.value)
                            }}
                            name='Tax_1'
                            class='form-control'

                            placeholder='PKR 0.00'

                          />
                        </div>

                        <div style={{ width: '11.75rem' }}>
                          <input
                            type='number'
                            value={HeaderData && HeaderData.Tax2}
                            onChange={e => {
                              setgettax2(e.target.value)
                            }}
                            name='Tax_2'
                            class='form-control'

                            placeholder='PKR 0.00'

                          // value={DiscountTotal||SelectedPRDocEntry && SelectedPRDocEntry.TotalDiscountSC || HeaderData && HeaderData.TotalDiscountSC }
                          />
                        </div>
                      </CardGroup>
                    </div>
                  </div>


                  {/* <div style={{width:'23.5rem'}}>
          <label>Freight</label>
          <input
            defualtValue={totalFreight}
            class='form-control'
          />
           </div>
          <br /> */}
                  <div style={{ width: '23.5rem', marginLeft: '4rem' }}>
                    <label>Total</label>
                    {/* {PDNDocumentLines && ( */}
                    <input
                      value={gettotalbeforetax + Number(gettax2) + Number(gettax1) || HeaderData && HeaderData.Total}
                      readOnly
                      type='number'
                      class='form-control'
                      name='Total'
                      placeholder='PKR 0.00'
                    />
                    {/* )} */}
                  </div>

                </DIV3>
              </CardGroup>
            </Tab>



            <Tab eventKey='Costs' title='Costs'>
              {/* <div class="btn-group"> */}
              <br />
              <button type="button" class="btn btn-primary" style={{ marginLeft: '10px' }} onClick={handleShowLa}> New Landed Cost</button>
              <button type="button" class="btn btn-secondary" style={{ marginLeft: '10px' }}>   Clear Table</button>
              {/* // </div> */}
              <br />
              <br />

              {SearchCostLines ? (<>
                <Table responsive>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Landed Costs</th>
                      <th>Allocation By</th>
                      <th>Amount</th>
                      <th>Factor</th>
                      <th>Include By Customs</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {SearchCostLines.map((item, index) => (
                      <tr
                        key={`${index}`}

                      >
                        <TD>
                          {index + 1}

                        </TD>
                        <TD>{item.LandedCostCode}</TD>
                        <TD> <div style={{ width: '17rem' }}>

                          <Select
                          menuPortalTarget={document.body}
                            isDisabled={changer}
                            placeholder={item.AllocationBy}
                          />
                        </div></TD>
                        <TD>
                          {/* {CostDocumentline && (  */}
                          <div>
                            <input
                              type='text'
                              disabled={changer}
                              defaultValue={item.Amount}
                              className='form-control'
                              placeholder={'PKR 0.00'}
                              name='Amount'
                              onChange={e => {
                                valuechangeamountfunction(e, index)
                              }}
                            // displayValue={CostDocumentline && CostDocumentline.Amount} // Property name to display in the dropdown options
                            />
                          </div>
                          {/* )} */}
                        </TD>
                        <TD><div>
                          <input
                            readOnly
                            type='text'
                            value={item.Factor}
                            placeholder={'0.00'}
                            name='CostFactor'
                            className='form-control'
                            displayValue='name' // Property name to display in the dropdown options
                          />

                        </div></TD>
                        <TD> <div>

                          <input
                            type='checkbox'
                            placeholder=''
                            name='Include_for_Customs'
                            onChange={e => {
                              checkboxValuechanger(e, index)
                            }}
                          />

                        </div></TD>
                      </tr>
                    ))}
                  </tbody>

                </Table>
              </>) : (<>
                {LaCost && (
                  <Table responsive>
                    <TableHead>
                      <tr>
                        <th>#</th>
                        <th>Landed Costs</th>
                        <th>Allocation By</th>
                        <th>Amount</th>
                        <th>Factor</th>
                        <th>Include By Customs</th>
                      </tr>
                    </TableHead>
                    <tbody>
                      {LaCost.map((item, index) => (
                        <tr
                          key={`${index}`}

                        >
                          <TD>
                            {index + 1}

                          </TD>
                          <TD>{item.Name}</TD>
                          <TD> <div style={{ width: '17rem' }}>

                            <Select
                          menuPortalTarget={document.body}
                              placeholder={item.AllocationBy === 'ab_CashValueBeforeCustoms' ? (
                                <p>
                                  Cash Value Before Customs
                                </p>
                              ) : item.AllocationBy === 'ab_CashValueAfterCustoms' ? (
                                <p >
                                  Cash Value After Customs
                                </p>
                              ) : item.AllocationBy === 'ab_Quantity' ? (
                                <p >
                                  Quantity
                                </p>
                              ) : item.AllocationBy === 'ab_Weight' ? (
                                <p >
                                  Weight
                                </p>
                              ) : item.AllocationBy === 'ab_Volume' ? (
                                <p >
                                  Volume
                                </p>) : null}
                              options={[{ value: "ab_CashValueBeforeCustoms", label: "Cash Value Before Customs" },
                              { value: "ab_CashValueAfterCustoms", label: "Cash Value After Customs" },
                              { value: "ab_Quantity", label: "Quantity" },
                              { value: "ab_Weight", label: "Weight" },
                              { value: "ab_Volume", label: "Volume" }]}// Options to display in the dropdown
                              onChange={e => { valuedropfunction(e, index, 'AllocationBy') }}
                              displayValue='name' // Property name to display in the dropdown options
                            //  onChange={()=>{getLabel(e)}}
                            />
                          </div></TD>
                          <TD>
                            {/* {CostDocumentline && (  */}
                            <div>
                              <input
                                type='text'
                                className='form-control'
                                placeholder={'PKR 0.00'}
                                name='Amount'
                                onChange={e => {
                                  valuechangeamountfunction(e, index)
                                }}
                              // displayValue={CostDocumentline && CostDocumentline.Amount} // Property name to display in the dropdown options
                              />
                            </div>
                            {/* )} */}
                          </TD>
                          <TD><div>
                            <input
                              readOnly
                              type='text'
                              value={item.CostFactor}
                              placeholder={'0.00'}
                              name='CostFactor'
                              className='form-control'
                              displayValue='name' // Property name to display in the dropdown options
                            />

                          </div></TD>
                          <TD> <div>

                            <input
                              type='checkbox'
                              placeholder=''
                              name='Include_for_Customs'
                            />

                          </div></TD>
                        </tr>
                      ))}
                    </tbody>

                  </Table>
                )}
              </>
              )}
            </Tab>
            <Tab eventKey='Vendors' title='Vendors'>
              <Table responsive>
                <TableHead>
                  <tr>
                    <th>#</th>
                    <th>Vendor</th>
                    <th>Name</th>

                  </tr>
                </TableHead>
                <tbody>
                  {/* {PrRe.map((item, index) => ( */}
                  <tr

                  >
                    <TD>
                      {/* {index + 1} */}

                    </TD>
                    <TD>  <div
                      style={{ height: 'auto' }}
                      variant='primary'
                    >
                      <Select
                          menuPortalTarget={document.body}
                        placeholder={SelectedVendor}
                        options={VendorCodeDropdown} // Options to display in the dropdown
                        onChange={e => {
                          getdropdownvalue(e, 'Vendor'); VendorChange(e); getvendorvaluefunction(e)
                        }}
                        displayValue='name' // Property name to display in the dropdown options
                      />
                    </div></TD>
                    <TD>{Vendorvalue}</TD>

                  </tr>
                  {/* ))} */}


                </tbody>

              </Table>

            </Tab>
            <Tab eventKey='Details' title='Details'>
              <Table responsive>
                <TableHead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Whse Price</th>
                    <th>Price List</th>
                    <th>Expenditure</th>

                  </tr>
                </TableHead>
                <tbody>
                  {PDNDocumentLines && PDNDocumentLines.map((item, index) => (
                    <tr key={`${index}`}>

                      <TD>
                        {index + 1}

                      </TD>
                      <TD>{item.ItemCode}</TD>
                      <TD></TD>
                      <TD>
                        <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
                          <Select
                          menuPortalTarget={document.body}
                            placeholder='Select'
                            options={getPriceListDropdown} // Options to display in the dropdown

                            onChange={e => {
                              getdropdownvalue(e, 'Type')
                            }}
                            // op

                            displayValue='name' // Property name to display in the dropdown options
                          />
                        </div>
                      </TD>
                      <TD> <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
                        <Select
                          menuPortalTarget={document.body}
                          placeholder='Select'
                          options={[
                            { value: "Yes", label: "Yes" },
                            { value: "No", label: "No" },
                          ]} // Options to display in the dropdown

                          onChange={e => {
                            getdropdownvalue(e, 'Type')
                          }}
                          // op

                          displayValue='name' // Property name to display in the dropdown options
                        />
                      </div>
                      </TD>

                    </tr>
                  ))}


                </tbody>

              </Table>
            </Tab>
            <Tab eventKey='General' title='General'>
              <br />
              <div style={{ width: '23rem', height: 'auto', marginLeft: '10px' }}>
                <label>Trans. No.</label>

                <input
                  type='text'
                  name='Trans_No'
                  class='form-control'
                  aria-describedby='Requesterid'
                // defaultValue={item.FreeText}
                // onChange={e => {
                //   ontextChanged(e, index)
                // }}
                />
              </div>

              <div style={{ width: '23rem', height: 'auto', marginLeft: '10px' }}>
                <label>Journal Remarks</label>

                <input

                  // placeholder='Landed Cost'
                  defaultValue='Landed Cost'
                  type='text'
                  name='Journal_Remarks'
                  class='form-control'
                  aria-describedby='Requesterid'
                // defaultValue={item.FreeText}
                // onChange={e => {
                //   ontextChanged(e, index)
                // }}
                />
              </div>
            </Tab>
            <Tab eventKey='Attachment' title='Attachment'>

              <Attachment />


            </Tab>
          </Tabs>

          {/* Bottom Side+++++++++ */}
          <Container>
            <br />
            <br />
            <br />
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

              <Button style={{ marginLeft: '5%' }}
                variant="secondary"
                onClick={() => {
                  window.location.href = "/Home"
                }}
              >Cancel</Button>
            </div>
          </Container>
        </ContextMenuTrigger>
        {cancelbutton ? <>
          <ContextMenu id="contextmenu">
            <MenuItem onClick={documentcancel}>
              <FcCancel className="Cancel" />
              <span>Cancel</span>
            </MenuItem>
            <MenuItem onClick={TransactionNumber}>
              <GrView className="JournalEntry" />
              <span>Journal Entry</span>
            </MenuItem>
            <MenuItem onClick={e => { window.location.href = "/Home" }}>
              <GrClose className="Close" />
              <span>Close</span>
            </MenuItem>
            <MenuItem onClick={e => { window.location.reload(false) }}>
              <IoReload className="Reload" />
              <span>Reload</span>
            </MenuItem>
          </ContextMenu>
        </>
          : null
        }
      </Form>
    </>
  )
}
