import React from 'react';
import {GrDocumentUser} from 'react-icons/gr';
import {FaUserTie} from 'react-icons/fa';
import {BiUserVoice} from 'react-icons/bi';
import {FaSignal} from 'react-icons/fa';
import {GiMoneyStack} from 'react-icons/gi';
import {FaFileInvoice} from 'react-icons/fa';
import {GiProgression} from 'react-icons/gi';
import {GrServicePlay } from 'react-icons/gr';
import {RiUserSearchFill } from 'react-icons/ri';
import {RiProjector2Line } from 'react-icons/ri';
import {HiOutlineDocumentReport } from 'react-icons/hi';
import * as IoIcons from 'react-icons/io';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import DescriptionIcon from '@material-ui/icons/Description';
export const SidebarData = [
  
  {
    
    title: 'Administration',
    path: '/',
    icon: <GrDocumentUser/>,
    cName: 'nav-text',
  },
  {
    title: 'Financiais',
    path: '/',
    icon: <FaSignal />,
    cName: 'nav-text'
  },
  {
    title: 'CRM',
    path: '/reports',
    icon: <FaUserTie />,
    cName: 'nav-text'
  },
  {
    title: 'Opportunities',
    path: '/products',
    icon: <BiUserVoice />,
    cName: 'nav-text'
  },
  {
    title: 'Sales - A/R',
    path: '/team',
    icon: <GiMoneyStack />,
    cName: 'nav-text'
  },
  {
    title: 'Purchasing - A/P',
    path: '/messages',
    icon: < ShoppingCartIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Business Partners',
    path: '/support',
    icon: < PersonIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Banking',
    path: '/support',
    icon: <LocalAtmIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Inventory',
    path: '/support',
    icon: <FaFileInvoice />,
    cName: 'nav-text'
  },
  {
    title: 'Resources',
    path: '/support',
    icon: <BusinessIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Production',
    path: '/support',
    icon: <GiProgression />,
    cName: 'nav-text'
  },
  {
    title: 'MRP',
    path: '/support',
    icon: < DescriptionIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Services',
    path: '/support',
    icon: <GrServicePlay />,
    cName: 'nav-text'
  },
  {
    title: 'Human Resources',
    path: '/support',
    icon: <RiUserSearchFill />,
    cName: 'nav-text'
  },
  {
    title: 'Project Management',
    path: '/support',
    icon: <RiProjector2Line />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/support',
    icon: <HiOutlineDocumentReport/>,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }



];
