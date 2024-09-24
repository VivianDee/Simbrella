import React from 'react';
import { MDBSelect } from 'mdb-react-ui-kit';

const SelectInput = ({ label, options, value, onChange, required }) => {
  return (
    <div className="mb-3">
      <MDBSelect label={label} options={options} value={value} onChange={onChange} required={required} />
    </div>
  );
};

export default SelectInput;
