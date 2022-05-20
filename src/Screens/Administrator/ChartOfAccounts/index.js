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
    api : LINKS.sap.MasterData.AllTaxGroups ,
    cookie : cookie,
    })
    .then(function (response){
      setgetdatafromapi(response.data.value)
      arrayaddition(response.data.value)
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
  setgetdatafromapi(data.concat(array))
}
const inputchanger = (e,index)=>{
  let doclines = getdatafromapi
  if(e.target.type === 'checkbox' ){
    doclines[index][e.target.name] = e.target.checked === true ? "tYES" : "tNO"
    doclines[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setgetdatafromapi(doclines)
  }else{
    doclines[index][e.target.name] = e.target.value
    setgetdatafromapi(doclines)
  }
  // var obj=data;
  // obj[index][e.target.name]=e.target.value;
  // setdata(obj)
}
const Patch = async (id, body) => {
  let cook = await localStorage.getItem('cookie')
  if (cook) {
    await axios
      .post(API_TYPES.PATCH, {
        body: body,
        api: `VatGroups('${id}')`,
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
  let body = {}
  body['VatGroups_Lines'] = [{
    "Effectivefrom": lastarray.VatGroups_Lines[0].Effectivefrom,
    "Rate": lastarray.VatGroups_Lines[0].Rate,
    // "EqualizationTax":lastarray,
    // "DatevCode": lastarray
  }]
  body['Code'] =lastarray.Code
  body['Name'] =lastarray.Name 
  body['Category'] =lastarray.Category
  body['TaxAccount'] =lastarray.TaxAccount
  body['Inactive'] = lastarray.Inactive 
  body['AcquisitionReverse'] =lastarray.AcquisitionReverse 
  body['NonDeduct'] =lastarray.NonDeduct
  // body['AcquisitionTax'] =lastarray. PRBody.ReqType
  // body['NonDeductAcc'] =lastarray. PRBody.Requester
  body['DeferredTaxAcc'] = lastarray.DeferredTaxAcc
  body['Report349Code'] = lastarray.Report349Code
    console.log("body",body)
  Patch(code, body)
}
const show = ()=>{
  // console.log("data",data)
}
const DocLinesDropDownOnChange = (selectedItem, item, name) => {
  let itemDetail = getdatafromapi
  itemDetail[item][name] = selectedItem.value
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
  let lastarray = getdatafromapi[getdatafromapi.length - 1]
  let body = {}
  body['VatGroups_Lines'] = [{
    "Effectivefrom": lastarray.Effective_From,
    "Rate": lastarray.Rate,
    // "EqualizationTax":lastarray,
    // "DatevCode": lastarray
  }]
  body['Code'] =lastarray.Code
  body['Name'] =lastarray.Name 
  body['Category'] =lastarray.Category
  body['TaxAccount'] =lastarray.TaxAccount
  body['Inactive'] = lastarray.Inactive 
  body['AcquisitionReverse'] =lastarray.Acquition_Reverse 
  body['NonDeduct'] =lastarray.Non_Deduct
  // body['AcquisitionTax'] =lastarray. PRBody.ReqType
  // body['NonDeductAcc'] =lastarray. PRBody.Requester
  body['DeferredTaxAcc'] = lastarray.DeferredTaxAcc
  body['Report349Code'] = lastarray.Report349Code
// })
  let cook = await localStorage.getItem('cookie')
  if (cook) {
    await axios
      .post(API_TYPES.POST, {
        body: JSON.stringify(body),
        api: LINKS.sap.PurchaseRequest.PostTax,
        cookie: cook
      })
      .then(function (res) {
        if (res.data.Code) {
          alert.success('Operation completed successfully')
          setTimeout(() => {
            window.location.reload()
          }, 3000);
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
  let cook = await localStorage.getItem('cookie')
  if (cook) {
    await axios
      .post(API_TYPES.Delete, {
        api: `VatGroups('${gettaxcode}')`,
        cookie: cook
      })
      .then(function (res) {
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        if (res.error) {
          alert.success('Operation completed successfully')
        } else {
          alert.error("res.data.error.message.value")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
return<>
<NavBar />
<Container fluid>
<h1 style={{textAlign:'center'}}>Chart Of Accounts</h1>
<Modal show={confirmation} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Are You Sure You Want To Delete This Tax-Group ?</Modal.Title>
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
    <th>Code</th>
    <th>Inactive</th>
    <th>Name</th>
    <th>Category</th>
    <th>Acquition/Reverse</th>
    <th>Effective Form</th>
    <th>Rate%</th>
    <th>Non Deduct.%</th>
    <th>Tax Account</th>
    <th>Acquition Tax Account</th>
    <th>Deferred Tax Account</th>
    <th>Non Deduct Acct</th>
    <th>Group Description</th>
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
      <TD><TDDIV><input type='checkbox' name="Inactive" checked={item.Inactive === "tYES" ? true : item.Inactive === "tNO" ? false : null } onChange={e=>{inputchanger(e,index)}} /></TDDIV></TD>
      <TD><TDDIV><input type='text' className="form-control" defaultValue={item.Name} name="Name" onChange={e=>{inputchanger(e,index)}} /></TDDIV></TD>
      <TD><TDDIV>
      {CategoryOption && (
                            <Select
                              defaultValue={CategoryOption.filter(
                                option => option.value === item.Category
                              )}
                              placeholder='Select..'
                              options={CategoryOption} // Options to display in the dropdown
                              onChange={e => {
                                DocLinesDropDownOnChange(
                                  e,
                                  index,
                                  'Category'
                                )
                              }}
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          )}
       </TDDIV></TD>
      {/* <input type='text' className="form-control" name="Category" defaultValue={item.Category === "bovcInputTax" ? "Input Tax" : item.Category === "bovcOutputTax" ? "Output Tax" : null} onChange={e=>{input(e,index)}}  /> */}
      <TD><TDDIV><input type='checkbox' name="Acquition_Reverse" checked={item.AcquisitionReverse === "tNO" ? false : item.AcquisitionReverse === "tYES" ? true : null} onChange={e=>{inputchanger(e,index)}} /></TDDIV></TD>
      <TD><TDDIV><input type='date' name="Effective_From" defaultValue={item.VatGroups_Lines ? item.VatGroups_Lines[0].Effectivefrom : null} className="form-control" onChange={e=>{inputchanger(e,index)}}/></TDDIV></TD>
      <TD><TDDIV><input type='number' className="form-control" defaultValue={item.VatGroups_Lines ? item.VatGroups_Lines[0].Rate : null} name="Rate" onChange={e=>{inputchanger(e,index)}} /></TDDIV></TD>
      <TD><TDDIV><input type='text' defaultValue={item.NonDeduct} className="form-control" name="Non_Deduct" onChange={e=>{inputchanger(e,index)}}  /></TDDIV></TD>
      <TD><TDDIV>
      {gettaxaccounts && (
                            <Select
                            defaultValue={gettaxaccounts.filter(
                                option => option.value === item.TaxAccount
                              )}
                              placeholder='Select..'
                              options={gettaxaccounts} // Options to display in the dropdown
                              onChange={e => {
                                DocLinesDropDownOnChange(
                                  e,
                                  index,
                                  'TaxAccount'
                                )
                              }}
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          )}
       </TDDIV></TD>
      {/* <input type='text' className="form-control" defaultValue={item.TaxAccount} name="TaxAccount" onChange={e=>{input(e,index)}} /> */}
      <TD><TDDIV>{item.AcquisitionTax}</TDDIV></TD>
      <TD><TDDIV>
      {gettaxaccounts && (
                            <Select
                            defaultValue={gettaxaccounts.filter(
                                option => option.value === item.DeferredTaxAcc
                              )}
                              placeholder='Select..'
                              options={gettaxaccounts} // Options to display in the dropdown
                              onChange={e => {
                                DocLinesDropDownOnChange(
                                  e,
                                  index,
                                  'DeferredTaxAcc'
                                )
                              }}
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          )}</TDDIV></TD>
      {/* <input type='text' className="form-control" defaultValue={item.DeferredTaxAcc} name="DeferredTaxAcc" onChange={e=>{input(e,index)}} /> */}
      <TD><TDDIV>{item.NonDeductAcc}</TDDIV></TD>
      <TD><TDDIV><input type='text' className="form-control" defaultValue={item.Report349Code} name="Report349Code" onChange={e=>{inputchanger(e,index)}} /></TDDIV></TD>
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