import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

const PasswordInput = ({ label, value, onChange, placeholder, required }) => {
  return (
    <MDBInput
      label={label}
      type="password"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="mb-4"
    />
  );
};

export default PasswordInput;
