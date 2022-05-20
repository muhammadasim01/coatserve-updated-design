import React from 'react'
import { Button, Accordion, Card, CardGroup, Table } from 'react-bootstrap'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'

import { CONSTANTS, LINKS } from '../../Utils'
const axios = require('axios')
const Finance = ({ontextChanged,ontextItemChanged,SearchNumberBody}) => {
  const [BanksDropdown,setBanksDropdown]=React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`
  }

  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')

    Banks(cook)
  }, [])

  const Banks = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.EmployeeMasterData.Banks, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          //setCountryDropdown(res.data.value[0].Country)
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.BankCode,
              label: element.BankName
            })
          })
          setBanksDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return <>
  <CardGroup>
        <DIV3 style={{  marginTop: '5%' }}>
        <div style={{ width: '22rem', height: 'auto' }}>
              <label>Salary</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='number'
                class='form-control'
                name='Salary'
                onChange={e => ontextChanged(e)}
                aria-describedby='Name'
                placeholder={SearchNumberBody && SearchNumberBody.Salary}
              ></input>
              <div>
              <Select
                  placeholder={SearchNumberBody && SearchNumberBody.SalaryUnit}
                  options={[{value: "scu_Month", label: 'scu_Month'}]} // Options to display in the dropdown
                  onChange={e => ontextItemChanged(e, 'SalaryUnit')} // Function will trigger on select event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
            </div>
       <br /><br/>
       <div style={{ width: '22rem', height: 'auto' }}>
       <label>Employee Costs</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='number'
                class='form-control'
                name='EmployeeCosts'
                onChange={e => ontextChanged(e)}
                aria-describedby='Name'
                placeholder={SearchNumberBody && SearchNumberBody.EmployeeCosts}
              ></input>
              <div>
                <Select
                  placeholder={SearchNumberBody && SearchNumberBody.EmployeeCostUnit}
                  options={[{value: "scu_Month", label: 'scu_Month'}]} // Options to display in the dropdown
                  onChange={e => ontextItemChanged(e, 'EmployeeCostUnit')} // Function will trigger on select event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
            </div>
            </DIV3>
            <DIV4></DIV4>
        <DIV3 style={{  marginTop: '5%' }}>
          <h4><u>Bank Details</u></h4>
        <div style={{ width: '22rem', height: 'auto' }}>
              <label>Bank</label>
              <div>
                <Select
                   placeholder={SearchNumberBody && SearchNumberBody.BankCode}
                  options={BanksDropdown} // Options to display in the dropdown
                  onChange={e => ontextItemChanged(e, 'BankCode')}  // Function will trigger on select event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
            </div>
        <div style={{ width: '22rem', height: 'auto' }}>
              <label>Account No.</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                name='BankAccount'
                onChange={e => ontextChanged(e)}
                aria-describedby='Name'
                placeholder={SearchNumberBody && SearchNumberBody.BankAccount}
                // readonly="readonly"
              ></input>
           </div><br/><br/>
           <div style={{ width: '22rem', height: 'auto' }}>
              <label>Branch</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                name='BankBranch'
                onChange={e => ontextChanged(e)}
                aria-describedby='Name'
                placeholder={SearchNumberBody && SearchNumberBody.BankBranch}
                // readonly="readonly"
              ></input>
           </div>
           
        </DIV3>
      </CardGroup>
  </>
}
export default Finance;