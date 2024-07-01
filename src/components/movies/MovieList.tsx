import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import type { MovieListProps, Movie } from '../../types/app'
import MovieItem from './MovieItem'
import useThemeContext from '../../util/useThemeContext'
import { API_ACCESS_TOKEN } from '@env'

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
}

const MovieList = ({ title, path, coverType }: MovieListProps): JSX.Element => {
  const { colors } = useThemeContext()

  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    getMovieList()
  }, [])

  const getMovieList = (): void => {
    const url = `https://api.themoviedb.org/3/${path}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovies(response.results)
      })
      .catch((errorResponse) => {
        console.error(errorResponse)
      })
  }

  return (
    <View>
      <View style={styles.header}>
        <View
          style={[
            styles.iconTitle,
            { backgroundColor: colors.backgrounds.revert },
          ]}
        ></View>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      <FlatList
        style={{
          ...styles.list,
          maxHeight: coverImageSize[coverType].height,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={movies}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            size={coverImageSize[coverType]}
            coverType={coverType}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 8,
  },
  iconTitle: {
    borderRadius: 20,
    height: 40,
    marginRight: 8,
    width: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  list: {
    marginTop: 8,
    paddingLeft: 8,
  },
})

export default MovieList
