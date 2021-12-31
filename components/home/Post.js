import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native'
import { Divider } from 'react-native-elements'
import { db, firebase } from '../../firebase'

const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/hearts.png',
        likedImageUrl: 'https://img.icons8.com/fluency-systems-filled/48/fa314a/like.png',
    },
    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/material-outlined/24/ffffff/speech-bubble--v1.png',
    },
    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/paper-plane.png',
    },
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/bookmark-ribbon--v1.png',
    },
]
const Post = ({ post }) => {
    const handleLike = post => {
        const currentLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                likes_by_users: currentLikeStatus 
                ? firebase.firestore.FieldValue.arrayUnion(
                    firebase.auth().currentUser.email
                ) 
                : firebase.firestore.FieldValue.arrayRemove(
                    firebase.auth().currentUser.email
                ),
            })
            .then(() => {
                console.log('Document succesfully update!')
            })
            .catch(error => {
                console.error('Error updating document: ', error)
            })
    }

    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{marginHorizontal: 15, marginTop: 10}}>
                <PostFooter post={post} handleLike={handleLike}/>
                <PostFooterLikes post={post} />
                <PostCaption post={post}/>
                <PostCommentsSection post={post} />
                <PostComments post={post} />
            </View>
        </View>
    )
}

const PostHeader = ({ post }) => (
    <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
            <Image source={{ uri: post.profile_picture }} style={styles.story} />
            <Text style={styles.postHeaderText}>{post.username}</Text>
        </View>
        <Text style={styles.postHeaderRight}>...</Text>
    </View>
)

const PostImage = ({ post }) => (
   <View style={styles.postImageContainer}>
       <Image source={{uri: post.imageUrl}} style={styles.postImage}/>
   </View> 
)

const PostFooter = ({ handleLike, post }) => {
    return(
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.leftFooterIconsContainer}>
                <TouchableOpacity onPress={() => handleLike(post)}>
                    <Image 
                        source={{ uri: post.likes_by_users.includes(
                            firebase.auth().currentUser.email) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl }} 
                        style={styles.footerIcon} 
                    />
                </TouchableOpacity>
                <PostFooterIcon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl}/>
                <PostFooterIcon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl}/>
            </View>
            <View>
                <PostFooterIcon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl}/>
            </View>
        </View>
    )
}

const PostFooterIcon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image source={{ uri: imgUrl }} style={imgStyle} />
    </TouchableOpacity>
)

const PostFooterLikes = ({ post }) => (
    <View style={styles.likesContainer} >
        <Text style={{color: '#fff', fontWeight: '600'}}>{post.likes_by_users.length.toLocaleString('en')} likes</Text>
    </View>
)

const PostCaption = ({ post }) => (
    <View style={{marginTop:5}}>
        <Text style={{color: '#fff'}}>
            <Text style={{fontWeight: '600' }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const PostCommentsSection = ({ post }) => (
    <View style={{ marginTop: 5}}>
        { !!post.comments.length && (
            <Text style={{color: 'grey'}}>
                View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {post.comments.length > 1 ? 'comments' : ' comment'}
            </Text>
        )} 
    </View>
)

const PostComments = ({ post }) => (
    <>
    {post.comments.map((comment, index) => (
        <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: '#fff'}}>
                <Text style={{ fontWeight: '600'}}>{comment.user}</Text>
                {' '}{comment.comment}
            </Text>
        </View>
    ))}
    </>
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
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between'
    },
    likesContainer: {
        flexDirection: 'row',
        marginTop:5,
    }
})

export default Post
