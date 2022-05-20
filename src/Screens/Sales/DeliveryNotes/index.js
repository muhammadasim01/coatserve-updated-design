import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

import { Navbar } from "../../../Component/Global";

import { CONSTANTS, LINKS } from "../../../Utils";

const axios = require("axios");
class DeliveryNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SerialState: [],
      selectedSerials: [],
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

    // -------------------------    SERIALNOQUANTITES API GET DATA   -----------------------------------------------------------
    var SapAPiSerialNumber = "sml.svc/SERIALNOQUANTITES";
    axios
      .post(LINKS.SAP_GET, { api: SapAPiSerialNumber, cookie: cookie })
      .then(function (SerialResponse) {
        // handle success
        var data = {};
        SerialResponse.data.value.forEach((element) => {
          var arr2 = [];
          if (data) {
            let key = element.ItemCode + "" + element.WhsCode;
            if (data[key]) {
              arr2 = data[key];
            }
          }
          var arr = { value: element.SysNumber, text: element.IntrSerial };
          arr2.push(arr);

          data[element.ItemCode + "" + element.WhsCode] = arr2;
        });
        that.setState({ SerialResponseListState: data });
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
    this.setState({
      DropDownListReserveInvoice: [],
      SelectedReserveInvoice: null,
    });
    let customer = this.state.DropChangeCustomerState;
    let cookie = this.state.cookie;
    var that = this;

    let SapApiReserveInvoices = `Invoices?$filter=CardCode eq '${customer}' and DocumentStatus eq 'bost_Open' &$select=DocEntry,DocNum,DocDate,CardCode,CardName,DocTotal,BPL_IDAssignedToInvoice,DocumentLines,DocCurrency  `;
    axios
      .post(LINKS.SAP_GET, { api: SapApiReserveInvoices, cookie: cookie })
      .then(function (response) {
        if (response.data.value) {
          let ReserveInvoice = [];
          let arr = [];
          response.data.value.forEach((element) => {
            ReserveInvoice[element.DocEntry] = {
              DocEntry: element.DocEntry,
              DocNum: element.DocNum,
              DocDate: element.DocDate,
              CardCode: element.CardCode,
              CardName: element.CardName,
              DocTotal: element.DocTotal,
              DocCurrency: element.DocCurrency,
              DocumentLines: element.DocumentLines,
              BPL_IDAssignedToInvoice: element.BPL_IDAssignedToInvoice,
              SerialNumbers: [],
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
          });
          that.setState({
            DropDownListReserveInvoice: arr,
            ReserveInvoiceState: ReserveInvoice,
          });
        } else {
          alert(response.data.error.message.value);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  SubmitDownPayment = () => {
    let that = this;
    let state = this.state;
    let docLines = [];
    state.ReserveInvoiceState[
      state.DropChangeReserveInvoiceState
    ].DocumentLines.forEach((element) => {
      docLines.push({
        BaseEntry: state.DropChangeReserveInvoiceState,
        BaseLine: element.LineNum,
        BaseType: "17",
      });
    });

    var DownPaymentPostBody = {
      CardCode:
        state.ReserveInvoiceState[state.DropChangeReserveInvoiceState].CardCode,
      DocumentLines: docLines,
      DownPaymentType: "dptRequest",
      DocTotal: that.state.DownPayment,
      BPL_IDAssignedToInvoice:
        state.ReserveInvoiceState[state.DropChangeReserveInvoiceState]
          .BPL_IDAssignedToInvoice,
    };

    if (
      state.DropChangeReserveInvoiceState != "" &&
      state.DropChangeReserveInvoiceState != null &&
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

            that.setState({ DownPaymentsPostResultState: res.data });
          } else {
            alert.error(
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

  DropChangeReserveInvoice = async (event, { value }) => {
    await this.setState({
      SelectedReserveInvoice: null,
      DeliveryNotesResultState: null,
    });
    let SelectedReserveInvoice = this.state.ReserveInvoiceState[value];

    this.setState({
      DropChangeReserveInvoiceState: value,
      SelectedReserveInvoice: SelectedReserveInvoice,
    });
  };

  handleDropSerialChange = (event, { value }) => {
    this.setState({ SerialState: value });
  };

  HandleSerial = async (key, item) => {
    let obj = this.state.ReserveInvoiceState;
    let SerialNumbers = [];
    let SelectedSerials = this.state.SerialState;
    if (SelectedSerials.length === obj[item].DocumentLines[key].Quantity) {
      if (Array.isArray(SelectedSerials)) {
        SelectedSerials.forEach((element) => {
          SerialNumbers.push({
            SystemSerialNumber: element,
          });
        });
      }
      obj[item].DocumentLines[key]["SerialNumbers"] = SerialNumbers;
    } else {
      alert("Kindly Adjust Serials with Quantity");
    }
    console.log(obj[item].DocumentLines[key]);
    await this.setState({ ReserveInvoiceState: obj, SerialState: [] });
  };

  _postData = async () => {
    let ReserveInvoiceResponse = this.state.ReserveInvoiceState[
      this.state.DropChangeReserveInvoiceState
    ];
    this.PostDeliveryNotes(ReserveInvoiceResponse);
  };

  PostDeliveryNotes(ReserveInvoiceResponse) {
    let that = this;
    let selectedSerialsObj = this.state.selectedSerials;
    console.log(selectedSerialsObj);
    let DeliveryNotesDocLine = [];

    ReserveInvoiceResponse.DocumentLines.forEach((element) => {
      DeliveryNotesDocLine.push({
        BaseType: 13,
        BaseEntry: ReserveInvoiceResponse.DocEntry,
        BaseLine: element.LineNum,
        WarehouseCode: element.WarehouseCode,
        SerialNumbers: element.SerialNumbers,
      });
    });

    var bodyDeliveryNotes = {
      BPL_IDAssignedToInvoice: 8,
      CardCode: this.state.DropChangeCustomerState,
      DocumentLines: DeliveryNotesDocLine,
    };
    console.log(bodyDeliveryNotes);

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
            SelectedReserveInvoice: null,
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
        console.log(error);
      });

    that.setState({ bodyDeliveryNotes: bodyDeliveryNotes });
  }

  render() {
    const that = this;
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", color: "darkorange" }}>
          <b>
            <u>Delivery Notes</u>
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
              placeholder="Select Reserve Invoices"
              fluid
              search
              selection
              options={that.state.DropDownListReserveInvoice}
              onChange={that.DropChangeReserveInvoice}
            />
          </div>
          <div>
            {that.state.SelectedReserveInvoice ? (
              <div>
                <br />
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Sr#</th>
                      <th>Item Code</th>
                      <th>Item Name</th>
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Serial #</th>
                    </tr>
                  </thead>
                  <tbody>
                    {that.state.SelectedReserveInvoice.DocumentLines.map(
                      function (item, key) {
                        return (
                          <tr>
                            {item.LineStatus === "bost_Open" ? (
                              <>
                                <td>{key}</td>
                                <td>{item.ItemCode}</td>
                                <td>{item.ItemDescription}</td>
                                <td>{item.MeasureUnit}</td>
                                <td>{item.Quantity}</td>
                                <td>
                                  <Dropdown
                                    placeholder="Select Serial"
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={
                                      that.state.SerialResponseListState[
                                        item.ItemCode + "" + item.WarehouseCode
                                      ]
                                    }
                                    onChange={that.handleDropSerialChange}
                                    onBlur={(e) =>
                                      that.HandleSerial(
                                        key,
                                        that.state.SelectedReserveInvoice
                                          .DocEntry
                                      )
                                    }
                                  />
                                </td>
                              </>
                            ) : null}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>

                <button className="btn btn-info" onClick={that._postData}>
                  Post Delivery Notes
                </button>
              </div>
            ) : null}
          </div>
          <div style={{ padding: 20 }}>
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
          </div>
        </div>
      </div>
    );
  }
}

export default DeliveryNotes;
