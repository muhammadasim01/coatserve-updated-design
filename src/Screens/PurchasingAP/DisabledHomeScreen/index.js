import React from 'react';
// import HomeNavBar from '../Component/HomeNavBar/HomeNavBar'
import { DisableNavBar } from '../../../Component/Global'
import { CardGroup } from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import { Label, Input } from 'reactstrap';
import PermContactCalendarSharpIcon from '@material-ui/icons/PermContactCalendarSharp';
import PrintTwoToneIcon from '@material-ui/icons/PrintTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import { AiFillFileAdd} from "react-icons/ai";
import { GrDocumentWord } from "react-icons/gr";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import {  LINKS } from '../../../Utils'
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
import DisabledNavBarIcon from '../../../Component/Global/DisabledNavBarIcon'

const axios = require('axios')

export default function HomeScreen() {
  const API_TYPES = {
    GET: `${LINKS.api}/GetApi`,
    POST: `${LINKS.api}/POSTApi`,
    PATCH: `${LINKS.api}/PATCHApi`
  }

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
        if (res.data.value) {
          console.log(res.data.value[0])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
}
const clicPrint=()=>{
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
         <DisableNavBar/>
           
            <div class="container-fluid"    style={{padding:'inherit',backgroundColor:'#9CFFFF'}}  >

            <div className="col-sm-12   " style={{ backgroundColor: 'white', height: '2.5rem',width:'100%' }}>
          <FindInPageSharpIcon style={{marginTop:'5px',margin:'5px'}} /> 
          <PrintTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/>
           <EmailTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/>
          <SmsTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/>
          <FaFax style={{marginTop:'5px',margin:'5px'}}/> 
          <ScreenLockPortraitIcon style={{marginTop:'5px',margin:'5px'}}/> 
           <AiFillFileAdd style={{marginTop:'5px',margin:'5px'}}/> 
           <GrDocumentPdf style={{marginTop:'5px',margin:'5px'}}/> 
           <GrDocumentWord style={{marginTop:'5px',margin:'5px'}}/> 
          <GrDocumentExcel   style={{marginTop:'5px',margin:'5px'}}/> 
  <SkipPreviousIcon style={{marginTop:'5px',margin:'5px'}}/> 
           <ArrowBackIosIcon style={{marginTop:'5px',fontSize:'medium', margin:'5px'}}/> 
         <NavigateNextIcon style={{marginTop:'5px',margin:'5px'}}/> 
           <SkipNextIcon style={{marginTop:'5px',margin:'5px'}}/> 
           <RiFilterFill  style={{marginTop:'5px',margin:'5px'}}/> 
           <SortByAlphaIcon style={{marginTop:'5px',margin:'5px'}}/> 
          <GrDocumentTransfer style={{marginTop:'5px',margin:'5px'}}/> 
          <GrDocument style={{marginTop:'5px',margin:'5px'}}/> 
          <AiOutlineTransaction style={{marginTop:'5px',margin:'5px'}}/> 
           <BiEditAlt style={{marginTop:'5px',margin:'5px'}}/> 
          <GrDocumentConfig style={{marginTop:'5px',margin:'5px'}}/> 
           <BiCalendar style={{marginTop:'5px',margin:'5px'}}/>
         <PersonIcon style={{marginTop:'5px',margin:'5px'}}/> 
           <HelpOutlineIcon style={{marginTop:'5px',margin:'5px'}}/> 

           </div>
               {/* <NavBar/> */}
               <DisabledNavBarIcon/>
              
             
                <div className="row -4" style={{marginLeft:'1.5rem'}} >
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'12rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'12rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem' ,width:'12rem',borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem' ,width:'13rem',borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className="mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'26rem',borderRadius:'7px' }}>
                    <Label style={{ padding: '10px' }}><b>Common Function</b></Label>
                    <CardGroup style={{ paddingLeft: '', fontSize: '10px', width: '', border: '', height: '6rem' }}>
              <Scrollbars style={{ width: '100%', height: '100%' }}>
                
                <div style={{ float: 'left' }}>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                </div>
                <div style={{ float: 'right',marginRight:'1rem' }}>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                </div>
                <div style={{ float: 'center', marginLeft:'9rem' }}>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                  <a style={{ display: 'block' }}><PermContactCalendarSharpIcon style={{ fontSize: '15px' }} />Bank transaction</a>
                </div>
              </Scrollbars>
            </CardGroup>
                    </div>

                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'12rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'12rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'12rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem' ,width:'12rem',borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'13rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem' ,width:'13rem',borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
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
                <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'12rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem' ,width:'12rem',borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
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
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'13rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'12rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                    <div className=" mx-2 mt-3 px-2" style={{ backgroundColor: 'white', height: '11rem',width:'12rem' ,borderRadius:'7px'}}>
                        <strong>Bank Balances</strong>
                        <div style={{ color: 'blue', marginTop: '3rem' }}><h1 >46</h1></div>
                        <Label style={{}}>Bank Balances</Label>
                    </div>
                </div>
                
            </div>
        </>

    )
}

