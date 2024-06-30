import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import type { MovieListProps, Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from './MovieItem'
import useThemeContext from '../../util/useThemeContext'

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

export default function MovieList({
  title,
  path,
  coverType,
}: MovieListProps): JSX.Element {
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
        console.log(errorResponse)
      })
  }

  return (
    <View>
      <View style={styles.header}>
        <View
          style={[
            styles.purpleLabel,
            { backgroundColor: colors.backgrounds.revert },
          ]}
        ></View>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      <FlatList
        style={{
          ...styles.movieList,
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
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
})
