import {USER_DATA} from '../actions/userActions';
const initialState = {
  userData: {},
  token: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_DATA:
      const {user, token} = action.payload;
      return {
        ...state,
        userData: user,
        token,
      };
    default:
      return state;
  }
}
