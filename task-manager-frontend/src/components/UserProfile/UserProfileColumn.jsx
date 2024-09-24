import React from "react";
import SideWrapper from './SideWrapper';
import UserProfileDetails from './UserProfileDetails';
import ProjectList from './ProjectList';
import { observer } from "mobx-react";
import "../Styles/TeamDashboard.scss";


const UserProfileColumn = () => {

  return (
    <div className="user-profile-area">
      <div className="task-manager">Task Manager</div>
      <SideWrapper title="User Profile" content={[<UserProfileDetails key="user_profile"/>]} />
      <SideWrapper title="Projects" content={<ProjectList />} />
    </div>
  );
};




export default observer(UserProfileColumn);