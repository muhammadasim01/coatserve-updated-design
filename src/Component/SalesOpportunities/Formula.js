// import React, { Component } from 'react';
// import Header from '../Header'
// import Switch from "react-switch";
// import { Dots, Spinner } from 'react-activity';
// import 'semantic-ui-css/semantic.min.css';
// import { Dropdown } from 'semantic-ui-react';
// import Login from '../../Login';

// const axios = require('axios');

// class OpenPurchaseRequestsList extends Component {


//     constructor(props) {
//         super(props)
//         this.state = {
//             TenderlistShow: true,
//             TENDERLISTDetailResponseResult: null,
//             BusinessPartnersResponseResult: true,
//             TotalFreight: 0,
//             TotalTax: 0,
//             DocumentTotal: 0,

//         };
//     }
//     componentDidMount = () => {
//         this._load()
//     }
//     _load = async () => {
//         var cookie = localStorage.getItem("cookie");
//         var VendorCode = localStorage.getItem("VendorCode");
//         var Currency = localStorage.getItem("Currency");
//         await this.setState({
//             cookie: cookie,
//             ShowOVMD: true,
//             VendorCode: VendorCode
//         })
//         this._getUserOVMD()
//         this._getPURCHASEQUOTATIONSDRAFT()
//         this._GetTimer()
//         this._getBusinessPartners()
//     }
//     _getBusinessPartners = async () => {
//         let that = this;
//         let BusinessPartnersResponseResult = null
//         let BusinessPartnersApi = `BusinessPartners?$filter=CardCode eq '${this.state.VendorCode}'`
//         await axios.post('/api/SAP/GetApi', { api: BusinessPartnersApi, cookie: that.state.cookie }).then(function (BusinessPartnersResponse) {
//             BusinessPartnersResponseResult = BusinessPartnersResponse
//         })
//         console.log(BusinessPartnersResponseResult);
//         if (BusinessPartnersResponseResult) {
//             if (BusinessPartnersResponseResult.data.value) {
//                 this.setState({
//                     BusinessPartnersResponseResult: BusinessPartnersResponseResult.data.value,
//                 })
//             }
//         }
//     }
//     _getUserOVMD = async () => {
//         let that = this;
//         let OVMDResponseResult = null
//         let OVMDApi = `OVMD?$filter=U_CardCode eq '${this.state.VendorCode}'`
//         console.log(OVMDApi);
//         // let OVMDApi = `OVMD?$filter=ReqDate ge '${today}' U_Status eq 'A' and U_CardCode eq '${this.state.VendorCode}'`
//         await axios.post('/api/SAP/GetApi', { api: OVMDApi, cookie: that.state.cookie }).then(function (OVMDResponse) {
//             OVMDResponseResult = OVMDResponse
//         })
//         if (OVMDResponseResult) {
//             if (OVMDResponseResult.data.value) {
//                 let TENDERLISTApi = `sml.svc/TENDERLIST?$filter=`
//                 OVMDResponseResult.data.value[0].VMD1Collection.forEach(element => {
//                     TENDERLISTApi = TENDERLISTApi + ` ItmsGrpCod eq ${element.U_ItmsGrpCod} or`
//                 });
//                 TENDERLISTApi = TENDERLISTApi.substring(0, TENDERLISTApi.length - 2)
//                 this._GetOpenTenderList(TENDERLISTApi)
//             }
//             else {
//                 alert(OVMDResponseResult.data.error.message.value)
//             }
//         }
//     }
//     _getPURCHASEQUOTATIONSDRAFT = async () => {
//         let that = this;
//         let PURCHASEQUOTATIONSDRAFTResponseResult = null
//         let PURCHASEQUOTATIONSDRAFTApi = `sml.svc/PURCHASEQUOTATIONSDRAFT?$filter=CardCode eq '${this.state.VendorCode}'`
//         await axios.post('/api/SAP/GetApi', { api: PURCHASEQUOTATIONSDRAFTApi, cookie: that.state.cookie }).then(function (PURCHASEQUOTATIONSDRAFTResponse) {
//             PURCHASEQUOTATIONSDRAFTResponseResult = PURCHASEQUOTATIONSDRAFTResponse
//         })
//         let AlreadySubmittedDraft = []
//         PURCHASEQUOTATIONSDRAFTResponseResult.data.value.forEach(element => {
//             AlreadySubmittedDraft[element.BaseEntry + "-" + element.Group_Code] = element
//         });
//         this.setState({
//             AlreadySubmittedDraft: AlreadySubmittedDraft
//         })
//     }
//     _GetTimer() {
//         var timer;

