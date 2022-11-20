import React, { Component } from 'react';
import { db } from '../firebase/config';
import { Text, View, FlatList } from 'react-native';
import Post from '../components/Post';


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: [],
        }
    }
    //Me traigo los posteo de la db 
    componentDidMount() {
        
        db.collection('posts').onSnapshot( //es un metodo que tengo de firebase que me recupera todos los registros de una coleccion 
            docs => {//todos los posteos 
                //console.log(docs);
                let posts = [];
                docs.forEach(doc => {// por cada uno de los posteos pusheame el id y la data como objeto literal 
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({ //tengo un array con todos los posteos y cada uno de esos posteos es un objeto literal 
                        post: posts //al estado inicial de post (era una arrya vacio) le traje todos los posteos
                    })
                })

            }
        )
    }

    render() {
        return (
            <View>
                <Text> Home </Text>

                <Text> Lista de posteos </Text>
                <FlatList //se escrolee
                    data={this.state.post}
                    keyExtractor={onePost => onePost.id.toString()} //es como el api key del posteo
                    renderItem={({ item }) => <Post postData={item} />}
                />

            </View>

        )
    }
}

export default Home;