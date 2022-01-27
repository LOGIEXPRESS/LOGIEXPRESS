import React, { useState, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  YellowBox,
} from "react-native";
import StarRating from 'react-native-star-rating';
import HeaderBar from "../Utils/HeaderBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

const StartUser = (props) => {


  const data = props.route.params
  const navigation = useNavigation();

  //console.log("ESTO ES LO QUE LLEGAAAAAAAAAAA", data)

  return (
    //Container Start
    <SafeAreaView
      style={{ backgroundColor: "#f3f3f3", width: wp('100%'), height: hp('90%')}}>
      <View style={{ backgroundColor: "#7952B3", marginTop: 20, height: 60 }}>
        <Text style={{ color: 'white', display: 'flex', alignSelf: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 15 }}>Comenzar Viaje</Text>
      </View>
      <ImageBackground
        source={require("./camion2.gif")}
        style={{
          height: '45%',
          width: '60%',
          display: 'flex',
          alignSelf: 'center',
          marginLeft: 60,
          marginTop: 10,
          
        }}
      >
      </ImageBackground>
      <View>

        <Text style={{ textAlign: 'center', marginTop: -130, marginBottom: 10, fontSize: 20, fontWeight: '200' }}>Información sobre el Conductor</Text>
        {/* estrellas rating */}

        <View style={{ width: wp('45%'), alignSelf: 'center', marginBottom: 10, }}>


          <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={4}
            fullStarColor={'#7952B3'}
          ></StarRating>
          <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: '500' }}>Rating: 4/5</Text>
        </View>

        {/* NOMBRE */}
        <View style={{ height: 35, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', }}>Nombre: </Text>
          <Text style={{ fontSize: 17, fontWeight: '300' }}>{data.carrier.user_Reg.name}</Text>
        </View>
        <View style={{ height: 35, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', }}>Apellido: </Text>
          <Text style={{ fontSize: 17, fontWeight: '300' }}>{data.carrier.user_Reg.lastName}</Text>
        </View>
        {/* TELEFONO */}
        <View style={{ height: 35, marginTop: 3, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Teléfono: </Text>
          <Text style={{ fontSize: 17, fontWeight: '300' }}>{data.carrier.user_Reg.phone}</Text>
        </View>
        {/* VEHICULO */}
        <View style={{ height: 35, marginTop: 3, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Licencia: </Text>
          <Text style={{ fontSize: 17, fontWeight: '300' }}>{data.carrier.license}</Text>
        </View>
        {/* REPUTACION */}

        <View >
          <View>
            <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 20, fontWeight: '200' }}>Detalle de Pago</Text>
          </View>
          {/* MERCADOPAGO */}
          <View style={{ height: 35, marginTop: 3, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>DNI:</Text>
            <Text style={{ fontSize: 17, fontWeight: '300' }}>{data.user.identification}</Text>
          </View>
          <View style={{ height: 35, marginTop: 3, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Precio:</Text>
            <Text style={{ fontSize: 17, fontWeight: '300' }}>${data.travel.price}</Text>
          </View>
          <View style={{ height: 35, marginTop: 3, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Id del Viaje: </Text>
            <Text style={{ fontSize: 17, fontWeight: '300' }}>{data.user.id.slice(24)}</Text>
          </View>

        </View>
        <View  >

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => { navigation.navigate('PaymentApp', data) }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 13, height: '140%', width: '40%', backgroundColor: 'orange', borderRadius: 10 }}>

              <Text style={styles.aceptar}>Realizar Pago</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 13, height: '140%', width: '40%', backgroundColor: 'orange', borderRadius: 10 }}
            onPress={() => navigation.navigate('ProfileUserScreen')}
            >

              <Text style={styles.rechazar}>Rechazar</Text>

            </TouchableOpacity>

          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default StartUser;

const styles = StyleSheet.create({
  botones: {
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  aceptar: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '700'
  },
  rechazar: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '700'
  }
});