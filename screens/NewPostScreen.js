import React from 'react'
import { SafeAreaView } from 'react-native'
import AddNewPost from '../components/newPost/AddNewPost'

const NewPostScreen = () => {
    return (
        <SafeAreaView style={{backgroundColor: '#000', flex: 1}}>
            {/* {Platform.OS === 'ios' ? 'padding' : 'height'} */}
            <AddNewPost />
        </SafeAreaView>
    )
}

export default NewPostScreen
