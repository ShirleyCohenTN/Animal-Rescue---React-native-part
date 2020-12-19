import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Linking, Platform, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Text } from 'native-base';

import { FloatingAction } from 'react-native-floating-action';



import _ from 'lodash';

import { FontAwesome5 } from '@expo/vector-icons'


let url = 'http://shirley.up2app.co.il/api/fosters';



export default class Fosters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fosters: [],
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
            this.getAllFosters();
        }
        else {
            this.getAllFostersByCity(this.state.CityText);
        }

    }




    getAllFostersByCity = (City) => {
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
                    return "could not get all the Fosters!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the Fosters!")) {
                    this.setState({ fosters: data, isLoading: false });
                }
                else {
                    console.log('didnt inserted!');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }



    getAllFosters = () => {
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
                    return "could not get all the Fosters!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the Fosters!")) {
                    this.setState({ fosters: data, isLoading: false });
                }
                else {
                    console.log('didnt inserted!');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }





    btnInfo = (item) => {
        Alert.alert(`${item.First_Name} ${item.Last_Name}`, " עיר: " + `${item.City}` + "."
            + `\n` + "מספר טלפון: " + `${item.Phone_Number}`
            + `\n`
            + `\n` + " פרטים על האומנה :  " + `\n` + `${item.Info}`,
            [{ text: "אישור" },
            ]);
    }






    renderItem = ({ item }) => {

        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, marginTop: 10 }}>


                <View style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>
                    <Text style={styles.text1}>
                        {item.City}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => this.dialCall(item.Phone_Number)}>
                    <Image style={styles.image} source={require("../images/phone1.png")} />
                </TouchableOpacity>


                <TouchableOpacity onPress={() => this.btnInfo(item)}>
                    <Image style={styles.image} source={require("../images/details2png.png")} />
                </TouchableOpacity>


                <View style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>

                    <Text style={styles.text}>
                        {item.First_Name} {item.Last_Name}
                        {/* {item.Phone_Number} */}
                    </Text>



                </View >

            </View >
        )

    }






    rendnerSeparator = () => {
        return (
            <View style={{ height: 4, width: '100%', backgroundColor: 'lightblue' }}>

            </View>
        )
    }







    render() {
        const actions = [
            // {
            //     text: 'Accessibility',
            //     icon: require('../images/details2png.png'),
            //     name: 'bt_accessibility',
            //     position: 2
            // },
            {
                text: 'רישום אומנה',
                icon: require('../images/pen.png'),
                name: 'bt_AddFoster',
                position: 1,
                textColor: "black",
                color: "#33CD9A",
                textBackground: "white",

            },

        ];
        return (



            this.state.isLoading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="primary" animating />
                </View>
                :


                <View style={styles.container}>
                    <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/bb.jpg")}>
                        {this.componentDidMount()}


                        <View>
                            <Header searchBar rounded>
                                <Item>
                                    <Icon name="ios-search" />
                                    <Input placeholder="חפש אומנה לפי עיר"
                                        onChangeText={(text) => { this.txtchgCity(text) }} />
                                </Item>
                            </Header>
                        </View>




                        <View >
                            <TouchableOpacity style={{ alignItems: "flex-start", margin: 18, marginTop: 20 }}
                                onPress={() => this.props.navigation.openDrawer()}>
                                <FontAwesome5 name="bars" size={30} color="#161924" />
                                <Text style={{ alignItems: "flex-start", margin: 1, fontSize: 8, fontWeight: "bold" }}>תפריט</Text>

                            </TouchableOpacity>
                        </View>

                        <View>
                            <Image style={styles.image1} source={require("../images/pplhelp.png")} />

                        </View>





                        <FlatList
                            data={this.state.fosters}
                            renderItem={(this.renderItem)}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.rendnerSeparator}
                            ListEmptyComponent={this.renderFooter}
                        />



                        <FloatingAction navigation={this.props.navigation}
                            actions={actions}
                            onPressItem={

                                () => { this.props.navigation.navigate("FostersRishum") }
                            }
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
        width: 40,
        height: 40,
        alignSelf: 'center', marginTop: 0, marginLeft: 12, marginRight: 12
    },
    image1: {
        width: "100%",
        height: 190,
        alignSelf: 'center', marginLeft: 12, marginRight: 12, borderWidth:2, borderColor:"black"
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
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});