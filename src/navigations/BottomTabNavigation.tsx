import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import Search from '../screens/Search'
import FavoriteStackNavigation from './FavoriteStackNavigation'
import Settings from '../screens/Settings'
import useThemeContext from '../util/useThemeContext'
import HomeStackNavigation from './HomeStackNavigation'

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator(): JSX.Element {
  const { colors } = useThemeContext()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.backgrounds.default },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={28} color={color} />
          ),
          headerShown: false,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}
