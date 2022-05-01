import {
  IS_LOADING,
  SUCCES_SIGNUP,
  ERROR_SIGNUP,
} from '../actions/signupActions';

const initialState = {
  isLoading: false,
  signupError: '',
  referralCode: '',
  level: 0,
  isDone: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SUCCES_SIGNUP:
      return {
        ...state,
        level: action.payload.level,
        referralCode: action.payload.referralCode,
        isDone: true,
      };
    case ERROR_SIGNUP:
      return {
        ...state,
        signupError: action.payload,
        isDone: false,
        referralCode: '',
        level: 0,
      };
    default:
      return state;
  }
}
