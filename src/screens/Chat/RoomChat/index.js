import auth from '@react-native-firebase/auth'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useEffect, useState } from 'react'
import fireDb from '../../../data/Database'
import Detail from './detail'

dayjs.extend(utc)

const RoomChatScreen = ({ route, navigation }) => {

  const [friend, setFriend] = useState(null)
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const { friendUserId, roomId } = route.params
  const currentUserId = auth().currentUser?.uid

  console.log('friendUserId', friendUserId)

  const onBackPress = () => {
    navigation.goBack()
  }

  const retrievFriendData = () => {
    fireDb.ref(`users/${friendUserId}`)
      .once('value')
      .then(snapshot => {
        setFriend({
          uid: snapshot.key,
          name: snapshot.val().name,
          email: snapshot.val().email,
        })
      })
  }

  const onSendChat = () => {
    const date = dayjs.utc().format()
    const newReference = fireDb.ref(`/inboxes/messages/${roomId}`).push()
    console.log('Auto generated key: ', newReference.key)
    newReference
      .set({
        userId: currentUserId,
        message: message,
        messageType: 'text',
        createdAt: date,
      })
      .then(() => {
        updateInbox(date)
        setMessage('')
      })
  }

  const updateInbox = (date) => {
    fireDb.ref(`/inboxes/${currentUserId}/${friendUserId}`)
      .update({
        lastMessage: message,
        lastMessageAt: date,
      })
      .then(() => console.log('Data updated.'))
  }

  useEffect(() => {
    retrievFriendData()
    const onValueChange = fireDb.ref(`/inboxes/messages/${roomId}`)
      .on('value', async snapshot => {
        setChats([])
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
      friend={friend}
      chats={chats}
      message={message}
      onMessageChange={setMessage}
      onBackPress={onBackPress}
      onSendChat={onSendChat}
    />
  )
}

export default RoomChatScreen