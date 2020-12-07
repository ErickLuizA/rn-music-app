import React from 'react'
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PlaylistMusic } from '../../../domain/entities/Music'

import Card from '../../components/Card'

interface IPlaylistDetail {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingTop: StatusBar.currentHeight,
  },

  goBack: {
    alignSelf: 'flex-start',
  },
})

export default function PlaylistDetail({}: IPlaylistDetail) {
  const { params } = useRoute<{
    params: { data: PlaylistMusic[] }
    name: string
    key: string
  }>()

  const navigation = useNavigation()

  const data = params.data

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
        keyExtractor={(item) => item.playlistMusicId.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            id={item.playlistMusicId}
            title={item.title}
            img={item.img}
            onPress={() =>
              navigation.navigate('Home', {
                data: {
                  title: item.title,
                  img: item.img,
                  id: item.musicId,
                },
              })
            }
          />
        )}
      />
    </SafeAreaView>
  )
}
