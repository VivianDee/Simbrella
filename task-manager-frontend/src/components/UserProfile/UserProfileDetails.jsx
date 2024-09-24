import React from 'react';
import { useStore } from '../../hooks/stores';
import { observer } from "mobx-react";
import { action } from "mobx";

// User Profile Component
const UserProfileDetails = () => {

  const { authStore, projectStore } = useStore();
  const user = authStore.user;

    return (
      <div className="user-profile">
        <img
          src="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png"
          alt="User"
          className="user-photo"
        />
        <div className="user-name">{user?.name || 'Guest'}</div>
        <div className="user-task">{user?.email || "guest"}</div>
      </div>
    );
  };

  
export default observer(UserProfileDetails);