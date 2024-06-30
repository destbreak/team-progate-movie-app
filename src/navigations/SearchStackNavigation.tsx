import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/Search'
import MovieDetail from '../screens/MovieDetail'
import CategoryResults from '../screens/CategoryResults'

const Stack = createNativeStackNavigator()

export default function SearchStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="CategoryResults" component={CategoryResults} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}
