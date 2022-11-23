import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Post from '../components/Post'
import firebase from "firebase"

import { MaterialIcons } from '@expo/vector-icons';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            email: "",
            bio: '',
            photo: '',
            posts: []
        }
    }


    componentDidMount() {

        console.log(auth.currentUser.email, "usuario");

        this.setState({ email: auth.currentUser.email });

        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach((doc) => {
                    const data = doc.data();
                    this.setState({
                        userName: data.userName,
                        bio: data.bio,
                        photo: data.photo
                    });
                });
            });

        db.collection('posts').where('creador', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                    })
                })
            }
        )
    };
    eliminarPublicacion(item) {
        console.log(item, "item a eliminar");
        
        db.collection("posts").doc(item.id).delete()
            .then(() => {
            })
            
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('Login')
            })
    }

    eliminarPerfil() {
        this.props.navigation.navigate('EliminarPerfil')
    }

    back() {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (

            <View style={styles.container}>

                <Text style={styles.title}>Be Fake.</Text>

                <TouchableOpacity style={styles.button} onPress={() => this.back()} >
                    <Text style={styles.buttonText}>Volver a Home</Text>
                </TouchableOpacity>

                <View style={styles.subContainer}>
                    {this.state.photo != '' ?
                        <Image
                            style={styles.profilePhoto}
                            source={this.state.photo}
                            resizeMode='cover'
                        />
                        :
                        <Image
                            style={styles.profilePhoto}
                            source={require('../../assets/sinFoto.png')}
                            resizeMode='cover'
                        />
                    }

                    <Text style={styles.userNameText}>{this.state.userName}</Text>

                </View>

                <View>
                    <Text style={styles.text}>Email: {this.state.email}</Text>
                    <Text style={styles.text}>Biografía: {this.state.bio}</Text>
                    <Text style={styles.text}>Listado de {this.state.posts.length} posteos</Text>
                </View>

                <View>
                    {this.state.posts.length >= 1 ?
                        <FlatList style={styles.list}
                            data={this.state.posts}
                            keyExtractor={onePost => onePost.id.toString()}
                            renderItem={({ item }) =>

                                <View> <Post postData={item} />  <TouchableOpacity style={styles.button} onPress={() => this.eliminarPublicacion(item)}>
                                    <Text style={styles.buttonText}>Borrar Publicación</Text>
                                </TouchableOpacity></View>}
                        />
                        :
                        <Text>Aún no hay publicaciones</Text>
                    }
                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={() => this.eliminarPerfil(this.state.email)} >
                        <Text style={styles.buttonText}>Borrar perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                        <Text style={styles.buttonText}><MaterialIcons name="logout" size={16} color="white" /> Logout</Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        overflow: "scroll",
        flex: 1,
        padding: 10,
    },
    subContainer: {
        alignItems: 'center'
    },
    userNameText: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profilePhoto: {
        height: 200,
        width: 200,
        borderRadius: 250,
        margin: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        margin: 6,
    },
    button: {
        borderRadius: 10,
        margin: 5,
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
    title: {
        fontSize: 46,
        fontWeight: 'bold',
        marginTop: 20,
        margin: 10,
        color: 'black'
    },
    list: {
        paddingHorizontal: 17,
        backgroundColor: "#E6E6E6",
        flex: 1,
    },
})

export default Profile;