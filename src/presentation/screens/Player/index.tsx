import React, { useCallback, useContext, useEffect } from 'react'
import {
  ActivityIndicator,
  ToastAndroid,
  View,
  Image,
  Text,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Music } from '../../../domain/entities/Music'
import { ILoadSoundUseCase } from '../../../domain/useCases/ILoadSoundUseCase'
import { ICreateRecentUseCase } from '../../../domain/useCases/ICreateRecentUseCase'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { ICreateFavoritesUseCase } from '../../../domain/useCases/ICreateFavoriteUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'

import { PlayingContext } from '../../contexts/PlayingContext'

import styles from './styles'

interface IPlayer {
  loadSound: ILoadSoundUseCase
  createRecent: ICreateRecentUseCase
  loadFavorites: ILoadFavoritesUseCase
  createFavorite: ICreateFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
}

export default function Player({
  loadSound,
  createRecent,
  loadFavorites,
  createFavorite,
  deleteFavorite,
}: IPlayer) {
  const { params } = useRoute<{
    params: { item: Music; comeback: boolean }
    name: string
    key: string
  }>()

  const navigation = useNavigation()

  const {
    play,
    pause,
    loading,
    isPlaying,
    addSound,
    stopPlaying,
    music,
    setMusic,
  } = useContext(PlayingContext)

  const handleGetSound = useCallback(async () => {
    if (params.item.id === music?.id) {
      return
    } else {
      try {
        await stopPlaying()

        const response = await loadSound.execute({ id: params.item.id })

        const favorites = await loadFavorites.execute()

        let paramMusic = params.item

        const isFavorite = favorites.find(fav => fav.id === paramMusic.id)

        if (isFavorite) {
          paramMusic = paramMusic.favorite()
        }

        await addSound({
          id: params.item.id,
          url: response.url,
          music: paramMusic,
        })

        await createRecent.execute(paramMusic)
      } catch (error) {
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

      setMusic(item.favorite())

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

      setMusic(item.unFavorite())

      ToastAndroid.show('Música retirada dos favoritos', ToastAndroid.SHORT)
    } catch (error) {
      ToastAndroid.show('Erro ao deletar favorito', ToastAndroid.SHORT)
    }
  }

  const handleOpenModal = () => {}

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
    <View style={styles.container}>
      <RectButton onPress={handleGoback} style={styles.topIcon}>
        <Icon name="expand-more" style={styles.icon} />
      </RectButton>
      <Image
        style={styles.image}
        source={{ uri: music?.image }}
        resizeMode="contain"
      />
      <Text style={styles.title}>{music?.title}</Text>
      <View style={[styles.iconContainer, styles.touchable]}>
        {music?.isFavorite ? (
          <RectButton
            style={styles.button}
            onPress={() => handleDeleteFavorite(music)}>
            <Icon name="favorite" style={styles.icons} color="#f00" />
          </RectButton>
        ) : (
          <RectButton
            style={styles.button}
            onPress={() => handleFavorite(music!)}>
            <Icon name="favorite-border" style={styles.icons} color="0f0" />
          </RectButton>
        )}
        <RectButton style={styles.button} onPress={handleOpenModal}>
          <Icon name="playlist-add" style={styles.icons} />
        </RectButton>
      </View>
      <View style={styles.iconContainer}>
        <RectButton>
          <Icon name="skip-previous" style={styles.icon} />
        </RectButton>
        <RectButton onPress={() => (isPlaying ? pause() : play())}>
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
    </View>
  )
}
