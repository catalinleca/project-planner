import {IAction} from "../utils/interfaces";
import {fromJS} from "immutable";
import {getFirestore} from "redux-firestore";
import { projectBase } from "../utils/interfaces";
import {ITask, taskBase} from "../utils/interfaces/ITask/ITask";
import {push} from "connected-react-router";
import {formatStringDate, PROJECT_DETAILS} from "../utils/constants";
import {
	makeSelectDataById,
	makeSelectIsLoggedIn, makeSelectLoggedInUserId, makeSelectProjectTitle,
	makeSelectSelectedProject,
	makeSelectSelectedTask,
	makeSelectSelectedUser, makeSelectUserTrackedProjects
} from "./selectors";
import firebase from '../base'
import {IUser, userBase} from "../utils/interfaces/IUser/IUser";
import {NewCredentials} from "../utils/types/types";
import { SubmissionError } from 'redux-form'
import {Simulate} from "react-dom/test-utils";

export enum ActionTypes {
	FIRST_ACTION = 'FIRST_ACTION',
	FIRST_ACTION_SUCCEEDED = 'FIRST_ACTION_SUCCEEDED',
	MY_API_CALL = 'MY_API_CALL',
	CREATE_PROJECT = 'CREATE_PROJECT',
	GET_PROJECTS = 'GET_PROJECTS',
	DELTE_PROJECT = 'DELTE_PROJECT',
	SELECT_PROJECT = 'SELECT_PROJECT',
	SELECT_TASK = 'SELECT_TASK',
	SELECT_USER = 'SELECT_USER',
	TOGGLE_TASK_DRAWER = 'TOGGLE_TASK_DRAWER',
	CLOSE_TASK_DRAWER = 'CLOSE_TASK_DRAWER',
	LOGIN_ERROR = 'LOGIN_ERROR',
	LOGIN_SUCCESS = 'LOGIN_SUCCESS'
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

	// console.log('taskId: ', taskId)
	// console.log('status: ', status)

	const taskRef = firestore.collection('tasks').doc(taskId);

	const setWithMerge = taskRef.set({
		taskStatus: status
	}, {merge: true})
}

export const doTheThingAction = () => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	// console.log('ba du te dreq');

	// firestore.collection('projects').add({
	// 	name: 'First Real Test Name Project',
	// 	createdBy: 453,
	// 	createdDate: new Date(),
	// 	: [
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

const cleanParams = (obj) => {
	for (let propName in obj) {
		if (obj[propName] === null || obj[propName] === undefined) {
			delete obj[propName];
		}
	}
}

const getPicturesValues = (picturesAsFiles, path?: string) => {
	const uploadImageAsPromise = (picture, path) => {
		return new Promise( (resolve, reject) => {
			const storageRef = firebase.storage().ref().child(`${path && path}${picture.name}`)
			storageRef.put(picture).then( snap => {
				storageRef.getDownloadURL().then( url => resolve(url))
			})
		})
	}

	return Promise.all( picturesAsFiles.map( picture => uploadImageAsPromise(picture, path)))
}

export const DeleteUserAction = () => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	const selectedUserId = (makeSelectSelectedUser())(getState().ptReducer)

	firestore.collection('users').doc(selectedUserId).delete()

}

export const ChangeUserCredentialsAction = ({currentPassword, newPassword, newMail}) => () => {

	const checkCurrentPassword = (password) => {
		const currentUser = firebase.auth().currentUser
		return new Promise( (resolve, reject) => {
			currentUser &&
			currentUser.email &&
			currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(currentUser.email, password))
				.then( response => resolve(response.operationType === 'reauthenticate'))
				.catch( err => resolve(false))

		})
	}

	const changeUserPassword = (newPassword) => {
		const user = firebase.auth().currentUser;
		console.log('newPassword: ', newPassword)
		user && user.updatePassword(newPassword).then( () => {
			console.log('password updated')
		}).catch(err => console.log(err))
	}

	const changeUserMail = (newMail, newPassword?: string) => {
		const user = firebase.auth().currentUser;
		console.log('newMail: ', newMail)
		user && user.updateEmail(newMail).then( () => {
			console.log('mail updated')
			if (newPassword) {
				changeUserPassword(newPassword)
			}
		}).catch(err => console.log(err))
	}


	return checkCurrentPassword(currentPassword)
		.then((response) => {
			console.log('response: ', response)
			if (!response) {
				console.log('aasd');
				throw new SubmissionError({ currentPassword: 'Wrong Password', _error: 'Wrong Password' })
			} else {
				if (newPassword && !newMail) {
					changeUserPassword(newPassword)
				} else
					changeUserMail(newMail, newPassword)
			}
		});
}

