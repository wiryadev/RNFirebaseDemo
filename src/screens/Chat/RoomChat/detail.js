import React from 'react'
import { View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'

const Detail = ({
  onBackPress
}) => {
  const theme = useTheme()
  return (
    <View>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.BackAction onPress={onBackPress} />
        <Appbar.Content title="Room Chat" />
      </Appbar.Header>
    </View>
  )
}

export default Detail