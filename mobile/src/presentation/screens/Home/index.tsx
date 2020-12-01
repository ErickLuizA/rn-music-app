import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Recent } from '../../../domain/entities/Recent'
import { Music, PlayingMusic } from '../../../domain/entities/Music'
import { ILoadMusicsUseCase } from '../../../domain/useCases/ILoadMusicsUseCause'
import { ILoadRecentUseCase } from '../../../domain/useCases/ILoadRecentUseCase'
import { ILoadSoundUseCase } from '../../../domain/useCases/ILoadSoundUseCase'
import { IAddPlaylistUseCase } from '../../../domain/useCases/IAddPlaylistMusicUseCase'
import { ICreateFavoritesUseCase } from '../../../domain/useCases/ICreateFavoriteUseCase'
import { ICreatePlaylistUseCase } from '../../../domain/useCases/ICreatePlaylistUseCase'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ILoadPlaylistMusicUseCase } from '../../../domain/useCases/ILoadPlaylistMusicsUseCase'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { PanGestureHandler } from 'react-native-gesture-handler'

import Card from '../../components/Card'
import Player from './Player'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import MiniPlayer from './MiniPlayer'

const HEIGHT = Dimensions.get('window').height

interface IHomeScreen {
  loadMusics: ILoadMusicsUseCase
  loadRecent: ILoadRecentUseCase
  loadSound: ILoadSoundUseCase
  loadPlaylistMusics: ILoadPlaylistMusicUseCase
  loadPlaylists: ILoadPlaylistsUseCase
  loadFavorites: ILoadFavoritesUseCase
  createFavorite: ICreateFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
  createRecent: ICreateRecentUseCase
  addPlaylistMusic: IAddPlaylistUseCase
  createPlaylistUseCase: ICreatePlaylistUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,

    backgroundColor: '#111',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },

  icon: {
    fontSize: 26,
    paddingRight: 10,
  },

  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },

  sections: {
    paddingTop: 30,
  },

  text: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
  },

  trending: {
    paddingTop: 20,
  },

  recent: {
    paddingTop: 10,
  },

  categoryText: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
  },

  white: {
    color: '#ddd',
  },
})

export default function HomeScreen({
  loadMusics,
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
}: IHomeScreen) {
  const [musics, setMusics] = useState<Music[]>([])
  const [recent, setRecent] = useState<Recent[]>()

  const [playingMusic, setPlayingMusic] = useState<PlayingMusic>()

  const getRecentPlayed = useCallback(async () => {
    let recentPlayed: Recent[] = []

    const musicPlayed = await loadRecent.execute()

    for (const music in musicPlayed) {
      recentPlayed.unshift(musicPlayed[music]._raw)
    }

    setRecent(recentPlayed)
  }, [loadRecent])

  useEffect(() => {
    async function getMusics() {
      try {
        const response = await loadMusics.execute({
          part: 'snippet',
          videoCategoryId: '10',
          chart: 'mostPopular',
          maxResults: 20,
          key: process.env.API_KEY!,
        })

        setMusics(response.items)
      } catch (err) {
        console.log(err)
      }
    }

    getMusics()
    getRecentPlayed()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeMusic = async (item: Music) => {
    if (item.id === playingMusic?.id) {
      return
    }

    setPlayingMusic({
      id: item.id,
      title: item.snippet.title,
      img: item.snippet.thumbnails.high.url,
    })

    getRecentPlayed()
  }

  const BOTTOM = HEIGHT / 1.1
  const TOP = -50

  const posY = useSharedValue(BOTTOM)

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.posY = posY.value
    },
    onActive(event: any, ctx: any) {
      if (event.translationY < -50) {
        posY.value = withTiming(TOP, { duration: 400 })
      } else if (event.translationY > 50) {
        posY.value = withTiming(BOTTOM, { duration: 400 })
      } else {
        posY.value = ctx.posY + event.translationY
      }
    },

    onEnd() {
      if (posY.value < TOP) {
        posY.value = TOP
      } else if (posY.value > BOTTOM) {
        posY.value = BOTTOM
      }
    },
  })

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: posY.value }],
    }
  })

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        posY.value,
        [BOTTOM, TOP],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    }
  })

  const opacityStyle2 = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        posY.value,
        [BOTTOM, TOP],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    }
  })

  if (musics.length < 1) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.sections, opacityStyle2]}>
        <View style={styles.trending}>
          <Text style={[styles.white, styles.categoryText]}>Tendência</Text>
          <FlatList
            data={musics}
            keyExtractor={(item) => item.id + Math.random()}
            horizontal={true}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                title={item.snippet.title}
                img={item.snippet.thumbnails.high.url}
                onPress={() => handleChangeMusic(item)}
              />
            )}
          />
        </View>
        <View style={styles.recent}>
          <Text style={[styles.white, styles.categoryText]}>
            Recentemente tocadas
          </Text>
          <FlatList
            data={recent}
            keyExtractor={(item) => item.music_id + Math.random()}
            horizontal={true}
            renderItem={({ item }) => (
              <Card
                id={item.music_id}
                title={item.title}
                img={item.img}
                onPress={() =>
                  handleChangeMusic({
                    id: item.music_id,
                    snippet: {
                      title: item.title,
                      thumbnails: { high: { url: item.img } },
                    },
                  })
                }
              />
            )}
          />
        </View>
      </Animated.View>
      {playingMusic && (
        <PanGestureHandler {...{ onGestureEvent }}>
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
              },
              positionStyle,
            ]}>
            <MiniPlayer {...{ HEIGHT, playingMusic, opacityStyle }} />
            <Player
              music={playingMusic}
              loadSound={loadSound}
              loadPlaylistMusics={loadPlaylistMusics}
              loadPlaylists={loadPlaylists}
              loadFavorites={loadFavorites}
              createFavorite={createFavorite}
              deleteFavorite={deleteFavorite}
              createRecent={createRecent}
              loadRecent={loadRecent}
              addPlaylistMusic={addPlaylistMusic}
              createPlaylistUseCase={createPlaylistUseCase}
            />
          </Animated.View>
        </PanGestureHandler>
      )}
    </SafeAreaView>
  )
}
