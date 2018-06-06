import { combineReducers } from 'redux';

const defaultState = {};

const currentPosition = (state = defaultState, action) => {
  if (action.type === 'UPDATE_CURRENT_POSITION') {
    return action.position; 
  }

  return state;
};

export default combineReducers({
  currentPosition
})
