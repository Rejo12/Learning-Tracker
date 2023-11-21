import React, { useRef, useLayoutEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { newTaskInterface, taskProps } from "../interfaces";

type CompletedProps = {
  tasks: taskProps;
  handleRefUpdates: (
    height: number,
    statusTasks: newTaskInterface[],
    month: string,
    taskType: string
  ) => void;
  handleDelete: (item: newTaskInterface, month: string, type: string) => void;
};

const CompletedTasks = ({
  tasks,
  handleRefUpdates,
  handleDelete,
}: CompletedProps) => {
  const currRef = useRef<HTMLDivElement>(null);
  const { completedTasks, pendingTasks } = tasks;

  let diffEle = [];
  if (pendingTasks.length > completedTasks.length) {
    diffEle = new Array(pendingTasks.length - completedTasks.length).fill(
      " cover up elements"
    );
  }

  useLayoutEffect(() => {
    if (currRef.current) {
      handleRefUpdates(
        currRef.current.clientHeight,
        completedTasks,
        tasks.month,
        "completed"
      );
    }
  }, [completedTasks.length, pendingTasks.length]);

  if (completedTasks.length === 0 && pendingTasks.length === 0) {
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

  return (
    <div className="" ref={currRef}>
      {completedTasks.map((item: newTaskInterface, index: number) =>
        !item.isPending ? (
          <>
            <div className="pending-tasks-container" key={item.id}>
              <span className="text-style" style={{ wordBreak: "break-word" }}>
                {item.taskName}
              </span>
              <DeleteForeverIcon
                onClick={(e) =>
                  handleDelete(item, tasks.month, "completedTasks")
                }
                className="cursonPointer"
              />
            </div>
            {/* {index === completedTasks.length - 1 && (
              <>
                <br />
                <br />
              </>
            )} */}
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

export default CompletedTasks;
