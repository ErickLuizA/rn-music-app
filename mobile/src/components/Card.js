import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

function Card({ title, img, id, navigation, fullWidth }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Ṕlaying', { data: { title, img, id } })
      }
    >
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
    </TouchableOpacity>
  );
}

const windowWidth = Dimensions.get('window').width;

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
});

export default Card;
