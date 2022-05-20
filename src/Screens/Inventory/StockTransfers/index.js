import React from 'react'
import { Button, Table, Container, Row, Col, Tabs,Tab,Modal ,CardGroup,Card} from 'react-bootstrap'
import Select from 'react-select'
import { useAlert } from "react-alert";
import {  Attachment} from '../../../Component/APDownPaymentRequest';
import { Logo, TextInput, Alert, Navbar } from '../../../Component/Global'
import { CONSTANTS, LINKS } from '../../../Utils'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import './index.css'
const axios = require('axios')

export default function InventoryGenExit () {
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const alert = useAlert();
  const [getdocumentstatus, setgetdocumentstatus]=React.useState()
  const [getindexing, setgetindexing] = React.useState(0)
  const [getdirectdoctype, setgetdirectdoctype] = React.useState()
  const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState()
  const [valuechacker, setvaluechacker]=React.useState()
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [BatchNumbersData, setBatchNumbersData]=React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [priceListDropDown, setPriceListDropDown] = React.useState()
  const [warehouseDropdown, setWarehouseDropdown] = React.useState()
  const [toWarehouseDropdown, setToWarehouseDropdown] = React.useState()
  const [projectsDropDown, setProjectsDropdowon] = React.useState()
  const [costingCodeDropDown, setCostingCodeDropDown] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [BatchNumberQuantityData, setBatchNumberQuantityData] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [ButtonName, setButtonName] = React.useState();
  const [show3, setShow3] = React.useState(false)
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState()
  const [selectedItems, setSelectedItems] = React.useState()
  const [warehouse, setWarehouse] = React.useState({})
  const [getbatchnumbers, setgetbatchnumbers]=React.useState()
  const [warehouseTo, setWarehouseTo] = React.useState({})
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState()
  const [DocStatus, setDocStatus] = React.useState()
  const [SelectedVendor, setSelectedVendor] = React.useState()
  const [SalesEmployee, setSalesEmployee] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [transferRequests, setTransferRequests] = React.useState('')
  const [docDate, setDocDate] = React.useState()
  const [taxDate, setTaxDate] = React.useState()
  const [remarks, setRemarks] = React.useState('')
  const [JournalMemoComment, setJournalMemoComment] = React.useState('')
  const [copyTransferModal, setCopyTransferModal] = React.useState(false)
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [bothbodies, setbothbodies] = React.useState(false)
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [selectedPrice, setSelectedPrice] = React.useState({})
  const [SalesEmployeeCode, setSalesEmployeeCode] = React.useState()
  const [ContactPersonvalue, setContactPersonvalue] = React.useState()
  const [PriceListValue, setPriceListValue] = React.useState()
  const [seletedBatchnumber, setseletedBatchnumber] = React.useState()
  const [seletedBatchnumber2, setseletedBatchnumber2] = React.useState([])
  const [getdocumentname, setgetdocumentname] = React.useState("WTR2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("67")
  const [ModuleName, setModuleName] = React.useState("InventoryTransfer")
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  }

  React.useEffect(async () => {
    
    setgetdocumentname("WTR2")
    setModuleName("InventoryTransfer")
    setgetdocumenttype("67")
    setButtonName("Add")
    setSearchNumber('0')
    today()
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
      BatchNo(cook)
      BatchNoQuantities(cook)
      getBatchQuantities(cook)
      getItemsList(cook)
      getPriceList(cook)
      // getwareHousesOfBranch(cook)
      BusinessPartners(cook)
      SalesEmployeeFun(cook)
      getBatchNumbersfromAPI(cook)
      getProjects(cook)
      getCostingCode(cook)
    }
  }, [])
  const Home = () => {
    const alert = useAlert();
  
  }; const BatchNo = async cook => {
    let body = {
      "SqlCode": "BatchNo",
 "SqlName": "BatchNo",
 "SqlText": "Select ItemCode, SysNumber, DistNumber, MnfSerial, LotNumber, MnfDate, ExpDate, Location From OBTN" }
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
  const getBatchNumbersfromAPI = async (cook) => {
    let sapAPi = `SQLQueries('BatchNo')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res.data.value)
        setBatchNumbersData(res.data.value)
      })
      .catch({})
  }
  const handleClose3 = () => {
    setShow3(false)
  }
  const getBatchQuantities = async (cook) => {
    let sapAPi = `SQLQueries('BatchNoQuantities')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setBatchNumberQuantityData(res.data.value)
      })
      .catch({})
  }
  const getvaluefromapi = async item => {
    getbatchnumberdata(item)
    setSelectedItems(item)
   }
   
  const getbatchnumberdata = async(item) =>{
    console.log("item",item)
    console.log("getindexing + 1",getindexing + 1)
    setgetindexing(getindexing + 1)
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `Items?$filter=ItemCode eq '${item[getindexing].ItemCode}' and ManageBatchNumbers eq 'tYES'`
    console.log(SAPapi)
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res)
        setgetbatchnumbers(res.data.value)
        // setShow3(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getcopyfrombatchnumberdata = async(ItemCode) =>{
    console.log("ItemCode",ItemCode)
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `Items?$filter=ItemCode eq '${ItemCode}' and ManageBatchNumbers eq 'tYES'`
    console.log(SAPapi)
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res)
        setgetbatchnumbers(res.data.value)
        // setShow3(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const modalshow = (item,index) =>{
    let Batchlines = []
    console.log("selectedItems",selectedItems)
    console.log("BatchNumberQuantityData",BatchNumberQuantityData)
    selectedItems.forEach(element => {
      element.ItemWarehouseInfoCollection.forEach(element2 => { 
      BatchNumberQuantityData.forEach(docElement => {
        if(element2.ItemCode === docElement.ItemCode && element2.WarehouseCode === docElement.WhsCode){
          Batchlines.push({
            BaseLineNumber:index,
            AbsEntry: docElement.AbsEntry,
            ItemCode: docElement.ItemCode,
            MdAbsEntry: docElement.MdAbsEntry,
            Quantity: docElement.Quantity,
            SysNumber: docElement.SysNumber,
            WhsCode: docElement.WhsCode,
          })
          console.log(Batchlines,item)
          whsecodematching(Batchlines,item)
        }  
      });
    });
    });
   }
   const copyfrommodalshow = (item,index) =>{
    let Batchlines = []
    console.log("PQDocumentLines",PQDocumentLines)
    console.log("BatchNumberQuantityData",BatchNumberQuantityData)
    PQDocumentLines.forEach(element => {
      BatchNumberQuantityData.forEach(docElement => {
        if(element.ItemCode === docElement.ItemCode && element.WarehouseCode === docElement.WhsCode){
          Batchlines.push({
            BaseLineNumber:index,
            AbsEntry: docElement.AbsEntry,
            ItemCode: docElement.ItemCode,
            MdAbsEntry: docElement.MdAbsEntry,
            Quantity: docElement.Quantity,
            SysNumber: docElement.SysNumber,
            WhsCode: docElement.WhsCode,
          })
          whsecodematching(Batchlines,item)
          console.log(Batchlines,item)
        }  
      });
    });
     setShow3(true)
   }
   const whsecodematching = async (Batchlines,item) => {
    let Batchlines2 = []
    console.log("Batchlines",Batchlines)
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
          console.log(Batchlines2,item)
          itemcodematching(Batchlines2,item)
        }
     });
    });
  }
