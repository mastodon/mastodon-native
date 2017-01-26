export const CREDENTIALS_SET       = 'CREDENTIALS_SET'
export const CREDENTIALS_TOKEN_SET = 'CREDENTIALS_TOKEN_SET'

export function setCredentials (domain, clientId, clientSecret) {
  return {
    type: CREDENTIALS_SET,
    domain,
    clientId,
    clientSecret
  }
}

export function setCredentialsToken(domain, token) {
  return {
    type: CREDENTIALS_TOKEN_SET,
    domain,
    token
  }
}
