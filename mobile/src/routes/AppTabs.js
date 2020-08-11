import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../pages/Home";
import FavoritesScreen from "../pages/Favorites";
import PlayingScreen from "../pages/Playing";
import PlaylistScreen from "../pages/Playlist";
import UserScreen from "../pages/User";

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          safeAreaInsets: {
            bottom: 0,
          },
          style: {
            backgroundColor: "#131418",
            height: 64,
          },
          iconStyle: {
            flex: 0,
            width: 50,
            height: 20,
          },
          activeTintColor: "#fff",
          inactiveTintColor: "#92929c",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
            title: "",
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="hearto" size={size} color={color} />
            ),
            title: "",
          }}
        />

        <Tab.Screen
          name="Ṕlaying"
          component={PlayingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign
                name="playcircleo"
                size={size + 20}
                color={color}
                style={{ marginBottom: 20 }}
              />
            ),
            title: "",
          }}
        />

        <Tab.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="playlist-music"
                size={size}
                color={color}
              />
            ),
            title: "",
          }}
        />

        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            title: "",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppTabs;
