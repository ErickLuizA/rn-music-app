import { useNavigation } from '@react-navigation/core'
import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Music } from '../../domain/entities/Music'

import { PlayingContext } from '../contexts/PlayingContext'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: {
    fontSize: 40,
    color: '#ddd',
  },

  text: {
    color: '#ddd',
  },
})

interface IMiniPlayer {
  handleFavorite: (item: Music) => Promise<void>
  handleDeleteFavorite: (item: Music) => Promise<void>
}

export default function MiniPlayer({
  handleFavorite,
  handleDeleteFavorite,
}: IMiniPlayer) {
  const { loading, music, isPlaying, pause, play } = useContext(PlayingContext)

  const navigation = useNavigation()

  function navigateToPlayer() {
    navigation.navigate('Player', {
      comeback: true,
    })
  }

  if (loading) {
    return null
  }

  return (
    <View style={styles.container}>
      <RectButton
        onPress={() =>
          music?.isFavorite
            ? handleDeleteFavorite(music!)
            : handleFavorite(music!)
        }>
        {music?.isFavorite ? (
          <Icon name="favorite" style={styles.icon} />
        ) : (
          <Icon name="favorite-border" style={styles.icon} />
        )}
      </RectButton>
      <RectButton onPress={navigateToPlayer}>
        <Text style={styles.text}>
          {music?.title !== undefined && music?.title?.length > 25
            ? music?.title?.slice(0, 25).concat('...')
            : music?.title}
        </Text>
      </RectButton>
      <RectButton onPress={() => (isPlaying ? pause() : play())}>
        {isPlaying ? (
          <Icon name="pause" style={styles.icon} />
        ) : (
          <Icon name="play-arrow" style={styles.icon} />
        )}
      </RectButton>
    </View>
  )
}
