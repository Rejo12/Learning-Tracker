import React, { useEffect, useState } from "react";
import { newTaskInterface, taskProps } from "../interfaces";

interface maxHeightsObj {
  [key: string]: number[];
}

interface Props {
  tasks: taskProps;
  addNewTasks: (task: newTaskInterface) => void;
  maxHeights: maxHeightsObj;
}

const newTaskTemplate = (tasks: taskProps) => {
  return {
    month: tasks.month,
    id: new Date().getTime(),
    taskName: "",
    completed: false,
  };
};

const MonthView: React.FC<Props> = ({
  tasks,
  addNewTasks,
  maxHeights,
}: Props) => {
  const [showTextBox, setShowTextBox] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<newTaskInterface>(
    newTaskTemplate(tasks)
  );
  const { completed } = newTask;

  useEffect(() => {
    if (completed) {
      addNewTasks(newTask);
    }
  }, [completed]);
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
      return { ...currTask, completed: !currTask.completed };
    });
    setShowTextBox((currValue) => !currValue);
  };
  // console.log({ newTask });
  let height = "50px";
  if (maxHeights[tasks.month]) {
    height = `${Math.max(...maxHeights[tasks.month]) + 50}px`;
  }

  console.log({ showTextBox });
  return (
    <div className="conatiner" style={{ height: height }}>
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