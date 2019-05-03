export interface IAction {
  type: string;
  payload?: any;
  callback?: (...args: any[]) => void;
}