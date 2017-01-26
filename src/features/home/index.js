import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'

const mapStateToProps = state => ({
  accessor: state.get('tokens').last()
})

const Home = React.createClass({
  getInitialState () {
    return {
      account: null
    }
  },

  componentDidMount () {
    axios.get(`https://${this.props.accessor.get('domain')}/api/v1/accounts/verify_credentials`, {
      headers: {
        Authorization: `Bearer ${this.props.accessor.get('token')}`
      }
    }).then(response => {
      this.setState({ account: response.data })
    }).catch(error => {
      console.error(error)
    })
  },

  render () {
    const { account } = this.state

    if (account === null) {
      return <ActivityIndicator color='#2b90d9' size='large' />
    }

    return (
      <View style={{ margin: 14 }}>
        <Text style={{ color: '#fff' }}>Hello {this.state.account.acct}</Text>
      </View>
    )
  }
})

export default connect(mapStateToProps)(Home)
