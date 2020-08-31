import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import ytApi from '../../services/ytApi';

import styles from './styles';
import Card from '../../components/Card';
import AsyncStorage from '@react-native-community/async-storage';

function HomeScreen({ navigation }) {
  const [musics, setMusics] = useState([]);
  const [recent, setRecent] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await ytApi.get('/videos', {
          params: {
            part: 'snippet',
            videoCategoryId: '10',
            chart: 'mostPopular',
            maxResults: 15,
            key: process.env.API_KEY,
          },
        });

        setMusics(response.data.items);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useFocusEffect(() => {
    (async () => {
      const musicPlayed = await AsyncStorage.getItem('@RNplayed');
      const playedJson = JSON.parse(musicPlayed);

      setRecent(playedJson);
    })();
  }, []);

  const handleSubmit = (e) => {
    navigation.navigate('Search', { searchTerm: e.nativeEvent.text });
  };

  if (musics.length === 0) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchSection}>
        <AntDesign name="search1" style={[styles.icon, styles.white]} />
        <TextInput
          style={[styles.input, styles.white]}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.musicSection}>
        <Text style={[styles.text, styles.white]}>Music </Text>
        <View style={styles.trending}>
          <Text style={[styles.white, styles.categoryText]}>Trending </Text>
          <FlatList
            data={musics}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item }) => (
              <Card
                title={item.snippet.title}
                img={item.snippet.thumbnails.high.url}
                id={item.id}
                navigation={navigation}
              />
            )}
          />
        </View>
        <View style={styles.recent}>
          <Text style={[styles.white, styles.categoryText]}>Last played</Text>
          {recent && (
            <Card
              title={recent.title}
              id={recent.id}
              img={recent.img}
              navigation={navigation}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
