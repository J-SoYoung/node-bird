import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";

function addPostAPI() {
  return axios.post("/api/post");
}
function* addPost() {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUESTS", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
