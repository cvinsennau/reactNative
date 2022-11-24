import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import Camara from '../components/MyCamera';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

class NewPost extends Component {
    constructor() {
        super()
        this.state = { //estado inicial, quiero todoos los arrays y eso vacios 
            photo: '',
            description: '',
            createdAt: '',
            mostrarCamara: true,
            likes: [],
            coments: [],//MAURO COMENTARIOS, QUE LE LLEGUEN DESDE EL FORM DE COMENTARIOS 
        }
    }


    subirPost() { //funcion que la informacion de ese posteo

        db.collection('posts').add({
            creador: auth.currentUser.email, // el email de la persona que postep
            image: this.state.photo, //es la url de la foto que me lo traje 
            description: this.state.description, // es lo que escribio la persona en el input
            likes: this.state.likes, //el largo del array de likes
            coments: this.state.coments, //el largo del array de comentarios 
            createdAt: Date.now()

        }) //como add es un metodo asincronico le pido que cuando se cumpla, me traiga devuelta al estado inicial para que aparezca devuelta
            .then(() => {
                this.setState({
                    description: '',
                    photo: '',
                    createdAt: '',
                    mostrarCamara: true,
                    likes: [],
                    coments: [],

                })

                this.props.navigation.navigate('Home')
            })
            .catch(err => console.log(err))



    }

    onImageUpload(url) { //esta es la funcion que hace que se guarde la url en el estado y deja de mostrar la camara depsues de sacar la foto
        this.setState({ //estoy actualizando el estado inicial 
            photo: url, //aca estoy pasando al estado que la foto va a estar esta url 
            mostrarCamara: false,
        })
    }
    render() {//contenedor con view con logo
        return (
            <View style={styles.container}> 

                <Text style={styles.titulo}>Haz un post!</Text>
                {
                    this.state.mostrarCamara ?
                        <Camara onImageUpload={url => this.onImageUpload(url)} /> // componente camara para sacar la foto
                        :
                        <View>
                            {/* <Text> Escribe algo</Text> */}
                            <View>
                                <TextInput  //esto es un in put 
                                    placeholder='Escribe algo aquí'
                                    keyboardType='default'
                                    onChangeText={text => this.setState({ description: text })} //se fija que todo lo que vaya escribiendo la persona se vaya guardando en el estadp y lo va guardar en el value
                                    value={this.state.description} // es el valor final del input,
                                />

                                <TouchableOpacity onPress={() => this.subirPost()}> 
                                    <Text style={styles.boton}> Compartir tu post</Text>
                                </TouchableOpacity>

                            </View>
                        </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: 'dark grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {

        fontSize: 25,
        margin: 15
    },
    form: {
        backgroundColor: 'light blue',
        borderRadius: 10,
        padding: 15
    },
    campo: {
        backgroundColor: 'blue',
        fontSize: 14,
        margin: 8,
        borderRadius: 10,
        textAlign: 'center',
        padding: 5
    },
    boton: {
        margin: 11,
        fontSize: 15,
        borderRadius: 10,
        textAlign: 'center',
        padding: 5
    },
    link: {

        fontSize: 10,
        margin: 4,
        textAlign: 'right'
    }
})

export default NewPost;


//linea 80
 //this.postear, postear es un metodo que cuando yo apreto este boton va a llegar a la base de datos