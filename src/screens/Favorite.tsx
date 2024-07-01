import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import type { Movie } from '../types/app'
import MovieItem from '../components/movies/MovieItem'
import useThemeContext from '../util/useThemeContext'

const Favorite = (): JSX.Element => {
  const { colors } = useThemeContext()

  const [favoriteList, setFavoriteList] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    loadFavorites()
  }, [favoriteList])

  const loadFavorites = async (): Promise<void> => {
    try {
      const storedFavorites: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      if (storedFavorites !== null) {
        const parsedFavorites: Movie[] = JSON.parse(storedFavorites)
        setFavoriteList(parsedFavorites)
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Error loading favorites:', error)
      setIsLoading(false)
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
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgrounds.default },
      ]}
    >
      {favoriteList.length === 0 ? (
        <Text style={[styles.description, { color: colors.text }]}>
          No favorite movies yet.
        </Text>
      ) : (
        <FlatList
          data={favoriteList}
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 16,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
  list: {
    margin: 8,
  },
})

export default Favorite
