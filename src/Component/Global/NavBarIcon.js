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
         <Label className='qad' style={{textAlign:'',float:'right',marginTop:'15px',fontSize:'16px'}}>Welcome, Manager you are in cockpit of <a style={{color:'green',backgroundColor:''}} className="" href="https://www.facebook.com/profile.php?id=100010451224154">EEPLTEST</a>  </Label>
        </div>
        <div style={{ marginRight:'1rem'}} >
        <a href=" " style={{color:'black'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Search" >  <SearchIcon  style={{float:'right',marginLeft:' ',fontSize:'30px',marginTop:'10px'}}/> </a>
        <a href=" " style={{color:'black'}}data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" > <EditOutlinedIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/></a>
        <a href=" " style={{color:'black'}}data-bs-toggle="tooltip" data-bs-placement="top" title="Folder" > <FolderOpenOutlinedIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/></a>
        <a href=" " style={{color:'black'}}data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh" > <RefreshIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/></a>
         </div>
    
      </CardGroup>
    
 
        </>
    )
}
export default NavBar;
