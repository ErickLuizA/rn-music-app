import React, { useState, useCallback, useEffect } from 'react'
import { View, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'

import { Favorite } from '../../../domain/entities/Favorite'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'

import LongCard from '../../components/LongCard'

import styles from './styles'

interface IFavoritesScreen {
  loadFavorites: ILoadFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
}

export default function FavoritesScreen({
  loadFavorites,
  deleteFavorite,
}: IFavoritesScreen) {
  const [favorites, setFavorites] = useState<Favorite[]>()
  const [loaded, setLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handleLoadFavorites = useCallback(async () => {
    try {
      const response = await loadFavorites.execute()

      setFavorites(response)
    } catch (error) {
      console.log(`FAVORITES ${error}`)

      ToastAndroid.show('Erro ao buscar favoritos', ToastAndroid.SHORT)
    }

    setLoaded(true)
  }, [loadFavorites])

  const handleDeleteFavorite = async (item: Favorite) => {
    try {
      await deleteFavorite.execute({ id: item.favoriteId })

      const newFavs = favorites?.filter(
        fav => fav.favoriteId !== item.favoriteId,
      )

      setFavorites(newFavs)
    } catch (error) {
      ToastAndroid.show('Erro ao deletar favorito', ToastAndroid.SHORT)
    }
  }

  const handleOnRefresh = async () => {
    setRefreshing(true)

    handleLoadFavorites().then(() => setRefreshing(false))
  }

  const handleNavigateToPlayer = () => {}

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
        keyExtractor={item => item.musicId}
        renderItem={({ item }) => (
          <LongCard
            id={item.musicId}
            title={item.title}
            img={item.img}
            onPress={() => handleDeleteFavorite(item)}
            navigate={() => handleNavigateToPlayer()}
          />
        )}
      />
    </View>
  )
}
