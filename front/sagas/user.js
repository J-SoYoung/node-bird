import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "../reducers/user";

function unFollowAPI(data) {
  return axios.post("/api/unFollow", data);
}
function* unFollow(action) {
  console.log("unfollow-saga요청");
  try {
    console.log("unfollow-saga성공");
    yield delay(1000);
    // const result = yield call(unFollowAPI);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function followAPI(data) {
  return axios.post("/api/follow", data);
}
function* follow(action) {
  console.log("follow-saga요청");
  try {
    console.log("follow-sagat성공");
    yield delay(1000);
    // const result = yield call(followAPI);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post("/user", data);
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.log("회원가입errorr", error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

function logInAPI(data) {
  console.log("saga-login", data);
  return axios.post("/user/login", data);
}
function* logIn(action) {
  console.log(action.data);
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/user/logout");
}
function* logOut(action) {
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}
function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchSignup),
    fork(watchLogIn),
    fork(watchLogOut),
  ]);
}
