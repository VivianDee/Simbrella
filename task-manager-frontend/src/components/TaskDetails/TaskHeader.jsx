import React, { useEffect, useState } from 'react';
import Icon from '../Icons/Icon';
import { observer } from "mobx-react";
import { action } from "mobx";
import { useStore } from '../../hooks/stores';

const TaskHeader = () => {
  const { authStore, taskStore } = useStore();
  const selectedTask = taskStore.getSelectedTask();
  const userData = authStore.asignee;

  useEffect(() => {
    const fetchUser = async () => {
      authStore.asignee = await authStore.getUserById(selectedTask.assigned_to);
    };

    fetchUser();
  }, [authStore, selectedTask]);

  const profileImage="https://assets.codepen.io/3364143/Screen+Shot+2020-08-01+at+12.24.16.png";

  if (!userData) {
    return <div></div>;
  }

    return (
      <div className="task-detail-header">
        <div className="task-detail-profile">
          <img src={profileImage} alt="" className="members inbox-detail" />
          <div className="task-detail-name">{userData.name}</div>
        </div>
        <div className="task-icons d-flex">
          <Icon type="trash" />
        </div>
      </div>
    );
  };

  export default observer(TaskHeader);