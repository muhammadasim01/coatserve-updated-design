import React from 'react'
import { Button, Accordion, Card, CardGroup, Table } from 'react-bootstrap'
import { LINKS } from '../../Utils'

import { input, DIV3, DIV4, InputD, TableHead, TD } from './Style'
const axios = require('axios')

const Potential = ({setattachmentresponse }) =>  {
  const [selectedFile, setselectedFile] = React.useState([])
  const [getDatafromFile, setgetDatafromFile] = React.useState([])

  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  const AttachmentFunc = async () => {
    console.log(selectedFile)
    const data = new FormData()
    for (var x = 0; x < selectedFile.length; x++) {
      data.append('file', selectedFile[x]) 
      console.log('file', selectedFile[x])
    }

    axios
      .post('http://localhost:2244/upload', data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status

        console.log(res.statusText)
      })
    let FileList = []
    let docLines = []
    FileList = selectedFile

    let body = {}

    Array.from(FileList).forEach(element => {
      docLines.push({
        FileName: element.name
      })
    })

    body['Attachments2_Lines'] = docLines

    console.log("body",body)

    let Attachmentresponce = null
    let Attachment = `Attachments2`
    let attachmentvalueresponse = null

    //    Axios.post("http://httpbin.org/anything",formData).then(res => console.log(res)).catch(err => console.log(err));
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.POST, {
          body: body,
          api: Attachment,
          cookie: cook
        })
        .then(function (res) {
          attachmentvalueresponse = res
          setgetDatafromFile(attachmentvalueresponse)
        })
        .catch(function (error) {
          console.log(error)
        })
      if (attachmentvalueresponse) {
        if (attachmentvalueresponse.data.AbsoluteEntry) {
          setattachmentresponse(attachmentvalueresponse.data.AbsoluteEntry)
          console.log(attachmentvalueresponse.data.AbsoluteEntry)
        }
      }
    //   console.log(attachmentresponse)
    }
  }
  const UploadFilesFuc = e => {
    console.log(e.target.files)
    setselectedFile(e.target.files)
  }
  return (
    <div>
      <CardGroup>
        
           {/* <div style={{marginTop:'5%',marginBottom:'5%'}}> */}
      <Table responsive striped bordered hover>
                  <TableHead>
                    <tr>
                      <th>#</th>
                      <th>Target Path</th>
                      <th>File Name</th>
                      <th>Attachment Date</th>
                      <th>Free Text</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    <tr>
                    <TD>1</TD>
                    <TD>.....</TD>
                    {/* <TD>{selectedFile[0].name}</TD> */}
                    {/* <TD>{new Date()}</TD> */}
                    <TD></TD>
                    <TD></TD>
                    </tr>
                    <tr>
                    <TD>2</TD>
                    <TD>.....</TD>
                    <TD></TD>
                    <TD></TD>
                    <TD></TD>
                    </tr>
                    <tr>
                    <TD>3</TD>
                    <TD></TD>
                    <TD></TD>
                    <TD></TD>
                    <TD></TD>
                    </tr>
                    <tr>
                    <TD>4</TD>
                    <TD></TD>
                    <TD></TD>
                    <TD></TD>
                    <TD></TD>
                    </tr>
                    {/* {selectedFile &&
                      selectedFile.map((item, index) => (
                        <tr key={`${index}`}>
                          <TD>{index + 1}</TD>
                          <TD>.....</TD>
                          <TD>{item.name}</TD>
                          <TD>{item.type}</TD>
                          <TD>{item.lastModifiedDate}</TD>
                        </tr>
                      ))} */}
                  </tbody>
                </Table>
            {/* </div> */}
        <card>
          <div>
            <input
              type='file'
              name='file'
              multiple
              onChange={e => {
                UploadFilesFuc(e)
              }}
            />
            <Button
              type='button'
              class='btn btn-success btn-block'
              onClick={() => AttachmentFunc()}
            >
              Upload
            </Button>
          </div>

        </card>
     
      </CardGroup>
    </div>
  )
}
export default Potential;
