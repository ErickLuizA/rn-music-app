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
import { PlayingContext } from '../../contexts/PlayingContext'

import styles from './styles'

interface IPlayer {
  loadSound: ILoadSoundUseCase
}

export default function Player({ loadSound }: IPlayer) {
  const { params } = useRoute<{
    params: { item: Music; comeback: boolean }
    name: string
    key: string
  }>()

  const navigation = useNavigation()

  const { play, pause, loading, isPlaying, addSound, music } = useContext(
    PlayingContext,
  )

  const handleGetSound = useCallback(async () => {
    try {
      const response = await loadSound.execute({ id: params.item.id })

      await addSound({
        id: params.item.id,
        url: response.url,
        music: params.item,
      })
    } catch (error) {
      console.log(error)

      ToastAndroid.show('Erro ao carregar som', ToastAndroid.SHORT)
    }
  }, [loadSound, params]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleGoback() {
    if (navigation.canGoBack()) {
      navigation.goBack()
    }
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
