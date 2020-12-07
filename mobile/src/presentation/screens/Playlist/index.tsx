import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { Playlist } from '../../../domain/entities/Playlist'
import { IDeletePlaylistUseCase } from '../../../domain/useCases/IDeletePlaylistUseCase'
import { IUpdatePlaylistUseCase } from '../../../domain/useCases/IUpdatePlaylistUseCase'

interface IPlaylistScreen {
  loadPlaylists: ILoadPlaylistsUseCase
  loadPlaylistMusics: ILoadPlaylistMusicUseCase
  deletePlaylist: IDeletePlaylistUseCase
  updatePlaylist: IUpdatePlaylistUseCase
}

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

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

  marginLeft: {
    marginLeft: 10,
  },

  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#ddd',
    height: HEIGHT / 4.5,
    padding: 10,
    borderRadius: 10,
  },

  updateModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  updateModalContainer: {
    height: HEIGHT / 3,
    width: WIDTH / 1.2,
    backgroundColor: '#111',
    justifyContent: 'space-between',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingTop: 30,
    paddingBottom: 5,
    color: '#fff',
  },

  deleteButton: {
    backgroundColor: '#FF6666',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom: 5,
    width: '100%',
  },

  editButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom: 5,
    width: '100%',
  },

  cancelButton: {
    backgroundColor: '#34b68a',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 5,
    marginTop: 10,
  },
})

export default function PlaylistScreen({
  loadPlaylists,
  loadPlaylistMusics,
  deletePlaylist,
  updatePlaylist,
}: IPlaylistScreen) {
  const [playlists, setPlaylists] = useState<Playlist[]>()
  const [playlist, setPlaylist] = useState<Playlist>()

  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [open, setOpen] = useState(false)

  const [newTitle, setNewTitle] = useState('')

  const navigation = useNavigation()

  const getPlaylists = useCallback(async () => {
    try {
      const response = await loadPlaylists.execute()

      setPlaylists(response)
    } catch (error) {
      ToastAndroid.show('Erro ao buscar suas playlists', ToastAndroid.SHORT)
    }
  }, [loadPlaylists])

  useEffect(() => {
    getPlaylists()
  }, [getPlaylists])

  const handleShowPlaylist = async (id: string) => {
    const response = await loadPlaylistMusics.execute({ playlistId: id })

    navigation.navigate('PlaylistDetailScreen', { data: response })
  }

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true)
    setOpen(false)
  }

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist.execute({ playlistId: playlist?.playlistId! })

      getPlaylists()
    } catch (error) {
      ToastAndroid.show('Erro ao deletar playlist', ToastAndroid.SHORT)
    }
  }

  const handleUpdatePlaylist = async () => {
    try {
      await updatePlaylist.execute({
        playlistId: playlist?.playlistId!,
        title: newTitle,
      })

      getPlaylists()
    } catch (error) {
      ToastAndroid.show('Erro ao atualizar playlist', ToastAndroid.SHORT)
    }

    setOpenUpdateModal(false)
  }

  const openModal = (item: Playlist) => {
    setPlaylist(item)
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.playlistId.toString()}
        renderItem={({ item }) => (
          <RectButton
            style={styles.playlist}
            onPress={() => handleShowPlaylist(item.playlistId)}>
            <Text style={styles.whiteText}> {item.title} </Text>
            <RectButton onPress={() => openModal(item)}>
              <Icon name="more-vert" size={24} color="#ddd" />
            </RectButton>
          </RectButton>
        )}
      />
      <Modal
        visible={open}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeletePlaylist}>
            <Icon name="delete" size={25} color="#555" />
            <Text style={styles.whiteText}>Deletar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleOpenUpdateModal}>
            <Icon name="edit" size={25} color="#555" />
            <Text style={styles.whiteText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
            <Text style={styles.whiteText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={openUpdateModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setOpenUpdateModal(false)}>
        <View style={styles.updateModal}>
          <View style={styles.updateModalContainer}>
            <Text style={styles.whiteText}>Editar playlist</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
              placeholderTextColor="#fff"
              placeholder={playlist?.title}
            />

            <View style={styles.row}>
              <TouchableOpacity onPress={() => setOpenUpdateModal(false)}>
                <Text style={styles.whiteText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleUpdatePlaylist}>
                <Text style={[styles.whiteText, styles.marginLeft]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
