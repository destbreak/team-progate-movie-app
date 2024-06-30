import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import YoutubePlayer from 'react-native-youtube-iframe'
import { FontAwesome } from '@expo/vector-icons'
import MovieList from '../components/movies/MovieList'
import useThemeContext from '../util/useThemeContext'
import { Movie } from '../types/app'
import { API_ACCESS_TOKEN } from '@env'

export default function MovieDetail({ route }: any): JSX.Element {
  const { colors } = useThemeContext()

  const { id } = route.params
  const [movie, setMovie] = useState<any | null>(null)
  const [movieTrailer, setMovieTrailer] = useState()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    getMovieDetails()
    getMovieTrailer()
    checkIsFavorite(id).then(setIsFavorite)
  }, [])

  const getMovieDetails = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
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
        console.log(errorResponse)
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
        console.log(errorResponse)
      })
  }

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      console.log(initialData)

      let favMovieList: Movie[] = []

      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      console.log(initialData)

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
      console.log(error)
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
      console.log(error)
      return false
    }
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: colors.backgrounds.default }}>
      <YoutubePlayer height={225} play={false} videoId={movieTrailer} />
      <View style={styles.titleRatingContainer}>
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
  backgroundImage: {
    height: 250,
  },
  backgroundImageStyle: {
    borderRadius: 0,
  },
  titleRatingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  favIcon: {
    alignSelf: 'center',
    paddingRight: 10,
    paddingBottom: 3,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    maxWidth: 300,
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    color: 'orange',
    fontWeight: '700',
  },
  movieDescription: {
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  movieInfo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 5,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  movieInfoItem: {
    width: '50%',
  },
  movieInfoItemTitle: {
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
