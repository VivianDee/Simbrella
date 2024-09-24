import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

const TextInput = ({ label, value, onChange, placeholder, required }) => {
  return (
    <MDBInput
      label={label}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="mb-4"
    />
  );
};

export default TextInput;
