import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <View></View>
        )
    }
}

export default Post;