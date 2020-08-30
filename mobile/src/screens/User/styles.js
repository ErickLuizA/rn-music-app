import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    fontFamily: 'Inter_700Bold',
    alignSelf: 'center',
    marginTop: 60,
  },

  button: {
    backgroundColor: '#C72914',
    alignSelf: 'stretch',
    marginVertical: 10,
    paddingVertical: 10,
  },

  text: {
    color: '#ddd',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default styles;
