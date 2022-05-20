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
  const [loading, setLoading] = React.useState(false);
  const [getDocDate, setgetDocDate] = React.useState();
  const [update, setUpdate] = React.useState(1)
  const [getTaxDate, setgetTaxDate] = React.useState();
  const [getdirectdoctype, setgetdirectdoctype] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [getcopyfromdoctype, setgetcopyfromdoctype] = React.useState()
  const [itemsDropdownList, setItemsDropdownList] = React.useState();
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
  const [currentDate,setcurrentDate] = React.useState()

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
  const [valuechacker, setvaluechacker]=React.useState()

  const [getbatchdata,setgetbatchdata]=React.useState()

  const [getItemsnumber, setgetItemsnumber] = React.useState()
  const [show3, setShow3] = React.useState(false)

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
  const [getindexing, setgetindexing] = React.useState(0)
  const [getvaluefromtable, setgetvaluefromtable] = React.useState()
  
  const [getdocumentname, setgetdocumentname] = React.useState("IGN2");
  const [getdocumenttype, setgetdocumenttype] = React.useState("59")
  const [ModuleName, setModuleName] = React.useState("Receiptfromproduction")
  const [getserviceseries, setgetserviceseries] = React.useState()
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [selectedItems, setSelectedItems] = React.useState();
  const [WarehouseName, setWarehouseName] = React.useState()
  const [getbatchnumbers, setgetbatchnumbers]=React.useState()
 
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
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

  React.useEffect(async () => {
    today()
    console.log(currentDate)
    setgetdocumentname("IGN2")
    setModuleName("Receiptfromproduction")
    setgetdocumenttype("59")
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
    if(cook)
    GetItems(cook)
    
  
   
  }, [])
 
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
  const OwnerhandleClose = () => setDisply(false)
  const OwnerhandleShow = () => setDisply(true)
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

 

 
 
 
  
  const handleClose4 = () => {
    setShow4(false)
  }
 
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = async () => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    let cookie = await localStorage.getItem('cookie')
    let SAPapi = `ProductionOrders?$orderby=DocumentNumber desc &$filter=ProductionOrderStatus eq 'boposReleased'`;
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log("Handle Show",res)
        setPrRe(res.data.value);
      })
      .catch({})
    setShow(true)
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
    prData[index]['LineNumber'] = index
    setPQDocumentLines(prData);
    
  }
  const selectPR = async (item) => {
    setShow(false)
    setHeaderData(item)
    setSearchDocumentLines(item.DocumentLines)
    // setSelectedItems(item)
  }
  // const getvaluefromapi = async item => {
  //   getbatchnumberdata(item)
  //   setSelectedItems(item)
  //  }
