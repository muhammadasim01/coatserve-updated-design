import React from 'react';
import { Navbar22, BranchesModal } from '../Component/Global'
import Sidebar  from '../Component/Global/Component/Sidebar'
import { CardGroup } from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars'
import { Label, Input } from 'reactstrap';
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
const axios = require('axios')

const HomePage =  () => {
  const username = localStorage.getItem('userName')
  const CompanyDB = localStorage.getItem('CompanyDB')
    return (
        <>
         <Navbar22/>
            <BranchesModal/>
         
         <div class="container-fluid"    style={{padding:'inherit',backgroundColor:'#b5f5f7',height: '100vh'}}  >
            <div className="col-sm-12   " style={{ backgroundColor: 'white', height: '2.5rem',width:'100%' }}>
            <a style={{color:'black'}} class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Preview" rel=""  ><FindInPageSharpIcon style={{marginTop:'5px',margin:'5px'}} /> 
             </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Print"  rel="" ><PrintTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="E-mail"  rel="" ><EmailTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Sms"  rel=""><SmsTwoToneIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Fax"  rel=""><FaFax style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Screenlock"  rel="" ><ScreenLockPortraitIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Add file"  rel="" > <AiFillFileAdd style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="PDF"  rel="" > <GrDocumentPdf style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Word"  rel="" > <GrDocumentWord style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Excel" rel="" ><GrDocumentExcel   style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="First Data Record" rel=""  > <SkipPreviousIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Previous Record" rel=""  ><ArrowBackIosIcon style={{marginTop:'5px',fontSize:'medium', margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Next Record" rel="" ><NavigateNextIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Last Data Record" rel=""  ><SkipNextIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Filter" rel="" ><RiFilterFill  style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort" rel="" ><SortByAlphaIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Transfer Document"  rel="" > <GrDocumentTransfer style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Document" rel=""><GrDocument style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Transaction" rel=""><AiOutlineTransaction style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" rel="" ><BiEditAlt style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Configure Document" rel="" ><GrDocumentConfig style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Calender" rel=""><BiCalendar style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Person" rel="" ><PersonIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
            <a style={{color:'black'}}  class="" data-bs-toggle="tooltip" data-bs-placement="top" title="Help" rel="" ><HelpOutlineIcon style={{marginTop:'5px',margin:'5px'}}/> </a>
          
                    </div>
               <Sidebar/>
               <div>
         <Label className='qad' style={{textAlign:'center', marginLeft:'40%',fontSize:'16px'}}>Welcome, {username} you are in cockpit of <b style={{color:'green'}} >{CompanyDB}</b>  </Label>
        </div>
                <div className="row -4" style={{marginLeft:'1.5rem',backgroundColor:' '}} >
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
                   <b>MD Remaining Stock is Less Then M...</b>
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
                   <b>After 3 Days of Physical Material T...</b>
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
                   <b>Last Day Payment List</b>
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
                   <b>Null Message SMS</b>
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
