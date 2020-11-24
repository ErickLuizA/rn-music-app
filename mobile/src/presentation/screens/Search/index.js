import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import styles from './styles'
import Card from '../../components/Card'

function SearchScreen({ route, navigation }) {
  const searchTerm = route.params ? route.params.searchTerm : null

  const [search, setSearch] = useState(searchTerm)
  const [items, setItems] = useState([])

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const response = await ytApi.get('/search', {
  //         params: {
  //           q: search,
  //           part: 'snippet',
  //           maxResults: 10,
  //           key: process.env.API_KEY,
  //         },
  //       })

  //       setItems(response.data.items)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   })()
  // }, [search])

  if (!items) {
    return <ActivityIndicator size="large" />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" style={[styles.icon, styles.white]} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.white]}
          value={search}
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
              navigation={navigation}
            />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen
