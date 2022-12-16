import React from 'react'
import { Avatar, Card } from 'react-native-paper'

const ChatItem = ({
  chat,
  onPress,
}) => {
  console.log('chat', chat)
  return (
    <Card
      onPress={() => onPress(chat.id, chat.roomId)}
    >
      <Card.Title
        title={chat.username}
        subtitle={chat.lastMessage}
        left={(props) => <Avatar.Icon {...props} icon="account" />}
      />
    </Card>
  )
}

export default ChatItem