import { combineReducers } from 'redux'

import user from './user'
import login from './login'
import theme from './theme'

export default combineReducers({
  user,
  login,
  theme
})
