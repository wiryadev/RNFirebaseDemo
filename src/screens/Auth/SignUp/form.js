import { View, Text } from 'react-native'
import React from 'react'
import TextField from '../../../components/TextField'
import Spacer from '../../../components/Spacer'
import { ActivityIndicator, Button } from 'react-native-paper'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './validationSchema'

const Form = ({
  buttonLabel,
  initialValues,
  onSubmit,
  isLoading,
}) => {

  const form = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  })

  const { control, handleSubmit } = form

  return (
    <View>
      <TextField
          name="email"
          label="Email"
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          control={control}
        />
        <Spacer height={16} />
        <TextField
          name="password"
          label="Password"
          secureTextEntry
          control={control}
        />
        <Spacer height={16} />
        <TextField
          name="confirm_password"
          label="Confirm Password"
          secureTextEntry
          control={control}
        />
        <Spacer height={48} />
        {isLoading
          ? <ActivityIndicator
            animating
          />
          : <Button
            mode="contained-tonal"
            onPress={handleSubmit(onSubmit)}
          >
            {buttonLabel}
          </Button>
        }
    </View>
  )
}

export default Form