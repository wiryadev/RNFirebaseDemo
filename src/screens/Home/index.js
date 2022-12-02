import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth';


const HomeScreen = ({ navigation }) => {

  const onSignOut = () => {
    auth()
      .signOut()
      .then(() => navigation.replace('SignInScreen'));
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Button
        mode='contained-tonal'
        onPress={onSignOut}
      >
        Sign Out
      </Button>
    </View>
  )
}

export default HomeScreen