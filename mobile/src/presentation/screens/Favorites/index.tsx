import React, { useState, useCallback } from 'react'
import { View, FlatList, StatusBar, StyleSheet } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { Favorite } from '../../../domain/entities/Favorite'

import Card from '../../components/Card'

interface IFavoritesScreen {
  loadFavorites: ILoadFavoritesUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
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

export default function FavoritesScreen({ loadFavorites }: IFavoritesScreen) {
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
        numColumns={2}
        keyExtractor={(item) => item.favoriteId}
        renderItem={({ item }) => (
          <Card
            id={item.musicId}
            title={item.title}
            img={item.img}
            navigate={() =>
              navigation.navigate('Playing', {
                data: {
                  title: item.title,
                  img: item.img,
                  id: item.favoriteId,
                },
              })
            }
            fullWidth
          />
        )}
      />
    </View>
  )
}
