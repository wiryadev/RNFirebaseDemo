import React from 'react'
import { Avatar, Card } from 'react-native-paper'

const ChatItem = ({
  chat,
  onPress,
}) => {
  return (
    <Card
      onPress={() => onPress(chat.userId)}
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