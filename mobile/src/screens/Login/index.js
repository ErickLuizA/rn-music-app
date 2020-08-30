import React, { useState, useContext } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';

import Logo from '../../../assets/icon.png';

import api from '../../services/api';

import styles from './styles';
import { AuthContext } from '../../contexts/AuthContext';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  async function handleLogin() {
    if (email.length < 1 || password.length < 1) {
      return setError('Preencha todos os campos');
    }

    try {
      setError(null);
      const response = await api.post('/login', {
        email,
        password,
      });

      login(response);
    } catch (err) {
      setError('Email or password incorrect');
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
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        value={password}
        autoCapitalize="none"
        placeholder="Password"
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
          onPress={() => navigation.navigate('Register')}
        >
          {' '}
          Register{' '}
        </Text>
      </Text>
    </SafeAreaView>
  );
}

export default Login;
