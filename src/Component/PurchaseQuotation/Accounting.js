import React from 'react'
import {
  Button,
  Accordion,
  Container,
  Card,
  CardGroup,
  Table
} from 'react-bootstrap'
import { CONSTANTS, LINKS } from '../../Utils'
import Select from 'react-select'
const axios = require('axios')

const Accounting = ({
  setgetJournalMemo,
  setgetGroupNumber,
  setgetProject,
  setgetCancelDate
}) => {
  //const[IndicatorAccounting, setIndicatorAccounting]
  const [PaymentTerms, setPaymentTerms] = React.useState()
  const [PaymentDropdown, setPaymentDropdown] = React.useState()
  const [Project, setProject] = React.useState()
  const [setProjectDropDown, setsetProjectDropDown] = React.useState()
  const [Indicator, setIndicator] = React.useState()
  const [IndicatorDropDown, setIndicatorDropDown] = React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')

    paymentType(cook)
    project(cook)
    indicator(cook)
  }, [])
  const paymentType = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.paymentTerms.Payment, cookie: cookie }
      )
      .then(function (res) {
        setPaymentTerms(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.GroupNumber,
              label: element.PaymentTermsGroupName
            })
          })
          // console.log()
          setPaymentDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const project = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.projects, cookie: cookie }
      )
      .then(function (res) {
        setProject(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Code + ':' + element.Name
            })
          })
          setsetProjectDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const indicator = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.PurchaseQuotation.Indicator, cookie: cookie }
      )
      .then(function (res) {
        setIndicator(res.data.value)
        console.log(res.data.value)
        if (res.data.value) {
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.IndicatorCode,
              label: element.IndicatorName
            })
          })
          setIndicatorDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
    <div style={{ borderBottom:'1px outset' }}>
      <CardGroup>
        <div style={{ width: '30%' ,marginBottom:'10%'}}>
          <Container fluid>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Journal Remark</label>
              <input
                type='text'
                class='form-control'
                id='Name'
                aria-describedby='Name'
                placeholder=''
                onChange={e => {
                  setgetJournalMemo(e.target.value)
                  console.log(e.target.value)
                }}
              />
            </div>

            <div style={{ width: '23.5rem', height: 'auto' }}>
              <label>Payment Terms</label>
              <Select
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='select'
                options={PaymentDropdown}
                onChange={e => {
                  setgetGroupNumber(e.value)
                  console.log(e.value)
                }}
              />
            </div>
          </Container>
        </div>
        <div style={{ width: '40%' }}></div>
        <div style={{ width: '30%' }}>
          <Container fluid>
            <div style={{ width: '21rem', height: 'auto' }}>
              <label>BP Project</label>
              <Select
                // )}
                placeholder='Contact Person'
                options={setProjectDropDown} // Options to display in the dropdown
                displayValue='name' // Property name to display in the dropdown options
                  onChange={e => {
                    setgetProject(e.value)
                    console.log(e.value)
                  }}
              />
            </div>
            <div style={{ width: '21rem', height: 'auto', marginTop: '5px' }}>
              <label>Cancellation Date</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='Date'
                class='form-control'
                id='Date'
                aria-describedby='Date'
                placeholder='Date'
                onChange={e => {
                  setgetCancelDate(e.target.value)
                  console.log(e.target.value)
                }}
              ></input>
            </div>
          </Container>
        </div>
      </CardGroup>
      </div>
    </>
  )
}

export default Accounting
