import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';



const Potential= ({setStartDateStage,SelectedPRDocEntry,HeaderData,setClosingDateStage})=> {
  const [StartDate, setStartDate]=React.useState()
    return (


<div >
  <div>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col"  >Start Date</th>
      <th scope="col">Closing Date</th>
      <th scope="col">Sales Employee</th>
      <th scope="col">Stage</th>
      <th scope="col">%</th>
      <th scope="col">potential Amount</th>
      <th scope="col">Weighted Amount</th>
      <th scope="col">Show BPs Docs</th>
      <th scope="col">Document Type</th>
      <th scope="col">Doc No</th>
      <th scope="col">Activities</th>
      <th scope="col">Owner</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td><input class='form-control' id="date"   type='Date'  onChange={e => {
        setStartDateStage(e.target.value)}}/></td>
      <td><input class='form-control' id="date"   type='Date' onChange={e => {
        setClosingDateStage(e.target.value)}}/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input  type="checkbox" /></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      
     
    </tr>
    <tr>
      <th scope="row">2</th>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input  type="checkbox"/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      
    </tr>
    <tr>
      <th scope="row">3</th>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input type="checkbox"/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      <td><input class='form-control'/></td>
      
     
    </tr>
  </tbody>
</table>
  </div>
  
  
 
 
</div>
    )
}
 export default Potential;