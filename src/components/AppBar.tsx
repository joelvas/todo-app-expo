import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import Constants from 'expo-constants'

const AppBar = () => {
  const theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text style={styles.text}>Tasks app</Text>
    </View>
  )
}
export default AppBar

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})
