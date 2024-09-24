import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

const PrimaryButton = ({ children, onClick }) => {
  return (
    <MDBBtn color="primary" onClick={onClick}>
      {children}
    </MDBBtn>
  );
};

export default PrimaryButton;
