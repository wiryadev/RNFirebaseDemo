import React, { useState } from 'react'
import Detail from './detail'

const RoomChatScreen = ({ navigation }) => {

  const [chat, setChat] = useState('')

  const onBackPress = () => {
    navigation.goBack()
  }

  const onSendChat = () => {
    console.log('pressed')
  }

  return (
    <Detail
      chat={chat}
      onChatChange={setChat}
      onBackPress={onBackPress}
      onSendChat={onSendChat}
    />
  )
}

export default RoomChatScreen