//         var compareDate = new Date("2020-04-11");
//         compareDate.setDate(compareDate.getDate()); //just for this demo today + 7 days
//         let RequriedDate = new Date("2020-04-11")
//         let now = new Date();
//         timer = setInterval(function () {
//             timeBetweenDates(compareDate);
//         }, 1000);

//         function timeBetweenDates(toDate) {
//             var dateEntered = toDate;
//             var now = new Date();
//             var difference = now.getTime() - dateEntered.getTime();

//             if (difference <= 0) {

//                 // Timer done
//                 clearInterval(timer);

//             } else {

//                 var seconds = Math.floor(difference / 1000);
//                 var minutes = Math.floor(seconds / 60);
//                 var hours = Math.floor(minutes / 60);
//                 var days = Math.floor(hours / 24);

//                 hours %= 24;
//                 minutes %= 60;
//                 seconds %= 60;

//                 // console.log(days," days ",hours, " hours ",minutes, " seconds ",seconds);
//             }
//         }
//     }
//     _GetOpenTenderList = async (TENDERLISTApi) => {
//         let that = this;

//         this.setState({
//             TENDERLISTResponseResult: null,
//             TENDERLISTDetail: null,
//             TenderlistShow: true
//         })
//         let TENDERLISTResponseResult = null

//         await axios.post('/api/SAP/GetApi', { api: TENDERLISTApi, cookie: that.state.cookie }).then(function (TENDERLISTResponse) {
//             TENDERLISTResponseResult = TENDERLISTResponse
//         })

//         if (TENDERLISTResponseResult) {
//             if (TENDERLISTResponseResult.data.value) {
//                 this.setState({
//                     TENDERLISTResponseResult: TENDERLISTResponseResult.data.value
//                 })
//             }
//             else {
//                 alert(TENDERLISTResponseResult.data.error.message.value)
//             }
//         }
//         this._GetTexCodes()
//         this._PaymentTermsTypes()
//         this._getBusinessPartners()
//     }
//     _EditDraft = async (DocEntry, ItmsGrpCod) => {
//         this.setState({
//             TenderlistShow: false,
//         })
//         let that = this
//         let AlreadySubmittedDraft = this.state.AlreadySubmittedDraft
//         let DraftEntry = (AlreadySubmittedDraft[DocEntry + "-" + ItmsGrpCod].DocEntry)

//         let DraftResponseResult = null
//         let DraftApi = `Drafts(${DraftEntry})`
//         await axios.post('/api/SAP/GetApi', { api: DraftApi, cookie: that.state.cookie }).then(function (DraftResponse) {
//             DraftResponseResult = DraftResponse
//         })
//         if (DraftResponseResult) {
//             if (DraftResponseResult.data) {

//                 let TENDERLISTDetailResponseResult = null
//                 let TENDERLISTDetailApi = `sml.svc/TENDERDETAIL?$filter=DocEntry eq ${DocEntry}  and ItmsGrpCod eq ${ItmsGrpCod}`
//                 await axios.post('/api/SAP/GetApi', { api: TENDERLISTDetailApi, cookie: that.state.cookie }).then(function (TENDERLISTDetailResponse) {
//                     TENDERLISTDetailResponseResult = TENDERLISTDetailResponse
//                 })
//                 if (TENDERLISTDetailResponseResult) {
//                     if (TENDERLISTDetailResponseResult.data.value) {
//                         console.log(DraftResponseResult.data.DocTotal)
//                         let obj = TENDERLISTDetailResponseResult.data.value
//                         obj[0]["PaymentTerms"] = DraftResponseResult.data.U_PaymentTerm
//                         obj[0]["PaymentTermsRemarks"] = DraftResponseResult.data.U_PaymentTerm
//                         obj[0]["DeliveryTerms"] = DraftResponseResult.data.U_DeliveryTerm
//                         obj[0]["DocumentRemarks"] = DraftResponseResult.data.U_Remarks
//                         obj[0]["PaymentGroupCode"] = DraftResponseResult.data.PaymentGroupCode
//                         let key = 0
//                         DraftResponseResult.data.DocumentLines.forEach(element => {
//                             console.log(element);
//                             console.log("element");
//                             obj[key]["Price"] = element.UnitPrice
//                             obj[key]["FreightCharges"] = element.DocumentLineAdditionalExpenses[0].LineTotal
//                             obj[key]["DeliveryDate"] = element.ShipDate
//                             obj[key]["PriceValidity"] = element.U_PriceValidity
//                             obj[key]["Remarks"] = element.FreeText
//                             obj[key]["DiscountPercent"] = element.DiscountPercent
//                             key += 1
//                         });
//                         this.setState({
//                             TENDERLISTDetailResponseResult: obj,
//                             TenderlistShow: false,
//                             EditFieldShow: true,
//                             DraftEntry: DraftEntry,
//                         });

