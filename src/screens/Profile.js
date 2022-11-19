import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            email: auth.currentUser.email,
            bio: '',
            photo:'',
            posteos: []
        }
    }


    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                docs.forEach((doc) => {
                    const data = doc.data();
                    this.setState({
                        userName: data.userName,
                        bio: data.bio,
                    });
                });
            });

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let posteos = [];
                docs.forEach( doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                    posteos: posts,
                    loading: false,
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
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('EliminarPerfil')
            })
    }


    render() {
        console.log(auth.currentUser.email)
        
        return (

            <ScrollView style={styles.scroll}>
         
                <View style={styles.container}>

                    <Text style={styles.userNameText}>{this.state.userName}</Text>
                    <Text>{this.state.email}</Text>
                    <Text>{this.state.bio}</Text>

                    
                    
                </View>
                
                <Text>Cantidad de posteos: {this.state.posteos.length} </Text>

                <View>
                    <Text>Posteos recientes</Text>
                    {/* No se si funciona todavía */}
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={onePost => onePost.id.toString()}
                        renderItem={({ item }) => <Post postData={item} />}
                    />

            </View>
                    {/* <TouchableOpacity onPress = {() => this.updateData()}>
                       <Text>Editar</Text> 
                    </TouchableOpacity>
 */}
                    <TouchableOpacity onPress = {() => this.eliminarPerfil(this.state.email)} >
                        <Text >Borrar perfil</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>

            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
      },
    container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginTop: 45,
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
    }
})

export default Profile;