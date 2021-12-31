import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert} from 'react-native'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { Formik } from 'formik'
import { db, firebase } from '../../firebase'


const SignupForm = ({navigation}) => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('Am email is rewuired'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string().required().min(6, 'Your password has to have at least 6 characters'),
    })

    const getRandomProfilePicture = async() => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async (email, password, username) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })
            console.log('firebase login successful', email, password)
        } catch (error) {
            Alert.alert('my Lord ...', error.message)
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik 
                initialValues={{email: '',username: '',password: ''}}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username)
                }}
                validationSchema={SignupFormSchema}
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
                                placeholder='Email' 
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
                                {
                                    borderColor:
                                    1 > values.username.length || values.username > 6
                                    ? '#ccc'
                                    : '#ff0000'
                                }
                            ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Username' 
                                autoCapitalize='none'
                                textContentType='username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
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
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                                <Text style={{color: '#6bb0f5'}}> Log In</Text>
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
export default SignupForm
