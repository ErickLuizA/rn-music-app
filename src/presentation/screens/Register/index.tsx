import React, { useState, useContext, useEffect } from 'react'
import {
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  Image,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext'
import { ICreateUserUseCase } from '../../../domain/useCases/ICreateUserUseCase'
import { RectButton } from 'react-native-gesture-handler'

import Logo from '../../../../assets/icon.png'
interface IRegister {
  createUser: ICreateUserUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 40,
  },

  smallLogo: {
    width: 150,
    height: 150,
    marginBottom: 25,
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

  smallInput: {
    borderWidth: 1,
    borderColor: '#11cccc',
    borderRadius: 5,
    alignSelf: 'stretch',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
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

  smallButton: {
    backgroundColor: '#11cccc',
    borderRadius: 5,
    alignSelf: 'stretch',
    marginTop: 8,
    marginBottom: 4,
    paddingVertical: 8,
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

export default function Register({ createUser }: IRegister) {
  const { login } = useContext(AuthContext)
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [keyboardOn, setKeyboardOn] = useState(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOn(true))
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOn(false))

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setKeyboardOn(true))
      Keyboard.removeListener('keyboardDidHide', () => setKeyboardOn(false))
    }
  }, [])

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
    <View style={styles.container}>
      <Image
        source={Logo}
        style={keyboardOn ? styles.smallLogo : styles.logo}
      />
      <TextInput
        style={keyboardOn ? styles.smallInput : styles.input}
        value={name}
        autoCapitalize="words"
        placeholder="Nome"
        placeholderTextColor="#ddd"
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        style={keyboardOn ? styles.smallInput : styles.input}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#ddd"
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={keyboardOn ? styles.smallInput : styles.input}
        value={password}
        autoCapitalize="none"
        placeholder="Senha"
        placeholderTextColor="#ddd"
        onChangeText={(value) => setPassword(value)}
      />
      {error && <Text style={styles.error}> {error} </Text>}
      <RectButton
        style={keyboardOn ? styles.smallButton : styles.button}
        onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </RectButton>
      <Text style={styles.registerText}>
        Já possui uma conta ?
        <Text style={styles.blue} onPress={() => navigation.navigate('Login')}>
          {' '}
          Entrar{' '}
        </Text>
      </Text>
    </View>
  )
}
