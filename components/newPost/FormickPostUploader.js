import { Formik } from 'formik'
import React, { useState } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import * as  Yup from 'yup'

const PLACEHOLDER_IMG = 'https://gadgetsghana.com/assets/images/logo.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit'),
})

const FormickPostUploader = () => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)

    return (
       <Formik 
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={(values) => console.log(values)}
            validationSchema={uploadPostSchema}
       >
           {({ handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
               <>
                    <View>
                        <Image />
                    </View>
                    <TextInput 
                        placeholder='Hello'
                        placeholderTextColor='gray'
                    />
               </>
           )}
       </Formik>
    )
}

export default FormickPostUploader
