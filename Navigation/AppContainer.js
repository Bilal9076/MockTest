import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

import RegisterationStack from './RegisterationStack';
import HomeStack from './HomeStack';

const AppContainer = () =>{
     
       const RegisterationAuth =  useSelector(state => !!state.RegisterationAuth.token)
       
       return(
              <NavigationContainer>
                     {/* <RegisterationStack/> */}
                     {!RegisterationAuth && <RegisterationStack/> }
                     {RegisterationAuth && <HomeStack/>} 
              </NavigationContainer>
       )
};

export default AppContainer;