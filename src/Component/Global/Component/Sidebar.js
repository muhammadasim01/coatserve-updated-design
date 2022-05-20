import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import './Sidebar.css';
import { IconContext } from 'react-icons/lib';
import { Scrollbars } from 'react-custom-scrollbars'
const Nav = styled.div`
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  color:#000000;
`;
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 1.5rem;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color:#000000;
  &:hover {
    color:#b54e4e;
    }
`;
const SidebarNav = styled.nav`
background: linear-gradient(to top, cyan, 20%,white );
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
  color:#000000
`;
const SidebarWrap = styled.div`
  width: 100%;
`;
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: '#000000' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
         <Scrollbars style={{ width: '100%', height: '100%' }}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
          </Scrollbars>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};
export default Sidebar;
