import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
import Select from 'react-select'
const axios = require('axios')



const Content = ({setContentRemarks,HeaderData,SelectedPRDocEntry }) =>  {
  const [Interest,setInterest]=React.useState()
  const [LevelofInterest,setLevelofInterest]=React.useState();
  const API_TYPES = {
      GET: `${LINKS.api}/GetApi`,
      POST: `${LINKS.api}/POSTApi`,
    }

  React.useEffect(async () => {
      let cook = await localStorage.getItem('cookie')
    
     
      
    
    }, [])
 

    return (

      <>
      
       <div  style={{ width: '30rem', height: 'auto' }}>
            <label>Remarks</label>
            <textarea 
            class='form-control' 
            id='textAreaExample' 
            placeholder={ SelectedPRDocEntry && SelectedPRDocEntry.Details  || HeaderData && HeaderData.Details}
            onChange={e => setContentRemarks(e.target.value)}></textarea>
         </div>
      </>
        
    )
}
export default Content;
