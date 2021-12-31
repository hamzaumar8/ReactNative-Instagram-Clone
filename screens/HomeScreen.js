import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import BottomTab, { bottomTabIcons } from '../components/home/BottomTab'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
import { POSTS } from '../data/post'
import { db } from '../firebase'

const HomeScreen = ({navigation}) => {

    useEffect(() => {
        db.collectionGroup('posts').onSnapshot(snapshot => {
            console.log(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header navigation={navigation}/>
            <Stories />
            <ScrollView>
                {POSTS.map((post, index) =>(
                <Post post={post} key={index}/>
                ))}
            </ScrollView>
            <BottomTab icons={bottomTabIcons} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    }
})

export default HomeScreen
