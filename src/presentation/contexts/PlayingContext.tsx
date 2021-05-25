import React, { createContext, ReactChild, useEffect, useState } from 'react'
import { Audio } from 'expo-av'

import { Sound } from '../../domain/entities/Sound'
import { Music } from '../../domain/entities/Music'

interface IPlayingContext {
  loading: boolean
  isPlaying: boolean
  currentMusicInfo: Music | undefined

  play: () => Promise<void>
  pause: () => Promise<void>
  unload: () => Promise<void>

  next: () => Promise<void>
  previous: () => Promise<void>

  addSound: (newSound: Sound) => Promise<void>
  updateFavorite: (item: Music) => void
  clear: () => Promise<void>
}

export const PlayingContext = createContext({} as IPlayingContext)

interface IPlayingProvider {
  children: ReactChild
}

export default function PlayingProvider({ children }: IPlayingProvider) {
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const [sounds, setSounds] = useState<Sound[]>([])
  const [current, setCurrent] = useState<number | null>(null)
  const [currentMusicInfo, setCurrentMusicInfo] = useState<Music>()

  const [playingSound, setPlayingSound] = useState<Audio.Sound>()

  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (current == null) {
      return
    } else {
      play()
    }
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (playingSound) {
      playingSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          setLoading(false)
          setCurrentMusicInfo(sounds[current ?? 0].music)

          if (status.isPlaying) {
            setIsPlaying(true)
          }

          if (!status.isPlaying) {
            setIsPlaying(false)
          }

          if (status.didJustFinish) {
            setFinished(true)
          }
        }

        if (!status.isLoaded) {
          setLoading(true)
        }
      })
    }

    return () => playingSound?._clearSubscriptions()
  }, [playingSound, current]) // eslint-disable-line react-hooks/exhaustive-deps

  function updateFavorite(item: Music) {
    const copiedSounds = sounds

    copiedSounds[current!].music = item

    setSounds(copiedSounds)

    const newMusic = new Music(item.id, item.title, item.image, item.isFavorite)

    setCurrentMusicInfo(newMusic)
  }

  async function addSound(newSound: Sound) {
    const newList = sounds?.filter(sound => sound.id !== newSound.id)

    newList.push(newSound)

    setSounds(newList)

    setCurrent(newList.length - 1)
  }

  async function play() {
    if (playingSound?._loaded) {
      if (finished) {
        await playingSound.replayAsync()
      }

      await playingSound.playAsync()
    } else {
      const permission = await Audio.getPermissionsAsync()

      if (permission.granted) {
        const { sound } = await Audio.Sound.createAsync(
          {
            uri: sounds[current ?? 0]?.url,
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

  async function next() {
    if (current === sounds.length - 1) {
      return
    }

    await unload()

    setCurrent(current! + 1)
  }

  async function previous() {
    if (current === 0) {
      return
    }

    await unload()

    setCurrent(current! - 1)
  }

  async function unload() {
    if (playingSound) {
      await playingSound?.stopAsync()

      await playingSound?.unloadAsync()
    }
  }

  async function clear() {
    await unload()

    setSounds([])
    setCurrent(null)
    setCurrentMusicInfo(undefined)
    setPlayingSound(undefined)
  }

  return (
    <PlayingContext.Provider
      value={{
        loading,
        isPlaying,
        currentMusicInfo,
        play,
        pause,
        unload,
        next,
        previous,
        addSound,
        updateFavorite,
        clear,
      }}>
      {children}
    </PlayingContext.Provider>
  )
}
