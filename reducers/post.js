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
          src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fko.wikipedia.org%2Fwiki%2F%25ED%2595%2598%25EC%259D%25B4%25ED%2581%2590!!&psig=AOvVaw0qtYtR-dSp6igIfYgvLl7W&ust=1710371111347000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMCL74br74QDFQAAAAAdAAAAABAE",
        },
        {
          src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fserieson.naver.com%2Fv2%2Fbroadcasting%2F401958&psig=AOvVaw0qtYtR-dSp6igIfYgvLl7W&ust=1710371111347000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMCL74br74QDFQAAAAAdAAAAABAJ",
        },
        {
          src: "https://www.google.com/search?sca_esv=295fbb2fc4590fb4&sxsrf=ACQVn09ZZBi9uM9vNAOjJF0D8E_aCXOqBw:1710284709228&q=%ED%95%98%EC%9D%B4%ED%81%90&tbm=isch&source=lnms&prmd=ivsnmbz&sa=X&ved=2ahUKEwiarLuE6--EAxXPh68BHbu4C3EQ0pQJegQIEBAB&biw=670&bih=909&dpr=1#imgrc=dbOVFZdY13OhjM",
        },
      ],
      Comment: [
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
