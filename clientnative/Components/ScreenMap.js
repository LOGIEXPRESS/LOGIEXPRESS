import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTravels } from '../actions/index.js'
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/core";
import StarRating from './StarRating.js';



const ScreenMap = () => {


    const navigation = useNavigation();
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        })();
        dispatch(getTravels())
    }, []);

    const travels = useSelector((state) => state.travels)



     console.log("Esto es Travel", travels)


    const [pin, setPin] = useState({
        latitude: -24.8385129,
        longitude: -65.4435753,
    })

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    const rating = 3;

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                   /*  console.log(data, details) */;
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    })
                }}
                query={{
                    key: 'AIzaSyCctmpoWkqc4Te99YNkI0hgsyVfpbEci5M',
                    language: 'en',
                    components: "country:arg",
                    types: "establishment",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 }
                }}
            />
            <MapView style={StyleSheet.absoluteFill}
                initialRegion={{
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider="google"
            >
                {/*           {
                    <Marker coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                        pinColor='black' />
                } */}
                {/*      {<Marker
                        coordinate={pin}
                        image={require('../Components/Utils/puntero.png')}
                        draggable={true}
                        onDragStart={(e) => {
                            console.log("Drag Star", e.nativeEvent.coordinate)
                        }}
                        onDragEnd={(e) => {
                            setPin({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            })
                        }}
                    >
                </Marker>} */}
                {
                    travels?.map((point, index) => {
                        const orig = point.travel.orig.split("/")
                        const dest = point.travel.destination.split("/")
                        const lat = Number(orig[0])
                        const lon = Number(orig[1])
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={{
                                    latitude: lat,
                                    longitude: lon,
                                }}
                                image={require('../Components/Utils/puntero.png')}
                            >
                                <Callout tooltip>
                                    <Text>ID: {point.id}</Text>
                                    <Text>DESCRIPCION: {point.description}</Text>
                                    <Text>ORIGEN:{orig[2]}</Text>
                                </Callout>
                            </MapView.Marker>
                        )
                    }
                    )
                }
            </MapView>
            <Animated.ScrollView
                horizontal
                scrollEventThrottle={1}
                showHorizontalScrollIndicator={false}
                style={styles.scrollView}
            >
                {travels?.map((resp, index) => {
                    const orig = resp.travel.orig.split("/")
                    const dest = resp.travel.destination.split("/")
                    return (
                        <View style={styles.card} key={index}>
                            <View style={{alignItems: "center", flexDirection: "column"} }>
                                <Image source={require('./Utils/foto1.jpg')} style={styles.cardImage} />
                                <StarRating ratings={rating} reviews={rating} />
                                <Text>User: {resp.user.identification}</Text>
                            </View>
                            <View style={styles.textContent}>
                                <Text>ID: {resp.travel.id}</Text>
                                <Text>DESCRIPCION: {resp.travel.description}</Text>
                                <Text>ORIGEN:{orig[2]}</Text>
                                <Text>DESTINO:{dest[2]}</Text>
                                <Text>PESO:{resp.travel.weight}</Text>
                                <Text>PRECIO:{resp.travel.price}</Text>
                                <View style={styles.btn2}>
                                    <TouchableOpacity style={styles.btnEditar} onPress={() => navigation.navigate("StartCarrier", resp)} >
                                        <Text style={styles.textBtn}> Ofrecer Servicio</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                })}

            </Animated.ScrollView>

        </View >
    );
}


export default ScreenMap;


const styles = StyleSheet.create({
    container: {
        marginTop: 0, flex: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    btnEditar: {
        backgroundColor: "#FFC107",
        borderRadius: 10,
        width: 150,
        height: 50,
        marginTop: 20,
        alignSelf: "center",
        marginBottom: 20,
        marginRight: 30,
    },
    textBtn: {
        color: "white",
        fontSize: 17,
        alignSelf: "center",
        marginTop: 12,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    cardImage: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 400,
        width: 250,
        overflow: "hidden",
    },

});