import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import Home from '../screens/Home'
import Search from '../screens/Search'
import Favorite from '../screens/Favorite'
import Settings from '../screens/Settings'
import useThemeContext from '../util/useThemeContext'

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
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={28} color={color} />
          ),
          headerShown: false,
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
        component={Favorite}
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
