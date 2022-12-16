import { useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'

const LeftBubble = () => {
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
            Test 123
          </Text>
        </View>
        <Text
          variant='labelSmall'
          style={{
            textAlign: 'left',
            color: theme.colors.outline,
          }}
        >
          12 Jun
        </Text>
      </View>
    </View>
  )
}

export default LeftBubble