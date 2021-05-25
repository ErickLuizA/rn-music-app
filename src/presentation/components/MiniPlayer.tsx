import React, { useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { RectButton, Swipeable } from 'react-native-gesture-handler'
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

  swipeContainer: {
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

interface IMiniPlayer {
  handleFavorite: (item: Music) => Promise<void>
  handleDeleteFavorite: (item: Music) => Promise<void>
}

const RightSwipeActions = () => {
  return (
    <View style={styles.swipeContainer}>
      <Text style={styles.text}>Stop</Text>
    </View>
  )
}

export default function MiniPlayer({
  handleFavorite,
  handleDeleteFavorite,
}: IMiniPlayer) {
  const { loading, currentMusicInfo, isPlaying, pause, play, clear } =
    useContext(PlayingContext)

  const navigation = useNavigation()

  function navigateToPlayer() {
    navigation.navigate('Player', {
      comeback: true,
    })
  }

  async function onSwipeableRightOpen() {
    await clear()
  }

  if (loading) {
    return null
  }

  return (
    <Swipeable
      onSwipeableRightOpen={onSwipeableRightOpen}
      renderRightActions={RightSwipeActions}>
      <View style={styles.container}>
        <RectButton
          onPress={() =>
            currentMusicInfo?.isFavorite
              ? handleDeleteFavorite(currentMusicInfo!)
              : handleFavorite(currentMusicInfo!)
          }>
          {currentMusicInfo?.isFavorite ? (
            <Icon name="favorite" style={styles.icon} />
          ) : (
            <Icon name="favorite-border" style={styles.icon} />
          )}
        </RectButton>
        <RectButton onPress={navigateToPlayer}>
          <Text style={styles.text}>
            {currentMusicInfo?.title !== undefined &&
            currentMusicInfo?.title?.length > 25
              ? currentMusicInfo?.title?.slice(0, 25).concat('...')
              : currentMusicInfo?.title}
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
    </Swipeable>
  )
}
