import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';


const Summary = ({setDocumentTypeSummary,SelectedPRDocEntry,HeaderData,setDocumentSummaryNo}) => {
  const [DocumentType,setDocumentType]=React.useState()
  const [DocumentNo,setDocumentNo]=React.useState()
    return (


<div >
<form>
<div class="row" >
<h3 style={{width:'25rem'}}>Opportunity Status</h3>
<div class="form-check form-check-inline" style={{width:'13rem'}}>
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
<label class="form-check-label" for="inlineRadio1" onChange={e => {
  console.log(e.value)
}}><b>open</b></label>
</div>
<div class="form-check form-check-inline" style={{width:'13rem'}}>
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
<label class="form-check-label" for="inlineRadio2" onChange={e => {
  console.log(e.value)
}}><b>Won</b></label>
</div>
<div class="form-check form-check-inline" style={{width:'13rem'}}>
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
<label class="form-check-label" for="inlineRadio2" onChange={e => {
  console.log(e.value)
}}><b>Lost</b></label>
</div>
</div>
</form>
 <br/>
 <br/>
 <CardGroup>
 <card style={{marginRight:'5rem'}}>
 <div style={{ width: '23.5rem', height: 'auto' }}>
    <label>Document Type</label>
    <input
      
      type='Number'
      class='form-control'
      id='Number'
      aria-describedby='Number'
      placeholder='Number'
      onChange={e => {
        setDocumentTypeSummary(e.target.value)
      }}
    ></input>
    </div>

    <div style={{ width: '23.5rem', height: 'auto' }}>
    <label>Document No</label>
    <input
      
      type='Number'
      class='form-control'
      id='Number'
      aria-describedby='Number'
      placeholder='Number'
      onChange={e => {
        setDocumentSummaryNo(e.target.value)
      }}
    ></input>
    </div>
    <div class="form-check form-check-inline" style={{width:'13rem'}}>
<input class="form-check-input" type="Checkbox" name="inlineCheckboxOptions" id="inlineCheckbox2" value="option2"/>
<label class="form-check-label" for="inlineCheckbox2">Show Document Reload to the BP</label>
</div>
    </card>
    <card>

    <div style={{width:'40rem'}}>
          <div>
          <label>Interest of Range</label>
          <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
             
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td><input class='form-control'/></td>
              
              
            </tr>
            <tr>
              <th scope="row">2</th>
              <td><input class='form-control'/></td>
              
            </tr>
            <tr>
              <th scope="row">3</th>
              <td><input class='form-control'/></td>
              
            </tr>
          </tbody>
        </table>
          </div>
          
          
         
         
        </div>
        </card>
    
    </CardGroup>
 
</div>
    )
}
 
export default Summary;

          
