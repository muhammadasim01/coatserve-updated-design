import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
import Select from 'react-select'
const axios = require('axios')

const options = [
  { value: 'Month', label: 'Month' },
  { value: 'Weeks', label: 'Weeks' },
  { value: 'Days', label: 'Days' }
]


const Potential = ({setPredictedpotentialDate,setMaxLocalTotal,
  setGrossProfitPotentialData,setWeightedSumLC,setLevelOfInterest,setGrossProfitPotential,
  setPottentialAmountData,setMaxSystemTotal})=> {
  const [PredictedClosingIn, setPredictedClosingIn]=React.useState()
  const [PredictedClosing, setPredictedClosing]=React.useState()
  const [PredictedClosingDate, setPredictedClosingDate]=React.useState()
  const [PotentialAmount,setPotentialAmount]=React.useState()
  const [WeightedAmount,setWeightedAmount]=React.useState()
  const [GrossProfit, setGrossProfit]=React.useState()
  const [GrossProfitTotal,setGrossProfitTotal]=React.useState()
  const [Levelofinterest,setLevelofinterest]=React.useState()
  const [Interest,setInterest]=React.useState()
  const [LevelofInterest,setLevelofInterest]=React.useState();
  const [ WeightedSumLCc, setWeightedSumLCc]=React.useState()
  const API_TYPES = {
      GET: `${LINKS.api}/GetApi`,
      POST: `${LINKS.api}/POSTApi`,
      PATCH: `${LINKS.api}/PATCHApi`
    }

  React.useEffect(async () => {
      let cook = await localStorage.getItem('cookie')
    
     
      // LI(cook)
      
    
    }, [])
    const LI = async cookie => {
      // -------------------------    Items API GET DATA   ------------------------------------------------------
      await axios
        .post(
          API_TYPES.GET,
  
          { api: LINKS.sap.Interest.interest, cookie: cookie }
        )
        .then(function (res) {
          setLevelofInterest(res.data.value)
          console.log(res.data.value)
          if (res.data.value) {
            let ItemsDropDown = []
  
            res.data.value.forEach(element => {
              ItemsDropDown.push({
                value: element.IndustryDescription,
                label: element.IndustryName,
              })
            })
            setInterest(ItemsDropDown)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }

    return (
        
     <CardGroup>
    
        <div style={{marginRight:'5rem'}} >
        <card >
          <form>
          <label>Predicted Closing In</label>
          <div class="row">
            <div class="col">
              <input type="Number" id="number" class="form-control" placeholder="Number" onChange={e => {
                setPredictedClosingIn(e.label)
              }}/>
            </div>
            <div class="col">
            <Select options={options} onChange={e => {
              setPredictedClosingIn(e.label)
            }} />
            </div>
          </div>
        </form>
             <div style={{ width: '23.5rem', height: 'auto' }}>
            <label>Predicted Closing Date</label>
            <input
              //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
              type='date'
              class='form-control'
              id='date'
              aria-describedby='date'
              placeholder='date'
              onChange={e => {
                setPredictedpotentialDate(e.target.value)
              }}
            ></input>
          </div>
          <div style={{ width: '23.5rem', height: 'auto' }}>
          <label>Potential Amount</label>
          <input
            //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
            type='Number'
            class='form-control'
            id='Number'
            aria-describedby='Number'
            placeholder='Number'
            onChange={e => {
              setMaxSystemTotal(e.target.value)
            }}
          ></input>
        </div>
        <div style={{ width: '23.5rem', height: 'auto' }}>
        <label>Weighted Amount</label>
        <input
          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
          type='Number'
          class='form-control'
          id='Number'
          aria-describedby='Number'
          placeholder='Number'
          onChange={e => {
            setWeightedSumLCc(e.target.value)
          }}
        ></input>
        <div style={{ width: '23.5rem', height: 'auto' }}>
        <label>Gross Profit %</label>
        <input
          //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
          type='Number'
          class='form-control'
          id='Number'
          aria-describedby='Number'
          placeholder='Number'
          onChange={e => {
            setGrossProfitPotential(e.target.value)
          }}
        ></input>
        
      </div>
      
      </div>
      <div style={{ width: '23.5rem', height: 'auto' }}>
      <label>Gross Profit Total</label>
      <input
        //value={SelectedPRDocEntry && SelectedPRDocEntry.RequesterEmail}
        type='Number'
        class='form-control'
        id='Number'
        aria-describedby='Number'
        placeholder='Number'
        onChange={e => {
          setMaxLocalTotal(e.target.value)
        }}
      ></input>
      
    </div>
    
    <div style={{ width: '23.5rem', height: 'auto' }}>
    <label>Level of interest</label>
    <div>
      <Select
        placeholder='Select'
        // options={Interest} // Options to display in the dropdown
        // onSelect={GroupNo} // Function will trigger on select event
        // onRemove={GroupNo} Function will trigger on remove event
        displayValue='name' // Property name to display in the dropdown options
        onChange={e => {
          setLevelOfInterest(e.value)
        }}
      />
    </div>
    </div>
    </card>
  </div>
  
  <br/>
           
         
        
       <card>
        <div style={{width:'40rem'}}>
          <div>
          <label>Interest of Range</label>
          <Table responsive striped bordered hover>
        
          <tr>
          <th>#</th>
          <th>Description</th>
          
          </tr>
          
          <tbody>
          <td>1</td>
          <td></td>
          
          
          </tbody>
          <tbody>
          <td>2</td>
          <td></td>
          
          
          </tbody>
          <tbody>
          <td>3</td>
          <td></td>
         
          
          </tbody>
          <tbody>
          <td>4</td>
          <td></td>
         
          
          </tbody>
          <tbody>
          <td>5</td>
          <td></td>
         
          
          </tbody>
          <tbody>
          <td>6</td>
          <td></td>
          
          
          </tbody>
          <tbody>
          <td>7</td>
          <td></td>
          
          
          </tbody>
          <tbody>
          <td>8</td>
          <td></td>
          
          
          </tbody>
          </Table>
          </div>
          
          
         
         
        </div>
        </card>
      </CardGroup>
            
        
    )
}
 export default Potential;