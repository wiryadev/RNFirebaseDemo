import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Appbar, Button, FAB, Text, useTheme } from 'react-native-paper'
import ChatItem from '../../components/ChatItem'

const HomeDetail = ({
  user,
  inboxes,
  isLoading,
  onSignOut,
  onAddButton,
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
      {isLoading
        ? <ActivityIndicator
          size='large'
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center'
          }}
          animating
        />
        : <FlatList
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
      }
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