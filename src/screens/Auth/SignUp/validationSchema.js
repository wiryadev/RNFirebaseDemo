import { object as yupObject, string as yupString, ref } from 'yup'

const validationSchema = yupObject().shape({
  email: yupString().required('Email Tidak Boleh Kosong').email(),
  password: yupString().required('Password Tidak Boleh Kosong').min(6),
  confirm_password: yupString().oneOf(
    [ref('password'), null],
    'Password harus sama'
  ),
})

export default validationSchema