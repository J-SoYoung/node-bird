const dummyUser = {
  id: 1,
  nickname: "thdud",
  Posts: [],
  Followings: [],
  Followers: [],
};

export const initialState = {
  isLoggedIn: false,
  me: dummyUser,
  signUpData: {},
  loginData: {},
};


// async Action

// Action
export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data: data,
  };
};
export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

// reducer : (이전 상태, 액션) => 다음 상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: dummyUser,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
