import React from 'react'
import { CONSTANTS, LINKS } from '../../../Utils'
import { Button, CardGroup, Table, Tab, Tabs, Container, Modal, Card } from 'react-bootstrap'
import NavBar from '../../../Component/Global/Navbar'
import { ImArrowRight } from "react-icons/im";
import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import {
  Attachment,
  Logistics,
  Accounting
} from '../../../Component/GRPO';
import Select from 'react-select'
import { useAlert } from "react-alert";
import Header from '../../../Component/Global/Navbar'
const axios = require('axios')
export default function ApprovalStatusReport() {
  const [UserDropDown, setUserDropDown] = React.useState()
  const [TemplateDropDown, setTemplateDropDown] = React.useState()
  const [VendorDropDown, setVendorDropDown] = React.useState()
  const [DropDownValues, setDropDownValues] = React.useState()
  const [getdraftdocumentnumber, setgetdraftdocumentnumber] = React.useState()
  const [UserCode, setUserCode] = React.useState()
  const [PrRe, setPrRe] = React.useState()
  const [show, setShow] = React.useState(false)
  const [show2, setShow2] = React.useState(false)
  const [getDate, setgetDate] = React.useState(Date.parse("2022-2-1"))
  const [TestGetInstallationNumber, setTestGetInstallationNumber] = React.useState('0020545074')
  const [LiveGetInstallationNumber2, setLiveGetInstallationNumber2] = React.useState('0021105591')
  const [currentComDate, setcurrentComDate] = React.useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())
  const [CheckBoxName, setCheckBoxName] = React.useState(false)
  const [CheckBoxName2, setCheckBoxName2] = React.useState(false)
  const [CheckBoxName3, setCheckBoxName3] = React.useState(false)
  const [HeaderData, setHeaderData] = React.useState()
  const [DocumentLines, setDocumentLines] = React.useState()
  const [ObjTypeValue, setObjTypeValue] = React.useState()
  const [DocumentType, setDocumentType] = React.useState()
  const [OrginatorValues, setOrginatorValues] = React.useState()
  const [OrginatorName, setOrginatorName] = React.useState()
  const [DraftEntry, setDraftEntry] = React.useState()
  const [DraftType, setDraftType] = React.useState()
  const [currentDate, setcurrentDate] = React.useState()
  const [ButtonNameChange, setButtonNameChange] = React.useState()
  const [StatusDropdown, setStatusDropdown] = React.useState()
  //-------------------Sales Modules-----------------------
  const [SalesQuotation, setSalesQuotation] = React.useState(false)
  const [SalesOrder, setSalesOrder] = React.useState(false)
  const [Delivery, setDelivery] = React.useState(false)
  const [ReturnReq, setReturnReq] = React.useState(false)
  const [Return, setReturn] = React.useState(false)
  const [A_RDownPayment, setA_RDownPayment] = React.useState(false)
  const [A_RInvoice, setA_RInvoice] = React.useState(false)
  const [A_RCreditMemo, setA_RCreditMemo] = React.useState(false)
  //-------------------Purchasing Modules-----------------------
  const [PurchaseRequest, setPurchaseRequest] = React.useState(false)
  const [PurchaseQuotation, setPurchaseQuotation] = React.useState(false)
  const [PurchaseOrder, setPurchaseOrder] = React.useState(false)
  const [GoodsReceiptPO, setGoodsReceiptPO] = React.useState(false)
  const [GoodsReturnRequest, setGoodsReturnRequest] = React.useState(false)
  const [GoodsReturns, setGoodsReturns] = React.useState(false)
  const [A_PDownpayment, setA_PDownpayment] = React.useState(false)
  const [A_PInvoices, setA_PInvoices] = React.useState(false)
  const [A_PCreditMemo, setA_PCreditMemo] = React.useState(false)
  //-------------------Inventory Modules-----------------------
  const [GoodsReceipt, setGoodsReceipt] = React.useState(false)
  const [GoodsIssue, setGoodsIssue] = React.useState(false)
  const [InventoryTransferRequest, setInventoryTransferRequest] = React.useState(false)
  const [InventoryTransfer, setInventoryTransfer] = React.useState(false)
  const [InventoryOpeningBalance, setInventoryOpeningBalance] = React.useState(false)
  //-------------------Payment Modules-----------------------
  const [OutgoingPayment, setOutgoingPayment] = React.useState(false)
  //-------------------Blanket Agreement-----------------------
  const [SalesBlanketAgreement, setSalesBlanketAgreement] = React.useState(false)
  const [PurchaseBlanketAgreement, setPurchaseBlanketAgreement] = React.useState(false)
  //-------------------Inventory Counting Transactions-----------------------
  const [InventoryCounting, setInventoryCounting] = React.useState(false)
  const [InventoryPosting, setInventoryPosting] = React.useState(false)

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

  React.useEffect(async () => {
    today()
    compareDate()
    let cook = await localStorage.getItem('cookie')
    ActiveUsers(cook)
    ApprovalTemplate(cook)
    BusinessPartners(cook)
    UserCodeFun(cook)
  }, [])
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
  const ActiveUsers = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,
        { api: LINKS.sap.MasterData.ActiveUsers, cookie: cookie }
      )
      .then(function (res) {
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.InternalKey,
              label: element.UserName
            })
          })
          console.log(ItemsDropDown)
          setUserDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
          console.log(currentComDate)
          console.log(getDate)

          alert.error("License Expired")
          window.location.href = "/DisabledHomeScreen";
        }
        // else  if (res.data !==  LiveGetInstallationNumber2 ) {
        //   if(res.data !== TestGetInstallationNumber){
        //   alert("Provided Key Does not match")
        //   window.location.href="/DisabledHomeScreen";
        //   }
        // }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const BusinessPartners = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,
        { api: LINKS.sap.MasterData.ActiveVendor, cookie: cookie }
      )
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.CardCode,
              label: element.CardCode + " : " + element.CardName
            })
          })
          setVendorDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const ApprovalTemplate = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.ApprovalProcess.ActiveTemplates, cookie: cookie }
      )
      .then(function (res) {
        console.log(res)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name
            })
          })
          setTemplateDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const OrginatorDropDownChangeFun = (e, name) => {
    setOrginatorName(e.label)
    setOrginatorValues(e.value)
  }
  const DropDownChangeFun = (e, name) => {
    let obj = {}
    obj[name] = e.label
    setDropDownValues(obj)
    console.log(obj)
  }
  const TextValueChangeFun = (e) => {
    let obj = {}
    obj[e.target.name] = e.target.value
    setDropDownValues(obj)
    console.log(obj)
  }
  const checkvalue = (e, ObjType) => {
    setObjTypeValue(ObjType)
    //-------Sales Modules-------------
    if (ObjType == '23'){
      setSalesQuotation(!SalesQuotation);
    } else if (ObjType == '17') {
      setSalesOrder(!SalesOrder);
    } else if (ObjType == '15') {
      setDelivery(!Delivery);
    }else if (ObjType == '234000031') {
      setReturnReq(!ReturnReq);
    }else if (ObjType == '16') {
      setReturn(!Return);
    }else if (ObjType == '203') {
      setA_RDownPayment(!A_RDownPayment);
    }else if (ObjType == '13') {
      setA_RInvoice(!A_RInvoice);
    }else if (ObjType == '14') {
      setA_RCreditMemo(!A_RCreditMemo);
    }
    //-----------Purchasing Modules-----------
    else if (ObjType == '1470000113'){
      setPurchaseRequest(!PurchaseRequest);
    } else if (ObjType == '540000006') {
      setPurchaseQuotation(!PurchaseQuotation);
    } else if (ObjType == '22') {
      setPurchaseOrder(!PurchaseOrder);
    }else if (ObjType == '20') {
      setGoodsReceiptPO(!GoodsReceiptPO);
    }else if (ObjType == '234000032') {
      setGoodsReturnRequest(!GoodsReturnRequest);
    }else if (ObjType == '21') {
      setGoodsReturns(!GoodsReturns);
    }else if (ObjType == '204') {
      setA_PDownpayment(!A_PDownpayment);
    }else if (ObjType == '18') {
      setA_PInvoices(!A_PInvoices);
    }else if (ObjType == '19') {
      setA_PCreditMemo(!A_PCreditMemo);
    }
    //-----------Inventory Modules-----------
    else if (ObjType == '59') {
      setGoodsReceipt(!GoodsReceipt);
    }else if (ObjType == '60') {
      setGoodsIssue(!GoodsIssue);
    }else if (ObjType == '1250000001') {
      setInventoryTransferRequest(!InventoryTransferRequest);
    }else if (ObjType == '67') {
      setInventoryTransfer(!InventoryTransfer);
    }else if (ObjType == '310000001') {
      setInventoryOpeningBalance(!InventoryOpeningBalance);
    }
    //-----------Payment Modules-----------
    else if (ObjType == '46') {
      setOutgoingPayment(!OutgoingPayment);
    }
    //-----------Blanket Agreement-----------
     else if (ObjType == '1250000026') {
      setSalesBlanketAgreement(!SalesBlanketAgreement);
    }else if (ObjType == '1250000027') {
      setPurchaseBlanketAgreement(!PurchaseBlanketAgreement);
    //----------Inventory Counting Transactions----------
    }else if (ObjType == '1470000065') {
      setInventoryCounting(!InventoryCounting);
    }else if (ObjType == '10000071') {
      setInventoryPosting(!InventoryPosting);
    }
  }
  const StatusDropDownOnChange = (e, index, name) => {
    let obj = PrRe
    obj[index][name] = e.value
    setStatusDropdown(obj)
    console.log(obj)

  }
  const DropDownTextValueChangeFun = (e, index) => {
    console.log(e.target, index, e.target.value)
    let obj = PrRe
    obj[index][e.target.name] = e.target.value
    setPrRe(obj)
    console.log(obj)

  }
  const UserCodeFun = async () => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    let ItemsResponseResult = {}
    const api = `${LINKS.api}/GetApi`

    let UserCode = await localStorage.getItem('userName');
    let cookie = await localStorage.getItem('cookie')

    let SAPapi = `Users?$select=UserCode,InternalKey&$filter=UserCode eq '${UserCode}'`;
    await axios
      .post(
        API_TYPES.GET,
        {
          api: SAPapi
        }
      )
      .then(function (res) {
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.UserCode,
              label: element.UserCode
            })
          })
          setUserCode(ItemsDropDown)
        }
      })
  }
  const DataController = async () => {
    let cookie = await localStorage.getItem('cookie')
    // let SAPapi = `ApprovalRequests?$filter=(Status eq '${name}' or Status eq '${name2}'or Status eq '${name3}') and ObjectType eq '${ObjTypeValue}' &$orderby=CreationDate`;
    let SAPapi = `$crossjoin(Drafts,ApprovalRequests)?$expand=Drafts
    ($select=DocEntry,DocNum,CardCode,CardName,DocTotal,DocTotalFc,Comments,DocTotalSys)
    ,ApprovalRequests($select=ApprovalTemplatesID,ObjectType,DraftEntry,Remarks,DraftType,Code,CreationDate,CreationTime,Status,OriginatorID,)
    &$filter=Drafts/DocEntry eq ApprovalRequests/DraftEntry and (ApprovalRequests/Status eq '${CheckBoxName ? 'arsPending' : null}' 
    or ApprovalRequests/Status eq '${CheckBoxName2 ? 'arsApproved' : null}'or ApprovalRequests/Status eq '${CheckBoxName3 ? 'arsNotApproved' : null}' )
    and (ApprovalRequests/ObjectType eq '${PurchaseRequest ? '1470000113' : null}' or ApprovalRequests/ObjectType eq'${PurchaseQuotation ? '540000006' : null}' 
    or ApprovalRequests/ObjectType eq '${PurchaseOrder ? '22' : null}'or ApprovalRequests/ObjectType eq '${GoodsReceiptPO ? '20' : null}'
    or ApprovalRequests/ObjectType eq '${GoodsReturnRequest ? '234000032' : null}' or ApprovalRequests/ObjectType eq '${GoodsReturns ? '21' : null}'
    or ApprovalRequests/ObjectType eq '${A_PDownpayment ? '204' : null}' or ApprovalRequests/ObjectType eq '${A_PInvoices ? '18' : null}'
    or ApprovalRequests/ObjectType eq '${A_PCreditMemo ? '19' : null}' or ApprovalRequests/ObjectType eq '${SalesQuotation ? '23' : null}'
    or ApprovalRequests/ObjectType eq '${SalesOrder ? '17' : null}' or ApprovalRequests/ObjectType eq '${Delivery ? '15' : null}'
    or ApprovalRequests/ObjectType eq '${ReturnReq ? '234000031' : null}' or ApprovalRequests/ObjectType eq '${Return ? '16' : null}'
    or ApprovalRequests/ObjectType eq '${A_RDownPayment ? '203' : null}' or ApprovalRequests/ObjectType eq '${A_RInvoice ? '13' : null}'
    or ApprovalRequests/ObjectType eq '${A_RCreditMemo ? '14' : null}' or ApprovalRequests/ObjectType eq '${OutgoingPayment ? '46' : null}'
    or ApprovalRequests/ObjectType eq '${GoodsReceipt ? '59' : null}' or ApprovalRequests/ObjectType eq '${GoodsIssue ? '60' : null}'
    or ApprovalRequests/ObjectType eq '${InventoryTransferRequest ? '1250000001' : null}' or ApprovalRequests/ObjectType eq '${InventoryTransfer ? '67' : null}'
    or ApprovalRequests/ObjectType eq '${InventoryOpeningBalance ? '310000001' : null}'
    or ApprovalRequests/ObjectType eq '${SalesBlanketAgreement ? '1250000026' : null}' or ApprovalRequests/ObjectType eq '${PurchaseBlanketAgreement ? '1250000027' : null}'
    or ApprovalRequests/ObjectType eq '${InventoryCounting ? '1470000065' : null}' or ApprovalRequests/ObjectType eq '${InventoryPosting ? '10000071' : null}'
    )&$orderby=ApprovalRequests/CreationDate &$top=20`;
    console.log(SAPapi);
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res)
        setPrRe(res.data.value);
        console.log(res.data.value) 
      })
      .catch({})
    setShow(true)
  }
  const handleShow2 = async () => {
    setShow2(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleClose2 = () => {
    setShow2(false)
  }
  const Patch = async (id, body) => {
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: body,
          api: `ApprovalRequests(${id})`,
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
  const submitPatch = async () => {
    console.log(PrRe)
    let body = PrRe
    let docLines = []
    PrRe.forEach(element => {
      console.log(element)
      if (element.Status || element.Remarks) {

        let body = {
          "ApprovalRequestDecisions": [
            {
              Status: element.Status,
              Remarks: element.Remarks
            }
          ]


        }

        console.log('element.Code, body');

        Patch(element.Code, body)
        console.log(element.Code, body)
      }

    })


  }
  const SearchPRNumberFilter = async (DraftEntry , documentname) => {
    let obj = documentname == '1470000113' ? 'Purchase Request' : documentname == '540000006' ? 'Purchase Quotation'
    : documentname == '22' ? 'Purchase Order': documentname == '20' ? 'Goods Receipt PO'
    : documentname == '234000032' ? 'Goods Return Request': documentname == '21' ? 'Goods Returns'
    : documentname == '204' ? 'A/P Down payment Request': documentname == '18' ? 'A/P Invoices'
    : documentname == '19' ? 'A/P Credit Memo' : documentname == '23' ? 'Sales Quotation'
    : documentname == '17' ? 'Sales Order' : documentname == '15' ? 'Delivery'
    : documentname == '234000031' ? 'Return Request' : documentname == '16' ? 'Return'
    : documentname == '203' ? 'A/R Down Payment Request' : documentname == '13' ? 'A/R Invoice'
    : documentname == '14' ? 'A/R Credit Memo': documentname == '46' ? 'Outgoing Payment'
    : documentname == '59' ? 'Goods Receipt' : documentname == '60' ? 'Goods Issue'
    : documentname == '1250000001' ? 'Inventory Transfer Request': documentname == '67' ? 'Inventory Transfer'
    : documentname == '310000001' ? 'Inventory Opening Balance': documentname == '1250000026' ? 'Sales Blanket Agreement'
    : documentname == '1250000027' ? 'Purchase Blanket Agreement': documentname == '1470000065' ? 'Inventory Counting'
    : documentname == '10000071' ? 'Inventory Posting' : null
  
    setDocumentType(obj)
    PrRe.forEach(element => {
      setDraftType(element.ApprovalRequests.Status)
    })
    PrRe.forEach(element => {
      if (element.ApprovalRequests.Status == "Y") {
        setButtonNameChange("Add")
      } else if (element.ApprovalRequests.Status !== "Y") {
        setButtonNameChange("OK")
      }
    })
    const api = `${LINKS.api}/GetApi`
    let sapAPi = `Drafts?$filter=DocEntry eq ${DraftEntry}`
    console.log(sapAPi)
    let cook = await localStorage.getItem('cookie')
    await axios
      .post(API_TYPES.GET, { api: sapAPi, cookie: cook })
      .then(function (res) {
        console.log("ZZZZZZZZZZZZZZZZZZ")
        setDocumentLines(res.data.value[0].DocumentLines)
        setHeaderData(res.data.value[0])
        // if(HeaderData.S)
        console.log(res.data.value[0])
        // console.log(PQDocumentLines)
      })
      .catch({})
  }
  const SubmitIntoDraft = async () => {
    console.log(PrRe)
    let body = {
      "Document":
      {
        DocEntry: HeaderData.DocEntry,
      }
    }
    console.log(body)
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: body,
          api: LINKS.sap.ApprovalProcess.DraftsService,
          cookie: cook
        })
        .then(function (res) {
          console.log(res)
          if (res.data.DocNum) {
            alert.success('Operation completed successfully')
          } else {
            alert.error(JSON.stringify(res.data.error.message.value))
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const handleOnChange = (name) => {
    if (name == 'arsPending') {
      setCheckBoxName(!CheckBoxName);
    } else if (name == 'arsApproved') {
      setCheckBoxName2(!CheckBoxName2);
    } else if (name == 'arsNotApproved') {
      setCheckBoxName3(!CheckBoxName3);
    }
  };
  return (
    <>
      <NavBar />
      <Container fluid>
        <h1 style={{ textAlign: 'center' }}>Approval Status Report</h1>
        <h3><u>Document Status</u></h3>
        <div class="form-check form-check-inline">
          <input class="form-check-input" checked={CheckBoxName} name='arsPending' onChange={e => handleOnChange(e.target.name)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Pending</label>
        </div>
        <div style={{ marginLeft: '6%' }} class="form-check form-check-inline">
          <input class="form-check-input" name='arsApproved' checked={CheckBoxName2} onChange={e => handleOnChange(e.target.name)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Approved</label>
        </div> <div style={{ marginLeft: '11%' }} class="form-check form-check-inline">
          <input class="form-check-input" name='arsNotApproved' checked={CheckBoxName3} onChange={e => handleOnChange(e.target.name)} type="checkbox" id="inlineCheckbox1" value="option1" />
          <label class="form-check-label" for="inlineCheckbox1">Rejected</label>
        </div>
        <br /><br />
      </Container>
      <CardGroup>
        <DIV3>
          <Container fluid>
            <label>Originator From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options={UserDropDown} // Options to display in the dropdown
                onChange={(e) => OrginatorDropDownChangeFun(e, 'OriginatorFrom')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <label>Authorizer From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options={UserCode} // Options to display in the dropdown
                onChange={(e) => DropDownChangeFun(e, 'AuthorizerFrom')}// Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <label>Template From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options={TemplateDropDown} // Options to display in the dropdown
                onChange={(e) => DropDownChangeFun(e, 'TemplateFrom')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <label>Request Date From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                value={currentDate}
                type='date'
                class='form-control'
                name='RequestDateFrom'
                onChange={e => TextValueChangeFun(e)}
                aria-describedby='emailHelp'
              // value={HeaderData && HeaderData.DateTo}
              />
            </div>
            <label>BP Code From</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                placeholder=''
                options={VendorDropDown} // Options to display in the dropdown
                onChange={(e) => DropDownChangeFun(e, 'BPCodeFrom')}// Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV3>
          <Container fluid>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
              <label>To</label>
              <Select
                placeholder=''
                options={UserDropDown} // Options to display in the dropdown
                onChange={(e) => DropDownChangeFun(e, 'OriginatorTo')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
              <label>To</label>
              <Select
                placeholder=''
                options={UserDropDown} // Options to display in the dropdown
                onChange={(e) => DropDownChangeFun(e, 'AuthorizerTo')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
              <label>To</label>
              <Select
                placeholder=''
                options={TemplateDropDown} // Options to display in the dropdown
                onChange={(e) => DropDownChangeFun(e, 'TemplateTo')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
              <label>To</label>
              <input
                // placeholder={SearchNumberBody && SearchNumberBody.FirstName}
                type='date'
                class='form-control'
                name='RequestDateTo'
                onChange={e => TextValueChangeFun(e)}
                aria-describedby='emailHelp'
                value={currentDate}
              />
            </div>
            <div style={{ width: '23.5rem', height: 'auto', marginLeft: '3rem' }}>
              <label>To</label>
              <Select
                placeholder=''
                options={VendorDropDown} // Options to display in the dropdown
                onChange={(e) => DropDownChangeFun(e, 'BPCodeTo')} // Function will trigger on select event
                // onRemove={requesterDropDownfunc}
                displayValue='label' // Property name to display in the dropdown options
              />
            </div>
          </Container>
        </DIV3>
        <DIV3>
          <Container fluid>
            <h3><u>Documents</u></h3>
            <h3 style={{ marginTop: '5%' }}><u>Sales-A/R</u></h3>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='SalesQuotation' checked={SalesQuotation} onChange={e => checkvalue(e, '23')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Sales Quotation</label>
            </div><br /> <div class="form-check form-check-inline">
              <input class="form-check-input" name='SalesOrder' checked={SalesOrder} onChange={e => checkvalue(e, '17')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Sales Order</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='Delivery' checked={Delivery} onChange={e => checkvalue(e, '15')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Delivery</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='ReturnReq' checked={ReturnReq} onChange={e => checkvalue(e, '234000031')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Return Request</label>
            </div><br /> <div class="form-check form-check-inline">
              <input class="form-check-input" name='Return' checked={Return} onChange={e => checkvalue(e, '16')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Return</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='A_RDownPayment' checked={A_RDownPayment} onChange={e => checkvalue(e, '203')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">A/R Down Payment</label>
            </div><br /> <div class="form-check form-check-inline">
              <input class="form-check-input" name='A_RInvoice' checked={A_RInvoice} onChange={e => checkvalue(e, '13')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">A/R Invoice</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='A_RCreditMemo' checked={A_RCreditMemo} onChange={e => checkvalue(e, '14')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">A/R Credit Memo</label>
            </div><br />
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV3>
          <Container fluid sty style={{ marginLeft: '3rem' }}>
            <h3 style={{ marginTop: '5%' }}><u>Purchasing-A/P</u></h3>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='PurchaseRequest' checked={PurchaseRequest} onChange={e => checkvalue(e, '1470000113')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Purchase Request</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='PurchaseQuotation' checked={PurchaseQuotation} onChange={e => checkvalue(e, '540000006')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Purchase Quotation</label>
            </div><br /> <div class="form-check form-check-inline">
              <input class="form-check-input" name='PurchaseOrder' checked={PurchaseOrder} onChange={e => checkvalue(e, '22')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Purchase Order</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='GoodsReceiptPO' checked={GoodsReceiptPO} onChange={e => checkvalue(e, '20')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Goods Receipt PO</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='GoodsReturnRequest' checked={GoodsReturnRequest} onChange={e => checkvalue(e, '234000032')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Goods Return Request</label>
            </div><br /> <div class="form-check form-check-inline">
              <input class="form-check-input" name='GoodsReturns' checked={GoodsReturns} onChange={e => checkvalue(e, '21')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Goods Returns</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='A_PDownpayment' checked={A_PDownpayment} onChange={e => checkvalue(e, '204')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">A/P Down Payment</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='A_PInvoices' checked={A_PInvoices} onChange={e => checkvalue(e, '18')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">A/P Invoice</label>
            </div><br /> <div class="form-check form-check-inline">
              <input class="form-check-input" name='A_PCreditMemo' checked={A_PCreditMemo} onChange={e => checkvalue(e, '19')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">A/P Credit Memo</label>
            </div><br />
          </Container>
        </DIV3>
        <DIV3>
          <Container fluid >
            <h3><u>Inventory</u></h3>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='GoodsReceipt' checked={GoodsReceipt} onChange={e => checkvalue(e, '59')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Goods Receipt</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='GoodsIssue' checked={GoodsIssue} onChange={e => checkvalue(e, '60')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Goods Issue</label>
            </div><br /> <div class="form-check form-check-inline">
              <input class="form-check-input" name='InventoryTransferRequest' checked={InventoryTransferRequest} onChange={e => checkvalue(e, '1250000001')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Inventory Transfer Request</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='InventoryTransfer' checked={InventoryTransfer} onChange={e => checkvalue(e, '67')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Inventory Transfer</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='InventoryOpeningBalance' checked={InventoryOpeningBalance} onChange={e => checkvalue(e, '310000001')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Inventory Opening Balance</label>
            </div><br />
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV3>
          <Container fluid style={{ marginLeft: '3rem' }}>
            <h3><u>Payment</u></h3>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='OutgoingPayment' checked={OutgoingPayment} onChange={e => checkvalue(e, '46')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Outgoing Payment</label>
            </div><br />
          </Container>
        </DIV3>
        <DIV3>
          <Container fluid>
            <h3><u>Blanket Agreement</u></h3>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='SalesBlanketAgreement' checked={SalesBlanketAgreement} onChange={e => checkvalue(e, '1250000026')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Sales Blanket Agreement</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='PurchaseBlanketAgreement' checked={PurchaseBlanketAgreement} onChange={e => checkvalue(e, '1250000027')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Purchase Blanket Agreement</label>
            </div><br />
          </Container>
        </DIV3>
        <DIV4>
        </DIV4>
        <DIV3>
          <Container fluid style={{ marginLeft: '3rem' }}>
            <h3><u>Inventory Counting Transactions</u></h3>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='InventoryCounting' checked={InventoryCounting} onChange={e => checkvalue(e, '1470000065')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Inventory Counting</label>
            </div><br />
            <div class="form-check form-check-inline">
              <input class="form-check-input" name='InventoryPosting' checked={InventoryPosting} onChange={e => checkvalue(e, '10000071')} type="checkbox" id="inlineCheckbox1" value="option1" />
              <label class="form-check-label" for="inlineCheckbox1">Inventory Posting</label>
            </div><br />
          </Container>
        </DIV3>
      </CardGroup><br /><br />
      <div>
        <Container fluid>
          <Button
            // onClick={handleShow}
            onClick={DataController}
          >
            OK
          </Button>
          <Modal show={show} onHide={handleClose} className="Modal-big" size="lg">
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
                      {/* <th>Prodution Time</th> */}
                      <th>Status</th>
                      <th>Remarks</th>
                      <th>BP Code</th>
                      <th>BP Name</th>
                      <th>Doc. Total (LC)</th>
                      <th>Draft Key</th>
                      <th>Draft Remarks</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {PrRe.map((item, index) => (
                      <tr key={`${index}`}>
                        <TD>{index + 1}</TD>
                        <TD> {item.ApprovalRequests.Code}</TD>
                        <TD>{item.ApprovalRequests.ObjectType == '1470000113' ? 'Purchase Request' : item.ApprovalRequests.ObjectType == '540000006' ? 'Purchase Quotation'
                        : item.ApprovalRequests.ObjectType == '22' ? 'Purchase Order': item.ApprovalRequests.ObjectType == '20' ? 'Goods Receipt PO'
                        : item.ApprovalRequests.ObjectType == '234000032' ? 'Goods Return Request': item.ApprovalRequests.ObjectType == '21' ? 'Goods Returns'
                        : item.ApprovalRequests.ObjectType == '204' ? 'A/P Down payment Request': item.ApprovalRequests.ObjectType == '18' ? 'A/P Invoices'
                        : item.ApprovalRequests.ObjectType == '19' ? 'A/P Credit Memo' : item.ApprovalRequests.ObjectType == '23' ? 'Sales Quotation'
                        : item.ApprovalRequests.ObjectType == '17' ? 'Sales Order' : item.ApprovalRequests.ObjectType == '15' ? 'Delivery'
                        : item.ApprovalRequests.ObjectType == '234000031' ? 'Return Request' : item.ApprovalRequests.ObjectType == '16' ? 'Return'
                        : item.ApprovalRequests.ObjectType == '203' ? 'A/R Down Payment Request' : item.ApprovalRequests.ObjectType == '13' ? 'A/R Invoice'
                        : item.ApprovalRequests.ObjectType == '14' ? 'A/R Credit Memo': item.ApprovalRequests.ObjectType == '46' ? 'Outgoing Payment'
                        : item.ApprovalRequests.ObjectType == '59' ? 'Goods Receipt' : item.ApprovalRequests.ObjectType == '60' ? 'Goods Issue'
                        : item.ApprovalRequests.ObjectType == '1250000001' ? 'Inventory Transfer Request': item.ApprovalRequests.ObjectType == '67' ? 'Inventory Transfer'
                        : item.ApprovalRequests.ObjectType == '310000001' ? 'Inventory Opening Balance': item.ApprovalRequests.ObjectType == '1250000026' ? 'Sales Blanket Agreement'
                        : item.ApprovalRequests.ObjectType == '1250000027' ? 'Purchase Blanket Agreement': item.ApprovalRequests.ObjectType == '1470000065' ? 'Inventory Counting'
                        : item.ApprovalRequests.ObjectType == '10000071' ? 'Inventory Posting' : null
                      }</TD>
                        <TD></TD>
                        <TD>
                        <div style={{ width: '5em' }}>
                        {/* ImArrowRight */}
                        
                          <a style={{color:'black'}} 
                            data-bs-toggle="tooltip"
                            data-bs-placement="top" 
                            title="First Data Record"
                            onClick={()=>{
                              SearchPRNumberFilter(item.ApprovalRequests.DraftEntry,item.ApprovalRequests.ObjectType)
                              handleShow2()
                              }}>
                              <ImArrowRight style={{marginTop:'5px',margin:'5px'}}/> 
                          </a>
                        {/* <Button
                            onClick={e => {
                              SearchPRNumberFilter(item.ApprovalRequests.DraftEntry)
                              handleShow2()
                            }}
                          /> */}
                          {item.Drafts.DocNum}
                          <Modal show={show2} onHide={handleClose2} className="Modal-big" size="lg">
                            <Modal.Header closeButton>
                              <Modal.Title id="example-modal-sizes-title-lg">{DocumentType}-Draft[{DraftType=='N' ? 'Rejected' : DraftType=='W' ? 'Pending': DraftType == 'Y' ? 'Approved' : null}]</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {/* Upper Side++++++++ */}
                              <CardGroup>
                                <DIV3>
                                  <Container fluid>
                                    <div style={{ width: '23.5rem' }}>
                                      <label> Code</label>
                                      <Select
                                        placeholder={HeaderData && HeaderData.CardCode || HeaderData && HeaderData.Requester}
                                        // options={VendorCodeDropdown} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   VendorChange(e)
                                        // }} // Function will trigger on select event
                                        // onRemove={BusinessPartners} Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    </div>
                                    <div style={{ width: '23.5rem' }}>
                                      <label>Name</label>
                                      <Select
                                        placeholder={HeaderData && HeaderData.CardName || HeaderData && HeaderData.RequesterName}
                                        // options={VendorCodeDropdown} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   VendorChange(e)
                                        // }} // Function will trigger on select event
                                        // onRemove={BusinessPartners} Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    </div>
                                    <br />
                                    <div style={{ width: '23.5rem' }}>
                                      <label>Contact Person</label>
                                      {/* {ContactPersonDropdown && ( */}
                                      <Select
                                        // value={ContactPersonDropdown.filter(
                                        //   option => option.value === SelectedPRDocEntry && SelectedPRDocEntry.ContactPerson
                                        // )}
                                        placeholder={HeaderData && HeaderData.ContactPersonCode}
                                        // options={ContactPersonDropdown} // Options to display in the dropdown
                                        // onSelect={GroupNo} // Function will trigger on select event
                                        // onRemove={GroupNo} Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                      {/* )} */}
                                    </div>
                                    <div style={{ width: '23.5rem', height: 'auto' }}>
                                      <label>Vendor Ref.No</label>
                                      <input
                                        //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                                        type='text'
                                        class='form-control'
                                        id='exampleInputEmail1'
                                        aria-describedby='emailHelp'
                                      // placeholder={HeaderData && HeaderData.ContactPersonCode}
                                      ></input>
                                    </div>
                                    <div style={{ width: '23.5rem', height: 'auto' }}>
                                      <label>Department</label>
                                      <Select
                                        placeholder={HeaderData && HeaderData.RequesterDepartment}
                                        // options={BrancheCodeDropdown} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   setSelectedBranch(e.value)
                                        // }} // Function will trigger on select event
                                        // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    </div>
                                    <div style={{ width: '23.5rem', height: 'auto' }}>
                                      <label>Branch</label>
                                      <Select
                                        placeholder={HeaderData && HeaderData.BPLName}
                                        // options={BrancheCodeDropdown} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   setSelectedBranch(e.value)
                                        // }} // Function will trigger on select event
                                        // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    </div> <br />
                                  </Container>
                                </DIV3>
                                <DIV4></DIV4>
                                <DIV3>
                                  <Container>
                                    <div style={{ width: '23.5rem' }}>
                                      <label> No.</label>
                                      <input
                                        name={'SearchPRNumber'}
                                        type='Number'
                                        class='form-control'
                                        id='exampleInputEmail1'
                                        readOnly="readOnly"
                                        aria-describedby='emailHelp'
                                        placeholder={HeaderData && HeaderData.DocNum}
                                      // onChange={e => {
                                      //   ontextItemChanged(e)
                                      // }}
                                      />
                                    </div>
                                    <div style={{ width: '23.5rem' }}>
                                      <label> Status</label>
                                      <input
                                        type='text'
                                        readOnly="readOnly"
                                        class='form-control'
                                        id='exampleInputEmail1'
                                        aria-describedby='emailHelp'
                                        placeholder="Draft"
                                      />
                                    </div>
                                    <div style={{ width: '23.5rem' }}>
                                      <label> Posting Date</label>
                                      <input
                                        type='date'
                                        name='DocDate'
                                        class='form-control'
                                        id='exampleInputEmail1'
                                        aria-describedby='emailHelp'
                                        value={HeaderData && HeaderData.DocDate}
                                      />
                                    </div>
                                    <div style={{ width: '23.5rem' }}>
                                      <label> Document Date</label>
                                      <input
                                        type='date'
                                        name='DocDate'
                                        class='form-control'
                                        id='exampleInputEmail1'
                                        aria-describedby='emailHelp'
                                        value={HeaderData && HeaderData.DocDate}
                                      // onChange={e => {
                                      //   DocDateChange(e)
                                      // }}
                                      />
                                    </div>
                                    <div style={{ width: '23.5rem' }}>
                                      <label> Required Date</label>
                                      <input
                                        type='date'
                                        name='DocDate'
                                        class='form-control'
                                        id='exampleInputEmail1'
                                        aria-describedby='emailHelp'
                                        value={HeaderData && HeaderData.RequriedDate}
                                      // onChange={e => {
                                      //   DocDateChange(e)
                                      // }}
                                      />
                                    </div>
                                  </Container>
                                </DIV3>
                              </CardGroup>
                              {/* Table+++++++++ */}
                              <Tabs defaultActiveKey="Contents" transition={false} id="noanim-tab-example">
                                <Tab eventKey="Contents" title="Contents">
                                  {DocumentLines && (
                                    <Table responsive striped bordered hover>
                                      <TableHead>
                                        <tr>
                                          <th>#</th>
                                          <th>Bar Code</th>
                                          <th>Item</th>
                                          <th>Item Description</th>
                                          <th>UoM Name</th>
                                          <th>Free Text</th>
                                          <th>Required Date</th>
                                          <th>Quantity</th>
                                          <th>Open Qty</th>
                                          <th>Whse</th>
                                          <th>Project</th>
                                          <th>Cost Centre</th>
                                          <th>IGP No</th>
                                          <th>IGP Quantity</th>
                                          <th>MIR No</th>
                                          <th>Approved Quantity</th>
                                          <th>Rejected Quantity</th>
                                        </tr>
                                      </TableHead>
                                      <tbody>
                                        {DocumentLines.map((item, index) => (
                                          item.LineStatus === "bost_Open" &&
                                          <tr key={`${index}`}>
                                            <TD>{index + 1}</TD>
                                            <TD></TD>
                                            <TD>{item.ItemCode}</TD>
                                            <TD>{item.ItemDescription}</TD>
                                            <TD>{item.MeasureUnit}</TD>
                                            <TD>
                                              {item.FreeText}
                                            </TD>
                                            <TD>
                                              {item.RequiredDate}
                                            </TD>
                                            <TD>
                                              {item.Quantity || item.RequiredQuantity}
                                            </TD>
                                            <TD>
                                              {item.RemainingOpenQuantity}
                                            </TD>
                                            <TD>
                                              <div style={{ width: '15em' }}>
                                                <Select
                              menuPortalTarget={document.body}
                                                  placeholder={item.WarehouseCode}
                                                  // options={PrWhse} // Options to display in the dropdown
                                                  // onChange={e => {
                                                  //   DocLinesDropDownOnChange(e, index, 'WarehouseCode')
                                                  // }}
                                                  // onSelect={CostCentre} // Function will trigger on select event
                                                  // onRemove={CostCentre} //Function will trigger on remove event
                                                  displayValue='name' // Property name to display in the dropdown options
                                                />
                                              </div>
                                            </TD>
                                            <TD>
                                              <div style={{ width: '15em' }}>
                                                <Select
                              menuPortalTarget={document.body}
                                                  placeholder={item.ProjectCode}
                                                  // options={PrWhse} // Options to display in the dropdown
                                                  // onChange={e => {
                                                  //   DocLinesDropDownOnChange(e, index, 'WarehouseCode')
                                                  // }}
                                                  // onSelect={CostCentre} // Function will trigger on select event
                                                  // onRemove={CostCentre} //Function will trigger on remove event
                                                  displayValue='name' // Property name to display in the dropdown options
                                                />
                                              </div>
                                            </TD>
                                            <TD>
                                              <div style={{ width: '15em' }}>
                                                <Select
                              menuPortalTarget={document.body}
                                                  placeholder={item.CostingCode}
                                                  // options={PrWhse} // Options to display in the dropdown
                                                  // onChange={e => {
                                                  //   DocLinesDropDownOnChange(e, index, 'WarehouseCode')
                                                  // }}
                                                  // onSelect={CostCentre} // Function will trigger on select event
                                                  // onRemove={CostCentre} //Function will trigger on remove event
                                                  displayValue='name' // Property name to display in the dropdown options
                                                />
                                              </div>
                                            </TD>
                                            <TD>
                                              {item.U_IGPEntry}
                                            </TD>
                                            <TD> {item.U_IGPQuantity}</TD>
                                            <TD>
                                              {item.U_MIREntry}
                                            </TD>
                                            <TD>  {item.U_AQuantity}</TD>
                                            <TD> {item.U_RQuantity}</TD>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  )}
                                </Tab>
                                <Tab eventKey="Logistics" title="Logistics">
                                  {/* <Logistics/> */}
                                </Tab>
                                <Tab eventKey="Accounting" title="Accounting">
                                  {/* <Accounting/> */}
                                </Tab>
                                <Tab eventKey="Attachment" title="Attachment">
                                  {/* <Attachment/> */}
                                </Tab>
                              </Tabs>
                              {/* Bottom Side+++++++++ */}
                              <CardGroup>
                                <DIV3>
                                  <Container fluid>
                                    <div style={{ width: '23.5rem', height: 'auto' }}>
                                      <label>Owner</label>
                                      <Select
                                        //  placeholder={HeaderData && HeaderData.BPLName}
                                        // options={BrancheCodeDropdown} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   setSelectedBranch(e.value)
                                        // }} // Function will trigger on select event
                                        // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    </div> <br />
                                    <div style={{ width: '23.5rem', height: 'auto' }}>
                                      <label>Buyer</label>
                                      <Select
                                        placeholder={HeaderData && HeaderData.SalesPersonCode}
                                        // options={BrancheCodeDropdown} // Options to display in the dropdown
                                        // onChange={e => {
                                        //   setSelectedBranch(e.value)
                                        // }} // Function will trigger on select event
                                        // onRemove={RequesterCodeDropdownfunc} // Function will trigger on remove event
                                        displayValue='name' // Property name to display in the dropdown options
                                      />
                                    </div> <br />
                                    <div class='form-group'>
                                      <label for='exampleFormControlTextarea1'>Remarks</label>
                                      <textarea
                                        class='form-control rounded-0'
                                        id='exampleFormControlTextarea1'
                                        rows='3'
                                        value={HeaderData && HeaderData.Comments}
                                      />
                                    </div>
                                    <br />
                                    <br />
                                  </Container>
                                </DIV3>
                                <DIV4></DIV4>
                                <DIV3>
                                  <div>
                                    <div style={{ width: '23.5rem' }}>
                                      <label style={{ marginTop: '10%' }}>
                                        Total Before Discount:</label>
                                      <input
                                        type='number'
                                        // value={totalbforeDiscount}
                                        placeholder={HeaderData && HeaderData.DocTotal}
                                        class='form-control' />
                                    </div>
                                    <div style={{ width: '23.5rem' }}>
                                      <label>Discount</label>
                                      <input
                                        type='number'
                                        name='Discount%'
                                        class='form-control'
                                        placeholder={HeaderData && HeaderData.TotalDiscount}
                                      // value={disc}
                                      // onChange={e => {
                                      //   setdisc(e.target.value)
                                      //   setDiscountTotal((e.target.value * totalbforeDiscount) / 100)
                                      // }}
                                      /></div>
                                    <br />
                                  </div>
                                  <div style={{ width: '23.5rem' }}>
                                    <label>Freight</label>
                                    <input
                                      // placeholder={totalFreight}
                                      class='form-control'
                                    />
                                  </div>
                                  <div style={{ width: '23.5rem' }}>
                                    <input
                                      type='number'
                                      // onChange={e => setBottomTax(+e.target.value)}
                                      // value={BottomTax}
                                      class='form-control'
                                      name='TaxAmount(LC)'
                                    // placeholder={HeaderData && HeaderData.TotalDiscount}
                                    />
                                  </div>
                                  <div style={{ width: '23.5rem' }}>
                                    <label>Total Payment Due:</label>
                                    <input type='text'
                                      //  value={TotalPayment}
                                      placeholder={HeaderData && HeaderData.DocTotalSys}
                                      class='form-control' />
                                  </div>
                                </DIV3>
                              </CardGroup>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant='secondary' name='Add' onClick={() => {
                                handleClose2()
                              }} >{ButtonNameChange} </Button>
                              <Button variant='primary' onClick={handleClose2}>
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          {/* {item.DocNum} */}
                          </div>
                        </TD>
                        <TD>
                          <div style={{ width: '14em' }}>
                            {UserDropDown ? (
                              <Select
                              menuPortalTarget={document.body}
                                value={UserDropDown.filter(
                                  option => option.value === item.ApprovalRequests.OriginatorID
                                )}
                              />
                            ) : null}
                          </div>
                        </TD>
                        <TD>{item.ApprovalRequests.CreationDate}</TD>
                        {/* <TD>{item.ApprovalRequests.CreationTime}</TD> */}
                        <TD>
                          <div style={{ width: '14em' }}>
                            <Select
                              menuPortalTarget={document.body}
                              placeholder={item.ApprovalRequests.Status == 'W' ? 'Pending' : item.ApprovalRequests.Status == 'N'? 'Rejected' : item.ApprovalRequests.Status == 'Y' ? 'Approved' : null}
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
                              value={item.ApprovalRequests.Remarks}
                              onChange={e => DropDownTextValueChangeFun(e, index)}
                              aria-describedby='emailHelp'
                            // value={HeaderData && HeaderData.DateTo}
                            />
                          </div>
                        </TD>
                        <TD> {item.Drafts.CardCode}</TD>
                        <TD>  {item.Drafts.CardName}</TD>
                        <TD>  {item.Drafts.DocTotal}</TD>
                        <TD> {item.ApprovalRequests.DraftEntry}</TD>
                        <TD>  {item.Drafts.Comments}</TD>
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
          </Modal>
          <Button
            style={{ marginLeft: '3%' }}
            // onClick={() => {
            //   window.location.reload();
            // }}
            onClick={() => {
              window.location.href = "/Home"
            }}
          >Cancel</Button>
        </Container>
      </div>
    </>
  )
}