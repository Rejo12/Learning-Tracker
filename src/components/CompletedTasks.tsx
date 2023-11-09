import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { newTaskInterface, taskProps } from "../interfaces";

type CompletedProps = {
  tasks: taskProps;
  handleRefUpdates: (
    height: number,
    statusTasks: newTaskInterface[],
    month: string
  ) => void;
  handleDelete: (item: newTaskInterface, month: string, type: string) => void;
};

const CompletedTasks = ({
  tasks,
  handleRefUpdates,
  handleDelete,
}: CompletedProps) => {
  const { completedTasks } = tasks;

  if (completedTasks.length === 0) {
    return (
      <>
        <div className="pending-tasks-container">
          <span className="text-style" style={{ wordBreak: "break-word" }}>
            No tasks available
          </span>
        </div>
        <br />
        <br />
      </>
    );
  }

  return (
    <div className="">
      {completedTasks.map((item: newTaskInterface, index: number) =>
        !item.isPending ? (
          <>
            <div className="pending-tasks-container">
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
            {index === completedTasks.length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </>
        ) : null
      )}
    </div>
  );
};

export default CompletedTasks;
