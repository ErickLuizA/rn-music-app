import React from 'react'
import { Image, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { PlayingMusic } from '../../../domain/entities/Music'

interface IMiniPlayer {
  playingMusic: PlayingMusic
  HEIGHT: number
  opacityStyle: { opacity: number }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    borderTopColor: '#000',
    borderTopWidth: 1,
  },
})

export default function MiniPlayer({
  playingMusic,
  HEIGHT,
  opacityStyle,
}: IMiniPlayer) {
  return (
    <Animated.View style={[styles.container, opacityStyle]}>
      <Image
        source={{ uri: playingMusic?.img }}
        style={{ width: HEIGHT / 8, height: HEIGHT / 10 }}
      />
      <Icon name="skip-previous" color="#fff" size={30} />
      <Icon name="play-arrow" color="#fff" size={30} />
      <Icon name="skip-next" color="#fff" size={30} />
    </Animated.View>
  )
}
