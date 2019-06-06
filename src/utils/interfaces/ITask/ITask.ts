import {TaskStatus} from "../../types/types";

export interface ITask {
  id: number;
  title: string;
  dueDate: string;
  createdDate: string;
  subTasks: any
  tag: any //users
  description: string;
  createdBy: string; //userId
  taskStatus: TaskStatus;
  projectName: string;
  projectID: string;
  assignedTo: string; //userId
}

export const taskBase = {
  id: null,
  title: null,
  dueDate: null,
  createdDate: null,
  subTasks: null,
  tag: null,
  description: null,
  createdBy: null,
  assignedTo: null,
  taskStatus: null,
  projectID: null,
  projectName: null,
}