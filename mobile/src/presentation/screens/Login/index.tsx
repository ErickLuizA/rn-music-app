import React, { useState, useContext } from 'react'
import {
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ILoginUserUseCase } from '../../../domain/useCases/ILoginUserUseCase'
import { AuthContext } from '../../contexts/AuthContext'

import Logo from '../../../../assets/icon.png'
interface ILogin {
  loginUser: ILoginUserUseCase
}

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
})

export default function Login({ loginUser }: ILogin) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigation = useNavigation()

  const { login } = useContext(AuthContext)

  async function handleLogin() {
    setError(null)

    if (email.length < 1 || password.length < 1) {
      return setError('Preencha todos os campos')
    }

    try {
      const response = await loginUser.execute({
        email,
        password,
      })

      login(response)
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <TextInput
        style={styles.input}
        value={email}
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#ddd"
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        value={password}
        autoCapitalize="none"
        placeholder="Senha"
        placeholderTextColor="#ddd"
        onChangeText={(value) => setPassword(value)}
      />
      {error && <Text style={styles.error}> {error} </Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Não tem uma conta ?
        <Text
          style={styles.blue}
          onPress={() => navigation.navigate('Register')}>
          {' '}
          Registrar{' '}
        </Text>
      </Text>
    </SafeAreaView>
  )
}
