import React from 'react'
import { FlatList, View } from 'react-native'
import { Appbar, Button, Text, useTheme } from 'react-native-paper'
import ChatItem from '../../components/ChatItem'

const HomeDetail = ({
  user,
  inboxes,
  onSignOut,
}) => {
  const theme = useTheme()

  console.log('Detail', inboxes)

  return (
    <View
      style={{ flex: 1 }}
    >
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.Content title={user.name} />
        <Appbar.Action
          icon='logout-variant'
          onPress={onSignOut}
        />
      </Appbar.Header>
      <FlatList
        data={inboxes || []}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, padding: 32, alignItems: 'center' }}>
            <Text>Data is Empty</Text>
          </View>
        )}
        renderItem={
          ({ item }) => (
            <ChatItem chat={item} />
          )}
      />
    </View>
  )
}

export default HomeDetail