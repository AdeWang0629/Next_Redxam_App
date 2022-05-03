import {FETCH_DEPOSITS} from '../actions/depositsActions';
const initialState = {
  deposits: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEPOSITS:
      const {deposits} = action.payload;
      return {
        ...state,
        deposits,
      };

    default:
      return state;
  }
}
