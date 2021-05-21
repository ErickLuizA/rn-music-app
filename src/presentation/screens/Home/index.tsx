import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Music } from '../../../domain/entities/Music'
import { ICreateFavoritesUseCase } from '../../../domain/useCases/ICreateFavoriteUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'
import { ILoadMusicsUseCase } from '../../../domain/useCases/ILoadMusicsUseCause'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'

import Card from '../../components/Card'
import MiniPlayer from '../../components/MiniPlayer'
import { PlayingContext } from '../../contexts/PlayingContext'

import styles from './styles'

interface IHomeScreen {
  loadMusics: ILoadMusicsUseCase
  loadRecent: ILoadRecentUseCase
  createFavorite: ICreateFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
}

export default function HomeScreen({
  loadMusics,
  loadRecent,
  createFavorite,
  deleteFavorite,
}: IHomeScreen) {
  const [musics, setMusics] = useState<Music[]>([])
  const [recent, setRecent] = useState<Music[]>([])

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const navigation = useNavigation()
  const { music, setMusic } = useContext(PlayingContext)

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
  }, [loadRecent, music]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleFavorite = async (item: Music) => {
    try {
      await createFavorite.execute({
        musicId: item.id,
        img: item.image,
        title: item.title,
      })

      setMusic(item.favorite())
    } catch (error) {
      ToastAndroid.show('Erro ao favoritar música', ToastAndroid.SHORT)
    }
  }

  const handleDeleteFavorite = async (item: Music) => {
    try {
      await deleteFavorite.execute({
        id: item.id,
      })

      setMusic(item.unFavorite())
    } catch (error) {
      ToastAndroid.show('Erro ao deletar favorito', ToastAndroid.SHORT)
    }
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
      <ScrollView>
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
      </ScrollView>
      <MiniPlayer
        handleFavorite={handleFavorite}
        handleDeleteFavorite={handleDeleteFavorite}
      />
    </SafeAreaView>
  )
}
