import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { Music } from '../../../domain/entities/Music'
import { ILoadMusicsUseCase } from '../../../domain/useCases/ILoadMusicsUseCause'

import AsyncStorage from '@react-native-community/async-storage'
import Card from '../../components/Card'

import styles from './styles'

interface IHomeScreen {
  loadMusics: ILoadMusicsUseCase
}

interface IRecent {
  id: number
  img: string
  title: string
}

function HomeScreen({ loadMusics }: IHomeScreen) {
  const [musics, setMusics] = useState<Music[]>([])
  const [recent, setRecent] = useState<IRecent>()

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

  useFocusEffect(() => {
    async function getRecentPlayed() {
      const musicPlayed = await AsyncStorage.getItem('@RNplayed')

      if (musicPlayed) {
        const playedJson = JSON.parse(musicPlayed)

        setRecent(playedJson)
      }
    }

    getRecentPlayed()
  })

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    navigation.navigate('Search', { searchTerm: e.nativeEvent.text })
  }

  if (musics.length < 1) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <AntDesign name="search1" style={[styles.icon, styles.white]} />
        <TextInput
          style={[styles.input, styles.white]}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.musicSection}>
        <Text style={[styles.text, styles.white]}>Music </Text>
        <View style={styles.trending}>
          <Text style={[styles.white, styles.categoryText]}>Trending </Text>
          <FlatList
            data={musics}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            renderItem={({ item }) => (
              <Card
                title={item.snippet.title}
                img={item.snippet.thumbnails.high.url}
                navigate={() =>
                  navigation.navigate('Playing', {
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
          <Text style={[styles.white, styles.categoryText]}>Last played</Text>
          {recent && (
            <Card
              title={recent.title}
              img={recent.img}
              navigate={() =>
                navigation.navigate('Playing', {
                  data: { title: recent.title, img: recent.img, id: recent.id },
                })
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
