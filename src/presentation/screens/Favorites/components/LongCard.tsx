import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { RectButton, Swipeable } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface IProps {
  id: string
  title: string
  image: string

  navigate: () => void
  onSwipe: () => void
}

const WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: WIDTH,
    height: 100,
  },

  image: {
    width: WIDTH / 3,
    height: 100,
    borderRadius: 4,
  },

  title: {
    width: WIDTH / 3,
    color: '#ddd',
    fontSize: 16,
    marginLeft: 20,
    alignSelf: 'center',
  },

  swipeContainer: {
    width: WIDTH / 3,
    backgroundColor: '#f11',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function LongCard({ id, title, image, navigate, onSwipe }: IProps) {
  return (
    <Swipeable
      renderRightActions={RightSwipeActions}
      onSwipeableRightOpen={onSwipe}>
      <View style={styles.container} key={id}>
        <RectButton onPress={navigate}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </RectButton>
        <Text style={styles.title}>
          {title?.length > 25 ? title?.slice(0, 25).concat('...') : title}
        </Text>
      </View>
    </Swipeable>
  )
}

function RightSwipeActions() {
  return (
    <View style={styles.swipeContainer}>
      <Icon name="delete" color="#ddd" size={30} />
    </View>
  )
}

export default LongCard
