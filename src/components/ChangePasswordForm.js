import React, { useState } from 'react';

const ChangePasswordForm = ({ handleChangePassword }) => {
  const [state, setState] = useState({
    token: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form onSubmit={(e) => handleChangePassword(e, state)}>
      <h2 className="font-weight-bold text-primary mb-3">
        OSA New Password Form
      </h2>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">Token</p>
        <div className="col-sm-9 pl-3 pl-md-0 ">
          <input
            type="text"
            className="form-control"
            name="token"
            placeholder="Token"
            value={state.token}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">New Password</p>
        <div className="col-sm-9 pl-3 pl-md-0 ">
          <input
            type="password"
            className="form-control"
            name="password1"
            placeholder="New Password"
            autoComplete="new-password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            value={state.password1}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">Re-Enter Password</p>
        <div className="col-sm-9 pl-3 pl-md-0 ">
          <input
            type="password"
            className="form-control"
            name="password2"
            placeholder="Re-Enter Password"
            autoComplete="new-password"
            value={state.password2}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="d-flex">
        <p className="mb-0 small text-secondary d-flex align-items-center">
          Note: Check your email for the token.
        </p>
        <input
          className="btn btn-primary ml-auto"
          value="Change Password"
          type="submit"
        />
      </div>
    </form>
  );
};

export default ChangePasswordForm;
