import React, { useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'

import useThemeContext from '../../util/useThemeContext'
import { API_ACCESS_TOKEN } from '@env'

const CategorySearch = (): JSX.Element => {
  const { colors } = useThemeContext()

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const navigation = useNavigation()
  const pushAction = StackActions.push('CategoryResults', {
    category: selectedCategory,
  })

  useEffect(() => {
    getMovieCategories()
  }, [])

  const getMovieCategories = () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((data) => {
        setCategories(data.genres)
      })
      .catch((error) => console.error(error))
  }

  const handleCategorySelect = (id) => {
    setSelectedCategory(id)
  }

  return (
    <View style={{ backgroundColor: colors.backgrounds.default }}>
      <FlatList
        columnWrapperStyle={styles.row}
        numColumns={2}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.button,
              item.id === selectedCategory && styles.buttonSelected,
            ]}
            onPress={() => handleCategorySelect(item.id)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.dispatch(pushAction)}
      >
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    width: '48%',
  },
  buttonSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    marginVertical: 24,
  },
})

export default CategorySearch
