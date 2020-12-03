import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from 'react-native'
import {
  add,
  destroy,
  pause,
  play,
  setupPlayer,
  updateOptions,
  addEventListener,
} from 'react-native-track-player'
import { RectButton } from 'react-native-gesture-handler'
import { PlayingMusic } from '../../../domain/entities/Music'
import { ILoadSoundUseCase } from '../../../domain/useCases/ILoadSoundUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ICreateFavoritesUseCase } from '../../../domain/useCases/ICreateFavoriteUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { IAddPlaylistUseCase } from '../../../domain/useCases/IAddPlaylistMusicUseCase'
import { ICreatePlaylistUseCase } from '../../../domain/useCases/ICreatePlaylistUseCase'
import { getFavorites, getPlaylistMusics, setRecent } from './helper-functions'

import Modal from '../../components/Modal'
import { Playlist } from '../../../domain/entities/Playlist'

interface IPlayer {
  music: PlayingMusic
  loadSound: ILoadSoundUseCase
  loadPlaylistMusics: ILoadPlaylistMusicUseCase
  loadPlaylists: ILoadPlaylistsUseCase
  loadFavorites: ILoadFavoritesUseCase
  createFavorite: ICreateFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
  createRecent: ICreateRecentUseCase
  loadRecent: ILoadRecentUseCase
  addPlaylistMusic: IAddPlaylistUseCase
  createPlaylistUseCase: ICreatePlaylistUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 400,
    height: 400,
    borderRadius: 20,
    resizeMode: 'contain',
  },

  title: {
    color: '#ddd',
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
    paddingBottom: 40,
    textAlign: 'center',
  },

  iconContainer: {
    flexDirection: 'row',
  },

  touchable: {
    width: 250,
    height: 100,
    justifyContent: 'space-between',
  },

  topIcon: {
    position: 'absolute',
    top: -20,
    left: 0,
  },

  button: {
    width: 50,
  },

  icon: {
    fontSize: 50,
    color: '#ddd',
    padding: 25,
  },

  icons: {
    fontSize: 30,
    color: '#ddd',
    alignSelf: 'stretch',
  },
})

export default function Player({
  music,
  loadPlaylistMusics,
  loadPlaylists,
  loadFavorites,
  createFavorite,
  deleteFavorite,
  createRecent,
  loadRecent,
  addPlaylistMusic,
  createPlaylistUseCase,
}: IPlayer) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [inPlaylist, setInPlaylist] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [playlists, setPlaylists] = useState<Playlist[]>()

  useEffect(() => {
    async function loadPlayer() {
      await setupPlayer()
    }

    loadPlayer()
  }, [])

  useEffect(() => {
    if (!music) {
      return
    }

    async function playMusic() {
      try {
        await add({
          id: music.id,
          url: music.url,
          title: music.title,
          artist: music.title,
        })

        play()
        setLoaded(true)
        setIsPlaying(true)
      } catch (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT)
      }
    }

    playMusic()

    getFavorites(loadFavorites, music).then((bool) => setIsFavorite(bool))

    getPlaylistMusics(loadPlaylistMusics, music).then((bool) =>
      setInPlaylist(bool),
    )

    setRecent(loadRecent, createRecent, music)

    return () => {
      destroy()
    }
  }, [music]) // eslint-disable-line react-hooks/exhaustive-deps

  addEventListener('playback-state', (data) => {
    console.log('data', data)
  })

  updateOptions({
    stopWithApp: true,
  })

  const handlePlay = async () => {
    isPlaying ? await pause() : await play()

    setIsPlaying((current) => !current)
  }

  const handleAddFavorite = async () => {
    setIsFavorite(true)

    try {
      await createFavorite.execute({
        musicId: music?.id,
        img: music?.img,
        title: music?.title,
      })
    } catch (error) {
      ToastAndroid.show(
        'Erro ao adicionar música aos favoritos',
        ToastAndroid.SHORT,
      )

      setIsFavorite(false)
    }
  }

  const handleRemoveFavorite = async () => {
    setIsFavorite(false)

    try {
      await deleteFavorite.execute({
        id: music?.id,
      })
    } catch (error) {
      ToastAndroid.show(
        'Erro ao remover música dos favoritos',
        ToastAndroid.SHORT,
      )

      setIsFavorite(true)
    }
  }

  const handleOpenModal = async () => {
    setOpenModal(true)

    const p = await loadPlaylists.execute()

    setPlaylists(p)
  }

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Icon name="expand-more" style={[styles.icon, styles.topIcon]} />
        <Image
          style={styles.image}
          source={{ uri: music?.img }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{music?.title}</Text>
        <View style={[styles.iconContainer, styles.touchable]}>
          {isFavorite ? (
            <RectButton style={styles.button} onPress={handleRemoveFavorite}>
              <Icon name="favorite" style={styles.icons} color="#f00" />
            </RectButton>
          ) : (
            <RectButton style={styles.button} onPress={handleAddFavorite}>
              <Icon name="favorite-outline" style={styles.icons} color="0f0" />
            </RectButton>
          )}
          {inPlaylist ? (
            <RectButton style={styles.button}>
              <Icon name="playlist-add-check" style={styles.icons} />
            </RectButton>
          ) : (
            <RectButton style={styles.button} onPress={() => handleOpenModal()}>
              <Icon name="playlist-add" style={styles.icons} />
            </RectButton>
          )}
        </View>
        <View style={styles.iconContainer}>
          <RectButton>
            <Icon name="skip-previous" style={styles.icon} />
          </RectButton>
          <RectButton onPress={handlePlay}>
            {isPlaying ? (
              <Icon name="pause" style={styles.icon} />
            ) : (
              <Icon name="play-arrow" style={styles.icon} />
            )}
          </RectButton>
          <RectButton>
            <Icon name="skip-next" style={styles.icon} />
          </RectButton>
        </View>
        <Modal
          open={openModal}
          close={() => setOpenModal(false)}
          data={music}
          playlists={playlists!}
          addPlaylistMusic={addPlaylistMusic}
          createPlaylistUseCase={createPlaylistUseCase}
        />
      </View>
    )
  }
}
