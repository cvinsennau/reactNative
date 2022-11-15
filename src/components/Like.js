import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import {auth, db} from '../firebase/config'; //auth componente para autenticar el firebase, chequear si existe un usuario o crear un usuario. db es data base
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = { 
            cantidaddelikes: this.props.postData.data.like.length,
            milike: false
                }
    }
componentDidMount( // quiero ver si el usuario ya likeo la foto o no entonces en el primer renderizado le mando esto
){
    if (this.props.postData.data.like.includes(auth.currentUser.email)) {this.setState({milike: true})} // si el usuario ya likeo el posteo que me aparezca milike true, es decir que ya este likeado y this.setState es justamente para modificar un esatdo ya establecido previamente

}
like(){ // es un array
    db.collection("posts").doc(this.props.postData.id) //identificar el posteos
    .update({ //lo actualizo agreganfo mi like
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
    }) // dentro de firebase esta firetore donde etan todas mis colecciones dentro de la coleccin de posteos voy a tener un arrya que son los likes, le quiero agregar a mi campo de likes osea a ese array el like de este usuario en particular a traves del email
    .then(()=> this.setState({
        cantidadDeLikes: this.state.cantidaddelikes +1,
        milike: true, 
        })
    )
    .catch(e=>console.log(e))
}
dislike(){ // es un array
    db.collection("posts").doc(this.props.postData.id) //identificar el posteos
    .update({ //lo actualizo agreganfo mi like
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) //traer el email del usuario logueado con auth.currentUser.email. Chequear que este importado auth.
    }) // dentro de firebase esta firetore donde etan todas mis colecciones dentro de la coleccin de posteos voy a tener un arrya que son los likes, le quiero agregar a mi campo de likes osea a ese array el like de este usuario en particular a traves del email
    .then(()=> this.setState({
        cantidadDeLikes: this.state.cantidaddelikes -1,
        milike: false,})
        )
        .catch(e=>console.log(e))
    }
    
    render(){
            return(
                <View>
                        {this.state.milike ? 
                        <TouchableOpacity onPress={ ()=> this.dislike() }>
                            <Text>No me gusta</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={ ()=> this.like() }>
                            <Text>Me gusta</Text>
                        </TouchableOpacity>
                    }
                </View>
              
            )
        }
    }
    
    export default Post;
    
    //11: es un array de likes que me va a llegar de la screen de post y me va a traer la cantidad de likes que tiene esa foto