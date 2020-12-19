import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements'

import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import { FontAwesome5 } from '@expo/vector-icons'

import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon, Right } from 'native-base';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Animated: `useNativeDriver` was not specified.',
]);


const cards = [
    {
        text: 'יונת סלעים',
        name: 'למידע לחץ כאן',
        image: require("../images/yona.jpg"),
    },
    {
        text: 'חזיר בר',
        name: 'למידע לחץ כאן',
        image: require("../images/hazir.jpg"),
    },
    {
        text: 'דרור הבית',
        name: 'למידע לחץ כאן',
        image: require("../images/dror.jpg"),
    },
    {
        text: 'תן זהוב',
        name: 'למידע לחץ כאן',
        image: require("../images/tan.jpg"),
    },
    {
        text: 'סיס חומות',
        name: 'למידע לחץ כאן',
        image: require("../images/sis.jpg"),
    },
    {
        text: 'צבוע מפוספס',
        name: 'למידע לחץ כאן',
        image: require("../images/zavoa.jpg"),
    },
    {
        text: 'דררה',
        name: 'למידע לחץ כאן',
        image: require("../images/drara.jpg"),
    },
    {
        text: 'מיינה הודית',
        name: 'למידע לחץ כאן',
        image: require("../images/mayna.jpg"),
    },
    {
        text: 'נמיה מצויה',
        name: 'למידע לחץ כאן',
        image: require("../images/nemiya.jpg"),
    },
    {
        text: 'עורב אפור',
        name: 'למידע לחץ כאן',
        image: require("../images/orev.jpg"),
    },
    {
        text: 'עורבני',
        name: 'למידע לחץ כאן',
        image: require("../images/orvani.jpg"),
    },
    {
        text: 'צבי ארץ ישראלי',
        name: 'למידע לחץ כאן',
        image: require("../images/zvi.jpg"),
    },
    {
        text: 'צופית',
        name: 'למידע לחץ כאן',
        image: require("../images/zufit.jpg"),
    },
    {
        text: 'שועל מצוי',
        name: 'למידע לחץ כאן',
        image: require("../images/shual.jpg"),
    },

];




export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }




    CheckAnimal = (item) => {
        if (item == "יונת סלעים") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/columba-livia');

        }
        if (item == "חזיר בר") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/sus-scrofa');

        }
        if (item == "דרור הבית") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/passer-domesticus');

        }
        if (item == "תן זהוב") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/en/monitoring/species/canis-aureus');

        }
        if (item == "סיס חומות") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/apus-apus');

        }
        if (item == "צבוע מפוספס") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/hyaena-hyaena');

        }
        if (item == "דררה") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/psittacula-krameri');

        }
        if (item == "מיינה הודית") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/acridotheres-tristis');

        }
        if (item == "נמיה מצויה") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/herpestes-ichneumon');

        }
        if (item == "עורב אפור") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/corvus-corone-cornix');

        }
        if (item == "עורבני") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/garrulus-glandarius');

        }
        if (item == "צבי ארץ ישראלי") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/gazella-gazella');

        }
        if (item == "צופית") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/nectarinia-osea');

        }
        if (item == "שועל מצוי") {
            WebBrowser.openBrowserAsync('http://www.hamaarag.org.il/monitoring/species/vulpes-vulpes');

        }

    }





    render() {
        return (


            <Container>
                <ImageBackground style={styles.background} resizeMode='cover' source={require("../images/wow1.gif")}>

                    <View style={{ marginTop: 50 }}>
                        <SafeAreaView >
                            <TouchableOpacity style={{ alignItems: "flex-start", margin: 18, marginTop: 0 }}
                                onPress={() => this.props.navigation.openDrawer()}>
                                <FontAwesome5 name="bars" size={30} color="#161924" />
                                <Text style={{ alignItems: "flex-start", margin: 1, fontSize: 8, fontWeight: "bold" }}>תפריט</Text>

                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>

                    

                    <View style={{ marginTop: 50 }}>
                        <DeckSwiper

                            dataSource={cards}
                            renderItem={item =>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem style={{ backgroundColor: "#FF99CC", borderWidth:2 }}>
                                        <Right>
                                            {/* <Thumbnail source={item.image} /> */}
                                            <Body>
                                                <View style={styles.text}>
                                                    <Text style={{ fontSize: 20, color: "black", fontWeight: 'bold', }}>{item.text}</Text>
                                                </View>
                                            </Body>
                                        </Right>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={{ height: 300, flex: 1, borderWidth:2, borderColor:"black", }} source={item.image} />
                                    </CardItem>
                                    <CardItem style={{ backgroundColor: "#EB80B5", borderWidth:1,  }} >

                                        <TouchableOpacity onPress={() => this.CheckAnimal(item.text)}>
                                            <Text style={{ fontSize: 16, marginLeft: 90, color: "yellow", fontWeight: 'bold' }}>{item.name}  <FontAwesome5 name="info-circle" size={16} color="yellow" />   </Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                </Card>
                            }
                        />
                    </View>
                    <View style={{ alignItems: "center", marginTop:430 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>  החלק ימינה או שמאלה</Text>
                        <Image style={styles.image} source={require("../images/swipe.gif")}></Image>
                    </View>
                </ImageBackground>

            </Container>


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
        color: 'black',
        fontSize: 18,
        marginLeft: 90

    },
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center', marginTop: 0, marginLeft: 12
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