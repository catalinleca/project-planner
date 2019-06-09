import {IAction} from "../utils/interfaces";
import {fromJS} from "immutable";
import {getFirestore} from "redux-firestore";
import { projectBase } from "../utils/interfaces";
import {taskBase} from "../utils/interfaces/ITask/ITask";
import {push} from "connected-react-router";
import {PROJECT_DETAILS} from "../utils/constants";
import {makeSelectSelectedProject, makeSelectSelectedTask} from "./selectors";

export enum ActionTypes {
	FIRST_ACTION = 'FIRST_ACTION',
	FIRST_ACTION_SUCCEEDED = 'FIRST_ACTION_SUCCEEDED',
	MY_API_CALL = 'MY_API_CALL',
	CREATE_PROJECT = 'CREATE_PROJECT',
	GET_PROJECTS = 'GET_PROJECTS',
	DELTE_PROJECT = 'DELTE_PROJECT',
	SELECT_PROJECT = 'SELECT_PROJECT',
	SELECT_TASK = 'SELECT_TASK',
	TOGGLE_TASK_DRAWER = 'TOGGLE_TASK_DRAWER',
	CLOSE_TASK_DRAWER = 'CLOSE_TASK_DRAWER'
}
//

export const toggleTaskDrawerAction = () => ({
	type: ActionTypes.TOGGLE_TASK_DRAWER,
})

export const closeTaskDrawerAction = () => ({
	type: ActionTypes.CLOSE_TASK_DRAWER,
})

export const ChangeTaskStatusAction = (taskId, status) => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	console.log('taskId: ', taskId)
	console.log('status: ', status)

	const taskRef = firestore.collection('tasks').doc(taskId);

	const setWithMerge = taskRef.set({
		taskStatus: status
	}, {merge: true})
}

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

/**
 * Refactoring. Vezi ca folosesti 100 functii ca sa editezi project sau task cand poti
 * sa folosesti una si sa trimiti campurile ca parametur ba pula
 *
 */


export const EditTaskAction = (values) => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	const selectedTaskId = (makeSelectSelectedTask())(getState().ptReducer)

	console.log('selectedTaskId: ', selectedTaskId)
	console.log('values: ', values)

	const taskRef = firestore.collection('tasks').doc(selectedTaskId);

	const setWithMerge = taskRef.set({
		...values
	}, {merge: true})

}
export const ChangeTaskProjectAction = (projectName, projectId) => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	const currentState = getState();
	console.log('currentState: ', currentState)
	const currentProjectState = currentState.ptReducer;

	const selectedTaskId = (makeSelectSelectedTask())(currentProjectState)
	console.log('selectedTask: ', selectedTaskId);

	const taskRef = firestore.collection('tasks').doc(selectedTaskId);

	const setWithMerge = taskRef.set({
		projectName,
		projectId
	}, {merge: true})



}

export const ChangeProjectPhaseAction = (label, projectId) => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	const projectRef = firestore.collection('projects').doc(projectId);

	const setWithMerge = projectRef.set({
		projectPhase: label
	}, {merge: true})
}
export const AddTaskToProjectAction = (task, projectId) => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	firestore.collection('tasks').add({
		...taskBase,
		...task,
	}).then( (resp) => {
		console.log(resp);
	}).catch( err => {
		console.log(err);
	})

	// let projectsRef = firestore.collection('projects').doc(projectId)
	//
	// projectsRef.update({
	// 	tasks: firestore.FieldValue.arrayUnion({...task})
	// })

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
		dispatch(SelectProjectAction(resp.id))
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


export const FirstActionSucceeded = (payload: any) => ({
	type: ActionTypes.FIRST_ACTION_SUCCEEDED,
	payload
})

export const MyApiCallAction = (payload: any) => ({
	type: ActionTypes.MY_API_CALL,
})

export const SelectProjectAction = (payload: any) => ({
	type: ActionTypes.SELECT_PROJECT,
	payload
})

export const SelectTaskAction = (payload: any) => ({
	type: ActionTypes.SELECT_TASK,
	payload
})


export const FirstAction = () => {

	return ({	type: ActionTypes.FIRST_ACTION })
}
