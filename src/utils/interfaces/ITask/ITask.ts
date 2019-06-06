import {TaskStatus} from "../../types/types";

export interface ITask {
  id: number;
  completeDate: string;
  dueDate: string;
  createdDate: string;
  criteria: any
  tag: any //users
  task: string;
  createdBy: number; //userId
  assignedTo: number; //userId
  taskStatus: TaskStatus;
  projectID: number;
}

export const taskBase = {
  id: null,
  completeDate: null,
  dueDate: null,
  createdDate: null,
  criteria: null,
  tag: null,
  task: null,
  createdBy: null,
  assignedTo: null,
  taskStatus: null,
  projectID: null,
}