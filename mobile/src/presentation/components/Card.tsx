import React from 'react'
import { Image, StyleSheet, Text, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

interface IProps {
  id: string
  title: string
  img: string
  navigate: () => void
  fullWidth?: boolean
}

function Card({ id, title, img, navigate, fullWidth }: IProps) {
  return (
    <RectButton key={id} style={styles.container} onPress={() => navigate()}>
      <Image
        resizeMode="contain"
        style={fullWidth ? styles.fullWidth : styles.image}
        source={{
          uri: img,
        }}
      />
      <Text style={fullWidth ? styles.centerTitle : styles.title}>
        {' '}
        {title}{' '}
      </Text>
    </RectButton>
  )
}

const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },

  fullWidth: {
    height: 200,
    width: windowWidth / 1.2,
    borderRadius: 20,
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

  centerTitle: {
    color: '#fff',
    width: 200,
    alignSelf: 'center',
  },
})

export default Card
