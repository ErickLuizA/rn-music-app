import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#111',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },

  icon: {
    fontSize: 26,
    paddingRight: 10,
  },

  input: {
    flex: 1,
  },

  sections: {
    paddingTop: 30,
  },

  text: {
    fontSize: 32,
  },

  trending: {
    paddingTop: 20,
  },

  recent: {
    paddingTop: 10,
  },

  categoryText: {
    alignSelf: 'flex-start',
    fontSize: 20,
  },

  white: {
    color: '#ddd',
  },
})
