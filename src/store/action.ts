import {IAction} from "../interfaces";

export enum ActionTypes {
	FIRST_ACTION = 'FIRST_ACTION',
	FIRST_ACTION_SUCCEEDED = 'FIRST_ACTION_SUCCEEDED',
	MY_API_CALL = 'MY_API_CALL',
	CREATE_PROJECT = 'CREATE_PROJECT',
}
//

export const createProject = (project) => (dispatch, getState, {getFirebase, getFirestore}) => {

	const firestore = getFirestore();
	firestore.collection('projects').add({
		...project,
		firstName: 'da',
		nameId: 123
	}).then( () => {
		dispatch({ type: ActionTypes.CREATE_PROJECT })
	}).catch( err => {
		console.log('trolol');
	})
}

export const FirstAction = () => {

	return ({	type: ActionTypes.FIRST_ACTION })
}

export const FirstActionSucceeded = (payload: any) => ({
	type: ActionTypes.FIRST_ACTION_SUCCEEDED,
	payload
})

export const MyApiCallAction = (payload: any) => ({
	type: ActionTypes.MY_API_CALL,
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
