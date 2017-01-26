import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Scene, Router, ActionConst } from 'react-native-router-flux'
import Login from '../features/login'
import Home from '../features/home'
import Notifications from '../features/notifications'
import Icon from 'react-native-vector-icons/FontAwesome';

const TabIcon = ({ selected, title, iconName, size }) => (
  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <Icon name={iconName} size={size} color={selected ? '#2b90d9' : '#fff'} style={{ marginRight: 5 }}/>
    <Text style={{ color: selected ? '#2b90d9' : '#fff' }}>{title}</Text>
  </View>
)

const styles = StyleSheet.create({
  scene: {
    backgroundColor: '#282c37'
  },

  iconContainer: {
    borderTopWidth: StyleSheet.hairlineWidth * 4,
    borderTopColor: '#373b4a',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconContainerSelected: {
    borderTopColor: '#2b90d9'
  },

  bar: {
    backgroundColor: '#373b4a'
  }
})

export default class App extends Component {
  render () {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='login' hideNavBar={true} component={Login} title='Login' initial={true} />

          <Scene key='main' hideNavBar={true} tabs={true} tabBarIconContainerStyle={styles.iconContainer} tabBarSelectedItemStyle={styles.iconContainerSelected} tabBarStyle={styles.bar} type={ActionConst.REPLACE}>
            <Scene key='home' size={30} sceneStyle={styles.scene} hideNavBar={true} title='Home' iconName='home' icon={TabIcon} component={Home} initial={true} />
            <Scene key='notifications' size={22} sceneStyle={styles.scene} hideNavBar={true} title='Notifications' iconName='bell' icon={TabIcon} component={Notifications} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}
