import React, { useState } from 'react'
import {
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import type { MovieListProps } from '../types/app'
import MovieList from '../components/movies/MovieList'
import useThemeContext from '../util/useThemeContext'

const movieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theater',
    path: 'movie/now_playing?page=1',
    coverType: 'backdrop',
  },
  {
    title: 'Upcoming Movies',
    path: 'movie/upcoming?page=1',
    coverType: 'poster',
  },
  {
    title: 'Top Rated Movies',
    path: 'movie/top_rated?page=1',
    coverType: 'poster',
  },
  {
    title: 'Popular Movies',
    path: 'movie/popular?page=1',
    coverType: 'poster',
  },
]

const Home = (): JSX.Element => {
  const { colors } = useThemeContext()

  const [modalVisible, setModalVisible] = useState(false)
  const openMarioGitHubProfile = () => {
    Linking.openURL('https://github.com/mariotbg11')
  }

  const openMarioLinkedInProfile = () => {
    Linking.openURL('https://www.linkedin.com/in/mariochristofell')
  }

  const openReynaldiGitHubProfile = () => {
    Linking.openURL('https://github.com/destbreak')
  }

  const openReynaldiLinkedInProfile = () => {
    Linking.openURL('https://www.linkedin.com/in/reyhadiansyah')
  }

  const openTMDBSite = () => {
    Linking.openURL('https://www.themoviedb.org/')
  }

  return (
    <ScrollView style={{ backgroundColor: colors.backgrounds.default }}>
      <View style={styles.container}>
        <Pressable
          style={styles.infoIcon}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="information-circle-outline"
            size={30}
            color={colors.text}
          />
        </Pressable>
        {movieLists.map((movieList) => (
          <MovieList
            title={movieList.title}
            path={movieList.path}
            coverType={movieList.coverType}
            key={movieList.title}
          />
        ))}
        <StatusBar translucent={false} />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.backgrounds.default },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              About This App
            </Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              This is a movie app where you can discover new movies, see the
              most popular and top-rated movies, and find out what is playing in
              theaters now. Enjoy exploring the app!
            </Text>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Features
            </Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              - Search movies by keyword or genre{'\n'}- View detailed
              information about movies{'\n'}- Add movies to your favorite{'\n'}-
              Watch trailers
            </Text>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Developer
            </Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              This app was developed by{' '}
              <Text style={styles.modalTextName}>Mario</Text> and{' '}
              <Text style={styles.modalTextName}>Reynaldi</Text>. Feel free to
              contact us for any questions or feedback.{'\n'}
              <Text style={styles.modalTextName}>Mario : </Text>
              <Text
                style={styles.modalTextLink}
                onPress={openMarioLinkedInProfile}
              >
                LinkedIn
              </Text>{' '}
              |{' '}
              <Text
                style={styles.modalTextLink}
                onPress={openMarioGitHubProfile}
              >
                Github{'\n'}
              </Text>{' '}
              <Text style={styles.modalTextName}>Reynaldi : </Text>
              <Text
                style={styles.modalTextLink}
                onPress={openReynaldiLinkedInProfile}
              >
                LinkedIn
              </Text>{' '}
              |{' '}
              <Text
                style={styles.modalTextLink}
                onPress={openReynaldiGitHubProfile}
              >
                Github
              </Text>{' '}
            </Text>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Acknowledgements
            </Text>
            <Text style={[styles.modalText, { color: colors.text }]}>
              This app uses the{' '}
              <Text style={styles.modalTextLink} onPress={openTMDBSite}>
                TMDB API
              </Text>{' '}
              to provide movie data. Their API is free to use and their
              documentation is great, if you want to build your own movie app
              just visit their site, create account and generate your api.
            </Text>
            <Pressable
              style={[styles.modalButton, styles.modalButtonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    position: 'relative',
    rowGap: 16,
  },
  infoIcon: {
    position: 'absolute',
    right: 10,
    top: 5,
    zIndex: 1,
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
  modalText: {
    lineHeight: 20,
    textAlign: 'center',
  },
  modalTextName: {
    fontWeight: 'bold',
  },
  modalTextLink: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  modalButton: {
    borderRadius: 10,
    elevation: 2,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalButtonClose: {
    backgroundColor: '#2196F3',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default Home
