import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { Playlist } from '../../../domain/entities/Playlist'
import { IDeletePlaylistUseCase } from '../../../domain/useCases/IDeletePlaylistUseCase'

interface IPlaylistScreen {
  loadPlaylists: ILoadPlaylistsUseCase
  loadPlaylistMusics: ILoadPlaylistMusicUseCase
  deletePlaylist: IDeletePlaylistUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 15,
  },

  heading: {
    color: '#ddd',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    marginBottom: 50,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
  },

  playlist: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingRight: 30,
    marginBottom: 20,
    width: Dimensions.get('window').width / 1.09,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  whiteText: {
    color: '#ddd',
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
  },
})

export default function PlaylistScreen({
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
              <Icon name="restore-from-trash" size={24} color="#ddd" />
            </RectButton>
          </RectButton>
        )}
      />
    </SafeAreaView>
  )
}
