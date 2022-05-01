import {combineReducers} from 'redux';
import login from './loginReducer';
import signup from './signupReducer';
import user from './userReducer';

export default combineReducers({login, user, signup});
