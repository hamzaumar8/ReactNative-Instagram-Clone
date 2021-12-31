import { NavigationContainer } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { View, Text, Image, TextInput, Button } from 'react-native'
import { Divider } from 'react-native-elements'
import * as  Yup from 'yup'
import validUrl from 'valid-url'
import { db, firebase } from '../../firebase'

const PLACEHOLDER_IMG = 'https://gadgetsghana.com/assets/images/logo.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit'),
})

const FormickPostUploader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentloggedInUser, setCurrentloggedInUser] = useState(null)

    const getUsername = () => {
        const user = firebase.auth().currentUser 
        const unsubscribe = db
            .collection('users')
            .where('owner_uid', '==', user.uid)
            .limit(1).
            onSnapshot(snapshot => 
                snapshot.docs.map(doc => {
                setCurrentloggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            })
        )
        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    }, [])

    const uplaodpostToFirebase = (caption, imageUrl) => {
        console.log(currentloggedInUser.username)
        const unsubscribe = db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('posts')
            .add({
                imageUrl: imageUrl,
                user: currentloggedInUser.username,
                profile_picture: currentloggedInUser.profilePicture,
                owner_uid: firebase.auth().currentUser.uid,
                caption: caption,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes: 0,
                likes_by_users: [],
                comments: [],
            })
            .then(() => navigation.goBack())

        return unsubscribe
    }

    return (
       <Formik 
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={(values) => {
                uplaodpostToFirebase(values.caption, values.imageUrl)
            }}
            validationSchema={uploadPostSchema}
            validateonMount={true}
       >
           {({ handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
               <>
                <View style={{ margin: 20, justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG}} style={{ width: 100, height: 100}}/>
                    <View style={{flex: 1, marginLeft: 12}}>
                    <TextInput 
                        style={{color:'#fff', fontSize: 20 }}
                        placeholder='Write a caption ...'
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                    />
                </View>
                </View>
                <Divider width={0.2} orientation='vertical' />
                <TextInput 
                onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        style={{color:'#fff', fontSize: 18, }}
                        placeholder='Enter Image Url'
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
               </>
           )}
       </Formik>
    )
}

export default FormickPostUploader
