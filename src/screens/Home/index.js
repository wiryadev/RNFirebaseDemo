import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import fireDb from '../../data/Database'
import HomeDetail from './detail'

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(null)
  const [inboxes, setInboxes] = useState([])
  const [loading, setLoading] = useState(true)

  function onAuthStateChanged(user) {
    retrieveUserData(user.uid)
    getInboxes(user.uid)
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
  }

  const getInboxes = (userId) => {
    const temps = []

    fireDb.ref(`inboxes/${userId}`)
      .on('value', snapshot => {
        snapshot.forEach(item => {
          fireDb.ref(`users/${item.key}`)
            .once('value')
            .then(userSnapshot => {
              temps.push({
                id: item.key,
                lastMessage: item.val().lastMessage,
                lastMessageAt: item.val().lastMessageAt,
                roomId: item.val().roomId,
                username: userSnapshot.val().name,
              })
            })
        })
      })

    if (temps) setLoading(false)
    setInboxes(temps)
  }

  const onAddButton = () => {
    navigation.navigate('CreateChatScreen')
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
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
      />
    )
  }
}

export default HomeScreen