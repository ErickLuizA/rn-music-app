import React, { useState, useCallback } from 'react'
import { View, FlatList, StyleSheet, ToastAndroid } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ILoadFavoritesUseCase } from '../../../domain/useCases/ILoadFavoritesUseCase'
import { Favorite } from '../../../domain/entities/Favorite'
import LongCard from '../../components/LongCard'

interface IFavoritesScreen {
  loadFavorites: ILoadFavoritesUseCase
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
          ToastAndroid.show('Erro ao buscar dados', ToastAndroid.SHORT)
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
          <LongCard
            id={item.musicId}
            title={item.title}
            img={item.img}
            navigate={() =>
              navigation.navigate('Player', {
                data: {
                  title: item.title,
                  img: item.img,
                  id: item.favoriteId,
                },
              })
            }
          />
        )}
      />
    </View>
  )
}
