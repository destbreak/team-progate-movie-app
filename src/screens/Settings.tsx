import React from 'react'
import { Text, StyleSheet, Switch, View } from 'react-native'
import useThemeContext from '../util/useThemeContext'

export default function Settings() {
  const { colors, isSystemTheme, systemTheme, colorTheme, setColorTheme } =
    useThemeContext()

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgrounds.default },
      ]}
    >
      <View style={[styles.heading, { borderColor: colors.text }]}>
        <Text style={[styles.headingText, { color: colors.text }]}>Theme</Text>
      </View>
      <View style={styles.row}>
        <Text style={{ color: colors.text }}>Follow device setting</Text>
        <Switch
          onValueChange={(on) => setColorTheme(on ? null : systemTheme)}
          value={isSystemTheme}
        />
      </View>
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
  heading: {
    borderBottomWidth: 1,
  },
  headingText: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: 600,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
})
