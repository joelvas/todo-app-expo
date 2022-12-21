import React from 'react'
import { View } from 'react-native'
import AppBar from './AppBar'
import DatabaseInit from '../sections/DatabaseInit'
import TasksScreen from '../screens/TasksScreen/TasksScreen'

const Main = () => {
  return (
    <View style={{ flexGrow: 1 }}>
      <DatabaseInit />
      <AppBar />
      <TasksScreen />
    </View>
  )
}
export default Main
