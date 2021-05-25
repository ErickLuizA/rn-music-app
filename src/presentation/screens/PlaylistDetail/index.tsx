import React, { useCallback, useEffect, useState } from 'react'
import {
  SafeAreaView,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  View,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Music } from '../../../domain/entities/Music'
import { IDeletePlaylistMusicUseCase } from '../../../domain/useCases/IDeletePlaylistMusicUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'

import LongCard from '../../components/LongCard'

import styles from './styles'

interface IPlaylistDetail {
  deletePlaylistMusic: IDeletePlaylistMusicUseCase
  loadPlaylistMusic: ILoadPlaylistMusicUseCase
}

export default function PlaylistDetail({
  deletePlaylistMusic,
  loadPlaylistMusic,
}: IPlaylistDetail) {
  const { params } =
    useRoute<{
      params: { playlistId: string }
      name: string
      key: string
    }>()

  const navigation = useNavigation()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Music[]>([])

  const handleGetPlaylistMusics = useCallback(async () => {
    try {
      const response = await loadPlaylistMusic.execute({
        playlistId: params.playlistId,
      })

      setData(response)
    } catch (error) {
      ToastAndroid.show(
        'Erro ao buscar músicas da playlist',
        ToastAndroid.SHORT,
      )
    }

    setLoading(false)
  }, [loadPlaylistMusic, params])

  useEffect(() => {
    handleGetPlaylistMusics()
  }, [handleGetPlaylistMusics])

  const handleNavigateToPlayer = (item: Music) => {
    navigation.navigate('Player', {
      item,
    })
  }

  const handleDeletePlaylistMusic = async (item: Music) => {
    try {
      await deletePlaylistMusic.execute({
        playlistId: params.playlistId,
        musicId: item.id,
      })

      await handleGetPlaylistMusics()
    } catch (error) {
      ToastAndroid.show(
        'Erro ao buscar músicas da playlist',
        ToastAndroid.SHORT,
      )
    }
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="navigate-before"
        size={30}
        color="#ddd"
        style={styles.goBack}
        onPress={navigation.goBack}
      />

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LongCard
            id={item.id}
            title={item.title}
            image={item.image}
            onSwipe={() => handleDeletePlaylistMusic(item)}
            navigate={() => handleNavigateToPlayer(item)}
          />
        )}
      />
    </SafeAreaView>
  )
}
