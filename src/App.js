import React, { useEffect } from 'react';
import { Container, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';
import AppsData from './components/AppsData';
import AppsWrapper from './components/AppsWrapper';

const App = () => {
  useEffect(() => {
    document.querySelectorAll('.scroll').forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        const target = item.href.split('#')[1];
        const topVal = document.getElementById(decodeURIComponent(target))
          .offsetTop;
        window.scrollTo({
          top: topVal,
          behavior: 'smooth',
        });
      });
    });
  }, []);

  return (
    <div>
      <Container className="mx-0 mx-lg-5">
        <img
          // eslint-disable-next-line
          src={require(`./static/logo.png`)}
          className="img-fluid my-1"
          alt=""
        />
      </Container>
      <div>
        <CustomNavbar color="primary" dark expand="xs">
          <Nav className="mx-0 mx-lg-5" navbar>
            {Object.keys(AppsData).map((link) => (
              <NavItem key={link}>
                <NavLink
                  href={`/#${link}`}
                  className="scroll text-white border-right border-white px-3 py-1"
                >
                  {link}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </CustomNavbar>
      </div>
      <AppsWrapper />
    </div>
  );
};

const CustomNavbar = styled(Navbar)`
  width: 100vw;
  overflow: auto;
`;

export default App;
