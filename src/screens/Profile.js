import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            email: auth.currentUser.email,
            bio: '',
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
                        bio: data.bio
                    });
                });
            });
    };

    //Logout
    logout() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate('Login')
            })
    }


    // editProfileData(){
    //     db.collection("users")
    //     .doc()
    //     .update({
    //         userName: userName,
    //         bio: bio
    //     })
    // }


    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Text>{this.state.photo}</Text>
                    <Text style={styles.title}>Mi Perfil</Text>
                    <Text>{this.state.userName}</Text>
                    <Text>{this.state.email}</Text>
                    <Text>{this.state.bio}</Text>
                    <Text>{this.state.photo}</Text>

                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>Posteos recientes</Text>
                    {/* No se si funciona todavía */}
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={onePost => onePost.id.toString()}
                        renderItem={({ item }) => <Post postData={item} />}
                    />
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1
    },
    title: {
        fontSize: 20,
        margin: 10
    }
})

export default Profile;