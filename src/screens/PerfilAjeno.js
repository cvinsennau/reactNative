import React, { Component } from "react";
import { db } from "../firebase/config";
import { View, Text, StyleSheet, Image } from 'react-native';

class PerfilAjeno extends Component {
    constructor() {
        super();
        this.state = {
            usuario: [],
            publicaciones: [],
            error: ""
        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach((doc) => {
                    const data = doc.data();
                    // console.log(data , "data");
                    this.setState({
                        userName: data.userName,
                        bio: data.bio,
                    });
                });
            });

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posteos = [];
                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        publicaciones: posteos,
                        loading: false,
                    })
                })
            }
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    {
                        this.state.usuario.foto != '' ?
                            <Image
                                source={{ uri: this.state.usuario.foto }}
                            />
                            :
                            <Image
                                source={require("")}
                            />

                    }
                    <View>
                        <Text style={styles.NombreUsuario}> {this.state.usuario.userName}</Text>
                        <Text style={styles.bio}>{this.state.usuario.bio}</Text>
                        <Text style={styles.informacion}>{this.state.usuario.owner}</Text>
                        <Text style={styles.informacion}>Publicaciones: {this.state.posteos.length}</Text>
                    </View>

                </View>
                {this.state.posteos.length >= 1 ?
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={onePost => onePost.data.createdAt.toString()}
                        renderItem={({ item }) => <Posteo posteoData={item} />}
                    />
                    :
                    <Text > Aun no hay publicaciones</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 10,
        flex: 1
    },
    titulo: {
        color:"white",
        fontFamily: '',
        fontSize: 15,
        marginLeft: 10
    },
    informacion: {
        fontFamily: '',
        fontSize: 11,
        margin: 4,
        paddingLeft: 12,
        color: 'white'
    },



});
export default PerfilAjeno;