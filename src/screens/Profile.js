import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Post from '../components/Post'

import { MaterialIcons } from '@expo/vector-icons';

class Profile extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            userName: '',
            email: "",
            bio: '',
            photo:'',
            posts: []
        }
    }


    componentDidMount() {

        console.log(auth.currentUser.email, "usuario");

        this.setState({email: auth.currentUser.email});

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
            docs =>{
                let posts = [];
                docs.forEach( doc => {
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

    
    //Editar data del perfil
    // updateData(){
    //     db.collection('users').where('owner', '==', auth.currentUser.email)
    //     .doc(key)
    //     .update({
    //         userName: userName,
    //         bio: bio,
    //     })
    //     .then(() => {
    //         this.props.navigation.navigate('Profile')
    //     })
    // }

    

    //Logout
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

                <TouchableOpacity style={styles.button} onPress = {() => this.back()} >
                    <Text style={styles.buttonText}>Volver a Home</Text>
                </TouchableOpacity> 

            <View>

                {this.state.photo != '' ?
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

            <View>
                {/* <TouchableOpacity onPress = {() => this.updateData()}>
                       <Text>Editar</Text> 
                    </TouchableOpacity>
                */}
                <TouchableOpacity style={styles.button} onPress = {() => this.eliminarPerfil(this.state.email)} >
                    <Text style={styles.buttonText}>Borrar perfil</Text>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text style={styles.buttonText}><MaterialIcons name="logout" size={16} color="black" /> Logout</Text>
                </TouchableOpacity>
            </View>
                    
        </View>
            
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginTop: 45,
        flex: 1,
    },
    title: {
        fontSize: 20,
        margin: 10
    },
    userNameText:{
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profilePhoto: {
        height:200,
        width:200,
        borderRadius: 250,
        margin: 10,
        alignItems:'center'    
    },
    button:{
        backgroundColor: "grey",
        borderRadius: 10,
        margin: 5,
    }, 
    buttonText:{
        fontSize: 16,
        color: "#fff",
        alignSelf: "center",
    }
})

export default Profile;