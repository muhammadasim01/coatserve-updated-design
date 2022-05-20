import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import { Navbar } from "../../../Component/Global";

import { CONSTANTS, LINKS } from "../../../Utils";
import {
  Attachment,
  Logistics,
  Accounting
} from '../../../Component/CustomerDetail';

const API_TYPES = {
  GET: `${LINKS.api}/GetApi`,
  POST: `${LINKS.api}/POSTApi`,
};

const axios = require("axios");
// const [ButtonDropdown, setButtonDropdown] = this.setState();
class CustomerDetails extends Component {
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
      .post(API_TYPES.GET, { api: SapAPiBusinessPartners, cookie: cookie })
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
      })
      .then(function () {
        // always executed
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  SubmitPersonalDetails = () => {
    let that = this;
    let state = this.state;
    if (
      state.DropChangeSaleOrderState != "" &&
      state.DropChangeSaleOrderState != null &&
      state.fullname != "" &&
      state.fatherName != "" &&
      state.address != "" &&
      state.city != "" &&
      state.postalcode != "" &&
      state.province != "" &&
      state.country != "" &&
      state.cnic != "" &&
      state.email != "" &&
      state.phone1 != "" &&
      state.phone2 != ""
    ) {
      let SelectedSaleOrder =
        that.state.SaleOrderDataState[that.state.DropChangeSaleOrderState];
      var PostBodyOCPI = {
        Code: SelectedSaleOrder.DocNum,
        Name: SelectedSaleOrder.CardName,
        U_BaseEntry: that.state.DropChangeSaleOrderState,
        U_CardCode: SelectedSaleOrder.CardCode,
        U_FullName: that.state.fullname,
        U_FatherName: that.state.fatherName,
        U_Address: that.state.address,
        U_City: that.state.city,
        U_PostalCode: that.state.postalcode,
        U_Province: that.state.province,
        U_Country: that.state.country,
        U_CNIC: that.state.cnic,
        U_Email: that.state.email,
        U_Mobile1: that.state.phone1,
        U_Mobile2: that.state.phone2,
      };
      var SAPPostAPiOCPI = "OCPI";
      console.log("Body ", PostBodyOCPI);
      axios
        .post(API_TYPES.POST, {
          body: PostBodyOCPI,
          api: SAPPostAPiOCPI,
          cookie: that.state.cookie,
        })
        .then(function (ResponseCustomer) {
          if (ResponseCustomer.data.Code) {
            console.log(
              "----------------  Response Customer Api (OCPI)  ---------------"
            );
            that.setState({
              OCPIPostResultState: ResponseCustomer.data,
              SaleOrderDataState: null,
              DropDownListSalesOrder: null,
              DropChangeCustomerState: null,
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
            });
            alert("posted Successfully");
            that.props.history.push("/");
            console.log("----------------------------------------------");
          } else {
            alert(
              "Customer Detail Response Error (OCPI) : " +
                ResponseCustomer.data.error.message.value
            );
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      alert("kindly fill all the fields ");
    }

    // ||||||||||||||||||||||||||||||||||       OCPI API END            ||||||||||||||||||||||||||||||||||||
  };

  DropChangeCustomer = (event, { value }) => {
    this.setState({ DropChangeCustomerState: value });
  };

  DropChangeSaleOrder = (event, { value }) => {
    this.setState({ DropChangeSaleOrderState: value });
  };

  _OCPIApiResponce = async (response) => {
    let customer = this.state.DropChangeCustomerState;
    let cookie = this.state.cookie;
    var that = this;

    let SapApiOCPI = `OCPI?$filter=U_CardCode eq '${customer}'  and  (`;
    response.data.value.forEach((element) => {
      SapApiOCPI = SapApiOCPI + `U_BaseEntry eq '${element.DocEntry}'  or `;
    });

    SapApiOCPI = SapApiOCPI.substring(0, SapApiOCPI.length - 4);
    SapApiOCPI = SapApiOCPI + ")";

    let AlreadyHaveCustomerSaleOrder = [];
    await axios
      .post(API_TYPES.GET, { api: SapApiOCPI, cookie: cookie })
      .then(function (ResponceOCPI) {
        ResponceOCPI.data.value.forEach((element) => {
          AlreadyHaveCustomerSaleOrder.push(parseInt(element.U_BaseEntry));
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    var arr = [];

    let SaleOrderData = [];

    response.data.value.forEach((element) => {
      if (!AlreadyHaveCustomerSaleOrder.includes(element.DocEntry)) {
        SaleOrderData[element.DocEntry] = {
          DocEntry: element.DocEntry,
          DocNum: element.DocNum,
          DocDate: element.DocDate,
          CardCode: element.CardCode,
          CardName: element.CardName,
          DocTotal: element.DocTotal,
          DocCurrency: element.DocCurrency,
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
      SaleOrderDataState: SaleOrderData,
    });
  };

  handleDropChangeCustomer = () => {
    let customer = this.state.DropChangeCustomerState;
    let cookie = this.state.cookie;
    var that = this;

    // `$crossjoin(SpecialPrices,Items)?$expand=SpecialPrices($select=ItemCode,CardCode,Price,Valid),Items($select=ItemCode,ItemName,SalesUnit)&$filter=SpecialPrices/ItemCode eq Items/ItemCode and SpecialPrices/CardCode eq 'C00001'  and Items/SalesItem eq 'tYES'  and Items/Valid eq 'tYES'`
    var SapAPiSalesOrders = `Orders?$filter=CardCode eq '${customer}' and DocumentStatus eq 'bost_Open' &$select=CardCode,CardName,DocTotal,DocDate,DocEntry,DocNum,DocCurrency`;

    axios
      .post(API_TYPES.GET, { api: SapAPiSalesOrders, cookie: cookie })
      .then(function (response) {
        // handle success
        // console.log(response.data.value)
        if (response.data.value) {
          that._OCPIApiResponce(response);
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

  render() {
    const that = this;
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", color: "darkorange" }}>
          <b>
            <u>Customer Personal Information </u>
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
            <div className="row">
              <div className="col-md-4">
                <h6>Full Name</h6>
                <input
                  value={this.state.fullname}
                  onChange={this.handleChange}
                  type="text"
                  name="fullname"
                  className="form-control"
                  placeholder=" Full Name"
                />
                <h6>Father Name</h6>
                <input
                  value={this.state.fatherName}
                  onChange={this.handleChange}
                  type="text"
                  name="fatherName"
                  className="form-control"
                  placeholder=" father Name"
                />
                <h6>CNIC</h6>
                <input
                  value={this.state.cnic}
                  onChange={this.handleChange}
                  type="number"
                  name="cnic"
                  className="form-control"
                  placeholder=" CNIC"
                />
                <h6>Email </h6>
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder=" Email"
                />
              </div>

              <div className="col-md-4">
                <h6>Mobile 1 </h6>
                <input
                  value={this.state.phone1}
                  onChange={this.handleChange}
                  type="number"
                  name="phone1"
                  className="form-control"
                  placeholder=" Mobile 1"
                />
                <h6>City</h6>
                <input
                  value={this.state.city}
                  onChange={this.handleChange}
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder=" city"
                />
                <h6>Postal Code</h6>
                <input
                  value={this.state.postalcode}
                  onChange={this.handleChange}
                  type="number"
                  name="postalcode"
                  className="form-control"
                  placeholder=" Postal Code"
                />
                <h6>Address</h6>
                <input
                  value={this.state.address}
                  onChange={this.handleChange}
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                />
              </div>

              <div className="col-md-4">
                <h6>Mobile 2</h6>
                <input
                  value={this.state.phone2}
                  onChange={this.handleChange}
                  type="number"
                  name="phone2"
                  className="form-control"
                  placeholder=" Mobile 2"
                />
                <h6>Province</h6>
                <input
                  value={this.state.province}
                  onChange={this.handleChange}
                  type="text"
                  name="province"
                  className="form-control"
                  placeholder=" Province"
                />
                <h6>Country</h6>
                <input
                  value={this.state.country}
                  onChange={this.handleChange}
                  type="text"
                  name="country"
                  className="form-control"
                  placeholder=" Country"
                />
              </div>
            </div>
          ) : null}
        </div>
        {/* {ButtonDropdown == 'Logistics' && <Logistics/>}
        {ButtonDropdown == 'Accounting' && <Accounting/>}
        {ButtonDropdown == 'Attachment' && <Attachment/>}

        <ul class='nav nav-tabs nav-justified'>
        <li class='nav-item'>
          <a
            class='nav-link active '
            data-toggle='tab'
            onClick={() => {
              setButtonDropdown('Logistics')
              
            }}
          >
            Logistics
          </a>
        </li>
        <li class='nav-item'>
          <a
            class='nav-link'
            data-toggle='tab'
            onClick={() => {
              setButtonDropdown('Accounting')
            }}
          >
            Accounting
          </a>
        </li>
        <li class='nav-item'>
          <a
            class='nav-link'
            data-toggle='tab'
            onClick={() => {
              setButtonDropdown('Attachment')
            }}
          >
            Attachment
          </a>
        </li>
       
      </ul> */}
      


        <center style={{ padding: 20 }}>
          <button onClick={this.SubmitPersonalDetails} className="btn btn-info">
            Submit Details
          </button>
        </center>
      </div>
    );
  }
}

export default CustomerDetails;
