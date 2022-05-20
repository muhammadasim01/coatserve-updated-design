import React, { Component } from "react";

import Switch from "react-switch";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import NumberFormat from "react-number-format";

import { Dots, Spinner } from "react-activity";

import { Navbar } from "../../../Component/Global";

import { CONSTANTS, LINKS } from "../../../Utils";

const axios = require("axios");
class ReserveInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DropChangeItemsState: null,
      PostingData: true,
      SaleOrdersSerials: [],
    };
  }

  componentDidMount = async () => {
    this._load();
  };
  _load = async () => {
    var UserName = localStorage.getItem("userName");
    if (!UserName) {
      window.location.href = "/login";
    }

    var cookie = localStorage.getItem("cookie");
    await this.setState({ cookie: cookie });
    this._GetItems();
    this._GetBusinessPartners();
    this._GetSerailOfItems();
  };

  // -------------------------    Load Functions  ------------------------
  _GetBusinessPartners = async () => {
    var that = this;
    var SapAPiBusinessPartners =
      "BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'cCustomer'  and Valid eq 'tYES'&$orderby=CardName";
    axios
      .post(LINKS.SAP_GET, {
        api: SapAPiBusinessPartners,
        cookie: that.state.cookie,
      })
      .then(function (response) {
        var arr = [];
        if (response.data.value) {
          response.data.value.forEach((element) => {
            var arr2 = {
              value: element.CardCode,
              text: element.CardCode + " : " + element.CardName,
            };
            arr.push(arr2);
          });
          that.setState({ CustomersDropDownList: arr });
        } else {
          alert(response.data.error.message.value);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  _GetItems = async () => {
    this.setState({
      DropChangeItemsState: null,
      ShowItemsDropDown: false,
    });
    let that = this;
    let ItemsResponseResult = null;
    let SapApiItems =
      "Items?$filter=(ItemCode eq 'RM008771' or ItemCode eq 'RM004778')";
    await axios
      .post(LINKS.SAP_GET, { api: SapApiItems, cookie: that.state.cookie })
      .then(function (ItemsResponse) {
        if (ItemsResponse.data.value) {
          ItemsResponseResult = ItemsResponse;
        } else {
          alert(ItemsResponse.data.error.message.value);
        }
      });
    let ItemsDropDown = [];
    let ItemsDetail = [];
    if (ItemsResponseResult) {
      ItemsResponseResult.data.value.forEach((element) => {
        ItemsDetail[element.ItemCode] = {
          ItemCode: element.ItemCode,
          ItemName: element.ItemName,
          SalesUnit: element.SalesUnit,
          ItemPrices: element.ItemPrices[0].Price,
          Quantity: 1,
          Serials: [],
        };
        ItemsDropDown.push({ value: element.ItemCode, text: element.ItemName });
      });
    } else {
      alert("no Items Responce");
    }

    this.setState({
      ItemsDropDown: ItemsDropDown,
      ItemsDetail: ItemsDetail,
    });
  };
  _GetSerailOfItems = async () => {
    // -------------------------    SERIALNOQUANTITES API GET DATA   -----------------------------------------------------------
    let that = this;
    var SapAPiSerialNumber = "sml.svc/SERIALNOQUANTITES";
    axios
      .post(LINKS.SAP_GET, {
        api: SapAPiSerialNumber,
        cookie: that.state.cookie,
      })
      .then(function (SerialResponse) {
        // handle success
        var data = {};
        SerialResponse.data.value.forEach((element) => {
          var arr2 = [];
          if (data) {
            if (data[element.ItemCode]) {
              arr2 = data[element.ItemCode];
            }
          }
          var arr = { value: element.SysNumber, text: element.IntrSerial };
          arr2.push(arr);

          data[element.ItemCode] = arr2;
        });
        that.setState({ SerialResponseListState: data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  // ---------------------------------------------------------------------

  // =========================    Main Fucntions  ========================
  DropChangeCustomer = (event, { value }) => {
    this.setState({
      DropChangeCustomerState: value,
      ReserveInvoicePostResultState: null,
      IncomingPaymentPostResultState: null,
      DeliveryNotesResultState: null,
      DropChangeItemsState: null,
      DropChangeSaleOrderState: null,
      ShowSaleOrdersDropDownList: false,
      ShowItemsDropDown: false,
    });
    if (this.state.BaseDocumentCheck) {
      this.setState({
        ShowSaleOrdersDropDownList: true,
      });
      this._SaleOrdersOfCustomer();
    } else {
      this.setState({
        ShowItemsDropDown: true,
      });
    }
  };
  BaseDocumentCheckFunction = (e) => {
    this.setState({
      BaseDocumentCheck: e,
      ReserveInvoicePostResultState: null,
      IncomingPaymentPostResultState: null,
      DeliveryNotesResultState: null,
      DropChangeItemsState: null,
      DropChangeSaleOrderState: null,
      ShowSaleOrdersDropDownList: false,
      ShowItemsDropDown: false,
    });
    if (e) {
      this.setState({
        ShowSaleOrdersDropDownList: true,
      });
      this._SaleOrdersOfCustomer();
    } else {
      this.setState({
        ShowItemsDropDown: true,
      });
    }
  };
  GenrateReserveInvoice = (DocAmount) => {
    let DocTotal = DocAmount;
    let DocumentInstallments = [];
    let singleInstallement = parseInt(DocTotal / 12);
    let lastInstallment = DocTotal - singleInstallement * 11;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    today =
      yyyy +
      "-" +
      String(mm).padStart(2, "0") +
      "-" +
      String(dd).padStart(2, "0");

    DocumentInstallments.push({
      DueDate: today,
      Total: singleInstallement,
      InstallmentId: 0,
    });

    for (var i = 1; i < 11; i++) {
      mm = mm + 1;
      if (mm > 12) {
        mm = 1;
        yyyy = yyyy + 1;
      }

      let date = yyyy + "-" + String(mm).padStart(2, "0") + "-01";
      DocumentInstallments.push({
        DueDate: date,
        Total: singleInstallement,
        InstallmentId: i,
      });
    }

    mm = mm + 1;
    let Lastdate = yyyy + "-" + String(mm).padStart(2, "0") + "-01";
    DocumentInstallments.push({
      DueDate: Lastdate,
      Total: lastInstallment,
      InstallmentId: 11,
    });
    return DocumentInstallments;
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
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // ======================================================================

  // ++++++++++++++++++++++++++ Sale Order Functions  +++++++++++++++++++++
  _SaleOrdersOfCustomer = async () => {
    await this.setState({
      SaleOrdersDropDownList: null,
      DropChangeSaleOrderState: null,
      ReserveInvoicePostResultState: null,
      saleOrdersList: null,
      saleOrder: null,
    });

    let customer = this.state.DropChangeCustomerState;
    let cookie = this.state.cookie;
    var that = this;

    var SapAPiDownPayment = `DownPayments?$filter=CardCode eq '${customer}' and DocumentStatus eq 'bost_Close' &$select=CardCode,CardName,DocTotal,DocDate,DocEntry,DocNum,DocCurrency,DocumentLines,BPL_IDAssignedToInvoice`;
    axios
      .post(LINKS.SAP_GET, { api: SapAPiDownPayment, cookie: cookie })
      .then(function (response) {
        if (response.data.value) {
          that._SaleOrders(response);
        } else {
          alert(response.data.error.message.value);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  _SaleOrders = async (response) => {
    let customer = this.state.DropChangeCustomerState;
    let cookie = this.state.cookie;
    var that = this;

    let SapApiOrders = `Orders?$select=BPL_IDAssignedToInvoice,CardCode,CardName,DocTotal,DocDate,DocEntry,DocNum,DocCurrency,DocumentLines&$filter=CardCode eq '${customer}' and DocumentStatus eq 'bost_Open' and  (`;
    response.data.value.forEach((element) => {
      SapApiOrders =
        SapApiOrders + `DocEntry eq ${element.DocumentLines[0].BaseEntry}  or `;
    });
    SapApiOrders = SapApiOrders.substring(0, SapApiOrders.length - 4);
    SapApiOrders = SapApiOrders + ")";

    await axios
      .post(LINKS.SAP_GET, { api: SapApiOrders, cookie: cookie })
      .then(function (OrdersResponse) {
        if (OrdersResponse.data.value) {
          let arr = [];
          let Orders = [];
          OrdersResponse.data.value.forEach((element) => {
            var arr2 = {
              value: element.DocEntry,
              text:
                "Document# :" +
                element.DocNum +
                "  Date :" +
                element.DocDate +
                " " +
                element.DocCurrency +
                ":" +
                element.DocTotal,
            };
            arr.push(arr2);

            let docLines = [];
            element.DocumentLines.forEach((element) => {
              if (element.LineStatus === "bost_Open") {
                docLines.push({
                  LineNum: element.LineNum,
                  ItemCode: element.ItemCode,
                  ItemDescription: element.ItemDescription,
                  WarehouseCode: element.WarehouseCode,
                  Quantity: element.Quantity,
                  ShipDate: element.ShipDate,
                  Price: element.Price,
                  GrossTotal: element.GrossTotal,
                  LineStatus: element.LineStatus,
                  Selected: true,
                  Serails: [],
                });
              }
            });

            Orders[element.DocEntry] = {
              DocEntry: element.DocEntry,
              DocNum: element.DocNum,
              DocDate: element.DocDate,
              CardCode: element.CardCode,
              CardName: element.CardName,
              DocTotal: element.DocTotal,
              DocCurrency: element.DocCurrency,
              DocumentLines: docLines,
              BPL_IDAssignedToInvoice: element.BPL_IDAssignedToInvoice,
            };
          });
          that.setState({
            SaleOrdersDropDownList: arr,
            OrdersState: Orders,
          });
        } else {
          alert(OrdersResponse.data.error.message.value);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  DropChangeSaleOrder = (event, { value }) => {
    this.setState({
      DropChangeSaleOrderState: value,
      ReserveInvoicePostResultState: null,
      IncomingPaymentPostResultState: null,
      DeliveryNotesResultState: null,
    });
  };
  DocLineSwitchFunction = (e, item, docKey) => {
    let obj = this.state.OrdersState;
    obj[item].DocumentLines[docKey].Selected = e;
    this.setState({
      OrdersState: obj,
    });
  };
  HandleSerialAgainstOrders = (DocEntry, LineNum) => {
    // console.log(key)
    var obj = this.state.SaleOrdersSerials;
    let key = DocEntry + "" + LineNum;

    let SerialNumbers = [];
    let SelectedSerials = this.state.SerialState;
    if (Array.isArray(SelectedSerials)) {
      SelectedSerials.forEach((element) => {
        SerialNumbers.push({
          SystemSerialNumber: element,
        });
      });
    } else {
      alert("kindly select atleast one serail for one product");
    }
    obj[key] = SerialNumbers;
    console.log(obj);

    this.setState({ SaleOrdersSerials: obj });
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // """""""""""""""""""""""""""""" Base on Items """"""""""""""""""""""""""""""""""
  DropChangeItems = (event, { value }) => {
    this.setState({
      DropChangeItemsState: value,
      ReserveInvoicePostResultState: null,
      DeliveryNotesResultState: null,
      IncomingPaymentPostResultState: null,
    });
  };
  ItemQuantityChangeEvent(e, key, item) {
    var obj = this.state.ItemsDetail;
    obj[item].Quantity = e.target.value;
    this.setState({ ItemsDetail: obj });
  }
  DevlieryNoteCheckFunc = (e) => {
    this.setState({
      DevlieryNoteCheck: e,
    });
  };
  IncomingPaymentFunc = (e) => {
    this.setState({
      IncomingPaymentCheck: e,
    });
  };
  handleDropSerialChange = (event, { value }) => {
    this.setState({ SerialState: value });
  };
  HandleSerial = (key, item) => {
    // console.log(key)
    var obj = this.state.ItemsDetail;

    let SerialNumbers = [];
    let SelectedSerials = this.state.SerialState;
    if (Array.isArray(SelectedSerials)) {
      SelectedSerials.forEach((element) => {
        SerialNumbers.push({
          SystemSerialNumber: element,
        });
      });
    } else {
      alert("kindly select atleast one serail for one product");
    }
    obj[item].Serials = SerialNumbers;
    obj[item].Quantity = obj[item].Serials.length;

    this.setState({ ItemsDetail: obj });
  };
  // """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

  // ******************************   Submit Functions ********************
  _SubmitReserveInvoice = () => {
    this.setState({ PostingData: false });
    if (this.state.BaseDocumentCheck) {
      this._SubmitReserveInvoiceAgainstOrders();
    } else {
      this._SubmitReserveInvoiceAgainstItems();
    }
  };
  _SubmitReserveInvoiceAgainstOrders = async () => {
    let saleOrder = this.state.OrdersState;

    let SaleOrdersSerials = this.state.SaleOrdersSerials;

    let docLines = [];
    let DocTotal = 0;
    let that = this;

    let SerailQuantityCheck = true;

    let saleOrdersList = this.state.DropChangeSaleOrderState;
    saleOrdersList.forEach((el) => {
      saleOrder[el].DocumentLines.forEach((element) => {
        if (element.Selected) {
          let Serialkey = saleOrder[el].DocEntry + "" + element.LineNum;
          if (SaleOrdersSerials[Serialkey]) {
            if (SaleOrdersSerials[Serialkey].length != element.Quantity) {
              SerailQuantityCheck = false;
            }
          }

          DocTotal = DocTotal + element.GrossTotal;
          docLines.push({
            BaseEntry: saleOrder[el].DocEntry,
            BaseLine: element.LineNum,
            BaseType: "17",
          });
        }
      });
    });

    if (DocTotal > 0) {
      if (!this.state.DevlieryNoteCheck) {
        SerailQuantityCheck = true;
      }

      if (SerailQuantityCheck) {
        let docInvoices = that.GenrateReserveInvoice(DocTotal);

        that.setState({ InvoicesList: docInvoices });
        let ReserveInvoicebodyPost = {
          BPL_IDAssignedToInvoice:
            saleOrder[saleOrdersList[0]].BPL_IDAssignedToInvoice,
          ReserveInvoice: "tYES",
          PaymentGroupCode: 43,
          CardCode: this.state.DropChangeCustomerState,
          DocumentInstallments: docInvoices,
          DocumentLines: docLines,
        };

        let SAPPostAPiReserveInvoice = "Invoices";
        await axios
          .post(LINKS.SAP_POST, {
            body: ReserveInvoicebodyPost,
            api: SAPPostAPiReserveInvoice,
            cookie: that.state.cookie,
          })
          .then(function (ReserveInvoiceResponse) {
            if (ReserveInvoiceResponse.data.DocNum) {
              console.log(
                "----------------   Reserve Invoice Api Response Start   ---------------"
              );
              that.setState({
                ReserveInvoicePostResultState: ReserveInvoiceResponse.data,
                DropChangeSaleOrderState: null,
              });
              if (that.state.DevlieryNoteCheck) {
                that.PostDeliveryNotesAgainstOrders(ReserveInvoiceResponse);
              }
            } else {
              alert(
                "Reserve Invoice API Responce Error : " +
                  ReserveInvoiceResponse.data.error.message.value
              );
            }
          })
          .catch(function (er) {
            // handle er
            console.log(er);
          });
      } else {
        alert("Kindly AdjustSerials With Quantity");
      }
    } else {
      alert("Kindly Select Items");
    }
    this.setState({ PostingData: true });
  };
  _SubmitReserveInvoiceAgainstItems = async () => {
    let that = this;
    let ItemsDetails = this.state.ItemsDetail;
    let ItemsList = this.state.DropChangeItemsState;
    console.log(ItemsDetails);
    console.log(ItemsList);

    let QuantityOfSerials = true;

    let DocTotal = 0;
    let DocLines = [];
    ItemsList.forEach((element) => {
      let Quantity = ItemsDetails[element].Quantity;
      if (Quantity < 1) {
        Quantity = 1;
      }
      if (ItemsDetails[element].Serials.length < 1) {
        QuantityOfSerials = false;
      }

      let LineTotal =
        parseInt(ItemsDetails[element].ItemPrices) *
        parseInt(ItemsDetails[element].Quantity);
      let LineTax = (LineTotal / 100) * 17;
      let GrossAmount = LineTotal + LineTax;
      DocTotal = DocTotal + GrossAmount;
      DocLines.push({
        ItemCode: ItemsDetails[element].ItemCode,
        Quantity: Quantity,
        Price: ItemsDetails[element].ItemPrices,
      });
    });

    if (!this.state.DevlieryNoteCheck) {
      QuantityOfSerials = true;
    }

    if (QuantityOfSerials) {
      let ReserveInvoicebodyPost = {
        BPL_IDAssignedToInvoice: 8,
        ReserveInvoice: "tYES",
        PaymentGroupCode: -1,
        CardCode: this.state.DropChangeCustomerState,
        DocumentLines: DocLines,
      };

      let SAPPostAPiReserveInvoice = "Invoices";
      let ReserveInvoiceResponseResult = [];
      console.log(ReserveInvoicebodyPost);
      await axios
        .post(LINKS.SAP_POST, {
          body: ReserveInvoicebodyPost,
          api: SAPPostAPiReserveInvoice,
          cookie: that.state.cookie,
        })
        .then(function (ReserveInvoiceResponse) {
          if (ReserveInvoiceResponse.data.DocNum) {
            console.log(
              "----------------   Reserve Invoice Api Response Start   ---------------"
            );
            that.setState({
              ReserveInvoicePostResultState: ReserveInvoiceResponse.data,
              DropChangeItemsState: null,
            });
            ReserveInvoiceResponseResult = ReserveInvoiceResponse;
          } else {
            alert(
              "Reserve Invoice API Responce Error : " +
                ReserveInvoiceResponse.data.error.message.value
            );
          }
        })
        .catch(function (er) {
          console.log(er);
        });

      if (this.state.DevlieryNoteCheck) {
        this.PostDeliveryNotes(ReserveInvoiceResponseResult);
      }
      if (that.state.IncomingPaymentCheck) {
        that._postIncomingPayments(ReserveInvoiceResponseResult);
      }
    } else {
      alert("Kindly Select Serails Of Relative Items");
    }

    this.setState({ PostingData: true });
  };
  PostDeliveryNotes(ReserveInvoiceResponse) {
    let that = this;
    let selectedSerialsObj = this.state.ItemsDetail;
    let DeliveryNotesDocLine = [];
    ReserveInvoiceResponse.data.DocumentLines.forEach((element) => {
      DeliveryNotesDocLine.push({
        BaseType: 13,
        BaseEntry: ReserveInvoiceResponse.data.DocEntry,
        BaseLine: element.LineNum,
        WarehouseCode: "03",
        SerialNumbers: selectedSerialsObj[element.ItemCode].Serials,
      });
    });

    var bodyDeliveryNotes = {
      BPL_IDAssignedToInvoice: 8,
      CardCode: this.state.DropChangeCustomerState,
      DocumentLines: DeliveryNotesDocLine,
    };

    var SAPPostAPiDeliveryNotes = "DeliveryNotes";

    axios
      .post(LINKS.SAP_POST, {
        body: bodyDeliveryNotes,
        api: SAPPostAPiDeliveryNotes,
        cookie: that.state.cookie,
      })
      .then(function (DeliveryNotesResponse) {
        if (DeliveryNotesResponse.data.DocEntry) {
          console.log(
            "----------------  Successfully Posted Delivery Notes  ---------------"
          );
          that.setState({
            DeliveryNotesResultState: DeliveryNotesResponse.data,
          });

          console.log(DeliveryNotesResponse);
        } else {
          alert(
            "Delivery Notes API Response Error: " +
              DeliveryNotesResponse.data.error.message.value
          );
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    this._GetSerailOfItems();

    that.setState({ bodyDeliveryNotes: bodyDeliveryNotes });
  }
  _postIncomingPayments(res) {
    var that = this;
    // ||||||||||||||||||||||||||||    IncomingPayments API Start   ||||||||||||||||||||||||||
    var IncoicePOSTBody = {
      BPLID: res.data.BPL_IDAssignedToInvoice,
      CardCode: res.data.CardCode,
      CashAccount: "A21301002",
      PaymentInvoices: [
        {
          DocEntry: res.data.DocEntry,
          SumApplied: res.data.DocTotal,
          InvoiceType: "it_Invoice",
        },
      ],
      CashSum: res.data.DocTotal,
    };

    var SAPPostAPiIncomiingPayment = "IncomingPayments";
    console.log(IncoicePOSTBody);

    axios
      .post(LINKS.SAP_POST, {
        body: IncoicePOSTBody,
        api: SAPPostAPiIncomiingPayment,
        cookie: that.state.cookie,
      })
      .then(function (re) {
        if (re.data.DocNum) {
          console.log(
            "--------   Invoice of Down Payments Api Response Start     -----------"
          );

          var SAPGetAPIGLAccountDetail = `ChartOfAccounts?$select=Name,Code &$filter=Code eq '${re.data.CashAccount}'`;
          axios
            .post(LINKS.SAP_GET, {
              api: SAPGetAPIGLAccountDetail,
              cookie: that.state.cookie,
            })
            .then(function (GLAccountResponse) {
              console.log(GLAccountResponse);
              that.setState({
                GLAccountResultResponceState:
                  GLAccountResponse.data.value[0].Name,
              });
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .then(function () {
              // always executed
            });

          that.setState({ IncomingPaymentPostResultState: re.data });
          console.log(re);
        } else {
          alert("Invoice API Response Error : " + re.data.error.message.value);
        }
      })
      .catch(function (e) {
        // handle e
        console.log(e);
      });

    // ||||||||||||||||||||||||||||    IncomingPayments API End   ||||||||||||||||||||||||||
  }
  PostDeliveryNotesAgainstOrders(ReserveInvoiceResponse) {
    let that = this;
    let SaleOrdersSerials = this.state.SaleOrdersSerials;
    let DeliveryNotesDocLine = [];
    ReserveInvoiceResponse.data.DocumentLines.forEach((element) => {
      DeliveryNotesDocLine.push({
        BaseType: 13,
        BaseEntry: ReserveInvoiceResponse.data.DocEntry,
        BaseLine: element.LineNum,
        WarehouseCode: "03",
        SerialNumbers:
          SaleOrdersSerials[element.BaseEntry + "" + element.BaseLine],
      });
    });

    var bodyDeliveryNotes = {
      BPL_IDAssignedToInvoice: 8,
      CardCode: this.state.DropChangeCustomerState,
      DocumentLines: DeliveryNotesDocLine,
    };
    var SAPPostAPiDeliveryNotes = "DeliveryNotes";
    axios
      .post(LINKS.SAP_POST, {
        body: bodyDeliveryNotes,
        api: SAPPostAPiDeliveryNotes,
        cookie: that.state.cookie,
      })
      .then(function (DeliveryNotesResponse) {
        if (DeliveryNotesResponse.data.DocEntry) {
          console.log(
            "----------------  Successfully Posted Delivery Notes  ---------------"
          );
          that.setState({
            DeliveryNotesResultState: DeliveryNotesResponse.data,
          });
        } else {
          alert(
            "Delivery Notes API Response Error: " +
              DeliveryNotesResponse.data.error.message.value
          );
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    that.setState({ bodyDeliveryNotes: bodyDeliveryNotes });
  }
  // **********************************************************************

  render() {
    const that = this;
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", color: "darkorange" }}>
          <b>
            <u>Reserve Invoice </u>
          </b>{" "}
        </h2>
        <div className="container">
          <div style={{ paddingBottom: 15 }}>
            {that.state.CustomersDropDownList ? (
              <div className="row">
                <div className="col-md-9">
                  <h5>Select Customer</h5>
                  <Dropdown
                    placeholder="Select Customer"
                    fluid
                    search
                    selection
                    options={that.state.CustomersDropDownList}
                    onChange={that.DropChangeCustomer}
                  />
                </div>
                <div className="col-md-3">
                  <h5>Select Base Document</h5>
                  <Switch
                    onChange={(e) => that.BaseDocumentCheckFunction(e)}
                    checked={that.state.BaseDocumentCheck}
                  />
                </div>
              </div>
            ) : (
              <center>
                <Spinner />
              </center>
            )}

            {/* Items DropDown */}
            <div className="row">
              <div className="col-md-12">
                {this.state.ShowItemsDropDown ? (
                  that.state.ItemsDropDown ? (
                    <Dropdown
                      placeholder="Select Items"
                      fluid
                      search
                      selection
                      multiple
                      options={that.state.ItemsDropDown}
                      onChange={that.DropChangeItems}
                    />
                  ) : (
                    <center>
                      <Spinner />
                    </center>
                  )
                ) : null}
              </div>
            </div>

            {/* Sales Orders DropDown */}
            <div className="row">
              <div className="col-md-12">
                {}
                {this.state.ShowSaleOrdersDropDownList ? (
                  this.state.SaleOrdersDropDownList ? (
                    <Dropdown
                      placeholder="Select Sale Orders"
                      fluid
                      search
                      selection
                      multiple
                      options={that.state.SaleOrdersDropDownList}
                      onChange={that.DropChangeSaleOrder}
                    />
                  ) : (
                    <center>
                      {" "}
                      <Spinner />
                    </center>
                  )
                ) : null}
              </div>
            </div>
          </div>

          <center>
            <button
              onClick={this._SubmitReserveInvoice}
              className="btn btn-info"
            >
              Post Reserve Invoice
            </button>
          </center>

          {this.state.DropChangeItemsState ? (
            <>
              <div className="row" style={{ padding: 10 }}>
                <div className="col-md-1">
                  <Switch
                    onChange={(e) => that.DevlieryNoteCheckFunc(e)}
                    checked={that.state.DevlieryNoteCheck}
                  />
                </div>
                <div className="col-md-5">
                  <h3>Post Delivery Notes</h3>
                </div>
                <div className="col-md-1">
                  <Switch
                    onChange={(e) => that.IncomingPaymentFunc(e)}
                    checked={that.state.IncomingPaymentCheck}
                  />
                </div>
                <div className="col-md-5">
                  <h3> Post Incoming Payment </h3>
                </div>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Sr#</th>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>UOM</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    {that.state.DevlieryNoteCheck ? <th>Serails</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {this.state.DropChangeItemsState.map(function (item, key) {
                    return (
                      <tr>
                        <td>{key}</td>
                        <td>{that.state.ItemsDetail[item].ItemCode}</td>
                        <td>{that.state.ItemsDetail[item].ItemName}</td>
                        <td>{that.state.ItemsDetail[item].SalesUnit}</td>
                        <td>{that.state.ItemsDetail[item].ItemPrices}</td>

                        {that.state.DevlieryNoteCheck ? (
                          <>
                            <td> {that.state.ItemsDetail[item].Quantity} </td>
                            <td>
                              <Dropdown
                                placeholder="Select Serial"
                                fluid
                                multiple
                                search
                                selection
                                options={
                                  that.state.SerialResponseListState[item]
                                }
                                onChange={that.handleDropSerialChange}
                                onBlur={(e) => that.HandleSerial(key, item)}
                              />
                            </td>
                          </>
                        ) : (
                          <td>
                            <input
                              className="form-control"
                              value={that.state.ItemsDetail[item].Quantity}
                              onChange={(e) =>
                                that.ItemQuantityChangeEvent(e, key, item)
                              }
                              placeholder="1"
                            />
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : null}
          {this.state.DropChangeSaleOrderState ? (
            <>
              <div className="row" style={{ padding: 10 }}>
                <div className="col-md-1">
                  <Switch
                    onChange={(e) => that.DevlieryNoteCheckFunc(e)}
                    checked={that.state.DevlieryNoteCheck}
                  />
                </div>
                <div className="col-md-11">
                  <h3>Post Delivery Notes</h3>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Document#</th>
                    <th>Line#</th>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Item Quantity</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.DropChangeSaleOrderState
                    ? this.state.DropChangeSaleOrderState.map(function (
                        item,
                        key
                      ) {
                        return that.state.OrdersState[item].DocumentLines.map(
                          function (docItem, docKey) {
                            return (
                              <tr>
                                <td>
                                  <Switch
                                    onChange={(e) =>
                                      that.DocLineSwitchFunction(
                                        e,
                                        item,
                                        docKey
                                      )
                                    }
                                    checked={docItem.Selected}
                                  />
                                </td>
                                <td>{that.state.OrdersState[item].DocNum}</td>
                                <td>{docItem.LineNum}</td>
                                <td>{docItem.ItemCode}</td>
                                <td>{docItem.ItemDescription}</td>
                                <td>{docItem.Quantity}</td>
                                <td>{docItem.Price}</td>
                                <td>
                                  <Dropdown
                                    placeholder="Select Serial"
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={
                                      that.state.SerialResponseListState[
                                        docItem.ItemCode
                                      ]
                                    }
                                    onChange={that.handleDropSerialChange}
                                    onBlur={(e) =>
                                      that.HandleSerialAgainstOrders(
                                        that.state.OrdersState[item].DocEntry,
                                        docItem.LineNum
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          }
                        );
                      })
                    : null}
                </tbody>
              </table>
            </>
          ) : null}
        </div>
        {that.state.PostingData ? (
          <div className="container" style={{ padding: 20 }}>
            {that.state.ReserveInvoicePostResultState ? (
              <div>
                <center>
                  Reserve Invoice{" "}
                  <b>{that.state.ReserveInvoicePostResultState.DocNum}</b>{" "}
                  posted sucessfully with Installment Plan
                </center>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <td>Installment ID</td>
                      <td>Due Date</td>
                      <td>Amount</td>
                    </tr>
                  </thead>
                  <tbody>
                    {that.state.ReserveInvoicePostResultState.DocumentInstallments.map(
                      function (item, key) {
                        return (
                          <>
                            <tr>
                              <td>{item.InstallmentId}</td>
                              <td>{that.ConvertDateToFormate(item.DueDate)}</td>
                              <td>
                                <NumberFormat
                                  value={item.Total}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={
                                    that.state.ReserveInvoicePostResultState
                                      .DocCurrency
                                  }
                                />
                              </td>
                            </tr>
                          </>
                        );
                      }
                    )}
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <NumberFormat
                          value={
                            that.state.ReserveInvoicePostResultState.DocTotal
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={
                            that.state.ReserveInvoicePostResultState.DocCurrency
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}
            {that.state.DeliveryNotesResultState ? (
              <div>
                <center>
                  Delivery Notes{" "}
                  <b>{that.state.DeliveryNotesResultState.DocNum}</b> posted
                  sucessfully with Serial
                </center>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <td>Item Code</td>
                      <td>Item Name</td>
                      <td>Serials</td>
                    </tr>
                  </thead>
                  <tbody>
                    {that.state.DeliveryNotesResultState.DocumentLines.map(
                      function (item, key) {
                        return (
                          <>
                            <tr>
                              <td>{item.ItemCode}</td>
                              <td>{item.ItemDescription}</td>
                              <td>
                                {item.SerialNumbers.map(function (item, key) {
                                  return (
                                    <>
                                      <div>{item.InternalSerialNumber} </div>
                                    </>
                                  );
                                })}
                              </td>
                            </tr>
                          </>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}
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
        ) : (
          <center>
            <Spinner />
          </center>
        )}
      </div>
    );
  }
}

export default ReserveInvoice;
