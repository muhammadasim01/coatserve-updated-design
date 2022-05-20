import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';
import Select from 'react-select'
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'

export default function LinkedDocument(HeaderData,SelectedPRDocEntry) {
    return (
      <>

<CardGroup>
        <DIV3 >
        <div style={{ width: '22rem', height: 'auto' }}>
              <label>Document Type</label>
              <div>
                <Select
                  // value={ContactPersonDropdown.filter(
                 
                    placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.DocType  || HeaderData && HeaderData.DocType}
                  //options={ContactPersonDropdown} // Options to display in the dropdown
                  // onSelect={GroupNo} // Function will trigger on select event
                  // onRemove={GroupNo} Function will trigger on remove event
                  displayValue='name' // Property name to display in the dropdown options
                />
              </div>
            </div>
            <br />
            <div style={{ width: '22rem', height: 'auto' }}>
              <label>Document Number</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='number'
                class='form-control'
                id='Name'
                aria-describedby='Name'
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.DocNum  || HeaderData && HeaderData.DocNum}
              ></input>
           </div>
           <div style={{ width: '22rem', height: 'auto' }}>
              <label>Previous Activity</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                id='Name'
                aria-describedby='Name'
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.PreviousActivity  || HeaderData && HeaderData.PreviousActivity}
                readonly="readonly"
              ></input>
           </div>
            </DIV3>
            <DIV4></DIV4>
        <DIV3>
        <div style={{ width: '22rem', height: 'auto' }}>
              <label>Source Object Type</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='text'
                class='form-control'
                id='Name'
                aria-describedby='Name'
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.ParentObjectType  || HeaderData && HeaderData.ParentObjectType}
                readonly="readonly"
              ></input>
           </div>
           <div style={{ width: '22rem', height: 'auto' }}>
              <label>Source Object No.</label>
              <input
                //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
                type='number'
                class='form-control'
                id='Name'
                aria-describedby='Name'
                placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.ParentObjectId  || HeaderData && HeaderData.ParentObjectId}
                readonly="readonly"
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
