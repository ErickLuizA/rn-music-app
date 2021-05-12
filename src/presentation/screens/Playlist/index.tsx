import React, { useState, useEffect, useCallback } from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  Modal,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native'
import { RectButton, TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

import { Playlist } from '../../../domain/entities/Playlist'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { IDeletePlaylistUseCase } from '../../../domain/useCases/IDeletePlaylistUseCase'
import { IUpdatePlaylistUseCase } from '../../../domain/useCases/IUpdatePlaylistUseCase'

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

  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [open, setOpen] = useState(false)

  const [newTitle, setNewTitle] = useState('')

  const navigation = useNavigation()

  const handleGetPlaylists = useCallback(async () => {
    try {
      const response = await loadPlaylists.execute()

      setPlaylists(response)
    } catch (error) {
      console.log(`PLAYLIST ${error}`)

      ToastAndroid.show('Erro ao buscar suas playlists', ToastAndroid.SHORT)
    }

    setLoaded(true)
  }, [loadPlaylists])

  const handleNavigateToPlaylistDetail = async (id: string) => {
    navigation.navigate('PlaylistDetailScreen', { playlistId: id })
  }

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true)
    setOpen(false)
  }

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist.execute({ playlistId: playlist?.playlistId! })

      handleGetPlaylists()
    } catch (error) {
      console.log(error)
      ToastAndroid.show('Erro ao deletar playlist', ToastAndroid.SHORT)
    }
  }

  const handleUpdatePlaylist = async () => {
    try {
      await updatePlaylist.execute({
        playlistId: playlist?.playlistId!,
        title: newTitle,
      })

      handleGetPlaylists()
      closeModal()
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
      <FlatList
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
              onChangeText={text => setNewTitle(text)}
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
