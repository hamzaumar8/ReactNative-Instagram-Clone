import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Header = () => {
    return (
        <View style={styles.container}>
           <TouchableOpacity>
               <Image style={styles.logo} source={require('../../assets/header-logo.png')} />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require('../../assets/plus-2-math.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require('../../assets/like--v1.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>10</Text>
                    </View>
                    <Image style={styles.icon} source={require('../../assets/facebook-messenger.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignContent: "center",
        flexDirection: 'row',
        marginHorizontal: 20
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    unreadBadge: {
        backgroundColor: '#ff3250',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    unreadBadgeText: {
        fontWeight: '600',
        color: '#fff',
    }
})


export default Header