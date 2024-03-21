const dummyPost = {
  id: 1,
  contents: "더비더비미더",
  User: {
    id: 1,
    nickname: "thdud",
  },
  Image: [],
  Comments: [],
};

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "thdud",
      },
      contents: "첫번재 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://raw.githubusercontent.com/J-SoYoung/node-bird/c19975b02f88bc1cbdd65ab78635ccb1935a51aa/assets/images/cat2.jpg",
        },
        {
          src: "https://raw.githubusercontent.com/J-SoYoung/node-bird/main/assets/images/bg3.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
      ],
      Comments: [
        {
          User: { nickname: "thdud2" },
          contents: "하이큐",
        },
        {
          User: { nickname: "thdud11" },
          contents: "오늘파묘",
        },
      ],
    },
    {
      id: 1,
      User: {
        id: 1,
        nickname: "thdud",
      },
      contents: "더미데이터입니다",
      Images: [
        {
          src: "https://raw.githubusercontent.com/J-SoYoung/node-bird/main/assets/images/bg3.jpg",
        },
      ],
      Comments: [
        {
          User: { nickname: "thdud333" },
          contents: "하이큐323",
        },
        {
          User: { nickname: "thdud444" },
          contents: "오늘파묘33",
        },
        {
          User: { nickname: "thdud444" },
          contents: "오늘파묘33",
        },
      ],
    },
  ],
  imagePaths: [],

  addPostLoaing: false,
  addPostDone: false,
  addPostError: null,

  addCommentLoaing: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPostRequestAction = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};
export const addCommentRequestAction = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        addPostLoaing: true,
        addPostDone: false,
        addPostError: null,
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
        addPostLoaing: false,
        addPostDone: true,
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        addPostLoaing: false,
        addPostDone: false,
        addPostError: action.error,
      };
    }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        addCommentLoaing: true,
        addCommentDone: false,
        addCommentError: null,
      };
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
        addCommentLoaing: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        addCommentLoaing: false,
        addCommentDone: false,
        addCommentError: action.error,
      };
    }
    default:
      return state;
  }
};

export default reducer;
