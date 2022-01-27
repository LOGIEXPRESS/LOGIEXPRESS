import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Modal } from "react-native";
import { logiarUsuario } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import StarRating from "../StarRating";
import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DatosPersonalesCarrier = (props) => {
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();
  const rating = 3;

  async function save(key, value) {
    //FUNCION PARA GUARDAR LA INFO EN EL STORE, KEY = token , VALUE=el string del token
    await SecureStore.setItemAsync(key, value);
  }

  const cerrarsesion = () =>{
    save("token", '')
    navigation.navigate('singIn')
  }

  useEffect(() => {
    //console.log("data", data)
  }, [data]);

  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <HeaderBar  screen={'null'}/>
        <Text style={styles.perfilTex}>Datos personales</Text>
      </View>
       
        <View
          style={{
            flexDirection: "row",
            alignContent: "flex-start",
            marginLeft:wp('5%'),
          }}
        >
          <View style={{ marginTop:wp ('3.90%') }}>
          <Image
              source={{
                uri:
                  data.photo !== null
                    ? data.photo
                    : "https://memoriamanuscrita.bnp.gob.pe/img/default-user.jpg",
              }}
              style={styles.userImg}
            />
          </View>
          <View style={styles.boxDatos}>
            <Text style={styles.userName}>
              {data.name} {data.lastname}
            </Text>
            <Text style={{ fontSize: 15 }}>{data.eMail}</Text>
            <Text style={{ fontSize: 15 }}>{data.location}</Text>
            <View style={{ marginTop: 2, marginStart:-5}}>
              <StarRating
                ratings={rating}
                reviews={rating}
                size={26}
              ></StarRating>
            </View>
          </View>
        </View>
        <View style={styles.botones}>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={styles.textBtn}
              onPress={() => navigation.navigate("EditProfile")}
            >
              Editar perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} 
           onPress={() => navigation.navigate("CambiarContraseña")}
            >
            <Text style={styles.textBtn}>Cambiar contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => cerrarsesion()}>
            <Text style={styles.textBtn}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DatosPersonalesCarrier;

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
   },
  perfilTex: {
    marginLeft: wp("4%"),
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  userImg: {
    marginTop: 17,
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: "#FFC107",
  },
  userName: {
    fontSize: hp('2.65%'),
    fontWeight: "bold",
    marginBottom: wp('0.1%'),
  },
  boxDatos: {
    flexDirection: "column",
    marginTop: wp('9.5'),
    marginLeft: wp('5%'),
  },
  estrellitas: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 20,
  },
  botones: {
    alignContent: "center",
    alignItems: "center",
    marginTop : wp('15%')
  },
  btn: {
    borderWidth: 4,
    backgroundColor: "#fff",
    borderColor:  "#FFC107",
    width: wp("88%"),
    height: hp("7%"),
    marginBottom: wp('7%'),
    borderRadius: wp('3%'),
    justifyContent:'center',
    shadowOpacity: 80,
    elevation: 13,
  },
  textBtn: {
    display:'flex',
    textAlign: "center",
    fontSize: hp('2.3%'),
    fontWeight: "bold",
    
  },
});
