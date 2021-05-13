import { useRoute } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { Music } from '../../../domain/entities/Music'

import styles from './styles'

interface IPlayer {}

export default function Player({}: IPlayer) {
  const { params } = useRoute<{
    params: { item: Music }
    name: string
    key: string
  }>()

  // const [loaded, setLoaded] = useState(false)

  // if (!loaded) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator color="#fff" size="large" />
  //     </View>
  //   )
  // }

  return <View style={styles.container} />
}
