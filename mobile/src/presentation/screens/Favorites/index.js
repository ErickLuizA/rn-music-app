import React, { useState, useCallback } from 'react'
import { View, FlatList, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import Card from '../../components/Card'

import styles from './styles'

function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([])

  // useFocusEffect(
  //   useCallback(() => {
  //     (async () => {
  //       let response = await api.get('/favorites')

  //       if (typeof response.data === 'string') {
  //         api.defaults.headers.Authorization = `Bearer ${response.data}`

  //         await AsyncStorage.setItem('@RNtoken', response.data)

  //         response = await api.get('/favorites')
  //       }

  //       setFavorites(response.data)
  //     })()
  //   }, []),
  // )

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Favorite musics </Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            id={item.favorite_music_id}
            title={item.title}
            img={item.img}
            navigation={navigation}
            fullWidth
          />
        )}
      />
    </View>
  )
}

export default FavoritesScreen
