import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 40,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },

  text: {
    color: '#ddd',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#11cccc',
    borderRadius: 5,
    alignSelf: 'stretch',
    marginVertical: 10,
    padding: 10,
    fontFamily: 'Inter_400Regular',
    color: '#ddd',
  },

  error: {
    color: '#C72914',
    fontFamily: 'Inter_400Regular',
    alignSelf: 'flex-start',
  },

  button: {
    backgroundColor: '#11cccc',
    borderRadius: 5,
    alignSelf: 'stretch',
    marginVertical: 10,
    paddingVertical: 10,
  },

  buttonText: {
    fontFamily: 'Inter_400Regular',
    color: '#111',
    textAlign: 'center',
    fontSize: 20,
  },

  registerText: {
    color: '#ddd',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    paddingVertical: 10,
  },

  blue: {
    color: '#11cccc',
  },
});

export default styles;
