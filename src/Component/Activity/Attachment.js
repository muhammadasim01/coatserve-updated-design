import React from 'react'
import { Button ,Accordion,Card,CardGroup,Table} from 'react-bootstrap';
import { CONSTANTS, LINKS } from '../../Utils';
const axios = require('axios')

export default function Potential() {


    const [Am , setAm]=React.useState();
    const [AttachmentFile, setAttachmentFile]=React.useState();
    const API_TYPES = {
        GET: `${LINKS.api}/GetApi`,
        POST: `${LINKS.api}/POSTApi`,
        PATCH: `${LINKS.api}/PATCHApi`
      }

    React.useEffect(async () => {
        let cook = await localStorage.getItem('cookie')
      
        AF(cook)
      
      }, [])

    const AF = async cookie => {
        // -------------------------    Items API GET DATA   ------------------------------------------------------
        await axios
          .post(
            API_TYPES.GET,
    
            { api: LINKS.sap.Attachments.Attachment, cookie: cookie }
          )
          .then(function (res) {
            setAm(res.data.value)
            console.log(res.data.value)
            if (res.data.value) {
              let ItemsDropDown = []
    
              res.data.value.forEach(element => {
                ItemsDropDown.push({
                  value: element.SalesEmployeeCode,
                  label: element.SalesEmployeeName,
                })
              })
              setAttachmentFile(ItemsDropDown)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    
    return (


<div >

 <CardGroup>

    <card>

    <div style={{width:'60rem'}}>
          <div>
         
          <Table responsive striped bordered hover>
        
          <tr>
          <th>#</th>
          <th>Target Path</th>
          <th>File Name</th>
          <th>Attachment Date</th>
          <th>free Text</th>
          </tr>
          
          <tbody>
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>2</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>3</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>4</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>5</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>6</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>7</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>8</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>9</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>
          <tbody>
          <td>10</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          
          </tbody>

        
          </Table>
          </div>
          
          
         
         
        </div>
        </card>
    <card>
        <div>
        <label for="formFileLg" class="form-label"></label>
          <input class="form-control form-control-lg" id="formFileLg" type="file" />
        </div>
        <br/>
        <div>
        <button type="button" class="btn btn-primary">Display</button>

        </div>
        <br/>
        <div>
        <button type="button" class="btn btn-secondary">Delete</button>
        </div>
    </card>
    </CardGroup>
 
</div>
    )
}
 


          
