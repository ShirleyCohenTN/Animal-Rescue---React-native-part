import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Linking, Platform, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Text } from 'native-base';

import _ from 'lodash';

import { FontAwesome5 } from '@expo/vector-icons'


let url = 'http://shirley.up2app.co.il/api/veterinarians';

let url1 = 'http://shirley.up2app.co.il';


export default class veterinarians extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            veterinarians: [],
            isLoading: true,
            CityText: ""

        };
    }


    txtchgCity = (CityText) => {
        this.setState({ CityText });
        console.log(this.state.CityText);

    }


    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };


    componentDidMount = () => {
        if (this.state.CityText == "") {
            this.getAllVeterinarians();
        }
        else {
            this.getAllVeterinariansByCity(this.state.CityText);
        }

    }




    getAllVeterinariansByCity = (City) => {
        fetch(url + `?city=${City}`,
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
                    return "could not get all the Veterinarians!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the Veterinarians!")) {
                    this.setState({ veterinarians: data, isLoading: false });
                }
                else {
                    console.log('didnt inserted!');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }



    getAllVeterinarians = () => {
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
                    return "could not get all the Veterinarians!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the Veterinarians!")) {
                    this.setState({ veterinarians: data, isLoading: false });
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
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, marginTop: 10 }}>


                <View style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>
                    <Text style={styles.text1}>
                        {item.City}
                    </Text>
                </View>


                <View style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>
                    <Text style={styles.text}>

                        {item.Name_Veterinarian}
                        {/* {item.Phone_Number} */}
                    </Text>

                </View>

                <TouchableOpacity onPress={() => this.dialCall(item.Phone_Number)}>
                    <Image style={styles.image} source={require("../images/phone.png")} />
                    <Text style={styles.textPhone}>התקשר</Text>
                </TouchableOpacity>


            </View >
        )

    }






    rendnerSeparator = () => {
        return (
            <View style={{ height: 1, width: '100%', backgroundColor: 'lightblue' }}>

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


                        <View>
                            <Header searchBar rounded style={{ backgroundColor: "#26B368" }}>
                                <Item style={{ backgroundColor: "white", borderRadius: 10 }}>
                                    <Icon name="ios-search" />
                                    <Input placeholder="חפש וטרינר לפי עיר"
                                        onChangeText={(text) => { this.txtchgCity(text) }}
                                    />
                                </Item>
                            </Header>
                        </View>




                        <View >
                            <TouchableOpacity style={{ alignItems: "flex-start", marginLeft: 18, marginTop: 20 }}
                                onPress={() => this.props.navigation.openDrawer()}>
                                <FontAwesome5 name="bars" size={30} color="#161924" />
                                <Text style={{ alignItems: "flex-start", margin: 1, fontSize: 8, fontWeight: "bold" }}>תפריט</Text>

                            </TouchableOpacity>
                        </View>

                        <View>
                            <Image style={styles.image1} source={require("../images/vet11.png")} />

                        </View>





                        <FlatList
                            data={this.state.veterinarians}
                            renderItem={(this.renderItem)}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.rendnerSeparator}
                            ListEmptyComponent={this.renderFooter}
                        />
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
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12
    },
    image1: {
        width: "60%",
        height: 250,
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12,
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
    text1: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
    },
    textPhone: {
        fontWeight: 'bold',
        color: 'green',
        fontSize: 13,
        marginRight: 10
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    }
});