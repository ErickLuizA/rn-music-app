import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Card from '../../components/Card'

import styles from './styles'
import { Music } from '../../../domain/entities/Music'

interface IPlaylistDetail {}

export default function PlaylistDetail({}: IPlaylistDetail) {
  const { params } = useRoute<{
    params: { playlistId: string }
    name: string
    key: string
  }>()

  const navigation = useNavigation()

  const [data, setData] = useState<Music[]>([])

  useEffect(() => {}, [])

  const handleNavigateToPlayer = (item: Music) => {
    navigation.navigate('Player', {
      item,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="navigate-before"
        size={30}
        color="#ddd"
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      />

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.title}
            img={item.image}
            onPress={() => handleNavigateToPlayer(item)}
          />
        )}
      />
    </SafeAreaView>
  )
}
