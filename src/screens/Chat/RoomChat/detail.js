import React from 'react'
import { FlatList, View } from 'react-native'
import { Appbar, TextInput, useTheme } from 'react-native-paper'
import LeftBubble from '../../../components/ChatBubble/LeftBubble'
import RightBubble from '../../../components/ChatBubble/RightBubble'
import Spacer from '../../../components/Spacer'

const Detail = ({
  message,
  onMessageChange,
  onBackPress,
  onSendChat,
}) => {
  const theme = useTheme()

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.BackAction onPress={onBackPress} />
        <Appbar.Content title="Room Chat" />
      </Appbar.Header>
      <FlatList
        data={[0, 1, 2, 3, 1, 2, 3, 1, 1, 2, 2, 3, 4, 2]}
        inverted={true}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
        }}
        keyExtractor={(_, index) => `message-${index}`}
        ItemSeparatorComponent={() => <Spacer height={12} />}
        renderItem={({ item }) => (
          (item % 2 !== 0)
            ? <LeftBubble />
            : <RightBubble />
        )}
      />
      <TextInput
        mode='outlined'
        placeholder='Chat'
        value={message}
        onChangeText={text => onMessageChange(text)}
        textColor={theme.colors.onSecondaryContainer}
        right={
          <TextInput.Icon
            icon='send'
            color={theme.colors.onSecondaryContainer}
            onPress={onSendChat}
          />
        }
        style={{
          margin: 16,
          marginTop: 0,
        }}
        outlineStyle={{
          borderRadius: 32,
          backgroundColor: theme.colors.secondaryContainer,
          borderColor: 'transparent',
        }}
      />
    </View>
  )
}

export default Detail