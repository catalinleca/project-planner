export enum ActionTypes {
	FIRST_ACTION = 'FIRST_ACTION',
	FIRST_ACTION_SUCCEEDED = 'FIRST_ACTION_SUCCEEDED'
}

export const FirstAction = (payload: any) => ({
	type: ActionTypes.FIRST_ACTION,
	payload: payload
})
// export class FirstAction {
// 	public readonly type = ActionTypes.FIRST_ACTION;
//
// 	constructor(
// 		public payload?: any
// 	) {}
// }

export class FirstActionSucceeded {
	public readonly type = ActionTypes.FIRST_ACTION_SUCCEEDED;
}