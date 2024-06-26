import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import useThemeContext from '../util/useThemeContext'
import MovieItem from '../components/movies/MovieItem'
import { API_ACCESS_TOKEN } from '@env'

export default function CategoryResults({ route }): JSX.Element {
  const { colors } = useThemeContext()

  const { category } = route.params
  console.log(category)

  const [movieList, setMovieList] = useState([])

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
    <View style={{ backgroundColor: colors.backgrounds.default }}>
      <FlatList
        data={movieList}
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
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 8,
    alignItems: 'center',
  },
  list: {
    paddingBottom: 100,
  },
})
