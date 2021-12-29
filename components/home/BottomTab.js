import React, { useState } from 'react'
import { View, StyleSheet , TouchableOpacity, Image} from 'react-native'
import { Divider } from 'react-native-elements';

export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/home.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png'
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/48/ffffff/search.png',
        inactive: 'https://img.icons8.com/ios/48/ffffff/search.png'
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/48/ffffff/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/48/ffffff/instagram-reel.png'
    },
    {
        name: 'Shop',
        active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png'
    },
    {
        name: 'Profile',
        active: 'https://gadgetsghana.com/assets/images/logo.png',
        inactive: 'https://gadgetsghana.com/assets/images/logo.png'
    },
];


const BottomTab = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image 
                source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }} 
                style={[
                    styles.icon, 
                    icon.name === 'Profile' ? styles.profilePic() : null, 
                    activeTab === 'Profile' && icon.name === activeTab ? styles.profilePic(activeTab) : null, 
                ]}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        zIndex: 999,
        bottom: 0,
        backgroundColor: '#000'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50,
    },
    icon:{
        width:30,
        height: 30,
    },
    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === 'Profile' ? 2 : 0,
        borderColor: '#fff'
    })
})

export default BottomTab
