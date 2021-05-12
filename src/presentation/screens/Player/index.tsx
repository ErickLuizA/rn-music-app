import React from 'react'
import { View } from 'react-native'

import styles from './styles'

interface IPlayer {}

export default function Player({}: IPlayer) {
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
