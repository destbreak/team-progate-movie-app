import React from 'react'
import { Text, StyleSheet, Switch, View } from 'react-native'
import useThemeContext from '../util/useThemeContext'

export default function Settings() {
  const { colors, isSystemTheme, colorTheme, setColorTheme } = useThemeContext()

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgrounds.default },
      ]}
    >
      <View style={styles.row}>
        <Text style={{ color: colors.text }}>Dark Mode</Text>
        <Switch
          disabled={isSystemTheme}
          onValueChange={(on) => setColorTheme(on ? 'dark' : 'light')}
          value={colorTheme === 'dark'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
})
