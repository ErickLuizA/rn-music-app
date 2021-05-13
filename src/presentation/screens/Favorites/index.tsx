import React, { useState, useCallback, useEffect } from 'react'
import { View, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Music } from '../../../domain/entities/Music'
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
  const [favorites, setFavorites] = useState<Music[]>()
  const [loaded, setLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const navigation = useNavigation()

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
            img={item.image}
            onPress={() => handleDeleteFavorite(item)}
            navigate={() => handleNavigateToPlayer(item)}
          />
        )}
      />
    </View>
  )
}
