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
  StatusBar,
  StyleSheet,
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
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
  white: {
    color: '#ddd',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight! + 10,
    paddingHorizontal: 20,
    backgroundColor: '#111',
  },

  searchSection: {
    flexDirection: 'row',
    borderBottomColor: '#999',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
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
    paddingTop: 70,
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
})

export default function HomeScreen({ loadMusics, loadRecent }: IHomeScreen) {
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
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <Icon name="search" style={[styles.icon, styles.white]} />
        <TextInput
          style={[styles.input, styles.white]}
          onSubmitEditing={handleSubmit}
        />
      </View>
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
          <Text style={[styles.white, styles.categoryText]}>
            Recentemente tocadas
          </Text>
          {recent?.map((rec) => (
            <Card
              id={rec.id}
              title={rec.title}
              img={rec.img}
              navigate={() =>
                navigation.navigate('Playing', {
                  data: {
                    title: rec.title,
                    img: rec.img,
                    id: rec.id,
                  },
                })
              }
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
