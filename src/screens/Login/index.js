import { View, Text } from 'react-native'
import React from 'react'
import { Appbar, useTheme } from 'react-native-paper'

const LoginScreen = ({ navigation }) => {
  const theme = useTheme()

  const onLogin = () => {

  }

  return (
    <View
      style={{ flex: 1 }}
    >
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.Content title="Login" />
      </Appbar.Header>
    </View>
  )
}

export default LoginScreen