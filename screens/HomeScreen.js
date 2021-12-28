import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import Header from '../components/home/Header'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header />
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
