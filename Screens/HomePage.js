

import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Button,
    ActivityIndicator,
    Modal,
    Pressable,
    FlatList,
    KeyboardAvoidingView,
    ImageBackground, Dimensions, Image, TextInput, TouchableOpacity
} from 'react-native'
import Card from '../Components/UI/Card'
import Color from '../Constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import * as UserActions from '../Store/Actions/AuthAction'
import Useritem from '../Components/UI/User'
import { Ionicons, FontAwesome, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Isrefreshing, SetIsrefreshing] = useState(false)
    const [Error, SetError] = useState()
    const User = useSelector(state => state.SignUpUser.SignUpUser)

        const loadUser = useCallback(async () => {
    
            SetError(null);
            SetIsrefreshing(true)
            SetIsloading(true)
            try {
                await dispatch(UserActions.fetchSignUpUser());
                // console.log(UserProfile)
            } catch (err) {
                SetError(err.message);
            }
            SetIsrefreshing(false)
            SetIsloading(false)
        }, [dispatch, SetIsloading, SetError]);
    
        useEffect(() => {
            const willFocusSub = props.navigation.addListener('willFocus', loadUser)
    
            return () => {
                willFocusSub.remove();
            }
        }, [loadUser]);
        useEffect(() => {
            SetIsloading(true);
            loadUser().then(() => {
                SetIsloading(false);
            })
        }, [dispatch, loadUser]);
    return (
        <View style={styles.container}>
                    <FlatList
                        onRefresh={loadUser}
                        refreshing={Isrefreshing}
                        data={User}
                        keyExtractor={item => item.id}
                        renderItem={itemData => (
                            <Useritem
                                Name={itemData.item.Name}
                                Email={itemData.item.Email}
                                Surname={itemData.item.Surname}
                            >
        
                            </Useritem>
                        )}
                           
                    />
                </View>
            
    );
};

export const ScreenOptions = navdata => {
    return {
        headerTitle: 'Sign Up',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? '#cc145d' : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,

    }

}
// define your styles
const { height } = Dimensions.get('screen')
const height_logo = height * 0.28;
const styles = StyleSheet.create({
container:{
    flex:1
},
TextContainer:{
flex:1,
textAlign:'center',
justifyContent:'center',
alignItems:'center'
},
Name:{

},
Surname:{

},
Email:{

}
})
//make this component available to the app
export default HomeScreen;