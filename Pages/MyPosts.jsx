import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Linking, Platform, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Text } from 'native-base';

import { FloatingAction } from 'react-native-floating-action';
import AsyncStorage from '@react-native-community/async-storage';




import _ from 'lodash';

import { FontAwesome5 } from '@expo/vector-icons'



let url = 'http://shirley.up2app.co.il/api/posts';




export default class MyStuff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            my_posts: [],
            isLoading: true,
            id_user: 0

        };
        this.getUserId();

    }


    getUserId = async () => {
        let u_id = await AsyncStorage.getItem('id_user');
        if (u_id == null) {
            u_id = 0;
        }

        this.setState({ id_user: u_id }, () => { console.log('this.state.id_user --> ', this.state.id_user) })
    }






    componentDidMount = () => {


        this.getAllPostsByUser();


    }






    getAllPostsByUser = () => {
        fetch(url + `?id_user=${this.state.id_user}`,
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
                    this.setState({ my_posts: data, isLoading: false });
                }
                else {
                    console.log('didnt inserted!');
                }
            })
            .catch(function (err) {
                alert(err);
            });
    }





    btnDelete = (PostID) => {
        fetch(url + `?id_post=${PostID}`,
            {
                method: 'DELETE', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    // 'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => {
                // console.log(resp);
                if (resp.status === 200) {
                    console.log(200);
                    let newPosts = this.state.my_posts.filter(d => d.ID_Post !== PostID);
                    // console.log(newDeceased);
                    this.setState({
                        my_posts: newPosts
                    });
                }
                else if (resp.status === 400) {
                    console.log("BadRequest");
                }
                else {
                    console.log("NotFound");
                }
            }
            ) // Transform the data into json
            .catch(function (err) {
                alert(err);
            });
    }





    btnInfo = (item) => {
        Alert.alert(`${item.Animal_Type} `, " עיר: " + `${item.City}` + "."
            + `\n` + "כתובת: " + `${item.Animal_Address}`

            + `\n` + "טלפון ליצירת קשר: " + `${item.Phone_Number}`
            + `\n`
            + `\n` + "תיאור דיווח :  " + `\n` + `${item.Animal_Case}`
            + `\n`
            + `\n` + " סטטוס :  " + `${item.Post_Status}`
            + `\n`
            + `\n` + " תאריך :  " + `${item.Post_Date}`,




            [{ text: "אישור" },
            ]);
    }














    renderItem = ({ item }) => {

        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20, marginTop: 10 }}>


                {/* <View style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>
                    <Text style={styles.text1}>
                        {item.City}
                    </Text>
                </View> */}


                <TouchableOpacity onPress={() => Alert.alert(
                    "האם אתה בטוח שברצונך למחוק",
                    "    את הדיווח על  " + `ה ${item.Animal_Type} ` + " ?",
                    [
                        {
                            text: "לא",
                            onPress: () => console.log("No pressed")
                        },
                        { text: "כן", onPress: () => this.btnDelete(item.ID_Post) }
                    ],
                    { cancelable: false }
                )}>

                    {/* <Image style={styles.imageDelete} source={require("../images/delete2.png")} /> */}
                    {/* <Text style={{ color: "red", alignSelf: 'center', fontWeight: 'bold', fontSize: 25 }}>X  </Text> */}
                    <Image style={styles.image} source={require("../images/delete.png")} />

                    <Text style={{ color: "red", alignSelf: 'center', fontWeight: 'bold', fontSize: 13 }}>  הסר</Text>
                </TouchableOpacity>



                <TouchableOpacity onPress={() => this.props.navigation.navigate('Root', { screen: 'PostUpdate', params: { id_post: item.ID_Post, post_status: item.Post_Status, phone_number: item.Phone_Number } })}>
                    <Image style={styles.image} source={require("../images/pencil1.png")} />
                    <Text style={{ color: "blue", alignSelf: 'center', fontWeight: 'bold', fontSize: 13 }}>  ערוך</Text>

                </TouchableOpacity>




                <View style={{ flex: 1, justifyContent: 'center', marginRight: 20 }}>

                    <Text style={styles.text}>
                        {item.Animal_Type} , {item.City}
                    </Text>

                </View >



                <TouchableOpacity onPress={() => this.btnInfo(item)}>
                    <Image style={styles.image} source={require("../images/info.png")} />
                </TouchableOpacity>


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

        return (



            this.state.isLoading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="primary" animating />
                </View>
                :


                <View style={styles.container}>
                    <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/wow4.gif")}>



                        {this.componentDidMount()}





                        <View >
                            <TouchableOpacity style={{ alignItems: "flex-start", margin: 18, marginTop: 20 }}
                                onPress={() => this.props.navigation.openDrawer()}>
                                <FontAwesome5 name="bars" size={30} color="#161924" />
                                <Text style={{ alignItems: "flex-start", margin: 1, fontSize: 8, fontWeight: "bold" }}>תפריט</Text>

                            </TouchableOpacity>
                        </View>



                        <View style={{ fontSize: 20, alignSelf: "center" }}>
                            <Text style={styles.text1}>הדיווחים שפירסמתי</Text>
                        </View>

                        <View>
                            {this.state.my_posts == "" && <Text style={{ color: '#FF0000', width: 400, alignSelf: 'center', marginRight: 80, fontWeight: 'bold' }}> לא ביצעת שום דיווח עדיין</Text>}

                        </View>

                        <FlatList
                            data={this.state.my_posts}
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
        width: 40,
        height: 40,
        alignSelf: 'center', marginTop: 15, marginLeft: 12, marginRight: 22
    },
    image1: {
        width: 150,
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
    text1: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 22,
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