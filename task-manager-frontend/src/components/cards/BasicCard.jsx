import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, } from 'mdb-react-ui-kit';
import "../Styles/Card.css";

const BasicCard = ({ title, children }) => {
  return (
    <MDBCard className="signup-card hover-shadow">
      <MDBCardBody>
        <MDBCardTitle className="text-center mb-4">{title}</MDBCardTitle>
        <div className="mt-4">{children}</div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default BasicCard;