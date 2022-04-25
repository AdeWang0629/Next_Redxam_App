import {IS_LOGIN, SUCCESS_LOG, ERROR_LOG} from '../actions/loginActions';

const initialState = {
  logged: false,
  isLogin: false,
  attempts: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case SUCCESS_LOG:
      return {
        ...state,
        isLogin: false,
        logged: true,
      };

    case ERROR_LOG:
      return {
        ...state,
        isLogin: false,
        attempts: state.attempts + 1,
      };

    default:
      return state;
  }
}
