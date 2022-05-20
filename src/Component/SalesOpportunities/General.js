import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
import Select from 'react-select'
const axios = require('axios')

  const Potential = ({setGeneralData,setBPContactGeneralData,setBusinessPartnerNameData,
    setIndustryGeneralData,SelectedPRDocEntry,HeaderData,setRemarksGeneralData}) => {
      
      
  const [IF , setIF]=React.useState();
  const [Cb , setCb]=React.useState();
  const [Industry, setIndustry]=React.useState();
  const [Customer,setCustomer]=React.useState()
  const [Remarks, setRemarks]=React.useState()
  const [BPChannelCode,setBPChannelCode]=React.useState()
  const [BPChannelName,setBPChannelName]=React.useState()
  const [BPChannelContact,setBPChannelContact]=React.useState()
  const [BPProject,setBPProject]=React.useState()
  const [InformationSource,setInformationSource]=React.useState()
  const [IndustryName,setIndustryName]=React.useState()
  const [BusinessP, setBusinessP]=React.useState()
  const [BusinessPartnerName, setBusinessPartnerName]=React.useState()
  const API_TYPES = {
      GET: `${LINKS.api}/GetApi`,
      POST: `${LINKS.api}/POSTApi`,
      PATCH: `${LINKS.api}/PATCHApi`
    }

  React.useEffect(async () => {
      let cook = await localStorage.getItem('cookie')
    
     
      iF(cook)
      CB(cook)
      BP(cook)
    
    }, [])

  const iF = async cookie => {
      // -------------------------    Items API GET DATA   ------------------------------------------------------
      await axios
        .post(
          API_TYPES.GET,
  
          { api: LINKS.sap.Sales.Industries, cookie: cookie }
        )
        .then(function (res) {
          setIF(res.data.value)
          console.log(res.data.value)
          if (res.data.value) {
            let ItemsDropDown = []
  
            res.data.value.forEach(element => {
              ItemsDropDown.push({
                value: element.IndustryCode,
                label: element.IndustryDescription,
              })
            })
            setIndustry(ItemsDropDown)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    const CB = async cookie => {
      // -------------------------    Items API GET DATA   ------------------------------------------------------
      await axios
        .post(
          API_TYPES.GET,
  
          { api: LINKS.sap.MasterData.ActiveCustomer, cookie: cookie }
        )
        .then(function (res) {
          setCb(res.data.value)
          console.log(res.data.value)
          if (res.data.value) {
            let ItemsDropDown = []
  
            res.data.value.forEach(element => {
              ItemsDropDown.push({
                value: element.CardCode,
                label: element.CardName,
              })
            })
            setCustomer(ItemsDropDown)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }


    const BP = async cookie => {
      // -------------------------    Items API GET DATA   ------------------------------------------------------
      await axios
        .post(
          API_TYPES.GET,
  
          { api: LINKS.sap.MasterData.ActiveVendor, cookie: cookie }
        )
        .then(function (res) {
          setBusinessP(res.data.value)
          console.log(res.data.value)
          if (res.data.value) {
            let ItemsDropDown = []
  
            res.data.value.forEach(element => {
              ItemsDropDown.push({
                value: element.CardCode,
                label: element.CardCode+" : "+element.CardName,
              })
            })
            setBusinessPartnerName(ItemsDropDown)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
// const AddData = ()=> {
 
//  console.log("all data show",BPChannelCode,BPChannelName,BPChannelContact,BPProject)

// }
   
    return (
        <>
     <CardGroup>
    
        <div style={{marginRight:'38rem'}} >
        <card >
         
             

          <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>BP Partner</label>
            <Select
            placeholder='Select'
            options={BusinessPartnerName}  // Options to display in the dropdown
            // onSelect={GroupNo} // Function will trigger on select event
            // onRemove={GroupNo} Function will trigger on remove event
            displayValue='name' // Property name to display in the dropdown options
            onChange={e => {
              setBusinessPartnerName(e.value)
             

            }}
          />
          </div>

          <div style={{ width: '23.5rem', height: 'auto' }}>
          <label>BP Channel Contact</label>
          <div>
            <Select
              placeholder='Select'
              options={Customer}  // Options to display in the dropdown
              // onSelect={GroupNo} // Function will trigger on select event
              // onRemove={GroupNo} Function will trigger on remove event
              displayValue='name' // Property name to display in the dropdown options
              onChange={e => {
                setBPContactGeneralData(e.value)
               

              }}
            />
          </div>
          </div>
         
    </card>
  </div>
  
  
           
         
        
       <card>
       <div style={{ width: '22rem', height: 'auto' }}>
            <label>BP Project</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='number'
              class='form-control'
              id='number'
              aria-describedby='number'
              placeholder=''
              onChange={e => {
                setBPProject(e.target.value)
              }}
            ></input>
          </div>

          <div style={{ width: '22rem', height: 'auto' }}>
            <label>Information Source</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='text'
              class='form-control'
              id='Name'
              aria-describedby='Name'
              placeholder=''
              onChange={e => {
                setInformationSource(e.target.value)
              }}
            ></input>
          </div>

          <div style={{ width: '22rem', height: 'auto' }}>
          <label>Industry</label>
          <div>
            <Select
              placeholder='Select'
              options={Industry} // Options to display in the dropdown
              // onSelect={GroupNo} // Function will trigger on select event
              // onRemove={GroupNo} Function will trigger on remove event
              displayValue='name' // Property name to display in the dropdown options
              onChange={e => {
                setIndustryGeneralData(e.value)
              }}
            />
          </div>
          </div>
        </card>
      </CardGroup>
      <br/>
      <br/>
      <div class="form-outline">
      <label>Remarks</label>
  <textarea class="form-control" id="textAreaExample" rows="12" onChange={e => {
    setRemarksGeneralData(e.target.value)
  }}></textarea>
  <Button onClick={() => {
    // AddData()
   }}>Add</Button>
</div>
       </> 
    )
}
    
  export default Potential;