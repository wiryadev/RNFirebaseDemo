import auth from '@react-native-firebase/auth'
import React, { useEffect, useState } from 'react'
import fireDb from '../../data/Database'
import HomeDetail from './detail'

const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(null)

  function onAuthStateChanged(user) {
    const userData = fireDb.ref(`users/${user.uid}`)
    .once('value')
    .then(snapshot => {
      console.log('userData', snapshot.val())
      setUser({
        uid: user.uid,
        name: snapshot.val().name,
        email: user.email,
      })
    })
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
        onSignOut={onSignOut}
      />
    )
  }
}

export default HomeScreen