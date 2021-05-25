import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingHorizontal: 20,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  name: {
    color: '#ddd',
    fontSize: 22,
    alignSelf: 'center',
    marginTop: 60,
  },

  button: {
    backgroundColor: '#C72914',
    alignSelf: 'stretch',
    marginVertical: 10,
    paddingVertical: 10,
    width: Dimensions.get('window').width / 1.5,
  },

  text: {
    color: '#ddd',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
  },
})
