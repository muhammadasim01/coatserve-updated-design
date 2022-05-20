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
  Modal,
  CardGroup
} from 'react-bootstrap'
import './index.css'
import Select from 'react-select'
import {  Attachment} from '../../../Component/APDownPaymentRequest';
import { useAlert } from 'react-alert'
import { Logo, TextInput, Alert, Navbar } from '../../../Component/Global'
import { CONSTANTS, LINKS } from '../../../Utils'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
const axios = require('axios')

export default function InventoryGenEntries () {
  
  const [getmanageitems, setgetmanageitems] = React.useState()
  const [ItemsGroupDropDown, setItemsGroupDropDown] = React.useState()
  const [getindexing, setgetindexing] = React.useState(0)
  const [getPurchasingUoMName, setgetPurchasingUoMName] = React.useState()
  const [valuechacker, setvaluechacker]=React.useState()
  const [getnextitemcode, setgetnextitemcode]=React.useState()
  const [ButtonName, setButtonName] = React.useState('Add')
  const [HeaderData, setHeaderData] = React.useState()
  const [show3, setShow3] = React.useState(false)
  const [TaxCode, setTaxCode] = React.useState()
  const [SaleTaxCode, setSaleTaxCode] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [CountriesDropDown, setCountriesDropDown] = React.useState()
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [ShippingTypeDropDown, setShippingTypeDropDown] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [priceListDropDown, setPriceListDropDown] = React.useState()
  const [getinventoryUoMName, setgetinventoryUoMName] = React.useState()
  const [warehouseDropdown, setWarehouseDropdown] = React.useState()
  const [projectsDropDown, setProjectsDropdowon] = React.useState()
  const [CustomsGroupsDropdown, setCustomsGroupsDropdown] = React.useState()
  const [getitemsproperties, setgetitemsproperties] = React.useState()
  const [getcustomgrouprate, setgetcustomgrouprate] = React.useState()
  const [costingCodeDropDown, setCostingCodeDropDown] = React.useState()
  const [ContractTemplatesDropDown, setContractTemplatesDropDown] = React.useState()

  const [selectedItems, setSelectedItems] = React.useState()
  const [selectedPrice, setSelectedPrice] = React.useState({})
  const [ref2, setRef2] = React.useState('')
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState()
  const [UoMDropDown, setUoMDropDown] = React.useState()
  const [getUoMName, setgetUoMName] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState('0')
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [show1, setShow1] = React.useState(false)
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [getdocumenttype, setgetdocumenttype] = React.useState("59")
  const [getdocumentname, setgetdocumentname] = React.useState("IGN2");
  const [ModuleName, setModuleName] = React.useState("GoodsReceipt")
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getInventoryCyclesDropdown, setgetInventoryCyclesDropdown] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [getbatchnumbers, setgetbatchnumbers]=React.useState()
  const [gettaxrate, setgettaxrate]=React.useState()
  const [getsaletaxrate, setgetsaletaxrate]=React.useState()
  const [VendorCodeDropdown, setVendorCodeDropdown]=React.useState()
  const [getvaluechange, setgetvaluechange]=React.useState('Active')
  const [docDate, setDocDate] = React.useState('')
  const [getvaluationmethod, setgetvaluationmethod] = React.useState()
  const [ManufacturersDropDown, setManufacturersDropDown] = React.useState()
  const [remarks, setRemarks] = React.useState('')
  const [getitemsdata, setgetitemsdata] = React.useState({})
  const [UoMGroupDropDown, setUoMGroupDropDown] = React.useState()
  const [PackagesTypesDropDown, setPackagesTypesDropDown] = React.useState()


  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);
  const [checked5, setChecked5] = React.useState(false);
  const [checked6, setChecked6] = React.useState(false);
  const [checked7, setChecked7] = React.useState(false);
  const [checked8, setChecked8] = React.useState(false);
  const [checked9, setChecked9] = React.useState(false);

 
  const alert = useAlert()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

  React.useEffect(async () => {
    today()
    await setgetdocumentname("IGN2")
  await setModuleName("GoodsReceipt")
  await setgetdocumenttype("59")
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
      TableTaxCode(cook)
      getInventoryCycles(cook)
      UoMList(cook)
      TableTaxCode2(cook)
      CustomGroup(cook)
      getUoMGroupList(cook)
      BusinessPartners(cook)
      PackagesTypesList(cook)
      getContractTemplatesList(cook)
      getCountriesList(cook)
      getShippingTypesList(cook)
      getManufacturersList(cook)
      getItemsProperty(cook)
      getItemsGroupList(cook)
      getPriceList(cook)
      getProjects(cook)
      getwareHousesOfBranch(cook)
      getCostingCode(cook)
    }
  }, [])

  const handleClose3 = () => {
    setShow3(false)
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
  const PackagesTypesList = async cookie => {
    const api = `PackagesTypes`
    let resResult = null
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (Response) {
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
          value: element.Code,
          label: element.Name
        })
      })
      await setPackagesTypesDropDown(PriceListDropDown)
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

  const UoMList = async cookie => {
    const api = `UnitOfMeasurements?$select=Code,Name`
    let resResult = null
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (Response) {
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
          value: element.Code,
          label: element.Name
        })
      })
      await setUoMDropDown(PriceListDropDown)
    }
  }
  const getPriceList = async cookie => {
    const api = `PriceLists?$select=PriceListNo,PriceListName`
    let resResult = null
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (Response) {
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
      await setPriceListDropDown(PriceListDropDown)
    }
  }
  const getItemsList = async value => {
    let obj = 0
    if(value==='Manual'){

    }else{
    let cookie = await localStorage.getItem('cookie')
    const api = `Items?$select=ItemCode,ItemName,InventoryUOM,ItemWarehouseInfoCollection&$filter=startswith(ItemCode,'${value}') &$orderby=ItemCode desc &$top=1`
    let resResult = {}
    console.log(api)
    // -------------------------    Items API GET DATA     -----------
    await axios
      .post(API_TYPES.GET, { api: api, cookie: cookie })
      .then(function (res) {
        if (res) {
          obj = Number((res.data.value[0].ItemCode).replace(value,'')) + 1
          console.log("obj",obj.toString().length)
          if(obj.toString().length > 5){
            setgetnextitemcode(`${value}`+obj)
          }else if(obj.toString().length == 5){
            setgetnextitemcode(`${value}0`+obj)
          }else if(obj.toString().length == 4){
            setgetnextitemcode(`${value}00`+obj)
          }else if(obj.toString().length == 3){
            setgetnextitemcode(`${value}000`+obj)
          }else if(obj.toString().length == 2){
            setgetnextitemcode(`${value}0000`+obj)
          }else if(obj.toString().length == 1){
            setgetnextitemcode(`${value}00000`+obj)
          }
          // await setItemsDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    
  }
  }
  const getItemsGroupList = async cookie => {
    const api = `ItemGroups?$select=Number,GroupName `
    let resResult = {}
    console.log(api)
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
      console.log(res)
      let ItemsDropDown = []
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.Number,
          label: element.GroupName,
        })
      })
      await setItemsGroupDropDown(ItemsDropDown)
    }
  }
  const TableTaxCode = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActivePurchaseTax,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          console.log(res.data.value)
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name,
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
   const TableTaxCode2 = async (cookie, e) => {
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
              label: element.Name,
              item: element
            })
          })
          setSaleTaxCode(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const CustomGroup = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let SAPapi = `CustomsGroups`
    await axios
      .post(API_TYPES.GET, {
        api:SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          console.log(res.data.value)
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name,
              item: element
            })
          })
          setCustomsGroupsDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getInventoryCycles = async (cookie) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let SAPapi = `InventoryCycles`
    await axios
      .post(API_TYPES.GET, {
        api:SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CycleCode,
              label: element.CycleName
            })
          })
          setgetInventoryCyclesDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getContractTemplatesList = async cookie => {
    const api = `ContractTemplates`
    let resResult = {}
    console.log(api)
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
      console.log(res)
      let ItemsDropDown = []
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.TemplateName,
          label: element.TemplateName,
        })
      })
      await setContractTemplatesDropDown(ItemsDropDown)
    }
  }
  const getShippingTypesList = async cookie => {
    const api = `ShippingTypes?$select=Code,Name`
    let resResult = {}
    console.log(api)
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
      console.log(res)
      let ItemsDropDown = []
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.Code,
          label: element.Name,
        })
      })
      await setShippingTypeDropDown(ItemsDropDown)
    }
  }
  const getCountriesList = async cookie => {
    const api = `Countries?$select=Code,Name`
    let resResult = {}
    console.log(api)
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
      console.log(res)
      let ItemsDropDown = []
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.Code,
          label: element.Name,
        })
      })
      await setCountriesDropDown(ItemsDropDown)
    }
  }
  const BusinessPartners = async (cook) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    let SAPapi =LINKS.sap.MasterData.ActiveVendor

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
  const getUoMGroupList = async cookie => {
    const api = `UnitOfMeasurementGroups?$select=Code,Name`
    let resResult = {}
    console.log(api)
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
      console.log(res)
      let ItemsDropDown = []
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.BaseUoM,
          label: element.Name,
        })
      })
      await setUoMGroupDropDown(ItemsDropDown)
    }
  }
  const getManufacturersList = async cookie => {
    const api = `Manufacturers`
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
      console.log(res)
      let ItemsDropDown = []
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.Code,
          label: element.ManufacturerName,
        })
      })
      await setManufacturersDropDown(ItemsDropDown)
    }
  }
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
  const getItemsProperty = async cookie => {
    const api = `ItemProperties`
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
      console.log(res)
      setgetitemsproperties(res)
    }
  }
  const getwareHousesOfBranch = async (cook) => {
    const api = `Warehouses`
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
      console.log(res)
      setWarehouseDropdown(res)
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
          api: `InventoryGenEntries(${id})`,
          cookie: cook
        })
        .then(function (res) {
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
  const submitPatch = async () => {
    let body = {
      Comments: remarks,
      AttachmentEntry:attachmentresponse
    }
    Patch(HeaderData.DocNum, body)
  }
  //   ===========================================================================================================
  const submit = async () => {
    console.log("getitemsdata",getitemsdata)
    let docLines = []
    let  body = {
       //---------------Header Data-------------------------
      "ItemCode": getnextitemcode,
      "ItemName": getitemsdata.Description,
      "ItemType":getitemsdata.ItemType,
      "Series": getseriesvalue,
      "ForeignName": getitemsdata.ForeignName,
      "ItemsGroupCode": getitemsdata.ItemGroup,
      "UoMGroupEntry": getitemsdata.UoMGroup,
      "PurchaseItem": checked3===true ? "tYES" : "tNO" ,
      "SalesItem": checked2===true ? "tYES" : "tNO" ,
      "InventoryItem": checked===true ? "tYES" : "tNO" ,
  //-------------------UDF----------------------
      "U_Secndry_UOM": getitemsdata.U_Secndry_UOM,
      "U_BP_Nm": getitemsdata.U_BP_Nm,
      "U_Sb_grp": getitemsdata.U_Sb_grp,
      "U_FG_Grp": getitemsdata.U_FG_Grp,
      "U_PRTInk": getitemsdata.U_PRTInk,
 //---------------General Tab-------------------------
      "Manufacturer": getitemsdata.Manufacturer,
      "VatLiable":  checked4===true ? "tYES" : "tNO" ,
      "NoDiscounts":  checked5===true ? "tYES" : "tNO" ,
      "SWW":getitemsdata.AdditionalIdentifier,
      "ShipType":getitemsdata.ShipingType,
      "ManageSerialNumbers": getmanageitems==='SerialNumbers' ? "tYES" : "tNO",
      "ManageBatchNumbers": getmanageitems==='Batches' ? "tYES" : "tNO",
      "SRIAndBatchManageMethod": getitemsdata.ManagementMethod,
      "WarrantyTemplate": getitemsdata.WarrantyTemplate,
      "Valid": getvaluechange==='Active' ? "tYES" : "tNO",
      "ValidFrom": getitemsdata.ValidFrom,
      "ValidTo":getitemsdata.ValidTo,
      "ValidRemarks": getitemsdata.ValidRemarks,
      "Frozen": getvaluechange==='Inactive' ? "tYES" : "tNO", 
      "FrozenFrom":getitemsdata.FrozenFrom,
      "FrozenTo": getitemsdata.FrozenTo,
      "FrozenRemarks": getitemsdata.FrozenRemarks,
      "ItemCountryOrg": getitemsdata.Country,

       //----------------Purchasing Data------------------------
      "Mainsupplier": getitemsdata.PreferredVendor,
      "SupplierCatalogNo": getitemsdata.MfrCatalogNo,
      "PurchaseItemsPerUnit": getitemsdata.ItemPerPurchasingUnit,
      "PurchaseVATGroup":getitemsdata.TaxGroup,
      "PurchaseUnit": getPurchasingUoMName,
      "PurchasePackagingUnit": getitemsdata.PackageType,
      "PurchaseQtyPerPackUnit": getitemsdata.QuantityPerPackege,
      "PurchaseUnitLength": getitemsdata.PLength,
      "PurchaseUnitWidth":getitemsdata.PWidth,
      "PurchaseUnitHeight": getitemsdata.PHeight,
      "PurchaseVolumeUnit": getitemsdata.PVolume,
      "PurchaseUnitWeight": getitemsdata.PWeight,
      "PurchaseFactor1": getitemsdata.PFactor1,
      "PurchaseFactor2": getitemsdata.PFactor2,
      "PurchaseFactor3": getitemsdata.PFactor3,
      "PurchaseFactor4": getitemsdata.PFactor4,

    //----------------Sales Data-----------------------
       
      "SalesVATGroup": getitemsdata.SalesTaxGroup,
      "SalesUnit": getUoMName,
      "SalesItemsPerUnit": getitemsdata.ItemperSalesUnit,
      "SalesQtyPerPackUnit": getitemsdata.SaleQuantityPerPackege,
      "SalesUnitLength":getitemsdata.SaleLength,
      "SalesUnitWidth":getitemsdata.SaleWidth,
      "SalesUnitHeight":getitemsdata.SaleHeight,
      "SalesUnitVolume":getitemsdata.SaleVolume,
      "SalesUnitWeight":getitemsdata.SaleWeight,
      "SalesFactor1":getitemsdata.SFactor1,
      "SalesFactor2":getitemsdata.SFactor2,
      "SalesFactor3":getitemsdata.SFactor3,
      "SalesFactor4":getitemsdata.SFactor4,

 //-------------------Production Data--------------------
      "IssueMethod": getitemsdata.IssueMethod,
      "IsPhantom": checked7===true ? "tYES" : "tNO" ,
      "ProdStdCost": getitemsdata.ProductionStdCost,
      "InCostRollup":checked8===true ? "tYES" : "tNO" ,
 //--------------------inventory--------------------------
      "DesiredInventory":getitemsdata.DesiredInventory,
      "InventoryUOM": getinventoryUoMName,
      "GLMethod": getitemsdata.GLAccount,
      "MinInventory":getitemsdata.Minimum,
      "MaxInventory": getitemsdata.Maximum,
      "ManageStockByWarehouse": checked6===true ? "tYES" : "tNO",
      "InventoryWeight": getitemsdata.InventoryWeight,
      "CostAccountingMethod":getitemsdata.ValuationMethod,

 //----------------------planning data------------------
      "PlanningSystem": getitemsdata.PlanningMethod,
      "ProcurementMethod": getitemsdata.ProcurementMethod,
      "ComponentWarehouse": getitemsdata.ComponentWarehouse,
      "OrderIntervals":getitemsdata.OrderInterval,
      "OrderMultiple": getitemsdata.OrderMultiple,
      "MinOrderQuantity":getitemsdata.MinimumOrderQty,
      "LeadTime": getitemsdata.LeadTime,
      "ToleranceDays": getitemsdata.ToleranceDays,
      //----------------Remarks----------------
      "User_Text":getitemsdata.MainRemarks,
  }
  console.log("body",body)
   
    PostContent(body)
  }
  const PostContent = async body => {
    let cook = await localStorage.getItem('cookie')
    let api = `Items`
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: api,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.ItemCode) {
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
  const SearchAll_Filter_Data = async () => {
    if (SearchNumber === '0') {
      SearchPRNumberAll()
    } else {
      SearchPRNumberFilter()
    }
  }
  const SearchPRNumberAll = async () => {
    //let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `InventoryGenEntries`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setModalHeaderData(res.data.value)
        if (ModalHeaderData !== '') {
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
    let sapAPi = `InventoryGenEntries?$filter=DocNum eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        localStorage.setItem('getDocEntry',res.data.value[0].DocEntry);
        setHeaderData(res.data.value[0])
        setPQDocumentLines(res.data.value[0].DocumentLines)
        if (HeaderData !== '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const selectPR = async item => {
    localStorage.setItem('getDocEntry',item.DocEntry);
    setShow1(false)
    setSelectedPRDocEntry(item)
    setPQDocumentLines(item.DocumentLines)
  }
  const getvaluefromapi = async e => {
    let obj = getitemsdata
    obj[e.target.name] = e.target.value
    setgetitemsdata(obj)
  }
  const getdropdownvalue = async (e,name) => {
    let obj = getitemsdata
    obj[name] = e.value
    setgetitemsdata(obj)
  }
   const getseriesvaluefunction = async (e) =>{
    setgetseriesvalue(e.value)
    setgetnextnumber(e.item.NextNumber)
  }

  return (
    <>
      <Navbar 
      setgetserviceseries={setgetserviceseries}
      getdocumentname={getdocumentname}
      getdocumenttype={getdocumenttype}
      ModuleName={ModuleName}
      />
      <h1 style={{ textAlign: 'center' }}>Items Master Data</h1>
      <CardGroup>
        <DIV3>
          <Container fluid>
            <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Item No.</label>
            <CardGroup>
              <br/>
              <div style={{ width: '7rem', height: 'auto' }} >
                <Select
                  // placeholder={HeaderData && HeaderData.RequesterName}
                  options={[{label:'Item',value:'I'},{label:'Manual',value:'M'},{label:'Service',value:'S'}
                 ]} // Options to display in the dropdown
                  onChange={e=>{getItemsList(e.value)
                    setgetseriesvalue(e.item)}} // Function will trigger on select event
                  // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '16.5rem', height: 'auto'  }}>
              <input
                onChange={e => {
                  setgetnextitemcode(e.target.value)
                }}
                defaultValue={getnextitemcode}
                name='Code'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
             </CardGroup>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Description</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='Description'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Foreign Name</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='ForeignName'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Item Type</label>
              <Select
                onChange={e => {
                  getdropdownvalue(e , 'ItemType')
                }}
                options={[{label:'Items',value:'itItems'},{label:'Labor',value:'Labor'},{label:'Travel',value:'Travel'}]}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Item Group</label>
              <Select
                onChange={e => {
                  getdropdownvalue(e,'ItemGroup')
                }}
                options={ItemsGroupDropDown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>UoM Group</label>
              <Select
                 onChange={e => {
                  getdropdownvalue(e,'UoMGroup')
                }}
                options={UoMGroupDropDown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Price List</label>
              <Select
               onChange={e => {
                getdropdownvalue(e,'PriceList')
              }}
                options={priceListDropDown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Unit Price</label>
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
                <Select
                  // placeholder={HeaderData && HeaderData.RequesterName}
                  options={[{label:'Primary Currency',value:'PrimaryCurrency'},{label:'Additional Currency 1',value:'Currency1'},{label:'Additional Currency 2',value:'Currency2'}]}
                  onChange={e => {
                    getdropdownvalue(e,'UnitPriceD')
                  }} // Function will trigger on select event
                  // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='number'
                  name='UnitPrice'
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  placeholder=''
                  class='form-control'
                /> <br/>
              </div>
             </CardGroup>
            </div>
            <br />
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV3>
          <Container> 
            <div style={{marginLeft:'3rem'}}>
            {/* <CardGroup> */}
              <br/>
              <div  class="form-check form-check-inline" style={{marginTop:'0.5rem'}}>
                <input class="form-check-input"  checked={checked} onChange={e=>{setChecked(!checked)}} name='InventoryItem'  type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Inventory Item</label>
              </div><br/>
              <div  class="form-check form-check-inline" style={{marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='SalesItem' checked={checked2} onChange={e=>{setChecked2(!checked2)}} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Sales Item</label>
              </div><br/>
              <div  class="form-check form-check-inline" style={{marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='PurchasingItem' checked={checked3} onChange={e=>{setChecked3(!checked3)}} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Purchasing Item</label>
              </div><br/>
             {/* </CardGroup> */}
             </div>
          {/* <div className="gen"
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' ,border:'1px solid',borderColor:'lightgray',borderRadius:'4px'}}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon21" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
              <input
                name={'SearchPRNumber'}
                type='Number'
                placeholder='Number'
                class='form-control21'
                onChange={e => {
                  setSearchNumber(e.target.value)
                }}
              />
              <br />
            </div> */}
            <br/>
            <Modal show={show1} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>Open Goods Receipt List</Modal.Title>
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
                        <th>Creation Date</th>
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
                          <TD>{item.CreationDate}</TD>
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
      </CardGroup>
      <Tabs
        defaultActiveKey='General'
        transition={false}
        id='noanim-tab-example'
      >

        <Tab eventKey='General' title='General'>
        <CardGroup>
        <DIV3>
          <Container fluid>
            <div style={{ marginTop:'2.5rem',width: '23.5rem', height: 'auto' }}>
            <CardGroup>
              <br/>
              <div  class="form-check form-check-inline" style={{marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='N' checked={checked4} onChange={e=>{setChecked4(!checked4)}}  type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Withholding Tax Liable</label>
              </div><br/>
              <div  class="form-check form-check-inline" style={{marginTop:'1rem',marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='N' checked={checked5} onChange={e=>{setChecked5(!checked5)}} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Do Not Apply Discount Groups</label>
              </div><br/>
             </CardGroup>
            </div>
            <div style={{marginTop:'2rem', width: '23.5rem', height: 'auto' }}>
              <label>Manufacturer</label>
              <Select
               onChange={e => {
                getdropdownvalue(e,'Manufacturer')
              }}
                options={ManufacturersDropDown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Additional Identifier</label>
              <input
                 onChange={e => {
                  getvaluefromapi(e)
                }}
                name='AdditionalIdentifier'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Shiping Type</label>
              <Select
               onChange={e => {
                getdropdownvalue(e,'ShipingType')
              }}
                options={ShippingTypeDropDown}
              />
            </div>
            <label><u>Serial and Batch Number</u></label><br/>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Manage Item by</label>
              <Select
                onChange={e => {
                  getdropdownvalue(e,'ManageItemby')
                  setgetmanageitems(e.value)
                }}
                options={[{label:'None',value:'None'},{label:'Serial Numbers',value:'SerialNumbers'},{label:'Batches',value:'Batches'}]}
                />
            </div>
          {getmanageitems==='Batches' ? (
            <>
             <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Management Method</label>
              <Select
               onChange={e => {
                getdropdownvalue(e,'ManagementMethod')
              }}
                options={[{label:'On Every Transaction',value:'bomm_OnEveryTransaction'},{label:'On Release Only',value:'bomm_OnReleaseOnly'}]}
              />
            </div>
            <div  class="form-check form-check-inline" style={{marginTop:'1rem',marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='N'  type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Block Multiple Receipts for Same Batch</label>
              </div><br/>
            </>
          ):null}
            {getmanageitems==='SerialNumbers'? (
            <>
             <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Management Method</label>
              <Select
              onChange={e => {
                getdropdownvalue(e,'ManagementMethod')
              }}
                options={[{label:'On Every Transaction',value:'bomm_OnEveryTransaction'},{label:'On Release Only',value:'bomm_OnReleaseOnly'}]}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
               <label><u>Service Attributes</u></label><br/>
              <label>Warranty Template</label>
              <Select
              onChange={e => {
                getdropdownvalue(e,'WarrantyTemplate')
              }}
                options={ContractTemplatesDropDown}
                />
            </div>
            </>
          ):null}
          </Container>
        </DIV3>
        <DIV4>

          
        <div style={{marginTop:'5.5rem', width: '23.5rem', height: 'auto' }}>
            <CardGroup>
              <br/>
              <div  class="form-check form-check-inline" style={{marginTop:'0.5rem',marginRight:'15rem'}}>
                <input class="form-check-input"  name='Active' checked={getvaluechange==='Active'} onClick={e=>setgetvaluechange(e.target.name)} type="radio" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Active</label>
              </div>
              {getvaluechange==='Active'?
              <>
              <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>From</label> <label style={{ marginLeft: '9rem' }}>To</label> 
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
              <input

              //  defaultValue={currentDate}
                  type='date'
                  name='ValidFrom' 
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  placeholder=''
                  class='form-control'
                /> 
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  // defaultValue={currentDate}
                  type='date'
                  name='ValidTo'
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  class='form-control'
                />
              </div>
             </CardGroup>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Remarks</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='ValidRemarks'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            </>
            :null}
             
              <div  class="form-check form-check-inline" style={{marginTop:'1rem',marginTop:'0.5rem',marginRight:'15rem'}}>
                <input class="form-check-input"  name='Inactive' checked={getvaluechange==='Inactive'} onClick={e=>setgetvaluechange(e.target.name)}  type="radio" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Inactive</label>
              </div>
              {getvaluechange==='Inactive'?
              <>
              <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>From</label> <label style={{ marginLeft: '9rem' }}>To</label> 
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
              <input
                  type='date'
                  name='FrozenFrom' 
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  placeholder=''
                  class='form-control'
                /> 
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='date'
                  name='FrozenTo'
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  class='form-control'
                />
              </div>
             </CardGroup>
            </div><br/>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Remarks</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='FrozenRemarks'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            </>
            :null}
              <div  class="form-check form-check-inline" style={{marginTop:'1rem',marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='Advance' checked={getvaluechange==='Advance'} onClick={e=>setgetvaluechange(e.target.name)}  type="radio" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Advanced</label>
              </div>
              {getvaluechange==='Advance'?
              <>
             
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Active Range</label><br/>
            <label>From</label> <label style={{ marginLeft: '9rem' }}>To</label> 
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
              <input
                  type='date'
                  name='From' 
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  class='form-control'
                /> 
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='date'
                  name='To' 
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  class='form-control'
                />
              </div>
             </CardGroup>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Remarks</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='Remarks'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div><br/> 
              <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Inactive Range</label><br/>
            <label>From</label> <label style={{ marginLeft: '9rem' }}>To</label> 
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
              <input
                  type='date'
                  name='From' 
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  class='form-control'
                /> 
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='date'
                  name='To' 
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  class='form-control'
                />
              </div>
             </CardGroup>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Remarks</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='Remarks'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div><br/> 
            </>
            :null}
            </CardGroup>
            </div>
        </DIV4>
        <DIV3 style={{ marginTop: '9.5rem'}}>
          <Container fluid>
            <div style={{marginTop:'2rem', width: '23.5rem', height: 'auto' }}>
              <label>Country/Region of Origin</label>
              <Select
               onChange={e => {
                getdropdownvalue(e,'Country')
              }}
                options={CountriesDropDown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Standard Item Identification</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='StandardItemIdentification'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Commodity Classification</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='CommodityClassification'
                type='text'
                placeholder=''
                class='form-control'
              />
              </div>
          </Container>

        </DIV3>
        </CardGroup>
        </Tab>
        <Tab eventKey="PurchasingData" title="Purchasing Data">
        <CardGroup>
        <DIV3>
          <Container fluid>
            <div style={{marginTop:'2rem', width: '23.5rem', height: 'auto' }}>
              <label>Preferred Vendor</label>
              <Select
               onChange={e => {
                getdropdownvalue(e,'PreferredVendor')
              }}
                options={VendorCodeDropdown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Mfr Catalog No.</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='MfrCatalogNo'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Purchasing UoM Code</label>
              <Select
                  options={UoMDropDown}
                  onChange={e=>{setgetPurchasingUoMName(e.label)
                    getdropdownvalue(e,'PurchasingUoMCode')}}
                  placeholder=''
                /> 
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Purchasing UoM Name</label>
              <input
                value={getPurchasingUoMName}
                name='PurchasingUoMName'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Item per Purchasing Unit</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='ItemPerPurchasingUnit'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Package Type</label>
              <Select
                  options={PackagesTypesDropDown}
                  onChange={e=>{
                    getdropdownvalue(e,'PackageType')}}
                  placeholder=''
                /> 
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Quantity per Packege</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='QuantityPerPackege'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
          </Container>
        </DIV3>
        <DIV4>
            
           <div style={{ marginTop:'2rem',width: '23.5rem', height: 'auto' }}>
            <label>Customs Group</label>
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
              <Select
                  options={CustomsGroupsDropdown}
                  onChange={e=>{setgetcustomgrouprate(e.item.Total)
                    getdropdownvalue(e,'CustomsGroup')
                  }}
                  placeholder=''
                /> 
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='number'
                  name='CustomsGroupTotal'
                  readOnly
                  value={getcustomgrouprate}
                  placeholder='%'
                  class='form-control'
                />
              </div>
             </CardGroup>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Tax Group</label>
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
              <Select
                  options={TaxCode}
                  onChange={e=>{setgettaxrate(e.item.VatGroups_Lines[0].Rate)
                    getdropdownvalue(e,'TaxGroup')}}
                  placeholder=''
                /> 
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='number'
                  name='UnitPrice'
                  value={gettaxrate}
                  placeholder='%'
                  class='form-control'
                />
              </div>
             </CardGroup>
            </div>
        </DIV4>
        <DIV3 style={{ marginTop: '2rem'}}>
          <Container fluid>
          <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Length</label>
              <input
              onChange={e => {
                getvaluefromapi(e)
              }}
                name='PLength'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Width</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='PWidth'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Height</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='PHeight'
                type='number'
                placeholder=''
                class='form-control'
              />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Volume</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='PVolume'
                type='number'
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Weight</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='PWeight'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>

            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Factor 1</label>
              <input
              onChange={e => {
                getvaluefromapi(e)
              }}
                name='PFactor1'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Factor 2</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='PFactor2'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Factor 3</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='PFactor3'
                type='number'
                placeholder=''
                class='form-control'
              />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Factor 4</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='PFactor4'
                type='number'
                class='form-control'
              />
            </div>
           
          </Container>

        </DIV3>
        </CardGroup>
      </Tab>
      <Tab eventKey="SalesData" title="Sales Data">
      <CardGroup>
        <DIV3>
          <Container fluid>
          <div style={{ marginTop:'2rem', width: '23.5rem', height: 'auto' }}>
            <label>Tax Group</label>
            <CardGroup>
              <br/>
              <div style={{ width: '11.5rem', height: 'auto' }} >
              <Select
                  options={SaleTaxCode}
                  onChange={e=>{setgetsaletaxrate(e.item.VatGroups_Lines[0].Rate)
                    getdropdownvalue(e,'SalesTaxGroup')}}
                  placeholder=''
                /> 
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='number'
                  name='UnitPrice'
                  value={getsaletaxrate}
                  placeholder='%'
                  class='form-control'
                />
              </div>
             </CardGroup>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Sales UoM Code</label>
              <Select
                  options={UoMDropDown}
                  onChange={e=>{setgetUoMName(e.label)
                    getdropdownvalue(e,'SalesUoMCode')}}
                  placeholder=''
                /> 
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Sales UoM Name</label>
              <input
             value={getUoMName}
                name='AdditionalIdentifier'
                type='text'
                readOnly
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Item per Sales Unit</label>
              <input
                onChange={e => {
                  // getbatchnumberdata(e[0].item)
                  getvaluefromapi(e)
                }}
                name='ItemperSalesUnit'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Package Type</label>
              <Select
                  options={PackagesTypesDropDown}
                  onChange={e=>{
                    getdropdownvalue(e,'SalePackagesType')
                  }}
                  placeholder=''
                /> 
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Quantity per Packege</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='SaleQuantityPerPackege'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
          </Container>
        </DIV3>
        <DIV4>
         </DIV4>
        <DIV3 style={{ marginTop: '2rem'}}>
          <Container fluid>
          <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Length</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='SaleLength'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Width</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='SaleWidth'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Height</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='SaleHeight'
                type='number'
                placeholder=''
                class='form-control'
              />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Volume</label>
              <input
                onChange={e => {
                  // getbatchnumberdata(e[0].item)
                  getvaluefromapi(e)
                }}
                name='SaleVolume'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Weight</label>
              <input
                onChange={e => {
                  // getbatchnumberdata(e[0].item)
                  getvaluefromapi(e)
                }}
                name='SaleWeight'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Factor 1</label>
              <input
              onChange={e => {
                getvaluefromapi(e)
              }}
                name='SFactor1'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Factor 2</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='SFactor2'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Factor 3</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='SFactor3'
                type='number'
                placeholder=''
                class='form-control'
              />
              </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Factor 4</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='SFactor4'
                type='number'
                class='form-control'
              />
            </div>
          
            <div style={{marginTop:'4rem', width: '23.5rem', height: 'auto' }}>
              <label>Create QR Code From</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='CreateQRCode'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
          </Container>

        </DIV3>
        </CardGroup>
      </Tab>
      <Tab eventKey="InventoryData" title="Inventory Data">
      <CardGroup>
        <DIV3>
          <Container fluid>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Set G/L Accounts By</label>
              <Select
                onChange={e => {
                  getdropdownvalue(e,'GLAccount')
                }}
                options={[{label:'Warehouse',value:'glm_WH'},{label:'Item Group',value:'glm_ItemClass'},{label:'Item Level',value:'glm_ItemLevel'},]}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>UoM Name</label>
              <Select
                  options={UoMDropDown}
                  onChange={e=>{setgetinventoryUoMName(e.label)
                    getdropdownvalue(e,'UoMCode')}}
                  placeholder=''
                /> 
                </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Weight</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='InventoryWeight'
                type='text'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Valuation Method</label>
              <Select
               onChange={e => {
                getdropdownvalue(e,'ValuationMethod')
                setgetvaluationmethod(e.value)
              }}
                options={[{label:'Moving Average',value:'bis_MovingAverage'},{label:'Standard',value:'bis_Standard'},{label:'FIFO',value:'bis_FIFO'},{label:'Serial/Batch',value:'bis_Serial/Batch'},]}
              />
            </div>
            {getvaluationmethod==='bis_Standard' || getvaluationmethod==='bis_MovingAverage' ? 
            (<>
             <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Item Cost</label>
              <input
               onChange={e => {
                getvaluefromapi(e)
              }}
              name='ItemCost'
              type='number'
              readOnly
              class='form-control'
              />
            </div><br/>
            </>
            ):null }
          </Container>
        </DIV3>
        <DIV4>
         </DIV4>
        <DIV3 style={{ marginTop: '2rem'}}>
          <Container fluid>
          <div style={{ width: '23.5rem', height: 'auto' }}>
          <div  class="form-check form-check-inline" style={{marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='N' checked={checked6} onChange={e=>{setChecked6(!checked6)}} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Manage Inventory by Warehouse</label>
              </div><br/>
          <label><u>Inventory Level</u></label><br/>
              <label>Required (Purchasing UoM)</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='DesiredInventory'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Minimum</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='Minimum'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Maximum</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='Maximum'
                type='number'
                class='form-control'
              />
              </div>
          </Container>

        </DIV3>
        </CardGroup>
        <Table responsive striped bordered hover>
                <TableHead>
                <tr>
                  <th>#</th>
                  <th>Whse Code</th>
                  <th>Whse Name</th>
                  <th>Locked</th>
                  <th>In Stock</th>
                  <th>Committed</th>
                  <th>Ordered</th>
                  <th>Available</th>
                </tr>
                </TableHead>
                <tbody>
                  {warehouseDropdown&&warehouseDropdown.map((item, index) => (
            
                        <tr key={`${index}`}>
                          <TD>{index + 1}</TD>
                          <TD>{item.WarehouseCode}
                    </TD>
                   <TD>{item.WarehouseName}</TD>
                    <TD>
                <input
                  type='checkbox'
                  name='WhsCode'
                  // onChange={e => {
                  //   getvaluefrombatchtable(e, index)
                  // }}
                />
                    </TD>
                    <TD> </TD>
                    <TD> </TD>
              <TD> </TD>
              <TD> </TD>
            
                        </tr>
                  ))}
                </tbody>
              </Table>
      </Tab>
      <Tab eventKey="Planning Data" title="Planning Data">
      <CardGroup>
        <DIV3>
          <Container fluid>
            <div style={{marginTop:'2rem', width: '23.5rem', height: 'auto' }}>
              <label>Planning Method</label>
              <Select
              
             onChange={e=>{
              getdropdownvalue(e,'PlanningMethod')
            }}
                options={[{label:'None',value:'bop_None'},{label:'MRP',value:'bop_MRP'}]}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Procurement Method</label>
              <Select
              onChange={e=>{
                getdropdownvalue(e,'ProcurementMethod')
              }}
                options={[{label:'Buy',value:'bom_Buy'},{label:'Make',value:'bom_Make'}]}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Component Warehouse</label>
              <Select
                onChange={e=>{
                  getdropdownvalue(e,'ComponentWarehouse')
                }}
                options={[{label:'From Bill of Materials Line',value:'bomcw_BOM'},{label:'From Parent Item Document Line',value:'bomcw_PID'}]}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Order Interval</label>
              <Select
                onChange={e=>{
                  getdropdownvalue(e,'OrderInterval')
                }}
                options={getInventoryCyclesDropdown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Order Multiple</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='OrderMultiple'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Minimum Order Qty</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='MinimumOrderQty'
                type='number'
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Lead Time</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='LeadTime'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Tolerance Days</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='ToleranceDays'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
          </Container>
        </DIV3>
         </CardGroup>
      </Tab>
      <Tab eventKey="Production Data" title="Production Data">
      <CardGroup>
        <DIV3>
          <Container fluid>
            <div style={{ marginTop:'2.5rem',width: '23.5rem', height: 'auto' }}>
            <CardGroup>
              <br/>
              <div  class="form-check form-check-inline" style={{marginTop:'1rem',marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='N' checked={checked7} onChange={e=>{setChecked7(!checked7)}}  type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Phantom Item</label>
              </div><br/>
             </CardGroup>
            </div>
            <div style={{marginTop:'1rem', width: '23.5rem', height: 'auto' }}>
              <label>Issue Method</label>
              <Select
                onChange={e=>{
                  getdropdownvalue(e,'IssueMethod')
                }}
                options={[{label:'Backflush',value:'im_Backflush'},{label:'Manual',value:'im_Manual'}]}
              />
            </div>
            <div style={{marginTop:'6rem', width: '23.5rem', height: 'auto' }}>
              <label>BOM Type</label>
              <input
                onChange={e => {
                  // getbatchnumberdata(e[0].item)
                  getvaluefromapi(e)
                }}
                name='AdditionalIdentifier'
                type='text'
                readOnly
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>No. of Items Components</label>
              <input
                onChange={e => {
                  // getbatchnumberdata(e[0].item)
                  getvaluefromapi(e)
                }}
                name='AdditionalIdentifier'
                type='text'
                readOnly
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>No. of Items Resource Components</label>
              <input
                onChange={e => {
                  // getbatchnumberdata(e[0].item)
                  getvaluefromapi(e)
                }}
                name='AdditionalIdentifier'
                type='text'
                readOnly
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>No. of Route Stage</label>
              <input
                onChange={e => {
                  // getbatchnumberdata(e[0].item)
                  getvaluefromapi(e)
                }}
                name='AdditionalIdentifier'
                type='text'
                readOnly
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Production Std Cost</label>
              <input
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='ProductionStdCost'
                type='number'
                placeholder=''
                class='form-control'
              />
            </div>
            <div style={{ marginTop:'2.5rem',width: '23.5rem', height: 'auto' }}>
            <CardGroup>
              <br/>
              <div  class="form-check form-check-inline" style={{marginTop:'1rem',marginTop:'0.5rem'}}>
                <input class="form-check-input"  name='N' checked={checked8} onChange={e=>{setChecked8(!checked8)}}  type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Include in Production Std Cost Rollup</label>
              </div><br/>
             </CardGroup>
            </div>
          </Container>
        </DIV3>
        <DIV4>
         </DIV4>
        </CardGroup>
      </Tab>
      <Tab eventKey="Properties" title="Properties">
        <CardGroup>
     <div style={{width:'50rem',marginTop:'5rem'}}> 
       {getitemsproperties && (
                  <Table responsive striped bordered hover>
                    <TableHead>
                      <tr>
                        <th>#</th>
                        <th>Property Name</th>
                      </tr>
                    </TableHead>
                    <tbody>
                      {getitemsproperties.map((item, index) => (
                        <tr key={`${index}`}  >
                          <TD>{index + 1}</TD>
                          <TD>{item.PropertyName}</TD>
                          <TD><input class="form-check-input"  name='N' type="checkbox" id="inlineCheckbox1" value="option1" /></TD>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
      </div>
      <div style={{marginTop:'30rem',marginLeft:'5rem'}}>
      <Button >Select All</Button>
        <Button style={{ marginLeft:'7rem'}}> Clear Selection </Button>
      </div>
      </CardGroup>
      </Tab>
      <Tab eventKey="Remarks" title="Remarks">
      <div  class="form-group">
              <div >
              <textarea 
              style={{height: '15rem',width: '39rem',marginLeft: '3rem',marginTop: '4rem'}}
                type='text'
                class='form-control rounded-0'
                id='exampleFormControlTextarea1'
                name='MainRemarks'
                rows='3'
                onChange={e => {
                  getvaluefromapi(e)
                }}
              />
              </div>
            </div>
      </Tab>
      <Tab eventKey="UDF" title="UDF">
           <DIV3>
          <Container fluid>
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Secondry UOM</label>
              <Select
              options={UoMDropDown}
              onChange={e=>{
                getdropdownvalue(e,'U_Secndry_UOM')}}
              placeholder=''
              />
            
            </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>BP Name</label>
              <Select
              options={VendorCodeDropdown}
              onChange={e=>{
                getdropdownvalue(e,'U_BP_Nm')}}
              placeholder=''
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Sub Group</label>
              <input
                // value={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard ? HeaderData && HeaderData.NumAtCard:null}
                type='text'
                onChange={e => {
                  getvaluefromapi(e)
                }}
                name='U_Sb_grp'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              ></input>
            </div>
              <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>FG Group</label>
              <input
                type='text'
                name='U_FG_Grp'
                onChange={e => {
                  getvaluefromapi(e)
                }}
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              ></input>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Prest Return Ink Ref</label>
              <input
                // value={SelectedPRDocEntry && SelectedPRDocEntry.NumAtCard ? HeaderData && HeaderData.NumAtCard:null}
                type='text'
                class='form-control'
                name='U_PRTInk'
                onChange={e => {
                  getvaluefromapi(e)
                }}
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
              ></input>
            </div>
            </Container>
            </DIV3>
        </Tab>
        <Tab eventKey="Attachment" title="Attachment">
        <Attachment
      setattachmentresponse={setattachmentresponse}
        />
      </Tab>
      </Tabs>
     
      <DIV3>
      </DIV3>
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
        <Button style={{ marginLeft:'3%'}} 
         onClick={() => {
                  window.location.href="/Home"
                }}
         type='reset'>
          Cancel
        </Button>
      </div>
    </>
  )
}
