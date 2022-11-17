import React, {Component} from "react"
import {db, auth} from "../firebase/config"
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Flatlist} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"

class Comments extends Component {
    constructor(props){
    super(props)
    this.state = {
        oneComment: "",
        comments: [],
        PostId: this.props.route.params.id
       
        }
    }

    componentDidMount(){
        db.collection("posts").doc(this.state.PostId).onSnapshot(
            docs => {
                this.setState({
                    comments: docs.data()//.campo de firebase creo
                })
            }
        )
    }

    uploadComments(comentario){
        db.collection("posts").doc(this.state.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({}) //campo firebase tocar base de datos
        })
        .then (()=>{
            this.setState({
                oneComment:""
            })
        })
    }

    render(){
        return(
            <View style={styles.container} > 
                <View>
                    {this.state.comments == 0 ?

                        <View>
                            <Text style= {styles}> Todavía no hay comentarios. </Text>
                        </View>
                        :
                        <Flatlist
                            data={this.state.comments}
                            keyExtractor={oneComment => oneComment.createdAt.toString()}
                            renderItem={({ item }) => <Text style={styles}>{item.creador}: {item.comentario}</Text>}
                        />
                    }
                     <TextInput
                        placeholder ='Agregue un comentario'
                        keyboardType ='default'
                        onChangeText = {text => this.setState({ oneComment: text })}
                        value = {this.state.comentario}
                        style = {styles.texto}
                    />
                    {this.state.oneComment == "" ?
                        <Text></Text>
                        :
                        <TouchableOpacity onPress={() => this.uploadComments(this.state.oneComment)}>
                            <Text style = {styles}>Upload Comment</Text>
                        </TouchableOpacity>
                    }
                </View>

            </View>
        )

    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.white,
    }
})
export default Comments;