import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import HeaderBar from "../Utils/HeaderBar";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { editProfileCarrier, getTravelUser } from "../../actions";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const HistorialDeViaje = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const datosUser = useSelector((store) => store.responseLog);

  //nos traemos el estado para saber si lo hicimos bien
  const dataTravels = useSelector((store) => store.travelsUser);
  //console.log('ey, lo hicimos biennnnn?', dataTravels)

  // // const travelsCarrier = useSelector((store) => store.travelsCarrier)
  // // console.log('viajes carrier', travelsCarrier)

  const idUserReg = datosUser.id;

  useEffect(() => {
    dispatch(getTravelUser(idUserReg));
  }, [dispatch]);

  const [state, setState] = useState({
    origen: "",
    destino: "",
  });

  const [userIDs, setUserIDs] = useState({
    userId: "",
    id: "",
  });

  useEffect(() => {
    if (dataTravels) {
      if (dataTravels.actualTravel) {
        const orig = dataTravels.actualTravel[0].orig.split("/");
        const dest = dataTravels.actualTravel[0].destination.split("/");
        setState({
          origen: orig[2],
          destino: dest[2],
        });
        setUserIDs({
          userId: dataTravels.actualTravel[0].userId,
          id: dataTravels.actualTravel[0].id,
        });
      }
    }
    return () => {
      setState({
        origen: "",
        destino: "",
      });
      setUserIDs({
        userId: "",
        id: "",
      });
    };
  }, [dataTravels]);

  /// --> INICIO DEL COMPONENTE <-- ///
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar screen={"null"} />
        <View style={styles.containerHeaders}>
          <Text style={{ fontSize: hp("2.5%"), fontWeight: "bold" }}>
            Historial de viajes
          </Text>
          <Text style={styles.textViajes}>
            Tus viajes realizados con sus detalles.
          </Text>
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>EN CURSO</Text>
        </View>
        {dataTravels?.actualTravel ? (
          <View style={styles.containerCards}>
            <View style={styles.cards}>
              <View style={styles.insideCard1}>
                <View>
                  <Text>
                    Descripcion del viaje:{" "}
                    {dataTravels.actualTravel[0].description}
                  </Text>
                  <View style={styles.textAling}>
                    <Text style={{ fontWeight: "bold" }}>Desde: </Text>
                    <Text>{state.origen}</Text>
                  </View>
                  <View style={styles.textAling}>
                    <Text style={{ fontWeight: "bold" }}>Hasta: </Text>
                    <Text>{state.destino}</Text>
                  </View>
                  <Text style={{ color: "green", fontWeight: "bold" }}>
                    {dataTravels.actualTravel[0].finishedTravel}
                  </Text>

                  <View style={styles.burbujaChat}>
                    <TouchableOpacity
                      style={styles.btnEditar}
                      onPress={() => navigation.navigate("TravelOn", userIDs)}
                    >
                      <Text style={styles.textVerViaje}>
                        Ver viaje
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.price}>
                      $ {dataTravels.actualTravel[0].price}
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        navigation.navigate("Chat");
                      }}
                    >
                      <Image
                        source={require("./burbuja-de-dialogo.png")}
                        style={{ width: wp("15%"), height: hp("7%") }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}

        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>ANTERIORES</Text>
        </View>
        {dataTravels.payload?.map((datos, index) => {
          const orig = datos.orig.split("/");
          const dest = datos.destination.split("/");
          return (
            <View key={index}>
              <View style={styles.containerCards}>
                <View style={styles.cards}>
                  <View style={styles.insideCard}>
                    <Text>Descripcion del viaje: {datos.description}</Text>
                    <Text>Peso en toneladas: {datos.weight}</Text>
                    <Text>{orig[2]}</Text>
                    <Text>{dest[2]}</Text>
                    <Text style={styles.textFinished}>
                      {datos.finishedTravel}
                    </Text>
                    <Text style={styles.price}>$ {datos.price}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HistorialDeViaje;

const styles = StyleSheet.create({
  containerCards: {
    flex: 1,
    width: wp("95%"),
    marginHorizontal: wp("2.5%"),
    marginTop: wp("1%"),
    paddingBottom: wp("2.75%"),
  },
  containerHeaders: {
    flex: 1,
    marginLeft: wp("5%"),
    paddingBottom: wp("2%"),
  },
  btnEditar: {
    backgroundColor: "#FFC107",
    borderRadius: wp("2%"),
    width: wp("30%"),
    height: hp("4%"),
  },

  textHistorial: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
  textViajes: {
    fontSize: hp("1.75%"),
  },
  viewAnterior: {
    padding: wp("2%"),
    backgroundColor: "#DDDDDD", //"#FFC107",
    width: wp("95%"),
    marginLeft: wp("2%"),
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    borderColor: "#DDDDDD",
    borderBottomWidth: wp("0.55%"),
    borderTopWidth: wp("0.55%"),
  },
  textAnterior: {
    fontSize: hp("1.60%"),
    marginLeft: wp("2%"),
    fontWeight: "bold",
  },
  cards: {
    backgroundColor: "#F6F6F6",
    borderRadius: wp("3%"),
  },
  insideCard: {
    width: wp("91%"),
    padding: wp("4%"),
  },
  burbujaChat: {
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    width: wp("88%"),
  },
  textVerViaje: {
     color: 'black',
     fontWeight: "bold",
     fontSize: hp('2%'),
     textAlign: 'center',
     marginTop: wp('1%')
  },
  insideCard1: {
    width: wp("91%"),
    padding: wp("1.15%"),
    flexDirection: "row",
  },
  price: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  textFinished: {
    color: "red",
    fontWeight: "bold",
  },
  textAling: {
    flexDirection: "row",
  },
});

/*container: { flex: 1 },
  textWrapper: {
    height: hp('70%'), // 70% of height device screen
    width: wp('80%')   // 80% of width device screen
  },
  myText: {
    fontSize: hp('5%') // End result looks like the provided UI mockup
  }
});*/
