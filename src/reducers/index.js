import { combineReducers } from 'redux-immutable'

import credentials from './credentials'
import tokens from './tokens'
import login from '../features/login/reducer'

export default combineReducers({
  credentials,
  tokens,
  login,
})
