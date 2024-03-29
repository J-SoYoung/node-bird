import { produce } from "immer";

const dummyUser = (data) => {
  return {
    ...data,
    id: 1,
    nickname: "thdud",
    Posts: [],
    Followings: [
      { nickname: "SoYoung", id: 1 },
      { nickname: "ToYoung", id: 2 },
    ],
    Followers: [
      { nickname: "SoSoung" },
      { nickname: "YoYoung" },
      { nickname: "TTSSoung" },
    ],
  };
};

export const initialState = {
  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,

  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,

  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,

  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: null,

  unFollowLoading: false, // 언팔로우 시도중
  unFollowDone: false,
  unFollowError: null,

  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,

  me: null,
  signUpData: {},
  loginData: {},
};

// async Action

// Action
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export const signRequestsUpAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export const loginRequestsAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestsAction = () => {
  return { type: LOG_OUT_REQUEST };
};

// reducer : (이전 상태를, 액션을 통해) => 다음 상태로 만들어내는 함수
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.loginLoading = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;
      }

      case LOG_OUT_REQUEST: {
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.logOutLoading = false;
        draft.loginDone = false;
        draft.logOutError = action.error;
        break;
      }

      case SIGN_UP_REQUEST: {
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.signUpData = action.data;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      }

      case CHANGE_NICKNAME_REQUEST: {
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      }
      case CHANGE_NICKNAME_SUCCESS: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        draft.changeNicknameData = action.data;
        break;
      }
      case CHANGE_NICKNAME_FAILURE: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;
      }

      case ADD_POST_TO_ME: {
        draft.me.Posts.unshift({ id: action.data });
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: [{ id: action.data }, ...state.me.Posts],
        //   },
        // };
      }

      case REMOVE_POST_OF_ME: {
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
        //   },
        // };
      }

      case FOLLOW_REQUEST: {
        console.log("follow-reducer요청");
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      }
      case FOLLOW_SUCCESS: {
        console.log("follow-reducer 성공", action.data);
        draft.followLoading = false;
        draft.me.Followings.push(action.data);
        draft.followDone = true;
        break;
      }
      case FOLLOW_FAILURE: {
        draft.followLoading = false;
        draft.followDone = false;
        draft.followError = action.error;
        break;
      }

      case UNFOLLOW_REQUEST: {
        console.log("unfollow-reducer 요청");
        draft.unFollowLoading = true;
        draft.unFollowDone = false;
        draft.unFollowError = null;
        break;
      }
      case UNFOLLOW_SUCCESS: {
        console.log("unfollow-reducer 성공", action.data);
        draft.unFollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter(
          (f) => f.id !== action.data.id
        );
        draft.unFollowDone = true;
        break;
      }
      case UNFOLLOW_FAILURE: {
        draft.unFollowLoading = false;
        draft.unFollowDone = false;
        draft.unFollowError = action.error;
        break;
      }

      default: {
        break;
      }
    }
  });
};
export default reducer;