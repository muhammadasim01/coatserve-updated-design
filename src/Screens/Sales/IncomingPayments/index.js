import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import NumberFormat from "react-number-format";
import Switch from "react-switch";
import { Dots, Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";

import { Navbar } from "../../../Component/Global";

import { CONSTANTS, LINKS } from "../../../Utils";

const axios = require("axios");
class IncomingPayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IncomingPaymentCheckState: false,
      SelectedIncomingPaymentState: [],
      IncomingPayments: [],
      DownPaymentSwitch: true,
      ReserveInvoiceSwitch: true,
    };

    this.IncomingPaymentSwitchFunction = this.IncomingPaymentSwitchFunction.bind(
      this
    );
    this.SwitchFunction = this.SwitchFunction.bind(this);
  }

  componentDidMount = async () => {
    this._load();
  };

  ConvertDateToFormate = (date) => {
    const d = new Date(date);
    const dtf = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(
      d
    );
    var returnDate = `${da} ${mo}, ${ye}`;
    return returnDate;
  };

  _load = async () => {
    var UserName = localStorage.getItem("userName");
    if (!UserName) {
      window.location.href = "/login";
    }

    var cookie = await localStorage.getItem("cookie");
    this.setState({ cookie: cookie });
    var that = this;

    var SapAPiBusinessPartners =
      "BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'cCustomer'  and Valid eq 'tYES'&$orderby=CardName";
    axios
      .post(LINKS.SAP_GET, { api: SapAPiBusinessPartners, cookie: cookie })
      .then(function (response) {
        // handle success
        var arr = [];
        response.data.value.forEach((element) => {
          var arr2 = {
            value: element.CardCode,
            text: element.CardCode + " : " + element.CardName,
          };
          arr.push(arr2);
        });
        that.setState({ CustomersDropDownList: arr });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  CustomerDropChange = async (event, { value }) => {
    await this.setState({ CustomerSelectedState: value });
    this._fetchData();
  };

  _fetchData = async () => {
    this.setState({
      IncomingPaymentGrid: [],
      IncomingPaymentsList: null,
      IncomingPaymentPostResultState: null,
      GLAccountResultResponceState: null,
    });

    let customer = this.state.CustomerSelectedState;
    let cookie = this.state.cookie;
    var that = this;
    let IncomingPaymentGrid = [];
    let IncomingPaymentsList = [];
    let AlreadySubmitted = [];

    // ==================================   Down Payments    =============================================
    if (that.state.DownPaymentSwitch) {
      let InvoiceResponse = [];
      let IncomingPaymentResponse = [];
      var SapAPiInvoices = `DownPayments?$filter=CardCode eq '${customer}' and DocumentStatus eq 'bost_Open' &$select=CardCode,CardName,DocTotal,DocDate,DocEntry,DocNum,DocCurrency,DocumentLines,BPL_IDAssignedToInvoice,DocumentInstallments`;
      await axios
        .post(LINKS.SAP_GET, { api: SapAPiInvoices, cookie: cookie })
        .then(function (response) {
          if (response.data.value) {
            InvoiceResponse = response.data;
          } else {
            alert(response.data.error.message.value);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

      let SapAPIIncomingPayments = `IncomingPayments?$select=DocNum,PaymentInvoices&$filter=CardCode eq '${customer}' and Cancelled eq 'tNO'`;
      await axios
        .post(LINKS.SAP_GET, { api: SapAPIIncomingPayments, cookie: cookie })
        .then(function (SapAPIAlreadySubmittedResponse) {
          if (SapAPIAlreadySubmittedResponse.data.value) {
            IncomingPaymentResponse = SapAPIAlreadySubmittedResponse.data;
          } else {
            alert(SapAPIAlreadySubmittedResponse.data.error.message.value);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

      let InvoicesDocEntries = [];
      InvoiceResponse.value.forEach((element) => {
        InvoicesDocEntries.push(element.DocEntry);
      });

      IncomingPaymentResponse.value.forEach((element) => {
        element["PaymentInvoices"].forEach((el) => {
          if (InvoicesDocEntries.includes(el.DocEntry)) {
            let doc = el;
            let key = `DT${doc.DocEntry + "" + doc.InstallmentId}`;
            if (AlreadySubmitted[key]) {
              doc.SumApplied =
                doc.SumApplied + AlreadySubmitted[key].SumApplied;
            }
            AlreadySubmitted[key] = doc;
          }
        });
      });

      InvoiceResponse.value.forEach((element) => {
        element.DocumentInstallments.forEach((docElement) => {
          let key = "DT" + element.DocEntry + "" + docElement.InstallmentId;
          let amount = docElement.Total;
          let totalPayed = 0;

          if (AlreadySubmitted[key]) {
            totalPayed =
              AlreadySubmitted[key].SumApplied +
              AlreadySubmitted[key].WitholdingTaxApplied;
            amount = docElement.Total - totalPayed;
          }
          if (amount > 0) {
            IncomingPaymentGrid.push(key);
            IncomingPaymentsList[key] = {
              DocEntry: element.DocEntry,
              DocNum: element.DocNum,
              DocDate: element.DocDate,
              CardCode: element.CardCode,
              CardName: element.CardName,
              DocTotal: element.DocTotal,
              DocCurrency: element.DocCurrency,
              DocumentLines: element.DocumentLines,
              BPL_IDAssignedToInvoice: element.BPL_IDAssignedToInvoice,
              InstallmentId: docElement.InstallmentId,
              DueDate: docElement.DueDate,
              TotalAmount: docElement.Total,
              PayedAmount: totalPayed,
              BalanceDue: amount,
              Total: amount,
              DocumentInstallments: element.DocumentInstallments,
              DocumentType: "DT",
              Selected: false,
            };
          }
        });
      });
    }

    // ==================================   Invoices    =============================================
    if (that.state.ReserveInvoiceSwitch) {
      let InvoiceResponse = [];
      let IncomingPaymentResponse = [];
      var SapAPiInvoices = `Invoices?$filter=CardCode eq '${customer}' and DocumentStatus eq 'bost_Open' &$select=CardCode,CardName,DocTotal,DocDate,DocEntry,DocNum,DocCurrency,DocumentLines,BPL_IDAssignedToInvoice,DocumentInstallments`;
      await axios
        .post(LINKS.SAP_GET, { api: SapAPiInvoices, cookie: cookie })
        .then(function (response) {
          if (response.data.value) {
            InvoiceResponse = response.data;
          } else {
            alert(response.data.error.message.value);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

      let SapAPIIncomingPayments = `IncomingPayments?$select=DocNum,PaymentInvoices&$filter=CardCode eq '${customer}' and Cancelled eq 'tNO'`;
      await axios
        .post(LINKS.SAP_GET, { api: SapAPIIncomingPayments, cookie: cookie })
        .then(function (SapAPIAlreadySubmittedResponse) {
          if (SapAPIAlreadySubmittedResponse.data.value) {
            IncomingPaymentResponse = SapAPIAlreadySubmittedResponse.data;
          } else {
            alert(SapAPIAlreadySubmittedResponse.data.error.message.value);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });

      let InvoicesDocEntries = [];
      InvoiceResponse.value.forEach((element) => {
        InvoicesDocEntries.push(element.DocEntry);
      });

      IncomingPaymentResponse.value.forEach((element) => {
        element["PaymentInvoices"].forEach((el) => {
          if (InvoicesDocEntries.includes(el.DocEntry)) {
            let doc = el;
            let key = `IN${doc.DocEntry + "" + doc.InstallmentId}`;
            if (AlreadySubmitted[key]) {
              doc.SumApplied =
                doc.SumApplied + AlreadySubmitted[key].SumApplied;
            }
            AlreadySubmitted[key] = doc;
          }
        });
      });

      InvoiceResponse.value.forEach((element) => {
        element.DocumentInstallments.forEach((docElement) => {
          let key = "IN" + element.DocEntry + "" + docElement.InstallmentId;
          let amount = docElement.Total;
          let totalPayed = 0;

          if (AlreadySubmitted[key]) {
            totalPayed =
              AlreadySubmitted[key].SumApplied +
              AlreadySubmitted[key].WitholdingTaxApplied;
            amount = docElement.Total - totalPayed;
          }
          if (amount > 0) {
            IncomingPaymentGrid.push(key);
            IncomingPaymentsList[key] = {
              DocEntry: element.DocEntry,
              DocNum: element.DocNum,
              DocDate: element.DocDate,
              CardCode: element.CardCode,
              CardName: element.CardName,
              DocTotal: element.DocTotal,
              DocCurrency: element.DocCurrency,
              DocumentLines: element.DocumentLines,
              BPL_IDAssignedToInvoice: element.BPL_IDAssignedToInvoice,
              InstallmentId: docElement.InstallmentId,
              DueDate: docElement.DueDate,
              TotalAmount: docElement.Total,
              PayedAmount: totalPayed,
              BalanceDue: amount,
              Total: amount,
              DocumentInstallments: element.DocumentInstallments,
              DocumentType: "IN",
              Selected: false,
            };
          }
        });
      });
    }

    that.setState({
      IncomingPaymentGrid: IncomingPaymentGrid,
      IncomingPaymentsList: IncomingPaymentsList,
    });
  };

  _SubmitIncomingPayments = async () => {
    var that = this;
    let IncomingPaymentGrid = this.state.IncomingPaymentGrid;
    let PaymentInvoices = [];
    let Total = 0;
    this.setState({
      IncomingPaymentGrid: [],
      IncomingPaymentsList: null,
    });

    IncomingPaymentGrid.forEach((element) => {
      let IncomingPaymentsList = this.state.IncomingPaymentsList[element];
      if (IncomingPaymentsList.Selected) {
        Total = Total + parseInt(IncomingPaymentsList.Total);
        let type =
          IncomingPaymentsList.DocumentType == "DT"
            ? "it_DownPayment"
            : "it_Invoice";
        PaymentInvoices.push({
          DocEntry: IncomingPaymentsList.DocEntry,
          SumApplied: IncomingPaymentsList.Total,
          InvoiceType: type,
          InstallmentId: IncomingPaymentsList.InstallmentId,
        });
      }
    });

    var IncomingPOSTBody = {
      BPLID: 8,
      CardCode: this.state.CustomerSelectedState,
      CashAccount: "A21301002",
      PaymentInvoices: PaymentInvoices,
      CashSum: Total,
    };

    var SAPPostAPiIncomingPayments = "IncomingPayments";
    axios
      .post(LINKS.SAP_POST, {
        body: IncomingPOSTBody,
        api: SAPPostAPiIncomingPayments,
        cookie: that.state.cookie,
      })
      .then(function (re) {
        if (re.data.DocNum) {
          console.log(
            "--------   Incoming Payment of Down Payments    -----------"
          );
          var SAPGetAPIGLAccountDetail = `ChartOfAccounts?$select=Name,Code &$filter=Code eq '${re.data.CashAccount}'`;
          axios
            .post(LINKS.SAP_GET, {
              api: SAPGetAPIGLAccountDetail,
              cookie: that.state.cookie,
            })
            .then(function (GLAccountResponse) {
              if (GLAccountResponse.data.value) {
                that.setState({
                  GLAccountResultResponceState:
                    GLAccountResponse.data.value[0].Name,
                });
              } else {
                that.setState({
                  GLAccountResultResponceState:
                    "{Error in Finding GL Account Name}",
                });
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });

          that.setState({
            IncomingPaymentPostResultState: re.data,
            IncomingPaymentsList: [],
          });
          // that._fetchData();
        } else {
          alert(
            "Incoming Payment API Response Error : " +
              re.data.error.message.value
          );
        }
      })
      .catch(function (e) {
        // handle e
        console.log(e);
      });
  };

  IncomingPaymentSwitchFunction(IncomingPaymentCheckState, item, key) {
    let obj = this.state.IncomingPaymentsList;
    obj[item].Selected = IncomingPaymentCheckState;
    this.setState({ IncomingPaymentsList: obj });
  }

  handleChange = (event, item) => {
    let obj = this.state.IncomingPaymentsList;
    obj[item].Total = event.target.value;
    this.setState({ IncomingPaymentsList: obj });
  };

  onselectFunc() {
    console.log("hello");
  }

  SwitchFunction = async (swich, value) => {
    await this.setState({ [value]: swich });
    this._fetchData();
  };
  render() {
    const that = this;
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", color: "darkorange" }}>
          <b>
            <u>Incoming Payments </u>
          </b>{" "}
        </h2>
        <div className="container">
          <div style={{ paddingBottom: 15 }}>
            <h6>Select Customer</h6>
            <Dropdown
              placeholder="Select Customer"
              fluid
              selection
              search
              options={that.state.CustomersDropDownList}
              onChange={that.CustomerDropChange}
            />
          </div>
          <div className="row">
            <div className="col-md-3 ">
              <div className="form-control">
                <h5>Reserve Invoice</h5>
              </div>
            </div>
            <div className="col-md-3">
              <Switch
                onChange={(e) => that.SwitchFunction(e, "ReserveInvoiceSwitch")}
                checked={that.state.ReserveInvoiceSwitch}
              />
            </div>

            <div className="col-md-3">
              <div className="form-control">
                <h5>Down Payments</h5>
              </div>
            </div>
            <div className="col-md-3">
              <Switch
                onChange={(e) => that.SwitchFunction(e, "DownPaymentSwitch")}
                checked={that.state.DownPaymentSwitch}
              />
            </div>
          </div>
          <div style={{ padding: 20 }}>
            {that.state.IncomingPaymentPostResultState ? (
              <div>
                <p>
                  Incoming Payment{" "}
                  <b>{that.state.IncomingPaymentPostResultState.DocNum}</b>{" "}
                  posted successfully with amount of{" "}
                  <b>
                    {" "}
                    <NumberFormat
                      value={that.state.IncomingPaymentPostResultState.CashSum}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={
                        that.state.IncomingPaymentPostResultState.DocCurrency
                      }
                    />{" "}
                  </b>{" "}
                  in GL Account{" "}
                  <b>
                    {" "}
                    {
                      that.state.IncomingPaymentPostResultState.CashAccount
                    } : {that.state.GLAccountResultResponceState}
                  </b>
                </p>
              </div>
            ) : null}
          </div>

          {this.state.CustomerSelectedState ? (
            <>
              <center style={{ padding: 20 }}>
                <button
                  onClick={this._SubmitIncomingPayments}
                  className="btn btn-info"
                >
                  Submit Details
                </button>
              </center>
              {that.state.IncomingPaymentsList ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr#</th>
                      <th>Selected</th>
                      <th>Document#</th>
                      <th>Installment Id</th>
                      <th>Document Type</th>
                      <th>Date</th>
                      <th>Total Amount</th>
                      <th>Payed Amount</th>
                      <th>Balance Due</th>
                      <th>Total Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {that.state.IncomingPaymentGrid.map(function (item, key) {
                      return (
                        <>
                          <tr>
                            <td>{key + 1}</td>
                            <td>
                              <Switch
                                onChange={(e) =>
                                  that.IncomingPaymentSwitchFunction(
                                    e,
                                    item,
                                    key
                                  )
                                }
                                checked={
                                  that.state.IncomingPaymentsList[item].Selected
                                }
                              />
                            </td>
                            <td>
                              {that.state.IncomingPaymentsList[item].DocNum}
                            </td>
                            <td>
                              {
                                that.state.IncomingPaymentsList[item]
                                  .InstallmentId
                              }
                            </td>
                            <td>
                              {
                                that.state.IncomingPaymentsList[item]
                                  .DocumentType
                              }
                            </td>
                            <td>
                              {that.ConvertDateToFormate(
                                that.state.IncomingPaymentsList[item].DueDate
                              )}
                            </td>
                            <td>
                              <NumberFormat
                                value={that.state.IncomingPaymentsList[
                                  item
                                ].TotalAmount.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                            </td>
                            <td>
                              <NumberFormat
                                value={that.state.IncomingPaymentsList[
                                  item
                                ].PayedAmount.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                            </td>
                            <td>
                              <NumberFormat
                                value={that.state.IncomingPaymentsList[
                                  item
                                ].BalanceDue.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}
                              />
                            </td>
                            <td>
                              <input
                                value={
                                  that.state.IncomingPaymentsList[item].Total
                                }
                                onChange={(e) => that.handleChange(e, item)}
                                type="number"
                                className="form-control"
                                placeholder="Enter Amount"
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <center>
                  {" "}
                  <Spinner />{" "}
                </center>
              )}
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default IncomingPayments;
