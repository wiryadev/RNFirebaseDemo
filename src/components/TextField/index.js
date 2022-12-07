import { ErrorMessage } from '@hookform/error-message'
import { useController } from "react-hook-form"
import { View } from "react-native"
import { HelperText, TextInput } from "react-native-paper"

const TextField = ({
  name, control, defaultValue, ...props
}) => {
  const { field, formState: { errors } } = useController({ control, name, defaultValue })

  return (
    <View>
      <TextInput
        mode="outlined"
        ref={field.ref}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        value={field.value}
        {...props}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <HelperText type="error" visible={!!message} style={{ fontSize: 12 }}>
            {message}
          </HelperText>
        )}
      />
    </View>
  )
}

export default TextField
