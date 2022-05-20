import React from 'react'

import { InputR, DIV3, DIV4, InputD, TableHead, TD } from './Style'
import Select from 'react-select'

 const Remarks=({ontextChanged,SearchNumberBody})=> {
    return (
      <>
       <DIV3 style={{  marginTop: '5%' }}>
            <div style={{ width: '35rem', height: '15rem' }}>
              <label>Remarks</label>
              <textarea 
              class='form-control' 
              id='textAreaExample'
              name='Remarks'
              placeholder={SearchNumberBody && SearchNumberBody.Remarks}
              onChange={e => ontextChanged(e)}
              />
            </div>
       </DIV3>
     </>
    )
}
export default Remarks;


          
