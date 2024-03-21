import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";

function logInAPI(data) {
  return axios.post("/api/login", data);
}
function* logIn(action) {
  console.log("saga-login/action값:", action);
  try {
    yield delay(1000);
    // const result = yield call(logInAPI, action.data);
    console.log("saga-login-success / action호출");
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (error) {
    console.log("saga-login-fail");
    yield put({
      type: "LOG_IN_FAILURE",
      data: error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}
function* logOut(action) {
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
