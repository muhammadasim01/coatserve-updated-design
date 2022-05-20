
import React from 'react'
import { Button ,Accordion,Container,Card,CardGroup,Table} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
import Select from 'react-select'
const axios = require('axios')


const Logistics=({setgetAddress,setgetAddress2,setgetTransportationCode,getDatafromParent22,getDatafromParent})=> {
   // const[Shippingtypes,  setShippingtypes]=React.useState()
    // const[ShippingTypes,  setShippingTypes]=React.useState()
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
          //  setShippingTypes(res.data.value)
            console.log(res.data.value)
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
            console.log(res.data.value)
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
      const callFunction = () => {
        console.log("ZZ")
        console.log(getDatafromParent22,getDatafromParent)
      }
    return (
        <>
        <div style={{borderBottom:'1px outset'}}>
     <CardGroup>
     <Container fluid>
    
        <div style={{marginRight:'38rem'}} >
        <card >
            <label>Ship to</label>
          <div class="form-outline" style={{ width: '23.5rem', height: 'auto' }}>
    
  <textarea class="form-control" id="textAreaExample" rows="3" onChange={e=>{setgetAddress(e.target.value)}}></textarea>
  
</div>
<button>....</button><br/>
         
            <label>Pay to</label>
            {/* <input
            //  defaultValue={ModalHeaderData && ModalHeaderData.Address2?SelectedPRDocEntry && SelectedPRDocEntry.Address2:" "}
              type='text'
              class='form-control'
              id='Name'
              aria-describedby='Name'
              placeholder=''
              onClick={e=>callFunction()}
            /> */}
        
          <div class="form-outline" style={{ width: '23.5rem', height: 'auto' }}>
    
  <textarea class="form-control" id="textAreaExample" rows="3" onChange={e=>{setgetAddress2(e.target.value)}}></textarea>
  
</div>
<button>....</button>

<div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Shipping types</label>
            <Select
            placeholder='select'
            options={ShippingTypesDropDown} // Options to display in the dropdown
            
            displayValue='name' // Property name to display in the dropdown options
            onChange={e => {
              // callFunction(e)
              setgetTransportationCode(e.value)
              console.log(e.value)
              // console.log(Shippingtypes)
            }}
          />
          </div>
         <br/>
         <br/>
         <br/>
         <br/>
          {/* <div style={{ width: '21rem', height: 'auto' }}>
            <label>Language</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              id='Name'
              aria-describedby='Name'
              placeholder=''
            />
          </div> */}
    </card>
  </div>
  
  
           
  </Container>
      </CardGroup>
      </div>
       </> 
    )
}

export default Logistics;
