import API from '../../api';

export const FETCH_DEPOSITS = 'FETCH_DEPOSITS';

export const depositsData = deposits => ({
  type: FETCH_DEPOSITS,
  payload: {deposits},
});

export function getUserDeposits(token) {
  return async dispatch => {
    try {
      const deposits = (await API.getUserDeposits(token)).data.data
        .userDeposits;
      dispatch(depositsData(deposits));
    } catch (error) {
      console.log(error);
    }
  };
}
