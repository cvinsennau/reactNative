import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

class Portada extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

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


//linea 15 "this.props.navigation.navigate " propiedad navigation y el metodo navigate de react native