import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Linking, Platform, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Text } from 'native-base';

import VegaScrollList from 'react-native-vega-scroll-list';


import _ from 'lodash';

import { FontAwesome5 } from '@expo/vector-icons'

import exampleImage from '../images/camera2.jpg'


let url = 'http://shirley.up2app.co.il/api/farms';



export default class Farms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            farms: [],
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

        this.getAllFarms();

    }



    getAllFarms = () => {
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
                    return "could not get all the Farms!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the Farms!")) {
                    this.setState({ farms: data, isLoading: false });
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

            <View>

                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 0, marginTop: 5, width:"55%", alignSelf:"center", }}>


                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#FFD7FF", borderWidth:2 , borderBottomWidth:0,}}>

                        <View >
                            {
                                item.Farm_Photo == '' ?
                                    <Image style={styles.imageUp} source={require('../images/cat3.jpg')} /> :
                                    <Image style={styles.imageUp} source={{ uri: item.Farm_Photo }} />
                            }
                        </View>


                        <Text style={styles.textKoteret}>

                            {item.Farm_Name}

                        </Text>

                        <Text style={styles.text1}> {item.Farm_Address}</Text>

                    </View>


                </View>


                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5, marginTop: 0, backgroundColor:"#FFD7FF", width:"55%", alignSelf:"center", borderWidth:2, borderTopWidth:0  }}>


                    <View style={{ flex: 1, justifyContent: 'center', marginRight: 20,  }}>

                        <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => Linking.openURL(item.Website_Link)}>
                            <Image style={styles.image} source={require("../images/fb.png")} />
                            <Text style={styles.textFB}>לחץ כאן </Text>
                        </TouchableOpacity>



                        <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => this.dialCall(item.Phone_Number)}>
                            <Image style={styles.image} source={require("../images/phone.png")} />
                            <Text style={styles.textPhone}>התקשר לחווה </Text>

                        </TouchableOpacity>
                    </View>





                </View >


            </View>
        )

    }






    rendnerSeparator = () => {
        return (
            // <View style={{ height: 2, width: '80%', backgroundColor: 'gray',  }}>
            <View>
                <Image style={styles.imageLine} source={require("../images/line1.png")} />

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
                    <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/bb1.jpg")}>
                        {this.componentDidMount()}







                        <View >
                            <TouchableOpacity style={{ alignItems: "flex-start", margin: 18, marginTop: 20 }}
                                onPress={() => this.props.navigation.openDrawer()}>
                                <FontAwesome5 name="bars" size={30} color="#161924" />
                                <Text style={{ alignItems: "flex-start", margin: 1, fontSize: 8, fontWeight: "bold" }}>תפריט</Text>

                            </TouchableOpacity>
                        </View>

                        {/* <View>
                            <Image style={styles.image1} source={require("../images/farm1.png")} />

                        </View> */}





                        <FlatList
                            data={this.state.farms}
                            renderItem={(this.renderItem)}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.rendnerSeparator}
                            ListEmptyComponent={this.renderFooter}
                        />




                        {/* <Button onPress={() => Linking.openURL('mailto:ShirleyCohenNT@gmail.com?subject=בקשה להוספת מחלץ לאפליקציה&body=אנא מלא את הפרטים הבאים: שם המחלץ, מספר הטלפון, ומהיכן ההיכרות.')}
                            title="מכיר/ה מחלץ נוסף? לחץ כאן לשליחת פרטים" /> */}


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
        alignSelf: 'center', marginTop: 25, alignItems: "center"
    },
    imageUp: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderColor: "black",
        borderWidth: 2
    },
    imageLine: {
        width: "100%",
        height: 110,
    },
    image1: {
        width: "100%",
        height: 150,
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


    },
    textFB: {
        fontWeight: 'bold',
        color: '#4267B2',
        fontSize: 16,
    },
    textPhone: {
        fontWeight: 'bold',
        color: 'green',
        fontSize: 16,
    },
    textKoteret: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 24
    },
    text1: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    }
});