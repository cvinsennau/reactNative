import React, { Component } from "react";
import { auth, db } from "../firebase/config";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import Post from '../components/Post'

class PerfilAjeno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: [],
            posts: [],
            error: '',
        }
    }

    componentDidMount() {
        db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
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

        db.collection('posts').where('creador', '==', this.props.route.params.email).onSnapshot(
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

    back() {
        this.props.navigation.navigate('Home')  
    }

    render() {
        console.log(this.state.usuario)

        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.button} onPress = {() => this.back()} >
                    <Text style={styles.buttonText}>Volver a Home</Text>
                </TouchableOpacity> 

            <View>

                {this.state.usuario.photo == '' ?
                    <Image
                        style={styles.profilePhoto} 
                        source={this.state.photo}
                        resizeMode = 'cover' 
                    />
                :
                <Text>Sin foto de perfil</Text>
                }


                <Text style={styles.userNameText}>{this.state.userName}</Text>
                <Text>Email: {this.state.email}</Text>
                <Text>Biografía: {this.state.bio}</Text>
            </View>


                    {/* {
                        this.state.usuario.foto != '' ?
                            <Image
                                source={{ uri: this.state.usuario.foto }}
                            />
                            :
                            <Image
                                source={require("")}
                            />

                    } */}
                    <View>

                    <Text>Cantidad de posteos: {this.state.posts.length} </Text>
                    <Text>Posteos recientes</Text>

                    {this.state.posts.length >= 1 ?
                        <FlatList 
                        data={this.state.posts}
                        keyExtractor={ onePost => onePost.id.toString()}
                        renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation} />}
                    />
                    :
                    <Text>Aún no hay publicaciones</Text>
                    }


                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
    profilePhoto:{
        height:200,
        width:200,
        borderRadius: 250,
        margin: 10,
        alignItems:'center'    
    }



});
export default PerfilAjeno;