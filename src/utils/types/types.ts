// export type TaskStatus = 'toDo' | 'inProgress' | 'completed' | 'rejected' | 'accepted';
export type ProjectPhase = 'initial' | 'planning' | 'execution' | 'closure';

export interface NewPassword {
  currentPassword?: string;
  newPassword?: string;
  confirmedNewPassword?: string;
}
export enum TaskStatus {
  toDo = 'To Do',
  inProgress = 'In Progress',
  completed = 'Completed',
  rejected = 'Rejected',
  accepted = 'Accepted'
}