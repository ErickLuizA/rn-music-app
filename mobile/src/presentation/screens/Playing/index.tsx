import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { PlayingMusic, SearchedData } from '../../../domain/entities/Music'
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

import Modal, { IPlaylists } from '../../components/Modal'

interface IPlayingScreen {
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
    backgroundColor: '#111',
    padding: 20,
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
  },

  iconContainer: {
    flexDirection: 'row',
  },

  touchable: {
    width: 250,
    height: 100,
    justifyContent: 'space-between',
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

export default function PlayingScreen({
  loadSound,
  loadPlaylistMusics,
  loadPlaylists,
  loadFavorites,
  createFavorite,
  deleteFavorite,
  createRecent,
  loadRecent,
  addPlaylistMusic,
  createPlaylistUseCase,
}: IPlayingScreen) {
  const { params } = useRoute<{
    params: {
      data: PlayingMusic | SearchedData
    }
    name: string
    key: string
  }>()

  const data = params?.data as PlayingMusic
  const searchedData = params?.data as SearchedData

  const playback = new Audio.Sound()

  const [isPlaying, setIsPlaying] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [inPlaylist, setInPlaylist] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [playlists, setPlaylists] = useState<IPlaylists>()

  const playingMusicId = useRef<string>()

  useEffect(() => {
    if (!params?.data) {
      return
    }

    if (playingMusicId.current === data.id || searchedData.id.videoId) {
      return
    }

    playback.unloadAsync().then(() => setLoaded(false))

    playingMusicId.current = data.id || searchedData.id.videoId

    async function getMusic() {
      try {
        const response = await loadSound.execute({
          id: searchedData.id.videoId || data?.id,
        })

        await playback.loadAsync({ uri: response[0].url })
        await playback.playAsync()
      } catch (error) {
        console.log(error.response.data)
      }
    }

    getMusic()

    playback?.setOnPlaybackStatusUpdate(async (status) => {
      if (status.isLoaded) {
        setLoaded(true)
      } else {
        setLoaded(false)
      }

      console.log('status', status)

      if (status.isPlaying) {
        setIsPlaying(true)
      } else {
        setIsPlaying(false)
      }

      if (status.didJustFinish) {
        setIsPlaying(false)
      }
    })

    getFavorites(loadFavorites, searchedData, data).then((bool) =>
      setIsFavorite(bool),
    )

    getPlaylistMusics(loadPlaylistMusics, searchedData, data).then((bool) =>
      setInPlaylist(bool),
    )

    setRecent(loadRecent, createRecent, searchedData, data)

    return () => playback._clearSubscriptions()
  }, [params]) // eslint-disable-line react-hooks/exhaustive-deps

  const play = async () =>
    isPlaying ? await playback?.pauseAsync() : await playback?.playAsync()

  const handleAddFavorite = async () => {
    await createFavorite.execute({
      musicId: searchedData.id.videoId || data?.id,
      img: data?.img,
      title: data?.title,
    })

    setIsFavorite(true)
  }

  const handleRemoveFavorite = async () => {
    await deleteFavorite.execute({
      id: searchedData.id.videoId || data?.id,
    })

    setIsFavorite(false)
  }

  const handleOpenModal = async () => {
    setOpenModal(true)

    const p = await loadPlaylists.execute()

    setPlaylists(p)
  }

  if (!params?.data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nothing playing :(</Text>
      </View>
    )
  } else if (params?.data && !loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" size="large" />
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
          source={{ uri: data?.img }}
          resizeMode="contain"
        />
        <Text style={styles.title}>{data?.title}</Text>
        <View style={[styles.iconContainer, styles.touchable]}>
          {isFavorite ? (
            <RectButton style={styles.button} onPress={handleRemoveFavorite}>
              <FontAwesome5 name="heart" style={styles.icons} color="#f00" />
            </RectButton>
          ) : (
            <RectButton style={styles.button} onPress={handleAddFavorite}>
              <AntDesign name="hearto" style={styles.icons} color="0f0" />
            </RectButton>
          )}
          {inPlaylist ? (
            <RectButton style={styles.button}>
              <MaterialIcons name="playlist-add-check" style={styles.icons} />
            </RectButton>
          ) : (
            <RectButton style={styles.button} onPress={() => handleOpenModal()}>
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
          data={data}
          searchedData={searchedData}
          playlists={playlists!}
          addPlaylistMusic={addPlaylistMusic}
          createPlaylistUseCase={createPlaylistUseCase}
        />
      </View>
    )
  }
}
