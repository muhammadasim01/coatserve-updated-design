import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 20px;
  text-decoration: none;
  font-size: 18px;
color:#000000;
  &:hover {
    background:#b6f0f2;
    cursor: pointer;
    color:#000000;
     text-decoration: none;
  }
`;
const SidebarLabel = styled.span`
  margin-left: 16px;
`;
const DropdownLink = styled.div`
  height: 40px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  font-size: 14px;

  &:hover {
    background:#1ee3cf;
    cursor: pointer;
    color:#000000;
     text-decoration: none;
  }
`;
const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink onClick={() =>{ window.location.href = item.path}}  key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};
export default SubMenu;
