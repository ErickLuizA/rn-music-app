import React, { useState, useContext, useEffect } from 'react'
import { TextInput, Text, Keyboard, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import { ILoginUserUseCase } from '../../../domain/useCases/ILoginUserUseCase'
import { AuthContext } from '../../contexts/AuthContext'

import Logo from '../../../../assets/icon.png'

import styles from './styles'

interface ILogin {
  loginUser: ILoginUserUseCase
}

export default function Login({ loginUser }: ILogin) {
  const { login } = useContext(AuthContext)

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const logoSize = useSharedValue(200)
  const logoMargin = useSharedValue(50)

  const styledLogo = useAnimatedStyle(() => {
    const config = {
      duration: 500,
      easing: Easing.bounce,
    }

    return {
      width: withTiming(logoSize.value, config),
      height: withTiming(logoSize.value, config),
      marginBottom: withTiming(logoMargin.value, config),
    }
  }, [])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      logoSize.value = 100
      logoMargin.value = 25
    })
    Keyboard.addListener('keyboardDidHide', () => {
      logoSize.value = 200
      logoMargin.value = 50
    })

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => {})
      Keyboard.removeListener('keyboardDidHide', () => {})
    }
  }, [logoSize, logoMargin])

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

      if (response.accessToken) {
        login(response.accessToken)
      }
    } catch (err) {
      setError('Email ou senha incorretos')
    }
  }

  return (
    <View style={styles.container}>
      <Animated.Image source={Logo} style={styledLogo} />
      <TextInput
        style={styles.input}
        value={email}
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#ddd"
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        value={password}
        autoCapitalize="none"
        placeholder="Senha"
        placeholderTextColor="#ddd"
        onChangeText={value => setPassword(value)}
      />
      {error && <Text style={styles.error}> {error} </Text>}
      <RectButton style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </RectButton>
      <Text style={styles.registerText}>
        Não tem uma conta ?
        <Text
          style={styles.blue}
          onPress={() => navigation.navigate('Register')}>
          {' '}
          Registrar{' '}
        </Text>
      </Text>
    </View>
  )
}
