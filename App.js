import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font'

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import AppContainer from './Navigation/AppContainer';
import ReduxThunk from 'redux-thunk';
import RegisterationAuthReducer from './Store/Reducers/RegisterationReducer';
import AuthReducer from './Store/Reducers/AuthReducer';

const rootReducer = combineReducers({
  RegisterationAuth: RegisterationAuthReducer,
  SignUpUser:AuthReducer
})

const store = createStore(rootReducer , applyMiddleware(ReduxThunk));
export default function App() {
  const [loaded]= useFonts({
    RobotoBold: require('./assets/font/RobotoBold.ttf'),
    RobotoLight:require('./assets/font/RobotoLight.ttf'),
    RobotoRegular:require('./assets/font/RobotoRegular.ttf'),
    Bold:require('./assets/font/Bold.ttf'),
    Regular:require('./assets/font/Regular.ttf')
  })
  if(!loaded){
    return null
  }
  return (
    <Provider store ={store}>
   <AppContainer/> 
   </Provider> 
  );
}


