import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, TextInput, useTheme } from 'react-native-paper';
import Spacer from '../../components/Spacer';

const SignUpScreen = ({ navigation }) => {

  const theme = useTheme()

  const [isLoading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignUp = () => {
    setLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }]
        })
      })
      .catch(error => {
        let message = 'Unknown Error'
        if (error.code === 'auth/email-already-in-use') {
          message = 'That email address is already in use!'
        }

        if (error.code === 'auth/invalid-email') {
          message = 'That email address is invalid!'
        }

        setLoading(false)
        Alert.alert(message)
        console.error(error);
      })
  }

  return (
    <View
      style={{ flex: 1 }}
    >
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.Content title="Sign Up" />
      </Appbar.Header>
      <View style={{ paddingHorizontal: 24, paddingTop: 32, }}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          onChangeText={text => setEmail(text)}
        />
        <Spacer height={16} />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <Spacer height={48} />
        {isLoading
          ? <ActivityIndicator
            animating
          />
          : <Button
            mode="contained-tonal"
            onPress={onSignUp}
          >
            Sign Up
          </Button>
        }
      </View>
    </View>
  )
}

export default SignUpScreen