import React from 'react'
import { View, StyleSheet, ViewProps } from 'react-native'

type Props = ViewProps & {
  children: React.ReactNode
}
const FlexContainer = ({ children, style, ...props }: Props) => {
  const viewStyle = {
    ...styles.flexContainer
  }
  return (
    <View style={[viewStyle, style]} {...props}>
      {children}
    </View>
  )
}
export default FlexContainer

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
})
