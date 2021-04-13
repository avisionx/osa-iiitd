import { mdiChevronDown, mdiChevronRight, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Modal,
  Alert,
  ModalBody,
} from 'reactstrap';
import styled from 'styled-components';
import AppsData from './components/AppsData';
import AppsWrapper from './components/AppsWrapper';
import AuthControls from './components/AuthControls';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import PasswordResetForm from './components/PasswordResetForm';
import ChangePasswordForm from './components/ChangePasswordForm';

import Config from './Config';
import EditProfileForm from './components/EditProfileForm';
import VerifyEmailForm from './components/VerifyEmailForm';

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [usernameForPassReset, setUsernameForPassReset] = useState('');
  const [formErr, setFormErr] = useState('');
  const toggleModal = () => setModal(!modal);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const [state, setState] = useState({
    loggedIn: !!localStorage.getItem('token'),
    username: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch(`${Config.backend_base_url}core/current_user/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw Error();
        })
        .then((json) => {
          setState({ ...json, loggedIn: true });
          if (window.location.hash) {
            setModalType(window.location.hash.split('#')[1]);
            setModal(true);
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

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

  const handleLogin = (e, data) => {
    e.preventDefault();
    fetch(`${Config.backend_base_url}token-auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error('Bad Login');
      })
      .then((json) => {
        localStorage.setItem('token', json.token);
        setState({
          loggedIn: true,
          username: json.user.username,
          first_name: json.user.first_name,
          last_name: json.user.last_name,
          is_verified: json.user.is_verified,
        });
        setModal(false);
      })
      .catch(() => {
        setFormErr("Your email and password didn't match! Please try again.");
      });
  };

  const handleSignUp = (e, data) => {
    e.preventDefault();
    if (data.password1 === data.password2) {
      fetch(
        `${Config.backend_base_url}core/users/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, password: data.password1 }),
        },
        { strictErrors: true },
      )
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          }
          throw Error('Bad Sign Up');
        })
        .then((json) => {
          localStorage.setItem('token', json.token);
          setState({
            loggedIn: true,
            username: json.username,
            first_name: json.first_name,
            last_name: json.last_name,
            is_verified: json.is_verified,
          });
          setModal(false);
        })
        .catch(() => {
          setFormErr('A user with this email already exists! Reset password?');
        });
    } else setFormErr("Your passwords don't match!");
  };

  const handlePasswordReset = (e, data) => {
    e.preventDefault();
    fetch(
      `${Config.backend_base_url}core/reset_password/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
      { strictErrors: true },
    ).then((res) => {
      if (res.status === 200) {
        setModalType('changepassword');
        setUsernameForPassReset(data.username);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setState({
      loggedIn: false,
      username: '',
      first_name: '',
      last_name: '',
      is_verified: false,
    });
  };

  const handleChangePassword = (e, data) => {
    e.preventDefault();
    if (data.password1 === data.password2) {
      fetch(
        `${Config.backend_base_url}core/change_password/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            password: data.password1,
            username: usernameForPassReset,
          }),
        },
        { strictErrors: true },
      )
        .then((res) => {
          if (res.status === 200) {
            setModalType('login');
            handleLogout();
            return setFormErr('Login to continue!');
          }
          throw Error('Bad Sign Up');
        })
        .catch(() => {
          setFormErr(
            'Some error occured! Token has expired or try again after some time.',
          );
        });
    } else setFormErr("Your passwords don't match!");
  };

  const handleVerifyEmail = (e, data) => {
    e.preventDefault();
    fetch(
      `${Config.backend_base_url}core/verify_email/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          username: state.username,
        }),
      },
      { strictErrors: true },
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error('Bad Sign Up');
      })
      .then((json) => {
        setState({
          loggedIn: true,
          username: json.username,
          first_name: json.first_name,
          last_name: json.last_name,
          is_verified: json.is_verified,
        });
        return setModal(false);
      })
      .catch(() => {
        setFormErr(
          'Some error occured! Token has expired or try again after some time.',
        );
      });
  };

  const handleEditProfile = (e, data) => {
    e.preventDefault();
    if (data.username === data.username1)
      fetch(
        `${Config.backend_base_url}core/edit_profile/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data),
        },
        { strictErrors: true },
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          if (res.status === 401) {
            throw Error('Please verify your email first!');
          }
          throw Error(
            'Some error occured! User already exists or try again after some time.',
          );
        })
        .then((json) => {
          setState({
            loggedIn: true,
            username: json.username,
            first_name: json.first_name,
            last_name: json.last_name,
            is_verified: json.is_verified,
          });
          setModal(false);
        })
        .catch((err) => {
          setFormErr(err.message);
        });
    else setFormErr("Your emails don't match!");
  };

  const renderModalForm = (param) => {
    switch (param) {
      case 'login':
        return <LoginForm handleLogin={handleLogin} />;
      case 'signup':
        return <SignUpForm handleSignUp={handleSignUp} />;
      case 'resetpassword':
        return <PasswordResetForm handlePasswordReset={handlePasswordReset} />;
      case 'changepassword':
        return (
          <ChangePasswordForm handleChangePassword={handleChangePassword} />
        );
      case 'editprofile':
        return (
          <EditProfileForm
            handleEditProfile={handleEditProfile}
            prevState={state}
          />
        );
      case 'verifyemail':
        return <VerifyEmailForm handleVerifyEmail={handleVerifyEmail} />;
      default:
        return <></>;
    }
  };

  const showModal = (param) => {
    window.location.hash = param;
    setModalType(param);
    setModal(true);
  };

  const verifyEmail = () => {
    fetch(
      `${Config.backend_base_url}core/resend_email/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: state.username }),
      },
      { strictErrors: true },
    ).then((res) => {
      if (res.status === 200) {
        setModalType('verifyemail');
        setModal(true);
      }
    });
  };

  return (
    <div>
      {state.loggedIn && !state.is_verified && (
        <Alert className="mx-3 mt-1 mb-0 small" color="danger">
          Please verify your email: {state.username} we sent you an email to
          activate OSA App Login System.{' '}
          <span
            aria-hidden="true"
            className="p-0 ml-auto text-danger pointer"
            onClick={verifyEmail}
          >
            <u>Verify Now!</u>
          </span>
        </Alert>
      )}
      <Container fluid>
        <div className="d-flex align-items-center mb-0">
          <h1 className="mb-0 display-3 font-weight-bold ml-auto ml-lg-0 text-primary">
            OSA
          </h1>
          <img
            // eslint-disable-next-line
            src={require(`./static/iiitd-logo.png`)}
            className="mr-auto ml-lg-0"
            height="90px"
            alt=""
          />
        </div>
        <div className="d-flex">
          <p
            className="mx-auto mx-lg-0 ml-lg-1 small text-secondary text-center"
            style={{ marginTop: '-10px' }}
          >
            Small helper line explaing what it is in max 2-3 lines and even
            small for mobile.
          </p>
        </div>
      </Container>
      <Navbar color="primary" expand="md" dark>
        <div className="d-flex d-md-none w-100 text-white py-1">
          <div
            className="d-flex align-items-center"
            onClick={toggleNavbar}
            aria-hidden="true"
          >
            Menu
            <span className="ml-1">
              <Icon
                path={collapsed ? mdiChevronRight : mdiChevronDown}
                size={0.7}
              />
            </span>
          </div>
          <AuthControls
            className="d-block d-md-none ml-auto"
            loggedIn={state.loggedIn}
            handleLogout={handleLogout}
            first_name={state.first_name}
            showModal={showModal}
          />
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
        <AuthControls
          className="d-none d-md-block"
          loggedIn={state.loggedIn}
          handleLogout={handleLogout}
          first_name={state.first_name}
          showModal={showModal}
        />
      </Navbar>
      <AppsWrapper />
      <div className="mt-4">
        <footer className="text-center text-muted mb-2">
          {' '}
          <small>
            Copyright © {new Date().getFullYear()} IIITD | All rights reserved
          </small>{' '}
        </footer>
      </div>
      <Modal
        centered
        size="lg"
        isOpen={modal}
        toggle={toggleModal}
        onClosed={() => {
          setFormErr('');
          window.history.pushState(
            '',
            document.title,
            window.location.pathname,
          );
        }}
      >
        <ModalBody>
          <button
            className="btn"
            style={{ position: 'absolute', top: '0px', right: '0px' }}
            onClick={toggleModal}
            type="button"
          >
            <Icon path={mdiClose} size={1} />
          </button>
          {renderModalForm(modalType)}
          {formErr && (
            <Alert className="mb-0 mt-3 small" color="danger">
              {formErr}
            </Alert>
          )}
        </ModalBody>
      </Modal>
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
