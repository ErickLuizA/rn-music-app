import { Dimensions, StyleSheet } from 'react-native'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

export default StyleSheet.create({
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
