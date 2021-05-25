import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  ToastAndroid,
  ActivityIndicator,
  View,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Playlist } from '../../../domain/entities/Playlist'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { IDeletePlaylistUseCase } from '../../../domain/useCases/IDeletePlaylistUseCase'
import { IUpdatePlaylistUseCase } from '../../../domain/useCases/IUpdatePlaylistUseCase'

import { EditModal } from './components/EditModal'

import styles from './styles'

interface IPlaylistScreen {
  loadPlaylists: ILoadPlaylistsUseCase
  deletePlaylist: IDeletePlaylistUseCase
  updatePlaylist: IUpdatePlaylistUseCase
}

export default function PlaylistScreen({
  loadPlaylists,
  deletePlaylist,
  updatePlaylist,
}: IPlaylistScreen) {
  const [playlists, setPlaylists] = useState<Playlist[]>()
  const [playlist, setPlaylist] = useState<Playlist>()
  const [loaded, setLoaded] = useState(false)

  const [open, setOpen] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const navigation = useNavigation()

  const handleGetPlaylists = useCallback(async () => {
    try {
      const response = await loadPlaylists.execute()

      setPlaylists(response)
    } catch (error) {
      ToastAndroid.show('Erro ao buscar suas playlists', ToastAndroid.SHORT)
    }

    setLoaded(true)
  }, [loadPlaylists])

  const handleNavigateToPlaylistDetail = async (id: string) => {
    navigation.navigate('PlaylistDetailScreen', { playlistId: id })
  }

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist.execute({ playlistId: playlist?.playlistId! })

      handleGetPlaylists()

      closeModal()
    } catch (error) {
      ToastAndroid.show('Erro ao deletar playlist', ToastAndroid.SHORT)
    }
  }

  const handleUpdatePlaylist = async (newTitle: string) => {
    try {
      await updatePlaylist.execute({
        playlistId: playlist?.playlistId ?? '',
        title: newTitle,
      })

      handleGetPlaylists()

      closeModal()
    } catch (error) {
      ToastAndroid.show('Erro ao atualizar playlist', ToastAndroid.SHORT)
    }
  }

  const handleOnRefresh = async () => {
    setRefreshing(true)

    handleGetPlaylists().then(() => setRefreshing(false))
  }

  const openModal = (item: Playlist) => {
    setPlaylist(item)

    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  useEffect(() => {
    handleGetPlaylists()
  }, [handleGetPlaylists])

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {playlists !== undefined && playlists?.length > 0 ? (
        <FlatList
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          data={playlists}
          keyExtractor={item => item.playlistId.toString()}
          renderItem={({ item }) => (
            <RectButton
              style={styles.playlist}
              onPress={() => handleNavigateToPlaylistDetail(item.playlistId)}>
              <Text style={styles.whiteText}> {item.title} </Text>
              <RectButton onPress={() => openModal(item)}>
                <Icon name="more-vert" size={24} color="#ddd" />
              </RectButton>
            </RectButton>
          )}
        />
      ) : (
        <View style={styles.container}>
          <Text>Não existe nenhuma playlist</Text>
        </View>
      )}
      <EditModal
        open={open}
        closeModal={closeModal}
        playlistTitle={playlist?.title ?? ''}
        handleDeletePlaylist={handleDeletePlaylist}
        handleUpdatePlaylist={handleUpdatePlaylist}
      />
    </SafeAreaView>
  )
}
