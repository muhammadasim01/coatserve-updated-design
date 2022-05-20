
import React ,{useState , useEffect} from "react";
import Select from "react-select";
import { Table,Button,Container,Modal} from "react-bootstrap";
import Styled from "styled-components";
import { CONSTANTS, LINKS } from '../../../Utils'
import {GrUpdate} from 'react-icons/gr'
import { useAlert } from "react-alert";
import {MdDelete} from 'react-icons/md'
const Banks = ()=>{
const alert = useAlert();
const axios=require('axios');
//------------------------Styled Component-----------------------
const StyledDiv = Styled.div 
`
width:12rem;
`;
//------------------------------Hooks-----------------------------
const[CountriesDropdown,setCountriesDropdown]=useState()
const[BankSetupData,setBankSetupData]=useState()
const [confirmation,setconfirmation] = useState(false)
const [update, setUpdate] = React.useState(1)
const [gettaxcode,setgettaxcode] = useState()
//-------------UseEffect Hook--------------
const API_TYPES = {
  GET: `${LINKS.api}/GetApi`,
  POST: `${LINKS.api}/POSTApi`,
  PATCH: `${LINKS.api}/PATCHApi`,
  Delete: `${LINKS.api}/DeleteApi`,
} 
useEffect(async() => {
    let cook = await localStorage.getItem('cookie');
    CountriesFun(cook)
    BankSetupFun(cook)
  }, []);
//+++++++++++++++++++++++++_____Functions_____+++++++++++++++++++++++++++
//--------Input data functions-----------
const inputvalue = (e,index) => {
  let obj=BankSetupData;
  if(e.target.type === 'checkbox'){
    obj[index][e.target.name]= e.target.checked === true ? "tYES" : "tNO"
  }
  else{
    obj[index][e.target.name]=e.target.value
  }
  setBankSetupData(obj)
}
const selectvalue = (e,index,name) => {
    let obj=BankSetupData;
    obj[index][name]=e.value
    obj[`ùpdate${update + 1}`] = update + 1;
    setUpdate(update + 1);
    setBankSetupData(obj)
}
//---------API get functions--------
const BankSetupFun = async (cook) => {
    const array = [{ country_code:' ', bank_code:' ', bank_name:'',
    BIC_SWIFT_code:' ',post_office:' ',  branch:' ', next_check_no:' '}]
       await axios
          .post(API_TYPES.GET,{
            api: `Banks`,
            cookie: cook
          })
          .then(res => {
            console.log(res)
          setBankSetupData(res.data.value.concat(array))
          }) 
          .catch(function (error) {
            console.log(error)
          })
      }
const CountriesFun = async (cook) => {
      let array = []
     await axios
        .post(API_TYPES.GET,{
          api: `Countries?$select=Code,Name`,
          cookie: cook
        })
        .then(res => {
          console.log(res)
             res.data.value.forEach( ele =>{
          array.push({
            value: ele.Code,
            label: ele.Code + " : " + ele.Name
          })
        })
        setCountriesDropdown(array)
        }) 
        .catch(function (error) {
          console.log(error)
        })
    }
//---------API POST functions--------
const Submit = async () =>{
  let lastIndex = BankSetupData[BankSetupData.length - 1];
  let body = {
            "BankCode": lastIndex.BankCode,
            "BankName": lastIndex.BankName ,
            "BranchforOutgoingChecks": lastIndex.BranchforOutgoingChecks,
            "NextCheckNumber": lastIndex.NextCheckNumber,
            "SwiftNo": lastIndex.SwiftNo,
            "CountryCode": lastIndex.CountryCode ,
            "PostOffice": lastIndex.PostOffice,
            // "AbsoluteEntry": 8
  }
  console.log('body',body)
     const cook = await localStorage.getItem('cookie');
           await axios
              .post(API_TYPES.POST,{
                  api : `Banks` ,
                  cookie : cook ,
                   body : JSON.stringify(body) ,
               })
      .then(res=>{
            console.log(res)
      })
      .catch(error=>{
            console.log(error)
      })
  }
  const deletefuntion = async() =>{
    setconfirmation(false)
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.Delete, {
          api: `Banks(${gettaxcode})`,
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
  const test = (code) =>{
    console.log(code)
    setgettaxcode(code)
    setconfirmation(true)
  }
  const handleClose = () => {
    setconfirmation(false)
  }
  const submitPatch = async (code) => {
    console.log(code,BankSetupData)
    let itemDetail = BankSetupData
    let lastIndex = {}
    itemDetail.forEach(ele=>{
     if(ele.AbsoluteEntry===code){
      lastIndex = ele
     }
    })
    console.log("lastIndex",lastIndex)
    let body = {
            "BankCode": lastIndex.BankCode,
            "BankName": lastIndex.BankName ,
            "BranchforOutgoingChecks": lastIndex.BranchforOutgoingChecks,
            "NextCheckNumber": lastIndex.NextCheckNumber,
            "SwiftNo": lastIndex.SwiftNo,
            "CountryCode": lastIndex.CountryCode ,
            "PostOffice": lastIndex.PostOffice,
    }
      console.log("body",body)
    Patch(code, body)
  }
  const Patch = async (id, body) => {
    console.log(JSON.stringify(body))
    console.log(body)
    let cook = await localStorage.getItem('cookie')
    if (cook) {
      await axios
        .post(API_TYPES.PATCH, {
          body: body,
          api: `Banks(${id})`,
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
//---------------------------------Reutrn--------------------------------
return(
        <>
        <Container fluid>
<h1 className="text-center">Banks-Setup</h1>
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
<Table striped bordered hover responsive style={{textAlign:'center'}}>
    <thead>
        <tr >
            <th>#</th>
            <th>Country/Region code</th>
            <th>Bank code</th>
            <th>Bank Name</th>
            <th>BIC/SWIFT code</th>
            <th>Post Office</th>
            {/* <th>Account No.</th> */}
            <th>Branch</th>
            <th>Next Check No.</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
{BankSetupData && BankSetupData.map((item,index)=>
    <tr>
        <td>{index+1}</td>
        <td><StyledDiv>

        {CountriesDropdown && (
                            <Select
                              value={CountriesDropdown.filter(
                                option => option.value === item.CountryCode
                              )}
                              placeholder='Select..'
                              options={CountriesDropdown} // Options to display in the dropdown
                              onChange={e => {
                                selectvalue(
                                  e,
                                  index,
                                  'CountryCode'
                                )
                              }}
                              // onSelect={CostCentre} // Function will trigger on select event
                              // onRemove={CostCentre} //Function will trigger on remove event
                              displayValue='name' // Property name to display in the dropdown options
                            />
                          )}
          </StyledDiv>
        </td>
        <td><StyledDiv><input type='text' className="form-control" name='BankCode' defaultValue={item.BankCode} onChange={(e)=>inputvalue(e,index)}/></StyledDiv></td>
        <td><StyledDiv><input type='text' className="form-control" name='BankName' defaultValue={item.BankName} onChange={(e)=>inputvalue(e,index)}/></StyledDiv></td>
        <td><StyledDiv><input  className="form-control" value={item.SwiftNo}  name='SwiftNo' onChange={(e)=>inputvalue(e,index)}/></StyledDiv></td>
        <td><input type='checkbox' checked={item.PostOffice === 'tYES' ? true : item.PostOffice === 'tNO' ? false : null} name='PostOffice' onChange={(e)=>inputvalue(e,index)}/></td>
        <td><StyledDiv><input type='text'  defaultValue={item.BranchforOutgoingChecks}  className="form-control"  name='BranchforOutgoingChecks' onChange={(e)=>inputvalue(e, index)}/></StyledDiv></td>
        <td><StyledDiv><input type='text' defaultValue={item.NextCheckNumber}  className="form-control" name='NextCheckNumber' onChange={(e)=>inputvalue(e,index)}/></StyledDiv></td>
   <td>
   <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" rel=""  onClick={e=>{test(item.AbsoluteEntry)}}> <MdDelete /> </a>
  <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Update" rel=""  onClick={e=>{submitPatch(item.AbsoluteEntry)}}> <GrUpdate style={{marginLeft:'2rem'}}/> </a>
     
   </td>
    </tr>
)}
</tbody>
</Table>
<Button style={{margin:'2rem'}} onClick={Submit}>Add</Button>
<Button variant='secondary' >Cancel</Button>
</Container>
        </>
    )
}
export default Banks;
 