import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Divider } from 'react-native-elements'

const Post = ({ post }) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
        </View>
    )
}

const PostHeader = ({ post }) => (
    <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
            <Image source={{ uri: post.profile_picture }} style={styles.story} />
            <Text style={styles.postHeaderText}>{post.user}</Text>
        </View>
        <Text style={styles.postHeaderRight}>...</Text>
    </View>
)

const PostImage = ({ post }) => (
   <View style={styles.postImageContainer}>
       <Image source={{uri: post.imageUrl}} style={styles.postImage}/>
   </View> 
)

const styles = StyleSheet.create({
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    },
    postHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.5,
        borderColor: "#ff8501"
    },
    postHeaderText: {
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold'
    },
    postHeaderRight: {
        fontWeight: '900',
        color: '#fff'
    },
    postImage: {
        height: '100%',
        resizeMode: 'cover',
    },
    postImageContainer: {
        height: 450,
        width: '100%'
    }
})

export default Post