//                         let TotalBeforeDiscount = 0;
//                         obj.forEach(item => {
//                             TotalBeforeDiscount = TotalBeforeDiscount + ((item.Price * item.Quantity) ? (item.Price * item.Quantity) : 0)
//                         });
//                         this.setState({ TotalBeforeDiscount: TotalBeforeDiscount });

//                         let TotalDiscount = 0;
//                         obj.forEach(item => {
//                             TotalDiscount = TotalDiscount + ((((item.Price * item.DiscountPercent) / 100) * item.Quantity) ? (((item.Price * item.DiscountPercent) / 100) * item.Quantity) : 0)
//                         });
//                         this.setState({ TotalDiscount: TotalDiscount });

//                         let TotalAfterDiscount = 0;
//                         obj.forEach(item => {
//                             TotalAfterDiscount = TotalAfterDiscount + ((item.Price * item.Quantity) - (((item.Price * item.DiscountPercent) / 100) * item.Quantity) ? (item.Price * item.Quantity) - (((item.Price * item.DiscountPercent) / 100) * item.Quantity) : 0)
//                         });
//                         this.setState({ TotalAfterDiscount: TotalAfterDiscount });

//                         let TotalFreight = 0;
//                         obj.forEach(item => {
//                             TotalFreight = TotalFreight + (item.FreightCharges ? item.FreightCharges : 0)
//                         });
//                         this.setState({ TotalFreight: TotalFreight });

//                         this.setState({
//                             DocumentTotal: DraftResponseResult.data.DocTotal
//                         });
//                         this.setState({
//                             TotalTax: DraftResponseResult.data.VatSum
//                         });
//                     }
//                 }
//             }
//         }
//     }
//     _GetTenderDetails = async (DocEntry, ItmsGrpCod) => {
//         this.setState({
//             TenderlistShow: false,
//         })
//         let that = this
//         let TENDERLISTDetailResponseResult = null
//         let TENDERLISTDetailApi = `sml.svc/TENDERDETAIL?$filter=DocEntry eq ${DocEntry}  and ItmsGrpCod eq ${ItmsGrpCod}`
//         await axios.post('/api/SAP/GetApi', { api: TENDERLISTDetailApi, cookie: that.state.cookie }).then(function (TENDERLISTDetailResponse) {
//             TENDERLISTDetailResponseResult = TENDERLISTDetailResponse
//         })
//         if (TENDERLISTDetailResponseResult) {
//             if (TENDERLISTDetailResponseResult.data.value) {
//                 this.setState({
//                     TENDERLISTDetailResponseResult: TENDERLISTDetailResponseResult.data.value,
//                 })
//             }
//         }
//     }
//     _GetTexCodes = async () => {
//         let that = this
//         let VatGroupsResponseResult = null
//         let VatGroupsApi = `VatGroups`
//         await axios.post('/api/SAP/GetApi', { api: VatGroupsApi, cookie: that.state.cookie }).then(function (VatGroupsResponse) {
//             VatGroupsResponseResult = VatGroupsResponse
//         })
//         if (VatGroupsResponseResult) {
//             if (VatGroupsResponseResult.data.value) {
//                 let VatGroups = []

//                 VatGroupsResponseResult.data.value.forEach(element => {
//                     VatGroups[element.Code] = element
//                 });

