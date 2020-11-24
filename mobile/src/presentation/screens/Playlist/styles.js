import { StyleSheet, Dimensions, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + 10,
    padding: 15,
  },

  heading: {
    color: '#ddd',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
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
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
  },
})

export default styles
