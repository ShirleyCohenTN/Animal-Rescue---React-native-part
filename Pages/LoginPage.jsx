import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

let url = 'http://shirley.up2app.co.il/api/users';
//var url = 'http://localhost:63180/api/users';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: 'shirley10000@walla.com',
            passText: '123456',
            id_user: "",

            showErrLbl: false
        };
        console.log('stam2');

    }

    componentDidMount() {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: true,
            }),
          });
    }



    txtchgEmail = (emailText) => {
        this.setState({ emailText });
    }

    txtchgPass = (passText) => {
        this.setState({ passText });
    }

    registerForPushNotificationsAsync = async (userId) => {
        let experienceId = undefined;
        if (!Constants.manifest) {
            // Absence of the manifest means we're in bare workflow
            experienceId = '@username/example';
        }
        const expoPushToken = await Notifications.getExpoPushTokenAsync({
            experienceId,
        });
        await console.log('expoPushToken => ', expoPushToken)
        await navigator.geolocation.getCurrentPosition(
            async (position) => {
                const data = {
                    ID_User: userId,
                    Token: expoPushToken.data,
                    Lat: position.coords.latitude,
                    Lng: position.coords.longitude
                }

                await fetch(url + '/updateToken', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).catch(err => console.log(err))

            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        /**/
    }


    btnLogin = async () => {
        console.log(1);

        console.log(this.state.emailText + "," + this.state.passText);

        let s = await this.checkUserDetails(this.state.emailText, this.state.passText);
        console.log('returned value=' + s);
       


        if (s != null) {
            this.setState({ id_user: s.ID_User });
            console.log('id_user is =' + this.state.id_user);
            this.setState({ showErrLbl: false });
            // Alert.alert("התחברת בהצלחה!");
            console.log("h1");
            console.log("add to asyncStorage")
            await AsyncStorage.setItem('id_user', JSON.stringify(this.state.id_user))

            await this.registerForPushNotificationsAsync(this.state.id_user)
            // this.props.navigation.navigate('Navigation', { user: s, id_user: this.state.id_user});
            this.props.navigation.navigate('HomePage', { id_user: this.state.id_user });

        }
        else {
            console.log('err login!')
            this.setState({ showErrLbl: true });
            // Alert.alert("שגיאת התחברות", "אנא בדוק שהאימייל והסיסמא נכונים");

        }
    }


    checkUserDetails = async (Email, Password) => {
        let returnedObj = null;

        await fetch(url + `?email=${Email}&password=${Password}`,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log("meow");
                console.log(data);
                if (data != null) {
                    console.log(data.Email);
                    console.log(data.Password);
                    returnedObj = data;
                }
                else {
                    console.log('wrong email or password!');
                    returnedObj = null;
                }

            })
            .catch(function (err) {
                alert(err);
            });

        return returnedObj;
    }






    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/backgroundjpg.jpg")}>
                    <Image style={styles.image} source={require("../images/help.png")}></Image>

                    <Text style={styles.text}>אימייל</Text>
                    <View style={styles.textInput}>
                        <Input
                            value={this.state.emailText}
                            onChangeText={(text) => { this.txtchgEmail(text) }}
                            leftIcon={{ type: 'Entypo', name: 'email', color: '#29B7DB' }}
                        />
                    </View>

                    <Text style={styles.text}>סיסמא</Text>
                    <View style={styles.textInput}>
                        <Input
                            value={this.state.passText}
                            onChangeText={(text) => { this.txtchgPass(text) }}
                            leftIcon={{ type: 'FontAwesome5', name: 'lock', color: '#29B7DB' }}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={{ marginTop: 0, width: "30%", alignSelf: 'center' }}>
                        <Button title="התחבר" onPress={this.btnLogin} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#29B7DB", borderRadius: 15, borderColor: "black", borderWidth: 2 }} />
                        {this.state.showErrLbl && <Text style={{ color: 'red', width: 300, alignSelf: 'center', marginRight: 80, fontWeight: 'bold' }}> אימייל או סיסמא לא נכונים</Text>}
                    </View>



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
        borderColor: '#2648A5',
        width: 320,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight:"bold",
        // backgroundColor: "white",
        // borderRadius: 20,
        // borderWidth: 1,




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
        width: 200,
        height: 200,
        alignSelf: 'center'
    }
});