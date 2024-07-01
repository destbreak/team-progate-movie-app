import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import type { MovieItemProps } from '../../types/app'

const MovieItem = ({ movie, size, coverType }: MovieItemProps): JSX.Element => {
  const navigation = useNavigation()
  const pushAction = StackActions.push('MovieDetail', { id: movie.id })

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(pushAction)
      }}
    >
      <ImageBackground
        resizeMode="cover"
        style={[size, styles.background]}
        imageStyle={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path}`,
        }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradient}
        >
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="yellow" />
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  background: {
    marginRight: 4,
  },
  image: {
    borderRadius: 8,
  },
  gradient: {
    borderRadius: 8,
    display: 'flex',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 8,
  },
  title: {
    color: 'white',
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
  },
})

export default MovieItem