//   const ontextItemFilter = async (item,index) => {
// item.ProductionOrderLines.filter(e => { return e.PlannedQuantity !==e.IssuedQuantity})
//   }
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
    let sapAPi = `InventoryGenEntries` 
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
       console.log("res",res)
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

  const getvaluefrombatchtable = (e,index) =>{
    let itemDetail = PQDocumentLines
    console.log("PQDocumentLines",PQDocumentLines);
    itemDetail[index][e.target.name] = e.target.value
    setPQDocumentLines(itemDetail)
    console.log("itemDetail",itemDetail);
    setvaluechacker(itemDetail)
  }
  // const getbatchnumberdata = async(item) =>{
  //   setgetindexing(getindexing + 1)
  //   console.log("item",item)
  //   let cookie = await localStorage.getItem('cookie')
  //   let SAPapi = `Items?$filter=ItemCode eq '${item.ItemNo}' and ManageBatchNumbers eq 'tYES'`
  //   await axios
  //     .post(API_TYPES.GET, {
  //       api: SAPapi,
  //       cookie: cookie
  //     })
  //     .then(function (res) {
  //       setgetbatchnumbers(res.data.value)
  //       // setShow3(true)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `InventoryGenEntries?$filter=DocNum eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        setHeaderData(res.data.value[0])
        console.log(res.data.value[0])
        console.log(res.data.value[0].DocumentLines)
        setSearchDocumentLines(res.data.value[0].DocumentLines)
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
      console.log("getvalues",getvalues);
      submitO()
    }else if(ButtonName!="Add"){
      console.log("Patch")
      submitPatchOrders()
    }
  }
  const submitO = async () => {
    let DocLines = []
    let body = {}
    console.log("PQDocumentLines",PQDocumentLines)
    if(valuechacker){
      PQDocumentLines.forEach(element => {
        if( element.isSelected ){
      DocLines.push({
        BaseType: 202,
        BaseEntry: element.AbsoluteEntry,
        BaseLine:element.LineNumber,
         BatchNumbers: [
          {
              "BatchNumber": element.BatchNumber,
              "ExpiryDate": element.ExpiryDate,
              "ManufacturingDate": element.ManufacturingDate,
              "Location": element.ItemCode,
              "Quantity":element.Quantity,
              "BaseLineNumber": element.LineNumber,
          }
        ],
      })
    }
    })
    body['DocumentLines']=DocLines
    body['PostingDate'] = currentDate
    body['Comments'] = getvalues.Remarks
    body['JournalMemo'] = getvalues.Journal_Remarks
    body['Reference2'] = getvalues.Ref_2
    
  }else{
    PQDocumentLines.forEach(element => {
      if( element.isSelected ){
      DocLines.push({
        BaseType: 202,
        BaseEntry: element.DocumentAbsoluteEntry,
        BaseLine:element.LineNumber,
        'BatchNumbers' : [],
        // // "DocumentLineAdditionalExpenses": [
        //     {
        //         "ExpenseCode": 1,
        //         "LineTotal":element.detail.TotalFreight
        //     }
        // ],
      })
    }
  })
    body['DocumentLines']=DocLines
    body['PostingDate'] = currentDate
    body['Comments'] = getvalues.Remarks
    body['JournalMemo'] = getvalues.Journal_Remarks
    body['Reference2'] = getvalues.Ref_2


  }
    console.log("body",JSON.stringify(body))   
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: JSON.stringify(body),
          api: LINKS.sap.Production.PostReceiptFromProduction,
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
  const getseriesvaluefunction = async (e) =>{
    console.log(e.label)
    setgetseriesvalue(e.value)
    setgetnextnumber(e.item.NextNumber)
  }
  
  const handleSubmitted = ({ res, fields,Dropdown, form }) => {
    form.reset() 
    Dropdown.reset()
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

 
  const handleClose3 = () => {
    setShow3(false)
  }
 
 
   
      const ObjectTypePaymentInvoices = async (docnum,index) => {
        console.log("DocNum",docnum)
        let sapAPi = `ProductionOrders?$filter=DocumentNumber eq ${docnum}`
        let cook = await localStorage.getItem('cookie')
        await axios
          .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
          .then(function (res) {
            console.log("Selected item",res)
            console.log("index",index)

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
      // const discountFormula = (e, index) => {
      //   let obj = selectedItems
      //   obj[index].detail[e.target.name] = e.target.value
      //   setSelectedItems(obj)
      // }
      // const ItemsDropDownfunc = async (selectedList,e) => {  
      //   setSelectedItems(selectedList)
      //  }
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
      const valuechangefunction = (e) => {
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
      const Add = () => {
        if (noOfRows !== 10) {
          setNoOfRows(noOfRows + 1);
          // setTabLable("")
        }
      
      }

      const modalshow = (item,index) =>{
        console.log("item",item)
        setgetbatchdata(item)
        setgetvaluefromtable(item.ItemCode)
         setShow3(true)
       }
      const getNodropdownvalue = (e, name) => {
        let obj = getvalues
        obj[name] = e.value
        // console.log("name",name)
        console.log("e.value",e.value)
        setgetvalues(obj)
        // console.log(obj);
      }
      const getqauntityfromtable = (e, index) => {
        console.log("index",index)
        let itemDetail = PQDocumentLines
        console.log("itemDetail",itemDetail)
        itemDetail[index][e.target.name] = e.target.value
        setPQDocumentLines(itemDetail)
      }
      const getdropdowntqauntityfromtable = (e, index,name) => {
        let itemDetail = SearchDocumentLines
        itemDetail[index][name] = e.value
        setSearchDocumentLines(itemDetail)
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
      <h1 style={{ textAlign: 'center' }}>Receipt From Production</h1>
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
          
           <br/><br/>
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
                {/* <Button variant='secondary' onClick={handleClose2}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleClose2}>
                  Cancel
                </Button> */}
              </Modal.Footer>
            </Modal>
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
                        <tr key={`${index}`} >
                           <TD>
                  
                  {index + 1}
                  <input
                  type='checkbox'
                  onChange={()=>{checkboxSelect(item,index)}}
                  checked={item.isSelected}
                />
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
                      // onChange={e => { ItemsDropDownfunc(e) }}
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

                  // placeholder={HeaderData && HeaderData.CardCode}
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
                  onClick={() => {
                    handleClose4()
                  }}>Cancel</Button>
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

           <br/>
           <br/>
           <br/>
            <div style={{ width: '23.5rem', height: 'auto'}}>
            {getdirectdoctype?(
                <>
              <label>Select Items</label>
                <Select
                  placeholder='Select..'
                  isMulti
                  options={itemsDropdownList}
                  // onChange={e => { ItemsDropDownfunc(e) }}
                  displayValue='name' // Property name to display in the dropdown options
                />
              </>    
              ):null}
            </div>
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
           
          
            <div style={{ width: '23.5rem' , marginLeft: '3rem'}}>
            <label> Posting Date</label>
            <input
              type='date'
              name='DocDate'
              class='form-control'
              onChange={e => {
                    valuechangefunction(e)
                  }}
              defaultValue={currentDate || HeaderData?HeaderData&&HeaderData.DocDate:currentDate}
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
              defaultValue={HeaderData&&HeaderData.Reference2}
            />
             </div>
          
            
         
          </Container>
        </DIV3>
      </CardGroup>
   
    <Tabs defaultActiveKey="Contents" transition={false} id="noanim-tab-example">
    <Tab eventKey="Contents" title="Contents">
   {PQDocumentLines &&( 
   <Table responsive striped bordered hover>
      { Array.isArray(PQDocumentLines) && PQDocumentLines.length>0?(
              <TableHead>
              <tr>
      {/* <th>#</th> */}
      <th>Item No.</th>
      <th>Item Description</th>
      <th>Batch</th>
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
                { PQDocumentLines.map((item, index) => (
              item.isSelected && 
              // PrReItem.DocumentLines.map((item, index) => (
                  // item.LineStatus === "bost_Open" &&
                  <tr key={`${index}`}>
            {/* <TD>{index + 1}</TD> */}
            <TD>{item.ItemNo}</TD>
            <TD>{item.ProductDescription}</TD>
            <TD>{ItemsDetails[item.ItemNo] ? (ItemsDetails[item.ItemNo].ManageBatchNumbers === 'tYES' ? (<Button onClick={(e)=>{modalshow(item,index)}}> Batch </Button>) : null)   : null }</TD>
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
                  defaultValue={item.PlannedQuantity - item.CompletedQuantity}
                  onChange={e => {
                    getqauntityfromtable(e,index)
                  }}
                />
              </div>
            
            </TD>
            {/* <TD></TD> */}
          
            <TD>{item.InventoryUOM}</TD>
            <TD>{item.UoMCode}</TD>
            <TD>{item.UoMCode}</TD>
            <TD>
            <a
          style={{ marginRight:'3%',cursor: 'pointer' }}
          onClick={() => ObjectTypePaymentInvoices(item.AbsoluteEntry)}
        >
          {' '}
          <GrDocumentPerformance />
        </a> 
             {item.DocumentNumber}
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
                // ))
                ))}
              </tbody>
            </Table>
            )}
            {SearchDocumentLines && (
    <Table responsive striped bordered hover>
      { Array.isArray(SearchDocumentLines) && SearchDocumentLines.length>0?(
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
      {SearchDocumentLines&&SearchDocumentLines.map((item, index) => (
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
            <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {getbatchdata && (
              <Table responsive striped bordered hover>
                <TableHead>
                <tr>
                  <th>#</th>
                  <th>Batch Number</th>
                  <th>Expiry Date</th>
                  <th>Manufacturing Date</th>
                  <th>Location</th>
                  <th>Quantity</th>
                  <th>BaseLine Number</th>
                </tr>
                </TableHead>
                <tbody>
                  {[...Array(getbatchdata)].map((item, index) => (
            
                        <tr key={`${index}`}>
                          <TD>{index + 1}</TD>
                         <TD>
                    <div style={{ width: '11rem'  }}>
                <input
                  type='text'
                  name='BatchNumber'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  // defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate || HeaderData && HeaderData.DocDueDate}
                  onChange={e => {
                    getvaluefrombatchtable(e, item.LineNumber)
                  }}
                />
              </div>
                    </TD>
                    <TD>
                    <div style={{ width: '11rem'  }}>
                <input
                  type='date'
                  name='ExpiryDate'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  // defaultValue={SelectedPRDocEntry && SelectedPRDocEntry.DocDueDate || HeaderData && HeaderData.DocDueDate}
                  onChange={e => {
                    getvaluefrombatchtable(e, item.LineNumber)
                  }}
                />
              </div>
                    </TD>
                    <TD> 
                      <div style={{ width: '11rem'  }}>
                <input
                  type='date'
                  name='ManufacturingDate'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue= {item.ItemCode}
                  onChange={e => {
                    getvaluefrombatchtable(e, item.LineNumber)
                  }}
                />
              </div> 
                     </TD>
                    <TD>  
                   <div style={{ width: '11rem'  }}>
                <input
                  type='text'
                  name='Location'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue= {item.ItemCode}
                  onChange={e => {
                    getvaluefrombatchtable(e, item.LineNumber)
                  }}
                />
              </div></TD>
                    <TD>  <div style={{ width: '11rem'  }}>
                <input
                  type='number'
                  name='Quantity'
                  class='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  defaultValue= {item.Quantity}
                  onChange={e => {
                    getvaluefrombatchtable(e, item.LineNumber)
                  }}
                />
              </div></TD>
                    <TD>  <div style={{ width: '11rem'  }}>
                <input
                  type='number'
                  name='BaseLineNumber'
                  class='form-control'
                  id='exampleInputEmail1'
                  readOnly
                  aria-describedby='emailHelp'
                  defaultValue= {item.LineNumber}
                  onChange={e => {
                    getvaluefrombatchtable(e, item.LineNumber)
                  }}
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
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
          
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
                   defaultValue={HeaderData&&HeaderData.Comments}
                  // value={SelectedPRDocEntry && "Based on Quotations: " + SelectedPRDocEntry.DocEntry + ". " + SelectedPRDocEntry.Comments || HeaderData && HeaderData.Comments}
                  type='text'
                  class='form-control rounded-0'
                  id='exampleFormControlTextarea1'
                
                  rows='3'
                />
              </div>
              <div class="form-group" style={{ width: '23.5em', height: 'auto' }}>
              <label for="exampleFormControlTextarea1">Journal Remarks</label>
              <textarea
                  name="Journal_Remarks"
                  onChange={e => {
                    valuechangefunction(e)
                  }}
                  
              defaultValue={HeaderData&&HeaderData.JournalMemo}
                // value={SelectedPRDocEntry && "Based on Quotations: " + SelectedPRDocEntry.DocEntry + ". " + SelectedPRDocEntry.Comments || HeaderData && HeaderData.Comments}
                type='text'
                class='form-control rounded-0'
                id='exampleFormControlTextarea1'
              
                rows='1'
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
        <br />
          
            <br />
            <br />
        </DIV3>
      </CardGroup>
      </Form>
    </>
  )
}
