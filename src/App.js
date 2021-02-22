import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import styled from 'styled-components';
import AppsData from './components/AppsData';
import AppsWrapper from './components/AppsWrapper';

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    document.querySelectorAll('.scroll').forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const target = item.href.split('#')[1];
        const topVal = document.getElementById(decodeURIComponent(target))
          .offsetTop;
        window.scrollTo({
          top: topVal - 30,
          behavior: 'smooth',
        });
      });
    });
  }, []);

  return (
    <div>
      <Container fluid>
        <img
          // eslint-disable-next-line
          src={require(`./static/logo.png`)}
          className="img-fluid my-1"
          alt=""
        />
      </Container>
      <Navbar color="primary" expand="md" dark>
        <div
          className="d-flex d-md-none w-100 text-white py-1"
          onClick={toggleNavbar}
          aria-hidden="true"
        >
          Menu
          <span className="ml-auto">
            <Icon
              path={collapsed ? mdiChevronRight : mdiChevronDown}
              size={1}
            />
          </span>
        </div>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {Object.keys(AppsData).map((link) => (
              <NavItem className="mr-2 my-1 my-md-0 rounded-lg" key={link}>
                <CustomNavLink href={`/#${link}`} className="scroll px-md-3">
                  {link}
                </CustomNavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>

      <AppsWrapper />
    </div>
  );
};

const CustomNavLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.8) !important;

  &:hover {
    color: white !important;
  }
`;

export default App;
