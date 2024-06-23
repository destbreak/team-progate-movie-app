import React from 'react'
import { Text, View } from 'react-native'
import useThemeContext from '../../util/useThemeContext'

export default function CategorySearch(): JSX.Element {
  const { colors } = useThemeContext()

  return (
    <View style={{ backgroundColor: colors.backgrounds.default }}>
      <Text style={{ color: colors.text }}>Category</Text>
    </View>
  )
}
