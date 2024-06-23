import React from 'react'
import { Text, View } from 'react-native'
import useThemeContext from '../../util/useThemeContext'

export default function KeywordSearch(): JSX.Element {
  const { colors } = useThemeContext()

  return (
    <View style={{ backgroundColor: colors.backgrounds.default }}>
      <Text style={{ color: colors.text }}>Keyword</Text>
    </View>
  )
}
