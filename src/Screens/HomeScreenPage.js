import React from 'react';
// import HomeNavBar from '../Component/HomeNavBar/HomeNavBar'
import { Navbar, BranchesModal,NavBarIcon } from '../Component/Global'
import Sidebar  from '../Component/Global/Component/Sidebar'
import { CardGroup } from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import { Label, Input } from 'reactstrap';
import PermContactCalendarSharpIcon from '@material-ui/icons/PermContactCalendarSharp';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import { AiFillFileAdd} from "react-icons/ai";
import { GrDocumentWord } from "react-icons/gr";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {  LINKS } from '../Utils'
import { GrDocumentPdf } from "react-icons/gr";
import { GrDocumentConfig } from "react-icons/gr";
import { BiCalendar } from "react-icons/bi";
import { GrDocumentTransfer} from "react-icons/gr";
import { GrDocument} from "react-icons/gr";
import { BiEditAlt} from "react-icons/bi";
import { RiFilterFill } from "react-icons/ri";
import { GrDocumentExcel } from "react-icons/gr";
import SmsTwoToneIcon from '@material-ui/icons/SmsTwoTone';
import PersonIcon from '@material-ui/icons/Person';
import {FaFax} from "react-icons/fa";
import {AiOutlineTransaction} from "react-icons/ai";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FindInPageSharpIcon from '@material-ui/icons/FindInPageSharp';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ScreenLockPortraitIcon from '@material-ui/icons/ScreenLockPortrait';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

import Select from 'react-dropdown-select';

