import { produce } from "immer";

export let initialState = {
  mainPosts: [],
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

  likePostLoading: false, // 좋아요 시도중
  likePostDone: false,
  likePostError: null,

  unLikePostLoading: false, // 좋아요 취소 시도중
  unLikePostDone: false,
  unLikePostError: null,
};

// faker.seed(123);
// export const generateDummyPost = (number) =>
//   Array(number)
//     .fill()
//     .map((p, idx) => ({
//       id: shortid.generate(),
//       User: {
//         id: shortid.generate(),
//         nickname: faker.person.fullName(),
//       },
//       contents: faker.lorem.paragraph(),
//       Images: [
//         {
//           src: faker.image.url(),
//         },
//       ],
//       Comments: [
//         {
//           id: shortid.generate(),
//           User: { id: shortid.generate(), nickname: faker.person.fullName() },
//           contents: faker.lorem.sentence(),
//         },
//       ],
//     }));

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

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

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
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST: {
        draft.LoadPostsLoaing = true;
        draft.LoadPostsDone = false;
        draft.LoadPostsError = null;
        break;
      }
      case LOAD_POSTS_SUCCESS: {
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
        draft.mainPosts.unshift(action.data);
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
        draft.mainPosts = draft.mainPosts.filter(
          (v) => Number(v.id) !== Number(action.data.PostId)
        );
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
        const post = draft.mainPosts.find(
          (v) => Number(v.id) === Number(action.data.PostId)
        );
        post.Comments.unshift(action.data);
        draft.addCommentLoaing = false;
        draft.addCommentDone = true;
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

      case LIKE_POST_REQUEST: {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      }
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(
          (v) => Number(v.id) === Number(action.data.PostId)
        );
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE: {
        draft.likePostLoading = false;
        draft.likePostDone = false;
        draft.likePostError = action.error;
        break;
      }

      case UNLIKE_POST_REQUEST: {
        draft.unLikePostLoading = true;
        draft.unLikePostDone = false;
        draft.unLikePostError = null;
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(
          (v) => Number(v.id) === Number(action.data.PostId)
        );
        post.Likers = post.Likers.filter(
          (v) => Number(v.id) !== Number(action.data.UserId)
        );
        draft.unLikePostLoading = false;
        draft.unFollowDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE: {
        draft.unLikePostLoading = false;
        draft.unLikePostDone = false;
        draft.likePostError = action.error;
        break;
      }

      default:
        break;
    }
  });
};

export default reducer;
