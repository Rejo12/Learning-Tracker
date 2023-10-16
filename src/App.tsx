import React, { useRef, useState } from "react";
import "./App.css";
import MonthView from "./components/MonthView";
import { newTaskInterface } from "./interfaces";
import PendingTasks from "./components/PendingTasks";

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

interface maxHeightsObj {
  [key: string]: number[];
}

const App = () => {
  const [tasks, setTasks] = useState<initialStateInterface[]>(initialState);

  const [maxHeights, setMaxHeights] = useState<maxHeightsObj>({});

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
    month: string
  ) => {
    let tmpStatusTasks = JSON.parse(JSON.stringify(maxHeights));
    // console.log({ statusTasks });
    // console.log({ tmpStatusTasks });
    if (tmpStatusTasks[month]) {
      tmpStatusTasks[month].push(height);
    } else {
      tmpStatusTasks[month] = [];
      tmpStatusTasks[month].push(height);
    }
    setMaxHeights(tmpStatusTasks);
  };

  console.log({ tasks });

  return (
    <>
      <h3 className="main-heading">Learning Tracker</h3>
      <div className="app">
        <div>
          <span>Month</span>
          {tasks.map((item) => (
            <MonthView
              tasks={item}
              addNewTasks={handleNewTasks}
              key={item.month}
              maxHeights={maxHeights}
            />
          ))}
        </div>
        <div>
          <span>Pending</span>
          {tasks.map((item) => (
            <PendingTasks
              tasks={item}
              // addNewTasks={handleNewTasks}
              key={item.month}
              handleRefUpdates={handleRefUpdates}
            />
          ))}
        </div>
        {/* <CompletedTasks /> */}
      </div>
    </>
  );
};

export default App;
