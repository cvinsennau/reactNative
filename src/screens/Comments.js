import React, {Component} from "react"
import firebase from "firebase"
import {db, auth} from "../firebase/config"
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Flatlist} from "react-native"

class Comments extends Component {
    constructor(props){
    super(props)
    this.state = {
        comentario: "",
        comentarios: [            
        ],
        PostId: this.props.route.params.id,
       
        }
    }

    componentDidMount(){
        db.collection("posteos").doc(this.state.id)
        .onSnapshot(
            docs => {
                this.setState({
                    comentarios: docs.data().comentarios
                })
            }
        )
    }

    UploadComments(comentario){
        db.collection("posteos")
        .doc(this.state.id)
        .update({
            comentarios:
        })
        .then (()=>{
            this.setState({
                comentario:""
            })
        })
    }

    render(){
        return
    }
}