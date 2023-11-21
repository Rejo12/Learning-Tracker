import React, { useRef, useState } from "react";
import "./App.css";
import MonthView from "./components/MonthView";
import { newTaskInterface } from "./interfaces";
import PendingTasks from "./components/PendingTasks";
import CompletedTasks from "./components/CompletedTasks";

const initialState = [
  {
    month: "October 2023",
    pendingTasks: [],
    completedTasks: [],
  },
  {
    month: "November 2023",
    pendingTasks: [],
    completedTasks: [],
  },
];

interface initialStateInterface {
  month: string;
  pendingTasks: newTaskInterface[];
  completedTasks: newTaskInterface[];
}

interface maxHeightsForPendingObj {
  [key: string]: number[];
}

const App = () => {
  const [tasks, setTasks] = useState<initialStateInterface[]>(initialState);

  const [maxHeightsForPending, setmaxHeightsForPending] =
    useState<maxHeightsForPendingObj>({});

  const [maxHeightsForCompleted, setmaxHeightsForCompleted] =
    useState<maxHeightsForPendingObj>({});

  const handleNewTasks = (newTask: newTaskInterface) => {
    let selectedIndex;
    console.log({ newTask });
    let tmpTask = JSON.parse(JSON.stringify(tasks));
    let filteredResult = tmpTask.filter(
      (item: newTaskInterface, index: number) => {
        if (item.month === newTask.month) {
          selectedIndex = index;
          return true;
        }
      }
    );

    if (filteredResult.length) {
      delete newTask.month;
      filteredResult[0].pendingTasks.push(newTask);
      tmpTask.splice(selectedIndex, 1, filteredResult[0]);
      setTasks(tmpTask);
    }
  };

  const handleRefUpdates = (
    height: number,
    statusTasks: newTaskInterface[],
    month: string,
    taskType: string
  ) => {
    let tmpStatusTasks = JSON.parse(JSON.stringify(maxHeightsForPending));
    console.log({ statusTasks });
    tmpStatusTasks[month] = [];
    tmpStatusTasks[month].push(height);
    // if (tmpStatusTasks[month]) {
    //   tmpStatusTasks[month].push(height);
    // } else {
    //   tmpStatusTasks[month] = [];
    //   tmpStatusTasks[month].push(height);
    // }
    if (taskType === "pending") {
      setmaxHeightsForPending(tmpStatusTasks);
    } else {
      setmaxHeightsForCompleted(tmpStatusTasks);
    }
  };

  const handleDelete = (
    item: newTaskInterface,
    month: string,
    taskType: string
  ) => {
    let originalTasks = structuredClone(tasks);
    console.log(item, month);
    for (let i = 0; i < originalTasks.length; i++) {
      if (originalTasks[i].month === month) {
        if (taskType === "pendingTasks") {
          for (let j = 0; j < originalTasks[i].pendingTasks.length; j++) {
            if (originalTasks[i].pendingTasks[j].id === item.id) {
              originalTasks[i].pendingTasks.splice(j, 1);
              break;
            }
          }
          break;
        } else {
          for (let j = 0; j < originalTasks[i].completedTasks.length; j++) {
            if (originalTasks[i].completedTasks[j].id === item.id) {
              originalTasks[i].completedTasks.splice(j, 1);
              break;
            }
          }
          break;
        }
      }
    }
    setTasks(originalTasks);
  };

  const handleDone = (item: newTaskInterface, month: string) => {
    let originalTasks = structuredClone(tasks);
    console.log(item, month);
    for (let i = 0; i < originalTasks.length; i++) {
      if (originalTasks[i].month === month) {
        for (let j = 0; j < originalTasks[i].pendingTasks.length; j++) {
          if (originalTasks[i].pendingTasks[j].id === item.id) {
            originalTasks[i].pendingTasks.splice(j, 1);
            originalTasks[i].completedTasks.push({ ...item, isPending: false });
            break;
          }
        }
        break;
      }
    }
    setTasks(originalTasks);
  };

  // console.log({ maxHeightsForPending });
  // console.log({ maxHeightsForCompleted });

  return (
    <>
      <h3 className="main-heading">Learning Tracker</h3>
      <div className="app">
        <div className="month-container">
          <h2>Month</h2>
          {tasks.map((item) => (
            <MonthView
              tasks={item}
              addNewTasks={handleNewTasks}
              key={item.month}
              maxHeightsForPending={maxHeightsForPending}
              maxHeightsForCompleted={maxHeightsForCompleted}
            />
          ))}
        </div>
        <div className="pending-conatiner">
          <h2>Pending</h2>
          {tasks.map((item, index) => (
            <PendingTasks
              key={`${item.month}-${index}`}
              tasks={item}
              handleRefUpdates={handleRefUpdates}
              handleDelete={handleDelete}
              handleDone={handleDone}
              maxHeightsForCompleted={maxHeightsForCompleted}
            />
          ))}
        </div>
        <div className="pending-conatiner">
          <h2>Completed</h2>
          {tasks.map((item, index) => (
            <CompletedTasks
              key={`${item.month}-${index}`}
              tasks={item}
              handleRefUpdates={handleRefUpdates}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        {/* <CompletedTasks /> */}
      </div>
    </>
  );
};

export default App;
