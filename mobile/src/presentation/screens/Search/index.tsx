import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { ISearchMusicsUseCase } from '../../../domain/useCases/ISearchMusicsUseCase'
import { SearchedMusic } from '../../../domain/entities/Music'

import Card from '../../components/Card'

interface ISearchScreen {
  searchMusic: ISearchMusicsUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: StatusBar.currentHeight! + 10,
    paddingHorizontal: 10,
  },

  searchSection: {
    flexDirection: 'row',
  },

  icon: {
    fontSize: 32,
    paddingRight: 20,
  },

  input: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    borderBottomColor: '#999',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },

  white: {
    color: '#ddd',
  },

  list: {
    paddingVertical: 20,
  },
})

export default function SearchScreen({ searchMusic }: ISearchScreen) {
  const [items, setItems] = useState<SearchedMusic[]>()

  const navigation = useNavigation()
  const { params } = useRoute<{
    key: string
    name: string
    params: {
      searchTerm: string
    }
  }>()

  const searchTerm = params ? params.searchTerm : null

  const [search, setSearch] = useState(searchTerm)

  useEffect(() => {
    async function getSearchMusic() {
      try {
        const response = await searchMusic.execute({
          q: search,
          part: 'snippet',
          maxResults: 10,
          key: process.env.API_KEY,
        })

        setItems(response.items)
      } catch (err) {
        console.log(err.response.data)
      }
    }

    getSearchMusic()
  }, [searchMusic, search])

  if (!items) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" style={[styles.icon, styles.white]} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.white]}
          value={search!}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.videoId}
          style={styles.list}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              id={item.id.videoId}
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
      </View>
    </SafeAreaView>
  )
}