const axios = require('axios')
const HomePage =  () => {
  const [Value,setValue]=React.useState()
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }
  React.useEffect(async () => {
    let cook = await localStorage.getItem('cookie')
    if (cook) clicPrint (cook)
  }, [])
  const clicPreview = async () => {
    console.log("Preview")  
    let cookie = await localStorage.getItem('cookie')
    let UserCode = await localStorage.getItem('userName')
    let SAPapi = `sml.svc/ACTIVEBRANCHUWISE?$filter=USER_CODE eq '${UserCode}' &$orderby=BPLName`
    console.log(SAPapi)
    await axios
      .post(API_TYPES.GET, {
        api: SAPapi,
        cookie: cookie
      })
      .then(function (res) {
        console.log(res.data.value)
        if (res.data.value) {
          console.log(res.data.value[0])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
}

const clicPrint = async () => {
  console.log("Print") 
}
const clicEmail=()=>{
  console.log("Email")  
}
const clicSms=()=>{
  console.log("Sms")  
}
const clicFax=()=>{
  console.log("Fax")  
}
const clicScreenlock=()=>{
  console.log("Screenlock")  
}
const clicAddfile=()=>{
  console.log("Addfile")  
}
const clicPDF=()=>{
  console.log("PDF")  
}
const clicWord=()=>{
  console.log("Word")  
}
const clicExcel=()=>{
  console.log("Excel")  
}
const clicPrevious=()=>{
  console.log("Previous")  
}
const clicLeft=()=>{
  console.log("Left")  
}
const clicRight=()=>{
  console.log("Right")  
}
const clicNext=()=>{
  console.log("Next")  
}
const clicFilter=()=>{
  console.log("Filter")  
}
const clicSort=()=>{
  console.log("Sort")  
}
const clicTransferDocument=()=>{
  console.log("TransferDocument")  
}
const clicDocument=()=>{
  console.log("Document")  
}
const clicTransaction=()=>{
  console.log("Transaction")  
}
const clicEdit=()=>{
  console.log("Edit")  
}
const clicConfigureDocument=()=>{
  console.log("ConfigureDocument")  
}
const clicCalender=()=>{
  console.log("Calender")  
}
const clicPerson=()=>{
  console.log("Person")  
}
const clicHelp=()=>{
  console.log("Help")  
}
    return (
        <>
         <Navbar/>
            <BranchesModal/>
         <div class="container-fluid"    style={{padding:'inherit',backgroundColor:'#9CFFFF',height: '100vh'}}  >
            <div className="col-sm-12   " style={{ backgroundColor: 'white', height: '2.5rem',width:'100%' }}>
            <a style={{color:'black'}} class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Preview"><FindInPageSharpIcon style={{marginTop:'5px',margin:'5px'}} /> 
             </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Print"><PrintTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="E-mail"><EmailTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Sms" ><SmsTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Fax" ><FaFax style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Screenlock" ><ScreenLockPortraitIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Add file" > <AiFillFileAdd style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="PDF"  > <GrDocumentPdf style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Word"   > <GrDocumentWord style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"  ><GrDocumentExcel   style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  data-bs-toggle="tooltip" data-bs-placement="top" title="Previous"> <SkipPreviousIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Left" ><ArrowBackIosIcon style={{marginTop:'5px',fontSize:'medium', margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Right" ><NavigateNextIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Next" ><SkipNextIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Filter" ><RiFilterFill  style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort" ><SortByAlphaIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Transfer Document" > <GrDocumentTransfer style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Document" ><GrDocument style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Transaction"  onClick={()=>{clicTransaction()}}><AiOutlineTransaction style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"  onClick={()=>{clicEdit()}}><BiEditAlt style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Configure Document"  onClick={()=>{clicConfigureDocument()}}><GrDocumentConfig style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Calender" onClick={()=>{clicCalender()}}><BiCalendar style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Person" onClick={()=>{clicPerson()}}><PersonIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Help" onClick={()=>{clicHelp()}}><HelpOutlineIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            </div>
               <Sidebar/>
                <div className="row -4" style={{marginLeft:'1.5rem',backgroundColor:'#9CFFFF'}} >
                    <div className="mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'26rem',borderRadius:'7px' }}>
                    <Label style={{ padding: '10px' }}><b>Common Function</b></Label>
                    <CardGroup style={{ paddingLeft: '', fontSize: '10px', width: '', border: '', height: '6rem' }}>
              <Scrollbars style={{ width: '100%', height: '100%' }}>
                <div style={{ float: 'left' }}>
                  </div>
                <div style={{ float: 'right',marginRight:'1rem' }}>
                </div>
                <div style={{ float: 'center', marginLeft:'9rem' }}>
                 </div>
              </Scrollbars>
            </CardGroup>
                    </div>
                    <div className="mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'26%',borderRadius:'7px' ,marginLeft:''}}>
                    <Label style={{paddingTop:'10px',fontSize:'15px', fontSize:'11px',float:'left'}}><h6>Messages And Alerts</h6></Label>
                   <Input type="select" name="select" id="exampleSelect" style={{padding:'0',width:'50%',height:'1.5rem',margin:'auto',marginTop:'0.375rem'}}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
              <CardGroup style={{marginLeft:'0.5rem',fontSize:'10px',width:'95%',border:' ',height:'6rem'}}>
             <div style={{backgroundColor:'lightgray' ,width:'100%'}}>
              <div style={{float:'left'}}>
                 <Label style={{marginLeft:'10px'}}>
                   <b>Date</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'2.5rem'}}>
                   <b>Subject</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2.4rem'}}>
                 <Label >
                   <b>From</b>
                 </Label>
                 </div>
                 </div>
                 <Scrollbars style={{width:'100%',height:'100%'}}>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
              </Scrollbars>
              </CardGroup>
                </div>
                    <div className="mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'26rem',borderRadius:'7px' }}>
                    <Label style={{padding:'10px',fontSize:'15px',fontSize:'11px',float:'left'}}><h6>Messages And Alerts</h6></Label>
                    <Input type="select" name="select" id="exampleSelect" style={{padding:'0',width:'50%',height:'1.5rem',margin:'auto',marginTop:'0.375rem'}}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
              <CardGroup style={{marginLeft:'0.5rem',fontSize:'10px',width:'95%',border:' ',height:'6rem'}}>
             <div style={{backgroundColor:'lightgray' ,width:'100%'}}>
              <div style={{float:'left'}}>
                 <Label style={{marginLeft:'10px'}}>
                   <b>Date</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'2.5rem'}}>
                   <b>Subject</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2.4rem'}}>
                 <Label>
                   <b>From</b>
                 </Label>
                 </div>
                 </div>
                 <Scrollbars style={{width:'100%',height:'100%'}}>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
                 <div>
                 <Label style={{marginLeft:'',float:'left'}}>
                   <b>2021/06/18</b>
                 </Label>
                 </div>
                 <Label style={{marginLeft:'1rem',color:'blue'}}>
                   <b>After 3 Days physical material</b>
                 </Label>
                 <div style={{float:'right',marginRight:'2rem'}}>
                 <Label>
                   <b>Server</b>
                 </Label>
                 </div>
              </Scrollbars>
              </CardGroup>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;
