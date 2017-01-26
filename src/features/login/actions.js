import { Linking, AsyncStorage } from 'react-native'
import axios from 'axios'

import { setCredentials, setCredentialsToken } from '../../actions/credentials'

export const LOGIN_CHANGE_ID = 'LOGIN_CHANGE_ID'
export const LOGIN_START     = 'LOGIN_START'

export function changeId (text) {
  return {
    type: LOGIN_CHANGE_ID,
    text
  }
}

export function startLogin (domain) {
  return {
    type: LOGIN_START,
    domain
  }
}

const openAuthorization = (domain, clientId, clientSecret) => {
  Linking.openURL(`https://${domain}/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent('mastodon://callback')}&scope=read+write+follow&response_type=code`)
}

export function submit () {
  return (dispatch, getState) => {
    const id                 = getState().getIn(['login', 'id']).trim()
    let [ username, domain ] = id.split('@')

    if (!domain) {
      domain = username;
    }

    let clientId     = getState().getIn(['credentials', domain, 'clientId'], null)
    let clientSecret = getState().getIn(['credentials', domain, 'clientSecret'], null)

    console.log(domain, clientId, clientSecret)
    dispatch(startLogin(domain))

    if (clientId === null || clientSecret === null) {
      // Retrieve credentials from API
      console.log('Going to fetch new credentials')

      axios.post(`https://${domain}/api/v1/apps`, {
        client_name: 'Mastodon',
        redirect_uris: 'mastodon://callback',
        scopes: 'read write follow'
      }).then(response => {
        console.log(response.data)

        clientId     = response.data.client_id
        clientSecret = response.data.client_secret

        dispatch(setCredentials(domain, clientId, clientSecret))
        openAuthorization(domain, clientId, clientSecret)
      }).catch(error => {
        console.error(error)
      })
    } else {
      console.log('Using existing credentials')
      openAuthorization(domain, clientId, clientSecret)
    }
  }
}

export function getToken (url) {
  return (dispatch, getState) => {
    const code         = url.match(/\?code=([a-z0-9]+)/i)[1]
    const domain       = getState().getIn(['login', 'domain'])
    const clientId     = getState().getIn(['credentials', domain, 'clientId'], null)
    const clientSecret = getState().getIn(['credentials', domain, 'clientSecret'], null)

    axios.post(`https://${domain}/oauth/token`, {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'mastodon://callback'
    }).then(response => {
      dispatch(setCredentialsToken(domain, response.data.access_token))
    }).catch(error => {
      console.error(error)
    })
  }
}
