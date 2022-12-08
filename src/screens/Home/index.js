import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import fireDb from '../../data/Database'
import HomeDetail from './detail'

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(null)
  const [inboxes, setInboxes] = useState([])

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
      .once('value')
      .then(snapshot => {
        snapshot.forEach(item => {
          temps.push({
            id: item.key,
            data: item.val(),
          })
        })
        
        console.log(`inboxes`, temps)
        // snapshot.key.forEach(item => {
        //   fireDb.ref(`inboxes/${userId}/${item}`)
        //     .once('value')
        //     .then(inboxSnapshot => {
        //       console.log('snapshot', inboxSnapshot)
        //       temps.push({
        //         id: item,
        //         inbox: inboxSnapshot.val()
        //       })
        //     })
        // })
      })

    setInboxes(temps)
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
        onSignOut={onSignOut}
      />
    )
  }
}

export default HomeScreen