const dummyUser = {
  id: 1,
  nickname: "thdud",
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  isLoggingIn: false, // 로그인 시도중 (로딩창을 위함)
  isLoggingOut: false, // 로그아웃 시도중
  me: null,
  signUpData: {},
  loginData: {},
};

// async Action

// Action
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const signUpAction = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

export const signUpSuccess = () => {
  return {
    type: SIGN_UP_SUCCESS,
  };
};

export const loginRequestsAction = (data) => {
  console.log("redux-login-request action");
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestsAction = () => {
  return { type: LOG_OUT_REQUEST };
};

export const signUp = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

// reducer : (이전 상태, 액션) => 다음 상태
export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      console.log("login-reeucer", action);
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case LOG_IN_SUCCESS: {
      console.log("login-suc-reducer");
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "thdud" },
      };
    }
    case LOG_IN_FAILURE: {
      console.log("login-fail-reducer");

      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        me: null,
        loginData: null,
      };
    }

    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: true,
        me: { ...state.me },
      };
    }

    case SIGN_UP: {
      return {
        ...state,
        signUpData: action.data,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
