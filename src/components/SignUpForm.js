import React, { useState } from 'react';

const SignUpForm = ({ handleSignUp }) => {
  const [state, setState] = useState({
    username: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
  });

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form onSubmit={(e) => handleSignUp(e, state)}>
      <h2 className="font-weight-bold text-primary mb-3">OSA Sign Up Form</h2>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">First Name</p>
        <div className="col-sm-9 pl-0 ">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="form-control"
            value={state.first_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">Last Name</p>
        <div className="col-sm-9 pl-0 ">
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="form-control"
            value={state.last_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">Email</p>
        <div className="col-sm-9 pl-0 ">
          <input
            type="email"
            required
            name="username"
            placeholder="Email"
            autoComplete="new-email"
            className="form-control"
            value={state.username}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">New Password</p>
        <div className="col-sm-9 pl-0 ">
          <input
            type="password"
            className="form-control"
            name="password1"
            placeholder="New Password"
            autoComplete="new-password"
            value={state.password1}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">Re-Enter Password</p>
        <div className="col-sm-9 pl-0 ">
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
        <input
          className="btn btn-primary ml-auto"
          value="Sign Up"
          type="submit"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
