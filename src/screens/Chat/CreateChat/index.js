import auth from '@react-native-firebase/auth';
import { useEffect, useState } from "react"
import fireDb from "../../../data/Database"
import Detail from "./detail"

const CreateChatScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  const onBackPress = () => {
    navigation.goBack()
  }

  const onStartChat = () => {}

  useEffect(() => {
    fireDb.ref('/users')
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const rawResponse = snapshot.val()
          const keys = Object.keys(rawResponse)
          const values = keys.reduce((acc, key) =>
            [
              ...acc,
              {
                ...rawResponse[key],
                id: key,
              }
            ],
            []
          )
          console.log('values', values)
          setUsers(values.filter(item => item.id !== auth().currentUser?.uid))
        }
      })
  }, [])

  return (
    <Detail
      users={users}
      selectedId={selectedId}
      onSelectId={setSelectedId}
      onBackPress={onBackPress}
      onStartChat={onStartChat}
    />
  )

}

export default CreateChatScreen