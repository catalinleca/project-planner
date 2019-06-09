import {TaskStatus} from "../../types/types";

export interface ITask {
  id: string;
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
  title: null,
  dueDate: null,
  createdDate: null,
  subTasks: null,
  tag: null,
  description: null,
  createdBy: null,
  assignedTo: null,
  taskStatus: 'toDo',
  projectID: null,
  projectName: null,
}

/**
 task title
 task status
 assigned to
 due date
 */