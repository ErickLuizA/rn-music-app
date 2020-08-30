import React, { useState, useContext } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

import Logo from '../../../assets/icon.png';

import api from '../../services/api';

import styles from './styles';

function Register({ navigation }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const { register } = useContext(AuthContext);

  async function handleRegister() {
    if (name.length < 1 || email.length < 1 || password.length < 1) {
      return setError('Preencha todos os campos necessários');
    }

    try {
      setError(null);
      const response = await api.post('/register', {
        name,
        avatar,
        email,
        password,
      });

      register(response);
    } catch (err) {
      console.log(err);
      setError('This user already exists');
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
        autoCapitalize="none"
        placeholder="Name *"
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        style={styles.input}
        value={avatar}
        autoCapitalize="none"
        placeholder="Avatar"
        onChangeText={(value) => setAvatar(value)}
      />
      <TextInput
        style={styles.input}
        value={email}
        autoCapitalize="none"
        placeholder="Email *"
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        value={password}
        autoCapitalize="none"
        placeholder="Password *"
        onChangeText={(value) => setPassword(value)}
      />
      {error && <Text style={styles.error}> {error} </Text>}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Already have a account ?
        <Text style={styles.blue} onPress={() => navigation.navigate('Login')}>
          {' '}
          Login{' '}
        </Text>
      </Text>
    </SafeAreaView>
  );
}

export default Register;
