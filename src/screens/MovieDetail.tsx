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

export default function MovieDetail({ route }: any): JSX.Element {
  const { id } = route.params
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getMovieDetails()
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

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setMovie(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
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
            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          }}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <View style={styles.titleRatingContainer}>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="yellow" />
                <Text style={styles.rating}>
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.movieDescription}>
          <Text>{movie.overview}</Text>
          <View style={styles.movieInfo}>
            <View style={styles.movieInfoItem}>
              <Text style={styles.movieInfoItemTitle}>Original Language</Text>
              <Text>{movie.original_language}</Text>
            </View>
            <View style={styles.movieInfoItem}>
              <Text style={styles.movieInfoItemTitle}>Popularity</Text>
              <Text>{movie.popularity}</Text>
            </View>
            <View style={styles.movieInfoItem}>
              <Text style={styles.movieInfoItemTitle}>Release Date</Text>
              <Text>{movie.release_date}</Text>
            </View>
            <View style={styles.movieInfoItem}>
              <Text style={styles.movieInfoItemTitle}>Vote Count</Text>
              <Text>{movie.vote_count}</Text>
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
    paddingLeft: 10,
    paddingBottom: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
