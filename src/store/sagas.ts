import { takeEvery, put, call, all } from 'redux-saga/effects';
import {ActionTypes, FirstActionSucceeded, MyApiCallAction} from "./action";
import { Map, List, fromJS } from 'immutable'
import axios from 'axios';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase, { userConfig } from '../base';

export function *sagaWatcher() {
  yield takeEvery(ActionTypes.FIRST_ACTION, setSomething)
}

async function peleu(obj) {
  const base = getFirestore(firebase, userConfig);

  return await base.collection("cities").doc("LA").set(obj);
}

function *myApiCall(action: any) {
  const obj = action.payload;

}
export function *setSomething(action: any) {
  // let obj = {
  //   'projectTitle': 'The title of the project',
  //   'projectNumber': 6969,
  //   'secretMessages': ['Message 1' , 'Message 2']
  // }
  //
  // let newMap = fromJS(obj);

  const obj = {
    name: "Los Vegas",
    state: "CA",
    country: "USA"
  }

  let newMap = fromJS(obj);

  //
  // const database = base.database();
  // const ref = database.ref('tasks');
  //
  // ref.push(obj);


  const data = yield call(peleu, {obj});
  if (data) {
    console.log('plm ce fac acum');
    console.log('data: ', data);
    yield put(FirstActionSucceeded(newMap));
  } else {
    console.error('ma fut: ')
  }
}

export default function* rootSaga() {
  yield call(sagaWatcher);
}
