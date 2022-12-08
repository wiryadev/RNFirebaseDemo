import React from 'react'
import { Avatar, Card } from 'react-native-paper'

const ChatItem = ({ chat }) => {
  return (
    <Card.Title
      title={chat.username}
      subtitle={chat.lastMessage}
      left={(props) => <Avatar.Icon {...props} icon="folder" />}
    />
  )
}

export default ChatItem