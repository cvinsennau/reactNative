import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Button, Keyboard } from 'react-native'
import { db, auth } from '../firebase/config';
import { Feather, Entypo } from "@expo/vector-icons";

class Search extends Component {
    constructor() {
        super();
        this.init = true; // Señal para el mensaje de Busqueda vacía
        this.state = {
            searchPhrase: "",
            clicked: false,
            AllUsers: [],
            resultsOfSearch: [],
        }
    }

    componentDidMount() {
        db.collection("users").onSnapshot(
            docs => {
                console.log(docs, "docs");
                let _usuarios = []
                docs.forEach(doc => {
                    _usuarios.push({
                        id: doc.id,
                        data: doc.data() // data es una función
                    })
                })
                this.setState({
                    AllUsers: _usuarios
                })

            }
        )
    }

    // Filtering By Name

    filtering(userNameSearched) {
        this.init = false;
        let filtered = this.state.AllUsers.filter((user) => user.data.userName.toLowerCase().includes(userNameSearched.toLowerCase()))
        console.log(filtered, "filtrado");
        this.setState({
            resultsOfSearch: filtered, // resultsOfSearch = AllUsers filtrados

        })
    }

    GoToProfile(item) {
        if (item.data.owner === auth.currentUser.email) {
            this.props.navigation.navigate("Profile")
        } else {
            this.props.navigation.navigate('PerfilAjeno', { email: item.data.owner })
        }
    }

    setClicked(value) {
        this.setState({ clicked: value })
    }

    setSearchPhrase(value) {

        this.setState({ searchPhrase: value });
        if (value === "")
            this.setState({ resultsOfSearch:[] });
        else
            this.filtering(value);

    }



    render() {

        return (


            <View style={styles.container}>
                <Text style={styles.title}> Search in Be Fake.</Text>

                <View style={this.state.clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>

                    {/* search Icon */}
                    <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />

                    {/* Input field */}
                    <TextInput style={styles.input} placeholder="Search" value={this.state.searchPhrase} onChangeText={(ev) => this.setSearchPhrase(ev)} onFocus={() => { this.setClicked(true); }} />

                    {/* cross Icon, depending on whether the search bar is clicked or not */}
                    {this.state.clicked && (<Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => { this.setSearchPhrase("") }} />)}

                </View>

                {/* cancel button, depending on whether the search bar is clicked or not */}
                {this.state.clicked && (<View> <Button style={styles.Button} title="Cancel" onPress={() => { Keyboard.dismiss(); this.setClicked(false); }}></Button> </View>)}

                <View>
                    {
                        this.state.resultsOfSearch.length === 0 && !this.init ?
                            <Text> Busqueda vacia </Text>
                            :
                            <FlatList style={styles.list}
                                data={this.state.resultsOfSearch}
                                keyExtractor={oneUser => oneUser.id.toString()}
                                renderItem={({ item }) => <Text onPress={() => this.GoToProfile(item)} > Username: {item.data.userName} </Text>}
                            />
                    }
                </View>
            </View>

        );
    }
}

export default Search;

// Styles
const styles = StyleSheet.create({


    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",

        width: "90%",

    },
    title: {
        fontSize: 46,
        fontWeight: 'bold',
        marginTop: 20,
        margin: 10,
        color: 'black'
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black'

    },
    list: {
        paddingHorizontal: 17,
        backgroundColor:"#E6E6E6",
        flex:1,
      },


});