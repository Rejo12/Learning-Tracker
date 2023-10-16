export interface newTaskInterface {
  month?: string;
  id: number;
  taskName: string;
  completed: boolean;
}

export interface taskProps {
  month: string;
  pendingTasks: newTaskInterface[];
  completedTasks: newTaskInterface[];
}