
import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
import Select from 'react-select'
const axios = require('axios')


export default function Logistics() {
    const[ShippingTypes,  setShippingTypes]=React.useState()
    const[ShippingTypesDropDown, setShippingTypesDropDown]=React.useState()
    const[SalesEmployee,  setSalesEmployee]=React.useState()
    const[SalesEmployeeDropDown, setSalesEmployeeDropDown]=React.useState()
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
        <div>
     <CardGroup>
    
        <div style={{marginRight:'38rem'}} >
        <card >
         
             <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Ship to</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              
              class='form-control'
              
              placeholder=''
            />
          </div>
          <div class="form-outline" style={{ width: '23.5rem', height: 'auto' }}>
      <br/>
  <textarea class="form-control" id="textAreaExample" rows="3"></textarea>
  
</div>

<button>..</button>

          <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Bill to</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              id='Name'
              aria-describedby='Name'
              placeholder=''
            />
          </div>
          <div class="form-outline" style={{ width: '23.5rem', height: 'auto' }}>
      <br/>
  <textarea class="form-control" id="textAreaExample" rows="3"></textarea>
  
</div>
<button>..</button>

<div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Shipping types</label>
            <Select
             
           
         
            placeholder='select'
            options={ShippingTypesDropDown} // Options to display in the dropdown
            
            displayValue='name' // Property name to display in the dropdown options
          //   onChange={e => {
          //     setContactPerson(e.value)

          //   }}
          />
          </div>
         <br/>
         <br/>
         <br/>
         <br/>
         <div style={{ width: '21rem', height: 'auto' }}>
            <label>Sales Employee</label>
            <Select
            options={SalesEmployeeDropDown} // Options to display in the dropdown
            
            displayValue='name'
              aria-describedby='Name'
              placeholder=''
            />
          </div>
          <div style={{ width: '21rem', height: 'auto' }}>
            <label>Language</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              id='Name'
              aria-describedby='Name'
              placeholder=''
            />
          </div>
      <div class="form-outline" style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
      <label>Remarks</label>
  <textarea class="form-control" id="textAreaExample" rows="3"></textarea>
  
</div>
    </card>
  </div>
  
  
           
         
        
       <card>
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
        <br/>
        <br/>
        <br/>
        <br/>
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px' }}>
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
          <br/>
        <br/>
        <br/>
        <br/>
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
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
          <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Total Before Discount</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              id='number'
              aria-describedby='number'
              placeholder=''
            ></input>
          </div>
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Discount%</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              id='number'
              aria-describedby='number'
              placeholder=''
            ></input>
            <br/>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              id='number'
              aria-describedby='number'
              placeholder=''
            ></input>
          </div>
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Frieght</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              id='number'
              aria-describedby='number'
              placeholder=''
            ></input>
          </div>
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Rounding</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              id='number'
              aria-describedby='number'
              placeholder=''
            ></input>
          </div>
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Tax</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              id='number'
              aria-describedby='number'
              placeholder=''
            ></input>
          </div>
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Total </label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              id='number'
              aria-describedby='number'
              placeholder=''
            ></input>
          </div>
        </card>
      </CardGroup>
      </div>
     
    
       </> 
    )
}
