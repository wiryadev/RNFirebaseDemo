import { useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import dayjs from 'dayjs'

const LeftBubble = ({ data }) => {
  const { width } = useWindowDimensions()
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <View>
        <View
          style={{
            maxWidth: width * 0.6,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: theme.colors.onSecondary,
            borderRadius: 16,
            borderBottomStartRadius: 4,
          }}
        >
          <Text
            variant='bodyMedium'
            style={{
              color: theme.colors.onSecondaryContainer,
            }}
          >
            {data.message}
          </Text>
        </View>
        <Text
          variant='labelSmall'
          style={{
            textAlign: 'left',
            color: theme.colors.outline,
          }}
        >
          {dayjs(data.createdAt).format('HH:mm')}
        </Text>
      </View>
    </View>
  )
}

export default LeftBubble