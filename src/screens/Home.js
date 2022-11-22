import React, { Component } from 'react';
import { db } from '../firebase/config';
import { Text, View, FlatList, StyleSheet } from 'react-native';
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
                    console.log(doc.data(), "doc");
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })                    
                })

                this.setState({ //tengo un array con todos los posteos y cada uno de esos posteos es un objeto literal 
                    post: posts //al estado inicial de post (era una arrya vacio) le traje todos los posteos
                })


            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Be Fake.</Text>
                    
                        <FlatList style={styles.list}
                        // ref= "flatList"
                        // onContentSizeChange={()=> this.ref.flatList.scrollToEnd()} 
                        data={this.state.post}
                         keyExtractor={onePost => onePost.id.toString()} //es como el api key del posteo
                        renderItem={({ item }) => <Post navigation={this.props.navigation} postData={item} id={item.id} />} 

                         />

            </View>

        )
    }
}

export default Home;


const styles = StyleSheet.create({
    container:{
        overflow: "scroll",
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
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
      },
})
