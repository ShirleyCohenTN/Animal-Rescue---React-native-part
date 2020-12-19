import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'

import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';


let url = 'http://shirley.up2app.co.il/api/fosters';


export default class FostersRishum extends React.Component {
    constructor(props) {
        console.log(JSON.stringify(props)); // TO SEE THE WHOLE PROPS
        super(props);
        this.state = {
            id_foster: "0",
            id_user: 0, //NEED TO GET THE ID USER
            first_name: "",
            last_name: "",
            phone_number: "",
            city: "",
            info: "",
            showErrLbl2: false,

        };
        console.log("stam4");
        // console.log("THE USER ID IS: " + props.route.params.id_user);
        this.getUserId();


    }



    getUserId = async () => {
        let u_id = await AsyncStorage.getItem('id_user');
        if (u_id == null) {
            u_id = 0;
        }

        this.setState({ id_user: u_id }, () => { console.log('this.state.id_user --> ', this.state.id_user) })
    }


    txtchgfirst_name = (first_name) => {
        this.setState({ first_name });
    }

    txtchglast_name = (last_name) => {
        this.setState({ last_name });
    }

    txtchgphone_number = (phone_number) => {
        this.setState({ phone_number });
    }

    txtchgcity = (city) => {
        this.setState({ city });
    }

    txtchginfo = (info) => {
        this.setState({ info });
    }



    validate_field = () => {
        const { first_name, last_name, phone_number, city } = this.state
        if (first_name == "" | last_name == "" | phone_number == "" | city == "") {
            this.setState({ showErrLbl2: true })
            return false;
        }
        else {
            this.setState({ showErrLbl2: false })
            return true;

        }

    }







    btnHosef = async () => {
        if (this.validate_field()) {

            let s = await this.AddFoster(this.state.id_foster,
                this.state.id_user,
                this.state.first_name,
                this.state.last_name,
                this.state.phone_number,
                this.state.city,
                this.state.info);
            console.log('returned value=' + s);
            if (s == null) {
                alert('didnt inserted into db!');
            }
            else {

                this.props.navigation.navigate('Fosters');
                Alert.alert("ברכותי ! " + `${this.state.first_name} ${this.state.last_name}` + " הוסף בהצלחה לרשימת האומנה ");



                // this.props.navigation.navigate('HomePage');
                //this.props.navigation.navigate('SuccessPage', {firstName: this.state.firstName, lastName: this.state.lastName, email:this.state.email});

            }
        }
        //console.log('signup', firstName, lastName, email, pass);
    }



    AddFoster = async (id_foster,
        id_user,
        first_name,
        last_name,
        phone_number,
        city,
        info) => {
        let returnedObj = null;

        let obj2Send = {
            "ID_Foster": id_foster,
            "ID_User": id_user,
            "First_Name": first_name,
            "Last_Name": last_name,
            "Phone_Number": phone_number,
            "City": city,
            "Info": info

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



    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/wow2.gif")}>
                    {/* <View style={{ backgroundColor: "black" }}>
                         <Image style={styles.image} source={require("../images/catthumbsup.gif")}></Image> 
                    </View> */}

                    <View >
                        <TouchableOpacity style={{ alignItems: "flex-start", margin: 18, marginTop: 20 }}
                            onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome5 name="bars" size={30} color="#161924" />
                            <Text style={{ alignItems: "flex-start", margin: 1, fontSize: 8, fontWeight: "bold" }}>תפריט</Text>

                        </TouchableOpacity>
                    </View>

                    <Image style={styles.image} source={require("../images/catthumbsup.gif")}></Image>



                    <View>
                        <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>רישום כאומנה</Text>
                        <Text style={{ fontSize: 17, textAlign: 'center', marginBottom: 10 }}>הוסף את עצמך ו/או חברייך לרשימת האומנה</Text>

                    </View>

                    <View style={{alignItems: 'center'}}>

                        <View>
                            <Text style={styles.textSmall}>שם פרטי</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchgfirst_name(text) }} ></TextInput>

                        </View>



                        <View>
                            <Text style={styles.textSmall}>שם משפחה</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchglast_name(text) }} ></TextInput>
                        </View>


                        <View>
                            <Text style={styles.textSmall}>מס' נייד</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchgphone_number(text) }}></TextInput>
                        </View>



                        <View>
                            <Text style={styles.textSmall}>עיר</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <TextInput style={styles.textInput} onChangeText={(text) => { this.txtchgcity(text) }}></TextInput>
                        </View>



                        <View style={styles.rowContainer}>
                            <Text style={styles.textSmall }>מידע נוסף אותו תרצה לציין:</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <TextInput style={styles.textInputInfo}
                                placeholder="סוגי בעלי חיים בהם אתה מוכן לטפל וכו'..."
                                placeholderTextColor="black"
                                onChangeText={(text) => { this.txtchginfo(text) }}></TextInput>
                        </View>

                    </View>

                    <View>
                        {this.state.showErrLbl2 && <Text style={{ color: '#FF0000', width: 300, alignSelf: 'center', marginRight: 80, fontWeight: 'bold' }}> אנא מלא את כל הפרטים</Text>}

                    </View>


                    <View style={{ marginTop: 10, width: "30%", alignSelf: 'center' }}>
                        <Button title="סיום" onPress={this.btnHosef} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#4570BC", borderRadius: 35, borderColor: "black", borderWidth: 2 }} />
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
        alignSelf: 'center', alignItems: 'flex-end',
        alignContent: 'center',
        flexDirection: 'row',



    },
    textInput: {

        height: 30,
        marginBottom: 10,
        color: '#2648A5',
        borderWidth: 2.5,
        width: "40%",
        alignSelf: 'center',
        fontSize: 20,
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft:5,
        paddingRight:5,
        borderBottomColor:"green",
        
        



    },
    textInputInfo: {
        height: 70,
        width: 400,
        padding: 10,
        marginBottom: 10,
        color: '#2648A5',
        borderWidth: 2.5,
        alignSelf: 'center',
        fontSize: 15,
        textAlign: 'center',
        backgroundColor: "white",
        borderRadius: 5,
        borderBottomColor:"green"



    },
    text: {
        fontWeight: 'bold',
        paddingRight: 10,
        paddingLeft: 50,
        color: 'black',
        fontSize: 18,
        // width: '60%'

    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image: {
        width: 80,
        height: 100,
        alignSelf: 'center', marginTop: 0, marginLeft: 12
    },
    textSmall: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        margin: 1,
        
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        alignSelf: 'center'

    },

});