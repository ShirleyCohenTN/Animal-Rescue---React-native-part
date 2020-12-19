import React from 'react';
import { StyleSheet, Text, Dimensions, TextInput, View, ImageBackground, KeyboardAvoidingView, Image, TouchableOpacity, SafeAreaView, Alert, Vibration } from 'react-native';
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import DatePicker from 'react-native-datepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';



import { FontAwesome5 } from '@expo/vector-icons'


import exampleImage from '../images/add.jpg'

let url = 'http://shirley.up2app.co.il/api/uploadpost';



export default class Posts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      showBase64: false,
      id_post: 0,
      id_user: 0,
      lat: null,
      long: null,
      date: "",
      animal_type: "",
      animal_status: "",
      phone_number: "",
      city: "",
      animal_address: "",
      animal_case: "",
      showErrLbl: false,
      photoUri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      uplodaedPicUri: { uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }
    }


    this.uploadedPicPath = 'http://shirley.up2app.co.il/uploadpicture2/';
    this.getUserId();

  }


  getUserId = async () => {
    let u_id = await AsyncStorage.getItem('id_user');
    if (u_id == null) {
      u_id = 0;
    }

    this.setState({ id_user: u_id }, () => { console.log('this.state.id_user --> ', this.state.id_user) })
  }



  componentDidMount() {
  }

  componentDidUpdate() {
    //console.log('update => ', this.props)
    if (this.props.route.params)
      if (this.props.route.params.photoUri && !this.state.showBase64) {
        this.setState({ photoUri: this.props.route.params.photoUri, showBase64: true }, () => {
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'CameraView' }
              ],
            })
          );
        })
      }
  }

  txtchg_animal_type = (animal_type) => {
    this.setState({ animal_type });
  }


  txtchg_animal_status = (animal_status) => {
    this.setState({ animal_status });
  }


  txtchg_phone_number = (phone_number) => {
    this.setState({ phone_number });
  }

  txtchg_city = (city) => {
    this.setState({ city });
  }


  txtchg_animal_address = (animal_address) => {
    this.setState({ animal_address });
  }

  txtchg_animal_case = (animal_case) => {
    this.setState({ animal_case });
  }

  btnGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const output =
          '\nlatitude=' + position.coords.latitude +
          '\nlongitude=' + position.coords.longitude +
          '\naltitude=' + position.coords.altitude +
          '\nheading=' + position.coords.heading +
          '\nspeed=' + position.coords.speed

        //alert(output);
        this.setState(
          { lat: position.coords.latitude, long: position.coords.longitude }
        )
        console.log('lat => ', this.state.lat);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

  }




  validate_field = () => {
    const { date, animal_type, animal_status, phone_number, city, animal_case } = this.state
    if (date == "" | animal_type == "" | animal_status == "" | phone_number == "" | city == "" | animal_case == "") {
      this.setState({ showErrLbl: true })
      return false;
    }
    else {
      return true;
    }
  }



  btnUpload = async () => {
    if (this.validate_field()) {
      let img = this.state.photoUri
      //id_user
      let id_user = await AsyncStorage.getItem('id_user')
      let d = new Date();
      let imgName = `post_img_user_${id_user}_${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`
      //this.setState({animal_photo:imgName})
      //console.log('imgName --> ',imgName);
      let animal_photo = await this.imageUpload(img, imgName);
      await this.setState({ animal_photo });

      let s = await this.AddPost();
      console.log('returned value=' + s);
      if (s == null) {
        alert('didnt inserted into db!');
      }
      else {

        this.props.navigation.navigate('HomePage');
        Alert.alert("", " הוסף בהצלחה !", [{ text: "אישור" }]);

      }
    }
    else {
      Alert.alert("", "אנא מלא את כל הפרטים", [{ text: "אישור" }]);
    }
  };

  imageUpload = async (imgUri, picName) => {
    let imgPath = '';

    let urlAPI = "http://shirley.up2app.co.il/uploadpicture2";
    let data = {
      base64String: imgUri,
      name: picName,
      path: 'Images'
    }

    const config = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      body: JSON.stringify(data),
    };


    await fetch(urlAPI, config)
      .then((resp) => resp.json())
      .then((res) => {
        imgPath = res
      })
      .catch(err => {
        alert('err upload= ' + err);
      });

    return imgPath;
  }




  AddPost = async () => {
    let returnedObj = null;

    let obj2Send = {
      "ID_User": this.state.id_user,
      "Animal_Type": this.state.animal_type,
      "Animal_Address": this.state.animal_address,
      "Longitude": this.state.long,
      "Latitude": this.state.lat,
      "Animal_Photo": this.state.animal_photo,
      "Animal_Case": this.state.animal_case,
      "Post_Date": this.state.date,
      "Post_Status": this.state.animal_status,
      "City": this.state.city,
      "Phone_Number": this.state.phone_number

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
          //console.log(data.email);
          //console.log(data.pass);
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
    const exampleImageUri = Image.resolveAssetSource(exampleImage).uri

    return (


      <View style={styles.container}>
        <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/bb.jpg")}>

          <View style={[styles.Content, { alignItems: 'center' }]}>
            {/* תצוגה מקדימה של התמונה */}
            <View>
              <TouchableOpacity onPress={() => {
                this.setState({ showBase64: false })
                this.props.navigation.navigate('Root', { screen: 'CameraView' })
              }}>
                <Image
                  style={styles.image}
                  source={{ uri: (!this.state.showBase64) ? exampleImageUri : `data:image/jpg;base64,${this.state.photoUri}` }}
                ></Image>
                {(!this.state.showBase64) && <Text style={{ marginBottom: 10, color: 'red', fontSize: 17, fontWeight: 'bold' }}>לחץ כאן להעלאת תמונה</Text>}
              </TouchableOpacity>
            </View>





            <View style={styles.rowContainer}>
              <DatePicker
                style={{ width: 390 }}
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
                    height: 35,
                    width: 100,
                    borderColor: "black",
                    backgroundColor: "white",
                    borderRadius: 10,
                    borderWidth: 2


                  }
                }}
                onDateChange={(date) => { this.setState({ date: date.toString() }) }}
              />
              {/* <Text style={styles.textSmall}>תאריך</Text> */}
            </View>


            <View style={styles.rowContainer}>
              <TextInput style={styles.textInput}
                onChangeText={(text) => { this.txtchg_animal_type(text) }}
                placeholder="סוג החיה - ציפור/ חתול וכו'.."></TextInput>
              {/* <Text style={styles.textSmall}>סוג חיה:</Text> */}
            </View>


            <View style={styles.rowContainer}>
              <TextInput style={styles.textInput}
                onChangeText={(text) => { this.txtchg_animal_status(text) }}
                placeholder="סטטוס - מחפש אומנה/ מחלץ וכו'.."></TextInput>
              {/* <Text style={styles.textSmall}>סטטוס:</Text> */}
            </View>


            <View style={styles.rowContainer}>
              <TextInput style={styles.textInput}
                onChangeText={(text) => { this.txtchg_phone_number(text) }}
                placeholder="מס' טלפון ליצירת קשר"></TextInput>
              {/* <Text style={styles.textSmall}>טלפון ליצירת קשר:</Text> */}
            </View>

            <View style={styles.rowContainer}>
              <TextInput style={styles.textInput}
                onChangeText={(text) => { this.txtchg_city(text) }}
                placeholder="עיר מציאת החיה - חובה"></TextInput>
              {/* <Text style={styles.textSmall}> עיר מציאת החיה:</Text> */}
            </View>

            <View style={styles.rowContainer}>
              <TextInput style={styles.textInput}
                onChangeText={(text) => { this.txtchg_animal_address(text) }}
                placeholder="כתובת מציאת החיה - לא חובה"></TextInput>
              {/* <Text style={styles.textSmall}>כתובת מציאת החיה:</Text> */}
            </View>

            <View style={styles.rowContainer}>
              <TextInput style={styles.textInput}
                onChangeText={(text) => { this.txtchg_animal_case(text) }}
                placeholder="תאר את פרטי הדיווח - מצבה של החיה וכו'.."></TextInput>
              {/* <Text style={styles.textSmall}>תאר את פרטי הדיווח:</Text> */}
            </View>






            {this.state.lat == null &&
              <TouchableOpacity
                onPress={this.btnGetLocation}>
                <Image style={styles.image1} source={require("../images/lc1.png")} />
                <Text style={{ marginBottom: 10, color: 'yellow', fontSize: 18, fontWeight: 'bold' }}>לחץ כאן להעלאת מיקום נוכחי</Text>
              </TouchableOpacity>
            }



            {this.state.lat &&
              <View style={{ margin: 10 }}>
                <MapView style={styles.mapStyle}
                  region={{
                    latitude: this.state.lat,
                    longitude: this.state.long,
                    latitudeDelta: 0.0055,
                    longitudeDelta: 0.0055,
                  }}
                >

                  <Marker
                    coordinate={{
                      latitude: this.state.lat,
                      longitude: this.state.long,
                    }}
                    title='המיקום שלי'
                    description='אני נמצא כאן'
                  //image={require('../assets/icon.png')}
                  />
                </MapView>

              </View>
            }





            <View style={{ marginTop: 1, width: "40%", alignSelf: 'center' }}>
              <Button title="פרסם דיווח" onPress={this.btnUpload} titleStyle={{ fontSize: 20, fontWeight: 'bold' }} buttonStyle={{ backgroundColor: "#2ED15F", borderRadius: 35, borderColor: "black", borderWidth: 2 }} />
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
    color: 'rgb(100,150,250)',
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
    width: 180,
    height: 180,
    alignSelf: 'center',

  },
  image1: {
    // flex: 1,
    width: 100,
    height: 100,
    alignSelf: 'center'
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
    borderWidth: 2,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1




  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1
  },
}); 