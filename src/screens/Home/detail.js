import React from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { Appbar, FAB, useTheme } from 'react-native-paper'
import ChatItem from '../../components/ChatItem'

const HomeDetail = ({
  user,
  inboxes,
  isLoading,
  onSignOut,
  onAddButton,
  onRefresh,
  onChatSelected,
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
        data={inboxes}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => (
          <ChatItem
            chat={item}
            onPress={onChatSelected}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={onAddButton}
      />
    </View>
  )
}

export default HomeDetail

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})