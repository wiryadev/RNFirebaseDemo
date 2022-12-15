import { FlatList, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, Appbar, Button, Text, useTheme } from 'react-native-paper'
import UserItem from '../../../components/UserItem'

const Detail = ({
  users = [],
  selectedId,
  onSelectId,
  onBackPress,
  onStartChat,
  isLoading,
}) => {
  const theme = useTheme()

  return (
    <View
      style={{ flex: 1 }}
    >
      <Appbar.Header
        style={{ backgroundColor: theme.colors.primaryContainer }}
      >
        <Appbar.BackAction onPress={onBackPress} />
        <Appbar.Content title="Add New Chat" />
      </Appbar.Header>
      {isLoading
        ? <ActivityIndicator size='large' />
        : <FlatList
          data={users}
          keyExtractor={(_, index) => `user-${index}`}
          ListEmptyComponent={() => (
            <View style={{
              padding: 24
            }}>
              <Text>Welcome</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <UserItem
              data={item}
              isSelected={selectedId === item.id}
              onPress={() => onSelectId(item.id)}
            />
          )}
        />
      }
      {!!selectedId &&
        <Button
          onPress={onStartChat}
          mode='contained-tonal'
          style={{
            margin: 16,
          }}
        >
          Start Chat
        </Button>
      }
    </View>
  )
}

export default Detail