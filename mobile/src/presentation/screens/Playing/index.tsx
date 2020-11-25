import React, { useState, useEffect } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { Audio, AVPlaybackStatus } from 'expo-av'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { Music } from '../../../domain/entities/Music'
import { ILoadSoundUseCase } from '../../../domain/useCases/ILoadSoundUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ICreateFavoritesUseCase } from '../../../domain/useCases/ICreateFavoriteUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'

import Modal from '../../components/Modal'

import styles from './styles'

interface IPlayingScreen {
  loadSound: ILoadSoundUseCase
  loadPlaylistMusics: ILoadPlaylistMusicUseCase
  loadFavorites: ILoadFavoritesUseCase
  createFavorite: ICreateFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
  createRecent: ICreateRecentUseCase
  loadRecent: ILoadRecentUseCase
}

function PlayingScreen({
  loadSound,
  loadPlaylistMusics,
  loadFavorites,
  createFavorite,
  deleteFavorite,
  createRecent,
  loadRecent,
}: IPlayingScreen) {
  const { params } = useRoute<{
    params: { data: Music }
    name: string
    key: string
  }>()

  const data = params ? params.data : null

  const [isPlaying, setIsPlaying] = useState(false)
  const [playback, setPlayBack] = useState<{
    sound: Audio.Sound
    status: AVPlaybackStatus
  }>()
  const [isFavorite, setIsFavorite] = useState(false)
  const [inPlaylist, setInPlaylist] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (!data) {
      return
    } else if (playback?.sound && Object.keys(playback.sound).length > 0) {
      playback.sound.unloadAsync().then(() => setIsPlaying(false))
    }

    async function getMusic() {
      try {
        const response = await loadSound.execute({ id: data?.id! })

        const playBackInstance = await Audio.Sound.createAsync(
          { uri: response.url },
          {
            shouldPlay: true,
          },
        )

        setIsPlaying(true)
        setPlayBack(playBackInstance)

        const playedMusic = await loadRecent.execute('@RNplayed')

        if (playedMusic.length < 0) {
          await createRecent.execute({
            id: data?.id!,
            img: data?.snippet.thumbnails.high.url!,
            title: data?.snippet.title!,
          })
        } else if (playedMusic && playedMusic.find((m) => m.id === data?.id)) {
          await createRecent.execute({
            id: data?.id!,
            img: data?.snippet.thumbnails.high.url!,
            title: data?.snippet.title!,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    getMusic()
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!data) {
      return
    }

    async function getFavorites() {
      const response = await loadFavorites.execute()

      const isFavorited = response.filter(
        (music) => music.musicId === data?.id!,
      )

      if (isFavorited.length > 0) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }
    }

    getFavorites()
  }, [data, loadFavorites])

  useEffect(() => {
    if (!data) {
      return
    }

    async function getPlaylistMusics() {
      const response = await loadPlaylistMusics.execute({
        playlistId: data?.id!,
      })

      if (response.length > 0) {
        const onPlaylist = response.find((music) => music.id === data?.id!)

        setInPlaylist(Boolean(onPlaylist))
      }
    }

    getPlaylistMusics()
  }, [data, loadPlaylistMusics])

  const play = async () => {
    if (!playback) {
      return
    }

    isPlaying
      ? await playback.sound.pauseAsync()
      : await playback.sound.playAsync()

    setIsPlaying((current) => !current)

    if (playback.status.didJustFinish) {
      playback.sound.unloadAsync()
      setIsPlaying(false)
    }
  }

  const handleAddFavorite = async () => {
    await createFavorite.execute({
      musicId: data?.id!,
      img: data?.snippet.thumbnails.high.url!,
      title: data?.snippet.title!,
    })

    setIsFavorite(true)
  }

  const handleRemoveFavorite = async () => {
    await deleteFavorite.execute({
      id: data?.id!,
    })

    setIsFavorite(false)
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nothing playing :(</Text>
      </View>
    )
  } else if (data && !playback?.status.isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  } else {
    return (
      <View
        style={
          openModal
            ? [styles.container, { backgroundColor: 'rgba(0,0,0,0.7)' }]
            : styles.container
        }>
        <Image
          style={styles.image}
          source={{ uri: data.snippet.thumbnails.high.url }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{data.snippet.title}</Text>
        <View style={[styles.iconContainer, styles.touchable]}>
          {isFavorite ? (
            <RectButton style={styles.button} onPress={handleRemoveFavorite}>
              <FontAwesome5
                name="heart-broken"
                style={styles.icons}
                color="#f00"
              />
            </RectButton>
          ) : (
            <RectButton style={styles.button} onPress={handleAddFavorite}>
              <AntDesign name="heart" style={styles.icons} color="0f0" />
            </RectButton>
          )}
          {inPlaylist ? (
            <RectButton style={styles.button}>
              <MaterialIcons name="playlist-add-check" style={styles.icons} />
            </RectButton>
          ) : (
            <RectButton
              style={styles.button}
              onPress={() => setOpenModal(true)}>
              <MaterialIcons name="playlist-add" style={styles.icons} />
            </RectButton>
          )}
        </View>
        <View style={styles.iconContainer}>
          <RectButton>
            <AntDesign name="stepbackward" style={styles.icon} />
          </RectButton>
          <RectButton onPress={play}>
            {isPlaying ? (
              <AntDesign name="pause" style={styles.icon} />
            ) : (
              <AntDesign name="play" style={styles.icon} />
            )}
          </RectButton>
          <RectButton>
            <AntDesign name="stepforward" style={styles.icon} />
          </RectButton>
        </View>
        <Modal
          open={openModal}
          close={() => setOpenModal(false)}
          musicData={data}
        />
      </View>
    )
  }
}

export default PlayingScreen
