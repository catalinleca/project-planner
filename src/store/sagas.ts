import { takeEvery, put, call, all } from 'redux-saga/effects';
import {ActionTypes, FirstActionSucceeded} from "./action";
import { Map, List, fromJS } from 'immutable'
import axios from 'axios';

export function *sagaWatcher() {
  console.log('redux-saga is running');
  yield takeEvery(ActionTypes.FIRST_ACTION, setSomething)
}

export function *setSomething(action: any) {
  let obj = {
    'projectTitle': 'The title of the project',
    'projectNumber': 6969,
    'secretMessages': ['Message 1' , 'Message 2']
  }

  let newMap = fromJS(obj);

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

export default function* rootSaga() {
  yield call(sagaWatcher);
}