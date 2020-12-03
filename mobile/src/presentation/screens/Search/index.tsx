import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ToastAndroid,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
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
    paddingTop: StatusBar.currentHeight || 10,
    paddingHorizontal: 10,
  },

  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
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

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search === '') {
      return
    }

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
        ToastAndroid.show('Erro ao buscar dados', ToastAndroid.SHORT)
      }
    }

    getSearchMusic()
  }, [searchMusic, search])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="navigate-before" style={[styles.icon, styles.white]} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.white]}
          value={search}
          autoFocus
          placeholder="Search for music"
          placeholderTextColor="#ddd"
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
              onPress={() =>
                navigation.navigate('Home', {
                  data: {
                    id: item.id.videoId,
                    snippet: item.snippet,
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
