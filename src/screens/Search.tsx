import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useThemeContext from '../util/useThemeContext'
import KeywordSearch from '../components/search/KeywordSearch'
import CategorySearch from '../components/search/CategorySearch'

export default function Search(): JSX.Element {
  const { colors } = useThemeContext()

  const [selectedBar, setSelectedBar] = useState<string>('keyword')

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgrounds.default },
      ]}
    >
      <View style={styles.topBarContainer}>
        {['keyword', 'category'].map((item: string, index: number) => (
          <TouchableOpacity
            style={styles.topBar}
            key={item}
            activeOpacity={1}
            onPress={() => {
              setSelectedBar(item)
            }}
          >
            <Text style={[styles.topBarLabel, { color: colors.text }]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedBar === 'keyword' ? <KeywordSearch /> : <CategorySearch />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 60,
  },
  topBarLabel: {
    textTransform: 'capitalize',
  },
})
