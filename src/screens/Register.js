import React, { Component } from 'react';
import {auth,db} from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';


class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            pass: '',
            userName: '',
            bio: '',
            photo:'',
            errors: '',
        }
    }

    //Remember me
    // componentDidMount(){
    //     auth.onAuthStateChanged(user => {
<<<<<<< HEAD
    //         this.props.navigation.navigate('Home')
=======
    //         this.props.navigation.navigate('HomeMenu')
>>>>>>> 58fc05014d269001f4445c3093f7c5e548b8be6c
    //     })
    // }


    registerUser(email,pass,userName,bio,photo){
        //Registrar en firebase y si el registro sale bien redireccionar a Login
        auth.createUserWithEmailAndPassword(email,pass)
            .then (res => {

                db.collection('users').add({
                    owner: email,
                    userName: userName,
                    bio: bio,
                    photo: photo,
                    createdAt: Date.now()
                })

                .then(() => {
                    this.setState({
                        email:'',
                        pass:'',
                        userName:'',
                        bio:'',
                        errors:''                        
                    })
                    
                this.props.navigation.navigate('Login')

                })   
            })

            //Muestra el error
            .catch(error => this.setState({
<<<<<<< HEAD
                errors: `Tienes un error: ${error.message}`

=======
                errors: error.message
>>>>>>> 58fc05014d269001f4445c3093f7c5e548b8be6c
            }))
    }


    render(){
        return(
            <View style={styles.container} >
                <Text style={styles.title}>Registro</Text>

                <View style={styles.inputView}>

                <TextInput style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({email:text, errors:''}) }
                    value={this.state.email} />

                <TextInput style={styles.input}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({pass:text, errors:''}) }
                    value={this.state.pass}/>

                <TextInput style={styles.input}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    onChangeText={ text => this.setState({userName:text, errors:''}) }
                    value={this.state.userName}
                    />

                <TextInput style={styles.input}
                    placeholder='Mini bio'
                    keyboardType='default'
                    multiline
                    numberOfLines={4}
                    onChangeText={ text => this.setState({bio:text, errors:''}) }
                    value={this.state.bio} />

                {/* ESTO SE HACE CON MY CAMERA */}
                <TextInput style={styles.input}
                    placeholder='Photo'
                    keyboardType='default'
                    onChangeText={ text => this.setState({photo:text, errors:''}) }
                    value={this.state.photo} />
                
                </View>
                <Text>{this.state.errors}</Text>

                {this.state.email =="" || this.state.pass =="" || this.state.userName == "" ? 
                    <TouchableOpacity onPress={() => this.setState({
                        errors: 'Por favor complete los campos de email, password y userName'
                    })}>
                        <Text style={styles.buttonError}>Registrarme</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.registerUser(this.state.email, this.state.pass, this.state.userName,this.state.bio,this.state.photo)}>
                        <Text style={styles.button}>Registrarme</Text>
                    </TouchableOpacity>
                }

                <Text onPress={ () => this.props.navigation.navigate('Login')} >¿Ya tenés una cuenta? Iniciar Sesión</Text>

            </View>
        )
        
    }

}

const styles = StyleSheet.create({
    container:{
        textAlign:"center",
        paddingHorizontal:10,
        flex:1
    },
    title:{
        fontSize:20,
        margin: 10
    },
    inputView:{
        justifyContent:"center",
    },
    input:{
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        textAlignVertical: 'center'
    },
    buttonError:{
        backgroundColor:"blue",
        color: "white",
        opacity: 0.4,
        borderRadius: 10,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        margin: 10
    },
    button:{
        backgroundColor:"blue",
        borderRadius: 10,
        color: "white",
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        margin: 10
    }
})

export default Register;
