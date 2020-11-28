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
import { Music } from '../../../domain/entities/Music'

import Card from '../../components/Card'

interface IPlaylistDetail {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    marginTop: StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight! + 10,
  },

  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.1,
    paddingHorizontal: 10,
  },

  heading: {
    color: '#ddd',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginLeft: 60,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    alignSelf: 'flex-start',
    paddingVertical: 5,
  },
})

export default function PlaylistDetail({}: IPlaylistDetail) {
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
        <Icon
          name="navigate-before"
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
              navigation.navigate('Player', {
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
