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
import StarRating from "react-native-star-rating";
import HeaderBar from "../Utils/HeaderBar";
import { reviewUsuario } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
// prueba para las screens responsive
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

const StartUser = (props) => {
  const dispatch = useDispatch();
  // const data = props.route.params
  const navigation = useNavigation();

  const [review, setReview] = useState({
    rating: "",
    description: "",
  });

  const handelChangeRating = (rating) => {
    setReview({
      ...review,
      rating: rating,
    });
  };
  const handelChangeDescription = (description) => {
    setReview({
      ...review,
      description: description,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // en un objeto pongo lo que tengo en el estado inicial
    const obj = {
      idTravel: props.route.params,
      Carrrier_raiting: review.rating,
      Carrier_comment: review.description,
    };
    //Validaciones:

    // if (!obj.User_raiting || obj.User_raiting === 0 ) {
    //   alert('tiene que poner un rating')
    //   // changeModalVisible5(true)
    //   return;
    // }
    // if (!obj.description) {
    //   alert('tiene que poner una descripcion')
    // //   changeModalVisible6(true)
    //   return;
    // }

    dispatch(reviewUsuario(obj));
    console.log("Estoy enviado", obj);
    setReview({
      rating: "",
      description: "",
    });
    navigation.navigate("ProfileUserScreen");
    //cuando se cumpla que respuesta != null
    //haga un console.log(respuesta)
  };

  return (
    //Container Start
    <SafeAreaView style={{ backgroundColor: "#f3f3f3" }}>
      <View style={{ backgroundColor: "#7952B3", marginTop: wp('2%'), height: hp('10%') }}>
        <Text
          style={{
            color: "white",
            display: "flex",
            alignSelf: "center",
            fontSize: hp('3.2%'),
            fontWeight: "bold",
            marginTop: wp('5%'),
          }}
        >
          ¡El viaje ha finalizado!
        </Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            marginTop: wp('20%'),
            fontSize: hp('2.7%'),
            fontWeight: "bold",
          }}
        >
          Califica al Conductor
        </Text>
        <View style={{ width: hp('35%'), alignSelf: "center", margin: wp('5%')}}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={Number(review.rating)}
            selectedStar={(rating) => handelChangeRating(rating)}
            fullStarColor="purple"
          />
        </View>

        <View style={{width: wp('90%'), height: hp('40%'), padding: wp('5%')}}>
        <TextInput
            value={review.description}
            onChangeText={(name) => handelChangeDescription(name)}
            name="description"
            placeholder="Description*"
            style={styles.TextInputt}
          ></TextInput>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "space-around",
                height: hp('7%'),
                width: wp("88%"),
                backgroundColor: "orange",
                borderRadius: 10,
              }}
            >
              <Text style={styles.aceptar}>Enviar </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 13, height: '140%', width: '40%', backgroundColor: 'orange', borderRadius: 10 }}
            onPress={() => navigation.navigate('ProfileUserScreen')}
            >

              <Text style={styles.rechazar}>Rechazar</Text>

            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartUser;

const styles = StyleSheet.create({
  botones: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  aceptar: {
    alignSelf: "center",
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  rechazar: {
    alignSelf: "center",
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  brandView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandViewText: {
    color: "#FFC107",
    fontSize: 45,
    fontWeight: "bold",
    textTransform: "uppercase",
    // justifyContent:'flex-start'
  },
  bottonView: {
    flex: 1.5,
    backgroundColor: "#ffffffff",
    bottom: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -10,
  },
  TextInputt: {
    alignItems: "flex-end",
    width: "110%",
    height: "40%",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: "black",
  },
  Button: {
    width: "90%",
    color: "#FFC107",
    height: 52,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  SingUpText: {
    color: "#7952B3",
    fontSize: 20,
  },
  TextButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  preg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pregunta: {
    color: "red",
  },
});
