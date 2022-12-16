import { useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import dayjs from 'dayjs'

const RightBubble = ({ data }) => {
  const { width } = useWindowDimensions()
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <View>
        <View
          style={{
            maxWidth: width * 0.6,
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: theme.colors.primaryContainer,
            borderRadius: 16,
            borderBottomEndRadius: 4,
          }}
        >
          <Text
            variant='bodyMedium'
            style={{
              color: theme.colors.onPrimaryContainer,
            }}
          >
            {data.message}
          </Text>
        </View>
        <Text
          variant='labelSmall'
          style={{
            textAlign: 'right',
            color: theme.colors.outline,
          }}
        >
          {dayjs(data.createdAt).format('HH:mm')}
        </Text>
      </View>
    </View>
  )
}

export default RightBubble