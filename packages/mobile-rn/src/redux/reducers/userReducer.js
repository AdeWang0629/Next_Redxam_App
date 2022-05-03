import {
  USER_DATA,
  HOME_DATA,
  BALANCE_RECORDS_DATA,
} from '../actions/userActions';
const initialState = {
  userData: {},
  homeData: {},
  balanceRecords: {},
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

    case BALANCE_RECORDS_DATA:
      const {balanceRecords} = action.payload;
      return {
        ...state,
        balanceRecords,
      };
    default:
      return state;
  }
}
