import React from 'react';

const SignupForm = ({ children, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(); // Call the onSubmit function passed as a prop
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {children} {/* Render children here */}
    </form>
  );
};

export default SignupForm;
