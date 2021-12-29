import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import BottomTab, { bottomTabIcons } from '../components/home/BottomTab'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
import { POSTS } from '../data/post'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header />
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
