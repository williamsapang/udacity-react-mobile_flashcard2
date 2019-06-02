import { combineReducers } from 'redux';

const INITIAL_STATE = {
  list: {},
};

const deckreducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const {
        list,
      } = state;

      // Finally, update our redux state
      const newState = {
        list: {
          ...list,
          ...action.payload  
        }
      };

      // const newState = {
      //   list: list.concat(action.payload)
      // }
      return newState;
    default:
      return state
  }
};

export default combineReducers({
  decks: deckreducer,
});