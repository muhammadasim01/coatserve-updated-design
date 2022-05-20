import React from "react";
import { useState } from "react";
import { CONSTANTS, LINKS } from '../../../Utils'
import {Table , Button, Modal,Container} from 'react-bootstrap';
import { input, DIV3, DIV4, InputD,TDDIV, TableHead, TD } from './Style'
import Select from 'react-select';
import NavBar from '../../../Component/Global/Navbar'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {GrUpdate} from 'react-icons/gr'
import { useAlert } from "react-alert";
import {MdDelete} from 'react-icons/md'
const axios = require('axios')
const Form01 = () => {
  
  const alert = useAlert();
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`,
    Delete: `${LINKS.api}/DeleteApi`,
  } 
  const [getdatafromapi,setgetdatafromapi] = useState()
  const [gettaxaccounts,setgettaxaccounts] = useState()
  const [gettaxcode,setgettaxcode] = useState()
  const [update, setUpdate] = React.useState(1)
  const [confirmation,setconfirmation] = useState(false)
  const [ButtonName, setButtonName] = React.useState("Add")
  React.useEffect(async() => {
    let cook = await localStorage.getItem('cookie');
   CustomTaxGroup(cook)
   TaxAccount(cook)
}, []);
const handleClose = () => {
  setconfirmation(false)
}
const CustomTaxGroup = async (cookie) =>{
    await axios
    .post(API_TYPES.GET,{
    api : LINKS.sap.MasterData.AllProjects,
    cookie : cookie,
    })
    .then(function (response){
      console.log("response.data.value.length",response)
      setgetdatafromapi(response.data.value)
      arrayaddition(response.data.value)
    console.log(response)
    })
    .catch(function (error){
    console.log(error)
    })
}
const TaxAccount = async (cookie) =>{
  let DocLines = []
  await axios
  .post(API_TYPES.GET,{
  api : LINKS.sap.MasterData.ActiveAccounts,
  cookie : cookie,
  })
  .then(function (response){
    response.data.value.forEach(element=>{
      DocLines.push({
        value:element.Code,
        label:element.Code+" : "+ element.Code,
      })
    })
    setgettaxaccounts(DocLines)
  })
  .catch(function (error){
  console.log(error)
  })
}
const arrayaddition = (data) =>{
  let array = {Code:'',Name:''} 
  console.log(data.concat(array))
  setgetdatafromapi(data.concat(array))
}
const inputchanger = (e,index)=>{
  let doclines = getdatafromapi
  if(e.target.type === 'checkbox' ){
    doclines[index][e.target.name] = e.target.checked === true ? "tYES" : "tNO"
    console.log("doclines",doclines)
    doclines[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setgetdatafromapi(doclines)
  }else{
    doclines[index][e.target.name] = e.target.value
    console.log("doclines",doclines)
    setgetdatafromapi(doclines)
  }
  // var obj=data;
  // obj[index][e.target.name]=e.target.value;
  // setdata(obj)
}
const Patch = async (id, body) => {
  console.log(JSON.stringify(body))
  console.log(body)
  let cook = await localStorage.getItem('cookie')
  if (cook) {
    await axios
      .post(API_TYPES.PATCH, {
        body: body,
        api: `Projects('${id}')`,
        cookie: cook
      })
      .then(function (res) {
        console.log(res)
        // if (res.data.DocNum) {
        //   alert.success('Operation completed successfully')
        // } else {
        //   alert.error("res.data.error.message.value")
        // }
      })
      .catch(function (error) {
      })

  }
}
const submitPatch = async (code) => {
  console.log(code)
  let itemDetail = getdatafromapi
  let lastarray = {}
  itemDetail.forEach(ele=>{
   if(ele.Code===code){
    lastarray = ele
   }
  })
  console.log("lastarray",lastarray)
  let body = {}
 
  body['Code'] =lastarray.Code
  body['Name'] =lastarray.Name 
  body['ValidFrom'] =lastarray.ValidFrom
  body['ValidTo'] =lastarray.ValidTo
  body['Active'] = lastarray.Active 
    console.log("body",body)
  Patch(code, body)
}
const show = ()=>{
  // console.log("data",data)
}
const DocLinesDropDownOnChange = (selectedItem, item, name) => {
  let itemDetail = getdatafromapi
  itemDetail[item][name] = selectedItem.value
  console.log("itemDetail",itemDetail)
  setgetdatafromapi(itemDetail)
}
const Submit_PatchFunc = () => {
  if (ButtonName == 'Add') {
    submit()
  } else if (ButtonName != 'Add') {
    // submitPatch()
  }
}

const submit = async () => {
  console.log("getdatafromapi",getdatafromapi)
  console.log("getdatafromapi",getdatafromapi[getdatafromapi.length - 1])
  let lastarray = getdatafromapi[getdatafromapi.length - 1]
  console.log("lastarray.Effective_From",lastarray.Rate)
  let body = {}
  body['Code'] =lastarray.Code
  body['Name'] =lastarray.Name 
  body['ValidFrom'] =lastarray.ValidFrom
  body['ValidTo'] =lastarray.ValidTo
  body['Active'] = lastarray.Active 
// })
console.log("body",body)
  let cook = await localStorage.getItem('cookie')
  if (cook) {
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: LINKS.sap.PurchaseRequest.PostProject,
        cookie: cook
      })
      .then(function (res) {
        console.log(res)
        if (res.data.Code) {
          alert.success('Operation completed successfully')
          // setTimeout(() => {
          //   window.location.reload()
          // }, 3000);
        } else {
          alert.error(JSON.stringify(res.data.error))
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
const CategoryOption = [ {label:"Input Tax", value:"bovcInputTax"} , {label:"Output Tax", value:"bovcOutputTax"}]
const test = (code) =>{
  setgettaxcode(code)
  setconfirmation(true)
}
const deletefuntion = async() =>{
  setconfirmation(false)
  console.log(gettaxcode)
  let cook = await localStorage.getItem('cookie')
  if (cook) {
    await axios
      .post(API_TYPES.Delete, {
        api: `Projects('${gettaxcode}')`,
        cookie: cook
      })
      .then(function (res) {
          // setTimeout(() => {
          //   window.location.reload()
          // }, 3000);
        console.log(res)
        // if (res.error) {
        //   alert.success('Operation completed successfully')
        // } else {
        //   alert.error("res.data.error.message.value")
        // }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
return<>
<NavBar />
<Container fluid>
<h1 style={{textAlign:'center'}}>Projects - Setup</h1>
<Modal show={confirmation} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Are You Sure You Want To Delete This Project ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
        <Button variant='secondary' onClick={deletefuntion}>Yes</Button>
          <Button variant='primary' onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
<Table responsive striped bordered hover>
<TableHead>
  <tr >
    <th>#</th>
    <th>Project Code</th>
    <th>Project Name</th>
    <th>Active</th>
    <th>Valid From</th>
    <th>Valid to</th>
    {/* <th>Address</th> */}
    {/* <th>Warehouse</th>
    <th>Branch</th> */}

    <th>Action</th>
  </tr>
  </TableHead>
  <tbody>
  {getdatafromapi&&getdatafromapi.map((item,index) =>
    <tr key={index + 1}>
      <TD><ContextMenuTrigger id="contextmenu"><TDDIV>{index+1}</TDDIV></ContextMenuTrigger>
    
{/* <MdDelete className="Remove" onClick={e=>{test(item.Code)}}/> */}
</TD>
{/* <ContextMenu id="contextmenu">
<MenuItem onClick={()=>{console.log("item.Code")}}>
  <MdDelete className="Remove" />
  <span >Remove</span>
</MenuItem>
<MenuItem onClick={e=>console.log("Edit")} >
  <GrEdit className="Edit" />
  <span >Edit</span>
</MenuItem>
</ContextMenu>  */}
      <TD><TDDIV><input type='text' className="form-control" disabled={item.Code ? true : false} defaultValue={item.Code} name="Code" onChange={e=>{inputchanger(e,index)}} /></TDDIV></TD>
      <TD><TDDIV><input type='text' className="form-control" defaultValue={item.Name} name="Name" onChange={e=>{inputchanger(e,index)}} /></TDDIV></TD>
      <TD><TDDIV><input type='checkbox' name="Active" checked={item.Active === "tYES" ? true : null } onChange={e=>{inputchanger(e,index)}} /></TDDIV></TD>
      <TD><TDDIV><input type='date' name="ValidFrom" defaultValue={item.ValidFrom} className="form-control" onChange={e=>{inputchanger(e,index)}}/></TDDIV></TD>
      <TD><TDDIV><input type='date' name="ValidTo" defaultValue={item.ValidTo} className="form-control" onChange={e=>{inputchanger(e,index)}}/></TDDIV></TD>
      <TD><TDDIV>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" rel=""  onClick={e=>{test(item.Code)}}> <MdDelete /> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Update" rel=""  onClick={e=>{submitPatch(item.Code)}}> <GrUpdate style={{marginLeft:'2rem'}}/> </a>
     </TDDIV></TD>
    </tr>
    )}
  </tbody>
</Table>
  <div>
<Button  onClick={() => { Submit_PatchFunc()}} style={{marginTop:'2rem'}}>{ButtonName}</Button>
<Button variant="secondary" style={{marginLeft:'2rem',marginTop:'2rem'}} onClick={e=>window.location.href='/Home'}>Cancel</Button>
</div>

</Container>
</>
}
export default Form01;