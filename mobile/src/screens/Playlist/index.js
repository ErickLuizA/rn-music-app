import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import api from '../../services/api';

import styles from './styles';

function PlaylistScreen({ navigation }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await api.get('/playlists');

      if (typeof response.data === 'string') {
        api.defaults.headers.Authorization = `Bearer ${response.data}`;

        await AsyncStorage.setItem('@RNtoken', response.data);

        response = await api.get('/playlists');
      }

      setPlaylists(response.data);
    })();
  }, []);

  const handleShowPlaylist = async (id) => {
    let response = await api.get(`/playlist_song/${id}`);

    if (typeof response.data === 'string') {
      api.defaults.headers.Authorization = `Bearer ${response.data}`;

      await AsyncStorage.setItem('@RNtoken', response.data);

      response = await api.get(`/playlist_song/${id}`);
    }

    navigation.navigate('PlaylistDetailScreen', { data: response.data });
  };

  const handleRemovePlaylist = async (id) => {
    let response = await api.delete('/playlist', {
      params: {
        destroyId: id,
      },
    });
    console.log('the response', response.data, response.status);
    if (typeof response.data === 'string') {
      api.defaults.headers.Authorization = `Bearer ${response.data}`;

      await AsyncStorage.setItem('@RNtoken', response.data);

      response = await api.delete('/playlist', {
        params: {
          destroyId: id,
        },
      });
    }

    console.log('responseaftereverithung', response.data, response.status);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}> Your Playlists </Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.playlist}
            onPress={() => handleShowPlaylist(item.id)}
          >
            <Text style={styles.whiteText}> {item.title} </Text>
            <TouchableOpacity onPress={() => handleRemovePlaylist(item.id)}>
              <FontAwesome5 name="trash-alt" size={24} color="#ddd" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export default PlaylistScreen;
