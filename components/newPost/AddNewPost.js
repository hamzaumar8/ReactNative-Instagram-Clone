import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import FormickPostUploader from './FormickPostUploader'

const AddNewPost = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            {/* FormickPostUploader */}
            <FormickPostUploader navigation={navigation}/>
        </View>
    )
}

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image 
            source={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}}
            style={{ width:30, height:30 }}
        />
    </TouchableOpacity>
    <Text style={styles.headerText}>New Post</Text>
    <Text></Text>
</View>
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginHorizontal: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 25,
    }
})
export default AddNewPost
