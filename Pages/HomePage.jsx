import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, Linking, Alert, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import { FloatingAction } from 'react-native-floating-action';
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header, DeckSwiper, Card, Item, Input, CardItem, Thumbnail, Left, Body, Icon, Right } from 'native-base';
import { CommonActions } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons'

import App from '../App'


let url = 'http://shirley.up2app.co.il/api/posts';


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            CityText: ""
        };
        // this.resetStack();
    }

    // componentDidUpdate(){
    //     console.log('in update')
    //     this.resetStack();
    // }


    resetStack = () => {
        console.log('in reset');
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'WelcomePage' }
                ],
            })
        );

    }

    componentDidMount = () => {
        //this.resetStack();


        if (this.state.CityText == "") {
            this.getAllPosts();
        }
        else {
            this.getAllPostsByCity(this.state.CityText);
        }

    }


    txtchgCity = (CityText) => {
        this.setState({ CityText });
        console.log(this.state.CityText);

    }


    getAllPosts = () => {
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
                    return "could not get all the Posts!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the Posts!")) {
                    this.setState({ posts: data, isLoading: false });
                }
                else {
                    console.log('didnt inserted!');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }




    getAllPostsByCity = (City) => {
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
                    return "could not get all the Posts!";
            }
            ) // Transform the data into json
            .then((data) => {
                if (!data.toString().includes("could not get all the Posts!")) {
                    this.setState({ posts: data, isLoading: false });
                }
                else {
                    console.log('didnt inserted!');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }





    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };


    btnInfo = (item) => {
        Alert.alert("", "סוג חיה: " + `${item.Animal_Type}`
            + `\n`

            + `\n` + "עיר: " + `${item.City}` + "."
            + `\n`

            + `\n` + "כתובת מדויקת: " + `${item.Animal_Address}` + "."
            + `\n`

            + `\n` + "טלפון ליצירת קשר: " + `${item.Phone_Number}`
            + `\n`
            + `\n` + "סטטוס: " + `${item.Post_Status}`
            + `\n`
            + `\n` + "תיאור הדיווח :  " + `${item.Animal_Case}`
            + `\n`
            + `\n` + "עודכן לאחרונה בתאריך: " + `${item.Post_Date}`
            + `\n`,
            [{ text: "אישור" },
            ]);
    }



    renderItem = ({ item }) => {

        return (
            <Card style={{ marginBottom: 50, backgroundColor: "#FCFFE2", borderRadius: 60, borderColor: 'black', }}>
                <View style={{
                    flex: 1, marginBottom: 20, marginTop: 10,
                    //  flexDirection: 'row'
                }}>


                    <View >
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 25, color: "#6666CC" }}>{item.Animal_Type}</Text>
                    </View>


                    <View style={{ flex: 1, marginTop: 10 }}>

                        <View >
                            {
                                item.Animal_Photo == '' ?
                                    <Image style={styles.image2} source={require('../images/cat3.jpg')} /> :
                                    <Image style={styles.image2} source={{ uri: item.Animal_Photo }} />
                            }
                        </View>

                        <Text style={{ fontWeight: 'bold', textAlign: "center", marginTop: 10, fontSize: 18 }}> {item.Animal_Case}</Text>


                    </View>





                    <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', textAlign: 'center', backgroundColor: "white", borderWidth: 1, borderRadius: 100, borderColor: "white" }}>
                        <TouchableOpacity onPress={() => Linking.openURL(this.googleMapOpenUrl(item.Latitude, item.Longitude))}>
                            <Image style={styles.image} source={require("../images/gps.png")} />
                            <Text style={{ fontWeight: 'bold', marginRight: 15, color: "#AB9052" }}>{item.City}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.dialCall(item.Phone_Number)}>
                            <Image style={styles.image} source={require("../images/callnow.png")} />
                            <Text style={{ fontWeight: 'bold', marginRight: 15, color: "#6767FA" }}>התקשר</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Linking.openURL(`whatsapp://send?phone=${"+972" + item.Phone_Number}`)}>
                            <Image style={styles.image} source={require("../images/whatsapp.png")} />
                            <Text style={{ fontWeight: 'bold', marginRight: 15, color: "#22BC50" }}>שלח הודעה</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.btnInfo(item)}>
                            <Image style={styles.image} source={require("../images/animalinfo1.png")} />
                            <Text style={{ fontWeight: 'bold', marginRight: 15, color: "#A54CBC" }}>מידע</Text>

                        </TouchableOpacity>
                    </View>



                    {/* <TouchableOpacity onPress={() => this.btnInfo(item)}>
                    <Image style={styles.image} source={require("../images/details1.png")} />
                </TouchableOpacity> */}


                </View >



                <View >
                    <Text style={{ fontWeight: 'bold', textAlign: "center", color: "red", fontSize: 16 }}>סטטוס: {item.Post_Status}</Text>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> עודכן לאחרונה בתאריך  {item.Post_Date} </Text>
                </View>




            </Card>
        )

    }







    rendnerSeparator = () => {
        return (
            // <View style={{ height: 1, width: '100%', backgroundColor: 'yellow', marginBottom:30 }}>
            <View>
                <Image style={{ width: "100%", height: 60 }} source={require("../images/dog.gif")} />
            </View>
        )
    }




    googleMapOpenUrl = (Lat, Lng) => {
        const latLng = `${Lat}+${Lng}`;
        return `google.navigation:q=${latLng}&mode=d`;
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
                text: 'דווח על בעל חיים',
                icon: require('../images/post.png'),
                name: 'bt_AddFoster',
                position: 1,
                textColor: "black",
                color: "#CD6531",
                textBackground: "#FDFFAE",
                borderWidth: 2

            },

        ];
        return (

            this.state.isLoading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="primary" animating />
                </View>
                :



                <View style={styles.container}>
                    <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/wow4.gif")}>
                        {/* <Image style={styles.image} source={require("../images/animalrescuelogo.png")}></Image> */}




                        {this.componentDidMount()}


                        <View>
                            <Header searchBar rounded>
                                <Item>
                                    <Icon name="ios-search" />
                                    <Input placeholder="חפש לפי עיר"
                                        onChangeText={(text) => { this.txtchgCity(text) }} />
                                </Item>
                            </Header>
                        </View>




                        <View style={{ alignItems: "flex-end" }}>
                            <Image style={styles.image1} source={require("../images/askhelp.gif")}></Image>
                        </View>






                        <View>
                            <SafeAreaView >
                                <TouchableOpacity style={{ alignItems: "flex-start", margin: 18, marginTop: 0 }}
                                    onPress={() => this.props.navigation.openDrawer()}>
                                    <FontAwesome5 name="bars" size={30} color="#161924" />
                                    <Text style={{ alignItems: "flex-start", margin: 1, fontSize: 8, fontWeight: "bold" }}>תפריט</Text>
                                </TouchableOpacity>
                                {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                            </View> */}
                            </SafeAreaView>
                        </View>






                        <FlatList
                            data={this.state.posts}
                            renderItem={(this.renderItem)}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={this.rendnerSeparator}

                        />





                        <FloatingAction
                            color="#F68B56"
                            
                            actions={actions}
                            onPressItem={

                                () => { this.props.navigation.navigate("Posts") }
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


    },
    textInput: {

        height: 40,
        marginBottom: 30,
        color: '#2648A5',
        borderBottomWidth: 1.5,
        borderBottomColor: '#2690A5',
        width: 250,
        alignSelf: 'center',
        fontSize: 20



    },
    text: {
        fontWeight: 'bold',
        paddingRight: 60,
        paddingLeft: 60,
        color: 'black',
        fontSize: 18
    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center', marginTop: 15, marginLeft: 10, marginRight: 10,


    },
    image1: {
        width: 350,
        height: 65,
        alignSelf: "center", marginLeft: 20, marginRight: 20,


    },
    image2: {
        width: 150,
        height: 150,
        alignSelf: "center", marginLeft: 20, marginRight: 20, borderWidth: 2, borderColor: "#A381BD",

    },
    btn: {
        marginTop: 20,
        width: "80%",
        alignSelf: 'center'
    },
    btnStyle: {
        backgroundColor: "green",
        borderRadius: 15,
        borderColor: "black",
        borderWidth: 2
    },
    btnTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});