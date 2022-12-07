import { object as yupObject, string as yupString } from 'yup'


const authValidationSchema = yupObject().shape({
  email: yupString().required('Email Tidak Boleh Kosong').email(),
  password: yupString().required('Password Tidak Boleh Kosong').min(6),
})

export default authValidationSchema