import React from 'react';


// Side Wrapper Component
const SideWrapper = ({ title, content, className }) => {
    return (
      <div className={`side-wrapper ${className || ''}`}>
        {title && <div className="project-title">{title}</div>}
        {content}
      </div>
    );
  };

  
export default SideWrapper;