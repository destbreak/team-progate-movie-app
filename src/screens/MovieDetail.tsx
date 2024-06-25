import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import { API_ACCESS_TOKEN } from '@env'
import MovieList from '../components/movies/MovieList'
import { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MovieDetail({ route }: any): JSX.Element {
  const { id } = route.params
  const [movie, setMovie] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    getMovieDetails()
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
    <ScrollView>
      <View>
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
          }}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <View style={styles.titleRatingContainer}>
              <View>
                <Text style={styles.movieTitle}>{movie?.title}</Text>
                <View style={styles.ratingContainer}>
                  <FontAwesome name="star" size={16} color="yellow" />
                  <Text style={styles.rating}>
                    {movie?.vote_average.toFixed(1)}
                  </Text>
                </View>
              </View>
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={24}
                color={isFavorite ? 'pink' : 'white'}
                style={styles.favIcon}
                onPress={toggleFavorite}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.movieDescription}>
          <Text>{movie?.overview}</Text>
          <View style={styles.movieInfo}>
            <View style={styles.movieInfoItem}>
              <Text style={styles.movieInfoItemTitle}>Original Language</Text>
              <Text>{movie?.original_language}</Text>
            </View>
            <View style={styles.movieInfoItem}>
              <Text style={styles.movieInfoItemTitle}>Popularity</Text>
              <Text>{movie?.popularity}</Text>
            </View>
            <View style={styles.movieInfoItem}>
              <Text style={styles.movieInfoItemTitle}>Release Date</Text>
              <Text>{movie?.release_date}</Text>
            </View>
            <View style={styles.movieInfoItem}>
              <Text style={styles.movieInfoItemTitle}>Vote Count</Text>
              <Text>{movie?.vote_count}</Text>
            </View>
          </View>
        </View>
        <MovieList
          title="Recommended Movies"
          path={`movie/${id}/recommendations?language=en-US&page=1`}
          coverType="poster"
        />
      </View>
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
    paddingLeft: 10,
    paddingBottom: 10,
  },
  favIcon: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    paddingBottom: 3,
  },
  movieTitle: {
    color: 'white',
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
    color: 'yellow',
    fontWeight: '700',
  },
  movieDescription: {
    padding: 18,
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
