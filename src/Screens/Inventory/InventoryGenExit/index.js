import React from 'react'
import {
  Button,
  Table,
  Container,
  Row,
  Card,
  Col,
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
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [ButtonName, setButtonName] = React.useState('Add')
  const [HeaderData, setHeaderData] = React.useState()
  const [getdocdate, setgetdocdate] = React.useState()
  const [gettaxdate, setgettaxdate] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [getbatchnumbers, setgetbatchnumbers]=React.useState()
  const [bothbodies, setbothbodies] = React.useState(false)
  const [valuechacker, setvaluechacker]=React.useState()
  const [getsysnumber, setgetsysnumber]=React.useState()
  const [indexingvalue, setindexingvalue]=React.useState(0)
  const [BatchNumbersData, setBatchNumbersData]=React.useState()
  const [getbaselinenumber, setgetbaselinenumber]=React.useState(0)
  const [currentDate,setcurrentDate] = React.useState()
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [priceListDropDown, setPriceListDropDown] = React.useState()
  const [warehouseDropdown, setWarehouseDropdown] = React.useState()
  const [projectsDropDown, setProjectsDropdowon] = React.useState()
  const [costingCodeDropDown, setCostingCodeDropDown] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [selectedItems, setSelectedItems] = React.useState()
  const [selectedPrice, setSelectedPrice] = React.useState({})
  const [ref2, setRef2] = React.useState('')
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [BatchNumberQuantityData, setBatchNumberQuantityData] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState('0')
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [show3, setShow3] = React.useState(false)
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [getdocumenttype, setgetdocumenttype] = React.useState("60")
  const [getdocumentname, setgetdocumentname] = React.useState("IGE2");
  const [ModuleName, setModuleName] = React.useState("GoodsIssue")
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [docDate, setDocDate] = React.useState('')
  const [getindexing, setgetindexing] = React.useState(0)
  const [remarks, setRemarks] = React.useState('')
  const [getvaluefromtable, setgetvaluefromtable] = React.useState()
  const [JournalMemo, setJournalMemo] = React.useState()
  const [seletedBatchnumber, setseletedBatchnumber] = React.useState()
  const [seletedBatchnumber2, setseletedBatchnumber2] = React.useState([])
  const alert = useAlert()
  const [DocStatus, setDocStatus] = React.useState()
  const [getdocumentstatus, setgetdocumentstatus] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  }

  React.useEffect(async () => {
    setButtonName("Add")
    setSearchNumber('0')
    today()
    await setgetdocumentname("IGE2")
  await setModuleName("GoodsIssue")
  await setgetdocumenttype("60")
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
      BatchNoQuantities(cook)
      BatchNo(cook)
      getBatchNumbersfromAPI(cook)
      getItemsList(cook)
      getBatchQuantities(cook)
      getPriceList(cook)
      getProjects(cook)
      getCostingCode(cook)
      // getwareHousesOfBranch(cook)
    }
  }, [])

  const Home = () => {
    const alert = useAlert()
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

  const getvaluefromapi = async item => {
    getbatchnumberdata(item)
    setSelectedItems(item)
   }
   const getbatchnumberdata = async(item) =>{
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
  const today = () =>{
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    setgetdocdate(year + "-" + month + "-" + day ) 
    setgettaxdate(year + "-" + month + "-" + day ) 
    // console.log("Today",currentDate)
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
    console.log(res)
    if (res) {
      let ItemsDropDown = []
      res.forEach(element => {
        ItemsDropDown.push({
          value: element.ItemCode,
          label: element.ItemCode + ' : ' + element.ItemName,
          ItemCode: element.ItemCode,
          ItemName: element.ItemName,
          InventoryUOM: element.InventoryUOM,
          ItemWarehouseInfoCollection: element.ItemWarehouseInfoCollection,
          Quantity: 1
        })
      })
      await setItemsDropDown(ItemsDropDown)
    }
  }
  const getProjects = async cookie => {
    const api = `Projects?$select=Code,Name&$filter=Active eq 'tYES'`
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

  const getwareHousesOfBranch = async ( name) => {
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

  const warehouseSelection = (e, index) => {
    const itemStock = selectedItems[index].ItemWarehouseInfoCollection
    const found = itemStock.find(element => element.WarehouseCode === e.value)
    let obj = selectedItems
    // setSelectedItems([])
    obj[index]['WarehouseCode'] = e.value
    obj[index]['LineNum'] = index
    obj[index]['InStock'] = found.InStock
    setSelectedItems(obj)
    return setSelectedItems
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
  const Submit_PatchFunc = () => {
    if (ButtonName == 'Add') {
      submit()
    } else if (ButtonName != 'Add') {
      submitPatch()
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
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: JSON.stringify(body),
          api: `InventoryGenExits?$filter=DocNum eq ${id}`,
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
  const BatchNo = async cook => {
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
  //   ===========================================================================================================
  const submit = async () => {
    
    let docLines = []
    let docLines2 = []
    let subdocLines2 = []
    let body = {}
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
    selectedItems.forEach(element => {
      docLines.push({
        ItemCode: element.ItemCode,
        Quantity: element.Quantity,
        WarehouseCode: element.WarehouseCode,
        CostingCode: element.CostingCode,
        ProjectCode: element.ProjectCode,
        BatchNumbers: docLines2.filter(function(i){ return i.ItemCode == element.ItemCode; })
      })
    })
   
    body = {
      PaymentGroupCode: selectedPrice.value,
      Reference2: ref2,
      Comments: remarks,
      DocDate: getdocdate,
      TaxDate:gettaxdate,
      JournalMemo:JournalMemo,
      Series: getseriesvalue,
      DocumentLines: docLines,
      AttachmentEntry:attachmentresponse
    }
   
  }else{
    selectedItems.forEach(element => {
      docLines.push({
        ItemCode: element.ItemCode,
        Quantity: element.Quantity,
        WarehouseCode: element.WarehouseCode,
        CostingCode: element.CostingCode,
        ProjectCode: element.ProjectCode,
      })
    })
    body = {
      PaymentGroupCode: selectedPrice.value,
      Reference2: ref2,
      Comments: remarks,
      DocDate: getdocdate,
      TaxDate:gettaxdate,
      JournalMemo:JournalMemo,
      Series: getseriesvalue,
      DocumentLines: docLines,
      AttachmentEntry:attachmentresponse
    }
  }
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
          api: `InventoryGenExits`,
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
          api: `InventoryGenExits`,
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
      setseletedBatchnumber(docline)
    }
  })
  }
  const modalshow = (item,index) =>{
    let Batchlines = []
    console.log("selectedItems",selectedItems)
    console.log("BatchNumberQuantityData",BatchNumberQuantityData)
    selectedItems.forEach(element => {
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
  const SearchAll_Filter_Data = async () => {
    if (SearchNumber === '0') {
      SearchPRNumberAll()
    } else {
      SearchPRNumberFilter()
    }
  }
  const SearchPRNumberAll = async () => {
    // let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let cook = await localStorage.getItem('cookie')
    if (getdocumentstatus) {
      let sapAPi = `InventoryGenExits?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum`
      await axios
        .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
        .then(function (res) {
          setModalHeaderData(res.data.value)
        })
        .catch({})
      setShow1(true)
    } else {
      let sapAPi = `InventoryGenExits?$orderby=DocNum`
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
  const getBatchNumbersfromAPI = async (cook) => {
    let sapAPi = `SQLQueries('BatchNo')/List`
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setBatchNumbersData(res.data.value)
      })
      .catch({})
  }
  const handleClose2 = () => {
    setShow1(false)
  }
  const handleClose3 = () => {
    setShow3(false)
  }
  const SearchPRNumberFilter = async () => {
    // let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `InventoryGenExits?$filter=DocNum eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0])
        setPQDocumentLines(res.data.value[0].DocumentLines)
        if (res.data.value[0].DocumentStatus === "bost_Open") {
          setDocStatus("Open")
          // setcancelbutton(true)
        } else {
          setDocStatus("Close")
        }
        if (HeaderData != '') {
          setButtonName('Update')
        }
      })
      .catch({})
  }
  const selectPR = async item => {
    setShow1(false)
    setHeaderData(item)
    setPQDocumentLines(item.DocumentLines)
    localStorage.setItem('getDocEntry', item.DocEntry);
    if (item.DocumentStatus === "bost_Open") {
      setDocStatus("Open")
      // setcancelbutton(true)
      setButtonName('Update')
    } else {
      setDocStatus("Close")
      setButtonName('OK')
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
      <h1 style={{ textAlign: 'center' }}>Goods Issue</h1>
      <CardGroup>
        <DIV3>
          <Container fluid>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Price List</label>
              <Select
                onChange={e => {
                  setSelectedPrice(e)
                }}
                options={priceListDropDown}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Select Items</label>
              <Select
                isMulti={true}
                onChange={e => {
                  getvaluefromapi(e)
                }}
                options={ItemsDropDown}
              />
            </div>
            <br />
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
                  name='Discount'
                  readOnly
                  value={getnextnumber ? getnextnumber : HeaderData && HeaderData.DocNum}
                  placeholder=''
                  class='form-control'
                /> <br/>
              </div>
             </CardGroup>
             </div>
             <div style={{ width: '23.5rem', marginLeft: '3rem' }}>
                <label> Status</label>
                <Select
                  placeholder={DocStatus}
                  isDisabled={DocStatus ? true : false}
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
              </div><br />
          <div className="exit"
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' ,border:'1px solid',borderColor:'lightgray',borderRadius:'4px'}}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon22" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
              <input
                name={'SearchPRNumber'}
                type='Number'
                placeholder='Number'
                class='form-control22'
                onChange={e => {
                  setSearchNumber(e.target.value)
                }}
              />
              <br />
              {/* <Button
               
                onClick={e => {
                  SearchAll_Filter_Data()
                }}
              >
                Search
              </Button> */}
            </div>
            <br/>
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
                  onKeyPress={(e) => {
                    if(e.key === 'Enter'|| e.key === 'NumpadEnter'){
                      getfinalvaluefromtable()
                      
                    }
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
          <Button variant='secondary' onClick={getfinalvaluefromtable}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
            <Modal show={show1} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>Open Goods Issues List</Modal.Title>
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
            <div style={{ width: '23.5rem', height: 'auto'  ,marginLeft:'3rem'}}>
            <label>Posting Date</label>
              <input
                type='date'
                class='form-control'
                defaultValue={ HeaderData && HeaderData.DocDate ? HeaderData && HeaderData.DocDate:getdocdate}
                onChange={e => {
                  setgetdocdate(e.target.value)
                }}
              ></input>
            </div>
            <div style={{ width: '23.5rem', height: 'auto'  ,marginLeft:'3rem'}}>
            <label>Document Date</label>
              <input
                type='date'
                defaultValue={HeaderData && HeaderData.TaxDate ? HeaderData && HeaderData.TaxDate : gettaxdate}
                class='form-control'
                onChange={e => {
                  setgettaxdate(e.target.value)
                }}
              ></input>
            </div>
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem' }}>
            <label>Reference</label>
              <TextInput
                onChange={e => {
                  setRef2(e.target.value)
                }}
                type='text'
                defaultValue={HeaderData && HeaderData.Reference2}
              />
            </div>
          </Container>
        </DIV3>
      </CardGroup>
      {/* {ItemsDropDown ? null:(
              <Card style={{border:'none'}} >
    
    <div className="inside">
    <img src="/Image/2.png" style={{width:'2.5rem ' ,height:'2.5rem',marginLeft:'15.5rem', marginTop:'10.5rem'}}   class="spine"/>
    <div className="inside">
    <img src="/Image/3.png" style={{width:'2rem' ,height:'2rem',marginLeft:'14rem',marginTop:'9rem'}}  class="spin" />
    <div className="inside">
    <img src="/Image/Logo8.png" style={{width:'1rem' ,height:'1rem',marginLeft:'12.6rem',marginTop:'7.6rem'}}  class="" /> 
    </div>
    </div>
    </div>
       <img src="/Image/1.png" style={{width:'3rem',height:'3rem',marginLeft:'17rem',marginTop:'12rem'}} class="spin"/>  
       </Card>)} */}
      <Container fluid>
      <Tabs
        defaultActiveKey='Contents'
        transition={false}
        id='noanim-tab-example'
      >
        <Tab eventKey='Contents' title='Contents'>
        {PQDocumentLines && (
        <Table responsive striped bordered hover>
          <TableHead>
            <tr>
              <th>#</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>UoM</th>
              <th>Quantity</th>
              <th>Warehouse</th>
              <th>Project</th>
              <th>Costing Center</th>
              <th>Stock In Warehouse</th>
            </tr>
          </TableHead>
          <tbody>
            {PQDocumentLines &&
              PQDocumentLines.map((item, index) => (
                <tr key={`${index}`}>
                  <TD> {index + 1}</TD>
                  <TD>{item.ItemCode}</TD>
                  <TD>{item.ItemDescription}</TD>
                  <TD>{item.UoMCode}</TD>
                  {/* Quantity */}
                  <TD>
                    <div style={{ width: '15rem', height: 'auto' }}>
                      <TextInput
                        onChange={e => {
                          lineTextChange(e, index)
                        }}
                        type='number'
                        name={'Quantity'}
                        defaultValue={item.Quantity}
                      />
                    </div>
                  </TD>
                  {/* warehouse */}
                  <TD>
                    <div style={{ width: '15rem', height: 'auto' }}>
                      {warehouseDropdown && (
                      <Select
                      menuPortalTarget={document.body}
                      value={warehouseDropdown.filter(
                        option =>
                          option.value === item.WarehouseCode
                      )}
                        onChange={e => {
                          warehouseSelection(e, index)
                        }}
                        options={warehouseDropdown}
                      />
                      )}
                    </div>
                  </TD>
                  {/* projectsDropDown */}
                  <TD>
                    <div style={{ width: '15rem', height: 'auto' }}>
                      {projectsDropDown && (
                        <Select
                        menuPortalTarget={document.body}
                        value={projectsDropDown.filter(
                          option =>
                            option.value === item.ProjectCode
                        )}
                          onChange={e => {
                            lineDropdownSelection(e, index, 'ProjectCode')
                          }}
                          options={projectsDropDown}
                        />
                      )}
                    </div>
                  </TD>
                  {/* costingCodeDropDown */}
                  <TD>
                    <div style={{ width: '15rem', height: 'auto' }}>
                      {costingCodeDropDown && (
                        <Select
                        menuPortalTarget={document.body}
                        value={costingCodeDropDown.filter(
                          option =>
                            option.value === item.CostingCode
                        )}
                          onChange={e => {
                            lineDropdownSelection(
                              e,
                              index,
                              'CostingCode'
                            )
                          }}
                          options={costingCodeDropDown}
                        />
                      )}
                    </div>
                  </TD>

                  <TD>
                    <div style={{ width: '15rem', height: 'auto' }}>
                      {item.InStock ? item.InStock : '0'}
                    </div>
                  </TD>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
       {/* Selected Item Table */}
       {selectedItems && (
        <Table responsive striped bordered hover>
          <TableHead>
            <tr>
              <TD>#</TD>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Warehouse</th>
              { Array.isArray(getbatchnumbers) && getbatchnumbers.length > 0?(<th>Batch</th>):null}
              <th>UoM</th>
              <th>Project</th>
              <th>Costing Center</th>
              <th>Stock In Warehouse</th>
            </tr>
          </TableHead>
          <tbody>
            {selectedItems &&
              selectedItems.map((item, index) => (
                <tr key={`${index}`}>
                  <TD> {index + 1} </TD>
                  <TD>{item.ItemCode}</TD>
                  <TD>{item.ItemName}</TD> 
                    {/* Quantity */}

                    <TD>
                    <div style={{ width: '15em', height: 'auto' }}>
                      <TextInput
                        onChange={e => {
                          lineTextChange(e, index)
                        }}
                        type='number'
                        name={'Quantity'}
                        placeholder={'0'}
                      />
                    </div>
                  </TD>
                  {/* warehouse */}

                      <TD>
                        <div style={{ width: '15em', height: 'auto' }}>
                          {warehouseDropdown && (
                            <Select
                            menuPortalTarget={document.body}
                            value={warehouseDropdown.filter(
                              option =>
                                option.value === item.WarehouseCode
                            )}
                              onChange={e => {
                                warehouseSelection(e, index)
                              }}
                              options={warehouseDropdown}
                            />
                          )}
                        </div>
                      </TD>
                  { Array.isArray(getbatchnumbers) && getbatchnumbers.length > 0?( <TD>
                            <Button onClick={(e)=>{modalshow(item,index)}}> Batch </Button>
                          </TD>) :null}
                  <TD>{item.InventoryUOM}</TD>
                  {/* projectsDropDown */}

                  <TD>
                    <div style={{ width: '15em', height: 'auto' }}>
                      {projectsDropDown && (
                        <Select
                        menuPortalTarget={document.body}
                        value={projectsDropDown.filter(
                          option =>
                            option.value === item.ProjectCode
                        )}
                          onChange={e => {
                            lineDropdownSelection(e, index, 'ProjectCode')
                          }}
                          options={projectsDropDown}
                        />
                      )}
                    </div>
                  </TD>

                  {/* costingCodeDropDown */}

                  <TD>
                    <div style={{ width: '15em', height: 'auto' }}>
                      {costingCodeDropDown && (
                        <Select
                        menuPortalTarget={document.body}
                        value={costingCodeDropDown.filter(
                          option =>
                            option.value === item.CostingCode
                        )}
                          onChange={e => {
                            lineDropdownSelection(
                              e,
                              index,
                              'CostingCode'
                            )
                          }}
                          options={costingCodeDropDown}
                        />
                      )}
                    </div>
                  </TD>

                  <TD>
                    <div style={{ width: '15em', height: 'auto' }}>
                      {item.InStock ? item.InStock : '0'}
                    </div>
                  </TD>
                </tr>
              ))}
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
      {/* SearchAble Function Table */}
     

     
      </Container>
      <DIV3>
        <Container fluid>
          <div class='form-group' style={{ width: '23.5rem', height: 'auto' }}>
            <label for='exampleFormControlTextarea1'>Remarks</label>
            <textarea
              class='form-control rounded-0'
              defaultValue={HeaderData && "Document Entry : " + HeaderData.DocEntry + ". " + HeaderData.Comments}
              onChange={e => {
                setRemarks(e.target.value)
              }}
              id='exampleFormControlTextarea1'
              rows='3'
            ></textarea>
          </div>
          <label>Journal Remark</label>
          <div style={{ width: '23.5rem', height: 'auto' }}>
            <TextInput
              onChange={e => {
                setJournalMemo(e.target.value)
              }}
              type='text'
              defaultValue={HeaderData && HeaderData.JournalMemo}
            />
          </div>
        </Container>
      </DIV3>
      <br />
      <br />
      <div style={{ marginLeft: '2rem' }}>
        <Button
          type='reset'
          onClick={() => {
            Submit_PatchFunc()
          }}
        >
          {ButtonName}
        </Button>
        <Button style={{ marginLeft: '5%' }}
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
