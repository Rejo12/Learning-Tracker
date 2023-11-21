import React, { useEffect, useState } from "react";
import { newTaskInterface, taskProps } from "../interfaces";

interface maxHeightsForPendingObj {
  [key: string]: number[];
}

interface Props {
  tasks: taskProps;
  addNewTasks: (task: newTaskInterface) => void;
  maxHeightsForPending: maxHeightsForPendingObj;
  maxHeightsForCompleted: maxHeightsForPendingObj;
}

const newTaskTemplate = (tasks: taskProps) => {
  return {
    month: tasks.month,
    id: new Date().getTime(),
    taskName: "",
    readOnly: false,
    isPending: true,
  };
};

const MonthView: React.FC<Props> = ({
  tasks,
  addNewTasks,
  maxHeightsForPending,
  maxHeightsForCompleted,
}: Props) => {
  const [showTextBox, setShowTextBox] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<newTaskInterface>(
    newTaskTemplate(tasks)
  );
  const { readOnly } = newTask;

  useEffect(() => {
    if (readOnly) {
      addNewTasks(newTask);
    }
  }, [readOnly]);
  const handleNewTasks = () => {
    setNewTask(newTaskTemplate(tasks));
    setShowTextBox((currValue) => !currValue);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((currTask) => {
      return { ...currTask, taskName: e.target.value };
    });
  };
  const handleSave = () => {
    setNewTask((currTask) => {
      return { ...currTask, readOnly: !currTask.readOnly };
    });
    setShowTextBox((currValue) => !currValue);
  };
  // console.log({ newTask });
  let height = "90px";
  // if (
  //   maxHeightsForPending[tasks.month] &&
  //   maxHeightsForCompleted[tasks.month]
  // ) {
  //   let max = Math.max(
  //     ...maxHeightsForPending[tasks.month],
  //     ...maxHeightsForCompleted[tasks.month]
  //   );
  //   console.log({ max });
  //   height = `${max}px`;
  // } else
  if (maxHeightsForPending[tasks.month]) {
    height = `${Math.max(...maxHeightsForPending[tasks.month])}px`;
  }
  // else {
  //   if (maxHeightsForCompleted[tasks.month]) {
  //     height = `${Math.max(...maxHeightsForCompleted[tasks.month])}px`;
  //   }
  // }

  // console.log({ showTextBox });
  return (
    <div className="per-month-conatiner" style={{ height: height }}>
      {tasks.month}
      {showTextBox ? (
        <div className="">
          <input
            type="text"
            placeholder="Enter task"
            value={newTask.taskName}
            onChange={(e) => handleNameChange(e)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <button onClick={(e) => handleNewTasks()}>Add tasks</button>
      )}
    </div>
  );
};

export default MonthView;
