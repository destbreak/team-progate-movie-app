import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import YoutubePlayer from 'react-native-youtube-iframe'
import { FontAwesome } from '@expo/vector-icons'

import type { Movie } from '../types/app'
import MovieList from '../components/movies/MovieList'
import useThemeContext from '../util/useThemeContext'
import { API_ACCESS_TOKEN } from '@env'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { colors } = useThemeContext()

  const { id } = route.params
  const [movie, setMovie] = useState<Movie>()
  const [movieTrailer, setMovieTrailer] = useState()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    getMovieDetails()
    getMovieTrailer()
    checkIsFavorite(id).then(setIsFavorite)
  }, [])

  const getMovieDetails = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
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
        setMovie(response)
        setIsLoading(false)
      })
      .catch((errorResponse) => {
        console.error(errorResponse)
        setIsLoading(false)
      })
  }

  const getMovieTrailer = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        const trailer = response.results.find(
          (video) => video.type === 'Trailer',
        )
        setMovieTrailer(trailer?.key)
      })
      .catch((errorResponse) => {
        console.error(errorResponse)
      })
  }

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      let favMovieList: Movie[] = []

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.error(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        const updatedFavMovieList = favMovieList.filter(
          (favMovie) => favMovie.id !== id,
        )
        await AsyncStorage.setItem(
          '@FavoriteList',
          JSON.stringify(updatedFavMovieList),
        )
        setIsFavorite(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const toggleFavorite = (): void => {
    if (isFavorite && movie) {
      removeFavorite(id).then(() => setIsFavorite(false))
    } else if (movie) {
      addFavorite(movie).then(() => setIsFavorite(true))
    }
  }

  const checkIsFavorite = async (id: number): Promise<boolean> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        return favMovieList.some((favMovie) => favMovie.id === id)
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }

  if (isLoading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.backgrounds.default },
        ]}
      >
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: colors.backgrounds.default }}>
      <YoutubePlayer height={225} play={false} videoId={movieTrailer} />
      <View style={styles.movieHeader}>
        <View>
          <Text style={[styles.movieTitle, { color: colors.text }]}>
            {movie?.title}
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="orange" />
            <Text style={styles.rating}>{movie?.vote_average.toFixed(1)}</Text>
          </View>
        </View>
        <FontAwesome
          name={isFavorite ? 'heart' : 'heart-o'}
          size={24}
          color={'pink'}
          style={styles.favIcon}
          onPress={toggleFavorite}
        />
      </View>
      <View style={styles.movieDescription}>
        <Text style={{ color: colors.text }}>{movie?.overview}</Text>
        <View style={styles.movieInfo}>
          <View style={styles.movieInfoItem}>
            <Text style={[styles.movieInfoItemTitle, { color: colors.text }]}>
              Original Language
            </Text>
            <Text style={{ color: colors.text }}>
              {movie?.original_language}
            </Text>
          </View>
          <View style={styles.movieInfoItem}>
            <Text style={[styles.movieInfoItemTitle, { color: colors.text }]}>
              Popularity
            </Text>
            <Text style={{ color: colors.text }}>{movie?.popularity}</Text>
          </View>
          <View style={styles.movieInfoItem}>
            <Text style={[styles.movieInfoItemTitle, { color: colors.text }]}>
              Release Date
            </Text>
            <Text style={{ color: colors.text }}>{movie?.release_date}</Text>
          </View>
          <View style={styles.movieInfoItem}>
            <Text style={[styles.movieInfoItemTitle, { color: colors.text }]}>
              Vote Count
            </Text>
            <Text style={{ color: colors.text }}>{movie?.vote_count}</Text>
          </View>
        </View>
      </View>
      <MovieList
        title="Recommended Movies"
        path={`movie/${id}/recommendations?language=en-US&page=1`}
        coverType="poster"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  movieHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    maxWidth: 300,
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  rating: {
    color: 'orange',
    fontWeight: '700',
  },
  favIcon: {
    alignSelf: 'center',
    paddingRight: 10,
  },
  movieDescription: {
    marginBottom: 20,
    paddingHorizontal: 18,
  },
  movieInfo: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    rowGap: 5,
  },
  movieInfoItem: {
    width: '50%',
  },
  movieInfoItemTitle: {
    fontWeight: 'bold',
  },
})

export default MovieDetail
