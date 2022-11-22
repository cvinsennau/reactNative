import React, { Component } from "react"
import { db, auth } from "../firebase/config"
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native"
import firebase from 'firebase';
//import { Colors } from "react-native/Libraries/NewAppScreen"

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oneComment: "",
            comments: [],
            PostId: this.props.route.params.id

        }
    }

    componentDidMount() {
        db.collection("posts").doc(this.state.PostId).onSnapshot(
            docs => {
                this.setState({
                    comments: docs.data().coments//.campo de firebase creo
                })
            }
        )
    }

    uploadComments(comentario) {
        db.collection("posts").doc(this.state.PostId).update({
            coments: firebase.firestore.FieldValue.arrayUnion({creador: auth.currentUser.email, textoComentario: this.state.oneComment, createdAt: Date.now()}) //campo firebase tocar base de datos
        })
            .then(() => {
                this.setState({
                    oneComment: "",
                })
            })
    }

    back() {
        this.props.navigation.navigate('Home')  
    }

    render() {
        return (
            <View style={styles.container} >
                <View>
                <TouchableOpacity style={styles.button} onPress = {() => this.back()} >
                    <Text style={styles.buttonText}>Volver a Home</Text>
                </TouchableOpacity> 
                    {this.state.comments == 0 ?

                        <View>
                            <Text style={styles}> Todavía no hay comentarios. </Text>
                        </View>
                        :

                        
                        <FlatList
                            data = {this.state.comments}
                            keyExtractor = {oneComment => oneComment.createdAt.toString()}
                            renderItem={({ item }) => <Text >{item.creador}: {item.textoComentario}</Text>}
                        />
                    }
                    <TextInput
                        placeholder='Agregue un comentario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ oneComment: text })}
                        value={this.state.comentario}
                        style={styles.texto}
                    />
                    {this.state.oneComment == "" ?
                        <Text></Text>
                        :
                        <TouchableOpacity onPress={() => this.uploadComments(this.state.oneComment)}>
                            <Text style={styles}>Upload Comment</Text>
                        </TouchableOpacity>
                    }


                </View>

            </View>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    button:{
        backgroundColor: "grey",
        borderRadius: 10,
        margin: 5,
    }, 
})
export default Comments;