import { takeEvery, put, call, all } from 'redux-saga/effects';
import {ActionTypes, FirstActionSucceeded} from "./action";
import { Map, List, fromJS } from 'immutable'
import axios from 'axios';

export function *sagaWatcher(getFirebase) {
  yield takeEvery(ActionTypes.FIRST_ACTION, setSomething, getFirebase)
}

export function *setSomething(action: any, getFirebase) {
  const base = getFirebase();
  // let obj = {
  //   'projectTitle': 'The title of the project',
  //   'projectNumber': 6969,
  //   'secretMessages': ['Message 1' , 'Message 2']
  // }
  //
  // let newMap = fromJS(obj);

  const obj = {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  }

  let newMap = fromJS(obj);


  const database = base.database();
  const ref = database.ref('tasks');

  ref.push(obj);

  // console.log('dsadsa');
  // try{
  //   console.log('mothfucka');
  //   const response = yield call(axios.post, 'https://jsonplaceholder.typicode.com/posts', {payload: action.payload});
  //   console.log(response);
  // } catch (e) {
  //   console.log('REQUEST FAILED');
  //   console.log(e);
  // }
  yield put(FirstActionSucceeded(newMap));
}

export default function* rootSaga(getFirestore) {
  yield call(sagaWatcher, getFirestore);
}