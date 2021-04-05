import React, { useState } from 'react';

const PasswordResetForm = ({ handlePasswordReset }) => {
  const [state, setState] = useState({
    username: '',
  });

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setState({ ...state, [name]: value });
  };

  const [status, setStatus] = useState(true);

  return (
    <form
      onSubmit={(e) => {
        if (status) {
          handlePasswordReset(e, state);
          setStatus(false);
        } else e.preventDefault();
      }}
    >
      <h2 className="font-weight-bold text-primary mb-3">
        OSA Reset Password Form
      </h2>
      <div className="form-group row">
        <p className="col-sm-1 col-form-label">Email</p>
        <div className="col-sm-11 pl-3 pl-md-0 ">
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
      <div className="d-flex">
        <input
          className={`btn btn-primary ml-auto ${status ? '' : 'disabled'}`}
          value="Reset Password"
          type="submit"
        />
      </div>
    </form>
  );
};

export default PasswordResetForm;
