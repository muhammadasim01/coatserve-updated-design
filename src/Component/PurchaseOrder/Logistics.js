
import React from 'react'
import {
  Button, Accordion, Card, CardGroup,
  Container,Form, Table
} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
import Select from 'react-select'
const axios = require('axios')
  const Logistics = ({getdefaultdata}) =>  {

  const [ShippingTypes, setShippingTypes] = React.useState()
  const [ShippingTypesDropDown, setShippingTypesDropDown] = React.useState()
  const [SalesEmployee, setSalesEmployee] = React.useState()
  const [getheaderdata, setgetheaderdata] = React.useState()
  const [SalesEmployeeDropDown, setSalesEmployeeDropDown] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
    shipping(cook)
    salesemployee(cook)
  }, [])
  

  const shipping = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.shipping, cookie: cookie }
      )
      .then(function (res) {
        setShippingTypes(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []
          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name,
            })
          })
          setShippingTypesDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  React.useEffect(() => {
    setgetheaderdata(getdefaultdata)
    console.log("AAA",getdefaultdata)
  }, [getdefaultdata])
  const salesemployee = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.salesEmployee, cookie: cookie }
      )
      .then(function (res) {
        setSalesEmployee(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.SalesEmployeeCode,
              label: element.SalesEmployeeName,
            })
          })
          setSalesEmployeeDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <>
    <Form>
        <CardGroup>
            <div style={{ width: '30rem' }} >
          <Container fluid>
              {/* <card > */}
              {/* <Button onClick={e=>{console.log("Check", getdefaultdata)}}>Test</Button> */}
                <div style={{ width: '23.5rem', height: 'auto' }}>
                  <label>Ship To</label>
                  <Select
                    placeholder={getheaderdata && getheaderdata.item.ShipToDefault}
                    options={ShippingTypesDropDown} // Options to display in the dropdown
                    displayValue='name' // Property name to display in the dropdown options
                  />
                </div>
                <div class="form-outline" style={{ width: '23.5rem', height: 'auto' }}>
                  <br />
                  <textarea class="form-control" value={getheaderdata && getheaderdata.item.Address} id="textAreaExample" rows="3"></textarea>
                </div>
                <button>..</button>
                <div style={{ width: '23.5rem', height: 'auto' }}>
                  <label>Bill to</label>
                  <Select
                    placeholder={getheaderdata && getheaderdata.item.BilltoDefault}
                    options={ShippingTypesDropDown} // Options to display in the dropdown
                    displayValue='name' // Property name to display in the dropdown options
                  />
                </div>
                <div class="form-outline" style={{ width: '23.5rem', height: 'auto' }}>
                  <br />
                  <textarea class="form-control" id="textAreaExample" rows="3"></textarea>
                </div>
                <button>..</button>
                <div style={{ width: '23.5rem', height: 'auto' }}>
                  <label>Shipping types</label>
                  <Select
                    placeholder='Select'
                    options={ShippingTypesDropDown} // Options to display in the dropdown
                    displayValue='name' // Property name to display in the dropdown options
                  />
                </div>
                <br />
                <br />
                <br />
                <br />
                {/* </card> */}
          </Container>
                </div>
          <div style={{ width: '40rem' }} ></div>
          {/* <Container fluid> */}
              <div style={{ width: '30rem', height: 'auto' }}>
            {/* <card> */}
              <div style={{ width: '21rem', height: 'auto' }}>
                <label>Language</label>
                <select
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='text'
                  class='form-control'
                  id='Name'
                  aria-describedby='Name'
                  placeholder=''
                />
              </div>
              <br />
              <br />
              <br />
              <br />
              <div style={{ width: '21rem', height: 'auto' }}>
                <label>BP Channel Name</label>
                <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='text'
                  class='form-control'
                  id='Name'
                  aria-describedby='Name'
                  placeholder=''
                ></input>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div style={{ width: '21rem', height: 'auto' }}>
                <label>BP Channel Contact</label>
                <input
                  //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                  type='number'
                  class='form-control'
                  id='number'
                  aria-describedby='number'
                  placeholder=''
                ></input>
              </div>
              <br />
              <br />
              <br />
              <br />
            {/* </card> */}
            </div>
          {/* </Container>  */}
          </CardGroup>
        </Form>
    </>
  )
}
export default Logistics;
