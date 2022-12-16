import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import fireDb from '../../data/Database'
import HomeDetail from './detail'

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(null)
  const [inboxes, setInboxes] = useState([])
  const [loading, setLoading] = useState(true)

  // function onAuthStateChanged(user) {
  //   retrieveUserData(user.uid)
  //   getInboxes(user.uid)
  // }

  const onRefresh = () => {
    setInboxes([])
    const userId = auth().currentUser?.uid
    retrieveUserData(userId)
    getInboxes(userId)
  }

  const retrieveUserData = (userId) => {
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

  const getInboxes = (userId) => {
    fireDb.ref(`inboxes/${userId}`)
      .on('value', async snapshot => {
        snapshot.forEach(item => {
          fireDb.ref(`users/${item.key}`)
            .once('value')
            .then(userSnapshot => {
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
            })
        })
      })
  }

  const onAddButton = () => {
    navigation.navigate('CreateChatScreen')
  }

  const onChatSelected = (userId, roomId) => {
    navigation.navigate('RoomChatScreen', {
      userId: userId,
      roomId: roomId,
    })
  }

  useEffect(() => {
    onRefresh()
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    // return subscriber
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
        onRefresh={onRefresh}
        onChatSelected={onChatSelected}
      />
    )
  }
}

export default HomeScreen