import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import NumberFormat from "react-number-format";

import { Navbar } from "../../../Component/Global";

import { CONSTANTS, LINKS } from "../../../Utils";

const axios = require("axios");
class DownPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      fatherName: "",
      cnic: "",
      email: "",
      phone1: "",
      phone2: "",
      city: "",
      province: "",
      country: "",
      address: "",
      postalcode: "",
    };
  }
  componentDidMount = async () => {
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

  DropChangeCustomer = (event, { value }) => {
    this.setState({ DropChangeCustomerState: value });
  };

  handleDropChangeCustomer = () => {
    let customer = this.state.DropChangeCustomerState;
    let cookie = this.state.cookie;
    var that = this;

    // `$crossjoin(SpecialPrices,Items)?$expand=SpecialPrices($select=ItemCode,CardCode,Price,Valid),Items($select=ItemCode,ItemName,SalesUnit)&$filter=SpecialPrices/ItemCode eq Items/ItemCode and SpecialPrices/CardCode eq 'C00001'  and Items/SalesItem eq 'tYES'  and Items/Valid eq 'tYES'`
    var SapAPiSalesOrders = `Orders?$filter=CardCode eq '${customer}' and DocumentStatus eq 'bost_Open' &$select=CardCode,CardName,DocTotal,DocDate,DocEntry,DocNum,DocCurrency,DocumentLines`;

    axios
      .post(LINKS.SAP_GET, { api: SapAPiSalesOrders, cookie: cookie })
      .then(function (response) {
        // handle success
        // console.log(response.data.value)
        if (response.data.value) {
          that._DownPaymentApiResponce(response);
        } else {
          alert(response.data.error.message.value);
        }
        // console.log(arr)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  SubmitDownPayment = () => {
    let that = this;
    let state = this.state;
    console.log(state.DownPaymentsState[state.DropChangeSaleOrderState]);
    console.log(state.DropChangeSaleOrderState);
    let docLines = [];
    state.DownPaymentsState[
      state.DropChangeSaleOrderState
    ].DocumentLines.forEach((element) => {
      docLines.push({
        BaseEntry: state.DropChangeSaleOrderState,
        BaseLine: element.LineNum,
        BaseType: "17",
      });
    });
    console.log(docLines);

    var DownPaymentPostBody = {
      CardCode:
        state.DownPaymentsState[state.DropChangeSaleOrderState].CardCode,
      DocumentLines: docLines,
      DownPaymentType: "dptRequest",
      DocTotal: that.state.DownPayment,
      BPL_IDAssignedToInvoice: 8,
    };
    console.log(JSON.stringify(DownPaymentPostBody));

    if (
      state.DropChangeSaleOrderState != "" &&
      state.DropChangeSaleOrderState != null &&
      that.state.DownPayment != ""
    ) {
      var SAPPostAPiDownPayment = "DownPayments";
      axios
        .post(LINKS.SAP_POST, {
          body: DownPaymentPostBody,
          api: SAPPostAPiDownPayment,
          cookie: that.state.cookie,
        })
        .then(function (res) {
          if (res.data.DocNum) {
            console.log(
              "----------------   Down Payments Api Response Start   ---------------"
            );
            console.log(res);
            that.setState({ DownPaymentsPostResultState: res.data });
          } else {
            alert(
              "DownPayment API Responce Error : " +
                String(res.data.error.message.value)
            );
          }
        })
        .catch(function (er) {
          // handle er
          console.log(er);
        });
      // ||||||||||||||||||||||||||||    Down Payment API End   ||||||||||||||||||||||||||
    } else {
      alert("kindly fill all the fields ");
    }

    // ||||||||||||||||||||||||||||||||||       OCPI API END            ||||||||||||||||||||||||||||||||||||
  };

  DropChangeSaleOrder = (event, { value }) => {
    this.setState({ DropChangeSaleOrderState: value });
  };

  _DownPaymentApiResponce = async (response) => {
    let customer = this.state.DropChangeCustomerState;
    let cookie = this.state.cookie;
    var that = this;

    let SapApiDownPayments = `DownPayments?$filter=CardCode eq '${customer}'`;
    let AlreadyHaveDownPaymentSaleOrder = [];

    await axios
      .post(LINKS.SAP_GET, { api: SapApiDownPayments, cookie: cookie })
      .then(function (ResponceDownPayments) {
        ResponceDownPayments.data.value.forEach((element) => {
          AlreadyHaveDownPaymentSaleOrder.push(
            parseInt(element.DocumentLines[0].BaseEntry)
          );
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    var arr = [];
    let DownPayments = [];
    response.data.value.forEach((element) => {
      if (!AlreadyHaveDownPaymentSaleOrder.includes(element.DocEntry)) {
        DownPayments[element.DocEntry] = {
          DocEntry: element.DocEntry,
          DocNum: element.DocNum,
          DocDate: element.DocDate,
          CardCode: element.CardCode,
          CardName: element.CardName,
          DocTotal: element.DocTotal,
          DocCurrency: element.DocCurrency,
          DocumentLines: element.DocumentLines,
        };
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
      } else {
        console.log("already present ", element.DocEntry);
      }
    });
    that.setState({
      DropDownListSalesOrder: arr,
      DownPaymentsState: DownPayments,
    });
  };

  render() {
    const that = this;
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", color: "darkorange" }}>
          <b>
            <u>DownPayment Requests </u>
          </b>{" "}
        </h2>
        <div className="container">
          <div style={{ paddingBottom: 15 }}>
            <h6>Select Customer</h6>
            <Dropdown
              placeholder="Select Customer"
              fluid
              search
              selection
              options={that.state.CustomersDropDownList}
              onChange={that.DropChangeCustomer}
              onBlur={() => that.handleDropChangeCustomer()}
            />
            <Dropdown
              placeholder="Select Customer"
              fluid
              search
              selection
              options={that.state.DropDownListSalesOrder}
              onChange={that.DropChangeSaleOrder}
            />
          </div>

          {this.state.DropChangeCustomerState ? (
            <input
              value={this.state.DownPayment}
              onChange={this.handleChange}
              type="number"
              name="DownPayment"
              className="form-control"
              placeholder="Enter Down Payment"
            />
          ) : null}
        </div>
        <center style={{ padding: 20 }}>
          <button onClick={this.SubmitDownPayment} className="btn btn-info">
            Submit Details
          </button>
        </center>
        <div style={{ padding: 20 }}>
          {that.state.DownPaymentsPostResultState ? (
            <div>
              <p>
                Down Payment Request{" "}
                <b>{that.state.DownPaymentsPostResultState.DocNum}</b> posted
                successfully with Amount of{" "}
                <b>
                  {" "}
                  <NumberFormat
                    value={that.state.DownPaymentsPostResultState.DocTotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={that.state.DownPaymentsPostResultState.DocCurrency}
                  />
                </b>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default DownPayment;
