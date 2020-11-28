import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface IProps {
  id: string
  title: string
  img: string
  navigate: () => void
}

const WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: WIDTH,
    height: 200,
  },

  image: {
    width: WIDTH / 4,
    height: 200,
    borderRadius: 20,
  },

  title: {
    color: '#ddd',
    fontSize: 16,
  },
})

function LongCard({ id, title, img, navigate }: IProps) {
  return (
    <View style={styles.container}>
      <View>
        <RectButton key={id} onPress={() => navigate()}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: img || undefined,
            }}
          />
        </RectButton>

        <Text style={styles.title}> {title} </Text>
      </View>
      <RectButton>
        <Icon name="more-vert" color="#ddd" size={30} />
      </RectButton>
    </View>
  )
}

export default LongCard
