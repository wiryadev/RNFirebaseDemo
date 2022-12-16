import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import fireDb from '../../data/Database'
import HomeDetail from './detail'

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(null)
  const [inboxes, setInboxes] = useState([])
  const [loading, setLoading] = useState(true)
  const userId = auth().currentUser?.uid

  const retrieveUserData = () => {
    console.log('userId', userId)
    fireDb.ref(`users/${userId}`)
      .once('value')
      .then(snapshot => {
        setUser({
          uid: userId,
          name: snapshot.val().name,
          email: snapshot.val().email,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onAddButton = () => {
    navigation.navigate('CreateChatScreen')
  }

  const onChatSelected = (userId, roomId) => {
    navigation.navigate('RoomChatScreen', {
      friendUserId: userId,
      roomId: roomId,
    })
  }

  useEffect(() => {
    retrieveUserData()
    const onValueChange = fireDb.ref(`inboxes/${userId}`)
      .on('value', async snapshot => {
        console.log('snapshot', snapshot)
        setInboxes([])
        snapshot.forEach(item => {
          console.log('item', item)
          fireDb.ref(`users/${item.key}`)
            .once('value')
            .then(userSnapshot => {
              console.log('userSnapshot', userSnapshot)
              const newData = {
                id: item.key,
                lastMessage: item.val().lastMessage,
                lastMessageAt: item.val().lastMessageAt,
                roomId: item.val().roomId,
                username: userSnapshot.val().name,
              }
              setInboxes(prevData => [
                ...prevData, newData
              ])
              console.log('inboxes', inboxes)
            })
        })
      })

      return () => fireDb.ref(`inboxes/${userId}`).off('value', onValueChange)
  }, [])


  const onSignOut = () => {
    auth()
      .signOut()
      .then(() => navigation.replace('SignInScreen'));
  }

  if (user) {
    return (
      <HomeDetail
        user={user}
        inboxes={inboxes}
        isLoading={loading}
        onSignOut={onSignOut}
        onAddButton={onAddButton}
        onChatSelected={onChatSelected}
      />
    )
  }
}

export default HomeScreen