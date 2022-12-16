import { useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Text, useTheme } from 'react-native-paper'

const RightBubble = () => {
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
            Test 123
          </Text>
        </View>
        <Text
          variant='labelSmall'
          style={{
            textAlign: 'right',
            color: theme.colors.outline,
          }}
        >
          12 Jun
        </Text>
      </View>
    </View>
  )
}

export default RightBubble