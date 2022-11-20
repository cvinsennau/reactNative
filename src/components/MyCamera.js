// cuando tenga esto lo exporto como camara
import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config'; //no es la base de datos, es un baul que tiene tu firebase donde se van a guardar todas mis fotos. dentro de lo que es firebase
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

class Camara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allow: false, //al principio la persona no te dio el permiso para usar la camara y sacar la foto
            showCamera: true, //al principio esta en true, listo muestro la camara
            url: ''//la url que se va a guardar la web de mi foto
        }

        this.metodosCamara = '' //es un estado que dejo vacio en donde voy a estar ejecutando la accion de capturar y donde voy a guardar la url temporal 
    }


    componentDidMount(){ //en el primer renderizado quiero que me pregunte si se puede activar la camara
        console.log(Camera, "Camera");
        Camera.requestCameraPermissionsAsync() // es un componente de react que tiene un metodo que me pide el request
            .then( () => this.setState({
                allow: true
            }))
            .catch( e => console.log(e))
    }

    captura() {
        this.metodosCamara.takePictureAsync() //al "this.metodosCamara"  le voy a  agregar el metoodo takePictureAsync, una vez que saco la foto le pido que me traiga la url de mi foto y me dje de mostrar la camara
            .then(foto => {
                this.setState({
                    url: foto.uri, // me trae el url de la foro y se la pasa al estado
                    showCamera: false
                })
            })
            .catch(e => console.log(e))
    }

    aceptar() {
        fetch(this.state.url)
            .then(res => res.blob())
            .then(img => {

                const refStorage = storage.ref(`photos/${Date.now()}.jpg`); //aca es donde se guarda en el storage
                refStorage.put(img) //pongo mi url adentro del firebase 
                    .then(() => {
                        refStorage.getDownloadURL() //que cada vez que yo quiera acceder a mi imagen yo pueda acceder 
                            .then(url => this.props.onImageUpload(url))//envias el dato de la url a mi posteo y lo guardo con los demas datos 
                    })
            })
            .catch(e => console.log(e))
    }

    guardar(){
        fetch(this.state.url)
         .then(res=>res.blob())
         .then(image =>{
           const refStorage=storage.ref(`photos/${Date.now()}.jpg`)
           refStorage.put(image)
                .then(()=>{
                   refStorage.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url);
                         })
                 })
         })
         .catch(e=>console.log(e))
    }

    rechazar() {
        this.setState({
            url: '',
            showCamera: true
        })
    }

    render() {
        return (
            <View>
                {
                    this.state.allow ?
                        this.state.showCamera ?
                            <View style={styles.cameraBody}>
                                <Camera
                                    style={styles.cameraBody}
                                    type={Camera.Constants.Type.back} //es la camara que va a aparecer que en este caso es la frontal
                                    ref={metodosCamara => this.metodosCamara = metodosCamara} //gracias al ref voy a saber cual es mi uri
                                />
                                <TouchableOpacity style={styles.button} onPress={() => this.captura()}>
                                    <Text>Sacar foto</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <Image
                                    style={styles.preview} // el preview de mi foto, puedo o aceptarla o cancelarla 
                                    source={{ uri: this.state.url }}
                                    resizeMode='cover'
                                />

                                <TouchableOpacity style={styles.button} onPress={() => this.guardar()}>
                                    <Text>Aceptar</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.button} onPress={() => this.cancelar()}>
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>
                            </View>

                        :
                        <Text>No hay permisos</Text>
                    //si no me dieron permiso para acceder a la camara
                }
            </View>
        )
    }

}
const styles = StyleSheet.create({
    cameraBody: {
        height: '80vh',
        width: '80vw',
    },
    button: {
        height: '20vh',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTo: 20
    },
    preview:
    {
        height: '80vh',
        width: '80vw',
    },
})


export default Camara;