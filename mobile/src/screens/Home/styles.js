import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  white: {
    color: '#ddd',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 20,
    backgroundColor: '#111',
  },

  searchSection: {
    flexDirection: 'row',
    borderBottomColor: '#999',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },

  icon: {
    fontSize: 26,
    paddingRight: 10,
  },

  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },

  musicSection: {
    paddingTop: 70,
  },

  text: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },

  trending: {
    paddingTop: 20,
  },

  recent: {
    paddingTop: 10,
  },

  categoryText: {
    alignSelf: 'flex-start',
    paddingBottom: 4,
    fontSize: 20,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    fontFamily: 'Inter_400Regular',
  },
});

export default styles;
