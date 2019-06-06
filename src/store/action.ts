import {IAction} from "../utils/interfaces";
import {fromJS} from "immutable";
import {getFirestore} from "redux-firestore";
import { projectBase } from "../utils/interfaces";

export enum ActionTypes {
	FIRST_ACTION = 'FIRST_ACTION',
	FIRST_ACTION_SUCCEEDED = 'FIRST_ACTION_SUCCEEDED',
	MY_API_CALL = 'MY_API_CALL',
	CREATE_PROJECT = 'CREATE_PROJECT',
	GET_PROJECTS = 'GET_PROJECTS',
	DELTE_PROJECT = 'DELTE_PROJECT',
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
	// 	trackStatus: 'tracked'
	firestore.collection('users').add({
		firstName: 'Peter',
		lastName: 'Paul',
		email: 'Peter.paul@mail.com',
		mobilePhone: '123 444 123',
		userHash: 'PP',
		username: 'PP22',
		tasks: [1,4]
	}).then( resp => {
		console.log(resp);
	}).catch( err => {
		console.log(err);
	})

}

export const DeleteProjectAction = (id: any) =>  (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	firestore.collection('projects').doc(id).delete()

}
export const CreateProjectAction = (project) => (dispatch, getState, {getFirebase, getFirestore}) => {

	const firestore = getFirestore();
	firestore.collection('projects').add({
		...projectBase,
		...project
	}).then( (resp) => {
		console.log(resp);
	}).catch( err => {
		console.log(err);
	})
}

export const GetProjectsAction = () => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	firestore.collection('projects').get()
		.then( resp => {
			const data = resp.docs.map( doc => doc.data())
			const immutableData = fromJS(data);
			dispatch({
				type: ActionTypes.GET_PROJECTS,
				payload: immutableData
			})
		})
		.catch( err => console.log(err))
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

