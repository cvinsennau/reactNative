import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


class EliminarPerfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            email: "",
            pass: '',
            error: '',
        }
    }

    componentDidMount() {                
        this.setState({email: auth.currentUser.email});

        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach((doc) => {
                    const data = doc.data();
                    this.setState({
                        email: data.email,
                        userName: data.userName,
                    });
                });
            });

    };

    eliminar(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                auth.currentUser.delete()
                .then( () => {
                        this.props.navigation.navigate('Login')
                    })
                })
                    .catch(error => {
                        this.setState({error: 'Error'})
                })
    }


    render(){
        return(
            <View style={styles.container}>

                <Text style={styles.title}>Para eliminar tu cuenta, validá que sos {this.state.userName}</Text>

                <View>
                    <TextInput style={styles.input}
                        placeholder= 'Email'
                        keyboardType= 'email-address'
                        onChangeText={ text => this.setState({email: text})}
                        value = {this.state.email}
                        
                    />
                    <TextInput style={styles.input}
                        placeholder= 'Password'
                        keyboardType= 'default'
                        secureTextEntry = {true}
                        onChangeText={ text => this.setState({pass: text})}
                        value = {this.state.pass}
                    
                    />            
                    
                    <Text>{this.state.error}</Text>




                {this.state.email == "" || this.state.pass == "" ?
                    <TouchableOpacity onPress={() => this.setState({
                        errors: 'Por favor complete los campos de email y contraseña'
                    })}>
                        <Text style={styles.buttonError}><FontAwesome name="trash-o" size={16} color="white" /> Eliminar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity  onPress={() => this.eliminar(this.state.email, this.state.pass)}>
                        <Text style={styles.button}><FontAwesome name="trash-o" size={16} color="white" /> Eliminar</Text>
                    </TouchableOpacity>
                }

                <Text onPress={ () => this.props.navigation.navigate('Profile')}>Volver a mi perfil</Text>

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
    },
    title:{
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
    buttonError:{
        backgroundColor: "blue",
        opacity: 0.4,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        margin: 10
    },
    button:{
        backgroundColor: "blue",
        borderRadius: 10,
        color:"white",
        textAlign: "center",
        padding: 10,
        margin: 10
    }
});


export default EliminarPerfil;