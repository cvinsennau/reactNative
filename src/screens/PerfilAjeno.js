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
                
                <Text style={styles.title}>Be Fake.</Text>

                <TouchableOpacity style={styles.button} onPress = {() => this.back()} >
                    <Text style={styles.buttonText}>Volver a Home</Text>
                </TouchableOpacity> 

                <View style={styles.subContainer}>
                    {this.state.usuario.photo == '' ?
                        <Image
                            style={styles.profilePhoto} 
                            source={this.state.photo}
                            resizeMode = 'cover' 
                        />
                    :
                        <Image
                            style={styles.profilePhoto} 
                            source={require('../../assets/SinFotoDePerfil.png')}
                            resizeMode = 'cover' 
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
        overflow: "scroll",
        padding: 10,
        flex: 1
    },
    subContainer:{
        alignItems: 'center'
    },
    userNameText: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profilePhoto:{
        height:200,
        width:200,
        borderRadius: 250,
        margin: 10,
        alignItems:'center'    
    },
    text:{
        fontSize: 16,
        margin: 6,
    },
    button:{
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
    buttonText:{
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
        backgroundColor:"#E6E6E6",
        flex:1,
      }

});
export default PerfilAjeno;