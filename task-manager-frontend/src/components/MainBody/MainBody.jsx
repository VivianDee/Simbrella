import React from 'react';
import Header from './Header';
import MainContainer from './MainContainer';
import "../Styles/TeamDashboard.scss";



// Main Body Component
const MainBody = () => {

    return (
      <div className="main-area">
        <Header />
        <MainContainer
        />
      </div>
    );
  };
  
  export default MainBody;