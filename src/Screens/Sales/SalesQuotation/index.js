import React, { Component } from 'react';
import {
  Button,
  Card,
  CardGroup,
  Table,
  Container,
  Modal
} from 'react-bootstrap'
import { MenuUp } from 'react-bootstrap-icons';

import Select from 'react-select'
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";
import Switch from "react-switch";

import NumberFormat from "react-number-format";

import { Dots, Spinner, Squares } from "react-activity";



import { CONSTANTS, LINKS } from '../../../Utils';
import { Navbar } from '../../../Component/Global';

import { TextLabel, ItemsWrapper } from './Style';
const axios = require('axios')



class SalesQuotation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      customersDropdownList: [],
      contactPersonDropdown: [],
      selectedItemsState: null,
      taxDropdownList: [],

    }
  }

  async componentDidMount() {
    let cook = await localStorage.getItem('cookie');
    if (cook) {
      this.customersListAPI(cook);
      this.itemsListAPI(cook);
      this.salesTaxAPI(cook);

    }
  }

  customersListAPI = async (cookie) => {
    let res = await this.getApiResponce(LINKS.sap.MasterData.ActiveCustomer, cookie);
    if (res) {
      let dropdownList = await this.getDropdownListWithValue(res, 'CardName', 'CardCode')
      this.setState({ customersDropdownList: dropdownList })
    }
  }

  itemsListAPI = async (cookie) => {
    let res = await this.getApiResponce(LINKS.sap.MasterData.ActiveSalesItems, cookie);
    if (res) {
      let dropdownList = await this.getDropdownListWithValue(res, 'ItemName', 'ItemCode');
      this.setState({ itemsDropdownList: dropdownList })
    }
  }

  salesTaxAPI = async (cookie) => {
    let res = await this.getApiResponce(LINKS.sap.MasterData.ActiveSalesTax, cookie);
    if (res) {
      let dropdownList = await this.getDropdownListWithValue(res, 'Name', 'Code');
      this.setState({ taxDropdownList: dropdownList });
    }
  }

  getApiResponce = async (api, cookie) => {

    let result = null

    await axios.post(LINKS.SERVER_GET, {
      api: api,
      cookie: cookie
    }).then(function (res) {
      if (res.data.value) {
        result = res.data.value;
      }
      else {
        this.notification(`[SAP Error in ${api}]: - - - `, JSON.stringify(res.data.error.message.value));
        result = null;
      }
    }).catch(function (error) {
      this.notification(`Network Error in ${api}`, JSON.stringify(error));
      result = null;
    });

    console.log("==========================")
    console.log(`${api} `)
    console.log("==========================")
    console.log(result);

    return result;
  }

  // --------------------------------
  getDropdownListWithValue = (list, label, value) => {
    let ItemsDropDown = []
    list.forEach(element => {
      ItemsDropDown.push({
        value: element[value],
        label: `${element[value]}: ${element[label]}`,
        ...element
      })
    })
    return ItemsDropDown;
  }

  getDropdownList = (list, label, value) => {
    let ItemsDropDown = []
    list.forEach(element => {
      ItemsDropDown.push({
        value: element[value],
        label: element[label],
        ...element
      })
    })
    return ItemsDropDown;
  }

  notification = (title, message) => {
    alert(`${title} ${message}`)
  }

  lineTextChange = (e, index) => {
    let obj = this.state.selectedItemsState;
    let value = e.target.value;
    let name = e.target.name;

    obj[index][name] = value
    if (name === 'Discount' && obj[index].UnitPrice > 0) {
      obj[index]['PriceAfterVAT'] = (obj[index].UnitPrice - (value * obj[index].UnitPrice) / 100);
    }
    else if (name === 'UnitPrice' && obj[index].Discount > 0) {
      obj[index]['PriceAfterVAT'] = (value - (value * obj[index].Discount) / 100);
    }
    else if (name === 'PriceAfterVAT' && obj[index].UnitPrice > 0) {
      obj[index]['Discount'] = 100 - ((value / obj[index].UnitPrice) * 100);
    }

    this.setState({ selectedItemsState: obj })
  }

  taxGroupSelect = (e, item, index) => {

    let grossPriceAfterDiscount = parseFloat(item.PriceAfterVAT) + (e.VatGroups_Lines[0].Rate * item.PriceAfterVAT) / 100;
    let taxAmountLC = item.QuotedQuantity * (e.VatGroups_Lines[0].Rate * item.PriceAfterVAT) / 100;

    let obj = this.state.selectedItemsState;
    obj[index]['GrossPriceAfterDiscount'] = grossPriceAfterDiscount
    obj[index]['taxAmountLC'] = taxAmountLC

    this.setState({
      selectedTaxGroupState: e,
      selectedItemsState: obj
    })


  }



  render() {
    const that = this;
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", color: "darkorange" }}>
          <b>
            <u>Sales Quotation </u>
          </b>
        </h2>

        <div style={{ padding: 20 }}>
          <div className="row" style={{ paddingTop: 20 }}>
            <div className="col-md-4">

              <TextLabel>Select Customer</TextLabel>
              <Select
                placeholder='Select..'
                options={this.state.customersDropdownList}
                onChange={e => {
                  console.log(e)
                }}
                displayValue='name' // Property name to display in the dropdown options
              />
              <br />

              {/* Items Selection */}
              <TextLabel>Select Items</TextLabel>
              <Select
                placeholder='Select Items...'
                isMulti
                options={this.state.itemsDropdownList}
                onChange={e => { this.setState({ selectedItemsState: e }) }}
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </div>
          <br />


          {/* Selected Items Values */}
          <>
            {this.state.selectedItemsState ? (
              <div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Sr#</th>
                      <th>Item Code</th>
                      <th>Item Name</th>
                      <th>Unit</th>
                      <th>Free Text</th>
                      <th>Quoted Qty</th>
                      <th>Open Qty</th>
                      <th>Unit Price</th>
                      <th>Discount</th>
                      <th>Price After Discount</th>
                      <th>Tax Group</th>
                      <th>Percentage</th>
                      <th>Gross Price after discount</th>
                      <th>Tax Amount (LC)</th>
                      <th>Total (LC)</th>
                      <th>Gross (LC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.selectedItemsState.map(function (item, index) {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.ItemCode}</td>
                          <td>{item.ItemName}</td>
                          <td>{item.SalesUnit}</td>
                          {/* Free Text */}
                          <td>
                            <input
                              type='text'
                              name='FreeText'
                              className='form-control'
                              placeholder={item.FreeText}
                              onChange={e => { that.lineTextChange(e, index) }}
                            />
                          </td>
                          {/* Quoted Quantity */}
                          <td>
                            <input
                              type='number'
                              name='QuotedQuantity'
                              className='form-control'
                              placeholder={item.QuotedQuantity}
                              onChange={e => { that.lineTextChange(e, index) }}
                            />
                          </td>
                          {/* Open Quantity */}
                          <td>{item.QuotedQuantity}</td>
                          {/* Unit Price */}
                          <td>
                            <input
                              type='number'
                              name='UnitPrice'
                              className='form-control'
                              placeholder={item.UnitPrice}
                              placeholder={item.UnitPrice}
                              onChange={e => { that.lineTextChange(e, index) }}
                            />
                          </td>
                          {/* Discount */}
                          <td>
                            <input
                              type='number'
                              name='Discount'
                              className='form-control'
                              placeholder={item.Discount}
                              value={item.Discount}
                              onChange={e => { that.lineTextChange(e, index) }}
                            />
                          </td>
                          {/* Price After VAT */}
                          <td>
                            <input
                              type='number'
                              name='PriceAfterVAT'
                              className='form-control'
                              placeholder={item.PriceAfterVAT}
                              value={item.PriceAfterVAT}
                              onChange={e => { that.lineTextChange(e, index) }}
                            />
                          </td>
                          {/* Tax Group */}
                          <td style={{ width: 250 }}>
                            <Select
                              placeholder='Select Items...'
                              options={that.state.taxDropdownList}
                              onChange={e => { that.taxGroupSelect(e, item, index) }}
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          </td>
                          {/* Tax Percentage */}
                          <td> {that.state.selectedTaxGroupState && `${that.state.selectedTaxGroupState.VatGroups_Lines[0].Rate}%`} </td>
                          {/* Gross Price After Discount */}
                          <td> {item.GrossPriceAfterDiscount && item.GrossPriceAfterDiscount  } </td>
                          {/* Tax Amount LLC*/}
                          <td> {item.taxAmountLC && item.taxAmountLC  } </td>
                          {/* Total LLC*/}
                          <td> {(item.PriceAfterVAT && item.QuotedQuantity ) && item.QuotedQuantity *item.PriceAfterVAT } </td>
                          {/* Gross Total LLC*/}
                          <td> {(item.GrossPriceAfterDiscount && item.QuotedQuantity ) && item.QuotedQuantity *item.GrossPriceAfterDiscount } </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <button className="btn btn-info" onClick={this._postData}> Add </button>
              </div>
            ) : null}
          </>
        </div>
      </>
    )
  }
}

export default SalesQuotation;