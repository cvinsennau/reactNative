import React, { Component } from 'react';
import { auth} from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

class Portada extends Component {
    constructor() {
        super()
        this.state = {

        }
    }


   //Remember me
    // componentDidMount() {
    //     auth.onAuthStateChanged(user => {
    //         this.props.navigation.navigate('HomeMenu')
    //     })
    // } 

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text} onPress={() => this.props.navigation.navigate('Register')} >Registrate</Text>
                <Text style={styles.text} onPress={() => this.props.navigation.navigate('Login')} >Log In</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        paddingHorizontal: 10,
        flex: 1
    },
    text: {
        fontSize: 20,
        margin: 10
    },
})
export default Portada