import {IAction} from "../interfaces";

export enum ActionTypes {
	FIRST_ACTION = 'FIRST_ACTION',
	FIRST_ACTION_SUCCEEDED = 'FIRST_ACTION_SUCCEEDED'
}
//
export const FirstAction = () => {

	return ({	type: ActionTypes.FIRST_ACTION })
}

export const FirstActionSucceeded = (payload: any) => ({
	type: ActionTypes.FIRST_ACTION_SUCCEEDED,
	payload
})
// export class FirstAction implements IAction {
// 	public readonly type = ActionTypes.FIRST_ACTION;
//
// 	constructor(
// 		public payload?: any
// 	) {}
// }
//
// export class FirstActionSucceeded implements IAction {
// 	public readonly type = ActionTypes.FIRST_ACTION_SUCCEEDED;
// }
//
// type Actions = FirstAction | FirstActionSucceeded