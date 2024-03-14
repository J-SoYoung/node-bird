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
          src: "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%ED%92%80%EB%B0%AD%EC%97%90%EC%9E%88%EB%8A%94-%EA%BD%83-%EB%AC%B4%EB%A6%AC-PzdXE4-0Fls",
        },
        {
          src: "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/0MCnvnAh_MA",
        },
        {
          src: "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%EB%82%AE-%EB%8F%99%EC%95%88%EC%9D%98-%EB%B0%94%EB%8B%A4-IpK3kFBNJzQ",
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
          src: "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%ED%92%80%EB%B0%AD%EC%97%90%EC%9E%88%EB%8A%94-%EA%BD%83-%EB%AC%B4%EB%A6%AC-PzdXE4-0Fls",
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