//                 this.setState({
//                     VatGroups: VatGroups
//                 })
//             }
//         }
//     }
//     _PaymentTermsTypes = async () => {
//         let that = this
//         let PaymentTermsTypesResponseResult = null
//         let PaymentTermsTypesApi = `PaymentTermsTypes?$filter=startswith(PaymentTermsGroupName,'Credit')`
//         await axios.post('/api/SAP/GetApi', { api: PaymentTermsTypesApi, cookie: that.state.cookie }).then(function (PaymentTermsTypesResponse) {
//             PaymentTermsTypesResponseResult = PaymentTermsTypesResponse
//         })
//         if (PaymentTermsTypesResponseResult) {
//             if (PaymentTermsTypesResponseResult.data.value) {
//                 let PaymentTermsTypes = []
//                 let PaymentTermsTypesDetail = []
//                 PaymentTermsTypesResponseResult.data.value.forEach(element => {
//                     PaymentTermsTypesDetail[element.GroupNumber] = element
//                     PaymentTermsTypes.push({
//                         value: element.GroupNumber, text: element.PaymentTermsGroupName
//                     })
//                 });
//                 this.setState({
//                     PaymentTermsTypes: PaymentTermsTypes,
//                     PaymentTermsTypesDetail: PaymentTermsTypesDetail
//                 })
//             }
//         }
//     }
//     _ShowTenderList = async () => {
//         this.setState({
//             TENDERLISTDetailResponseResult: null,
//             TenderlistShow: true,
//             EditFieldShow: false
//         })
//     }
//     _UpdateDraft = async () => {

//         let that = this;
//         let DraftEntry = this.state.DraftEntry
//         let DraftResponseResult = null
//         let DraftApi = `Drafts(${DraftEntry})`
//         axios.post('/api/SAP/DeleteApi', { api: DraftApi, cookie: that.state.cookie }).then(function (DraftResponse) {
//             DraftResponseResult = DraftResponse
//         })
//         setTimeout(() => {
//             if (DraftResponseResult) {
//                 alert(DraftResponseResult.error.value.message)
//             }
//             else {
//                 this._SaveAsDraft()
//             }
//         }, 3000);
//     }
//     _SaveAsDraft = async () => {

//         let that = this;
//         let TenderDetail = this.state.TENDERLISTDetailResponseResult
//         let docLines = []
//         TenderDetail.forEach(element => {
//             // if (element.Selected) {
//                 docLines.push({
//                     "ItemCode": element.ItemCode,
//                     "Quantity": element.Quantity,
//                     "UnitPrice": element.Price,
//                     "ShipDate": element.DeliveryDate,
//                     "U_PriceValidity": element.PriceValidity,
//                     "BaseEntry": element.DocEntry,
//                     "BaseLine": element.LineNum,
//                     "DiscountPercent": element.DiscountPercent,
//                     "BaseType": "1470000113",
//                     "FreeText": element.Remarks,
//                     "VatGroup": element.TaxCode,
//                     "DistributeExpense": "tYES",
//                     "DocumentLineAdditionalExpenses": [
//                         {
//                             "ExpenseCode": 1,
//                             "LineTotal": element.FreightCharges
//                         }
//                     ],
//                 })
//             // }
//         });
//         let PostBody = {
//             "CardCode": this.state.VendorCode,
//             "BPL_IDAssignedToInvoice": TenderDetail[0].BPLId,
//             "DocObjectCode": "540000006",
//             "GroupSeries": -1,
//             "GroupNumber": TenderDetail[0].DocNum + "" + TenderDetail[0].ItmsGrpCod,
//             "RequriedDate": TenderDetail[0].ReqDate,
//             "PaymentGroupCode": TenderDetail[0].PaymentTerms,
//             "U_PaymentTerm": TenderDetail[0].PaymentTermsRemarks,
//             "U_DeliveryTerm": TenderDetail[0].DeliveryTerms,
//             "U_Remarks": TenderDetail[0].DocumentRemarks,
//             "DocumentLines": docLines
//         }
//         let DraftResponceResult = null
//         let DraftsPostApi = "Drafts"
//         await axios.post('/api/SAP/POSTApi', { body: PostBody, api: DraftsPostApi, cookie: that.state.cookie }).then(function (DraftResponce) {
//             DraftResponceResult = DraftResponce
//         }).catch(function (error) { console.log(error) });

