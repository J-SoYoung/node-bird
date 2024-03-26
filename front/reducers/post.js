import { produce } from "immer";
import shortid from "shortid";
import { faker } from "@faker-js/faker";

export let initialState = {
  mainPosts: [],
  // mainPosts: [
  //   {
  //     id: 1,
  //     User: {
  //       id: 1,
  //       nickname: "thdud",
  //     },
  //     contents: "첫번재 게시글 #해시태그 #익스프레스",
  //     Images: [
  //       {
  //         id: shortid.generate(),
  //         src: "https://raw.githubusercontent.com/J-SoYoung/node-bird/c19975b02f88bc1cbdd65ab78635ccb1935a51aa/assets/images/cat2.jpg",
  //       },
  //       {
  //         id: shortid.generate(),
  //         src: "https://raw.githubusercontent.com/J-SoYoung/node-bird/main/assets/images/bg3.jpg",
  //       },
  //       {
  //         id: shortid.generate(),
  //         src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
  //       },
  //     ],
  //     Comments: [
  //       {
  //         id: shortid.generate(),
  //         User: { id: shortid.generate(), nickname: "thdud2" },
  //         contents: "하이큐",
  //       },
  //       {
  //         id: shortid.generate(),
  //         User: { id: shortid.generate(), nickname: "thdud11" },
  //         contents: "오늘파묘",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     User: {
  //       id: 1,
  //       nickname: "thdud",
  //     },
  //     contents: "더미데이터입니다",
  //     Images: [
  //       {
  //         id: shortid.generate(),
  //         src: "https://raw.githubusercontent.com/J-SoYoung/node-bird/main/assets/images/bg3.jpg",
  //       },
  //     ],
  //     Comments: [
  //       {
  //         id: shortid.generate(),
  //         User: { id: shortid.generate(), nickname: "thdud333" },
  //         contents: "하이큐323",
  //       },
  //       {
  //         id: shortid.generate(),
  //         User: { id: shortid.generate(), nickname: "thdud444" },
  //         contents: "오늘파묘33",
  //       },
  //       {
  //         id: shortid.generate(),
  //         User: { id: shortid.generate(), nickname: "thdud444" },
  //         contents: "오늘파묘33",
  //       },
  //     ],
  //   },
  // ],
  imagePaths: [],
  hasMorePost: true,

  LoadPostsLoaing: false,
  LoadPostsDone: false,
  LoadPostsError: null,

  addPostLoaing: false,
  addPostDone: false,
  addPostError: null,

  removePostLoaing: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoaing: false,
  addCommentDone: false,
  addCommentError: null,
};


faker.seed(123);
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map((p, idx) => ({
      // id: shortid.generate(),
      // User: {
      //   id: shortid.generate(),
      //   nickname: "thdud",
      // },
      // contents: `dddd-${idx}`,
      // Image: [],
      // Comments: [],

      id: shortid.generate(),
      User: {
        id: shortid.generate(),
        nickname: faker.person.fullName(),
      },
      contents: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.url(),
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: { id: shortid.generate(), nickname: faker.person.fullName() },
          contents: faker.lorem.sentence(),
        },
      ],
    }));

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

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

const dummyComment = (data) => ({
  User: { nickname: "thdud" },
  contents: data,
});

const dummyPost = (data) => ({
  id: data.id,
  contents: data.content,
  User: {
    id: 1,
    nickname: "thdud",
  },
  Image: [],
  Comments: [],
});

// reducer
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST: {
        draft.LoadPostsLoaing = true;
        draft.LoadPostsDone = false;
        draft.LoadPostsError = null;
        break;
      }
      case LOAD_POSTS_SUCCESS: {
        console.log("reducer post-", action.data);
        draft.LoadPostsLoaing = false;
        draft.LoadPostsDone = true;
        draft.mainPosts.push(...action.data);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      }
      case LOAD_POSTS_FAILURE: {
        draft.LoadPostsLoaing = false;
        draft.LoadPostsError = action.error;
        break;
      }

      case ADD_POST_REQUEST: {
        draft.addPostLoaing = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.addPostLoaing = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      }
      case ADD_POST_FAILURE: {
        draft.addPostLoaing = false;
        draft.addPostDone = false;
        draft.addPostError = action.error;
        break;
      }

      case REMOVE_POST_REQUEST: {
        draft.removePostLoaing = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      }
      case REMOVE_POST_SUCCESS: {
        draft.removePostLoaing = false;
        draft.removePostDone = true;
        draft.mainPosts = state.mainPosts.filter((v) => v.id !== action.data);
        break;
      }
      case REMOVE_POST_FAILURE: {
        draft.removePostLoaing = false;
        draft.removePostError = action.error;
        break;
      }

      case ADD_COMMENT_REQUEST: {
        draft.addCommentLoaing = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        draft.addCommentLoaing = false;
        draft.addCommentDone = true;
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        break;

        // const postIndex = state.mainPosts.findIndex(
        //   (v) => v.id === action.data.postId
        // );
        // const post = state.mainPosts[postIndex];
        // const Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [draft.mainPosts];
        // mainPosts[postIndex] = { ...post, Comments };
        // draft.mainPosts = [...mainPosts];
      }
      case ADD_COMMENT_FAILURE: {
        draft.addCommentLoaing = false;
        draft.addCommentError = action.error;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;