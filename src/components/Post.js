import React, { Component, Dimensions } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config'; //auth componente para autenticar el firebase, chequear si existe un usuario o crear un usuario. db es data base
import firebase from 'firebase';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantidaddelikes: props.postData.data.likes.length,
            milike: false
        }
    }

    componentDidMount( // quiero ver si el usuario ya likeo la foto o no entonces en el primer renderizado le mando esto
    ) {
        if (this.props.postData.data.likes.includes(auth.currentUser.email)) { 
            this.setState({ 
                milike: true }) 
            } // si el usuario ya likeo el posteo que me aparezca milike true, es decir que ya este likeado y this.setState es justamente para modificar un esatdo ya establecido previamente
    }

    like() { // es un array
        db.collection("posts").doc(this.props.postData.id) //identificar el posteos
            .update({ //lo actualizo agreganfo mi like
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
            }) // dentro de firebase esta firetore donde etan todas mis colecciones dentro de la coleccin de posteos voy a tener un arrya que son los likes, le quiero agregar a mi campo de likes osea a ese array el like de este usuario en particular a traves del email
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidaddelikes + 1,
                milike: true,
            })
            )
            .catch(e => console.log(e))
    }

    dislike() { // es un array
        db.collection("posts").doc(this.props.postData.id) //identificar el posteos
            .update({ //lo actualizo agreganfo mi like
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
            }) // dentro de firebase esta firetore donde etan todas mis colecciones dentro de la coleccin de posteos voy a tener un arrya que son los likes, le quiero agregar a mi campo de likes osea a ese array el like de este usuario en particular a traves del email
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidaddelikes - 1,
                milike: false,
            })
            )
            .catch(e => console.log(e))
    }

    render() {
        { console.log(this.props.postData.data) }
        return (
            
            <View style={styles.container} >  

                {this.props.postData.data.creador == auth.currentUser.email ?
                    <Text onPress={() => this.props.navigation.navigate('Profile', {id: this.props.id})}> {this.props.postData.data.creador}</Text>
                    :
                    <Text onPress={() => this.props.navigation.navigate('PerfilAjeno', { email: this.props.postData.data.creador })}> {this.props.postData.data.creador}</Text>

                }

                <View>
                    <Text>{this.props.postData.data.description} {this.props.postData.data.user} ({this.state.cantidaddelikes})
                    </Text>
                    <Image source={{uri: this.props.postData.data.image}} style={styles.photo} resizeMode="cover"/>
                    
                </View>

                {this.state.milike ?
                    <TouchableOpacity style={styles.button} onPress={() => this.dislike()}>
                        <Text style={styles.buttonText}>No me gusta</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => this.like()}>
                        <Text style={styles.buttonText}>Me gusta</Text>
                    </TouchableOpacity>
                }
            </View>

        )
    }
}



const styles= StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "vertical",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center"
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },

      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },

    photo: {        
        height: '40vh',
        width:'40vw',
        borderRadius:"30"
    }
})

export default Post;

    //11: es un array de likes que me va a llegar de la screen de post y me va a traer la cantidad de likes que tiene esa foto