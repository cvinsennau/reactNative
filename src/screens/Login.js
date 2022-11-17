import React, { Component } from 'react';
import Camara from '../components/MyCamera';
import { auth } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: '',
            error: '',
        }
    }


    loginUser(email, pass) {

        //Registrar en firebase y si el registro sale bien redireccionar a Home
        auth.signInWithEmailAndPassword(email, pass)
            .then(res => {
                this.props.navigation.navigate('HomeMenu')
            })

            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                <TextInput style={styles.input}
                    placeholder='email'
                    keyboardType='email-address'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput style={styles.input}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ pass: text })}
                    value={this.state.pass}
                />

                {this.state.email == "" || this.state.pass == "" ?
                    <TouchableOpacity>
                        <Text style={styles.buttonError}>Ingresar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.loginUser(this.state.email, this.state.pass)}>
                        <Text style={styles.button}>Ingresar</Text>
                    </TouchableOpacity>
                }

                <Text onPress={() => this.props.navigation.navigate('Register')}>Ir a Registro</Text>


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
    title: {
        fontSize: 20,
        margin: 10
    },
    input: {
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    buttonError: {
        backgroundColor: "blue",
        color: "white",
        opacity: 0.4,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 10
    },
    button: {
        backgroundColor: "blue",
        borderRadius: 10,
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 10
    }
})


export default Login;