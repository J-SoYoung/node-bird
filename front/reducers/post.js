import { produce } from "immer";

export let initialState = {
  mainPosts: [],
  imagePaths: [],
  singlePost: null,
  hasMorePosts: true,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  likePostLoading: false, // 좋아요 시도중
  likePostDone: false,
  likePostError: null,

  unLikePostLoading: false, // 좋아요 취소 시도중
  unLikePostDone: false,
  unLikePostError: null,

  retweetLoading: false, // 리트윗 시도중
  retweetDone: false,
  retweetError: null,
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

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

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

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

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
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST: {
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      }
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS: {
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts.push(...action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      }
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE: {
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      }
      case LOAD_POST_REQUEST: {
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      }
      case LOAD_POST_SUCCESS: {
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      }
      case LOAD_POST_FAILURE: {
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      }

      case ADD_POST_REQUEST: {
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        draft.addPostLoading = false;
        draft.addPostDone = false;
        draft.addPostError = action.error;
        break;
      }

      case REMOVE_POST_REQUEST: {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      }
      case REMOVE_POST_SUCCESS: {
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => Number(v.id) !== Number(action.data.PostId)
        );
        break;
      }
      case REMOVE_POST_FAILURE: {
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      }

      case ADD_COMMENT_REQUEST: {
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(
          (v) => Number(v.id) === Number(action.data.PostId)
        );
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
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
        draft.addCommentLoading = false;
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

      case UPLOAD_IMAGES_REQUEST: {
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = action.error;
        break;
      }

      case REMOVE_IMAGE: {
        console.log("redux-remove image", action.data);
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      }

      case RETWEET_REQUEST: {
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      }
      case RETWEET_SUCCESS: {
        draft.mainPosts.unshift(action.data);
        draft.retweetLoading = false;
        draft.retweetDone = true;
        break;
      }
      case RETWEET_FAILURE: {
        draft.retweetLoading = false;
        draft.retweetDone = false;
        draft.retweetError = action.error;
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
