import React from 'react'
import { List, useTheme } from 'react-native-paper'

const UserItem = ({
  data,
  isSelected = false,
  onPress,
}) => {
  const theme = useTheme()
  return (
    <List.Item
      title={data.name}
      description={data.email}
      onPress={onPress}
      right={props => (isSelected &&
        <List.Icon
          {...props}
          icon='check'
          color={theme.colors.primary}
        />
      )}
    />
  )
}

export default UserItem