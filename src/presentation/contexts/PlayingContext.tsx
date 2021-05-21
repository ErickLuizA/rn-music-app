import React, {
  createContext,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Audio } from 'expo-av'
import { Sound } from '../../domain/entities/Sound'
import { Music } from '../../domain/entities/Music'

interface IPlayingContext {
  isPlaying: boolean
  loading: boolean
  play: () => Promise<void>
  pause: () => Promise<void>
  stopPlaying: () => Promise<void>
  addSound: (newSound: Sound) => Promise<void>
  music: Music | undefined
}

export const PlayingContext = createContext({} as IPlayingContext)

interface IPlayingProvider {
  children: ReactChild
}

export function PlayingProvider({ children }: IPlayingProvider) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)

  const [sounds, setSounds] = useState<Sound[]>([])
  const [current, setCurrent] = useState<number | null>(null)

  const [music, setMusic] = useState<Music>()

  const [playingSound, setPlayingSound] = useState<Audio.Sound>()

  const firstRender = useRef(true)

  useEffect(() => {
    if (playingSound) {
      playingSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          setLoading(false)
          setMusic(sounds[current ?? 0].music)

          if (status.isPlaying) {
            setIsPlaying(true)
          }

          if (!status.isPlaying) {
            setIsPlaying(false)
          }
        }

        if (!status.isLoaded) {
          setLoading(true)
        }
      })
    }

    return () => playingSound?._clearSubscriptions()
  }, [playingSound]) // eslint-disable-line react-hooks/exhaustive-deps

  async function addSound(newSound: Sound) {
    const newList = sounds?.filter(sound => sound.id !== newSound.id)

    newList.push(newSound)

    setSounds(newList)

    setCurrent(newList.length - 1)
  }

  async function stopPlaying() {
    if (playingSound) {
      await playingSound?.stopAsync()

      await playingSound?.unloadAsync()
    }
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false

      return
    } else {
      play()
    }
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  async function play() {
    if (playingSound?._loaded) {
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

  return (
    <PlayingContext.Provider
      value={{
        isPlaying,
        stopPlaying,
        pause,
        loading,
        play,
        addSound,
        music,
      }}>
      {children}
    </PlayingContext.Provider>
  )
}
