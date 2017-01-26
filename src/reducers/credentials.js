import Immutable from 'immutable'

import { CREDENTIALS_SET } from '../actions/credentials'

const initialState = Immutable.Map()

export default function (state = initialState, action) {
  switch(action.type) {
  case CREDENTIALS_SET:
    return state.set(action.domain, Immutable.Map({
      clientId: action.clientId,
      clientSecret: action.clientSecret
    }))
  default:
    return state
  }
}
