import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + 10,
  },

  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.1,
    paddingHorizontal: 10,
  },

  heading: {
    color: '#ddd',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginLeft: 60,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    alignSelf: 'flex-start',
    paddingVertical: 5,
  },
});

export default styles;
