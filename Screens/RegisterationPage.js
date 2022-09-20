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
    Alert,
    KeyboardAvoidingView,
    ImageBackground, Dimensions, Image, TextInput, TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux'
import InputSign from '../Components/UI/InputSignIn';
import Card from '../Components/UI/Card'
import Color from '../Constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import * as AuthActions from '../Store/Actions/RegisterationAction'
import * as UserActions from '../Store/Actions/AuthAction'
import { Ionicons, FontAwesome, MaterialIcons, AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'


// create a component
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const fromReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const UpdatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const UpdatedValidities = {
            ...state.inputValidities,
            [action.input]: action.IsValid
        }

        let fromIsValid = true;
        for (const key in UpdatedValidities) {
            fromIsValid = fromIsValid && UpdatedValidities[key]
        }
        return {
            inputValues: UpdatedValues,
            inputValidities: UpdatedValidities,
            fromIsValid: fromIsValid
        }
    };
    return state;
}
const RegisterationScreen = (props) => {
    const [isLoading, SetisLoading] = useState(false)
    const [isSignup, SetisSignup] = useState(false)
    const [Error, SetError] = useState();
    const [alert, setalert] = useState(false);
   

    const dispatch = useDispatch();
    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            Name:'',
            Surname:'',
            email: '',
            password: '',
        },
        inputValidities: {
            Name:false,
            Surname:false,
            email: false,
            password: false,
        },
        FormValiditity: {
            fromIsValid: false
        }
    })

    useEffect(() => {
        if (Error) {
            setalert(true)
        }
    }, [Error])

    const authHandler = async () => {
      
        if(!stateFrom.inputValidities.Name){
            Alert.alert("Wrong Input","Please enter name b/w 2 to 14 letter",
            [
             {text:'OK'}
            ]);
            return; 
        }
        if(!stateFrom.inputValidities.Surname){
            Alert.alert("Wrong Input","Please enter surname more than 2 letter",
            [
             {text:'OK'}
            ]);
            return; 
        }
        if(!stateFrom.inputValidities.email){
            Alert.alert("Wrong Input","Please enter a valid email",
            [
             {text:'OK'}
            ]);
            return; 
        }
        if(!stateFrom.inputValidities.password){
            Alert.alert("Wrong Input","Please enter password more than 8 char with atleast one  letter and 1 number.",
            [
             {text:'OK'}
            ]);
            return; 
        }
        if (!stateFrom.fromIsValid) {
            setalert(true)
            return;
        }
        SetError(null)
        SetisLoading(true)
        try {
            await dispatch(AuthActions.signup(
                stateFrom.inputValues.email,
                stateFrom.inputValues.password
            ))
            await dispatch(UserActions.CreateSignUpUser(
                stateFrom.inputValues.email,
                stateFrom.inputValues.password,
                stateFrom.inputValues.Name,
                stateFrom.inputValues.Surname,
            ))
            
        } catch (err) {
            SetisLoading(false)
            SetError(err.message)

        }

    };

    const ChangetextHanlder = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);

    if (isLoading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Color.primary}
                />
            </View>
        )
    }
    return (
        <View sytle={{flex:1}}>
        <ScrollView sytle={{flex:1,backgroundColor:'white'}}>
          <Modal visible={alert}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setalert(false)
                }}
            >
                <View style={styles.center_View}>
                    <View style={styles.warning_modal}>
                        <View style={styles.warning_title}>
                        {Error ?  <Text style={styles.text1}>'An error occured'</Text>:<Text style={styles.text1}>'Warning'</Text>} 
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ?  <Text style={styles.text}>'Something went wrong'</Text>:<Text style={styles.text}>'Please Check your form enteries</Text>}  
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text1}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            
            <View style={styles.footer}>
            
                <View style={styles.txtContainer}>
                    <Text style={styles.valuetext}>Registeration Page</Text>
                    <Text style={styles.signText}>Please Sign up to continue</Text>
                </View>
                
                {/* for userName */}
                <Text style={styles.footerName}>Name</Text>
                
                <InputSign
                    id='Name'
                    returnKeyType='next'
                    autoCapitalize='none'
                    warningText='Please enter name b/w 2 to 14 letter.'
                    onInputChange={ChangetextHanlder}
                    initialValue=''
                    letter
                    placeholder='Please Enter Your Name'
                    minLength={2}
                    maxLength={14}
                />


                {/* for SurName */}
                <Text style={styles.footerSurname}>Surname</Text>
                <InputSign
                    id='Surname'
                    returnKeyType='next'
                    autoCapitalize='none'
                    warningText='Please enter more than 2 letter.'
                    onInputChange={ChangetextHanlder}
                    initialValue=''
                    placeholder='Please Enter Surname'
                    minLength={3}
                    letter
                />
        
                {/* for email */}
                <Text style={styles.footerEmail}>E-mail</Text>
                <InputSign
                    style={styles.textInput}
                    id='email'
                    keyboardType='email-address'
                    required
                    email
                    returnKeyType='next'
                    autoCapitalize='none'
                    warningText='Please enter a valid email address.'
                    onInputChange={ChangetextHanlder}
                    initialValue=''
                    placeholder='Please Enter Your E-mail'
                />
                <Text style={styles.footerPassword}>Password</Text>
                <InputSign
                    id='password'
                    keyboardType='default'
                    autoCapitalize='none'
                    warningText='Please enter password more than 8 char with atleast one letter and 1 number.'
                    onInputChange={ChangetextHanlder}
                    initialValue=''
                    returnKeyType='next'
                    placeholder='Please Enter Your Password'
                    password

                />
                <TouchableOpacity
                    onPress={authHandler}
                    style={styles.button}
                >
                    <LinearGradient
                        colors={['#C2185B', '#C2185B']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign1}>REGISTER</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    // New design 
    warning_modal: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 20,
    },
    warning_title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    center_View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#00000099'
    },
    warning_Message: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,

    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    text1: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    container: {
        flex: 1,
        // backgroundColor: Color.primary
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 110
    },
    footerName: {
        color: '#05375a',
        fontSize: 16,
        fontFamily: 'Bold',
    },
    footerSurname: {
        color: '#05375a',
        marginTop: 13,
        fontSize: 16,
        fontFamily: 'Bold',
    },
    footerEmail: {
        color: '#05375a',
        fontSize: 16,
        // marginBottom: 20,
        marginTop: 13,
        fontFamily: 'Bold',
    },
    footerPassword: {
        color: '#05375a',
        fontSize: 16,
        // marginBottom: 20,
        marginTop: 13,
        fontFamily: 'Bold',
    },

    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomColor: '#f2f2f2',
        marginTop: -20
        // paddingBottom: 5,
        // height:60
    },
    action1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomColor: '#f2f2f2',
        // paddingBottom: 5,
        // height:60
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 100
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    signIn1: {
        borderColor: '#009387',
        marginTop: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSign: {
        fontSize: 18,
    },
    textSign1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    signText: {
        color: '#888',
        fontSize: 16,
    },
    valuetext: {
        color: Color.primary,
        fontSize: 22,
        fontFamily: 'Bold',
        marginVertical: 3
    },
    txtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 45
    },
    txtContainer1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45
    },
    iconContainer: {
        backgroundColor: 'white',
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 158,
        top: 25,
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
})
//make this component available to the app
export default RegisterationScreen;
