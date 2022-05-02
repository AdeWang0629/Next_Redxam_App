import API from '../../api';
import {errorLog} from './loginActions';

export const DEPOSITS_DATA = 'DEPOSITS_DATA';

export const depositsData = deposits => ({
  type: DEPOSITS_DATA,
  payload: {deposits},
});

export function getDeposits() {
  return async dispatch => {
    try {
      const deposits = (await API.getUserDeposits()).data.data;
      dispatch(depositsData(deposits));
    } catch (error) {
      console.log(error);
      dispatch(errorLog(error));
    }
  };
}
