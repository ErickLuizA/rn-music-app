import React, { useState, useContext } from 'react'
import { TextInput, Image, SafeAreaView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext'
import { ICreateUserUseCase } from '../../../domain/useCases/ICreateUserUseCase'
import Logo from '../../../../assets/icon.png'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

interface IRegister {
  createUser: ICreateUserUseCase
}

function Register({ createUser }: IRegister) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { login } = useContext(AuthContext)

  const navigation = useNavigation()

  async function handleRegister() {
    setError(null)

    if (name.length < 1 || email.length < 1 || password.length < 1) {
      return setError('Preencha todos os campos necessários')
    }

    try {
      const response = await createUser.execute({
        name,
        email,
        password,
      })

      login(response.token)
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
        value={name}
        autoCapitalize="words"
        placeholder="Name"
        placeholderTextColor="#ddd"
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        style={styles.input}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
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
      <RectButton style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </RectButton>
      <Text style={styles.registerText}>
        Already have a account ?
        <Text style={styles.blue} onPress={() => navigation.navigate('Login')}>
          {' '}
          Login{' '}
        </Text>
      </Text>
    </SafeAreaView>
  )
}

export default Register
