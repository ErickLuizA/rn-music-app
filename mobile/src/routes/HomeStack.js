import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';

const { Navigator, Screen } = createStackNavigator();

function HomeStack() {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}

export default HomeStack;
