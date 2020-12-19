import React from 'react';
import { StyleSheet, Text, Dimensions, TextInput, View, ImageBackground, KeyboardAvoidingView, Image, TouchableOpacity, SafeAreaView, Alert, Vibration } from 'react-native';
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';



import { FontAwesome5 } from '@expo/vector-icons'


import exampleImage from '../images/camera2.jpg'

let url = 'http://shirley.up2app.co.il/api/posts';



export default class PostUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_post: this.props.route.params.id_post, // i guess its working
            id_user: 0,
            date: "",
            animal_status: this.props.route.params.post_status,
            phone_number: this.props.route.params.phone_number,

        }


        this.getUserId();

    }


    getUserId = async () => {
        let u_id = await AsyncStorage.getItem('id_user');
        if (u_id == null) {
            u_id = 0;
        }

        console.log('the post id is -->', this.state.id_post)
        console.log('the phone number -->', this.state.phone_number)

        this.setState({ id_user: u_id }, () => { console.log('this.state.id_user --> ', this.state.id_user) })
    }



    componentDidMount() {
    }



    txtchg_phone_number = (phone_number) => {
        this.setState({ phone_number });
    }


    txtchg_animal_status = (animal_status) => {
        this.setState({ animal_status });
    }



    txtchg_animal_status = (animal_status) => {
        this.setState({ animal_status });
    }



    btnUpdate = () => {

        let obj2Send = {
            "ID_Post": `${this.state.id_post}`,
            "Post_Date": `${this.state.date}`,
            "Post_Status": `${this.state.animal_status}`,
            "Phone_Number": `${this.state.phone_number}`
        }


        fetch(url,
            {
                method: 'PUT', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                body: JSON.stringify(obj2Send),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => {
                if (resp.status === 200) {
                    console.log("sababa")
                    this.props.navigation.navigate('MyPosts');
                    Alert.alert(" עודכן בהצלחה !");
                }
                else if (resp.status === 400) {
                    console.log("BadRequest");
                }
                else {
                    console.log("NotFound");
                }
            }) // Transform the data into json
            .catch(function (err) {
                alert(err);
            });



    }







    render() {

        return (


            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/bb.jpg")}>

                    <View style={[styles.Content, { alignItems: 'center' }]}>

                        <View >
                            <Text style={styles.koteret}>עדכון פרטי הדיווח</Text>
                        </View>

                        <Image style={styles.image1} source={require("../images/pencil2.png")} />



                        <View>
                            <Text style={styles.textSmall}>תאריך העדכון</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <DatePicker
                                style={{ width: 390, }}
                                date={this.state.date} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="בחר תאריך"
                                format="DD-MM-YYYY"
                                minDate="01-01-1970"
                                maxDate="01-01-2100"
                                confirmBtnText="בחר"
                                cancelBtnText="ביטול"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 100,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 100,
                                        marginRight: 100,
                                        height: 40,
                                        borderColor: "black",
                                        backgroundColor: "white",
                                        borderRadius: 10,
                                        borderWidth: 3,
                                        borderBottomColor:"green"

                                    }
                                }}
                                onDateChange={(date) => { this.setState({ date: date.toString() }) }}
                            />
                            {/* <Text style={styles.textSmall}>תאריך</Text> */}
                        </View>




                        <View>
                            <Text style={styles.textSmall}>סטטוס</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <TextInput style={styles.textInput}
                                value={this.state.animal_status}
                                onChangeText={(text) => { this.txtchg_animal_status(text) }}
                            // placeholder="סטטוס - מחפש אומנה/ מחלץ וכו'.."
                            >

                            </TextInput>
                            {/* <Text style={styles.textSmall}>סטטוס:</Text> */}
                        </View>


                        <View>
                            <Text style={styles.textSmall}>טלפון ליצירת קשר</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <TextInput style={styles.textInput}
                                value={this.state.phone_number}
                                onChangeText={(text) => { this.txtchg_phone_number(text) }}
                            // placeholder="מס' טלפון ליצירת קשר"
                            ></TextInput>
                            {/* <Text style={styles.textSmall}>טלפון ליצירת קשר:</Text> */}
                        </View>




                        <View style={{ marginTop: 80, width: "50%", alignSelf: 'center' }}>
                            <Button title="שמור שינויים" onPress={this.btnUpdate} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#2ED15F", borderRadius: 35, borderColor: "black", borderWidth: 3 }} />
                        </View>

                        <View style={{ marginTop: 30, width: "35%", alignSelf: 'center' }}>
                            <Button title="ביטול" onPress={() => this.props.navigation.navigate('MyPosts')} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#EC2B2B", borderRadius: 35, borderColor: "black", borderWidth: 3 }} />
                        </View>



                    </View>
                </ImageBackground>

            </View>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginBottom: 10
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
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
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
    image: {
        // flex: 1,
        width: 200,
        height: 200
    },
    image1: {
        // flex: 1,
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom:40
    },
    mapStyle: {
        width: Dimensions.get('window').width - 40,
        height: Dimensions.get('window').height / 5,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        alignSelf: 'flex-start',


    },

    textInput: {

        height: 30,
        marginBottom: 10,
        color: '#2648A5',
        borderColor: "green",
        width: "95%",
        height: 45,
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: "bold",
        padding: 10,
        borderWidth: 3,
        marginLeft: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderBottomColor: "black",
        // borderBottomWidth: 1




    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    koteret: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
});