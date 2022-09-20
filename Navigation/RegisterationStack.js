import * as  React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../Constants/Colors';
import RegisterationScreen,{ScreenOptions as RegisterationScreenOptions} from '../Screens/RegisterationPage'

const Stack = createStackNavigator()

const DefaultNavOption = {
       headerStyle: {
         backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android'? 'white':Colors.primary
     }

const StartStack = () =>{
       return(
              <Stack.Navigator screenOptions={DefaultNavOption}>
              <Stack.Screen
                name="Registeration Page"
                component={RegisterationScreen}
                options={RegisterationScreenOptions}
              />
            </Stack.Navigator>
       )
};

export default StartStack;