import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
export const SidebarData = [
  {
    title: 'Administraion',
    path: '/overview',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Human Resources',
    path: '/',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Allowance  Setup',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Deduction  Setup',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Earned Leave Policy',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Employee',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Employee Allowance',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Employee Deduction',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Employee Salary',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Fiscal Year  Setup',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Late Policy',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Leave Type',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ,
      {
        title: 'Pay Grade Setup',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ,
      {
        title: 'Payroll Process',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ,
      {
        title: 'Time Sheet',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Works Shift Setup',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Loan/Advance Appliation',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    
    ]
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Message 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }

  
];
