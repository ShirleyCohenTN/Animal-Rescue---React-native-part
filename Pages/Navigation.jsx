import 'react-native-gesture-handler';
//import * as React from 'react';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { StyleSheet, View, Text, ImageBackground, Image, Linking, Platform, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';



import React from 'react';

// import {useState} from 'react';



//import WelcomePage from './WelcomePage';
//import LoginPage from './LoginPage';
import Veterinarians from './Veterinarians';
import SuccessPage from './SuccessPage';
import HomePage from './HomePage';
import Fosters from './Fosters';
import FostersRishum from './FostersRishum';
import MyFosters from './MyFosters';
import MyPosts from './MyPosts';
import Posts from './Posts';
import Info from './Info';
// import App from '../App'






import { FontAwesome5 } from '@expo/vector-icons'



import { createDrawerNavigator } from '@react-navigation/drawer';
import { Router } from 'react-native-router-flux';
const Drawer = createDrawerNavigator();
let userID;

function DrawerNavigator() {
  return (

    <Drawer.Navigator initialRouteName="HomePage" >


      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{ drawerLabel: 'דף הבית - דיווחים', drawerIcon: ({ black }) => <FontAwesome5 name="paw" size={20} color={black} /> }}
      />
      <Drawer.Screen
        name="Posts"
        component={Posts}
        options={{ drawerLabel: 'צור דיווח חדש', drawerIcon: ({ black }) => <FontAwesome5 name="plus-square" size={20} color={black} /> }}
      />

      <Drawer.Screen
        name="MyPosts"
        component={MyPosts}
        initialParams={{ id_user: userID }}
        options={{
          drawerLabel: 'הדיווחים שפירסמתי',
          drawerIcon: ({ black }) => <FontAwesome5 name="id-card" size={20} color={black} />
        }}
      />
      <Drawer.Screen
        name="Veterinarians"
        component={Veterinarians}
        options={{
          drawerLabel: 'וטרינרים',
          drawerIcon: ({ black }) => <FontAwesome5 name="stethoscope" size={20} color={black} />
        }}
      />
      <Drawer.Screen
        name="Fosters"
        component={Fosters}
        options={{
          drawerLabel: 'חפש אומנה',
          drawerIcon: ({ black }) => <FontAwesome5 name="cat" size={20} color={black} />
        }}
      />
      <Drawer.Screen
        name="FostersRishum"
        component={FostersRishum}
        initialParams={{ id_user: userID }}
        options={{
          drawerLabel: 'רישום כאומנה',
          drawerIcon: ({ black }) => <FontAwesome5 name="user-plus" size={20} color={black} />
        }}
      />
      <Drawer.Screen
        name="MyFosters"
        component={MyFosters}
        initialParams={{ id_user: userID }}
        options={{
          drawerLabel: 'האומנות שפירסמתי',
          drawerIcon: ({ black }) => <FontAwesome5 name="id-card" size={20} color={black} />
        }}
      />
      <Drawer.Screen
        name="Info"
        component={Info}
        options={{
          drawerLabel: 'מידע על בע"ח נפוצים',
          drawerIcon: ({ black }) => <FontAwesome5 name="info-circle" size={20} color={black} />
        }}
      />
      <Drawer.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{
          drawerLabel: 'signout',
          drawerIcon: ({ black }) => <FontAwesome5 name="user-plus" size={20} color={black} />
        }}
      />
      <Drawer.Screen
        style={{display:"none"}}
        onPress = {()=>null}
        name="LoginPage"
        component={LoginPage}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }} />





    </Drawer.Navigator>
  );
}




const Stack = createStackNavigator();


export default function Navigation(props) {
  console.log(JSON.stringify(props));
  console.log("Hi person your USER ID is: " + props.navigation.state.params.id_user);
  userID = props.navigation.state.params.id_user;
  return (
    < NavigationContainer >

      <DrawerNavigator>

        <Stack.Navigator initialRouterName="HomePage">
          {/* <Stack.Screen name="WelcomePage" component={WelcomePage} /> */}

          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Veterinarians" component={Veterinarians} />
          <Stack.Screen name="Fosters" component={Fosters} />
          <Stack.Screen name="FostersRishum" component={FostersRishum} />
          <Stack.Screen name="MyFosters" component={MyFosters} />
          <Stack.Screen name="MyPosts" component={MyPosts} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="Info" component={Info} />

          {/* <Stack.Screen name="App" component={App} /> */}






        </Stack.Navigator>

      </DrawerNavigator>
    </NavigationContainer >


  );
}


