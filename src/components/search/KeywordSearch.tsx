import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import type { Movie } from '../../types/app'
import MovieItem from '../movies/MovieItem'
import useThemeContext from '../../util/useThemeContext'
import { API_ACCESS_TOKEN } from '@env'

const KeywordSearch = (): JSX.Element => {
  const { colors } = useThemeContext()

  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<Movie[]>([])

  const getMovieList = (keyword: string) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&page=1`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setResults(data.results))
      .catch((error) => console.error(error))
  }

  const handleSearch = () => {
    if (keyword.length > 0) {
      getMovieList(keyword)
    }
  }

  return (
    <View style={{ backgroundColor: colors.backgrounds.default }}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter the keyword"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
        />
        <Feather name="search" size={28} onPress={handleSearch} />
      </View>
      <View style={styles.container}>
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer}>
              <MovieItem
                movie={item}
                size={{ width: 95, height: 160 }}
                coverType="poster"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  input: {
    height: 50,
  },
  container: {
    alignItems: 'center',
    paddingBottom: 176,
    paddingTop: 16,
  },
  itemContainer: {
    margin: 8,
  },
})

export default KeywordSearch
