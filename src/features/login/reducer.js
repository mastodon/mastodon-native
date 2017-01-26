import Immutable from 'immutable'
import { LOGIN_CHANGE_ID, LOGIN_START } from './actions'

const initialState = Immutable.Map({
  id: '',
  domain: null,
})

export default function (state = initialState, action) {
  switch(action.type) {
  case LOGIN_CHANGE_ID:
    return state.set('id', action.text)
  case LOGIN_START:
    return state.set('domain', action.domain)
  default:
    return state
  }
}
