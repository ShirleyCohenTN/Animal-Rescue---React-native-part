import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Linking, Platform, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Text } from 'native-base';

import _ from 'lodash';

import { FontAwesome5 } from '@expo/vector-icons'


let url = 'http://shirley.up2app.co.il/api/rescuers';



export default class Rescuers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rescuers: [],
            isLoading: true,


        };
    }





    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };


    componentDidMount = () => {

        this.getAllRescuers();

    }



    getAllRescuers = () => {
        fetch(url,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => {
                if (resp.status === 200) {
                    return resp.json();
                }
                else
                    return "could not get all the Rescuers!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the Rescuers!")) {
                    this.setState({ rescuers: data, isLoading: false });
                }
                else {
                    console.log('didnt inserted!');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }





    renderItem = ({ item }) => {

        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, marginTop: 10, }}>





                <View style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>
                    <Text style={styles.text}>

                        {item.Name_Rescuer}
                        {/* {item.Phone_Number} */}
                    </Text>

                </View>

                <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => this.dialCall(item.Phone_Number)}>
                    <Image style={styles.image} source={require("../images/phone.png")} />
                    <Text style={styles.textPhone}>התקשר</Text>
                </TouchableOpacity>


            </View >
        )

    }






    rendnerSeparator = () => {
        return (
            // <View style={{ height: 1, width: '100%', backgroundColor: 'lightblue' }}>
            <View>
                <Image style={styles.imageLine} source={require("../images/line3.png")} />

            </View>
        )
    }







    render() {
        return (


            this.state.isLoading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="primary" animating />
                </View>
                :


                <View style={styles.container}>
                    <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/bb.jpg")}>
                        {this.componentDidMount()}







                        <View >
                            <TouchableOpacity style={{ alignItems: "flex-start", margin: 18, marginTop: 20 }}
                                onPress={() => this.props.navigation.openDrawer()}>
                                <FontAwesome5 name="bars" size={30} color="#161924" />
                                <Text style={{ alignItems: "flex-start", margin: 1, fontSize: 8, fontWeight: "bold" }}>תפריט</Text>

                            </TouchableOpacity>
                        </View>

                        <View>
                            {/* <Image style={styles.image1} source={require("../images/rr.png")} /> */}
                            <Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", color: "black", marginBottom:50 }}>מחלצים</Text>

                        </View>





                        <FlatList
                            data={this.state.rescuers}
                            renderItem={(this.renderItem)}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.rendnerSeparator}
                            ListEmptyComponent={this.renderFooter}
                        />



                        <Button buttonStyle={{ backgroundColor: "#61BF68", borderWidth: 2, borderColor: "black", borderRadius: 10, }}
                            onPress={() => Linking.openURL('mailto:ShirleyCohenNT@gmail.com?subject=בקשה להוספת מחלץ לאפליקציה&body=אנא מלא את הפרטים הבאים: שם המחלץ, מספר הטלפון, ומהיכן ההיכרות.')}
                            title="מכיר/ה מחלץ נוסף? לחץ כאן לשליחת פרטים" />
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
        alignSelf: 'center', alignItems: 'flex-end',
        alignContent: 'center',
        flexDirection: 'row',



    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 100,
    },
    image1: {
        width: 190,
        height: 190,
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12
    },
    imageDelete: {
        width: 30,
        height: 30,
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        // textAlign:"center"

    },
    text1: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
    },
    textPhone: {
        fontWeight: 'bold',
        color: 'green',
        fontSize: 13,
        marginRight: 100
    },
    imageLine: {
        width: "100%",
        height: 40,
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    }
});