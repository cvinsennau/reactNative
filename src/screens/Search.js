import React, {Component} from "react" ;
import {Text, View, StyleSheet, TextInput, FlatList } from 'react-native'
import { db, auth } from '../firebase/config';

class Search extends Component {
    constructor(){
        super();
        this.init = true; // Señal para el mensaje de Busqueda vacía
        this.state = {
            input:"",
            AllUsers:[],
            resultsOfSearch:[],
        }
    }

    componentDidMount(){
        db.collection("users").onSnapshot(
            docs => {
                console.log(docs, "docs");
                let _usuarios = []
                docs.forEach (doc => {
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

    filtering(userNameSearched){
        this.init = false;
        let filtered = this.state.AllUsers.filter((user) => user.data.userName.toLowerCase().includes(userNameSearched.toLowerCase()))
        this.setState({
            resultsOfSearch: filtered, // resultsOfSearch = AllUsers filtrados
            input: userNameSearched
        })
    }

    GoToProfile(item){
        if (item.data.owner === auth.currentUser.email) {
            this.props.navigation.navigate('MyProfile')
        } else {
            this.props.navigation.navigate('Profile', { email: item.data.owner })
        }
    }     

    render(){
        return(
            <View style={styles.container} >                
                <View >
                    <TextInput style={styles.input} 
                            placeholder= 'Busca un Usuario'
                            keyboardType= 'default'
                            onChangeText= {claveBusqueda => this.filtering(claveBusqueda)}
                            value = {this.state.input}
                            
                    />
                    
                </View>

                {
                    this.state.resultsOfSearch.length === 0 && !this.init ?
                        <Text >Busqueda vacia</Text>
                    :
                    <FlatList
                            data={this.state.resultsOfSearch}
                            keyExtractor = { oneUser => oneUser.id.toString()}
                            renderItem = {({ item }) => <Text onPress={() => this.GoToProfile(item)} > {item.data.userName}</Text>}
                    />
                }
            </View>

        )
    }
}

export default Search;

// Styles
const styles = StyleSheet.create({

    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
      },

input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },

});