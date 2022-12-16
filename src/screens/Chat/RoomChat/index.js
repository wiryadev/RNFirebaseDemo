import auth from '@react-native-firebase/auth'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useEffect, useState } from 'react'
import fireDb from '../../../data/Database'
import Detail from './detail'

dayjs.extend(utc)

const RoomChatScreen = ({ route, navigation }) => {

  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const { roomId } = route.params
  const currentUserId = auth().currentUser?.uid

  const onBackPress = () => {
    navigation.goBack()
  }

  const onSendChat = () => {
    const newReference = fireDb.ref(`/inboxes/messages/${roomId}`).push()
    console.log('Auto generated key: ', newReference.key)
    newReference
      .set({
        userId: currentUserId,
        message: message,
        messageType: 'text',
        createdAt: dayjs.utc().format(),
      })
      .then(() => {
        setMessage('')
      })
  }

  useEffect(() => {
    const onValueChange = fireDb.ref(`/inboxes/messages/${roomId}`)
      .on('value', async snapshot => {
        setChats([])
        console.log('snapshot', snapshot)
        console.log('snapshotVal', snapshot.val())
        
        snapshot.forEach(childSnapshot => {
          console.log('child', childSnapshot)
          const newData = {
            id: childSnapshot.key,
            userId: childSnapshot.val().userId,
            message: childSnapshot.val().message,
            messageType: childSnapshot.val().messageType,
            createdAt: childSnapshot.val().createdAt,
          }
          setChats(prevData => [
            ...prevData, newData
          ])
        })
      })

    return () => {
      fireDb.ref(`/inboxes/messages/${roomId}`).off('value', onValueChange)
    }
  }, [])


  return (
    <Detail
    currentUserId={currentUserId}
      chats={chats}
      message={message}
      onMessageChange={setMessage}
      onBackPress={onBackPress}
      onSendChat={onSendChat}
    />
  )
}

export default RoomChatScreen