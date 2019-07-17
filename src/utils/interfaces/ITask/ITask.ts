import {TaskStatus} from "../../types/types";
import {IUser} from "../IUser/IUser";

export interface ITask {
  id: string;
  title: string;
  dueDate: string;
  createdDate: string;
  subTasks: string[]
  tag: any //users
  description: string;
  createdBy: string; //userId
  taskStatus: TaskStatus;
  projectName: string;
  projectId: string;
  assignedTo: Partial<IUser>; //userId
}

/**
 * Title
 * Project Name
 * taskStatus
 * description
 *
 * assignedTo
 * createdDate
 * dueDate
 * createdBy ***
 * tags
 *
 * subTasks
 * */
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
  projectId: null,
  projectName: null,
}

/**
 task title
 task status
 assigned to
 due date
 */