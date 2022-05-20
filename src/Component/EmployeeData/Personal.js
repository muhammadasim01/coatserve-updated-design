import React from 'react'
import { Button, Accordion, Card, CardGroup, Table } from 'react-bootstrap'
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'

const Personal = ({ ontextItemChanged, ontextChanged,SearchNumberBody }) => {
  return (
    <>
      <CardGroup>
        <DIV3 style={{ marginTop: '5%' }}>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Gender</label>
            <div>
              <Select
               placeholder={SearchNumberBody && SearchNumberBody.Gender}
                options={
                  [{ value: 'gt_Male', label: 'gt_Male' },
                  { value: 'gt_FeMale', label: 'gt_FeMale' }]
                } // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'Gender')}// Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </div>

          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Date of Birth</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='date'
              class='form-control'
              aria-describedby='Name'
              name='DateOfBirth'
              onChange={e => ontextChanged(e)}
             placeholder={SearchNumberBody && SearchNumberBody.DateOfBirth}
            ></input>
          </div>
          <br />
          <br />
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Country of Birth </label>
            <div>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                aria-describedby='Name'
                name='CountryOfBirth'
                onChange={e => ontextChanged(e)}
               placeholder={SearchNumberBody && SearchNumberBody.CountryOfBirth}
              ></input>
            </div>
          </div>
          <br />
          <br />
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Martial Status</label>
            <div>
              <Select 
               placeholder={SearchNumberBody && SearchNumberBody.MartialStatus}
                options={
                  [{ value: "mts_Single", label: 'mts_Single' },
                  { value: 'mts_Married', label: 'mts_Married' }]
                } // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'MartialStatus')}// Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>No. of Children</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              name='NumOfChildren'
              onChange={e => ontextChanged(e)}
              aria-describedby='Name'
             placeholder={SearchNumberBody && SearchNumberBody.NumOfChildren}
            ></input>
          </div>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>ID No.</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              name='IdNumber'
              onChange={e => ontextChanged(e)}
              aria-describedby='Name'
             placeholder={SearchNumberBody && SearchNumberBody.IdNumber}
              // readonly="readonly"
            ></input>
          </div>
        </DIV3>
        <DIV4></DIV4>
        <DIV3 style={{ marginTop: '5%' }}>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Citizenship</label>
            <div>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              name='CitizenshipCountryCode'
              onChange={e => ontextChanged(e)}
              aria-describedby='Name'
             placeholder={SearchNumberBody && SearchNumberBody.CitizenshipCountryCode}
              // readonly="readonly"
            ></input>
            </div>
          </div>
          <br />
          <br />
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Passport No.</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              name='PassportNumber'
              onChange={e => ontextChanged(e)}
              aria-describedby='Name'
             placeholder={SearchNumberBody && SearchNumberBody.PassportNumber}
              // readonly="readonly"
            ></input>
          </div>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Passport Expiration Date</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='date'
              class='form-control'
              name='PassportExpirationDate'
              onChange={e => ontextChanged(e)}
              aria-describedby='Name'
             placeholder={SearchNumberBody && SearchNumberBody.PassportExpirationDate}
              // readonly="readonly"
            ></input>
          </div>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Passport issue Date</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='date'
              class='form-control'
              name='PassportIssueDate'
              onChange={e => ontextChanged(e)}
              aria-describedby='Name'
             placeholder={SearchNumberBody && SearchNumberBody.PassportIssueDate}
              // readonly="readonly"
            ></input>
          </div>
          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Passport Issuer</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              name='PassportIssuer'
              onChange={e => ontextChanged(e)}
              aria-describedby='Name'
             placeholder={SearchNumberBody && SearchNumberBody.PassportIssuer}
              // readonly="readonly"
            ></input>
          </div>
        </DIV3>
      </CardGroup>
      <br />
      <br />
      <br />
    </>
  )
}
export default Personal
