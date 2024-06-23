import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeStackNavigation from '../navigations/HomeStackNavigation'
import MovieDetail from './MovieDetail'

const Stack = createNativeStackNavigator()

export default function Home(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}
