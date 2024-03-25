import axios from "axios";
import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import {
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortid from "shortid";

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
  const id = shortid.generate();

  try {
    yield delay(1000);
    // const result = yield call(addPostAPI);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function removePostAPI(id) {
  return axios.delete("/api/post/id");
}
function* removePost(action) {
  try {
    yield delay(1000);
    // const result = yield call(removePostAPI);

    // post-data
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    // user-data
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function loadPostsAPI(data) {
  return axios.get("/api/posts", data);
}
function* loadPosts(action) {
  try {
    yield delay(1000);
    // const result = yield call(loadPostsAPI);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(3),
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPosts),
  ]);
}
