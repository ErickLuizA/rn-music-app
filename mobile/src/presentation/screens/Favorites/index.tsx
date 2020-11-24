import React, { useState, useCallback } from 'react'
import { View, FlatList, Text } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { Favorite } from '../../../domain/entities/Favorite'

import Card from '../../components/Card'

import styles from './styles'

interface IFavoritesScreen {
  loadFavorites: ILoadFavoritesUseCase
}

function FavoritesScreen({ loadFavorites }: IFavoritesScreen) {
  const [favorites, setFavorites] = useState<Favorite[]>()

  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      async function getLoadFavorites() {
        try {
          const response = await loadFavorites.execute()
          setFavorites(response)
        } catch (error) {
          console.log(error.response.data)
        }
      }
      getLoadFavorites()
    }, [loadFavorites]),
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.favoriteId}
        renderItem={({ item }) => (
          <Card
            id={item.musicId}
            title={item.title}
            img={item.img}
            navigate={() =>
              navigation.navigate('Playing', {
                title: item.title,
                img: item.img,
                id: item.favoriteId,
              })
            }
            fullWidth
          />
        )}
      />
    </View>
  )
}

export default FavoritesScreen
