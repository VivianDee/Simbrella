import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

const EmailInput = ({ label, value, onChange, placeholder, required }) => {
  return (
    <MDBInput
      label={label}
      type="email"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="mb-4"
    />
  );
};

export default EmailInput;
