import { StyleSheet, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: StatusBar.currentHeight! + 10,
    paddingHorizontal: 10,
  },

  searchSection: {
    flexDirection: 'row',
  },

  icon: {
    fontSize: 32,
    paddingRight: 20,
  },

  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    borderBottomColor: '#999',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },

  white: {
    color: '#ddd',
  },

  list: {
    paddingVertical: 20,
  },
})

export default styles
