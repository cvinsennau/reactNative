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

                <Text style={styles.title}>BeFake.</Text>

                <View style={styles.buttons}>

                    <Text style={styles.text} onPress={() => this.props.navigation.navigate('Register')} >Registrate</Text>
                    <Text style={styles.text} onPress={() => this.props.navigation.navigate('Login')} >Ingresa</Text>

                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
    title: {
        fontSize: 46,
        fontWeight: 'bold',
        marginTop: 50,
        margin: 10,
        color: 'white'
    },
    text: {
        fontSize: 20,
        margin: 20,
        paddingBottom: 10,
        color: 'white',
    },
})
export default Portada