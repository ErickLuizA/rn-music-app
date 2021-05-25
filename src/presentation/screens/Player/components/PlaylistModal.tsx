import React, { useCallback, useEffect, useState } from 'react'
import {
  Modal,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Music } from '../../../../domain/entities/Music'
import { ICreatePlaylistUseCase } from '../../../../domain/useCases/ICreatePlaylistUseCase'
import { IAddPlaylistUseCase } from '../../../../domain/useCases/IAddPlaylistMusicUseCase'
import { ILoadPlaylistsUseCase } from '../../../../domain/useCases/ILoadPlaylistsUseCase'
import { Playlist } from '../../../../domain/entities/Playlist'

interface IPlaylistModal {
  open: boolean
  music: Music
  close: () => void
  loadPlaylists: ILoadPlaylistsUseCase
  addPlaylistMusic: IAddPlaylistUseCase
  createPlaylist: ICreatePlaylistUseCase
}

const styles = StyleSheet.create({
  modalContentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#333',
    height: Dimensions.get('window').height / 3.5,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomColor: '#777',
    borderBottomWidth: 0.3,
    paddingBottom: 15,
    padding: 10,
  },

  whiteText: {
    fontSize: 18,
    color: '#fff',
  },

  noPlaylistText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    marginLeft: 10,
  },

  smallerText: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
    paddingLeft: 10,
  },

  flexBox: {
    flexDirection: 'row',
    borderBottomColor: '#777',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
    padding: 5,
  },

  last: {
    padding: 10,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },

  createPlaylistModalContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  createPlaylistModalContent: {
    backgroundColor: '#555',
    width: Dimensions.get('window').width / 1.25,
    height: Dimensions.get('window').height / 4,
    padding: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#777',
    paddingTop: 30,
    paddingBottom: 5,
    color: '#fff',
  },

  lastFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  button: {
    paddingLeft: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
})

export default function PlaylistModal({
  open,
  music,
  close,
  loadPlaylists,
  addPlaylistMusic,
  createPlaylist,
}: IPlaylistModal) {
  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  const [createPlaylistModal, setCreatePlaylistModal] = useState(false)
  const [title, setTitle] = useState('')

  const handleLoadPlaylists = useCallback(async () => {
    try {
      const response = await loadPlaylists.execute()

      setPlaylists(response)
    } catch (error) {
      ToastAndroid.show('Erro ao buscar playlists', ToastAndroid.SHORT)
    }

    setLoading(false)
  }, [loadPlaylists])

  const handleDone = async (selected?: Playlist) => {
    if (!selected) {
      close()

      return
    }

    try {
      await addPlaylistMusic.execute({
        musicId: music.id,
        img: music.image,
        title: music.title,
        playlistId: selected.playlistId,
      })
    } catch (error) {
      ToastAndroid.show(
        'Erro ao adicionar música a playlist',
        ToastAndroid.SHORT,
      )
    }

    close()
  }

  const openCreatePlaylistModal = () => {
    setCreatePlaylistModal(true)

    close()
  }

  const closeCreatePlaylistModal = () => {
    setCreatePlaylistModal(false)
  }

  const handleCreatePlaylist = useCallback(async () => {
    try {
      await createPlaylist.execute({ title })

      setCreatePlaylistModal(false)
    } catch (err) {
      ToastAndroid.show('Erro ao criar playlist', ToastAndroid.SHORT)
    }
  }, [createPlaylist]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    handleLoadPlaylists()
  }, [handleLoadPlaylists, handleCreatePlaylist])

  if (!open && !createPlaylistModal) {
    return null
  }

  return (
    <>
      <Modal
        visible={open}
        transparent={true}
        animationType="slide"
        onRequestClose={close}>
        <View style={styles.modalContentContainer}>
          <View style={styles.modalContent}>
            <View style={styles.flex}>
              <Text style={styles.whiteText}>Salve a música</Text>
              <TouchableOpacity onPress={openCreatePlaylistModal}>
                <Icon name="library-add" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            {loading ? (
              <View>
                <ActivityIndicator />
              </View>
            ) : playlists?.length > 0 ? (
              <FlatList
                data={playlists}
                keyExtractor={item => item.playlistId.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.flexBox}
                    onPress={() => handleDone(item)}>
                    <Text style={styles.smallerText}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.noPlaylistText}>
                Você não tem nenhuma playlist
              </Text>
            )}

            <TouchableOpacity
              style={styles.last}
              onPress={() => handleDone(undefined)}>
              <Icon name="done" size={26} color="#666" />
              <Text style={styles.smallerText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={createPlaylistModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeCreatePlaylistModal}>
        <View style={styles.createPlaylistModalContentContainer}>
          <View style={styles.createPlaylistModalContent}>
            <Text style={styles.whiteText}>New playlist</Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#fff"
              value={title}
              onChangeText={text => setTitle(text)}
              style={styles.input}
            />
            <View style={styles.lastFlex}>
              <TouchableOpacity
                style={styles.button}
                onPress={closeCreatePlaylistModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreatePlaylist}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
