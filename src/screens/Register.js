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
            error: '',
        }
    }

    registerUser(email, pass, userName, bio){
        //Registrar en firebase y si el registro sale bien redireccionar a Login
        auth.createUserWithEmailAndPassword(email,pass,userName)
            .then (res => {

                db.collection('users').add({
                    owner: email,
                    userName: userName,
                    bio: bio,
                    createdAt: Date.now()
                })

                .then(() => {
                    this.setState({
                        email:'',
                        pass:'',
                        userName:'',
                        bio:'',
                        error:''                        
                    })

                    this.props.navigation.navigate('HomeMenu')
                })

                this.props.navigation.navigate('Login')
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
                    onChangeText={ text => this.setState({password:text}) }
                    value={this.state.password}/>

                <TextInput style={styles.input}
                    placeholder='Nombre de usuario'
                    keyboardType='default'
                    onChangeText={ text => this.setState({username:text}) }
                    value={this.state.username}/>

                <TextInput style={styles.input}
                    placeholder='Mini bio'
                    keyboardType='default'
                    multiline={true}
                    onChangeText={ text => this.setState({bio:text}) }
                    value={this.state.bio} />
                
                </View>
                      

                <TouchableOpacity style={styles.button} onPress={()=>this.registerUser(this.state.email, this.state.pass, this.state.userName)}>
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
