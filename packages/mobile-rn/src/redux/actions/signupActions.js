import API from '../../api';
export const IS_LOADING = 'IS_LOADING';

const isLoading = value => ({
  type: IS_LOADING,
  payload: value,
});

export const SUCCES_SIGNUP = 'SUCCES_SIGNUP';

const successSignup = (level, referralCode) => ({
  type: SUCCES_SIGNUP,
  payload: {level, referralCode},
});

export const ERROR_SIGNUP = 'ERROR_SIGNUP';

const errorSignup = message => ({
  type: ERROR_SIGNUP,
  payload: message,
});

export function signup(form) {
  return async dispatch => {
    dispatch(isLoading(true));
    try {
      const res = (await API.createWaitlist(form)).data.data.createWaitlist;
      if (res.success) {
        dispatch(successSignup(res.level, res.referralCode));
      } else {
        dispatch(errorSignup(res.message));
      }
    } catch (error) {
      dispatch(errorSignup(error.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
}
