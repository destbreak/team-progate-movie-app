import React, { useState } from 'react'
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import useThemeContext from '../../util/useThemeContext'
import MovieItem from '../movies/MovieItem'
import { API_ACCESS_TOKEN } from '@env'

export default function KeywordSearch(): JSX.Element {
  const { colors } = useThemeContext()

  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])

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
          placeholder="Masukkan kata kunci"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
        />
        <Feather name="search" size={28} />
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
          keyExtractor={(item) => `${item.id}`}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    height: 50,
  },
  container: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  itemContainer: {
    margin: 8,
  },
})
