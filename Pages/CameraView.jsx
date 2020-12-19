import React from 'react';
import { StyleSheet, Text, BackHandler, Dimensions, TextInput, View, ImageBackground, KeyboardAvoidingView, Image, TouchableOpacity, SafeAreaView, Alert, Vibration } from 'react-native';
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


import { FontAwesome5 } from '@expo/vector-icons'



export default class CameraView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            photoUri2: '',
            image: '',
            photoUri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
            uplodaedPicUri: { uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }
        }
    }



    componentDidMount() {
        this.askCameraPermissions();
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
      }



    async askCameraPermissions() {
        console.log('ask')
        const { status } = await Camera.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    }


    btnOpenGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            //allowsEditing: true,
            //aspect: [4, 3],
        });

        //console.log(result);

        if (!result.cancelled) {
            const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });

            await this.setState({ image: result.uri, photoUri: base64 });
            this.props.navigation.navigate('Posts', { 'photoUri': this.state.photoUri });
            //it doesnt show the change, only in delay

        }
    };


    btnSnap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ quality: 0.2, base64: true });

            await this.setState({ photoUri: photo.base64, photoUri2: photo });
            Vibration.vibrate();

            this.props.navigation.navigate('Posts', { 'photoUri': this.state.photoUri });
        }
    };

    backAction = () => {
       //this.props.navigation.navigate('Nav', {screen:'HomePage'})
      };



    render() {

        let { image } = this.state;


        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>

                    <View style={styles.Content}>
                        <View style={{ alignItems: 'center' }}>
                            {/* <View style={{
                                // flex:1,
                                height: '80%', width: 200, margin: 10,
                                justifyContent: 'center', borderColor: 'black', borderWidth: 1
                            }}> */}
                            <Camera
                                ref={ref => { this.camera = ref; }}
                                style={{ flex: 1, height: "100%", width: 500 }}
                                type={this.state.type}


                            >
                                <View
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                    }}>
                                    <TouchableOpacity
                                      style={styles.iconDesign}
                                        onPress={() => {
                                            this.setState({
                                                type: this.state.type === Camera.Constants.Type.back
                                                    ? Camera.Constants.Type.front
                                                    : Camera.Constants.Type.back,
                                            });
                                        }}>

                                        <View>
                                            <FontAwesome5 name="exchange-alt" size={30} color="white" />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.iconDesign}
                                     onPress={this.btnSnap}>
                                        <View>
                                            {/* <Text>צלם תמונה</Text> */}
                                            <FontAwesome5 name="camera" size={30} color="white" />
                                        </View>
                                    </TouchableOpacity>



                                    <TouchableOpacity style={styles.iconDesign} 
                                    onPress={this.btnOpenGalery}>
                                        {/* <Text>בחר תמונה מהגלריה</Text> */}
                                        <FontAwesome5 name="images" size={30} color="white" />
                                    </TouchableOpacity>



                                </View>


                            </Camera>
                            {/* </View> */}



                        </View>



                    </View>
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#435CAE",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40
    },
    Header: {
        flex: 2
    },
    Content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    textBig: {
        fontSize: 35,
        color: 'red',
        margin: 10
    },
    textMedium: {
        fontSize: 30,
        color: 'blue'
    },
    textSmall: {
        fontSize: 17,
        color: 'rgb(100,150,250)',
        margin: 5
    },
    Button: {
        backgroundColor: 'lightgray',
        padding: 20,
        borderRadius: 15
    },
    TxtInp: {
        height: 50,
        width: 200,
        borderColor: 'gray',
        borderWidth: 2,
        margin: 15,
        fontSize: 30,
        padding: 5,
        borderRadius: 5
    },
    Err: {
        color: 'red',
        margin: 15,

    },
    lblText: {
        fontSize: 30
    }
    ,
    placeHolder: {
        flex: 1,
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
        margin: 10
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image: {
        flex: 1,
        width: 200
    },
    iconDesign: {
        flex: 0.4,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom: 10
    }
}); 