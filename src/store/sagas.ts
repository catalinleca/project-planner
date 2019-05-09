import { takeEvery, put, call } from 'redux-saga/effects';
import {ActionTypes, FirstActionSucceeded} from "./action";
import axios from 'axios';

export function *createLessonAsync(action: any) {
  console.log('dsadsa');
  try{
    console.log('mothfucka');
    const response = yield call(axios.post, 'https://jsonplaceholder.typicode.com/posts', {payload: action.payload})
    console.log(response);
  } catch (e) {
    console.log('REQUEST FAILED');
    console.log(e);
  }
    yield put(new FirstActionSucceeded());
}

export function *watchCreateLesson() {
  console.log('redux-saga is running');
  yield takeEvery(ActionTypes.FIRST_ACTION, createLessonAsync)
}
export default function *rootSaga() {
  yield [
    watchCreateLesson(),
  ]
}