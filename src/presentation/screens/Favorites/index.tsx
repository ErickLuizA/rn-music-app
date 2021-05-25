import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Music } from '../../../domain/entities/Music'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'
import { ICreateFavoritesUseCase } from '../../../domain/useCases/ICreateFavoriteUseCase'

import { PlayingContext } from '../../contexts/PlayingContext'

import LongCard from '../../components/LongCard'
import MiniPlayer from '../../components/MiniPlayer'

import styles from './styles'

interface IFavoritesScreen {
  loadFavorites: ILoadFavoritesUseCase
  createFavorite: ICreateFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
}

export default function FavoritesScreen({
  loadFavorites,
  createFavorite,
  deleteFavorite,
}: IFavoritesScreen) {
  const [favorites, setFavorites] = useState<Music[]>()
  const [loaded, setLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const navigation = useNavigation()

  const { updateFavorite } = useContext(PlayingContext)

  const handleLoadFavorites = useCallback(async () => {
    try {
      const response = await loadFavorites.execute()

      setFavorites(response)
    } catch (error) {
      ToastAndroid.show('Erro ao buscar favoritos', ToastAndroid.SHORT)
    }

    setLoaded(true)
  }, [loadFavorites])

  const handleDeleteFavorite = async (item: Music) => {
    try {
      await deleteFavorite.execute({ id: item.id })

      const newFavs = favorites?.filter(fav => fav.id !== item.id)

      setFavorites(newFavs)

      item.unFavorite()

      updateFavorite(item)

      ToastAndroid.show('Favorito removido com sucesso', ToastAndroid.SHORT)
    } catch (error) {
      ToastAndroid.show('Erro ao deletar favorito', ToastAndroid.SHORT)
    }
  }

  const handleOnRefresh = async () => {
    setRefreshing(true)

    handleLoadFavorites().then(() => setRefreshing(false))
  }

  const handleNavigateToPlayer = (item: Music) => {
    navigation.navigate('Player', {
      item,
    })
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

  useEffect(() => {
    handleLoadFavorites()
  }, [handleLoadFavorites])

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={handleOnRefresh}
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <LongCard
            id={item.id}
            title={item.title}
            image={item.image}
            onSwipe={() => handleDeleteFavorite(item)}
            navigate={() => handleNavigateToPlayer(item)}
          />
        )}
      />
      <MiniPlayer
        handleFavorite={handleFavorite}
        handleDeleteFavorite={handleDeleteFavorite}
      />
    </View>
  )
}
