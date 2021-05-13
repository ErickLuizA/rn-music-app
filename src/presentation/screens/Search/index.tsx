import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  TextInput,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { ISearchMusicsUseCase } from '../../../domain/useCases/ISearchMusicsUseCase'

import Card from '../../components/Card'

import styles from './styles'
import { Music } from '../../../domain/entities/Music'

interface ISearchScreen {
  searchMusic: ISearchMusicsUseCase
}

export default function SearchScreen({ searchMusic }: ISearchScreen) {
  const [items, setItems] = useState<Music[]>([])
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

      setItems(response)
    } catch (error) {
      ToastAndroid.show('Erro ao pesquisar músicas', ToastAndroid.SHORT)
    }
  }, [search, searchMusic])

  const handleNavigateToPlayer = () => {}

  useEffect(() => {
    if (!search) {
      return
    } else {
      setTimeout(() => handleSearchMusic(), 1000)
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
          placeholder="Pesquise uma música"
          placeholderTextColor="#ddd"
          onChangeText={text => setSearch(text)}
        />
      </View>
      {items.length === 0 ? (
        <SafeAreaView style={styles.centerContainer}>
          <Text style={styles.white}>Pesquise uma música</Text>
          <Icon name="search" size={30} color="#fff" />
        </SafeAreaView>
      ) : (
        <View>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            style={styles.list}
            numColumns={2}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                title={item.title}
                img={item.image}
                onPress={() => handleNavigateToPlayer()}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  )
}
