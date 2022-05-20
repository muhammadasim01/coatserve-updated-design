import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';


export default function Potential() {
    return (


<div >
<form>
<div class="row" >
<h3 style={{width:'25rem'}}>Opportunity Status</h3>
<div class="form-check form-check-inline" style={{width:'13rem'}}>
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
<label class="form-check-label" for="inlineRadio1"><b>open</b></label>
</div>
<div class="form-check form-check-inline" style={{width:'13rem'}}>
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
<label class="form-check-label" for="inlineRadio2"><b>Won</b></label>
</div>
<div class="form-check form-check-inline" style={{width:'13rem'}}>
<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
<label class="form-check-label" for="inlineRadio2"><b>Lost</b></label>
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
 
</div>
    )
}
 


          
