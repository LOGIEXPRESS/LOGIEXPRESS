import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { logiarUsuario } from "./../actions/index";
import { useSelector } from "react-redux";

import StarRating from "./StarRating";

const ProfileScreen = () => {
  const resptoken = useSelector((store) => store.respToken);
  const data = useSelector((store) => store.responseLog);
  const navigation = useNavigation();

  console.log("AQUI RESPONLOG EN PROFILEUSERScreen", data);
  console.log("AQUI RESPTOKEN en PROFILEUSERScreen", resptoken);

  useEffect(() => {
    //console.log("data", data);
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.perfilTex}>¡Bienvenid@s!</Text>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
           <View style={{ marginTop: 25 }}>
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
          <Text style={styles.userName}>
            {data.name} {data.lastname}
          </Text>
        </View>
        <View style={{ flex: 1, marginBottom: 90 }}>
          <TouchableOpacity
            style={styles.btnText}
            onPress={() => {
              navigation.navigate("DatosPersonalesCarrier");
            }}
          >
            <Icon name="person-circle-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Datos Personales</Text>
            <View style={{ marginLeft: 103 }}>
              <Icon name="chevron-forward-outline" style={styles.icons3} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => {
              navigation.navigate("EditVehicule");
            }}
          >
            <Icon name="bus-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Datos del vehículo</Text>
            <View style={{ marginLeft: 95 }}>
              <Icon name="chevron-forward-outline" style={styles.icons3} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnText}>
            <Icon name="location-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Historial de viajes</Text>
            <View style={{ marginLeft: 100 }}>
              <Icon name="chevron-forward-outline" style={styles.icons3} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnText}>
            <Icon name="cash-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Transacciones</Text>
            <View style={{ marginLeft: 128 }}>
              <Icon name="chevron-forward-outline" style={styles.icons3} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnText}
            onPress={() => navigation.navigate("CotizarViaje")}
          >
            <Icon name="calculator-outline" style={styles.icons} />
            <Text style={styles.userBtnTxt}>Cotizar viaje</Text>
            <Icon name="chevron-forward-outline" style={styles.icons2} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn2}
            onPress={() => navigation.navigate("ScreenMap")}
          >
            <Text style={styles.userBtnTxt2}>Comenzar viaje</Text>
            <Image
              style={{ width: 50, height: 35 }}
              source={require("./Utils/camion.png")}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  icons: {
    marginRight: 10,
    marginTop: 4,
    fontSize: 22,
  },
  icons2: {
    fontSize: 22,
    marginLeft: "45%",
    marginTop: 4,
  },
  icons3: {
    fontSize: 22,
    alignSelf: "stretch",
    marginTop: 4,
  },
  perfilTex: {
    fontSize: 19,
    fontWeight: "bold",
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  btnText: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "85%",
    height: "11%",
    padding: 10,
    paddingBottom: 10,
    borderRadius: 15,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
    borderColor: "#E1E8EB",
    borderWidth: 1.5,
  },
  btn2: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#7952B3",
    width: "85%",
    height: "15%",
    padding: 10,
    paddingBottom: 10,
    borderRadius: 15,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 25,
  },

  userImg: {
    marginTop: 10,
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 5,
    borderColor: "#7952B3",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 7,
    marginBottom: 20,
  },
  userBtnTxt: {
    marginTop: 2,
    color: "black",
    textAlign: "center",
    fontSize: 18,
    marginTop: 3,
  },
  userBtnTxt2: {
    color: "#E5E1E1",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 9,
    marginRight: 15,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
