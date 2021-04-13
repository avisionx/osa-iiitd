import React, { useState } from 'react';

const EditProfileForm = ({ handleEditProfile, prevState }) => {
  const [state, setState] = useState({
    ...prevState,
    username1: prevState.username,
  });

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <form onSubmit={(e) => handleEditProfile(e, state)}>
      <h2 className="font-weight-bold text-primary mb-3">
        OSA Edit Profile Form
      </h2>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label">First Name</p>
        <div className="col-sm-9 pl-3 pl-md-0 ">
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
        <div className="col-sm-9 pl-3 pl-md-0 ">
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
        <div className="col-sm-9 pl-3 pl-md-0 ">
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
      <div className="form-group row mb-1">
        <p className="col-sm-3 col-form-label">Re-Enter Email</p>
        <div className="col-sm-9 pl-3 pl-md-0 ">
          <input
            type="email"
            required
            name="username1"
            placeholder="Re-Enter Email"
            autoComplete="new-email"
            className="form-control"
            value={state.username1}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <p className="col-sm-3 col-form-label" />
        <div className="col-sm-9 pl-3 pl-md-0 small text-danger">
          Note: Changing Email Requires Email Confirmation.
        </div>
      </div>
      <div className="d-flex">
        <input
          className="btn btn-primary ml-auto"
          value="Update Profile"
          type="submit"
        />
      </div>
    </form>
  );
};

export default EditProfileForm;
