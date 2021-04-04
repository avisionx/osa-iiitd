import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const AuthControls = ({
  className,
  loggedIn,
  handleLogout,
  showModal,
  /* eslint-disable-next-line camelcase */
  first_name,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className={className}>
      {loggedIn ? (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} inNavbar>
          <DropdownToggle className="bg-success border-0">
            <Icon path={mdiAccount} size={1} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header className="text-dark font-weight-bold">
              {/* eslint-disable-next-line camelcase */}
              Welcome {first_name}!
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => showModal('editprofile')}>
              Edit Profile
            </DropdownItem>
            <DropdownItem onClick={() => showModal('resetpassword')}>
              Reset Password
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} inNavbar>
          <DropdownToggle className="bg-secondary border-0">
            <Icon path={mdiAccount} size={1} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => showModal('login')}>
              Login
            </DropdownItem>
            <DropdownItem onClick={() => showModal('signup')}>
              Sign Up
            </DropdownItem>
            <DropdownItem onClick={() => showModal('resetpassword')}>
              Reset Password
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};
export default AuthControls;
