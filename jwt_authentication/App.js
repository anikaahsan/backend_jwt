import 'react-native-gesture-handler'
import React from 'react'
import { Text ,View,Image,TouchableOpacity} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Signup from './src/components/Signup'
import Login from './src/components/Login'
import Product from './src/components/Product'


const App=()=>{
  const Stack=createStackNavigator()

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="login" component={Login}  />
        <Stack.Screen name="product" component={Product} />

      </Stack.Navigator>
    </NavigationContainer>
  )

}
export default App

