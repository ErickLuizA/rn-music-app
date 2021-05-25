import { Dimensions, StyleSheet } from 'react-native'

const WIDTH = Dimensions.get('screen').width

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 10,
  },

  image: {
    width: WIDTH / 1.1,
    height: WIDTH / 1.1,
    borderRadius: 4,
    resizeMode: 'contain',
  },

  title: {
    color: '#ddd',
    fontSize: 20,
    paddingBottom: 40,
    textAlign: 'center',
  },

  iconContainer: {
    flexDirection: 'row',
  },

  progress: {
    height: 2,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },

  progressPos: {
    backgroundColor: 'red',
  },

  fullBar: {
    backgroundColor: 'grey',
  },

  touchable: {
    width: 250,
    height: 50,
    justifyContent: 'space-between',
  },

  topIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },

  button: {
    width: 50,
    alignSelf: 'center'
  },

  icon: {
    fontSize: 50,
    color: '#ddd',
  },

  icons: {
    fontSize: 30,
    color: '#ddd',
    alignSelf: 'stretch',
  },
})
