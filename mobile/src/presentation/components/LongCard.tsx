import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface IProps {
  id: string
  title: string
  img: string
  navigate: () => void
  onPress: () => void
}

const WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: WIDTH,
    height: 100,
  },

  image: {
    width: WIDTH / 3,
    height: 100,
    borderRadius: 20,
  },

  title: {
    color: '#ddd',
    fontSize: 16,
    width: WIDTH / 3,
    alignSelf: 'center',
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dots: {
    alignSelf: 'center',
  },
})

function LongCard({ id, title, img, navigate, onPress }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <RectButton key={id.toString()} onPress={() => navigate()}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: img || undefined,
            }}
          />
        </RectButton>

        <Text style={styles.title}>{title.slice(0, 30)} ... </Text>
      </View>
      <RectButton style={styles.dots} {...{ onPress }}>
        <Icon name="more-vert" color="#ddd" size={30} />
      </RectButton>
    </View>
  )
}

export default LongCard