//         if (DraftResponceResult) {
//             if (DraftResponceResult.data.DocEntry) {
//                 console.log(DraftResponceResult)
//                 alert("Draft Has be submitted Sucessfully")
//                 that._load()
//             }
//             else {
//                 alert("Response Error: " + DraftResponceResult.data.error.message.value);
//             }
//         }
//     }
//     handleChange = (event, key) => {
//         let TenderDetail = this.state.TENDERLISTDetailResponseResult
//         TenderDetail[key][event.target.name] = event.target.value
//         this.setState({ TENDERLISTDetailResponseResult: TenderDetail });

//         let TotalBeforeDiscount = 0;
//         TenderDetail.forEach(item => {
//             TotalBeforeDiscount = TotalBeforeDiscount + ((Number(item.Price) * Number(item.Quantity)) ? (Number(item.Price) * Number(item.Quantity)) : 0)
//         });
//         this.setState({ TotalBeforeDiscount: TotalBeforeDiscount });

//         let TotalDiscount = 0;
//         TenderDetail.forEach(item => {
//             TotalDiscount = TotalDiscount + ((((Number(item.Price) * Number(item.DiscountPercent)) / 100) * Number(item.Quantity)) ? (((Number(item.Price) * Number(item.DiscountPercent)) / 100) * Number(item.Quantity)) : 0)
//         });
//         this.setState({ TotalDiscount: TotalDiscount });

//         let TotalAfterDiscount = 0;
//         TenderDetail.forEach(item => {
//             TotalAfterDiscount = TotalAfterDiscount + ((Number(item.Price) * Number(item.Quantity)) - (((Number(item.Price) * Number(item.DiscountPercent)) / 100) * Number(item.Quantity)) ? (Number(item.Price) * Number(item.Quantity)) - (((Number(item.Price) * Number(item.DiscountPercent)) / 100) * Number(item.Quantity)) : 0)
//         });
//         this.setState({ TotalAfterDiscount: TotalAfterDiscount });

//         let TotalFreight = 0;
//         TenderDetail.forEach(item => {
//             TotalFreight = TotalFreight + (Number(item.FreightCharges) ? Number(item.FreightCharges) : 0)
//         });
//         this.setState({ TotalFreight: TotalFreight });

//         let TotalTax = 0;
//         TenderDetail.forEach(item => {
//             TotalTax = TotalTax + ((((item.Price - ((Number(item.Price) * Number(item.DiscountPercent)) / 100))) * (Number(this.state.VatGroups[item.TaxCode].VatGroups_Lines[0].Rate))) / 100) * Number(item.Quantity)
//         });
//         this.setState({ TotalTax: TotalTax });

