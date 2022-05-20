import React from 'react'
import { Button, Table, Container, Row, Col, Tabs,Tab,Modal ,CardGroup,Card} from 'react-bootstrap'
import Select from 'react-select'
import { useAlert } from "react-alert";
import {  Attachment} from '../../../Component/APDownPaymentRequest';
import { Logo, TextInput, Alert, Navbar } from '../../../Component/Global'
import { CONSTANTS, LINKS } from '../../../Utils'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'

const axios = require('axios')

export default function InventoryGenExit () {
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const alert = useAlert();
  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [attachmentresponse, setattachmentresponse] = React.useState()
  const [priceListDropDown, setPriceListDropDown] = React.useState()
  const [warehouseDropdown, setWarehouseDropdown] = React.useState()
  const [toWarehouseDropdown, setToWarehouseDropdown] = React.useState()
  const [projectsDropDown, setProjectsDropdowon] = React.useState()
  const [costingCodeDropDown, setCostingCodeDropDown] = React.useState()
  const [HeaderData, setHeaderData] = React.useState()
  const [currentDate,setcurrentDate] = React.useState()
  const [show1, setShow1] = React.useState(false)
  const [bothbodies, setbothbodies] = React.useState(false)
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [ButtonName, setButtonName] = React.useState('Add')
  const [ModalHeaderData, setModalHeaderData] = React.useState()
  const [SearchNumber, setSearchNumber] = React.useState("0")
  const [selectedItems, setSelectedItems] = React.useState()
  const [getDate, setgetDate] = React.useState(Date.parse("2022-12-31"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState(
    '0020545074'
  )
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState(
    '0021105591'
  )

  const [getserviceseries, setgetserviceseries] = React.useState()
  const [showA, setShowA] = React.useState(false)


const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' +(new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [warehouse, setWarehouse] = React.useState({})
  const [warehouseTo, setWarehouseTo] = React.useState({})
  const [VendorCodeDropdown, setVendorCodeDropdown] = React.useState()
  const [SelectedVendor, setSelectedVendor] = React.useState()
  const [SalesEmployee, setSalesEmployee] = React.useState()
  const [ContactPersonDropdown, setContactPersonDropdown] = React.useState()
  const [transferRequests, setTransferRequests] = React.useState('')
  const [getdocdate, setgetdocdate] = React.useState()
  const [getduedate, setgetduedate] = React.useState()
  const [gettaxdate, setgettaxdate] = React.useState()
  const [remarks, setRemarks] = React.useState('')
  const [JournalMemoComment, setJournalMemoComment] = React.useState('')
  const [copyTransferModal, setCopyTransferModal] = React.useState(false)
  const [selectedPrice, setSelectedPrice] = React.useState({})
  const [SalesEmployeeCode, setSalesEmployeeCode] = React.useState()
  const [ContactPersonvalue, setContactPersonvalue] = React.useState()
  const [PriceListValue, setPriceListValue] = React.useState()
  const [getnextnumber, setgetnextnumber] = React.useState()
  const [getseriesvalue, setgetseriesvalue] = React.useState()
  const [getStatus, setgetStatus] = React.useState()
  const [getdocumentstatus, setgetdocumentstatus]=React.useState()
  const [getdocumenttype, setgetdocumenttype] = React.useState("1250000001")
  const [getdocumentname, setgetdocumentname] = React.useState("WTQ2");
  const [ModuleName, setModuleName] = React.useState("InventorytransferRequest")
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    SECONDPOST: `${LINKS.api}/SecondDBPOSTApi`,
  }

  React.useEffect(async () => { 
    await setgetdocumentname("WTQ2")
  await setModuleName("InventorytransferRequest")
  await setgetdocumenttype("1250000001")
    setSearchNumber('0')
    setButtonName('Add')
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
      getItemsList(cook)
      getPriceList(cook)
      BusinessPartners(cook)
      // getwareHousesOfBranch(cook)
      SalesEmployeeFun(cook)
      getProjects(cook)
      getCostingCode(cook)
    }
  }, [])
  const Home = () => {
    const alert = useAlert();
  };
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

  const getItemsList = async cookie => {
    const api = `Items?$select=ItemCode,ItemName,InventoryUOM&$filter=InventoryItem eq 'tYES' and Valid eq 'tYES'`

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
          body:JSON.stringify(body),
          api: `InventoryTransferRequests(${id})`,
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
  const submitPatch = async () => {
    let body = {
      Comments: remarks,
      // JournalMemo:JournalMemoComment,
      // AttachmentEntry:attachmentresponse
    }
    console.log(HeaderData.DocEntry, body)
    Patch(HeaderData.DocEntry, body)
    if(HeaderData.DocEntry, body){
      alert("Document Successfully Update")
      window.location.reload();
    }
    else{
      console.log("error")
    }
  }
  //   ===========================================================================================================
  const submit = async () => {
    let docLines = []
    selectedItems.forEach(element => {
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
      DocDate: getdocdate?getdocdate:currentDate,
      DueDate: getduedate?getduedate:currentDate,
      TaxDate: gettaxdate?gettaxdate:currentDate,
      FromWarehouse: warehouse.value,
      ToWarehouse: warehouseTo.value,
      StockTransferLines: docLines,
      CardCode:SelectedVendor,
      ContactPerson:ContactPersonvalue,
      PriceList:PriceListValue,
      JournalMemo:JournalMemoComment,
      Series : getseriesvalue
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
          api: `InventoryTransferRequests`,
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
          api: `InventoryTransferRequests`,
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

    let SAPapi =`BusinessPartners?$select=CardCode,ContactPerson&$filter=CardCode eq  '${SelectedVendor}'`
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
      let sapAPi = `InventoryTransferRequests?$filter=DocumentStatus eq '${getdocumentstatus}' &$orderby=DocNum desc` 
      await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setModalHeaderData(res.data.value)
      })
      .catch({})
    setShow1(true)
    }else{
      let sapAPi = `InventoryTransferRequests?$orderby=DocNum desc` 
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
  const SearchPRNumberFilter = async () => {
    // let obj = TextItemChangedObject
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `InventoryTransferRequests?$filter=DocNum eq ${SearchNumber}`
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
       setHeaderData(res.data.value[0])
       console.log(res.data.value[0])
        setPQDocumentLines(res.data.value[0].StockTransferLines)
        if(res.data.value[0].DocumentStatus == 'bost_Open'){
          setgetStatus("Open")
       }else{
          setgetStatus("Close")
       }
        if(HeaderData!=""){
          setButtonName("Update")
        }
      })
      .catch({})
  }
  const selectPR = async item => {
    setShow1(false)
    setHeaderData(item)
    console.log("zzzzzzz")
    console.log(item)
    setPQDocumentLines(item.StockTransferLines)
    console.log(item.StockTransferLines)
    if(item.DocumentStatus == 'bost_Open'){
      setgetStatus("Open")
      setButtonName('Update')
   }else{
      setgetStatus("Close")
      setButtonName('OK')
   }
  }
  const ItemsDropDownfunc = async (selectedList,e) => {  
    setSelectedItems(selectedList)
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
  return (
    <>
      <Navbar 
      setgetserviceseries={setgetserviceseries}
      getdocumentname={getdocumentname}
      getdocumenttype={getdocumenttype}
              ModuleName={ModuleName}
      />
      <h1 style={{ textAlign: 'center' }}>Inventory Transfer Request</h1>
      <CardGroup>
      <DIV3>
      <Container fluid> 
         <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>From Warehouse </label>
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
                 placeholder={HeaderData && HeaderData.ToWarehouse}
                onChange={e => {
                  warehouseSelection(e, 'toWareHouse')
                }}
                options={toWarehouseDropdown}
              />
            {/* )} */}
            </div><br/>
             
            {/* {warehouseDropdown && ( */}
              {/* <Button
                onClick={() => {
                  copyToModal()
                }}
              >
                Copy From
              </Button> */}
            {/* )} */}
            <br/>
           <label>Business Partner</label>
            <div style={{ width: '23.5rem', height: 'auto' }} variant='primary' onClick={BusinessPartners}>
              <Select
                placeholder={HeaderData && HeaderData.CardCode}
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
            <div style={{ width: '23.5rem', height: 'auto'  }}>
          <label>Price List</label>
            <Select
              placeholder={HeaderData && HeaderData.PriceList}
              onChange={e => {
                setSelectedPrice(e)
                setPriceListValue(e.value)
              }}
              options={priceListDropDown}
            />
         </div> <br/>
          <label>Select Item(s)</label>
                <div style={{ width: '23.5rem', height: 'auto' }}>
                  {/* {ItemsDropDown && ( */}
                    <Select
                      isMulti
                      placeholder='Select Items'
                      options={ItemsDropDown} // Options to display in the dropdown
                      onChange={e => { ItemsDropDownfunc(e) }} // Function will trigger on select event
                      // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                  {/* )} */}
                </div>
            <br />
        <Modal
          show={copyTransferModal}
          onHide={() => setCopyTransferModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Copy Transfer Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Transfer Requests
            {transferRequests && (
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>DocEntry</th>
                    <th>DocNum</th>
                    <th>DocDate</th>
                  </tr>
                </thead>
                <tbody>
                  {transferRequests.map((item, index) => (
                    <tr key={`${index}`}   onClick={e => {
                      console.log(item)
                      // setSelectedItems(item.StockTransferLines)
                      setCopyTransferModal(false)
                    }}>
                      <td>
                        {index + 1}
                      
                      </td>
                      <td>{item.DocEntry}</td>
                      <td>{item.DocNum}</td>
                      <td>{item.DocDate}</td>
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
        <div className="stock"
              style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' ,border:'1px solid',borderColor:'lightgray',borderRadius:'4px'}}
            >
              <a onClick={e => {
                  SearchAll_Filter_Data()
                }} style={{cursor:'pointer'}}> <svg class="svg-icon24" viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg></a>
        <input
              name={'SearchPRNumber'}
              type='Number'
              placeholder='Number'
              class='form-control24'
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
            <br/>
            <Modal show={show1} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Open Inventory Transfer Request List</Modal.Title>
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
    
            <div style={{ width: '23.5rem', height: 'auto' ,marginLeft:'3rem'}}>
              <label>Posting Date</label>
    
         <input
           type='date'
           class='form-control'
           defaultValue={HeaderData && HeaderData.DocDate ? HeaderData && HeaderData.DocDate :currentDate }
           onChange={e => {
            setgetdocdate(e.target.value)
           }}
         ></input>
</div>
<div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem'}}>
      <label>Due Date</label>
      
         <input
           defaultValue={HeaderData && HeaderData.DueDate ? HeaderData && HeaderData.DueDate :currentDate }
           type='date'
           class='form-control'
           onChange={e => {
            setgetduedate(e.target.value)
           }}
         ></input>
</div>
 <div style={{ width: '23.5rem', height: 'auto',marginLeft:'3rem' }}>
<label>Document Date</label>
     
         <input
           type='date'
           defaultValue={HeaderData && HeaderData.TaxDate ? HeaderData && HeaderData.TaxDate :currentDate }
           class='form-control'
           onChange={e => {
             setgettaxdate(e.target.value)
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
      
{selectedItems && (
      <Table  responsive striped bordered hover>
          { Array.isArray(selectedItems) && selectedItems.length>0?(
        <thead>
          <tr>
          <th>#</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>From Warehouse</th>
            <th>To Warehouse</th>
            <th>Quantity</th>
            <th>UoM Code</th>
          </tr>
        </thead>
         ):null}
        <tbody>
          {selectedItems &&
            selectedItems.map(
              (item, index) =>
                item.LineStatus === 'bost_Open' && (
                  <tr key={`${index}`}>
                      <td>{index + 1}</td>
                    <td>{item.ItemCode}</td>
                    <td>{item.ItemDescription}</td>
                    <td>
                    <div style={{width:'15em'}}>
                      {warehouseDropdown && (
                        <Select
                        menuPortalTarget={document.body}
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
                    </td>
                    <td>
                    <div style={{width:'15em'}}>
                      {warehouseDropdown && (
                        <Select
                        menuPortalTarget={document.body}
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
                    </td>
                    {/* Quantity */}
                    <td>
                      <div style={{width:'15em'}}>
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
                    </td>
                    <td>{item.MeasureUnit}</td>
                  
                  </tr>
                )
            )}
        </tbody>
        </Table>
)}
{PQDocumentLines && (
      <Table  responsive striped bordered hover>
           { Array.isArray(PQDocumentLines) && PQDocumentLines.length>0?(
        <thead>
          <tr>
          <th>#</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>From Warehouse</th>
            <th>To Warehouse</th>
            <th>Quantity</th>
            <th>UoM Code</th>
          </tr>
        </thead>
         ):null}
        <tbody>
          { PQDocumentLines.map(
              (item, index) =>
                item.LineStatus === 'bost_Open' && (
                  <tr key={`${index}`}>
                      <td>{index + 1}</td>
                    <td>{item.ItemCode}</td>
                    <td>{item.ItemDescription}</td>
                    <td>
                    <div style={{width:'15em'}}>
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
                    </td>
                    <td>
                    <div style={{width:'15em'}}>
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
                    </td>
                    {/* Quantity */}
                    <td>
                      <div style={{width:'15em'}}>
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
                    </td>
                    <td>{item.MeasureUnit}</td>
                  
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
      
     
             <div  style={{ width: '23.5em', height: 'auto' }} class="form-group">
  <label for="exampleFormControlTextarea1">Remarks</label>
  <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="3"  onChange={e => {
                setRemarks(e.target.value)
              }}
              type='text'
              defaultValue={HeaderData && HeaderData.Comments}
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
