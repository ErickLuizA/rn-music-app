import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import Modal from '../../components/Modal';

import api from '../../services/api';

import styles from './styles';

function PlayingScreen({ route }) {
  const data = route.params ? route.params.data : null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [playback, setPlayBack] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [inPlaylist, setInPlaylist] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // All the load, unload, autoplay logic
  useEffect(() => {
    if (!data) {
      return undefined;
    } else if (playback.sound && Object.keys(playback.sound).length > 0) {
      (async () => {
        await playback.sound.unloadAsync();
        setIsPlaying(false);
      })();
    }

    if (data) {
      (async () => {
        try {
          let response = await api.get('/song', {
            params: {
              id: data.id,
            },
          });

          if (typeof response.data === 'string') {
            api.defaults.headers.Authorization = `Bearer ${response.data}`;

            await AsyncStorage.setItem('@RNtoken', response.data);

            response = await api.get('/song', {
              params: {
                id: data.id,
              },
            });
          }

          const playBackInstance = await Audio.Sound.createAsync(
            { uri: response.data.url },
            {
              shouldPlay: true,
            },
          );

          setIsPlaying(true);
          setPlayBack(playBackInstance);

          const playedMusic = await AsyncStorage.getItem('@RNplayed');

          if (!playedMusic) {
            await AsyncStorage.setItem('@RNplayed', JSON.stringify(data));
          } else if (playedMusic && playedMusic.id !== data.id) {
            await AsyncStorage.setItem('@RNplayed', JSON.stringify(data));
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      (async () => {
        let response = await api.get('/favorites');

        if (typeof response.data === 'string') {
          api.defaults.headers.Authorization = `Bearer ${response.data}`;

          await AsyncStorage.setItem('@RNtoken', response.data);

          response = await api.get('/favorites');
        }

        const musics = response.data;

        const isFavorited = musics.filter(
          (music) => music.favorite_music_id === data.id,
        );

        if (isFavorited.length > 0) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      })();
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      (async () => {
        let response = await api.get(`/playlist_songs/${data.id}`);

        if (typeof response.data === 'string') {
          api.defaults.headers.Authorization = `Bearer ${response.data}`;

          await AsyncStorage.setItem('@RNtoken', response.data);

          response = await api.get(`/playlist_songs/${data.id}`);
        }

        const [music] = response.data;

        if (music) {
          const onPlaylist = music.song_id === data.id;

          if (onPlaylist) {
            setInPlaylist(true);
          } else {
            setInPlaylist(false);
          }
        }
      })();
    }
  }, [data]);

  const play = async () => {
    if (playback) {
      isPlaying
        ? await playback.sound.pauseAsync()
        : await playback.sound.playAsync();

      setIsPlaying((current) => !current);

      if (playback.status.didJustFinish) {
        playback.sound.unloadAsync();
        setIsPlaying(false);
      }
    }
  };

  const handleAddFavorite = async () => {
    let response = await api.post('/favorite', {
      favorite_music_id: data.id,
      title: data.title,
      img: data.img,
    });

    if (typeof response.data === 'string') {
      api.defaults.headers.Authorization = `Bearer ${response.data}`;

      await AsyncStorage.setItem('@RNtoken', response.data);

      response = await api.post('/favorite', {
        favorite_music_id: data.id,
        title: data.title,
        img: data.img,
      });
    }

    setIsFavorite(true);
  };

  const handleRemoveFavorite = async () => {
    let response = await api.delete('/favorite', {
      params: {
        destroyId: data.id,
      },
    });

    if (typeof response.data === 'string') {
      api.defaults.headers.Authorization = `Bearer ${response.data}`;

      await AsyncStorage.setItem('@RNtoken', response.data);

      response = await api.delete('/favorite', {
        params: {
          destroyId: data.id,
        },
      });
    }

    setIsFavorite(false);
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nothing playing :(</Text>
      </View>
    );
  } else if (data && Object.keys(playback).length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View
        style={
          openModal
            ? [styles.container, { backgroundColor: 'rgba(0,0,0,0.7)' }]
            : styles.container
        }
      >
        <Image
          style={styles.image}
          source={{ uri: data.img }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{data.title}</Text>
        <View style={[styles.iconContainer, styles.touchable]}>
          {isFavorite ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleRemoveFavorite}
            >
              <FontAwesome5
                name="heart-broken"
                style={styles.icons}
                color="#f00"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleAddFavorite}>
              <AntDesign name="heart" style={styles.icons} color="0f0" />
            </TouchableOpacity>
          )}
          {inPlaylist ? (
            <TouchableOpacity style={styles.button}>
              <MaterialIcons name="playlist-add-check" style={styles.icons} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOpenModal(true)}
            >
              <MaterialIcons name="playlist-add" style={styles.icons} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <AntDesign name="stepbackward" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={play}>
            {isPlaying ? (
              <AntDesign name="pause" style={styles.icon} />
            ) : (
              <AntDesign name="play" style={styles.icon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="stepforward" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Modal
          open={openModal}
          close={() => setOpenModal(false)}
          musicData={data}
        />
      </View>
    );
  }
}

export default PlayingScreen;