//         let DocumentTotal = 0;
//         TenderDetail.forEach(item => {
//             DocumentTotal = DocumentTotal + (((((((Number(item.Price) - ((Number(item.Price) * Number(item.DiscountPercent)) / 100))) * (Number(this.state.VatGroups[item.TaxCode].VatGroups_Lines[0].Rate))) / 100) * Number(item.Quantity)) + Number(item.FreightCharges)) + ((Number(item.Price) * Number(item.Quantity)) - (((Number(item.Price) * Number(item.DiscountPercent)) / 100) * Number(item.Quantity))))
//         });
//         this.setState({ DocumentTotal: DocumentTotal });
//     }
//     MainHandleChange = (event,) => {
//         let TenderDetail = this.state.TENDERLISTDetailResponseResult
//         TenderDetail[0][event.target.name] = event.target.value
//         this.setState({ TENDERLISTDetailResponseResult: TenderDetail });
//     }
//     PaymentTermsDropChange = (e, { value }) => {
//         let TenderDetail = this.state.TENDERLISTDetailResponseResult
//         TenderDetail[0]["PaymentTerms"] = value
//         this.setState({ TENDERLISTDetailResponseResult: TenderDetail });
//     }
//     // DocLineSwitchFunction = (e, item, Key) => {
//     //     let TenderDetail = this.state.TENDERLISTDetailResponseResult
//     //     TenderDetail[Key]['Selected'] = e
//     //     this.setState({
//     //         TENDERLISTDetailResponseResult: TenderDetail
//     //     })
//     // }
//     render() {
//         let that = this;
//         return (
//             <>
//                 <Header />
//                 {that.state.TenderlistShow ?
//                     that.state.TENDERLISTResponseResult ?
//                         <div>
//                             <h2 style={{ paddingTop: 20, textAlign: 'center', color: 'darkorange' }}><b> Open Purchase Requests </b> </h2>
//                             <div class="table-responsive" style={{ marginTop: 20, paddingRight: 20, paddingLeft: 20 }}>
//                                 <table className="table table-hover">
//                                     <thead>
//                                         <tr className="thead-dark">
//                                             <th> Sr. No.</th>
//                                             <th> Purchase Request No.</th>
//                                             <th> Item Group Name</th>
//                                             <th> Document Due Date </th>
//                                             <th> Required Date </th>
//                                             <th> Action </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {this.state.TENDERLISTResponseResult.map(function (element, key) {
//                                             return <tr>
//                                                 <td>    {key + 1}    </td>
//                                                 <td>    {element.DocNum}      </td>
//                                                 <td>    {element.ItmsGrpNam}   </td>
//                                                 <td>    {element.DocDueDate}   </td>
//                                                 <td>    {element.ReqDate}      </td>
//                                                 {that.state.AlreadySubmittedDraft ?
//                                                     that.state.AlreadySubmittedDraft[element.DocEntry + "-" + element.ItmsGrpCod] ?
//                                                         <td>   <button className="btn btn-success" onClick={(e) => that._EditDraft(element.DocEntry, element.ItmsGrpCod)}>Update</button></td>
//                                                         :
//                                                         <td>   <button className="btn btn-info" onClick={(e) => that._GetTenderDetails(element.DocEntry, element.ItmsGrpCod)}>Apply</button></td>
//                                                     : null
//                                                 }
//                                             </tr>
//                                         })}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                         :
//                         <center style={{ paddingTop: 50 }}><Spinner size={50} color={"red"} /></center>
//                     :
//                     that.state.TENDERLISTDetailResponseResult ?
//                         <>
//                             <section style={{ marginTop: 20, borderColor: "red", borderRadius: 10, borderWidth: 2, borderStyle: "solid", backgroundColor: "#d9d5d4" }}>
//                                 <div style={{ padding: 20, marginTop: 20, borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "white" }}>
//                                     {that.state.EditFieldShow ?
//                                         <h1 style={{ color: 'Black' }}><b>Update Purchase Quotation</b></h1>
//                                         :
//                                         <h1 style={{ color: 'Black' }}><b>Add Purchase Quotation</b></h1>
//                                     }
//                                 </div>
//                                 <h2 style={{ textAlign: 'center', color: 'Red' }}><b> Purchase Request Detail </b> </h2>

//                                 <div class="row">
//                                     <div className="col-md-6" style={{ paddingRight: 20, paddingRight: 20}}>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Purchase Request No.</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{that.state.TENDERLISTDetailResponseResult[0].DocEntry}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                         <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Date</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{that.state.TENDERLISTDetailResponseResult[0].DocDate}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Required Date</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{that.state.TENDERLISTDetailResponseResult[0].ReqDate}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                         <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Valid Date</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{that.state.TENDERLISTDetailResponseResult[0].DocDueDate}</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6" style={{ paddingRight: 20, paddingRight: 20}} >
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-5">
//                                                 <h5>Currency</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div
//                                                     style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{that.state.BusinessPartnersResponseResult[0].Currency}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-5">
//                                                 <h5>Payment Terms</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div
//                                                     style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{that.state.PaymentTermsTypes.find(element => element.value == that.state.TENDERLISTDetailResponseResult[0].PaymentCode).text}</div>
//                                             </div>
//                                             {/* <Dropdown
//                                                     placeholder='Payment Terms'
//                                                     fluid search selection
//                                                     options={that.state.PaymentTermsTypes}
//                                                     onChange={that.PaymentTermsDropChange}
//                                                     // value=
//                                                 /> */}

