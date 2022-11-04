import React, { Component } from 'react';
import {auth,db} from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';


class Register extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            pass: '',
            userName: '',
            bio: '',
            photo:'',
            errors: '',
        }
    }

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

                //equivalente a res.redirect
                .catch(error => console.log(error))    

            })
            .catch(error => console.log(error))
    }


    render(){
        return(
            <View style={styles.container} >
                <Text style={styles.title}>Registro</Text>

                <View style={styles.inputView}>

                <TextInput style={styles.input}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({email:text}) }
                    value={this.state.email} />

                <TextInput style={styles.input}
                    placeholder='Contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={ text => this.setState({pass:text}) }
                    value={this.state.pass}/>

                <TextInput style={styles.input}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    onChangeText={ text => this.setState({userName:text}) }
                    value={this.state.userName}/>

                <TextInput style={styles.input}
                    placeholder='Mini bio'
                    keyboardType='default'
                    multiline
                    numberOfLines={4}
                    onChangeText={ text => this.setState({bio:text}) }
                    value={this.state.bio} />
                
                <TextInput style={styles.input}
                    placeholder='Photo'
                    keyboardType='default'
                    onChangeText={ text => this.setState({photo:text}) }
                    value={this.state.photo} />
                
                </View>
                      

                <TouchableOpacity style={styles.button} onPress={()=>this.registerUser(this.state.email, this.state.pass, this.state.userName,this.state.bio,this.state.photo)}>
                    <Text>Registrarme</Text>
                </TouchableOpacity>

                <Text onPress={ () => this.props.navigation.navigate('Login')} >Ir a Login</Text>

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
    button:{
        backgroundColor:"#ccc",
        borderRadius: 10,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        margin: 10
    }
})

export default Register;
