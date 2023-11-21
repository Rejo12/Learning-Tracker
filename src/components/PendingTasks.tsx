import React, { useLayoutEffect, useRef } from "react";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { newTaskInterface, taskProps } from "../interfaces";

type maxHeightProp = {
  [key: string]: number[];
};

interface PendingProps {
  tasks: taskProps;
  handleRefUpdates: (
    height: number,
    statusTasks: newTaskInterface[],
    month: string,
    taskType: string
  ) => void;
  handleDelete: (
    item: newTaskInterface,
    month: string,
    taskType: string
  ) => void;
  handleDone: (item: newTaskInterface, month: string) => void;
  maxHeightsForCompleted: maxHeightProp;
}

const PendingTasks: React.FC<PendingProps> = ({
  tasks,
  handleRefUpdates,
  handleDelete,
  handleDone,
  maxHeightsForCompleted,
}: PendingProps) => {
  const currentRef = useRef<HTMLDivElement>(null);
  const { pendingTasks, completedTasks } = tasks;

  let diffEle = [];
  if (completedTasks.length > pendingTasks.length) {
    diffEle = new Array(completedTasks.length - pendingTasks.length).fill(
      " cover up elements"
    );
  }
  // console.log({ diffEle });

  useLayoutEffect(() => {
    // console.log("layout effect in pending comp");
    if (currentRef.current) {
      // console.log("current ref", currentRef.current.clientHeight);
      handleRefUpdates(
        currentRef.current.clientHeight,
        pendingTasks,
        tasks.month,
        "pending"
      );
    }
  }, [pendingTasks.length, completedTasks.length]);

  // console.log({ pendingTasks });
  // console.log({ tasks });

  if (pendingTasks.length === 0 && completedTasks.length === 0) {
    return (
      <>
        <div className="pending-tasks-container">
          <span className="text-style" style={{ wordBreak: "break-word" }}>
            No tasks available
          </span>
        </div>
        {/* <br />
        <br /> */}
      </>
    );
  }

  // let styleObj = {};
  // if (maxHeightsForCompleted[tasks.month]) {
  //   let height;
  //   if (currentRef.current) {
  //     height = `${Math.max(
  //       ...maxHeightsForCompleted[tasks.month],
  //       currentRef.current?.clientHeight
  //     )}px`;
  //   }

  //   console.log("maxHeightsForCompleted", maxHeightsForCompleted);
  //   console.log("pending calculated height", height);
  //   console.log("pending normal height", currentRef.current?.clientHeight);
  //   // styleObj = { height: height };
  // }

  return (
    <div ref={currentRef}>
      {pendingTasks.map((item: newTaskInterface, index: number) =>
        item.isPending ? (
          <>
            <div className="pending-tasks-container" key={item.id}>
              <span className="text-style" style={{ wordBreak: "break-word" }}>
                {item.taskName}
              </span>
              <DoneIcon
                onClick={(e) => handleDone(item, tasks.month)}
                className="cursonPointer"
              />
              <DeleteForeverIcon
                onClick={(e) => handleDelete(item, tasks.month, "pendingTasks")}
                className="cursonPointer"
              />
            </div>
          </>
        ) : null
      )}
      {diffEle.map((item: string, index: number) => (
        <>
          <div className="pending-tasks-container hide" key={index}>
            <span className="text-style" style={{ wordBreak: "break-word" }}>
              {item}
            </span>
          </div>
          {index === diffEle.length - 1 && (
            <>
              {/* <br />
              <br /> */}
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default PendingTasks;
