
import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
import Select from 'react-select'
const axios = require('axios')

export default function Accounting() {
    const[PaymentTerms,  setPaymentTerms]=React.useState()
    const[PaymentDropdown, setPaymentDropdown]=React.useState()
    const[Project, setProject]=React.useState()
    const[setProjectDropDown,  setsetProjectDropDown]=React.useState()
    const[Indicator,  setIndicator]=React.useState()
    const[IndicatorDropDown, setIndicatorDropDown]=React.useState()
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
                  label: element.PaymentTermsGroupName,
                })
              })
              setPaymentDropdown(ItemsDropDown)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }

      const project= async cookie => {
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
                  label: element.Code+ ":" +element.Name
                })
              })
              setsetProjectDropDown(ItemsDropDown)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }

      const indicator= async cookie => {
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
        <div>
     <CardGroup>
    
        <div style={{marginRight:'38rem'}} >
        <card >
         
             <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Journal Remark</label>
            <input
               type='text'
              class='form-control'
              id='Name'
              aria-describedby='Name'
              placeholder=''
            />
          </div>
       

          <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Payment Terms</label>
            <Select
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='select'
              options={PaymentDropdown}
            />
          </div>
       


<div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Central Bank Ind</label>
            <select
             
              type='text'
              class='form-control'
              id='Name'
              aria-describedby='Name'
              placeholder=''
            />
          </div>
          <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Manually Recalculate Due Date:</label>
            <selectDate
             
              type='Date'
              class='form-control'
              id='Date'
              aria-describedby='Date'
              placeholder='Date'
            />
            <br/>
            <input
              type='Number'
              class='form-control'
              id='Number'
              aria-describedby='Number'
              placeholder=''

              />
              <br/>
            <input
              type='Number'
              class='form-control'
              id='Number'
              aria-describedby='Number'
              placeholder=''

              />
          </div>
          <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Cash Discount Date offset:</label>
            <input
              type='Date'
              class='form-control'
              id='Date'
              aria-describedby='Date                                       '
              placeholder=''

              />
            </div>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <div style={{ width: '21rem', height: 'auto' }}>
            <label>Sales Employee</label>
            <select
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              id='Name'
              aria-describedby='Name'
              placeholder=''
            />
          </div>
          <div style={{ width: '21rem', height: 'auto' }}>
            <label>Owner</label>
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
            <label>BP Project</label>
            
            
            <Select
             
           
              // )}
              placeholder='Contact Person'
              options={setProjectDropDown} // Options to display in the dropdown
              
              displayValue='name' // Property name to display in the dropdown options
            //   onChange={e => {
            //     setContactPerson(e.value)

            //   }}
            />
         
         
          </div>
        
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px' }}>
            <label>Cancellation Date</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='Date'
              class='form-control'
              id='Date'
              aria-describedby='Date'
              placeholder='Date'
            ></input>
          </div>
                    <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Required Date</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='Date'
              class='form-control'
              id='Date'
              aria-describedby='Date'
              placeholder='Date'
            ></input>
          </div>

          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Indicator</label>
            <Select
             
           
            // )}
            placeholder='select'
            options={IndicatorDropDown} // Options to display in the dropdown
            
            displayValue='name' // Property name to display in the dropdown options
          //   onChange={e => {
          //     setContactPerson(e.value)

          //   }}
          />
          </div>

          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Federal Tax ID</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='Number'
              class='form-control'
              id=''
              aria-describedby='number'
              placeholder=''
            ></input>
          </div>
          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Older Number</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='Number'
              class='form-control'
              id=''
              aria-describedby='number'
              placeholder=''
            ></input>
          </div>

          <div style={{ width: '21rem', height: 'auto',marginTop:'5px'  }}>
            <label>Referenced Document</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='Number'
              class='form-control'
              id=''
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