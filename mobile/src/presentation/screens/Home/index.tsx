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
import { Recent } from '../../../domain/entities/Recent'
import { Music } from '../../../domain/entities/Music'
import { ILoadMusicsUseCase } from '../../../domain/useCases/ILoadMusicsUseCause'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'

import Card from '../../components/Card'

import styles from './styles'

interface IHomeScreen {
  loadMusics: ILoadMusicsUseCase
  loadRecent: ILoadRecentUseCase
}

function HomeScreen({ loadMusics, loadRecent }: IHomeScreen) {
  const [musics, setMusics] = useState<Music[]>([])
  const [recent, setRecent] = useState<Recent[]>()

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
      const musicPlayed = await loadRecent.execute('@RNplayed')

      if (musicPlayed?.length > 0) {
        const playedJson: Recent[] = musicPlayed.map((music: any) =>
          JSON.parse(music),
        )

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
        <View style={styles.trending}>
          <Text style={[styles.white, styles.categoryText]}>Trending </Text>
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
                  navigation.navigate('Playing', {
                    title: item.snippet.title,
                    img: item.snippet.thumbnails.high.url,
                    id: item.id,
                  })
                }
              />
            )}
          />
        </View>
        <View style={styles.recent}>
          <Text style={[styles.white, styles.categoryText]}>Last played</Text>
          {recent?.map((rec) => (
            <Card
              id={rec.id}
              title={rec.title}
              img={rec.img}
              navigate={() =>
                navigation.navigate('Playing', {
                  title: rec.title,
                  img: rec.img,
                  id: rec.id,
                })
              }
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
