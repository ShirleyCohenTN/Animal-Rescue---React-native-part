import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-elements'
import {CommonActions} from '@react-navigation/native';


export default class SuccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            //email: this.props.navigation.state.params.email, 
            //id_user: this.props.navigation.state.params.id_user 
            fullname: this.props.route.params.fullname
        }
            console.log('props --> ', props)
            //console.log("THE NEW USERs ID IS: " + this.state.id_user);
        
    }


    



    render() {
        return (
            // const {navigate} = this
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/catlay.jpg")}>
                    <Image style={styles.image} source={require("../images/catthumbsup.gif")}></Image>

                    <Text style={styles.txtStyle} >שלום, {this.state.fullname}!</Text>
                    <Text style={styles.txtStyle}>נרשמת בהצלחה!</Text>

                    <View style={{ marginTop: 250, width: "80%", alignSelf: 'center' }}>
                        <Button title="לחץ כאן למעבר לדף הבית" onPress={() => this.props.navigation.navigate('HomePage')} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#22B972", borderRadius: 35, borderColor: "black", borderWidth: 4 }} />
                    </View>

                    <Image style={styles.image} source={require("../images/like.png")}></Image>

                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        color: 'white'


    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    txtStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 0
    },
    image: {
        width: 120,
        height: 150,
        alignSelf: 'center', marginTop: 0, marginLeft: 12
    }
});