import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ThemeProvider from './src/store/ThemeProvider'
import BottomTabNavigator from './src/navigations/BottomTabNavigation'

export default function App(): JSX.Element {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </ThemeProvider>
  )
}
