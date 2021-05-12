import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 400,
    height: 400,
    borderRadius: 20,
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
    height: 100,
    justifyContent: 'space-between',
  },

  topIcon: {
    position: 'absolute',
    top: -20,
    left: 0,
  },

  button: {
    width: 50,
  },

  icon: {
    fontSize: 50,
    color: '#ddd',
    padding: 25,
  },

  icons: {
    fontSize: 30,
    color: '#ddd',
    alignSelf: 'stretch',
  },
})