export const EditUserAction = (values) => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	const currentState = getState();
	const selectedUserId = (makeSelectSelectedUser())(currentState)

	const userRef = firestore.collection('users').doc(selectedUserId);

	console.log('in action: ', values);

	cleanParams(values)
	console.log('in action2: ', values);

	const setWithMerge = userRef.set({
		...values,
	}, {merge: true})
}



export const ChangeTaskProjectAction = (projectName, projectId) => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	const currentState = getState();

	const selectedTaskId = (makeSelectSelectedTask())(currentState)

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

export const TrackUntrackProjectAction = (projectId, track) => (dispatch, getState, {getFirebase, getFirestore}) => {
	console.log(projectId, track);
	const firestore = getFirestore();

	const projectRef = firestore.collection('projects').doc(projectId);

	const setWithMerge = projectRef.set({
		tracked: track,
	}, {merge: true})

	const currentState = getState();
	const isLoggedIn = makeSelectIsLoggedIn()(currentState);
	const loggedInUserId = isLoggedIn ? makeSelectLoggedInUserId()(currentState) : null

	const userTrackedProjects: Array<string> = makeSelectUserTrackedProjects()(currentState)

	/**
	 * nu merge cu splice in loc de filter
	 */
	const updatedTrackedProjects = userTrackedProjects.indexOf(projectId) !== -1
		?	userTrackedProjects.filter( item => item !== projectId)
		:	userTrackedProjects.concat(projectId)

	const userRef = firestore.collection('users').doc(loggedInUserId)

	const userWithMerge = userRef.set({
		trackedProjects: updatedTrackedProjects
	}, {merge: true})
}

export const EditTaskAction = (values) => (dispatch, getState, {getFirebase, getFirestore}) => {
	/**
	 * Refactor this shit
	 * Bug: when adding and deleting pictures
	 * Gata BUGU
	 */
	const firestore = getFirestore();

	const picturesAsFile = [...values.picturesAsFile]

	delete values.picturesAsFile;

	console.log('in EditTaskAction, values: ', values);
	console.log('in EditTaskAction, picturesAsFile: ', picturesAsFile);
	const currentState = getState()
	const selectedTaskId = (makeSelectSelectedTask())(currentState)
	const currentTask: ITask = (makeSelectDataById('tasks', selectedTaskId))(currentState)

	console.log('current task: ', currentTask)
	const taskRef = firestore.collection('tasks').doc(selectedTaskId);

	const setWithMerge = taskRef.set({
		...values
	}, {merge: true})

	const editTaskPictures = async () => {
		const stringPictures = await getPicturesValues(picturesAsFile, selectedTaskId)

		const setPicturesWithMerge = taskRef.set({
			pictures: [
				...values.pictures,
				...stringPictures]
		}, {merge: true})
	}

	picturesAsFile.length && editTaskPictures()
}

export const AddTaskToProjectAction = (task, projectId) => (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	const currentState = getState()

	console.log('values in Add Task To Project: ', task )
	const isLoggedIn = makeSelectIsLoggedIn()(currentState);
	const createdBy = isLoggedIn ? makeSelectLoggedInUserId()(currentState) : null

	const createdDate = new Date().toString()

	// Promise.all( task.pictures.map( picture => uploadImageAsPromise(picture)))
	// 	.then( values => console.log('values: ', values))

	const addTask = async () => {
		const values = task.pictures ? await getPicturesValues(task.pictures, `${task.title}`) : []
		console.log('values: ', values);

		const projectName = (makeSelectDataById('projects', projectId)(currentState)).name

		console.log(createdDate);

		firestore.collection('tasks').add({
			...taskBase,
			...task,
			createdDate,
			projectId,
			projectName,
			createdBy,
			pictures: [...values],
		}).then( (resp) => {
			console.log(resp);
		}).catch( err => {
			console.log(err);
		})
	}

	addTask()

}


