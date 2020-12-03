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
          ToastAndroid.show('Erro ao buscar dados', ToastAndroid.SHORT)
        }
      }
      getLoadFavorites()
    }, [loadFavorites]),
  )

  const openOptions = async (item: Favorite) => {
    console.log('hi', item)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.favoriteId.toString()}
        renderItem={({ item }) => (
          <LongCard
            id={item.musicId}
            title={item.title}
            img={item.img}
            onPress={() => openOptions(item)}
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
