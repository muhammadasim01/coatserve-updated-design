import React , { useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import { Label } from 'reactstrap';
import AppSide from '../Global/AppSide';
import { CardGroup } from 'react-bootstrap';



const NavBar=()=>{
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);
    return(
        <>
           
            
          <CardGroup>
            <div  style={{float:'left'}}>
      
            <AppSide/>
      
       </div>
        <div style={{margin:'auto',}}>
         <Label className='qad' style={{textAlign:'',float:'right',marginTop:'15px',fontSize:'16px'}}>Welcome, Manager you are in cockpit of <a style={{color:'green'}} className="" href=" ">EEPLTEST</a>  </Label>
        </div>
        <div style={{ marginRight:'1rem'}} >
         <SearchIcon  style={{float:'right',marginLeft:' ',fontSize:'30px',marginTop:'10px'}}/>
        <EditOutlinedIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/>
         <FolderOpenOutlinedIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/>
        <RefreshIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/>
         </div>
    
      </CardGroup>
    
 
        </>
    )
}
export default NavBar;
