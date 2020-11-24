import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { Playlist } from '../../../domain/entities/Playlist'
import { IDeletePlaylistUseCase } from '../../../domain/useCases/IDeletePlaylistUseCase'

import styles from './styles'

interface IPlaylistScreen {
  loadPlaylists: ILoadPlaylistsUseCase
  loadPlaylistMusics: ILoadPlaylistMusicUseCase
  deletePlaylist: IDeletePlaylistUseCase
}

function PlaylistScreen({
  loadPlaylists,
  loadPlaylistMusics,
  deletePlaylist,
}: IPlaylistScreen) {
  const [playlists, setPlaylists] = useState<Playlist[]>()

  const navigation = useNavigation()

  useEffect(() => {
    async function getPlaylists() {
      const response = await loadPlaylists.execute()

      setPlaylists(response)
    }

    getPlaylists()
  }, [loadPlaylists])

  const handleShowPlaylist = async (id: string) => {
    const response = await loadPlaylistMusics.execute({ playlistId: id })
    navigation.navigate('PlaylistDetailScreen', { data: response })
  }

  const handleRemovePlaylist = async (id: string) => {
    try {
      await deletePlaylist.execute({ playlistId: id })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.playlistId}
        renderItem={({ item }) => (
          <RectButton
            style={styles.playlist}
            onPress={() => handleShowPlaylist(item.playlistId)}>
            <Text style={styles.whiteText}> {item.title} </Text>
            <RectButton onPress={() => handleRemovePlaylist(item.playlistId)}>
              <FontAwesome5 name="trash-alt" size={24} color="#ddd" />
            </RectButton>
          </RectButton>
        )}
      />
    </SafeAreaView>
  )
}

export default PlaylistScreen
