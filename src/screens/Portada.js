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
            <View style={styles.container}> 
                <Text onPress={ () => this.props.navigation.navigate ('Register')} >Registrate</Text>
                <Text onPress={ () => this.props.navigation.navigate ('Login')} >Log In</Text>
            </View>  
        )
    }

}

const styles = StyleSheet.create({
})
export default Portada


//linea 15 "this.props.navigation.navigate " propiedad navigation y el metodo navigate de react native