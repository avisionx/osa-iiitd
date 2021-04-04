import React, { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form onSubmit={(e) => handleLogin(e, state)}>
      <h2 className="font-weight-bold text-primary mb-3">OSA Login Form</h2>
      <div className="form-group row">
        <p className="col-sm-2 col-form-label">Email</p>
        <div className="col-sm-10">
          <input
            type="email"
            name="username"
            autoComplete="email"
            placeholder="Email"
            className="form-control"
            value={state.username}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-group row">
        <p className="col-sm-2 col-form-label">Password</p>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            autoComplete="current-password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="d-flex">
        <input
          className="btn btn-primary ml-auto"
          value="Login"
          type="submit"
        />
      </div>
    </form>
  );
};

export default LoginForm;
