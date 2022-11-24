import React, { Component } from 'react';
import { Camera } from 'expo-camera'; //para crear el componente 
import { storage } from '../firebase/config'; //no es la base de datos, es un baul que tiene tu firebase donde se van a guardar todas mis fotos. dentro de lo que es firebase
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

class Camara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allow: false, //al principio la persona no te dio el permiso para usar la camara y sacar la foto
            showCamera: true, //al principio esta en true, listo muestro la camara
            url: ''//la url que se va a guardar la web de mi foto, la url dentro de mi dispositivo
        }

        this.metodosCamara = '' //es un estado que dejo vacio en donde voy a estar ejecutando la accion de capturar y donde voy a guardar la url temporal 
    }


    componentDidMount(){ //en el primer renderizado quiero que me pregunte si se puede activar la camara
            Camera.requestCameraPermissionsAsync() // es un componente de react que tiene un metodo que me pide el request
            .then( () => this.setState({
                allow: true // lo convertimos en un estado booleano 
            }))
           
    }

    captura() { //para capturar creamos el metodo capturar 
        this.metodosCamara.takePictureAsync() //al "this.metodosCamara"  le voy a  agregar el metoodo takePictureAsync, una vez que saco la foto le pido que me traiga la url de mi foto y me dje de mostrar la camara
            .then(foto => {
                this.setState({
                    url: foto.uri, // me trae el url de la foro y se la pasa al estado, es una url temporal interna de la foto 
                    showCamera: false
                })
            })
    }

    aceptar() {
        fetch(this.state.url) // utilice fetch para obtener la foto desde la ubicacion temporal dentro del dispositivo
            .then(res => res.blob()) //para interpretar la imagen, procesa la foto 
            .then(img => {
                const refStorage = storage.ref(`photos/${Date.now()}.jpg`); //aca es donde se guarda en el storage
                refStorage.put(img) //pongo mi url adentro del firebase 
                    .then(() => { // una vez guardada en firebase, que sea de publico acceso 
                        refStorage.getDownloadURL() //que cada vez que yo quiera acceder a mi imagen yo pueda acceder 
                            .then(url => this.props.onImageUpload(url))//envias el dato de la url a mi posteo y lo guardo con los demas datos 
                    })// aca me la sube al feed 
            })
    }

    rechazar() {
        this.setState({
            url: '', //la url vuelve a estar vacia 
            showCamera: true
        })
    }

    render() {
        return ( //view funciona como contenedor 
            <View> 
                {this.state.allow ?
                 this.state.showCamera ?
                            <View style={styles.cameraBody}>
                                <Camera
                                    style={styles.cameraBody} //tenemos que setear el estilo para que se vean bien los botones 
                                    type={Camera.Constants.Type.back} //es la camara que va a aparecer que en este caso es la frontal
                                    ref={metodosCamara => this.metodosCamara = metodosCamara} //gracias al ref voy a saber cual es mi uri
                                /> 
                                <TouchableOpacity style={styles.button} onPress={() => this.captura()}> 
                                    <Text style={styles.buttonText} >Sacar foto</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <Image
                                    style={styles.preview} // el preview de mi foto, puedo o aceptarla o cancelarla 
                                    source={{ uri: this.state.url }}
                                    resizeMode='cover'
                                />

                                <TouchableOpacity style={styles.button} onPress={() => this.aceptar()}>
                                    <Text style={styles.buttonText}>Aceptar</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.button} onPress={() => this.rechazar()}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
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
        height: '60vh',
        width: '60vw',
    },

    button:{
        borderRadius: 12,
        margin: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: 'light blue',
        elevation: 3, 
    }, 
    buttonText:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.20,
        color: 'black',
    },
    preview:
    {
        height: '60vh',
        width: '60vw',
    },
})


export default Camara;