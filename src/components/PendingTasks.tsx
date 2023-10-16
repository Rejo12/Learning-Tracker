import React, { useLayoutEffect, useRef } from "react";
import { newTaskInterface, taskProps } from "../interfaces";

interface PendingProps {
  tasks: taskProps;
  handleRefUpdates: (
    height: number,
    statusTasks: newTaskInterface[],
    month: string
  ) => void;
}

const PendingTasks: React.FC<PendingProps> = ({
  tasks,
  handleRefUpdates,
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

  return (
    <div className="pending-tasks-container" ref={currentRef}>
      {pendingTasks.map((item: newTaskInterface) => (
        <p style={{ wordBreak: "break-word" }}>{item.taskName}</p>
      ))}
    </div>
  );
};

export default PendingTasks;
