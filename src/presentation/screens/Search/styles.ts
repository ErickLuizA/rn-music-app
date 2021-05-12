import { StatusBar, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: StatusBar.currentHeight || 10,
    paddingHorizontal: 10,
  },

  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 32,
    paddingRight: 20,
  },

  input: {
    flex: 1,
    borderBottomColor: '#999',
    borderBottomWidth: 0.3,
  },

  white: {
    color: '#ddd',
  },

  list: {
    paddingVertical: 20,
  },
})
