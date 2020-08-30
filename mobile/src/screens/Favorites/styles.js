import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight + 10,
  },

  heading: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: '#ddd',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default styles;
