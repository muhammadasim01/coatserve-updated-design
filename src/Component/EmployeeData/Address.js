import React from 'react'
import { Button ,Container,Card,CardGroup,Table} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import Select from 'react-select'
const axios = require('axios')

const Address = ({SearchNumberBody,ontextChanged,ontextItemChanged}) =>  {
  const [WorkStateDropdown, setWorkStateDropdown]=React.useState()
  const [CountriesDropDown,setCountriesDropDown]= React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`
  }
  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')

    Countries(cook)
    WorkStates(cook)
  }, [])

  const WorkStates = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.EmployeeMasterData.States, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          //setCountryDropdown(res.data.value[0].Country)
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name
            })
          })
          setWorkStateDropdown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const Countries = async cookie => {
    // -------------------------    Items API GET DATA   ------------------------------------------------------
    await axios
      .post(
        API_TYPES.GET,

        { api: LINKS.sap.EmployeeMasterData.Countries, cookie: cookie }
      )
      .then(function (res) {
        if (res.data.value) {
          console.log(res.data.value)
          let ItemsDropDown = []

          res.data.value.forEach(element => {
            ItemsDropDown.push({
              value: element.Code,
              label: element.Name
            })
          })
          setCountriesDropDown(ItemsDropDown)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
    return (
      <>
       <CardGroup>
        <DIV3>
          <Container fluid><br/><br/>
            <h3><u>Work Address</u></h3><br/><br/>
            <label>Street</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
                aria-describedby='emailHelp'
                name='WorkStreet'
                onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.WorkStreet}
              />
            </div>
            <label>Street No</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
              name='WorkStreetNumber'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
               // placeholder={SearchNumberBody && SearchNumberBody.WorkStreetNumber}
              />
            </div>
            <label>Block</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
                aria-describedby='emailHelp'
                name='WorkBlock'
                onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.WorkBlock}
              />
            </div>
            <label>Building/Floor/Room</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
                name='WorkBuildingFloorRoom'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.WorkBuildingFloorRoom}
              />
            </div>
            <label>State</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // placeholder={SearchNumberBody && SearchNumberBody.WorkStateCode}
                options={WorkStateDropdown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'WorkStateCode')} // Function will trigger on select event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
            <label>Country</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // placeholder={SearchNumberBody && SearchNumberBody.WorkCountryCode}
                options={CountriesDropDown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'WorkCountryCode')}  // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </Container>
        </DIV3>
        <DIV4></DIV4>
        <DIV3>
        <Container fluid><br/><br/>
            <h3><u>Home Address</u></h3><br/><br/>
            <label>Street</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
               name='HomeStreet'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.HomeStreet}
              />
            </div>
            <label>Street No</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
                name='HomeStreetNumber'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.HomeStreetNumber}
              />
            </div>
            <label>Block</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
               name='HomeBlock'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.HomeBlock}
              />
            </div>
            <label>Building/Floor/Room</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <input
                type='text'
                class='form-control'
               name='HomeBuildingFloorRoom'
                aria-describedby='emailHelp'
                onChange={e => ontextChanged(e)}
                // placeholder={SearchNumberBody && SearchNumberBody.HomeBuildingFloorRoom}
              />
            </div>
            <label>Country</label>
            <div style={{ width: '23.5rem', height: 'auto' }}>
              <Select
                // placeholder={SearchNumberBody && SearchNumberBody.WorkCountryCode}
                options={CountriesDropDown} // Options to display in the dropdown
                onChange={e => ontextItemChanged(e, 'HomeCountry')}  // Function will trigger on select event
                // onRemove={GroupNo} Function will trigger on remove event
                displayValue='name' // Property name to display in the dropdown options
              />
            </div>
          </Container>
        </DIV3>
      </CardGroup>
      
      </>
    )
}
export default Address;
 


