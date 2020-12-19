import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import {  Button } from 'react-native-elements'




export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/pawwallpaper.jpg")}>
          <View>

          


          <Image style={styles.image} source={require("../images/Icon_2.png")}></Image>


          

            
          </View>
          <View style={{ marginTop: 20, width: "30%", alignSelf: 'center' }}>
            <Button onPress={()=> this.props.navigation.navigate('LoginPage')} title="התחבר" titleStyle={{ fontSize: 20, fontWeight: 'bold'}}  buttonStyle = {{backgroundColor :"#29B7DB", borderRadius:35, borderColor: "black", borderWidth:3}} />
          </View>
          <View style={{ marginTop: 10, width: "30%", alignSelf: 'center',  borderRadius:10 }}>
            <Button onPress={()=> this.props.navigation.navigate('SignUpPage')} title="הרשם" titleStyle={{ fontSize: 20, fontWeight: 'bold'}}  buttonStyle = {{backgroundColor :"#29DBB2", borderRadius:35, borderColor: "black", borderWidth:3}} />
          </View>

          {/* <Text style={{marginTop:20, fontSize: 35, color: "black", fontWeight: 'bold', alignSelf: 'center'}}>
              AnimalRescue
          </Text> */}

        </ImageBackground>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  image: {
    width: 230,
    height: 230,
    alignSelf: 'center',
    marginTop: 0
  }
});