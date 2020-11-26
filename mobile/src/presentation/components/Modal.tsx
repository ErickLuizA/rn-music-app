import React, { useState } from 'react'
import {
  Modal,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import CheckBox from '@react-native-community/checkbox'
import { Playlist } from '../../domain/entities/Playlist'
import { IAddPlaylistUseCase } from '../../domain/useCases/IAddPlaylistMusicUseCase'
import { ICreatePlaylistUseCase } from '../../domain/useCases/ICreatePlaylistUseCase'
import { PlayingMusic, SearchedData } from '../../domain/entities/Music'

export type IPlaylists = Playlist[]

interface IModals {
  close: () => void
  open: boolean
  searchedData: SearchedData
  data: PlayingMusic
  playlists: IPlaylists
  addPlaylistMusic: IAddPlaylistUseCase
  createPlaylistUseCase: ICreatePlaylistUseCase
}

type IChecked = Playlist

function Modals({
  close,
  open,
  searchedData,
  data,
  playlists,
  addPlaylistMusic,
  createPlaylistUseCase,
}: IModals) {
  const [newModal, setNewModal] = useState(false)
  const [title, setTitle] = useState('')
  const [checked, setChecked] = useState<IChecked[]>([])

  const handleCheck = async (item: IChecked) => {
    const exists = checked.filter(
      (check) => check.playlistId === item.playlistId,
    )

    if (exists.length === 0) {
      setChecked((current) => [...current, item])
    } else {
      setChecked((current) =>
        current.filter((c) => c.playlistId !== item.playlistId),
      )
    }
  }

  const handleDone = async () => {
    if (checked.length === 0) {
      close()
      return
    }

    await addPlaylistMusic.execute({
      musicId: searchedData.id.videoId || data.id,
      img: searchedData.img || data.img,
      title: searchedData.title || data.title,
      playlistId: checked[0].playlistId,
    })

    close()
  }

  const openNewModal = () => {
    setNewModal(true)
    close()
  }

  const handleCreatePlaylist = async () => {
    try {
      await createPlaylistUseCase.execute({ title })
      setNewModal(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Modal
        visible={open}
        transparent={true}
        animationType="slide"
        onRequestClose={() => close()}>
        <View style={styles.modalContentContainer}>
          <View style={styles.modalContent}>
            <View style={styles.flex}>
              <Text style={styles.whiteText}>Save music in...</Text>
              <TouchableOpacity onPress={openNewModal}>
                <Text style={styles.blueText}>
                  <AntDesign name="plus" size={18} />
                  New Playlist
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={playlists}
              keyExtractor={(item) => item.playlistId}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.flexBox}
                  onPress={() => handleCheck(item)}>
                  <CheckBox
                    value={Boolean(
                      checked.find(
                        (playlist) => playlist.playlistId === item.playlistId,
                      ),
                    )}
                    tintColors={{ true: '#11cccc' }}
                    onValueChange={() => handleCheck(item)}
                  />
                  <Text style={styles.smallerText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.last} onPress={handleDone}>
              <AntDesign name="check" size={26} color="#666" />
              <Text style={styles.smallerText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={newModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setNewModal(false)}>
        <View style={styles.newModalContentContainer}>
          <View style={styles.newModalContent}>
            <Text style={styles.whiteText}>New playlist</Text>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={styles.input}
            />
            <View style={styles.lastFlex}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setNewModal(false)}>
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
export default Modals

const styles = StyleSheet.create({
  modalContentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#333',
    height: Dimensions.get('window').height / 3.5,
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
    fontFamily: 'Inter_400Regular',
  },

  blueText: {
    color: '#11cccc',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },

  smallerText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
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
  },

  newModalContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  newModalContent: {
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
    color: '#11cccc',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
})
