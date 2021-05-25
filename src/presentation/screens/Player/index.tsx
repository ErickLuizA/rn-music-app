import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ActivityIndicator, ToastAndroid, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Music } from '../../../domain/entities/Music'
import { ILoadSoundUseCase } from '../../../domain/useCases/ILoadSoundUseCase'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ICreateFavoritesUseCase } from '../../../domain/useCases/ICreateFavoriteUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'
import { ILoadPlaylistsUseCase } from '../../../domain/useCases/ILoadPlaylistsUseCase'
import { IAddPlaylistUseCase } from '../../../domain/useCases/IAddPlaylistMusicUseCase'
import { ICreatePlaylistUseCase } from '../../../domain/useCases/ICreatePlaylistUseCase'

import { PlayingContext } from '../../contexts/PlayingContext'

import PlaylistModal from './components/PlaylistModal'

import styles from './styles'

interface IPlayer {
  loadSound: ILoadSoundUseCase
  createRecent: ICreateRecentUseCase
  loadFavorites: ILoadFavoritesUseCase
  createFavorite: ICreateFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
  loadPlaylists: ILoadPlaylistsUseCase
  addPlaylistMusic: IAddPlaylistUseCase
  createPlaylist: ICreatePlaylistUseCase
}

export default function Player({
  loadSound,
  createRecent,
  loadFavorites,
  createFavorite,
  deleteFavorite,
  addPlaylistMusic,
  createPlaylist,
  loadPlaylists,
}: IPlayer) {
  const { params } =
    useRoute<{
      params: { item: Music; comeback: boolean }
      name: string
      key: string
    }>()

  const [open, setOpen] = useState(false)

  const navigation = useNavigation()

  const {
    play,
    pause,
    next,
    previous,
    loading,
    isPlaying,
    addSound,
    unload,
    updateFavorite,
    currentMusicInfo,
  } = useContext(PlayingContext)

  const opacityValue = useSharedValue(1)

  const styledOpacity = useAnimatedStyle(() => {
    const config = {
      duration: 500,
      easing: Easing.ease,
    }

    return {
      opacity: withTiming(opacityValue.value, config),
    }
  }, [opacityValue])

  const handleGetSound = useCallback(async () => {
    if (params.item.id === currentMusicInfo?.id) {
      return
    } else {
      try {
        await unload()

        const response = await loadSound.execute({ id: params.item.id })

        const favorites = await loadFavorites.execute()

        const paramMusic = new Music(
          params.item.id,
          params.item.title,
          params.item.image,
          params.item.isFavorite,
        )

        const isFavorite = favorites.find(fav => fav.id === paramMusic.id)

        if (isFavorite) {
          paramMusic.favorite()
        } else {
          paramMusic.unFavorite()
        }

        await addSound({
          id: params.item.id,
          url: response.url,
          music: paramMusic,
        })

        await createRecent.execute(paramMusic)
      } catch (error) {
        console.log(error)

        ToastAndroid.show('Erro ao carregar som', ToastAndroid.SHORT)
      }
    }
  }, [loadSound, params]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleGoback() {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
  }

  const handleFavorite = async (item: Music) => {
    try {
      await createFavorite.execute({
        favoriteId: item.id,
        img: item.image,
        title: item.title,
      })

      item.favorite()

      updateFavorite(item)

      ToastAndroid.show('Música adicionada aos favoritos', ToastAndroid.SHORT)
    } catch (error) {
      ToastAndroid.show('Erro ao favoritar música', ToastAndroid.SHORT)
    }
  }

  const handleDeleteFavorite = async (item: Music) => {
    try {
      await deleteFavorite.execute({
        id: item.id,
      })

      item.unFavorite()

      updateFavorite(item)

      ToastAndroid.show('Música retirada dos favoritos', ToastAndroid.SHORT)
    } catch (error) {
      ToastAndroid.show('Erro ao deletar favorito', ToastAndroid.SHORT)
    }
  }

  const handleOpenModal = () => {
    opacityValue.value = 0.7

    setOpen(true)
  }

  const handleCloseModal = () => {
    opacityValue.value = 1

    setOpen(false)
  }

  useEffect(() => {
    if (params.comeback) {
      return
    } else {
      handleGetSound()
    }
  }, [handleGetSound, params.comeback])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    )
  }

  return (
    <Animated.View style={[styles.container, styledOpacity]}>
      <RectButton
        onPress={handleGoback}
        rippleColor="#555"
        style={styles.topIcon}>
        <Icon name="expand-more" style={styles.icon} />
      </RectButton>
      <View>
        <Animated.Image
          style={[styles.image, styledOpacity]}
          source={{ uri: currentMusicInfo?.image }}
          resizeMode="contain"
        />
        <Animated.Text style={[styles.title, styledOpacity]}>
          {currentMusicInfo?.title}
        </Animated.Text>
      </View>
      <View style={[styles.iconContainer, styles.touchable]}>
        {currentMusicInfo?.isFavorite ? (
          <RectButton
            style={styles.button}
            rippleColor="#555"
            onPress={() => handleDeleteFavorite(currentMusicInfo)}>
            <Icon name="favorite" style={styles.icons} color="#f00" />
          </RectButton>
        ) : (
          <RectButton
            style={styles.button}
            rippleColor="#555"
            onPress={() => handleFavorite(currentMusicInfo!)}>
            <Icon name="favorite-border" style={styles.icons} color="0f0" />
          </RectButton>
        )}
        <RectButton
          style={styles.button}
          rippleColor="#555"
          onPress={handleOpenModal}>
          <Icon name="playlist-add" style={styles.icons} />
        </RectButton>
      </View>
      <View style={styles.iconContainer}>
        <RectButton onPress={previous} rippleColor="#555">
          <Icon name="skip-previous" style={styles.icon} />
        </RectButton>
        <RectButton
          rippleColor="#555"
          onPress={() => (isPlaying ? pause() : play())}>
          {isPlaying ? (
            <Icon name="pause" style={styles.icon} />
          ) : (
            <Icon name="play-arrow" style={styles.icon} />
          )}
        </RectButton>
        <RectButton onPress={next} rippleColor="#555">
          <Icon name="skip-next" style={styles.icon} />
        </RectButton>
      </View>
      <PlaylistModal
        open={open}
        close={handleCloseModal}
        music={currentMusicInfo!}
        addPlaylistMusic={addPlaylistMusic}
        createPlaylist={createPlaylist}
        loadPlaylists={loadPlaylists}
      />
    </Animated.View>
  )
}
