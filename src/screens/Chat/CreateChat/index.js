import utc from 'dayjs/plugin/utc'
import auth from '@react-native-firebase/auth'
import dayjs from 'dayjs';
import { useEffect, useState } from "react"
import fireDb from "../../../data/Database"
import Detail from "./detail"

dayjs.extend(utc)

const CreateChatScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(false)

  const onBackPress = () => {
    navigation.goBack()
  }

  const onStartChat = () => {
    setLoading(true)
    fireDb.ref(`/inboxes/${auth().currentUser?.uid}/${selectedId}`)
      .set({
        lastMessage: '',
        lastMessageAt: dayjs.utc().format(),
        roomId: new Date().getTime(),
        userId: selectedId,
      })
      .then(() => {
        navigation.replace('RoomChatScreen', {
          selectedId: selectedId,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
      isLoading={loading}
    />
  )

}

export default CreateChatScreen