//                                             {/* <h2>{JSON.stringify(that.state.TENDERLISTDetailResponseResult[0])}</h2>
//                                             <h2>{JSON.stringify(that.state.PaymentTermsTypes)}</h2> */}
//                                             {/* <Dropdown
//                                                 value={that.state.PaymentTermsTypes.filter(
//                                                     option => option.value === that.state.TENDERLISTDetailResponseResult[0].PaymentGroupCode
//                                                   )}
//                                                     placeholder='Payment Terms'
//                                                     fluid search selection                                                    
//                                                     options={that.state.PaymentTermsTypes}
//                                                     onChange={e => {
//                                                         that.PaymentTermsDropChange(e, 'GroupNumber')
//                                                       }}
//                                                       displayValue='PaymentTermsGroupName'
//                                                 /> */}
//                                             {/* <div className="col-md-1">
//                                                 <div style={{paddingRight:10,paddingTop:10}}>
//                                                 {that.state.TENDERLISTDetailResponseResult[0].PaymentTerms ? that.state.TENDERLISTDetailResponseResult[0].PaymentTerms : ""}
//                                             </div>
//                                             </div> */}
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-5">
//                                                 <h5>Payment Terms Remarks</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <input name="PaymentTermsRemarks" placeholder=" Payment Terms Remarks " value={that.state.TENDERLISTDetailResponseResult[0].PaymentTermsRemarks ? that.state.TENDERLISTDetailResponseResult[0].PaymentTermsRemarks : ""} type="text" className="form-control" onChange={this.MainHandleChange} />
//                                             </div>
//                                             <div className="col-md-1">
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-5">
//                                                 <h5>Delivery Terms</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <input name="DeliveryTerms" placeholder=" Delivery Terms " value={that.state.TENDERLISTDetailResponseResult[0].DeliveryTerms ? that.state.TENDERLISTDetailResponseResult[0].DeliveryTerms : ""} type="text" className="form-control" onChange={this.MainHandleChange} />
//                                             </div>
//                                             <div className="col-md-1">
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-5">
//                                                 <h5>Remarks if any</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <input name="DocumentRemarks" placeholder=" Remarks if any " value={that.state.TENDERLISTDetailResponseResult[0].DocumentRemarks ? that.state.TENDERLISTDetailResponseResult[0].DocumentRemarks : ""} type="text" className="form-control" onChange={this.MainHandleChange} />
//                                             </div>
//                                             <div className="col-md-1">
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div class="table-responsive" style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20}}>
//                                     <table className="table table-hover">
//                                         <tr className="thead-dark">
//                                             <th>Line No.</th>
//                                             {/* <th>Select</th> */}
//                                             <th>Item Description</th>
//                                             <th>Unit of Measure</th>
//                                             <th>Quantity</th>
//                                             <th>Required Date</th>
//                                             <th>Budget Price</th>
//                                             <th>Price Before Discount</th>
//                                             <th>Discount %</th>
//                                             <th>Price After Discount</th>
//                                             <th>Price Validity</th>
//                                             <th>Tax Rate</th>
//                                             <th>Freight Charges</th>
//                                             <th>Line Total</th>
//                                             <th>Delivery Date</th>
//                                             <th>Line Remarks</th>
//                                             <th>Delivery Location</th>
//                                             <th>Time Left to Expire</th>
//                                         </tr>
//                                         {that.state.TENDERLISTDetailResponseResult.map(function (item, key) {
//                                             return <>
//                                                 <tr>
//                                                     <td>{key + 1}</td>
//                                                     {/* <td><Switch onChange={(e) => that.DocLineSwitchFunction(e, item, key)} checked={item.Selected} /></td> */}
//                                                     <td>{item.Dscription}</td>
//                                                     <td>{item.UomName}</td>
//                                                     <td>{item.Quantity}</td>
//                                                     <td>{item.ReqDate}</td>
//                                                     <td>{item.BPrice}</td>
//                                                     <td> <input name="Price" value={Number(item.Price) ? Number(item.Price) : ""} placeholder="Price Before Discount" type="number" style={{ padding: 7, width: 100, borderRadius: 3 }} onChange={(e) => that.handleChange(e, key)} /></td>
//                                                     <td> <input name="DiscountPercent" value={Number(item.DiscountPercent) ? Number(item.DiscountPercent) : ""} placeholder="Discount" type="number" style={{ padding: 7, width: 100, borderRadius: 3 }} onChange={(e) => that.handleChange(e, key)} /></td>
//                                                     <td> {(Number(item.Price) - ((Number(item.Price) * Number(item.DiscountPercent)) / 100))}</td>
//                                                     {/* <td> <input name="Price After Discount" placeholder="Price After Discount" type="number" style={{ padding: 7, width: 100, borderRadius: 3 }} onChange={(e) => that.handleChange(e, key)} /></td> */}
//                                                     <td> <input name="PriceValidity" value={item.PriceValidity ? item.PriceValidity : ""} placeholder="Price Validity" type="date" className="form-control" onChange={(e) => that.handleChange(e, key)} /></td>
//                                                     {that.state.VatGroups ?
//                                                         <>
//                                                             {
//                                                                 <td>{Number(that.state.VatGroups[item.TaxCode].VatGroups_Lines[0].Rate)}%</td>
//                                                                 /* <td>{that.state.VatGroups[item.TaxCode].Code} - {that.state.VatGroups[item.TaxCode].Name}</td>
//                                                                 <td>{that.state.VatGroups[item.TaxCode].VatGroups_Lines[0].Rate}%</td> */
//                                                             }
//                                                         </>
//                                                         :
//                                                         null
//                                                     }
//                                                     <td> <input name="FreightCharges" value={Number(item.FreightCharges) ? Number(item.FreightCharges) : ""} placeholder="Freight Charges" type="number" style={{ padding: 7, width: 100, borderRadius: 3, borderColor: "white" }} onChange={(e) => that.handleChange(e, key)} /></td>
//                                                     <td> {((Number(item.Price) - ((Number(item.Price) * Number(item.DiscountPercent)) / 100)) * Number(item.Quantity)) + ((((Number(item.Price) - ((Number(item.Price) * Number(item.DiscountPercent)) / 100)) * Number(item.Quantity)) * (Number(that.state.VatGroups[item.TaxCode].VatGroups_Lines[0].Rate))) / 100)}  </td>
//                                                     <td> <input name="DeliveryDate" value={item.DeliveryDate ? item.DeliveryDate : ""} placeholder="Delivery Date" max={item.ReqDate} type="date" className="form-control" onChange={(e) => that.handleChange(e, key)} /></td>
//                                                     <td> <input name="Remarks" value={item.Remarks ? item.Remarks : ""} placeholder="Remarks" type="text" className="form-control" onChange={(e) => that.handleChange(e, key)} /></td>
//                                                     <td> {item.Location}</td>
//                                                     <td> { }</td>

