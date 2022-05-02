import API from '../../api';
export const IS_LOGIN = 'IS_LOGIN';

const isLogin = () => ({
  type: IS_LOGIN,
});

export const SUCCESS_LOG = 'SUCCESS_LOG';

export const successLog = () => ({
  type: SUCCESS_LOG,
});

export const ERROR_LOG = 'ERROR_LOG';

export const errorLog = error => ({
  type: ERROR_LOG,
  payload: error,
});

export function login(email) {
  return dispatch => {
    dispatch(isLogin());
    API.login(email);
  };
}