export const DeleteProjectAction = (id: any) =>  (dispatch, getState, {getFirebase, getFirestore}) => {
	const firestore = getFirestore();

	firestore.collection('projects').doc(id).delete()

}

export const CreateProjectAction = (project) => (dispatch, getState, {getFirestore}) => {

	const currentState = getState();
	const isLoggedIn = makeSelectIsLoggedIn()(currentState);
	const createdBy = isLoggedIn ? makeSelectLoggedInUserId()(currentState) : null
	const createdDate = new Date().toString()

	const firestore = getFirestore();
	firestore.collection('projects').add({
		...projectBase,
		...project,
		createdBy,
		createdDate
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

const var1 = '3';
const var2 = 3

export const SignInAction = (credentials) =>  (dispatch) => {

	console.log("in signInAction credentials: ", credentials);
	firebase.auth().signInWithEmailAndPassword(credentials.username, credentials.password)
		.then( function() {
			dispatch({ type: 'LOGIN_SUCCESS'})
		}).catch( function(err){
			console.log(err);
			dispatch({ type: 'LOGIN_ERROR', err})
	})
}

export const SignOutAction = () =>  (dispatch, getState, {getFirebase, getFirestore}) => {

	firebase.auth().signOut()
		.then( () => {
			console.log('SIGNED OUT SUCCESS')
		})
		.catch(err => console.log('SIGNED OUT FAILED: ', err))

}

export const SignUpAction = (newUser: Partial<IUser>) => (dispatch, getState, {getFirebase, getFirestore}) => {
	console.log("in singUpAction: newUser: ", newUser);
	const firestore = getFirestore();

	const currentState = getState();
	const isLoggedIn = makeSelectIsLoggedIn()(currentState);
	const signedUpBy = isLoggedIn ? makeSelectLoggedInUserId()(currentState) : null

	firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
		.then((resp: any) => {
			// when we call add firebase automatically generates another id but we dont want that,
			// we want to use the one that was created in the first place by createUser method so instead
			// of ' .add ' we use ' .doc ' so we reference  a specific id
			return firestore.collection('users').doc(resp.user.uid).set({
				...userBase,
				...newUser,
				signedUpBy
			}).then( () => {
				console.log('SIGN UP SUCCESS');
			}).catch( err => {
				console.log('SIGN UP ERROR: ', err);
			})
		})
}

export const UploadUserAvatarAction = (file) => (dispatch, getState, {getFirebase, getFirestore}) => {

	const firestore = getFirestore()
	const currentState = getState();
	const loggedInUserId = makeSelectLoggedInUserId()(currentState);

	const userRef = firestore.collection('users').doc(loggedInUserId);

	console.log('in action: ', file);

	const storageRef = firebase.storage().ref()
	const mainImage = storageRef.child(loggedInUserId)
	mainImage.put(file).then( snap => {
		console.log(snap);
		mainImage.getDownloadURL().then( url => {
			const setWithMerge = userRef.set({
				avatar: url,
			}, {merge: true})
		}).catch(err => console.log(err))
	}).catch(err => console.log(err));

	// storageRef.put(file).then(snap => console.log('Uploaded, ', snap))
}

export const UploadTaskPicturesAction = (files) => (dispatch, getState, {getFirebase, getFirestore}) => {

	const firestore = getFirestore()
	const currentState = getState();

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

export const SelectUserAction = (payload: any) => ({
	type: ActionTypes.SELECT_USER,
	payload
})


export const FirstAction = () => {

	return ({	type: ActionTypes.FIRST_ACTION })
}
