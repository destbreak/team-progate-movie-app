import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

import type { Movie } from '../types/app'
import MovieItem from '../components/movies/MovieItem'
import useThemeContext from '../util/useThemeContext'
import { API_ACCESS_TOKEN } from '@env'

const CategoryResults = ({ route }: any): JSX.Element => {
  const { colors } = useThemeContext()

  const { category } = route.params
  const [movieList, setMovieList] = useState<Movie[]>([])

  useEffect(() => {
    getMovieList()
  }, [])

  const getMovieList = () => {
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

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgrounds.default },
      ]}
    >
      <FlatList
        data={movieList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.list}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
  },
  list: {
    margin: 8,
  },
})

export default CategoryResults
