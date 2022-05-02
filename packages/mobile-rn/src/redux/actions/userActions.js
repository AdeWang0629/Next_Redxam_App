import API from '../../api';
import {successLog, errorLog} from './loginActions';

export const USER_DATA = 'USER_DATA';
export const HOME_DATA = 'HOME_DATA';

export const userData = (user, token) => ({
  type: USER_DATA,
  payload: {user, token},
});

export const homeData = home => ({
  type: HOME_DATA,
  payload: {home},
});

export function userVerified(token) {
  return async dispatch => {
    try {
      const data = (await API.getUserData(token)).data.data.user[0];
      const home = (await API.getHomeData(token)).data.data.home;
      dispatch(homeData(home));
      dispatch(userData(data, token));
      dispatch(successLog());
    } catch (error) {
      console.log(error);
      dispatch(errorLog(error));
    }
  };
}
