import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// envs
import {NODE_ENV} from 'react-native-dotenv';

const initialState = {};
const middleware = [thunk];

// Production
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    NODE_ENV === 'development' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
