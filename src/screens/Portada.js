import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Portada extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }

    render (){
        return(
            <View> 
                <Text onPress={ () => this.props.navigation.navigate ('Register')} style={styles.link}>Registrate</Text>
                <Text onPress={ () => this.props.navigation.navigate ('Login')} style={styles.link}>Log In</Text>
            </View>  
        )
    }

}

export default Portada

//linea 15 "this.props.navigation.navigate " propiedad navigation y el metodo navigate de react native