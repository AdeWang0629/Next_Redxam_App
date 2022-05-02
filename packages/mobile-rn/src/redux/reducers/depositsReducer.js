import {DEPOSITS_DATA} from '../actions/depositsActions';
const initialState = {
  deposits: {},
  token: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DEPOSITS_DATA:
      const {deposits} = action.payload;
      return {
        ...state,
        deposits,
      };

    default:
      return state;
  }
}
