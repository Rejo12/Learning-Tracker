import React, { useLayoutEffect, useRef } from "react";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { newTaskInterface, taskProps } from "../interfaces";

interface PendingProps {
  tasks: taskProps;
  handleRefUpdates: (
    height: number,
    statusTasks: newTaskInterface[],
    month: string
  ) => void;
  handleDelete: (item: newTaskInterface, month: string) => void;
  handleDone: (item: newTaskInterface, month: string) => void;
}

const PendingTasks: React.FC<PendingProps> = ({
  tasks,
  handleRefUpdates,
  handleDelete,
  handleDone,
}: PendingProps) => {
  const currentRef = useRef<HTMLDivElement>(null);
  const { pendingTasks } = tasks;

  useLayoutEffect(() => {
    if (currentRef.current) {
      handleRefUpdates(
        currentRef.current.clientHeight,
        pendingTasks,
        tasks.month
      );
    }
  }, [pendingTasks.length]);

  // console.log({ pendingTasks });

  return (
    <div ref={currentRef}>
      {pendingTasks.map((item: newTaskInterface, index: number) =>
        item.isPending ? (
          <>
            <div className="pending-tasks-container">
              <span className="text-style" style={{ wordBreak: "break-word" }}>
                {item.taskName}
              </span>
              <DoneIcon onClick={(e) => handleDone(item, tasks.month)} />
              <DeleteForeverIcon
                onClick={(e) => handleDelete(item, tasks.month)}
              />
            </div>
            {index === pendingTasks.length - 1 && (
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

export default PendingTasks;
