import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'

import HomeStackNavigation from './HomeStackNavigation'
import SearchStackNavigation from './SearchStackNavigation'
import FavoriteStackNavigation from './FavoriteStackNavigation'
import Settings from '../screens/Settings'
import useThemeContext from '../util/useThemeContext'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = (): JSX.Element => {
  const { colors } = useThemeContext()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.backgrounds.default },
      }}
    >
      <Tab.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={28} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="SearchStackNavigation"
        component={SearchStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={28} color={color} />
          ),
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="FavoriteStackNavigation"
        component={FavoriteStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={28} color={color} />
          ),
          tabBarLabel: 'Favorite',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={28} color={color} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator
