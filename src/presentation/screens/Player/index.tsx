import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ToastAndroid, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Music } from '../../../domain/entities/Music'
import { Sound } from '../../../domain/entities/Sound'
import { ILoadSoundUseCase } from '../../../domain/useCases/ILoadSoundUseCase'

import styles from './styles'

interface IPlayer {
  loadSound: ILoadSoundUseCase
}

export default function Player({ loadSound }: IPlayer) {
  const { params } = useRoute<{
    params: { item: Music }
    name: string
    key: string
  }>()

  const [sound, setSound] = useState<Sound>()
  const [loading, setLoading] = useState(true)

  const handleGetSound = useCallback(async () => {
    try {
      const response = await loadSound.execute({ id: params.item.id })

      setSound(response)
    } catch (error) {
      ToastAndroid.show('Erro ao carregar som', ToastAndroid.SHORT)
    }

    setLoading(false)
  }, [loadSound, params])

  useEffect(() => {
    handleGetSound()
  }, [handleGetSound])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    )
  }

  return <View style={styles.container} />
}
