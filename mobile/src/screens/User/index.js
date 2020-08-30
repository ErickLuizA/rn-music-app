import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import styles from './styles';

function UserScreen() {
  const [userInfo, setUserInfo] = useState({});
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await api.post('/logout');
    logout();
  };

  useEffect(() => {
    (async () => {
      try {
        let response = await api.get('/user');
        if (typeof response.data === 'string') {
          api.defaults.headers.Authorization = `Bearer ${response.data}`;

          await AsyncStorage.setItem('@RNtoken', response.data);

          response = await api.get('/user');
        }

        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (!userInfo) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: userInfo.avatar }} style={styles.image} />
        <Text style={styles.name}> {userInfo.name} </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserScreen;
