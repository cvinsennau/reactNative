import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import Camara from '../components/MyCamera';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: '',
            userName: '',
            bio: '',
            photo: '',
            showCamera: false,
            disabled: true,
            errors: '',
        }
    }


    registerUser(email, pass, userName, bio, photo) {
        //Registrar en firebase y si el registro sale bien redireccionar a Login
        auth.createUserWithEmailAndPassword(email, pass)
            .then(res => {

                db.collection('users').add({ //a esta coleccion de usuarios del data base le agrego un usuario nuevo
                    owner: email,
                    userName: userName,
                    bio: bio,
                    photo: photo,
                    createdAt: Date.now()
                })

                    .then(() => {
                        this.setState({
                            email: '',
                            pass: '',
                            userName: '',
                            bio: '',
                            photo: '',
                            errors: ''
                        })

                        this.props.navigation.navigate('Login')

                    })
            })

            //Muestra el error
            .catch(error => this.setState({
                errors: `Tienes un error: ${error.message}`

            }))
    }

    onImageUpload(url){
        this.setState({
            photo: url,
            showCamera: false,
        })
        
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.title}>Creá tu cuenta</Text>

                <View style={styles.inputView}>

                    <TextInput style={styles.input}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text, errors: '' })}
                        value={this.state.email} />

                    <TextInput style={styles.input}
                        placeholder='Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ pass: text, errors: '' })}
                        value={this.state.pass} />

                    <TextInput style={styles.input}
                        placeholder='Nombre de usuario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ userName: text, errors: '' })}
                        value={this.state.userName}
                    />

                    <TextInput style={styles.input}
                        placeholder='Mini bio'
                        keyboardType='default'
                        multiline
                        numberOfLines={4}
                        onChangeText={text => this.setState({ bio: text, errors: '' })}
                        value={this.state.bio} />

                    {
                        this.state.showCamera ?
                        <View>
                            <Camara style={{width: '100vw', heigth: '100vh', alignItems:'center'}} onImageUpload={url => this.onImageUpload(url)}/> 
                        </View> 
                        :
                        <TouchableOpacity onPress={()=> this.setState({showCamera:true})}>
                            <Text>Subir foto de perfil</Text>
                        </TouchableOpacity>
                    }

                    {/* ESTO SE HACE CON MY CAMERA */}
                    <TextInput style={styles.input}
                        placeholder='Foto de perfil'
                        keyboardType='default'
                        onChangeText={text => this.setState({ photo: text, errors: '' })}
                        value={this.state.photo} />


                </View>

                <Text>{this.state.errors}</Text>

                {this.state.email == "" || this.state.pass == "" || this.state.userName == "" ?
                    <TouchableOpacity style={styles.errors} onPress={() => this.setState({
                        errors: 'Por favor complete los campos de email, contraseña y nombre de usuario'
                    })}>
                        <Text style={styles.buttonError}>Registrarme</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.userName, this.state.bio, this.state.photo)}>
                        <Text style={styles.button}>Registrarme</Text>
                    </TouchableOpacity>
                }

                <Text onPress={() => this.props.navigation.navigate('Login')} >¿Ya tenés una cuenta? Iniciar Sesión</Text>

            </View>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        paddingHorizontal: 10,
        flex: 1,
        
    },
    title: {
        fontSize: 20,
        margin: 10,
        fontSize: 24,
        padding: 10
    },
    inputView: {
        justifyContent: "center",
    },
    input: {
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        textAlignVertical: 'center'
    },
    buttonError: {
        backgroundColor: "blue",
        opacity: 0.4,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 10
    },
    button: {
        backgroundColor: "black",
        borderRadius: 10,
        color:"white",
        textAlign: "center",
        padding: 10,
        margin: 10
    },
    buttonCamera: {
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 10
    },
    errors:{
        color: "red"
    }
})

export default Register;
