import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Music } from '../../../domain/entities/Music'
import { ILoadMusicsUseCase } from '../../../domain/useCases/ILoadMusicsUseCause'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'

import Card from '../../components/Card'

import styles from './styles'

interface IHomeScreen {
  loadMusics: ILoadMusicsUseCase
  loadRecent: ILoadRecentUseCase
}

export default function HomeScreen({ loadMusics, loadRecent }: IHomeScreen) {
  const [musics, setMusics] = useState<Music[]>([])
  const [recent, setRecent] = useState<Music[]>([])

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const navigation = useNavigation()

  const handleGetMusics = useCallback(async () => {
    try {
      const response = await loadMusics.execute({
        part: 'snippet',
        videoCategoryId: '10',
        chart: 'mostPopular',
        maxResults: 20,
        key: process.env.API_KEY ?? '',
      })

      setMusics(response)
    } catch (error) {
      ToastAndroid.show('Erro ao buscar músicas', ToastAndroid.SHORT)
    }

    setLoading(false)
  }, [loadMusics])

  const handleGetRecentPlayed = useCallback(async () => {
    try {
      const musicPlayed = await loadRecent.execute()

      setRecent(musicPlayed)
    } catch (error) {
      ToastAndroid.show(
        'Erro ao buscar recentemente tocados',
        ToastAndroid.SHORT,
      )
    }
  }, [loadRecent])

  const handleRefresh = async () => {
    setRefreshing(true)

    await handleGetMusics()

    setRefreshing(false)
  }

  const handleNavigateToPlayer = (item: Music) => {
    navigation.navigate('Player', {
      item,
    })
  }

  useEffect(() => {
    handleGetMusics()
    handleGetRecentPlayed()
  }, [handleGetMusics, handleGetRecentPlayed])

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sections}>
        <View style={styles.trending}>
          <Text style={[styles.white, styles.categoryText]}>Tendência</Text>
          <FlatList
            refreshing={refreshing}
            onRefresh={handleRefresh}
            data={musics}
            keyExtractor={item => item.id}
            horizontal={true}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                title={item.title}
                img={item.image}
                onPress={() => handleNavigateToPlayer(item)}
              />
            )}
          />
        </View>
        {recent?.length > 0 ? (
          <View style={styles.recent}>
            <Text style={[styles.white, styles.categoryText]}>
              Recentemente tocadas
            </Text>
            <FlatList
              data={recent}
              keyExtractor={item => item.id}
              horizontal={true}
              renderItem={({ item }) => (
                <Card
                  id={item.id}
                  title={item.title}
                  img={item.image}
                  onPress={() => handleNavigateToPlayer(item)}
                />
              )}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  )
}
