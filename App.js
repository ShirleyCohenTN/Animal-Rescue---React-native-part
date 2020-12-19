import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons'
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Image } from 'react-native';



// import LoginScreen from './Pages/LoginPage';
import WelcomePage from './Pages/WelcomePage';
import SignUpPage from './Pages/SignUpPage';
//import Navigation from './Pages/Navigation';
import LoginPage from './Pages/LoginPage';
import SuccessPage from './Pages/SuccessPage';

import Veterinarians from './Pages/Veterinarians';
import Rescuers from './Pages/Rescuers';
import Farms from './Pages/Farms';
import HomePage from './Pages/HomePage';
import Fosters from './Pages/Fosters';
import FostersRishum from './Pages/FostersRishum';
import MyFosters from './Pages/MyFosters';
import MyPosts from './Pages/MyPosts';
import Posts from './Pages/Posts';
import Info from './Pages/Info';
import CameraView from './Pages/CameraView';
import PostUpdate from './Pages/PostUpdate';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
	return (

		<Stack.Navigator initialRouterName="WelcomePage" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="WelcomePage" component={WelcomePage} />
			<Stack.Screen name="SignUpPage" component={SignUpPage} />
			<Stack.Screen name="LoginPage" component={LoginPage} />
			<Stack.Screen name="SuccessPage" component={SuccessPage} />
			<Stack.Screen name="CameraView" component={CameraView} />
			<Stack.Screen name="PostUpdate" component={PostUpdate} />
		</Stack.Navigator>


	);
}

function Nav(props) {
	//console.log('in nav --> ',user_id)
	let userID = props.user_id;

	return (
		<NavigationContainer >
			<Drawer.Navigator initialRouteName="Root" drawerPosition="right"
				drawerContentOptions={{
					itemStyle: {
						flexDirection: 'row-reverse'
					}
				}
				
					// ,{ labelStyle: { color: "red", fontSize: 15.5, fontWeight:"bold"} }
				}
			>
				<Drawer.Screen
					name="HomePage"
					component={HomePage}
					options={{ drawerIcon: ({ black }) => <Image style={{ width: 40, height: 40, position: "absolute", right: 0 }} source={require("./images/catdog1.png")} />, drawerLabel: 'דף הבית - דיווחים' }}
				/>
				<Drawer.Screen
					name="Posts"
					component={Posts}
					options={{ drawerLabel: 'צור דיווח חדש', drawerIcon: ({ black }) => <Image style={{ width: 30, height: 30, position: "absolute", right: 0 }} source={require("./images/add.jpg")} /> }}
				/>

				<Drawer.Screen
					name="MyPosts"
					component={MyPosts}
					initialParams={{ id_user: userID }}
					options={{
						drawerLabel: 'הדיווחים שפירסמתי',
						drawerIcon: ({ black }) => <Image style={{ width: 30, height: 30, position: "absolute", right: 0 }} source={require("./images/my.png")} />
					}}
				/>
				<Drawer.Screen
					name="Veterinarians"
					component={Veterinarians}
					options={{
						drawerLabel: 'וטרינרים',
						drawerIcon: ({ black }) => <Image style={{ width: 35, height: 40, position: "absolute", right: 0 }} source={require("./images/vet.png")} />
					}}
				/>
				<Drawer.Screen
					name="Rescuers"
					component={Rescuers}
					options={{
						drawerLabel: 'מחלצים',
						drawerIcon: ({ black }) => <Image style={{ width: 45, height: 43, position: "absolute", right: 0 }} source={require("./images/rescue.png")} />
					}}
				/>
				<Drawer.Screen
					name="Farms"
					component={Farms}
					options={{
						drawerLabel: 'חוות שיקום',
						drawerIcon: ({ black }) => <Image style={{ width: 40, height: 40, position: "absolute", right: 0, paddingLeft: 10 }} source={require("./images/farm2.png")} />
					}}
				/>
				<Drawer.Screen
					name="Fosters"
					component={Fosters}
					options={{
						drawerLabel: 'חפש אומנה',
						drawerIcon: ({ black }) => <Image style={{ width: 40, height: 40, position: "absolute", right: 0 }} source={require("./images/search.png")} />
					}}
				/>
				<Drawer.Screen
					name="FostersRishum"
					component={FostersRishum}
					initialParams={{ id_user: userID }}
					options={{
						drawerLabel: 'רישום כאומנה',
						drawerIcon: ({ black }) => <Image style={{ width: 40, height: 40, position: "absolute", right: 0 }} source={require("./images/omna.png")} />
					}}
				/>
				<Drawer.Screen
					name="MyFosters"
					component={MyFosters}
					initialParams={{ id_user: userID }}
					options={{
						drawerLabel: 'האומנות שפירסמתי',
						drawerIcon: ({ black }) => <Image style={{ width: 30, height: 30, position: "absolute", right: 0 }} source={require("./images/my.png")} />
					}}
				/>
				<Drawer.Screen
					name="Info"
					component={Info}
					options={{
						drawerLabel: 'מידע על בע"ח נפוצים',
						drawerIcon: ({ black }) => <Image style={{ width: 30, height: 30, position: "absolute", right: 0 }} source={require("./images/info.png")} />
					}}
				/>
				<Drawer.Screen name="Root" component={Root}

					options={{
						drawerLabel: 'התנתק',
						drawerIcon: ({ black }) => <Image style={{ width: 30, height: 30, position: "absolute", right: 0 }} source={require("./images/logout.png")} />
					}} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			u_id: 0
		}
		this.getUserID()
	}
	getUserID = async () => {
		let u_id = await AsyncStorage.getItem('id_user');
		if (u_id == null) {
			u_id = 0;
		}

		this.setState({ u_id }, () => { console.log('this.state.u_id --> ', this.state.u_id) })
	}


	render() {
		return (
			<Nav user_id={this.state.u_id}></Nav>
			//<Root> </Root>

		)
	}
}

/*export default class App extends Component {
	render() {
		return (
			<Router>
			  <Scene key="root">
				<Scene key="WelcomePage"
				  component={WelcomePage}
					animation='fade'
				  hideNavBar={true}
				  initial={true}
				/>
				<Scene key="Navigation"
				  component={Navigation}
				  animation='fade'
				  hideNavBar={true}
				/>
			  <Scene key="SignUpPage"
				  component={SignUpPage}
				  animation='fade'
				  hideNavBar={true}
				/>
			  <Scene key="LoginPage"
				  component={LoginPage}
				  animation='fade'
				  hideNavBar={true}
				/>
			   <Scene key="SuccessPage"
				  component={SuccessPage}
				  animation='fade'
				  hideNavBar={true}
				/>
			  </Scene>
			</Router>
		);
	}
}*/