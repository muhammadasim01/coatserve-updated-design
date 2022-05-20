import React from 'react'
import {
  Button,
  CardGroup,
  Table,
  Container,
  Navbar,
  Modal
} from 'react-bootstrap'
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../../Component/Global/Navbar';

//import {Attachment, Summary,General,Competitors,Partner,Stages,Potential} from '../../../Component/SalesOpportunities';
import { LINKS } from '../../../Utils';


import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import './index.css'
const axios = require('axios')
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function PurchaseRequest () {
  const classes=useStyles();
  const [show, setShow] = React.useState(false)
  const [UpdatePurchaseRequest, setUpdatePurchaseRequest] = React.useState()
  const [PRDocumentLines, setPRDocumentLines] = React.useState()

  const [SearchPR, setSearchPR] = React.useState()

  const [TextItemChangedObject, setTextItemChangedObject] = React.useState({})

  const [ItemsDropDown, setItemsDropDown] = React.useState()
  const [ItemsDetails, setItemsDetails] = React.useState()
  const [DropDownItemsDetails, setDropDownItemsDetails] = React.useState()
  const [SelectedItems, setSelectedItems] = React.useState()
  const [PRBody, setPRBody] = React.useState({})
  const [ReqType, setReqType] = React.useState()
  const [RequesterCodeDropdown, setRequesterCodeDropdown] = React.useState()
  const [Bra, setBra] = React.useState()
  const [BrancheCodeDropdown, setBrancheCodeDropdown] = React.useState()
  const [PrVendor, setPrVendor] = React.useState()
  const [PrProject, setPrProject] = React.useState()
  const [PrCost, setPrCost] = React.useState()
  const [PrBuyer, setPrBuyer] = React.useState()
  const [PrOwner, setPrOwner] = React.useState()
  const [PrWhse, setPrWhse] = React.useState()
  const [TodayDate, setTodayDate] = React.useState()
  const [SelectedPRDocEntry, setSelectedPRDocEntry] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [OwnerPrRe, setOwnerPrRe] = React.useState()
  const [Disply, setDisply] = React.useState(false);
  const [ButtonDropdown, setButtonDropdown]= React.useState()

  const selectRow = {
    mode: 'radio ',
    clickToSelect: true
  };
  
  const [post,setPost]=React.useState(null);
  const [PQDocumentLines, setPQDocumentLines] = React.useState([])
  const [loading,setLoading]=React.useState(false);
  

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
    if (cook) GetItems(cook)
    Branches(cook)
    Vendor(cook)
    Project(cook)
    CostCentre(cook)
    Buyer(cook)
    Owner(cook)
    Whse(cook)
    PurchaseRequest(cook)
    OwnerPurchaseRequest(cook)
  }, [])
  

  const OwnerhandleClose = () => setDisply(false);
  const OwnerhandleShow = () => setDisply(true);

  const GetItems = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.purchaseItems,
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
          // LegalText:element.LegalText,
          RequriedDate: element.RequriedDate,
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
  const Branches = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.Branches,
        cookie: cookie
      })
      .then(function (res) {
        setBra(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.BPLID,
              label: element.BPLID + ' : ' + element.BPLName
            })
          })
          setBrancheCodeDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // const GetUsers = async (cookie) => {
  //     let ItemsResponseResult = {}
  //     const api = `${LINKS.api}/GetApi`;

  //     // -------------------------    Items API GET DATA   -----------------------------------------------------------
  //     await axios.post(api, { api: LINKS.sap.PurchaseRequest.purchaseItems, cookie: cookie }).then(function (ItemsResponse) {
  //         ItemsResponseResult = ItemsResponse
  //     }).catch(function (error) {
  //         console.log(error);
  //     });
  //     let res = apiProcessing(ItemsResponseResult);
  //     if (res) {
  //         let ItemsDropDown = []
  //         let ItemsDetails = []

  //         res.forEach(element => {
  //             ItemsDetails[element.ItemCode] = {
  //                 ItemCode: element.ItemCode,
  //                 ItemName: element.ItemName,
  //                 PurchaseUnit: element.PurchaseUnit,
  //                 Quantity: 1,
  //             }
  //             ItemsDropDown.push({ id: element.ItemCode, name: (element.ItemCode + " : " + element.ItemName) });
  //         });
  //         await setItemsDropDown(ItemsDropDown);
  //         await setItemsDetails(ItemsDetails);
  //     }
  // }

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
      console.log(res)
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
        alert(
          `Items Details Response Error : <-- ${res.data.error.message.value} -->`
        )
        return null
      }
    }
  }
  const ItemsDropDownfunc = async (selectedList, selectedItem) => {
    let list = []
    selectedList.forEach(element => {
      list.push(element.id)
    })
    await setSelectedItems(list)
  }
  const requesterDropDownfunc = async (selectedList, selectedItem) => {
    let prBody = PRBody
    prBody['ReqType'] = `${selectedList[0].id}`
    setPRBody(prBody)
    let api = ''
    if (selectedList[0].id === 171) {
      api = LINKS.sap.PurchaseRequest.emplyeeInfo
    } else {
      api = LINKS.sap.PurchaseRequest.users
    }
    let cook = await localStorage.getItem('cookie')
    if (cook) GetRequesterDetail(cook, api)
  }
  const RequesterCodeDropdownfunc = async (selectedList, selectedItem) => {
    let prBody = PRBody
    prBody['Requester'] = `${selectedList[0].id}`
    setPRBody(prBody)
  }
  const RequiredQuantity = (e, item) => {
    let reqQuantity = ItemsDetails
    reqQuantity[item][e.target.name] = parseInt(e.target.value)
    setItemsDetails(reqQuantity)
  }
  {
    /* Table API's Call++++++++ */
  }
  const Vendor = async (cookie, e) => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------

    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.Vendor,
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
                element.LastName +
                ' : ' +
                element.eMail
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
        // console.log(res)
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

  const requireDateChange = async e => {
    let newItemDetail = ItemsDetails
    let prBody = PRBody
    let name = e.target.name
    let value = e.target.value

    SelectedItems.forEach(item => {
      newItemDetail[item]['ReqDate'] = value
    })

    await setItemsDetails(newItemDetail)
    prBody[name] = value
    setPRBody(prBody)
  }
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: body,
          api: `PurchaseRequests(${id})`,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const _submitPR = async () => {
    let DocLines = []
    let body = PRBody
    SelectedItems.forEach(element => {
      DocLines.push({
        ItemCode: ItemsDetails[element]['ItemCode'],
        ItemName: ItemsDetails[element]['ItemName'],
        PurchaseUnit: ItemsDetails[element]['PurchaseUnit'],
        FreeText: ItemsDetails[element]['FreeText'],
        // LegalText: ItemsDetails[element]["LegalText"],
        RequriedDate: ItemsDetails[element]['RequriedDate'],
        RequiredQuantity: ItemsDetails[element]['RequiredQuantity'],
        BaseOpenQuantity: ItemsDetails[element]['BaseOpenQuantity'],
        U_MPrice: ItemsDetails[element]['U_MPrice'],
        //  LineVendor: ItemsDetails[element]["LineVendor"],
        // CostingCode: ItemsDetails[element]["CostingCode"],
        // SalesPersonCode: ItemsDetails[element]["SalesPersonCode"],
        // WarehouseCode: ItemsDetails[element]["WarehouseCode"],
        CostingCode: 1,
        ProjectCode: '10003',
        SalesPersonCode: -1
      })
      console.log('body')
      console.log(body)
    })
    body['DocumentLines'] = DocLines
    body['BPL_IDAssignedToInvoice'] = 1

    body['SendNotification'] = 'tNO'

    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: body,
          api: LINKS.sap.PurchaseRequest.PurchaseRequest,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const PurchaseRequest = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    
    console.log("set loading true")
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.PurchaseRequest.PurchaseRequest,
        cookie: cookie
      })
      .then(function (res) {
        setPrRe(res.data.value)
        console.log("set loading false")
      
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
        console.log(res.data.value)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const submitPR = async () => {
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
      Comments: 'VSCOde patch',
      DocumentLines: docLines
    }

    Patch(SelectedPRDocEntry.DocEntry, body)
  }
  const ontextChanged = (e, index) => {
    let doclines = PQDocumentLines
    doclines[index][e.target.name] = e.target.value
    setPQDocumentLines(doclines)
  }
  const PostingDate = e => {
    let prBody = PRBody
    prBody[e.target.name] = e.target.value

    setPRBody(prBody)
    console.log(prBody)
  }

  //   const PurchaseRequest = async (cookie) => {
  //     // -------------------------    Items API GET DATA   ------------------------------------------------------
  //     await axios.post(
  //         API_TYPES.GET,
  //         { api: LINKS.sap.PurchaseRequest.PurchaseRequest, cookie: cookie }
  //         ).then(function (res) {
  //         setUpdatePurchaseRequest(res.data.value)
  //             console.log("ZZZZZZZZZ");
  //             console.log(res);
  //             console.log("ZZZZZZZz");
  //     }).catch(function (error) {
  //         console.log(error);
  //     });
  // };
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = async cookie => {
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`
    console.log(API_TYPES.GET)
    setLoading(true)
  
    await axios
      .post(API_TYPES.GET, {
        api: LINKS.sap.MasterData.ActivePurchaseItems,
        cookie: cookie
      })
      .then(function (ItemsResponse) {
        ItemsResponseResult = ItemsResponse
        setLoading(false)
      })
      .catch({})

    setShow(true)
  }
  const selectPR = async item => {
    setShow(false)
    setSelectedPRDocEntry(item)
    setPQDocumentLines(item.DocumentLines)
  }
  const ontextItemChanged = e => {
    let obj = TextItemChangedObject
    obj[e.target.name] = e.target.value
    setTextItemChangedObject(obj)
  }

  const SearchPRNumberFilter = async () => {
    let obj = TextItemChangedObject
    console.log(obj.SearchPRNumber)
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `PurchaseRequests?$filter=DocNum eq ${obj.SearchPRNumber}`

    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log(res)
        setPQDocumentLines(res.data.value[0].DocumentLines)
        console.log(PQDocumentLines)
      })
      .catch({})
  }
  const DocLinesDropDownOnChange = (selectedItem,index, name) => {
    console.log(selectedItem)
    let itemDetail = PQDocumentLines
    itemDetail[index][name]= selectedItem.value
    console.log(itemDetail)
    setDropDownItemsDetails(itemDetail);
  }

  return (
    <>
       <NavBar />
      {loading && <Backdrop className={classes.backdrop} open>
            <CircularProgress color="inherit"/>
            </Backdrop>}
      <h1 style={{ textAlign: 'center' }}>Update PurchaseRequest</h1>
      {/* Upper Side++++++++ */}
      <Button variant='primary' onClick={handleShow}>
        UpdatePR
      </Button>
<div>
      <Modal show={show} onHide={handleClose} className="Modal-big" size="lg"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Purchase Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Purchase Request Data!
         
          {PrRe && (
            <Table responsive>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>DocEntry</th>
                  <th>DocNum</th>
                  <th>DocDate</th>
                </tr>
              </TableHead>
              <tbody>
                {PrRe.map((item, index) => (
                  <tr key={`${index}`}  onClick={e => {
                    selectPR(item)
                    handleClose()
                  }}>
                    <TD>
                      {index + 1}
                      
                    </TD>
                    <TD>{item.DocEntry}</TD>
                    <TD>{item.DocNum}</TD>
                    <TD>{item.DocDate}</TD>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <CardGroup>
        <DIV3>
          <Container fluid>
            <label>Requester</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options={[
                  { label: 'User', value: 12 },
                  { label: 'Employee', value: 171 }
                ]} // Options to display in the dropdown
                // onSelect={requesterDropDownfunc} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />

            </div><br />
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label> Requester Code</label>
              <input
              value={SelectedPRDocEntry && SelectedPRDocEntry.Requester}
                type='text'
                class='form-control'
                id='Requesterid'
                aria-describedby='Requesterid'
                placeholder='Code'
              ></input>
            </div>
            <br />
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Requester Name</label>
              <input
              value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterName}
                type='text'
                class='form-control'
                id='RequesterN'
                aria-describedby='RequesterN'
                placeholder=''
              ></input>
            </div>
            <br />
         
            {/* <label>Select Requester</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder='Select Requester'
                options={RequesterCodeDropdown} // Options to display in the dropdown
                // onSelect={RequesterCodeDropdownfunc} // Function will trigger on select event
                // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div> */}
             
             <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Email</label>
              <input
              value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='e-mail'
                class='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder=''
              ></input>
            </div>
            <br />
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Branch</label>
              <input
              value={SelectedPRDocEntry ? SelectedPRDocEntry.BPLName
              :'null'
              }
                type='text'
                class='form-control'
                id='Branch'
                aria-describedby='B'
                placeholder=''
              ></input>
            </div>
            <br />
            {/* <label>Select Item(s)</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              {ItemsDropDown && (
                <Select
                  isMulti
                  placeholder='Select Items'
                  options={ItemsDropDown} // Options to display in the dropdown
                  // onSelect={ItemsDropDownfunc} // Function will trigger on select event
                  // onRemove={ItemsDropDownfunc} // Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              )}
            </div>
            <br /> */}
          </Container>
        </DIV3>
        <DIV4></DIV4>
        <DIV3>
          <Container>
          <div style={{width:'23.5rem'}}>
            <input
              name={'SearchPRNumber'}
              type='Number'
              placeholder=''
              class='form-control'
              onChange={e => {
                ontextItemChanged(e)
              }}
            />
            </div><br/>
              <Button
                onClick={e => {
                  SearchPRNumberFilter()
                }}
              >
                Search
              </Button>
              <br/>
          <div style={{width:'23.5rem'}}>
            <label>No</label>
            <input type='number'
            class='form-control'
            readOnly='readOnly'
            value={SelectedPRDocEntry && SelectedPRDocEntry.DocNum}
            />
            </div>
           
            <div style={{width:'23.5rem'}}>
            <label> Status</label>
            <input
              type='text'
              class='form-control'
              placeholder={
                SelectedPRDocEntry
                  ? SelectedPRDocEntry.DocumentStatus
                  : 'Status'
              }
            />
            </div>
          
            <div style={{width:'23.5rem'}}>
            <label> Posting Date</label>
            <input type='date' name='DocDate' 
            class='form-control'
              value={
              SelectedPRDocEntry
                && SelectedPRDocEntry.DocDate
              }  
            
            />
           </div>
            <div style={{width:'23.5rem'}}>
            <label> Valid Date</label>
            <input
              type='date'
              name='DocDueDate'
              class='form-control'
              value={
                SelectedPRDocEntry
                  && SelectedPRDocEntry.DocDueDate
                }  
              onChange={e => {
                dateChange(e)
              }}
            />
            </div>
            <div style={{width:'23.5rem'}}>
            <label>Required Date</label>
            <input
              type='date'
              name='RequriedDate'
              class='form-control'
              value={
                SelectedPRDocEntry
                  && SelectedPRDocEntry.RequriedDate
                }  
              onChange={e => {
                requireDateChange(e)
              }}
            />
          
            </div>
          </Container>
        </DIV3>
      </CardGroup>
      
      {/* <Navbar   expand="lg" style={{backgroundColor:'dodgerblue',marginTop:'5%'}}>
      <Navbar.Brand ><button  onClick={e => {
        setButtonDropdown('General')
      }}>General</button></Navbar.Brand>
      <Navbar.Brand ><button  onClick={e => {
        setButtonDropdown('Potential')
      }}>Potential</button></Navbar.Brand>
     
      <Navbar.Brand ><button  onClick={e => {
        setButtonDropdown('Stages')
      }}>Stages</button></Navbar.Brand>
      <Navbar.Brand ><button  onClick={e => {
        setButtonDropdown('Partner')
      }}>Partners</button></Navbar.Brand>
      <Navbar.Brand ><button  onClick={e => {
        setButtonDropdown('Competitors')
      }}>Competitors</button></Navbar.Brand>
      <Navbar.Brand ><button  onClick={e => {
        setButtonDropdown('Summary')
      }}>Summary</button></Navbar.Brand>
      <Navbar.Brand ><button  onClick={e => {
        setButtonDropdown('Attachments')
      }}>Attachments</button></Navbar.Brand>
    
    </Navbar>

    {ButtonDropdown == 'Attachments' && <Attachment/> }
    
    {ButtonDropdown == 'Summary' && <Summary/> }

    {ButtonDropdown == 'General' && <General/> }

    {ButtonDropdown == 'Competitors' && <Competitors/> }

    {ButtonDropdown == 'Partner' && <Partner/> }

    {ButtonDropdown == 'Potential' && <Potential/> }

    {ButtonDropdown == 'Stages' && <Stages/> }




<br/>
<br/>
<br/> */}
     
      {/* Table+++++++++ */}
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
              {/* <th>Legal Text</th> */}
              <th>Requried Date</th>
              <th>Requried Qty</th>
              <th>Open Qty</th>
              <th>Market Price</th>
              {/* <th>Budget Price</th>
                            <th>Last Purchase Price</th> */}
              <th>Vendor</th>
              <th>Project</th>
              <th>Cost Centre</th>
              {/* <th>Owner</th> */}
              <th>Buyer</th>
              <th>Whse</th>
            </tr>
          </TableHead>
          <tbody>
            {PQDocumentLines.map((item, index) => (
              <tr key={`${index}`}>
                <TD>{index + 1}</TD>
                <TD></TD>
                <TD>{item.ItemCode}</TD>
                <TD>{item.ItemDescription}</TD>
                <TD>{item.MeasureUnit}</TD>
                <TD>
                  <div style={{width:'14rem',height:'auto'}}>
                  <input
                    type='text'
                    class='form-control'
                    id='Requesterid'
                    aria-describedby='Requesterid'
                    placeholder={item.FreeText}
                    onChange={e => {
                      ontextChanged(e, index)
                    }}
                  />
                  </div>
                </TD>
                {/* <TD>Legal Text</TD> */}
                <TD>
                <div style={{width:'14rem',height:'auto'}}>
                  <input
                    type='date'
                    class='form-control'
                    id='Requesterid'
                    aria-describedby='Requesterid'
                    value={item.RequiredDate}
                    onChange={e => {
                      ontextChanged(e, index)
                    }}
                  />
                  </div>
                </TD>
                <TD>
                <div style={{width:'14rem',height:'auto'}}>
                  <input
                    type='number'
                    class='form-control'
                    id='Requesterid'
                    aria-describedby='Requesterid'
                    placeholder={item.Quantity}
                    onChange={e => {
                      ontextChanged(e, index)
                    }}
                  />
                  </div>
                </TD>
                <TD>
                <div style={{width:'14rem',height:'auto'}}>
                  <input
                    type='number'
                    readOnly="readOnly"
                    class='form-control'
                    id='Requesterid'
                    aria-describedby='Requesterid'
                    value= {item.RemainingOpenQuantity}
                   
                  />
                  </div>
                 </TD>
                <TD>
                <div style={{width:'14rem',height:'auto'}}>
                  <input
                    type='number'
                    class='form-control'
                    id='Requesterid'
                    aria-describedby='Requesterid'
                    value={item.U_MPrice}
                    
                    onChange={e => {
                      ontextChanged(e, index)
                    }}
                  />
                  </div>
                </TD>
                <TD>
               <div style={{ width: '15em' }}>
                  {PrVendor && (
                      <Select
                        value={PrVendor.filter(
                          option => option.value === item.LineVendor
                        )}
                      placeholder='Select..'
                      options={PrVendor} // Options to display in the dropdown
                      onChange={e => {
                        DocLinesDropDownOnChange(e,index, 'LineVendor')
                      }}
                      // onSelect={Project} // Function will trigger on select event
                      // onRemove={Project} //Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                    )  }
                  </div>
                </TD>
                <TD>
               <div style={{ width: '14rem' }}>
                  {PrProject && (
                      <Select
                        value={PrProject.filter(
                          option => option.value === item.ProjectCode
                        )}
                      placeholder='..'
                      options={PrProject} // Options to display in the dropdown
                      onChange={e => {
                        DocLinesDropDownOnChange(e, index, 'ProjectCode')
                      }}
                      // onSelect={Project} // Function will trigger on select event
                      // onRemove={Project} //Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                    )  }
                  </div>
                </TD>
                <TD>
                  <div style={{ width: '14rem' }}>
                    {PrCost && (
                      <Select
                        value={PrCost.filter(
                          option => option.value === item.CostingCode
                        )}
                        placeholder='Select..'
                        options={PrCost} // Options to display in the dropdown
                        onChange={e => {
                          DocLinesDropDownOnChange(e, index, 'CostingCode')
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
                    {PrBuyer && (
                      <Select
                        value={PrBuyer.filter(
                          option => option.value === item.SalesPersonCode
                        )}
                        placeholder='Select..'
                        options={PrBuyer} // Options to display in the dropdown
                        onChange={e => {
                          DocLinesDropDownOnChange(e, index, 'SalesPersonCode')
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
                    {PrWhse && (
                      <Select
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {/* Bottom Side+++++++++ */}

      <DIV3>
        <Container fluid>
        <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Owner</label>
              {/* <button style={{float:'right'}} class="btn btn-light" type="submit" onClick={OwnerhandleShow}>Change</button> */}
              <div class="input-group mb-3">
              <div style={{ width: '23.5rem', height: 'auto' }}>
              {PrOwner && (
            <Select
            value={PrOwner.filter(
              option => option.label === option.FirstName +
              ' : ' +
              option.LastName
            )}
              placeholder='Select..'
              options={PrOwner} // Options to display in the dropdown
              // onSelect={Owner} // Function will trigger on select event
              // onRemove={Owner} //Function will trigger on remove event
              displayValue='name' // Property name to display in the dropdown options
            />
            )}
               
            </div>
             <Modal show={Disply} onHide={OwnerhandleClose} animation={false} size="lg" className="Modal-big">
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
          {OwnerPrRe && (
            <Table responsive>
              <TableHead>
                <tr>
                  <th>#</th>
                  <th>EmployeeID</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>eMail</th>
                </tr>
              </TableHead>
              <tbody>
                {OwnerPrRe.map((item, index) => (
                  <tr key={`${index}`}>
                    <TD>
                      {index + 1}
                      <Button
                        onClick={e => {
                          OwnerhandleClose()
                        }}
                      >
                        Select
                      </Button>
                    </TD>
                    <TD>{item.EmployeeID}</TD>
                    <TD>{item.FirstName}</TD>
                    <TD>{item.LastName}</TD>
                    <TD>{item.eMail}</TD> 
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={OwnerhandleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={OwnerhandleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              </div>
            </div>
          
            <br />
           
            
          
          {/* <label>Owner</label>
          <div style={{ width: '23.5rem', height: 'auto' }}>
          {PrOwner && (
            <Select
            value={PrOwner.filter(
              option => option.label === option.FirstName +
              ' : ' +
              option.LastName
            )}
            // ={props.options.filter(option => option.label === 'Some label')}

              placeholder='Select..'
              options={PrOwner} // Options to display in the dropdown
              // onSelect={Owner} // Function will trigger on select event
              // onRemove={Owner} //Function will trigger on remove event
              displayValue='name' // Property name to display in the dropdown options
            />
          )}
          </div> */}
                 <div class="form-group">
  <label for="exampleFormControlTextarea1">Remarks</label>
  <textarea class="form-control rounded-0" id="exampleFormControlTextarea1" rows="3" 
  value={SelectedPRDocEntry && SelectedPRDocEntry.Comments}/>
</div>
          <br />
          <br />
          <br />
          <br />
          <div>
            <Button
              onClick={() => {
                submitPR()
              }}
            >
              Update
            </Button>
            <Button style={{ marginLeft: '5%' }}>Cancel</Button>
          </div>
        </Container>
      </DIV3>
    </>
  )
}