//                                                 </tr>
//                                             </>
//                                         })
//                                         }
//                                     </table>
//                                 </div>
//                                 <div class="row">   
//                                     <div className="col-md-3" style={{ padding: 10, paddingLeft: 20 }}>
//                                         {that.state.EditFieldShow ?
//                                             <button className="btn btn-success" onClick={this._UpdateDraft}>Update</button>
//                                             :
//                                             <button className="btn btn-success" onClick={this._SaveAsDraft}>Add</button>
//                                         }
//                                         <button className="btn btn-danger" onClick={this._ShowTenderList}>Back</button>
//                                     </div>
//                                     <div className="col-md-5"></div>
//                                     <div className="col-md-4" style={{ padding: 10, paddingLeft: 20, paddingRight: 20 }}>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Total Before Discount</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{this.state.TotalBeforeDiscount}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Total Discount</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{this.state.TotalDiscount}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Total After Discount</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{this.state.TotalAfterDiscount}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Total Freight</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{this.state.TotalFreight}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Total Tax </h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{this.state.TotalTax}</div>
//                                             </div>
//                                         </div>
//                                         <div style={{ paddingTop: 5 }} className="row">
//                                             <div className="col-md-1">
//                                             </div>
//                                             <div className="col-md-5">
//                                                 <h5>Document Total</h5>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div style={{ borderColor: "white", borderRadius: 5, borderWidth: 1, borderStyle: "solid", padding: 5, paddingLeft: 15 }}>{this.state.DocumentTotal}</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </section>
//                         </>
//                         :
//                         <center style={{ paddingTop: 50 }}><Spinner size={50} color={"red"} /></center>
//                 }
//             </>
//         );
//     }
// }
// export default OpenPurchaseRequestsList;
