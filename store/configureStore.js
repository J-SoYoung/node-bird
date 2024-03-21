// configureStore.js
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "../reducers/index";
import rootSaga from "../sagas";

const configureStore = (context) => {
  console.log(context);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  // devtools연동(개발로그), 보안상의 이유로 개발/제품 버전 따로 생성
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});
export default wrapper;
