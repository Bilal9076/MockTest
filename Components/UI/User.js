import React,{useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, Platform, Image ,Button} from 'react-native';
import Colors from '../../Constants/Colors'

const UserProfileItem = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>{props.Name}</Text>
            <Text style={styles.mail}>{props.Email}</Text> 
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop:340
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'RobotoBold',

    },
    mail: {
        fontSize: 16,
        color: '#888',
        fontFamily: 'RobotoRegular',
    },

  
    
});

export default UserProfileItem;