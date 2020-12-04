import React, { useState, useCallback } from 'react'
import { View, FlatList, StyleSheet, ToastAndroid } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { Favorite } from '../../../domain/entities/Favorite'
import LongCard from '../../components/LongCard'
import { IDeleteFavoritesUseCase } from '../../../domain/useCases/IDeleteFavoriteUseCase'

interface IFavoritesScreen {
  loadFavorites: ILoadFavoritesUseCase
  deleteFavorite: IDeleteFavoritesUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 20,
  },

  heading: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    color: '#ddd',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
})

export default function FavoritesScreen({
  loadFavorites,
  deleteFavorite,
}: IFavoritesScreen) {
  const [favorites, setFavorites] = useState<Favorite[]>()

  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      async function getLoadFavorites() {
        try {
          const response = await loadFavorites.execute()

          setFavorites(response)
        } catch (error) {
          ToastAndroid.show('Erro ao buscar dados', ToastAndroid.SHORT)
        }
      }
      getLoadFavorites()
    }, [loadFavorites]),
  )

  const handleDeleteFavorite = async (item: Favorite) => {
    try {
      await deleteFavorite.execute({ id: item.favoriteId })

      const newFavs = favorites?.filter(
        (fav) => fav.favoriteId !== item.favoriteId,
      )

      setFavorites(newFavs)
    } catch (error) {
      ToastAndroid.show('Erro ao deletar favorito', ToastAndroid.SHORT)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.musicId}
        renderItem={({ item }) => (
          <LongCard
            id={item.musicId}
            title={item.title}
            img={item.img}
            onPress={() => handleDeleteFavorite(item)}
            navigate={() =>
              navigation.navigate('Home', {
                data: {
                  id: item.musicId,
                  snippet: {
                    title: item.title,
                    thumbnails: {
                      high: {
                        url: item.img,
                      },
                    },
                  },
                },
              })
            }
          />
        )}
      />
    </View>
  )
}
