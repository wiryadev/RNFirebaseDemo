import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useState } from 'react'
import fireDb from '../../../data/Database'
import Detail from './detail'

dayjs.extend(utc)

const RoomChatScreen = ({ route, navigation }) => {

  const [message, setMessage] = useState('')
  const { userId, roomId } = route.params

  const onBackPress = () => {
    navigation.goBack()
  }

  const onSendChat = () => {
    const newReference = fireDb.ref(`/inboxes/messages/${roomId}`).push()
    console.log('Auto generated key: ', newReference.key)
    newReference
      .set({
        userId: userId,
        message: message,
        messageType: 'text',
        createdAt: dayjs.utc().format(),
      })
      .then(() => {
        setMessage('')
      })
  }

  return (
    <Detail
      message={message}
      onMessageChange={setMessage}
      onBackPress={onBackPress}
      onSendChat={onSendChat}
    />
  )
}

export default RoomChatScreen