import React from 'react';
// import * as RiExchangeCnyFill from 'react-icons/ri';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import {RiServiceLine} from 'react-icons/ri';
import {RiExchangeCnyFill} from 'react-icons/ri';
import {CgProductHunt} from 'react-icons/cg';
import {MdPhonelinkSetup} from 'react-icons/cg';
import {MdSystemUpdateAlt} from 'react-icons/md';
import {FaSignal} from 'react-icons/fa';
import {FaSalesforce} from 'react-icons/fa';
import {FaFileInvoice} from 'react-icons/fa';
import {SiGoogletagmanager} from 'react-icons/si';
import {GrResources } from 'react-icons/gr';
import {GiHumanPyramid } from 'react-icons/gi';
import {RiProjector2Line } from 'react-icons/ri';
import {HiOutlineDocumentReport } from 'react-icons/hi';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import DescriptionIcon from '@material-ui/icons/Description';
// import PurchaseQuotation from '../../Sceens/PurchasingAP'


export const SidebarData = [
    
  {
    title: 'Administraion',
    path: '#',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Choose Company',
        path: '#',
        icon: <LocationCityIcon/>,
        cName: 'nav-text',
      },
      // {
      //   title: 'Exchange Rates and Indexes',
      //   path: 'ExchangeRates',
      //   icon: <RiExchangeCnyFill/>,
      //   cName: 'nav-text',
      // }
      // ,
      {
        title: 'System Initialization',
        path: '#',
        icon: <MdSystemUpdateAlt />,
        cName: 'nav-text',
      }
      ,
      {
        title: 'Setup',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text' 
      }
      ,
      {
        title: 'Data Import/Export',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      }
      ,
      {
        title: 'Utilities',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      }
      ,
      {
        title: 'Approvel Process',
        path: '#',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'License',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Integration Service',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Add-Ons',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Workflow',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Alerts Management',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      }
    ]
  },
  {
    title: 'Financiais',
    path: '#',
    icon: <FaSignal />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    
    subNav: [
      // {
      //   title: 'Chart Of Accounts',
      //   path: "/ChartOfAccounts",
      //   icon: <IoIcons.IoIosPaper />,
      //   cName: 'nav-text'
      // },
      {
        title: 'Journal Entries',
        path: "/JournalEntries",
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Account Balance Report',
        path: "/AccountBalanceReport",
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
    ]
    
   },
   {
    title: 'Sales - A/R',
    path: '#',
    icon: <FaSalesforce/>,
    
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Opportunities',
        path: "/Opportunities",
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text',
      },
      {
        title: 'Sales Quotation',
        path:'/SalesQuotation',
       
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Sales Order',
        path: '/Orders',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'A/R Down Payment Request',
        path: 'SalesDownPaymentRequest',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Delivery',
        path: 'DeliveryNotes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Outward Gate Pass',
        path: 'OGP',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Return',
        path: 'Returns',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'A/R Invoice',
        path: 'Invoices',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'A/R Credit Memo',
        path: 'CreditNotes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      }

    ]
  },
  {
    title: 'Purchasing - A/P',
    
    path: '#',
    icon: < ShoppingCartIcon />,
   
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      { 
        title: 'Purchase Blanket Agreement',
        path: '#',
        refresh:"true",
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Purchase Request',
        path:'PurchaseRequest',
        refresh:"false",
        // path: 'PurchaseRequest',
        
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Purchase Quotation',
        path: '/PurchaseQuotation',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Purchase Order',
        path: 'PurchaseOrder',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'A/P Down Payment Request',
        path: 'DownPaymentRequest',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Inward Gate Pass',
        path: 'OIGP',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Material Inspection Report',
        path: 'MIR',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Goods Receipts PO',
        path: 'PurchaseDeliveryNotes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Goods Return',
        path: 'PurchaseReturn',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'A/p Invoice',
        path: 'PurchaseInvoices',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'A/P Credit Memo ',
        path: 'PurchaseCreditNotes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      }
      ,
      {
        title: 'A/P Reserve Invoice',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      },
      {
        title: 'Landed Cost',
        path: 'LandedCost',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
      }


    ]
  },
   
  {
    title: 'Business Partners',
    path: '#',
    icon: < PersonIcon />,
    cName: 'nav-text',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    
    subNav: [
      { 
        title: 'Activity',
        path: 'Activity',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },

  {
    title: 'Banking',
    path: '#',
    icon: <LocalAtmIcon />,
    cName: 'nav-text',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

     
    subNav: [
      { 
        title: 'Incoming Payment',
        path: 'IncomingPayments',
        icon: <IoIcons.IoIosPaper />
      },
      { 
        title: 'Outgoing Payment',
        path: 'OutgoingPayments',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Inventory',
    path: '#',
    icon: <FaFileInvoice />,
    cName: 'nav-text',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      { 
        title: 'Item Master Data',
        path: 'ItemsMasterData',
        icon: <IoIcons.IoIosPaper />
      },
      { 
        title: 'Inventory Reports',
        path: 'InventoryReports',
        icon: <IoIcons.IoIosPaper />
      },
      { 
        title: 'Bar Codes',
        path: '#',
        icon: <IoIcons.IoIosPaper />
      },
      { 
        title: 'Documnet Printing',
        path: '#',
        icon: <IoIcons.IoIosPaper />
      },
      { 
        title: 'Bin Locations',
        path: '#',
        icon: <IoIcons.IoIosPaper />
      },
      { 
        title: 'Inventory Transactions',
        path: '#',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          { 
            title: 'Goods Receipt',  
            path: 'InventoryGenEntries',
            icon: <IoIcons.IoIosPaper />
          },
          { 
            title: 'Goods Issue',
            path: 'InventoryGenExit',
            icon: <IoIcons.IoIosPaper />
          },
          { 
            title: 'Inventory Transfer Requests ',
            path: 'InventoryTransferRequests',
            icon: <IoIcons.IoIosPaper />
          },
          { 
            title: 'Inventory Transfer',
            path: 'StockTransfers',
            icon: <IoIcons.IoIosPaper />
          },
        ]

      },
      { 
        title: 'Price Lists',
        path: '#',
        icon: <IoIcons.IoIosPaper />
      },
      { 
        title: 'Pick And Pack',
        path: '#',
        icon: <IoIcons.IoIosPaper />
      },
      { 
        title: 'Inventory Reports',
        path: '#',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Resources',
    path: '#',
    icon: <GrResources/>,
  },
  {
    title: 'Production',
    path: '#',
    icon: <GiHumanPyramid/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Bill Of Materials',
        path: '/BillOfMaterials',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Production Order',
        path: '/ProductionOrder',
        icon: <IoIcons.IoIosPaper />
      },
      // {
      //   title: 'Receipt From Production',
      //   path: '/ReceiptFromProduction',
      //   icon: <IoIcons.IoIosPaper />
      // },
      {
        title: 'Issue For Production',
        path: '/IssueForProduction',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },

  {
    title: 'MRP',
    path: '#',
    icon: <SiGoogletagmanager/>,
    
  },
  
  {
    title: 'Services',
    path: '#',
    icon: <RiServiceLine />,
  },



  {
    title: 'Human Resources',
    path: '#',
    icon: <GiHumanPyramid/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Employee Master Data',
        path: '/EmployeeMasterData',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Time Sheet',
        path: '/TimeSheet',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Pay Grade Setup',
        path: '/PayGrade',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Employee Salary',
        path: '/EmployeeSalary',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Fiscal Year Setup',
        path: '/FiscalYear',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Works Shift Setup',
        path: '/WorkShift',
        icon: <IoIcons.IoIosPaper />
      },


      {
        title: 'Allowance  Setup',
        path: '/Allowance',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Deduction  Setup',
        path: '/Deduction',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Leave Application',
        path: '/LeaveApplication',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Late Policy',
        path: '/LatePolicy',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Earned Leave Policy',
        path: '/EarnedLeavePolicy',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Tax Rule Setup',
        path: '/TaxRule',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Loan/Advance Appliation',
        path: '/Loan_AdvanceAppliation',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Leave Type Setup',
        path: '/LeaveType',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Employee Allowance',
        path: '/EmployeeAllowance',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Payroll Process',
        path: '/PayrollProcess',
        icon: <IoIcons.IoIosPaper />
      },
    
    ]
  },
  {
    title: 'Action',
    path: '#',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path:'#',
    icon: <HiOutlineDocumentReport/>,
    cName: 'nav-text'
  },
  {
    title: 'Project Management',
    path: '#',
    icon: <RiProjector2Line />,
    cName: 'nav-text'
  },

];
