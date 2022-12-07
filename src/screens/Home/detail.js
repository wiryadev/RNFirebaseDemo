import React from 'react'
import { View } from 'react-native'
import { Appbar, Button, useTheme } from 'react-native-paper'

const HomeDetail = ({
  user,
  onSignOut,
}) => {
  const theme = useTheme()

  return (
    <View
      style={{ flex: 1 }}
    >
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.Content title={user.name} />
        <Appbar.Action
          icon='logout-variant'
          onPress={onSignOut}
        />
      </Appbar.Header>
    </View>
  )
}

export default HomeDetail