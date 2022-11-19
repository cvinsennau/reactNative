import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';


class EliminarPerfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            pass: '',
            error: '',
        }
    }

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
            <View >

                <Text>Valide con tus datos para eliminar el perfil</Text>

                <View>
                    <TextInput 
                        placeholder= 'Email'
                        keyboardType= 'email-address'
                        onChangeText={ text => this.setState({email: text})}
                        value = {this.state.email}
                        
                    />
                    <TextInput 
                        placeholder= 'Password'
                        keyboardType= 'default'
                        secureTextEntry = {true}
                        onChangeText={ text => this.setState({pass: text})}
                        value = {this.state.pass}
                    
                    />            
                        <Text>{this.state.error}</Text>


                {this.state.email == "" || this.state.pass == "" ?
                    <TouchableOpacity>
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.eliminar(this.state.email, this.state.pass)}>
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                }

                {/* NO FUNCIONA */}
                <Text onPress={ () => this.props.navigation.navigate('Profile')}>Volver a mi perfil</Text>

                </View>

            </View>
        )

        
    }
}


export default EliminarPerfil;