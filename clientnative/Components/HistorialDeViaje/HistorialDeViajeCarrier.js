import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity
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
import { getTravelCarrier } from "../../actions";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

const HistorialDeViajeCarrier = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const datosCarrier = useSelector((store) => store.responseLog);

  //   //nos traemos el estado para saber si lo hicimos bien
  //   const dataTravels = useSelector((store) => store.travelsUser.payload);
  //   // console.log('ey, lo hicimos bien?', dataTravels)

  const travelsCarrier = useSelector((store) => store.travelsCarrier);
  console.log("viajes carrier", travelsCarrier);

  const idUserReg = datosCarrier.id;
  useEffect(() => {
    dispatch(getTravelCarrier(idUserReg));
  }, [dispatch]);


 const [state, setState] = useState({
    origen: '',
    destino: '',
  })

  const [userIDs, setUserIDs] = useState({
    carrierId: '',
    id: '',
  })

  console.log("ESTE ES EL STATE", state)


  useEffect(() => {
    if (travelsCarrier) {
      if (travelsCarrier.actualTravel) {
        const orig = travelsCarrier.actualTravel[0].orig.split('/')
        const dest = travelsCarrier.actualTravel[0].destination.split('/')
        setState({
          origen: orig[2],
          destino: dest[2],
        });
        setUserIDs({
          carrierId: travelsCarrier.actualTravel[0].carrierId,
          id: travelsCarrier.actualTravel[0].id,
        })
      }
    }
    return () => {
      setState({
        origen: '',
        destino: '',
      })
      setUserIDs({
        carrierId: '',
        id: '',
      })
    };
  }, [travelsCarrier]);


  /// --> INICIO DEL COMPONENTE <-- ///
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar screen={'null'} />
        <View style={styles.containerHeaders}>
          <Text style={{ fontSize: hp("2.5%"), fontWeight: "bold" }}>
            Historial de viajes
          </Text>
          <Text style={{ fontSize: hp("1.75%") }}>
            Tus viajes realizados con sus detalles.
          </Text>
        </View>
        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>EN CURSO</Text>
        </View>
        {/* DESDE ACA EMPEZARIA LA PARTE DE VIAJE EN CURSO */}
       {
         
         travelsCarrier.actualTravel ? <View style={styles.containerCards}>
         <View style={styles.cards}>
           <View style={styles.insideCard1}>
             <View>
               <Text>{ travelsCarrier.actualTravel[0].description}</Text>
               <View style={styles.textAling}>
                    <Text style={{ fontWeight: 'bold' }}>Desde: </Text>
                    <Text>{state.origen}</Text>
                  </View>
                  <View style={styles.textAling}>
                    <Text style={{ fontWeight: 'bold' }}>Hasta: </Text>
                    <Text>{state.destino}</Text>
                  </View>
               <Text style={{ color: "green", fontWeight: "bold" }}>
                 {travelsCarrier.actualTravel[0].finishedTravel}
               </Text>
               <TouchableOpacity onPress={() => navigation.navigate('TravelOn', userIDs)}>
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      Ver viaje
                    </Text>
                  </TouchableOpacity>
               <Text style={styles.price}>${travelsCarrier.actualTravel[0].price}</Text>
             </View>
             <View style={{marginTop: wp('-3%'), marginLeft: wp('11')}}>
               <TouchableWithoutFeedback
                 onPress={() => {
                   navigation.navigate("Chat");
                 }}
               >
                 <Image
                   source={require("./burbuja-de-dialogo.png")}
                   style={{ width: wp("16%"), height: hp("7%")}}
                 />
               </TouchableWithoutFeedback>
             </View>
           </View>
         </View>
       </View> : <ActivityIndicator size="large" color="#0000ff" />
       }

        <View style={styles.viewAnterior}>
          <Text style={styles.textAnterior}>ANTERIORES</Text>
        </View>
        {travelsCarrier.payload?.map((datos, index) => {
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
                    <Text style={{ color: "red", fontWeight: "bold" }}>{datos.finishedTravel}</Text>
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

export default HistorialDeViajeCarrier;

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
    padding: wp("5%"),
  },
  insideCard1: {
    width: wp("91%"),
    padding: wp("5%"),
    flexDirection: "row",

  },
  price: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: hp("2%"),
  },
  textAling: {
    flexDirection: 'row'
  },

});
