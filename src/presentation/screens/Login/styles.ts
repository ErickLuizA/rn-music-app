import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 40,
  },

  input: {
    borderWidth: 1,
    borderColor: '#11cccc',
    borderRadius: 5,
    alignSelf: 'stretch',
    marginVertical: 10,
    padding: 10,
    color: '#ddd',
  },

  error: {
    color: '#C72914',
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
    color: '#111',
    textAlign: 'center',
    fontSize: 20,
  },

  registerText: {
    color: '#ddd',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 10,
  },

  blue: {
    color: '#11cccc',
  },
})
