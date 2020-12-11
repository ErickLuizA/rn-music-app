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
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerProgress,
} from 'react-native-track-player'
import { RectButton } from 'react-native-gesture-handler'
import { PlayingMusic } from '../../../domain/entities/Music'
import { ILoadSoundUseCase } from '../../../domain/useCases/ILoadSoundUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ICreateFavoritesUseCase } from '../../../domain/useCases/ICreateFavoriteUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { IAddPlaylistUseCase } from '../../../domain/useCases/IAddPlaylistMusicUseCase'
import { ICreatePlaylistUseCase } from '../../../domain/useCases/ICreatePlaylistUseCase'
import { getFavorites, setRecent } from './helper-functions'

import Modal from '../../components/Modal'
import { Playlist } from '../../../domain/entities/Playlist'

interface IPlayer {
  music: PlayingMusic
  loadSound: ILoadSoundUseCase
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

  progress: {
    height: 2,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },

  progressPos: {
    backgroundColor: 'red',
  },

  fullBar: {
    backgroundColor: 'grey',
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
  loadPlaylists,
  loadFavorites,
  createFavorite,
  deleteFavorite,
  createRecent,
  loadRecent,
  addPlaylistMusic,
  createPlaylistUseCase,
}: IPlayer) {
  const [favorite, setFavorite] = useState<string | null>('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [playlists, setPlaylists] = useState<Playlist[]>()

  const playbackState = usePlaybackState()
  const progress = useTrackPlayerProgress()

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer()

      await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
        notificationCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
      })

      TrackPlayer.addEventListener('remote-play', async () => {
        await TrackPlayer.play()
      })

      TrackPlayer.addEventListener('remote-pause', async () => {
        await TrackPlayer.pause()
      })
    }

    setup()

    return () => {
      TrackPlayer.reset()
      TrackPlayer.stop()
      TrackPlayer.destroy()
    }
  }, [])

  useEffect(() => {
    if (!music) {
      return
    }

    async function playMusic() {
      try {
        await TrackPlayer.add({
          id: music.id,
          url: music.url,
          title: music.title,
          artist: music.title,
        })

        TrackPlayer.play()
        setLoaded(true)
      } catch (error) {
        ToastAndroid.show('Erro ao tocar a música', ToastAndroid.SHORT)
      }
    }

    playMusic()

    getFavorites(loadFavorites, music).then((fav) => {
      setFavorite(fav)
      if (fav) {
        setIsFavorite(true)
      }
    })

    setRecent(loadRecent, createRecent, music)
  }, [music]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePlay = async () => {
    if (playbackState === TrackPlayer.STATE_STOPPED) {
      await TrackPlayer.reset()

      await TrackPlayer.add({
        id: music.id,
        url: music.url,
        title: music.title,
        artist: music.title,
      })

      await TrackPlayer.play()
    }

    if (playbackState === TrackPlayer.STATE_PAUSED) {
      await TrackPlayer.play()
    } else {
      await TrackPlayer.pause()
    }
  }

  const handleAddFavorite = async () => {
    setIsFavorite(true)

    try {
      const favId = await createFavorite.execute({
        musicId: music?.id,
        img: music?.img,
        title: music?.title,
      })

      setFavorite(favId)
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
        id: favorite ?? '',
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
          <RectButton style={styles.button} onPress={() => handleOpenModal()}>
            <Icon name="playlist-add" style={styles.icons} />
          </RectButton>
        </View>
        <View style={styles.progress}>
          <View style={[{ flex: progress.position }, styles.progressPos]} />
          <View
            style={[
              {
                flex: progress.duration - progress.position,
              },
              styles.fullBar,
            ]}
          />
        </View>
        <View style={styles.iconContainer}>
          <RectButton>
            <Icon name="skip-previous" style={styles.icon} />
          </RectButton>
          <RectButton onPress={handlePlay}>
            {playbackState === TrackPlayer.STATE_PAUSED ? (
              <Icon name="play-arrow" style={styles.icon} />
            ) : (
              <Icon name="pause" style={styles.icon} />
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
