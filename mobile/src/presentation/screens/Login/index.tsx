import React, { useState, useContext, useEffect } from 'react'
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/AuthContext'
import { ILoginUserUseCase } from '../../../domain/useCases/ILoginUserUseCase'

import Logo from '../../../../assets/icon.png'
import Animated, {
  and,
  block,
  Clock,
  clockRunning,
  cond,
  Easing,
  eq,
  Extrapolate,
  not,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Value,
} from 'react-native-reanimated'
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

const runTiming = (clock: Clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  }
  const config = {
    toValue: new Value(1),
    duration: 3000,
    easing: Easing.inOut(Easing.ease),
  }
  return block([
    cond(
      not(clockRunning(clock)),
      set(state.time, 0),
      timing(clock, state, config),
    ),

    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, not(state.position)),
    ]),
    state.position,
  ])
}

export default function Login({ loginUser }: ILogin) {
  const { login } = useContext(AuthContext)

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [keyboardOn, setKeyboardOn] = useState(false)

  const clock = new Clock()
  const size = new Value(0)
  const on = new Value(0)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

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

  useCode(() => set(on, keyboardOn ? 1 : 0), [keyboardOn])

  useCode(
    () => [
      cond(and(on, not(clockRunning(clock))), startClock(clock)),
      cond(and(not(on), clockRunning(clock)), stopClock(clock)),
      set(size, runTiming(clock)),
    ],
    [],
  )

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
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Animated.Image
        source={Logo}
        style={{
          width: size.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 150],
            extrapolate: Extrapolate.CLAMP,
          }),
          height: size.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 150],
            extrapolate: Extrapolate.CLAMP,
          }),
          marginBottom: size.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 25],
            extrapolate: Extrapolate.CLAMP,
          }),
        }}
      />
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
        <Text style={styles.buttonText}>Entrar</Text>
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
    </KeyboardAvoidingView>
  )
}
