import { View, Text } from 'react-native'
import React from 'react'
import Detail from './detail'

const RoomChatScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack()
  }
  return (
    <Detail
      onBackPress={onBackPress}
    />
  )
}

export default RoomChatScreen