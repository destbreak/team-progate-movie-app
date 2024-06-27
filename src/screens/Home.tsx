import React, { useState } from 'react'
import {
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  Text,
  Linking,
} from 'react-native'
import type { MovieListProps } from '../types/app'
import MovieList from '../components/movies/MovieList'
import { Ionicons } from '@expo/vector-icons'

const movieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theater',
    path: 'movie/now_playing?language=en-US&page=1',
    coverType: 'backdrop',
  },
  {
    title: 'Upcoming Movies',
    path: 'movie/upcoming?language=en-US&page=1',
    coverType: 'poster',
  },
  {
    title: 'Top Rated Movies',
    path: 'movie/top_rated?language=en-US&page=1',
    coverType: 'poster',
  },
  {
    title: 'Popular Movies',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
  },
]

export default function Home(): JSX.Element {
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
    <ScrollView>
      <Pressable style={styles.infoIcon} onPress={() => setModalVisible(true)}>
        <Ionicons name="information-circle-outline" size={30} color="black" />
      </Pressable>

      <View style={styles.container}>
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>About This App</Text>
            <Text style={styles.text}>
              This is a movie app where you can discover new movies, see the
              most popular and top-rated movies, and find out what's playing in
              theaters now. Enjoy exploring the app!
            </Text>
            <Text style={styles.title}>Features</Text>
            <Text style={styles.text}>
              - Search movies by keyword or genre{'\n'}- View detailed
              information about movies{'\n'}- Add movies to your favorite{'\n'}-
              Watch trailers
            </Text>
            <Text style={styles.title}>Developer</Text>
            <Text style={styles.text}>
              This app was developed by <Text style={styles.name}>Mario</Text>{' '}
              and <Text style={styles.name}>Reynaldi</Text>. Feel free to
              contact us for any questions or feedback.{'\n'}
              <Text style={styles.name}>Mario : </Text>
              <Text style={styles.linkText} onPress={openMarioLinkedInProfile}>
                LinkedIn
              </Text>{' '}
              |{' '}
              <Text style={styles.linkText} onPress={openMarioGitHubProfile}>
                Github{'\n'}
              </Text>{' '}
              <Text style={styles.name}>Reynaldi : </Text>
              <Text
                style={styles.linkText}
                onPress={openReynaldiLinkedInProfile}
              >
                LinkedIn
              </Text>{' '}
              |{' '}
              <Text style={styles.linkText} onPress={openReynaldiGitHubProfile}>
                Github
              </Text>{' '}
            </Text>
            <Text style={styles.title}>Acknowledgements</Text>
            <Text style={styles.text}>
              This app uses the{' '}
              <Text style={styles.linkText} onPress={openTMDBSite}>
                TMDB API
              </Text>{' '}
              to provide movie data. Their API is free to use and their
              documentation is great, if you want to build your own movie app
              just visit their site, create account and generate your api.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },

  infoIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
    zIndex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    lineHeight: 20,
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  name: {
    fontWeight: 'bold',
  },
})
