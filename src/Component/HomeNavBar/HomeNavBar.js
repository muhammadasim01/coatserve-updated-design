import React , { useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';

import {
  Collapse,
  Label,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { CardGroup } from 'react-bootstrap';



const HomeNavBar=()=>{
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);
    return(
        <>
           
            
          <CardGroup>
            <div  style={{float:'left'}}>
      <Navbar color="faded" light>
        
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
       </Navbar>
       </div>
        <div style={{margin:'auto',}}>
         <h5 className='qad' style={{textAlign:'',float:'right',marginTop:'15px'}}>Welcome, Manager you are in cockpit of <a style={{color:'green',backgroundColor:''}} className="" href="Login"><u>EEPLTEST</u></a>  </h5>
        </div>
        <div >
         <SearchIcon  style={{float:'right',marginLeft:' ',fontSize:'30px',marginTop:'10px'}}/> 
         <EditOutlinedIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/>
         <FolderOpenOutlinedIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/>
         <RefreshIcon style={{float:'right',marginRight:'40px',fontSize:'30px',marginTop:'10px'}}/>
         </div>
    
      </CardGroup>
    
 
        </>
    )
}
export default HomeNavBar;