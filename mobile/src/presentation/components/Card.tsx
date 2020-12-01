import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface IProps {
  id: string
  title: string
  img: string
  onPress: () => void
}

function Card({ id, title, img, onPress }: IProps) {
  return (
    <TouchableOpacity key={id} style={styles.container} {...{ onPress }}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{
          uri: img,
        }}
      />
      <Text style={styles.title}> {title} </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },

  title: {
    color: '#fff',
    width: 200,
  },
})

export default Card
