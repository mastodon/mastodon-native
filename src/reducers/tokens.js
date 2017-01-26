import Immutable from 'immutable'

import { CREDENTIALS_TOKEN_SET } from '../actions/credentials'

const initialState = Immutable.List()

export default function (state = initialState, action) {
  switch(action.type) {
  case CREDENTIALS_TOKEN_SET:
    return state.push(Immutable.Map({
      domain: action.domain,
      token: action.token
    }))
  default:
    return state
  }
}
