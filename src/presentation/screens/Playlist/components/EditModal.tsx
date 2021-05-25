import React, { useState } from 'react'
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface IEditModalProps {
  open: boolean
  playlistTitle: string
  closeModal: () => void
  handleDeletePlaylist: () => void
  handleUpdatePlaylist: (title: string) => void
}

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
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

  whiteText: {
    color: '#ddd',
    fontSize: 18,
  },

  marginLeft: {
    marginLeft: 10,
  },

  updateModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  updateModalContainer: {
    height: HEIGHT / 3,
    width: WIDTH / 1.2,
    backgroundColor: '#444',
    justifyContent: 'space-between',
    padding: 20,
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

export function EditModal({
  open,
  playlistTitle,
  closeModal,
  handleDeletePlaylist,
  handleUpdatePlaylist,
}: IEditModalProps) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  function handleOpenUpdateModal() {
    closeModal()

    setOpenUpdateModal(true)
  }

  function handleCloseUpdateModal() {
    setOpenUpdateModal(false)
  }

  function updatePlaylist() {
    handleUpdatePlaylist(newTitle)

    handleCloseUpdateModal()
  }

  return (
    <>
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
        onRequestClose={handleCloseUpdateModal}>
        <View style={styles.updateModal}>
          <View style={styles.updateModalContainer}>
            <Text style={styles.whiteText}>Editar playlist</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholderTextColor="#fff"
              placeholder={playlistTitle}
            />
            <View style={styles.row}>
              <TouchableOpacity onPress={handleCloseUpdateModal}>
                <Text style={styles.whiteText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={updatePlaylist}>
                <Text style={[styles.whiteText, styles.marginLeft]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
