import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import useThemeContext from '../../util/useThemeContext'
import { API_ACCESS_TOKEN } from '@env'

export default function CategorySearch(): JSX.Element {
  const { colors } = useThemeContext()

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [movieList, setMovieList] = useState([])

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

  const getMovieList = (category) => {
    const url = `https://api.themoviedb.org/3/discover/movie?page=1&with_genres=${category}`
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
        setMovieList(data.results)
      })
      .catch((error) => console.error(error))
  }

  console.log(movieList)

  const handleCategorySelect = (id) => {
    setSelectedCategory(id)
  }

  const handleSearch = () => {
    if (selectedCategory) {
      getMovieList(selectedCategory)
    } else {
      Alert.alert('Category not selected', 'Please select a category')
    }
  }

  return (
    <ScrollView style={{ backgroundColor: colors.backgrounds.default }}>
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
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={movieList}
        renderItem={({ item }) => (
          <Text style={{ color: colors.text }}>{item.title}</Text>
        )}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  button: {
    width: '48%',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#cce5ff',
    borderColor: '#0056b3',
  },
  searchButton: {
    width: '100%',
    paddingVertical: 12,
    marginVertical: 24,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
  },
})
