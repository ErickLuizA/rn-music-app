import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Recent } from '../../../domain/entities/Recent'
import { Music } from '../../../domain/entities/Music'
import { ILoadMusicsUseCase } from '../../../domain/useCases/ILoadMusicsUseCause'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'

import Card from '../../components/Card'

interface IHomeScreen {
  loadMusics: ILoadMusicsUseCase
  loadRecent: ILoadRecentUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#111',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },

  icon: {
    fontSize: 26,
    paddingRight: 10,
  },

  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },

  musicSection: {
    paddingTop: 30,
  },

  text: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },

  trending: {
    paddingTop: 20,
  },

  recent: {
    paddingTop: 10,
  },

  categoryText: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
  },

  white: {
    color: '#ddd',
  },
})

export default function HomeScreen({ loadMusics }: IHomeScreen) {
  const [musics, setMusics] = useState<Music[]>([])
  // const [recent, setRecent] = useState<Recent[]>()

  const navigation = useNavigation()

  useEffect(() => {
    async function getMusics() {
      try {
        const response = await loadMusics.execute({
          part: 'snippet',
          videoCategoryId: '10',
          chart: 'mostPopular',
          maxResults: 20,
          key: process.env.API_KEY!,
        })

        setMusics(response.items)
      } catch (err) {
        console.log(err)
      }
    }

    getMusics()
  }, [loadMusics])

  // useFocusEffect(() => {
  //   async function getRecentPlayed() {
  //     const musicPlayed = await loadRecent.execute('@RNplayed')

  //     // if (musicPlayed?.length > 0) {
  //     //   const playedJson: Recent[] = musicPlayed.map((music: any) =>
  //     //     JSON.parse(music),
  //     //   )

  //     setRecent(musicPlayed)
  //   }

  //   getRecentPlayed()
  // })

  if (musics.length < 1) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.musicSection}>
        <View style={styles.trending}>
          <Text style={[styles.white, styles.categoryText]}>Tendência </Text>
          <FlatList
            data={musics}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                title={item.snippet.title}
                img={item.snippet.thumbnails.high.url}
                navigate={() =>
                  navigation.navigate('Player', {
                    data: {
                      title: item.snippet.title,
                      img: item.snippet.thumbnails.high.url,
                      id: item.id,
                    },
                  })
                }
              />
            )}
          />
        </View>
        <View style={styles.recent}>
          <Text style={[styles.white, styles.categoryText]}>
            Recentemente tocadas
          </Text>
          {/* <FlatList
            data={recent}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                title={item.title}
                img={item.img}
                navigate={() =>
                  navigation.navigate('Playing', {
                    data: {
                      title: item.title,
                      img: item.img,
                      id: item.id,
                    },
                  })
                }
              />
            )}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  )
}
