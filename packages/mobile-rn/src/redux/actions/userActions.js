import API from '../../api';
import {successLog, errorLog} from './loginActions';

export const USER_DATA = 'USER_DATA';
export const HOME_DATA = 'HOME_DATA';
export const BALANCE_RECORDS_DATA = 'BALANCE_RECORDS_DATA';

export const userData = (user, token) => ({
  type: USER_DATA,
  payload: {user, token},
});

export const homeData = home => ({
  type: HOME_DATA,
  payload: {home},
});

export const balanceRecordsData = balanceRecords => ({
  type: BALANCE_RECORDS_DATA,
  payload: {balanceRecords},
});

export function userVerified(token) {
  return async dispatch => {
    try {
      const data = (await API.getUserData(token)).data.data.user[0];
      const home = (await API.getHomeData(token)).data.data.home;
      const balanceRecords = (await API.getBalanceRecords(token)).data.data
        .balanceRecords;
      dispatch(homeData(home));
      dispatch(balanceRecordsData(balanceRecords));
      dispatch(userData(data, token));
      dispatch(successLog());
    } catch (error) {
      console.log(error);
      dispatch(errorLog(error));
    }
  };
}
