import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../reducers/post";

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.id}/comment`);
}
function* addComment(action) {
  try {
    yield delay(1000);
    // const result = yield call(addCommentAPI);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function addPostAPI() {
  return axios.post("/api/post");
}
function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
