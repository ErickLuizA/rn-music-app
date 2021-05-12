import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { SearchedMusic } from '../../../domain/entities/Music'
import { ISearchMusicsUseCase } from '../../../domain/useCases/ISearchMusicsUseCase'

import Card from '../../components/Card'

import styles from './styles'

interface ISearchScreen {
  searchMusic: ISearchMusicsUseCase
}

export default function SearchScreen({ searchMusic }: ISearchScreen) {
  const [items, setItems] = useState<SearchedMusic[]>()
  const [search, setSearch] = useState('')

  const navigation = useNavigation()

  const handleSearchMusic = useCallback(async () => {
    try {
      const response = await searchMusic.execute({
        q: search,
        part: 'snippet',
        maxResults: 10,
        key: process.env.API_KEY,
      })

      setItems(response.items)
    } catch (error) {
      console.log(`SEARCH ${error}`)

      ToastAndroid.show('Erro ao buscar dados', ToastAndroid.SHORT)
    }
  }, [search, searchMusic])

  const handleNavigateToPlayer = () => {}

  useEffect(() => {
    if (!search) {
      return
    } else {
      handleSearchMusic()
    }
  }, [search, handleSearchMusic])

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
          onChangeText={text => setSearch(text)}
        />
      </View>
      <View>
        <FlatList
          data={items}
          keyExtractor={item => item.id.videoId}
          style={styles.list}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              id={item.id.videoId}
              title={item.snippet.title}
              img={item.snippet.thumbnails.high.url}
              onPress={() => handleNavigateToPlayer()}
            />
          )}
        />
      </View>
    </SafeAreaView>
  )
}
