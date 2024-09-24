import React from 'react';
import SearchBar from './SearchBar';
import TopMenu from './TopMenu';
import "../Styles/TeamDashboard.scss";

// Header Component
const Header = () => {
    return (
      <div className="header">
        <SearchBar />
        <TopMenu />
      </div>
    );
  };
  
export default Header;