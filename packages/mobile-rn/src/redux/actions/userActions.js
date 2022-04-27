import API from '../../api';
import {successLog, errorLog} from './loginActions';

export const USER_DATA = 'USER_DATA';

export const userData = (user, token) => ({
  type: USER_DATA,
  payload: {user, token},
});

export function userVerified(token) {
  return async dispatch => {
    try {
      const data = (await API.getUserData(token)).data.data.user[0];
      dispatch(userData(data, token));
      dispatch(successLog());
    } catch (error) {
      console.log(error);
      dispatch(errorLog(error));
    }
  };
}
