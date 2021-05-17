import React, { createContext, ReactChild, useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import { Sound } from '../../domain/entities/Sound'

interface IPlayingContext {
  isPlaying: boolean
  loading: boolean
  play: () => Promise<void>
  pause: () => Promise<void>
  addSound: (newSound: Sound) => Promise<void>
}

export const PlayingContext = createContext({} as IPlayingContext)

interface IPlayingProvider {
  children: ReactChild
}

export function PlayingProvider({ children }: IPlayingProvider) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)

  const [sounds, setSounds] = useState<Sound[]>([])
  const [current, setCurrent] = useState(0)

  const [playingSound, setPlayingSound] = useState<Audio.Sound>()

  useEffect(() => {
    if (playingSound) {
      playingSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          setLoading(false)

          if (status.isPlaying) {
            setIsPlaying(true)
          }

          if (!status.isPlaying) {
            setIsPlaying(false)
          }
        }
      })
    }

    return () => playingSound?._clearSubscriptions()
  }, [playingSound])

  async function addSound(newSound: Sound) {
    await playingSound?.stopAsync()

    await playingSound?.unloadAsync()

    const newList = sounds?.filter(sound => sound.id !== newSound.id)

    newList.push(newSound)

    setSounds(newList)

    setCurrent(newList.length - 1)
  }

  async function play() {
    if (playingSound?._loaded) {
      await playingSound.playAsync()
    } else {
      const permission = await Audio.getPermissionsAsync()

      if (permission.granted) {
        const { sound } = await Audio.Sound.createAsync(
          {
            uri: sounds[current].url,
          },
          {
            shouldPlay: true,
          },
        )

        setPlayingSound(sound)
      } else {
        await Audio.requestPermissionsAsync()

        play()
      }
    }
  }

  async function pause() {
    await playingSound?.pauseAsync()
  }

  return (
    <PlayingContext.Provider
      value={{
        isPlaying,
        pause,
        loading,
        play,
        addSound,
      }}>
      {children}
    </PlayingContext.Provider>
  )
}
