import { StatusBar, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingTop: StatusBar.currentHeight,
  },

  goBack: {
    alignSelf: 'flex-start',
  },
})
