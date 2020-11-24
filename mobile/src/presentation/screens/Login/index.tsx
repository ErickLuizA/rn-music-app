import React, { useState, useContext } from 'react'
import {
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ILoadUserUseCase } from '../../../domain/useCases/ILoadUserUseCase'
import { AuthContext } from '../../contexts/AuthContext'

import Logo from '../../../../assets/icon.png'

import styles from './styles'

interface ILogin {
  loadUser: ILoadUserUseCase
}

function Login({ loadUser }: ILogin) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigation = useNavigation()

  const { login } = useContext(AuthContext)

  async function handleLogin() {
    if (email.length < 1 || password.length < 1) {
      return setError('Preencha todos os campos')
    }

    try {
      setError(null)

      const response = await loadUser.execute({
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
      <Text style={styles.text}>
        Your favorite music at the palm of your hands
      </Text>
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
        placeholder="Password"
        placeholderTextColor="#ddd"
        onChangeText={(value) => setPassword(value)}
      />
      {error && <Text style={styles.error}> {error} </Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Don't have a account ?
        <Text
          style={styles.blue}
          onPress={() => navigation.navigate('Register')}>
          {' '}
          Register{' '}
        </Text>
      </Text>
    </SafeAreaView>
  )
}

export default Login
