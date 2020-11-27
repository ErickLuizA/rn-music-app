import React, { useState, useContext, useEffect } from 'react'
import {
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
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

export default function Register({ createUser }: IRegister) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [keyboardOn, setKeyboardOn] = useState(false)

  const { login } = useContext(AuthContext)

  const navigation = useNavigation()

  const size = new Animated.Value(0)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
    }
  }, [])

  const _keyboardDidShow = () => {
    setKeyboardOn(true)
  }

  const _keyboardDidHide = () => {
    setKeyboardOn(false)
  }

  Animated.timing(size, {
    toValue: keyboardOn ? 1 : 0,
    duration: 500,
    useNativeDriver: false,
  }).start()

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
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Animated.Image
        source={Logo}
        style={{
          width: size.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 150],
            extrapolate: 'clamp',
          }),
          height: size.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 150],
            extrapolate: 'clamp',
          }),
          marginBottom: size.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 25],
            extrapolate: 'clamp',
          }),
        }}
      />
      <TextInput
        style={styles.input}
        value={name}
        autoCapitalize="words"
        placeholder="Nome"
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
        placeholder="Senha"
        placeholderTextColor="#ddd"
        onChangeText={(value) => setPassword(value)}
      />
      {error && <Text style={styles.error}> {error} </Text>}
      <RectButton style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </RectButton>
      <Text style={styles.registerText}>
        Já possui uma conta ?
        <Text style={styles.blue} onPress={() => navigation.navigate('Login')}>
          {' '}
          Entrar{' '}
        </Text>
      </Text>
    </KeyboardAvoidingView>
  )
}
