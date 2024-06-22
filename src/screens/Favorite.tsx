import React from 'react'
import { Text, View } from 'react-native'
import useThemeContext from '../util/useThemeContext'

export default function Favorite(): JSX.Element {
  const { colors } = useThemeContext()

  return (
    <View style={{ backgroundColor: colors.backgrounds.default }}>
      <Text>Favorite</Text>
    </View>
  )
}
