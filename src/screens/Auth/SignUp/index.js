import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { ActivityIndicator, Appbar, Button, TextInput, useTheme } from 'react-native-paper';
import Spacer from '../../../components/Spacer';
import TextField from '../../../components/TextField';
import Form from '../form';

const SignUpScreen = ({ navigation }) => {

  const initialValues = {
    email: '',
    password: '',
  }

  const theme = useTheme()

  const [isLoading, setLoading] = useState(false)

  const onSignUp = (values) => {
    setLoading(true)
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
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
        <Form 
        buttonLabel="Sign Up"
        initialValues={initialValues}
        onSubmit={onSignUp}
        isLoading={isLoading}
        />
      </View>
    </View>
  )
}

export default SignUpScreen