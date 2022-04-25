export const IS_LOGIN = 'IS_LOGIN';

const isLogin = () => ({
  type: IS_LOGIN,
});

export const SUCCESS_LOG = 'SUCCESS_LOG';

const successLog = () => ({
  type: SUCCESS_LOG,
});

export const ERROR_LOG = 'ERROR_LOG';

const errorLog = () => ({
  type: ERROR_LOG,
});

export function login({email}) {
  return dispatch => {
    dispatch(isLogin());
  };
}
