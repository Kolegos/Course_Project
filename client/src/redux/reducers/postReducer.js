import * as types from "../actions/actionTypes";

export default function postReducer(state = [], action) {
  switch (action.type) {
    case types.SET_STATE:
      return action.state.posts;
    case types.CREATE_POST_SUCCESS:
      return [...state, { ...action.state }];
    case types.LOAD_POSTS_SUCCESS:
      if (typeof state.posts !== "undefined") {
        let postsToReturn = state.posts.concat(action.posts.data);
        return { ...state, posts: postsToReturn };
      } else {
        return { ...state, posts: action.posts.data };
      }
    case types.LOAD_ONE_POST_SUCCESS:
      return { ...state, onePost: action.post.data[0] };
    case types.CLEAN_ONE_POST_SUCCESS:
      return { ...state, onePost: null };
    case types.LOAD_LENGTH_SUCCESS:
      return { ...state, length: action.length.data };
    case types.LOAD_USER_POSTS_SUCCESS:
      return { ...state, posts: action.posts };
    case types.LOAD_USER_POSTS_FAILED:
      return { ...state, posts: types.LOAD_USER_POSTS_FAILED };
    case types.EDIT_POST:
      return {
        ...state,
        onePost: {
          ...state.post,
          userId: action.post.userId,
          title: action.post.title,
          category: action.post.category,
          features: action.post.features,
          description: action.post.description,
          photos: action.post.photos,
          phoneNumber: action.post.phoneNumber,
          price: action.post.price,
        },
      };
    case types.SEARCH_POSTS_SUCCESS:
      return { ...state, postsFromSearch: action.posts.data };
    default:
      return state;
  }
}
