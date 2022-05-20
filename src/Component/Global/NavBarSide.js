import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { Scrollbars } from 'react-custom-scrollbars'

const Nav = styled.div`
  background: #ffffff;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  color:#000000
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color:#000000;
  background: linear-gradient(to bottom, #ffffff 30%, #000000 150%);
 
  &:hover {
    color: #ffffff;
  }
`;

const SidebarNav = styled.nav`
  background: #ffffff;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
 left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 1;
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
        <Nav >
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={()=>showSidebar()} />
          </NavIcon>
          </Scrollbars>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