const itemcodematching = async (Batchlines2,item) => {
  let docline = []
  Batchlines2.forEach(element => {
    if(element.ItemCode === item.ItemCode){
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
      console.log(docline)
      setseletedBatchnumber(docline)
      console.log(docline[0].ItemCode)
      
    }
  })
  setShow3(true)
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

  const getItemsList = async cookie => {
    const api = `Items?$select=ItemCode,ItemName,InventoryUOM,ItemWarehouseInfoCollection&$filter=InventoryItem eq 'tYES' and Valid eq 'tYES'`

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
      let ItemsDropDown = []
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.ItemCode,
          label: element.ItemCode + ' : ' + element.ItemName,
          ItemCode: element.ItemCode,
          ItemDescription: element.ItemName,
          MeasureUnit: element.InventoryUOM,
          ItemWarehouseInfoCollection: element.ItemWarehouseInfoCollection,
          Quantity: 1,
          LineStatus: 'bost_Open'
        })
      })
      await setItemsDropDown(ItemsDropDown)
    }
  }
  const getProjects = async cookie => {
    const api = `Projects?$select=Code,Name&$filter=Active eq 'tYES' and (ValidTo lt '2021-01-11' or ValidTo eq '2021-01-11' or  ValidTo eq null)`
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

      setProjectsDropdowon(dropdown)
    }
  }

  const getCostingCode = async cookie => {
    const api = `ProfitCenters?$select=CenterCode,CenterName&$filter=Active eq 'tYES' and GroupCode ne null`
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
          value: element.CenterCode,
          label: element.CenterCode + ' : ' + element.CenterName
        })
      })

      setCostingCodeDropDown(dropdown)
    }
  }

  const getwareHousesOfBranch = async (name) => {
    let cook = await localStorage.getItem('cookie')
    let api = `Warehouses?$select=WarehouseCode,GlobalLocationNumber,WarehouseName&$filter=(GlobalLocationNumber eq '${name}' or GlobalLocationNumber eq null) &$orderby=WarehouseCode `
    //  const api = `Warehouses?$select=WarehouseCode,WarehouseName&$filter=Inactive eq 'tNO' `
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
      let dropdown = []
      res.forEach(element => {
        dropdown.push({
          value: element.WarehouseCode,
          label: element.WarehouseCode + ' : ' + element.WarehouseName
        })
      })
      setWarehouseDropdown(dropdown)
    }
  }
  //   ===========================================================================================================
  //   ===========================================================================================================
  //   ===========================================================================================================

  const warehouseSelection = (e, name) => {
    if (name === 'FromWareHouse') {
      let toWH = []
      warehouseDropdown.forEach(element => {
        if (element.value !== e.value) {
          toWH.push(element)
        }
      })
      setWarehouse(e)
      setToWarehouseDropdown(toWH)
    } else {
      setWarehouseTo(e)
    }
  }
  const getvaluefrombatchtable = (e,index) =>{
    let itemDetail = seletedBatchnumber
    itemDetail[index][e.target.name] = e.target.value
    console.log("itemDetail",itemDetail)
    setseletedBatchnumber(itemDetail)
    // setTimeout(function(){ getfinalvaluefromtable(itemDetail) }, 4000);
  }
  const getfinalvaluefromtable = () =>{
    let obj = seletedBatchnumber
    console.log("[...seletedBatchnumber2, obj]",[...seletedBatchnumber2, obj])
    setseletedBatchnumber2([...seletedBatchnumber2, obj])
    setvaluechacker('OUT')
    handleClose3()
  }
  const lineDropdownSelection = (e, index, name) => {
    let obj = selectedItems
    obj[index][name] = e.value
    setSelectedItems(obj)
  }

  const lineTextChange = (e, index) => {
    let obj = selectedItems
    let value = e.target.value
    if (e.target.type === 'number') {
      value = parseInt(value)
    }
    obj[index][e.target.name] = parseInt(value)
    setSelectedItems(obj)
  }
  const Submit_PatchFunc=()=>{
    if(ButtonName=="Add"){
      console.log("submit")
      submit()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatch()
    }
  }
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `StockTransfers(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res!=res.data.DocNum) {
            console.log('Operation completed successfully')
           
          } else {
            console.log("res.data.error.message.value")
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
      JournalMemo:JournalMemoComment,
      AttachmentEntry:attachmentresponse
    }
    console.log(HeaderData.DocEntry, body)
    Patch(HeaderData.DocEntry, body)
  }
  //   ===========================================================================================================
  const submit = async () => {
    console.log('seletedBatchnumber2',seletedBatchnumber2)
    let docLines = []
    let docLines2 = []
    const getdata = selectedItems ? selectedItems : PQDocumentLines
    console.log("getdata",getdata)
    var filtered = seletedBatchnumber2.filter(function (el) {
      return el == el.length == 0
    });
    if(valuechacker){
      filtered.forEach(Docelement => {
        Docelement.forEach(Docelement2 => {
         docLines2.push({
               Quantity: Docelement2.SelectedQty,
               BaseLineNumber: Docelement2.BaseLineNumber,
               ItemCode: Docelement2.ItemCode,
               SystemSerialNumber: Docelement2.SysNumber,
               BatchNumber: Docelement2.DistNumber,
         })
       })
       })
       getdata.forEach(element => {
      docLines.push({
        ItemCode: element.ItemCode,
        FromWarehouseCode: element.From_Warehouse,
        WarehouseCode: element.To_Warehouse,
        Quantity: element.Quantity,
        BatchNumbers: docLines2.filter(function(i){ return i.ItemCode == element.ItemCode; })
      })
    })
    let body = {
      SalesPersonCode:SalesEmployeeCode,
      AttachmentEntry:attachmentresponse,
      Comments: remarks,
      DocDate: docDate ? docDate : currentDate,
      TaxDate: taxDate ? taxDate : currentDate,
      FromWarehouse: warehouse.value,
      ToWarehouse: warehouseTo.value,
      StockTransferLines: docLines,
      CardCode:SelectedVendor,
      ContactPerson:ContactPersonvalue,
      PriceList:PriceListValue,
      JournalMemo:JournalMemoComment,
      Comments:remarks
    }
    if (bothbodies) {
      PostInSecondDB(body)
     }else{
       PostInFirstDB(body)
     }
  }else{
    getdata.forEach(element => {
      docLines.push({
        ItemCode: element.ItemCode,
        FromWarehouseCode: element.From_Warehouse,
        WarehouseCode: element.To_Warehouse,
        Quantity: element.Quantity,
      })
    })
    let body = {
      SalesPersonCode:SalesEmployeeCode,
      AttachmentEntry:attachmentresponse,
      Comments: remarks,
      DocDate: docDate ? docDate : currentDate,
      TaxDate: taxDate ? taxDate : currentDate,
      FromWarehouse: warehouse.value,
      ToWarehouse: warehouseTo.value,
      StockTransferLines: docLines,
      CardCode:SelectedVendor,
      ContactPerson:ContactPersonvalue,
      PriceList:PriceListValue,
      JournalMemo:JournalMemoComment,
      Comments:remarks
    } 
    if (bothbodies) {
      PostInSecondDB(body)
     }else{
       PostInFirstDB(body)
     }
  }
  }
  const PostInFirstDB = async(body) =>{
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: `StockTransfers`,
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
          api: `StockTransfers`,
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
  const searchInventoryRequest = async warehouse => {
    let cook = await localStorage.getItem('cookie')
    let api = `InventoryTransferRequests?$filter=FromWarehouse eq '${warehouse}' and DocumentStatus eq 'bost_Open'`
    if (cook) {
      await axios
        .post(API_TYPES.GET, {
          api: api,
          cookie: cook
        })
        .then(function (res) {
          if (res.data.value) {
            setTransferRequests(res.data.value)
          } else {
            alert(JSON.stringify(res.data.error.message.value))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const copyToModal = () => {
    if (warehouse && warehouse.value) {
      searchInventoryRequest(warehouse.value)
      setCopyTransferModal(true)
    }
  }
  const BusinessPartners = async (e) => {
    // -------------------------    Vendor API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let cookie = await localStorage.getItem('cookie')

    let SAPapi = LINKS.sap.MasterData.ActiveVendor

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
  const ContactPerson = async () => {
    // -------------------------    Contact Person API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq  '${SelectedVendor}'`
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
 
  const BatchNoQuantities = async cook => {
    let body = {
      "SqlCode": "BatchNoQuantities",
      "SqlName": "BatchNoQuantities",
      "SqlText": "Select ItemCode, Quantity, WhsCode, SysNumber, AbsEntry, MdAbsEntry From OBTQ Where Quantity > 0"
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
  const SalesEmployeeFun = async (cookie, e) => {
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
          setSalesEmployee(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const VendorChange = e => {
    setSelectedVendor(e.value)
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
    const api = `${LINKS.api}/GetApi`
    let cook = await localStorage.getItem('cookie')
    if(getdocumentstatus){
      let sapAPi = `StockTransfers?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum desc` 
      await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
       
      })
      .catch({})
    setShow1(true)
    }else{
      let sapAPi = `StockTransfers?$orderby=DocNum desc` 
      await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
      })
      .catch({})
    setShow1(true)
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
  const handleClose2 = () => {
    setShow1(false)
  }
  const SearchPRNumberFilter = async () => {
    // let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `StockTransfers?$filter=DocNum eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data.value[0])
       localStorage.setItem('getDocEntry',res.data.value[0].DocEntry);
       console.log(res.data.value[0])
        setPQDocumentLines(res.data.value[0].StockTransferLines)
        if(res.data.value[0].DocumentStatus==="bost_Open"){
          setDocStatus("Open")
          setButtonName("Update")
        }else{
          setDocStatus("Close")
          setButtonName("OK")
        }
      
      })
      .catch({})
  }
  const selectPR = async item => {
    setShow1(false)
    setHeaderData(item)
    localStorage.setItem('getDocEntry',item.DocEntry);
    console.log("zzzzzzz")
    console.log(item)
    setPQDocumentLines(item.StockTransferLines)
    console.log(item.StockTransferLines)
    if(item.DocumentStatus==="bost_Open"){
      setDocStatus("Open")
      setButtonName('Update')
    }else{
      setDocStatus("Close")
      setButtonName('Update')
    }

  }
  const copyfromdata = async item => {
    console.log(item)
    console.log(item.StockTransferLines)
    let Doclines = item.StockTransferLines
    Doclines.forEach(ele=>{
      if(ele.ItemCode && ele.FromWarehouseCode){
        getcopyfrombatchnumberdata(ele.ItemCode)
      }
    })
    setPQDocumentLines(item.StockTransferLines)
    // setSelectedItems(item.StockTransferLines)
    setCopyTransferModal(false)

    // if(item.DocumentStatus==="bost_Open"){
    //   setDocStatus("Open")
    //   setButtonName('Update')
    // }else{
    //   setDocStatus("Close")
    //   setButtonName('Update')
    // }
   

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
  return (
    <>
     <Navbar 
      setgetserviceseries={setgetserviceseries}
       getdocumenttype={getdocumenttype}
       ModuleName={ModuleName}
       HeaderData={HeaderData}
       getdocumentname={getdocumentname}/>
      
      <h1 style={{ textAlign: 'center' }}>Inventory Transfer </h1>
      <CardGroup>
      <DIV3>
      <Container fluid> 
      <label>Doc Type</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' >
              <Select
                placeholder={HeaderData && HeaderData.DocType}
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
         <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>From Warehouse</label>
              <Select
               placeholder={HeaderData && HeaderData.FromWarehouse}
                onChange={e => {
                  warehouseSelection(e, 'FromWareHouse')
                }}
                options={warehouseDropdown}
              />
            {/* // )} */}

            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>To Warehouse </label>
            {/* {toWarehouseDropdown && ( */}
              <Select
                 placeholder={ HeaderData && HeaderData.ToWarehouse}
                onChange={e => {
                  warehouseSelection(e, 'toWareHouse')
                }}
                options={toWarehouseDropdown}
              />
            {/* )} */}
            </div><br/>
             
             {getcopyfromdoctype ? (
              <Button
                onClick={() => {
                  copyToModal()
                }}
              >
                Copy From
              </Button>) : null }
            {/* )} */}
            <br/>
      <label>Business Partner</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' onClick={BusinessPartners}>
              <Select
                placeholder={SelectedPRDocEntry && SelectedPRDocEntry.CardCode?HeaderData && HeaderData.CardCode:null}
                options={VendorCodeDropdown} // Options to display in the dropdown
                onChange={e => {
                  VendorChange(e)
                }} // Function will trigger on select event
                // onRemove={BusinessPartners} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>Contact Person</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' onClick={ContactPerson}>
              {/* {ContactPersonDropdown && ( */}
              <Select
              
              placeholder={HeaderData && HeaderData.ContactPerson}
                options={ContactPersonDropdown} // Options to display in the dropdown
                displayValue='name' // Property name to display in the dropdown options
                onChange={e => {
                  setContactPersonvalue(e.value)
                }}
              />
              {/* )} */}
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
          <label>Price List</label>
          
            <Select
              placeholder={HeaderData && HeaderData.PriceList}
              onChange={e => {
                setSelectedPrice(e)
                setPriceListValue(e.value)
              }}
              options={priceListDropDown}
            />
         </div>
            {getdirectdoctype?(
                <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Select Items</label>
                <Select
                  placeholder='Select..'
                  isMulti
                  onChange={e => {
                    getvaluefromapi(e)
                  }}
                  options={ItemsDropDown}
                />
              </div>    
              ):null}
           
            <br />
            <Modal show={show3} onHide={handleClose3}>
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
                          <TD>{item.DistNumber}
                    </TD>
                   <TD>{item.ItemCode}
                    </TD>
                    <TD>{item.WhsCode}</TD>
                    <TD> {item.Quantity}</TD>
                    <TD>  <div style={{ width: '3rem'  }}>
                <input
                  type='number'
                  name='SelectedQty'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  onChange={e => {
                    getvaluefrombatchtable(e,index)
                  }}
                  onKeyPress={(e) => {
                    if(e.key === 'Enter'|| e.key === 'NumpadEnter'){
                      getfinalvaluefromtable()
                      
                    }
                  }}
                />
              </div></TD>
              <TD> {item.BaseLineNumber}</TD>
            
                        </tr>
                  ))}
                </tbody>
              </Table>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={getfinalvaluefromtable}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
        <Modal
          show={copyTransferModal}
          onHide={() => setCopyTransferModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Inventory Transfer Requests</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {transferRequests && (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>DocNum</th>
                    <th>From Warehouse</th>
                    <th>To Warehouse</th>
                    <th>DocDate</th>
                    <th>Journal Memo</th>
                  </tr>
                </thead>
                <tbody>
                  {transferRequests.map((item, index) => (
                    <tr key={`${index}`}   onClick={e => {
                      copyfromdata(item)
                     
                    }}>
                      <td>
                        {index + 1}
                      
                      </td>
                      <td>{item.DocNum}</td>
                      <td>{item.FromWarehouse}</td>
                      <td>{item.ToWarehouse}</td>
                      <td>{item.DocDate}</td>
                      <td>{item.JournalMemo}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => setCopyTransferModal(false)}
            >
              Close
            </Button>
            <Button
              variant='primary'
              onClick={() => setCopyTransferModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
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
                    getwareHousesOfBranch(e.item.Name)}} // Function will trigger on select event
                  // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
              <div style={{ width: '11.5rem', height: 'auto'  }}>
                <input
                  type='number'
                  name='DocNum'
                  readOnly
                  value={HeaderData&&HeaderData.DocNum || getnextnumber}
                  placeholder=''
                  class='form-control'
                /> <br/>
              </div>
             </CardGroup>
             </div>
             <div style={{ width: '23.5rem' , marginLeft: '3rem'}}>
            <label> Status</label>
            <Select
                placeholder={DocStatus}
                isDisabled={DocStatus?true:false}
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
            <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Open Inventory Transfer List</Modal.Title>
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
            <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
              <label>Posting Date</label>
     
         <input
           type='date'
           class='form-control'
           defaultValue={HeaderData && HeaderData.DocDate ? HeaderData && HeaderData.DocDate : currentDate}
           onChange={e => {
             setDocDate(e.target.value)
           }}
         ></input>
</div>
   <br/>
   <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem'}}>
<label>Document Date</label>
      
         <input
        //  defaultValue={currentDate}
         defaultValue={HeaderData && HeaderData.TaxDate ? HeaderData && HeaderData.TaxDate : currentDate}
         type='date'
           class='form-control'
           onChange={e => {
             setTaxDate(e.target.value)
           }}
         ></input>
</div>
        </Container>
      </DIV3>
      </CardGroup>
      <Tabs
        defaultActiveKey='Contents'
        transition={false}
        id='noanim-tab-example'
      >
        <Tab eventKey='Contents' title='Contents'>
        {PQDocumentLines && ( 
        <Table responsive striped bordered hover>
          { Array.isArray(PQDocumentLines) && PQDocumentLines.length>0?(
          <TableHead>
            <tr>
              <th>#</th>
              <th>Item Code</th>
              <th>Item Name</th>
              {/* { Array.isArray(getbatchnumbers) && getbatchnumbers.length > 0?(<th>Batch</th>):null} */}
              <th>Batch</th>
              <th>From Warehouse</th>
              <th>To Warehouse</th>
              <th>Quantity</th>
              <th>UoM Code</th>
            </tr>
          </TableHead>
              ):null}
          <tbody>
            {PQDocumentLines &&
              PQDocumentLines.map((item, index) => (
                <tr key={`${index}`}>
                  <TD> {index + 1}</TD>
                  <TD>{item.ItemCode}</TD>
                  <TD>{item.ItemDescription}</TD>
                  {/* { Array.isArray(getbatchnumbers) && getbatchnumbers.length > 0?( <TD>
                            <Button onClick={(e)=>{modalshow(item,index)}}> Batch </Button>
                          </TD>) :null} */}
                           <TD>
                            <Button onClick={(e)=>{copyfrommodalshow(item,index)}}> Batch </Button>
                          </TD>
                          <TD>
                    <div style={{width:'14rem'}}>
                      {warehouseDropdown && (
                        <Select
                        menuPortalTarget={document.body}
                        placeholder={item.FromWarehouseCode}
                          onChange={e => {
                            lineDropdownSelection(
                              e,
                              index,
                              'From_Warehouse'
                            )
                          }}
                          options={warehouseDropdown}
                        />
                      )}
                      </div>
                    </TD>
                    <TD>
                    <div style={{width:'14rem'}}>
                      {warehouseDropdown && (
                        <Select
                        menuPortalTarget={document.body}
                        placeholder={item.WarehouseCode}
                          onChange={e => {
                            lineDropdownSelection(
                              e,
                              index,
                              'To_Warehouse'
                            )
                          }}
                          options={warehouseDropdown}
                        />
                      )}
                      </div>
                    </TD>
                    {/* Quantity */}
                    <TD>
                      <div style={{width:'14rem'}}>
                      <input
                        onChange={e => {
                          lineTextChange(e, index)
                        }}
                        type='number'
                        class='form-control'
                        name={'Quantity'}
                        defaultValue={item.Quantity ? item.Quantity : '1'}
                      />
                      </div>
                    </TD>
                    <TD>{item.MeasureUnit || item.UoMCode}</TD>
                  
                </tr>
              ))}
          </tbody>
        </Table>
        )}

{selectedItems && (
      <Table  responsive striped bordered hover>
        <TableHead>
          <tr>
          <th>#</th>
            <th>Item Code</th>
            <th>Item Name</th>
            { Array.isArray(getbatchnumbers) && getbatchnumbers.length > 0?(<th>Batch</th>):null}
            <th>From Warehouse</th>
            <th>To Warehouse</th>
            <th>Quantity</th>
            <th>UoM Code</th>
          </tr>
        </TableHead>
        <tbody>
          {selectedItems &&
            selectedItems.map(
              (item, index) =>
                item.LineStatus === 'bost_Open' && (
                  <tr key={`${index}`}>
                      <TD>{index + 1}</TD>
                    <TD>{item.ItemCode}</TD>
                    <TD>{item.ItemDescription}</TD>
                    { Array.isArray(getbatchnumbers) && getbatchnumbers.length > 0 ? ( <TD>
                            <Button onClick={(e)=>{modalshow(item,index)}}> Batch </Button>
                          </TD>) :null}

                          <TD>
                    <div style={{width:'14rem'}}>
                      {warehouseDropdown && (
                        <Select
                        menuPortalTarget={document.body}
                        placeholder={item.FromWarehouseCode}
                          onChange={e => {
                            lineDropdownSelection(
                              e,
                              index,
                              'From_Warehouse'
                            )
                          }}
                          options={warehouseDropdown}
                        />
                      )}
                      </div>
                    </TD>
                    <TD>
                    <div style={{width:'14rem'}}>
                      {warehouseDropdown && (
                        <Select
                        menuPortalTarget={document.body}
                        placeholder={item.WarehouseCode}
                          onChange={e => {
                            lineDropdownSelection(
                              e,
                              index,
                              'To_Warehouse'
                            )
                          }}
                          options={warehouseDropdown}
                        />
                      )}
                      </div>
                    </TD>
                    {/* Quantity */}
                    <TD>
                      <div style={{width:'14rem'}}>
                      <input
                        onChange={e => {
                          lineTextChange(e, index)
                        }}
                        type='number'
                        class='form-control'
                        name={'Quantity'}
                        defaultValue={item.Quantity ? item.Quantity : '1'}
                      />
                      </div>
                    </TD>
                    <TD>{item.MeasureUnit || item.UoMCode}</TD>
                  
                  </tr>
                )
            )}
        </tbody>
        </Table>
)}
        </Tab>
        <Tab eventKey="Attachment" title="Attachment">
        <Attachment
      setattachmentresponse={setattachmentresponse}
        />
      </Tab>
      </Tabs>
     
        <CardGroup>
          <DIV3>
        <Container fluid>
        <div style={{ width: '23.5em', height: 'auto' }}>
              <label>Sales Employee</label>
              <Select
                  placeholder={HeaderData && HeaderData.SalesPersonCode}
                
                onChange={e => {
                  setSalesEmployeeCode(e.value)
                }}
                options={SalesEmployee} // Options to display in the dropdown
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
       
             <div  style={{ width: '23.5em', height: 'auto' }} class="form-group">
  <label for="exampleFormControlTextarea1">Journal Remarks</label>
  <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="3"  onChange={e => {
                setJournalMemoComment(e.target.value)
              }}
              type='text'
              defaultValue={HeaderData && HeaderData.JournalMemo}
></textarea>
</div>
</Container>
</DIV3>
<DIV4></DIV4>

<DIV3>
        <Container fluid>
      
     
             <div  style={{ width: '23.5em', height: 'auto' ,marginLeft:'4rem'}} class="form-group">
  <label for="exampleFormControlTextarea1">Remarks</label>
  <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="3"  onChange={e => {
                setRemarks(e.target.value)
              }}
              type='text'
              placeholder={HeaderData && HeaderData.Comments}
></textarea>
</div>
</Container>
</DIV3>
</CardGroup> 
<br/> 
<br/> 
      <div>
      <Button 
               style={{ marginLeft: '5%' }}
              
               onClick={() => {
                Submit_PatchFunc()
              }}
              >{ButtonName}</Button>
      <Button
       style={{ marginLeft: '5%' }}
       onClick={() => {
                  window.location.href="/Home"
                }}
       type="reset"
        // onClick={() => {
        //   submit()
        // }}
      >
       Cancel
      </Button>
      </div>
    </>
  )
}
