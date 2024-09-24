import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { useStore } from '../../hooks/stores';
import TaskHeader from './TaskHeader';
import TaskContents from './TaskContents';

const TaskDetails = () => {

  const { taskStore } = useStore();
  const selectedTask = taskStore.getSelectedTask();


  
  return (
    <div className="task-detail">
        {selectedTask && <TaskHeader/>}
        {selectedTask &&  <TaskContents/>}
    </div>
  );
};

export default observer(TaskDetails);
