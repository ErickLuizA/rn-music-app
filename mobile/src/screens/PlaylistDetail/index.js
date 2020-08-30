import React from 'react';
import { SafeAreaView, FlatList, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Card from '../../components/Card';

import styles from './styles';

function PlaylistDetail({ route, navigation }) {
  const data = route.params ? route.params.data : null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={() => {
          return (
            <View style={styles.flex}>
              <AntDesign
                name="back"
                size={24}
                color="#ddd"
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.heading}> Playlist </Text>
            </View>
          );
        }}
        renderItem={({ item }) => (
          <Card
            id={item.song_id}
            title={item.title}
            img={item.img}
            navigation={navigation}
          />
        )}
      />
    </SafeAreaView>
  );
}

export default PlaylistDetail;
