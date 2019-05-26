import {IAction} from "../utils/interfaces";

export enum ActionTypes {
	FIRST_ACTION = 'FIRST_ACTION',
	FIRST_ACTION_SUCCEEDED = 'FIRST_ACTION_SUCCEEDED',
	MY_API_CALL = 'MY_API_CALL',
	CREATE_PROJECT = 'CREATE_PROJECT',
}
//


export const doTheThingAction = () => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	console.log('ba du te dreq');

	// firestore.collection('projects').add({
	// 	name: 'First Real Test Name Project',
	// 	createdBy: 453,
	// 	createdDate: new Date(),
	// 	leadSource: [
	// 		'Jimmy lead 1',
	// 		'Jimmy lead 2',
	// 	],
	// 	modifiedBy: null,
	// 	modifiedDate: null,
	// 	projectPhase: 'beginning',
	// 	status: 'In Development',
	// 	keyContacts: [ 342, 122, 12 ],
	// 	dueData: '17-09-2019',
	// 	sprint: 1,
	firestore.collection('users').add({
		firstName: 'John',
		lastName: 'Jhin',
		email: 'john.jhin@mail.com',
		mobilePhone: '333 444 2211',
		userHash: 'JJ',
		username: 'JJ123',
		tasks: [1,2,3,4]
	}).then( resp => {
		console.log(resp);
	}).catch( err => {
		console.log(err);
	})

}
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
