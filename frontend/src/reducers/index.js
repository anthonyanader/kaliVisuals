import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true
};

const initialSelectedTagState = {
  selectedTag: null
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };

    case actionTypes.CLEAR_CURRENT_USER:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};

const tags_reducer = (state = initialSelectedTagState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_TAG:
      return {
        ...state,
        selectedTag: action.payload.selectedTag
      };
    case actionTypes.CLEAR_CURRENT_TAG:
      return {
        ...state
      };
    case actionTypes.MONITORED_TAGS_EMPTY:
      return {
        ...state,
        emptyTagList: action.payload.emptyTagList
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
  tags: tags_reducer
});

export default rootReducer;
