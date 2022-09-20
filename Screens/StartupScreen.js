import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Colors from '../Constants/Colors';
import * as AuthActions from '../Store/Actions/RegisterationAction';


const StartupScreen=({ navigation })=> {
  const dispatch = useDispatch();

  useEffect(() => {
    const TryLogin = async () => {
      const userData = await AsyncStorage.getItem('UserData');
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);


      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(AuthActions.Authenticate(userId, token, expirationTime));
    };

    TryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;

