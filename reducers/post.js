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
  postAdded: false,
};

const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
};
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
// async Action

// Action

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST": {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    }
    default:
      return state;
  }
};

export default reducer;
