import React from 'react'
import { CONSTANTS, LINKS } from '../../Utils'
import { Button, CardGroup, Table, Container ,Modal} from 'react-bootstrap'
import NavBar from '../../Component/Global/Navbar'
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import Select from 'react-select'
import { useAlert } from "react-alert";
const axios = require('axios')

export default function ApprovalStatusReport () {
    const [UserDropDown, setUserDropDown] = React.useState()
    const [TemplateDropDown, setTemplateDropDown] = React.useState()
    const [VendorDropDown, setVendorDropDown] = React.useState()
    const [DropDownValues, setDropDownValues] = React.useState()
    const [PrRe, setPrRe] = React.useState()
    const [show, setShow] = React.useState(false)
    const[CheckBoxName,setCheckBoxName]=React.useState()
    const[CheckBoxName2,setCheckBoxName2]=React.useState()
    const[CheckBoxName3,setCheckBoxName3]=React.useState()
    const[ObjectTypeValue,setObjectTypeValue]=React.useState()
    // const[ObjectTypeValue2,setObjectTypeValue2]=React.useState()
    // const[ObjectTypeValue3,setObjectTypeValue3]=React.useState()
    // const[ObjectTypeValue4,setObjectTypeValue4]=React.useState()
    // const[ObjectTypeValue5,setObjectTypeValue5]=React.useState()
    // const[ObjectTypeValue6,setObjectTypeValue6]=React.useState()
    // const[ObjectTypeValue7,setObjectTypeValue7]=React.useState()
    // const[ObjectTypeValue8,setObjectTypeValue8]=React.useState()
    // const[ObjectTypeValue9,setObjectTypeValue9]=React.useState()
    const[DocumentType,setDocumentType]=React.useState()
    const[OrginatorValues,setOrginatorValues]=React.useState()
    const[OrginatorName,setOrginatorName]=React.useState()
    const[DraftEntry,setDraftEntry]=React.useState()
    const[UserCode,setUserCode]=React.useState()

    const API_TYPES = {
        GET: `${LINKS.api}/GetApi`,
        POST: `${LINKS.api}/POSTApi`,
        PATCH: `${LINKS.api}/PATCHApi`
      }
    
      React.useEffect(async () => {
        let cook = await localStorage.getItem('cookie')
       
        ActiveUsers(cook)
        
      }, [])
    const ActiveUsers = async cookie => {
        // -------------------------    Items API GET DATA   ------------------------------------------------------
        await axios
          .post(
            API_TYPES.GET,
    
            { api: LINKS.sap.MasterData.ActiveUsers, cookie: cookie }
          )
          .then(function (res) {
            console.log(res)
            if (res.data.value) {
              let ItemsDropDown = []
    
              res.data.value.forEach(element => {
                ItemsDropDown.push({
                  value: element.UserCode,
                  label: element.UserName
                })
              })
              setUserDropDown(ItemsDropDown)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
     
   const  checkvalue=(e,ObjectType)=>{
//      setDocumentType(e.target.name)
//    setObjectTypeValue(ObjectType)
  
//    console.log(ObjectType)
    }
    // const  DocumentStatusValues=(e)=>{

    //   setCheckBoxName(e.target.name)
     
    //    }
    //    const  StatusDropDownOnChange=(e,index,name)=>{
    //      let obj =PrRe
    //      obj[index][name]=e.value
    //      setStatusDropdown(obj)
    //     console.log(obj)
       
        //  }
        //  const  DropDownTextValueChangeFun=(e,index)=>{
        //    console.log(e.target,index,e.target.value)
        //   let obj =PrRe
        //   obj[index][e.target.name]=e.target.value
        //   setPrRe(obj)
        //  console.log(obj)
        
        //   }
         
    // const handleShow = async () => {
    //     let ItemsResponseResult = {}
    //     const api = `${LINKS.api}/GetApi`
    
    //     let cookie = await localStorage.getItem('cookie')
    //     let SAPapi = `Drafts?$select=CardCode eq '${}' and DocDate eq '${}' and DocDueDate eq '${}'`;
    //     // or ApprovalRequests/ObjectType eq '${ObjectTypeValue2}' or ApprovalRequests/ObjectType eq '${ObjectTypeValue3}' or ApprovalRequests/ObjectType eq '${ObjectTypeValue4}' or ApprovalRequests/ObjectType eq '${ObjectTypeValue5}' or ApprovalRequests/ObjectType eq '${ObjectTypeValue6}' or ApprovalRequests/ObjectType eq '${ObjectTypeValue7}' or ApprovalRequests/ObjectType eq '${ObjectTypeValue8}' or ApprovalRequests/ObjectType eq '${ObjectTypeValue9}'
    //     //and CardCode eq '${PrVendor}' and BPL_IDAssignedToInvoice eq ${SelectedBranch}  and OriginatorID eq '${OrginatorValues}'
    //     console.log(SAPapi);
    
    //     await axios
    //       .post(API_TYPES.GET, {
    //         api: SAPapi,
    //         cookie: cookie
    //       })
    //       .then(function (res) {
    //         setPrRe(res.data.value);
    //         console.log(res.data.value)
         
    //       })
    //       .catch({})
    
    //     setShow(true)
    //   }
      // const DraftFunc = async () => {
      //   let ItemsResponseResult = {}
      //   const api = `${LINKS.api}/GetApi`
    
      //   let cookie = await localStorage.getItem('cookie')
      //   let SAPapi = `Drafts?$select=DocNum,CardCode,CardName,DocObjectCode&$filter=DocEntry eq ${} and DocObjectCode eq ${ObjectTypeValue}`;

      //   //and CardCode eq '${PrVendor}' and BPL_IDAssignedToInvoice eq ${SelectedBranch}  and OriginatorID eq '${OrginatorValues}'
      //   console.log(SAPapi);
    
      //   await axios
      //     .post(API_TYPES.GET, {
      //       api: SAPapi,
      //       cookie: cookie
      //     })
      //     .then(function (res) {
      //       setDraftData(res.data.value);
      //       console.log(res.data.value)
    
      //     })
      //     .catch({})
    
      // }
    //   const handleClose = () => {
    //     setShow(false)
    //   }
    //   const Patch = async (id, body) => {
    //     let cook = await localStorage.getItem('cookie')
    //     if (cook) {
    //       await axios
    //         .post(API_TYPES.PATCH, {
    //           body: body,
    //           api: `ApprovalRequests(${id})`,
    //           cookie: cook
    //         })
    //         .then(function (res) {
    //           console.log(res)
    //         })
    //         .catch(function (error) {
    //           console.log(error)
    //         })
    //     }
    //   }

    //   const submitPatch = async () => {
    //     console.log("PrRe")
    //     console.log(PrRe)
    //   let body=PrRe
    //   // console.log(PrRe.ApprovalRequests)
    //     let docLines = []
    //     PrRe.forEach(element => {
    //     console.log(element)
    //       if(element.Status || element.Remarks ){

    //         let body = {
    //           "ApprovalRequestDecisions": [
    //               {
    //                   Status: element.Status,
    //                   Remarks: element.Remarks
    //               }
    //           ]
            

    //       }
          
    //       console.log('element.ApprovalRequests.Code, body');
          
    //       Patch(element.ApprovalRequests.Code, body)
    //       console.log(element.ApprovalRequests.Code, body)
    //       }
          
    //     })
      
    //      // body["ApprovalRequestDecisions"]= docLines
      
    //    // console.log(PrRe[0].ApprovalRequests.Code,body)
    //     // Patch(PrRe.Code, body)
    //   }

  return (
    <>
      <NavBar />
      <h1 style={{ textAlign: 'center' }}>Document Draft Report</h1>
     
             
              <CardGroup>
                <DIV3>
              <Container fluid>
            <label>Users</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options={UserDropDown} // Options to display in the dropdown
                onChange={(e)=>setUserCode(e.value)} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
              </div><br/>
           
              <br/><br/>
              <div  class="form-check form-check-inline">
                <input class="form-check-input"  name='arsApproved' onChange={e=>setCheckBoxName2(e.target.name)} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label"  for="inlineCheckbox1">Date</label>
             
            </div><br/>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options='' // Options to display in the dropdown
                // onChange={(e)=>DropDownChangeFun(e,'AuthorizerFrom')}// Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div><br/>
            </Container></DIV3>
            <DIV4>
              <Container fluid>
            <div style={{ marginTop: '5%'}} class="form-check form-check-inline">
                <input class="form-check-input" name='arsNotApproved' onChange={e=>setCheckBoxName3(e.target.name)} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Open Only</label>
              </div> 
              </Container>
            </DIV4>
            <DIV3>
              <Container fluid>
            <label>From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                type='date'
                class='form-control'
                name='RequestDateFrom'
                // onChange={e=>TextValueChangeFun(e)}
                aria-describedby='emailHelp'
                // value={HeaderData && HeaderData.DateTo}
              />
            </div><br/>
            <label>To</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                type='date'
                class='form-control'
                name='RequestDateTo'
                // onChange={e=>TextValueChangeFun(e)}
                aria-describedby='emailHelp'
                // value={HeaderData && HeaderData.DateTo}
              />
            </div><br/>
            </Container>
            </DIV3><br/>
              <DIV3>
              <Container fluid>
              <h3  style={{ marginTop: '5%' }}><u>Sales-A/R</u></h3>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='SalesQuotation' onChange={e=>checkvalue(e,'23')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Sales Quotation</label>
              </div><br/> <div class="form-check form-check-inline">
                <input class="form-check-input" name='SalesOrder' onChange={e=>checkvalue(e,'17')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Sales Order</label>
              </div><br/> 
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='Delivery' onChange={e=>checkvalue(e,'15')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Delivery</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='ReturnReq' onChange={e=>checkvalue(e,'234000031')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Return Request</label>
              </div><br/> <div class="form-check form-check-inline">
                <input class="form-check-input" name='Return' onChange={e=>checkvalue(e,'16')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Return</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='A_RDownPayment' onChange={e=>checkvalue(e,'203')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">A/R Down Payment</label>
              </div><br/> <div class="form-check form-check-inline">
                <input class="form-check-input" name='A_RInvoice' onChange={e=>checkvalue(e,'13')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">A/R Invoice</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='A_RCreditMemo' onChange={e=>checkvalue(e,'14')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">A/R Credit Memo</label>
              </div><br/>
              </Container>
              </DIV3>
              <DIV4>

              </DIV4>
              <DIV3>
              <Container fluid>
              <h3 style={{ marginTop: '5%' }}><u>Purchasing-A/P</u></h3>
      <div class="form-check form-check-inline">
                <input class="form-check-input" name='PurchaseRequest' onChange={e=>checkvalue(e,'1470000113')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Purchase Request</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='PurchaseQuotation' onChange={e=>checkvalue(e,'540000006')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Purchase Quotation</label>
              </div><br/> <div class="form-check form-check-inline">
                <input class="form-check-input" name='PurchaseOrder' onChange={e=>checkvalue(e,'22')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Purchase Order</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='GRPO' onChange={e=>checkvalue(e,'20')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Goods Receipt PO</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='GRR' onChange={e=>checkvalue(e,'234000032')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Goods Return Request</label>
              </div><br/> <div class="form-check form-check-inline">
                <input class="form-check-input" name='GR' onChange={e=>checkvalue(e,'21')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Goods Returns</label>
              </div><br/> 
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='A_PDownpayment' onChange={e=>checkvalue(e,'204')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">A/P Down Payment</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='A_PInvoices' onChange={e=>checkvalue(e,'18')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">A/P Invoice</label>
              </div><br/> <div class="form-check form-check-inline">
                <input class="form-check-input" name='A_PCreditMemo' onChange={e=>checkvalue(e,'19')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">A/P Credit Memo</label>
              </div><br/>
              </Container>
              </DIV3>
             
              <DIV3>
              <Container fluid>
              <h3><u>Inventory</u></h3>
      <div class="form-check form-check-inline">
                <input class="form-check-input" name='GoodsReceipt' onChange={e=>checkvalue(e,'59')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Goods Receipt</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='GoodsIssue' onChange={e=>checkvalue(e,'60')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Goods Issue</label>
              </div><br/> <div class="form-check form-check-inline">
                <input class="form-check-input" name='InventoryTransferReq' onChange={e=>checkvalue(e,'1250000001')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Inventory Transfer Request</label>
              </div><br/> 
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='InventoryTransfer' onChange={e=>checkvalue(e,'67')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Inventory Transfer</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='InventoryOpeningBalance' onChange={e=>checkvalue(e,'310000001')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Inventory Opening Balance</label>
              </div><br/>
              </Container>
              </DIV3>
            
              <DIV4>

              </DIV4>
              <DIV3>
              <Container fluid>
              <h3><u>Inventory Counting Transactions</u></h3>
      <div class="form-check form-check-inline">
                <input class="form-check-input" name='InventoryCounting' onChange={e=>checkvalue(e,'1470000065')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Inventory Counting</label>
              </div><br/>
              <div class="form-check form-check-inline">
                <input class="form-check-input" name='InventoryPosting' onChange={e=>checkvalue(e,'10000071')} type="checkbox" id="inlineCheckbox1" value="option1" />
                <label class="form-check-label" for="inlineCheckbox1">Inventory Posting</label>
              </div><br/> 
              </Container>
              </DIV3>
              </CardGroup><br/><br/>
              <div>
              <Container fluid>
              <Button
            //   onClick={handleShow}
              >
                OK
              </Button>
             

            {/* <Modal show={show} onHide={handleClose} className="Modal-big" size="lg">
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Approval Status Report</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {PrRe && (
                  <Table responsive>
                    <TableHead>
                      <tr>
                        <th>#</th>
                        <th>Approval Code</th>
                        <th>Document Type</th>
                        <th>Document No.</th>
                        <th>Draft No.</th>
                        <th>Originator</th>
                        <th>Production Date</th>
                        <th>Production Time</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>BP Code</th>
                        <th>BP Name</th>
                        <th>Draft Key</th>
                       
                      </tr>
                    </TableHead>
                    <tbody>
                      {PrRe.map((item, index) => (
                        <tr key={`${index}`}>
                          <TD>
                            {index + 1}

                          </TD>
                          <TD>{item.ApprovalRequests.Code}</TD>
                          <TD>{DocumentType}</TD>
                          <TD></TD>
                          <TD>{item.Drafts.DocNum}</TD>
                          <TD>{OrginatorName}</TD>
                          <TD>{item.ApprovalRequests.CreationDate}</TD>
                          <TD>{item.ApprovalRequests.CreationTime}</TD>
                          <TD>
                          <div style={{ width: '14em' }}>
                    <Select
                      placeholder= {item.ApprovalRequests.Status}
                      options={[
                        { label: 'Pending', value: 'W' },
                        { label: 'Approved', value: 'Y' },
                        { label: 'Rejected', value: 'N' }
                      ]}// Options to display in the dropdown
                      onChange={e => {
                        StatusDropDownOnChange(e, index, 'Status')
                      }}
                      // onSelect={CostCentre} // Function will trigger on select event
                      // onRemove={CostCentre} //Function will trigger on remove event
                      displayValue='name' // Property name to display in the dropdown options
                    />
                  </div>
                           </TD>
                          <TD>
                          <div style={{ width: '14em', height: 'auto' }}>
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                type='text'
                class='form-control'
                name='Remarks'
                placeholder= {item.ApprovalRequests.Remarks}
                onChange={e=>DropDownTextValueChangeFun(e,index)}
                aria-describedby='emailHelp'
                // value={HeaderData && HeaderData.DateTo}
              />
            </div>
                           </TD>
                          <TD>{item.Drafts.CardCode}</TD>
                          <TD>{item.Drafts.CardName}</TD>
                          <TD>{item.ApprovalRequests.DraftEntry}</TD>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button variant='secondary' onClick={() => {
                  submitPatch()
                }} >
                  Update
               </Button>
                <Button variant='primary' onClick={handleClose}>
                  Cancel
          </Button>
              </Modal.Footer>
            </Modal> */}
              <Button 
            style={{ marginLeft: '5%' }}
            // onClick={() => {
            //   window.location.reload();
            // }}
            >Cancel</Button>
            </Container>
            </div>
    </>

  )
}
