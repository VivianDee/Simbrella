import React from 'react';
import { observer } from "mobx-react";

// Team Members Component
const TeamMembers = ({ users }) => {
  const img = [
    "https://images.unsplash.com/flagged/photo-1574282893982-ff1675ba4900",
    "https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png",
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    "https://images.unsplash.com/photo-1541647376583-8934aaf3448a"
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * img.length);
    return img[randomIndex];
  };

  if (!users || users.length === 0) {
    return <p>Loading team members...</p>;
  }

  return (
    <div className="d-flex flex-wrap w-100 gap-15" style={{ gap: "15px" }}>
        {users?.map((user, userIndex) => (
          <div key={`${userIndex}`} className="team-member-item w-20">
            <img
              src={getRandomImage()}
              alt={`Profile of ${user?.name}`}
              className="members w-10/12"
            />
            <p className="w-20">{user?.first_name || "Unnamed"}</p>
          </div>
        ))}
    </div>
  );
  
};

export default observer(TeamMembers);
