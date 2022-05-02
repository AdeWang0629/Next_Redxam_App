import {USER_DATA, HOME_DATA} from '../actions/userActions';
const initialState = {
  userData: {},
  homeData: {},
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

    case HOME_DATA:
      const {home} = action.payload;
      return {
        ...state,
        homeData: home,
      };
    default:
      return state;
  }
}
