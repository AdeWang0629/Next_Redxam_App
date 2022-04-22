import {INCREMENT, DECREMENT} from './actionType';

const initialEstate = {
  counter: 0,
};

export const firstReducer = (state = initialEstate, action) => {
  switch (action.type) {
    case INCREMENT:
      return {...state, counter: state.counter + 1};
    case DECREMENT:
      return {...state, counter: state.counter - 1};
    default:
      return state;
  }
};
