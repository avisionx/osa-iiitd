import React, { useState } from 'react';

const VerifyEmailForm = ({ handleVerifyEmail }) => {
  const [state, setState] = useState({
    token: '',
  });

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form onSubmit={(e) => handleVerifyEmail(e, state)}>
      <h2 className="font-weight-bold text-primary mb-3">
        OSA Verify Email Form
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
      <div className="d-flex">
        <p className="mb-0 small text-secondary d-flex align-items-center">
          Note: Check your email for the token.
        </p>
        <input
          className="btn btn-primary ml-auto"
          value="Verify Email"
          type="submit"
        />
      </div>
    </form>
  );
};

export default VerifyEmailForm;
