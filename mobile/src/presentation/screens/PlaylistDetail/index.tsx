import React from 'react'
import { SafeAreaView, FlatList, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Music } from '../../../domain/entities/Music'

import Card from '../../components/Card'

import styles from './styles'

interface IPlaylistDetail {}

function PlaylistDetail({}: IPlaylistDetail) {
  const { params } = useRoute<{
    params: { data: Music[] }
    name: string
    key: string
  }>()

  const navigation = useNavigation()

  const data = params.data

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex}>
        <AntDesign
          name="back"
          size={24}
          color="#ddd"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.heading}> Playlist </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.snippet.title}
            img={item.snippet.thumbnails.high.url}
            navigate={() =>
              navigation.navigate('Playing', {
                data: {
                  title: item.snippet.title,
                  img: item.snippet.thumbnails.high.url,
                  id: item.id,
                },
              })
            }
          />
        )}
      />
    </SafeAreaView>
  )
}

export default PlaylistDetail
