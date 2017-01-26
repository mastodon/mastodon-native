import React from 'react'
import { View, TextInput, Button, Linking } from 'react-native'
import { connect } from 'react-redux'
import { changeId, submit, getToken } from './actions'
import { Actions } from 'react-native-router-flux'

const mapStateToProps = state => ({
  id: state.getIn(['login', 'id']),
  loggedIn: state.get('tokens').size > 0
})

const mapDispatchToProps = dispatch => ({
  onChangeId (text) {
    dispatch(changeId(text))
  },

  onSubmit () {
    dispatch(submit())
  },

  onCallback (url) {
    dispatch(getToken(url))
  }
})

const Login = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    loggedIn: React.PropTypes.bool,
    onChangeId: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onCallback: React.PropTypes.func
  },

  componentDidMount () {
    Linking.addEventListener('url', this._handleOpenURL)
  },

  componentWillUnmount () {
    Linking.removeEventListener('url', this._handleOpenURL)
  },

  _handleOpenURL (e) {
    this.props.onCallback(e.url)
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.loggedIn) {
      Actions.main()
    }
  },

  render () {
    const { id, onChangeId, onSubmit } = this.props;

    return (
      <View style={{ margin: 128 }}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          placeholder='username@domain'
          value={id}
          onChangeText={onChangeId}
          onSubmitEditing={onSubmit}
        />

        <Button
          title='Login'
          onPress={onSubmit}
        />
      </View>
    )
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
