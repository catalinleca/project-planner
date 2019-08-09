// export type TaskStatus = 'toDo' | 'inProgress' | 'completed' | 'rejected' | 'accepted';
export type ProjectPhase = 'initial' | 'planning' | 'execution' | 'closure';

export interface NewCredentials {
  currentPassword?: string;
  newPassword?: string;
  confirmedNewPassword?: string
  newMail?: string;
}
export enum TaskStatus {
  toDo = 'To Do',
  inProgress = 'In Progress',
  completed = 'Completed',
  rejected = 'Rejected',
  accepted = 'Accepted'
}

const adaugaElementActiune = (payload) => {
  return {
    type: 'ADAUGA_ELEMENT_IN_LISTA',
    payload: payload
  }
}

const reducer = ( state, action ) => {
  switch (action.type) {
    case ('ADAUGA_ELEMENT_IN_LISTA'):
      return {
        ...state,
        elementNou: action.payload
      }
    default:
      return state
  }
}