import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import HomeScreen,{ScreenOptions as HomeScreenOptions} from '../Screens/HomePage'

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const HomeStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Registeration Page"
                component={HomeScreen}
                options={HomeScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default HomeStack;