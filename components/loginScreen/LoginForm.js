import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert} from 'react-native'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { Formik } from 'formik'
import { firebase } from '../../firebase'


const LoginForm = ({ navigation }) => {

    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('Am email is rewuired'),
        password: Yup.string().required().min(6, 'Ypur password has to have at least 8 characters'),
    })

    const onLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log('firebase login successful', email, password)
        } catch (error) {
            console.log(error.message)
            Alert.alert(
                'My Lord ...',
                error.message + '\n\n ... What would you like to do next !',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK'),
                        style: 'cancel',
                    },
                    { 
                        text: 'Sign Up', 
                        onPress: () => navigation.push('SignupScreen'),
                    },
                ]
            )
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik 
                initialValues={{email: '', password: ''}}
                onSubmit={(values) => {
                    onLogin(values.email, values.password)
                }}
                validationSchema={loginFormSchema}
                validateOnMount={true}
            >
                {( {handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                        <View style={[
                                styles.inputField,
                                {
                                    borderColor:
                                    values.email.length < 1 || Validator.validate(values.email)
                                    ? '#ccc'
                                    : '#ff0000'
                                }
                            ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Phone number, username or email' 
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[
                                styles.inputField,
                                // there an error here bro
                                {
                                    borderColor:
                                    1 > values.password.length || values.password > 6
                                    ? '#ccc'
                                    : '#ff0000'
                                }
                            ]}>
                            <TextInput 
                                placeholderTextColor='#444'
                                placeholder='Password' 
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <View style={{ alignItems: 'flex-end', marginBottom: 30,}}>
                            <Text style={{color: '#6bb0f5'}}>Forgot password?</Text>
                        </View>
                        <Pressable 
                            titleSize={20} 
                            style={[styles.button, {backgroundColor: isValid ? '#0096f6' : '#9acaf7'}]}  
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={()=> navigation.push('SignupScreen')}>
                                <Text style={{color: '#6bb0f5'}}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>  
                    </>
                )}              
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80,
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        // backgroundColor: '#afafaf',
        // backgroundColor: '#afafafa',
        marginBottom: 15,
        borderWidth: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    },
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 18
    },
    signupContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50
    }
})
export default LoginForm
