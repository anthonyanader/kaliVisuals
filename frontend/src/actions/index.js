import * as actionTypes from './types';

export const setUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: {
      currentUser: user
    }
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_USER
  };
};

export const setSelectedTag = tag => {
  return {
    type: actionTypes.SET_SELECTED_TAG,
    payload: {
      selectedTag: tag
    }
  };
};
export const clearTag = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_TAG
  };
};
