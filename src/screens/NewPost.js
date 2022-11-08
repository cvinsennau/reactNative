import React, { Component } from 'react';
import {Text, TextInput, TouchableOpacity,View} from 'react-native';
import {auth, db} from '../firebase/config';
import MyCamera from '../components/MyCamera';

class NewPost extends Component{
    constructor(){
        super()
        this.state={
            photo:'',
            textPost:'',
            createdAt:'',
            showCamera: true,
        }
    }

    render(){
        return(
            <View>
           
            </View>
        )
    }
}


export default NewPost;