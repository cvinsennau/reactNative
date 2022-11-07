import React, { Component } from 'react';
import {db} from '../firebase/config';
import {Text, View, FlatList} from 'react-native';
//import Post from '../components/Post';



class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            post: [],
        }
    }

    //Esto no se que tan bien esta. Es del repo de Ale V
    componentDidMount(){
        db.collection('posts').where('owner','==','ale@dh.com').limit(2).onSnapshot(
            docs => {
                //console.log(docs);
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts
                    })
                })
                
            }
        )
    }

    render(){
        return(
            <View>
                <Text> Home </Text>

                <Text> Lista de posteos </Text>
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={ onePost => onePost.id.toString()}
                    renderItem={ ({item}) => <Post postData={item} />}
                />        

            </View>

        )
    }
}

export default Home;