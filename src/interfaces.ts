export interface newTaskInterface {
  month?: string;
  id: number;
  taskName: string;
  readOnly: boolean;
  isPending:boolean;
}

export interface taskProps {
  month: string;
  pendingTasks: newTaskInterface[];
  completedTasks: newTaskInterface[];
}