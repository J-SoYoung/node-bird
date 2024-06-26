import { produce } from "immer";

export const initialState = {
  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,

  loadUserLoading: false, // 특정 유저찾기 시도중
  loadUserDone: false,
  loadUserError: null,

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

  loadFollowingsLoading: false, // 팔로잉 리스트 로드
  loadFollowingsDone: false,
  loadFollowingsError: null,

  loadFollowersLoading: false, // 팔로워 리스트 로드
  loadFollowersDone: false,
  loadFollowersError: null,

  removeFollowerLoading: false, // 팔로워 제거 시도중
  removeFollowerDone: false,
  removeFollowerError: null,

  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,

  me: null,
  userInfo: null,
  followersInfo: null,
  followingsInfo: null,
};

// async Action

// Action
export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

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

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

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
      case LOAD_MY_INFO_REQUEST: {
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      }
      case LOAD_MY_INFO_SUCCESS: {
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      }
      case LOAD_MY_INFO_FAILURE: {
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = action.error;
        break;
      }

      case LOAD_USER_REQUEST: {
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.loadUserLoading = false;
        draft.loadUserDone = true;
        draft.userInfo = action.data;
        break;
      }
      case LOAD_USER_FAILURE: {
        draft.loadUserLoading = false;
        draft.loadUserDone = false;
        draft.loadUserError = action.error;
        break;
      }

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
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      }
      case CHANGE_NICKNAME_FAILURE: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;
      }

      case FOLLOW_REQUEST: {
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      }
      case FOLLOW_SUCCESS: {
        draft.followLoading = false;
        draft.me.Followings.push({ id: action.data.UserId });
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
        draft.unFollowLoading = true;
        draft.unFollowDone = false;
        draft.unFollowError = null;
        break;
      }
      case UNFOLLOW_SUCCESS: {
        draft.me.Followings = draft.me.Followings.filter(
          (f) => f.id !== action.data.UserId
        );
        draft.unFollowLoading = false;
        draft.unFollowDone = true;
        break;
      }
      case UNFOLLOW_FAILURE: {
        draft.unFollowLoading = false;
        draft.unFollowDone = false;
        draft.unFollowError = action.error;
        break;
      }

      case REMOVE_FOLLOWER_REQUEST: {
        draft.removeFollowerLoading = true;
        draft.removeFollowerDone = false;
        draft.removeFollowerError = null;
        break;
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        draft.me.Followers = draft.me.Followers.filter(
          (f) => f.id !== action.data.UserId
        );
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        break;
      }
      case REMOVE_FOLLOWER_FAILURE: {
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = false;
        draft.removeFollowerError = action.error;
        break;
      }

      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        draft.followingsInfo = action.data;
        draft.loadFollowingsDone = true;
        break;
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;

      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.followersInfo = action.data;
        draft.loadFollowersDone = true;
        break;
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;

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

      default: {
        break;
      }
    }
  });
};
export default reducer;
