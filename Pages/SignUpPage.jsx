import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';


let url = 'http://shirley.up2app.co.il/api/users';


export default class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_user: '',
            firstName: '',
            lastName: '',
            email: '',
            pass: '',
            phone: '',
            passAgain: '',
            retrypassword: '',
            secureTextEntry: true,
            iconName: "eye",
            showErrLbl: false,
            showErrLbl2: false,
            showErrLbl3: false,
            fullname: ''

        };
        console.log('stam3');

    }

    txtchgFirstName = (firstName) => {
        this.setState({ firstName });
    }

    txtchgLastName = (lastName) => {
        this.setState({ lastName });
    }

    txtchgEmail = (email) => {
        this.setState({ email });
    }

    txtchgPass = (pass) => {
        this.setState({ pass });
    }

    txtchgPassAgain = (passAgain) => {
        this.setState({ passAgain });
    }

    txtchgPhone = (phone) => {
        this.setState({ phone });
    }

    validate_field = () => {
        const { firstName, lastName, email, pass, phone, passAgain } = this.state
        if (firstName == "" | lastName == "" | email == "" | pass == "" | phone == "" | passAgain == "") {
            this.setState({ showErrLbl2: true })
            return false;
        }
        else {
            this.setState({ showErrLbl2: false })
        }

        if (pass != passAgain) {
            this.setState({ showErrLbl: true })
            return false;
        }
        else {
            this.setState({ showErrLbl: false })
        }

        return true;
    }


    btnSignUp = async () => {
        if (this.validate_field()) {


            let s = await this.AddUser(this.state.firstName, this.state.lastName, this.state.email, this.state.pass, this.state.phone);
            console.log('returned value=' + s);

            this.setState({ id_user: s.ID_User });

            console.log('id_user is =' + this.state.id_user);


            if (s == null) {
                alert('didnt inserted into db!');
            }
            else {
                // Alert.alert("נרשמת בהצלחה!");

                // this.props.navigation.navigate('HomePage');
                console.log("add to asyncStorage")
                await AsyncStorage.setItem('id_user', JSON.stringify(this.state.id_user))
                await this.setState({ fullname: `${this.state.firstName} ${this.state.lastName}` }, () => {
                    this.props.navigation.navigate('Root', { screen: 'SuccessPage', params: { fullname: this.state.fullname } });
                })



            }
            //console.log('signup', firstName, lastName, email, pass);
        }
    }



    AddUser = async (firstName, lastName, email, pass, phoneNumber) => {
        let returnedObj = null;

        let obj2Send = {
            "First_Name": firstName,
            "Last_Name": lastName,
            "Email_Address": email,
            "Pass": pass,
            "Phone_Number": phoneNumber
        }

        await fetch(url,
            {
                method: 'POST', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                body: JSON.stringify(obj2Send),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (!data.toString().includes("could not insert")) {
                    console.log(data.email);
                    console.log(data.pass);
                    returnedObj = data;
                }
                else {
                    console.log('didnt inserted!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });

        return returnedObj;
    }


    onIconPress = () => {
        let iconName = (this.state.secureTextEntry) ? "eye-off" : "eye";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        });
    }



    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/green.jpg")}>
                    <Image style={styles.image} source={require("../images/veterinary-11.png")}></Image>

                    <TextInput
                        onChangeText={(text) => { this.txtchgFirstName(text) }}
                        style={styles.textInput}
                        // value={this.state.firstName}
                        placeholder="שם פרטי"
                        placeholderTextColor='#330000'
                    >

                    </TextInput>

                    <TextInput onChangeText={(text) => { this.txtchgLastName(text) }}
                        style={styles.textInput}
                        // value={this.state.lastName}
                        placeholder="שם משפחה"
                        placeholderTextColor='#330000'
                    ></TextInput>

                    <TextInput onChangeText={(text) => { this.txtchgEmail(text) }}
                        style={styles.textInput}
                        // value={this.state.email}
                        placeholder="אימייל"
                        placeholderTextColor='#330000'
                    ></TextInput>


                    <TextInput onChangeText={(text) => { this.txtchgPhone(text) }}
                        style={styles.textInput}
                        // value={this.state.email}
                        placeholder="מס' נייד"
                        placeholderTextColor='#330000'
                    ></TextInput>


                    <View >
                        <TextInput onChangeText={(text) => { this.txtchgPass(text) }}
                            style={styles.textInput}
                            // value={this.state.pass}
                            // style={{ flex: 1, marginEnd: 50 }}
                            secureTextEntry={this.state.secureTextEntry}
                            placeholder="סיסמא"
                            placeholderTextColor='#330000'
                        ></TextInput>

                    </View>


                    <View>
                        <TextInput onChangeText={(text) => { this.txtchgPassAgain(text) }}
                            style={styles.textInput}
                            // value={this.state.pass}
                            // style={{ flex: 1, marginEnd: 50 }}
                            secureTextEntry={this.state.secureTextEntry}
                            placeholder="אימות סיסמא"
                            placeholderTextColor='#330000'
                        ></TextInput>
                        {this.state.showErrLbl2 && <Text style={{ color: '#FF0000', width: 300, alignSelf: 'center', marginRight: 80, fontWeight: 'bold' }}> אנא מלא את כל הפרטים</Text>}

                        {this.state.showErrLbl && <Text style={{ color: '#FF0000', width: 300, alignSelf: 'center', marginRight: 80, fontWeight: 'bold' }}> אין התאמה בין הסיסמאות</Text>}



                    </View>


                    <View>
                        <TouchableOpacity onPress={this.onIconPress} style={{ alignItems: "center" }}>
                            <Icon name={this.state.iconName} size={60} color="black" />
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginTop: 5, width: "30%", alignSelf: 'center' }}>
                        <Button title="הרשמה" onPress={this.btnSignUp} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#29DBB2", borderRadius: 15, borderColor: "black", borderWidth: 3 }} />
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
        alignSelf: "stretch",
        height: 40,
        marginBottom: 30,
        color: '#148946',
        // borderBottomWidth: 2,
        // borderBottomColor: '#2690A5',
        width: 350,
        alignSelf: 'center',
        fontSize: 20,
        backgroundColor: "white",
        alignContent: "center",
        // borderTopWidth:2,
        borderRadius: 20,
        alignSelf: "center",
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10





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
        width: 100,
        height: 100,
        alignSelf: 'center', marginTop: 18, marginLeft: 12,
        marginBottom: 30
    }
});