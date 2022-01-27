import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
//iconos
import Icon from "react-native-vector-icons/Ionicons";
//Hook para la navegacion
import { useNavigation } from "@react-navigation/core";
import ModalContraseña from "./ModalContraseña";
import HeaderBar from "../Utils/HeaderBar.js";
import ModalSuccess from "./ModalSuccess";
import SimpleModal80 from "../AlertasLog/SimpleModalchangepass";
import { desmount } from "../../actions/index.js";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CambiarContraseña = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.responseLog);
  const editPassword = useSelector((store) => store.editPassword);

  useEffect(() => {
    // console.log("cambio de pass",  editPassword);
    if (editPassword?.menssage) {
      changeModalVisible2(true);
    }
  }, [data, editPassword]);

  useEffect(() => {
    return () => {
      dispatch(desmount());
    };
  }, [dispatch]);

  /// --> ESTADO PARA EL INPUT <-- ///
  const [contraseña, setContraseña] = useState("");
  const [contraseña2, setContraseña2] = useState("");

  /// --> ESTADO PARA EL MODAL DE WARNING <-- ///
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();

  const changeModalVisible = (bool) => {
    if (contraseña === contraseña2 && contraseña != "") {
      setisModalVisible(bool);
    } else {
      changeModalVisible80(true);
    }
  };

  const setData = (data) => {
    setchooseData(data);
  };

  // CONTRASEÑA NO COINCIDEN

  const [isModalVisible80, setisModalVisible80] = useState(false);
  const [chooseData80, setchooseData80] = useState();

  const changeModalVisible80 = (bool) => {
    setisModalVisible80(bool);
  };
  const setData80 = (data) => {
    setchooseData80(data);
  };

  /// --> ESTADO PARA EL MODAL DE SUCCESS <-- ///
  const [isModalVisible2, setisModalVisible2] = useState(false);
  const [chooseData2, setchooseData2] = useState();

  const changeModalVisible2 = (bool) => {
    setisModalVisible2(bool);
  };

  const setData2 = (data) => {
    setchooseData2(data);
  };
  return (
    <View style={styles.container}>
      {/* <BOTON DE VOLVER ATRÁS */}
      <View>
        <HeaderBar screen={"null"} />
      </View>
      <View style={styles.containerImg}>
        <Image
          source={require("./contrasena2.png")}
          style={{ height: 200, width: 200 }}
        />
        <Text style={styles.textPass}>Cambiar contraseña</Text>
      </View>
      <Text style={styles.textNewContra}>Nueva contraseña</Text>

      <View style={styles.viewsInputs}>
        <TextInput
          placeholder="¡Por favor, una que no te olvides!"
          secureTextEntry={true}
          style={styles.textPlaceholder}
          onChangeText={(text) => setContraseña(text)}
        />
      </View>
      <View style={styles.viewsInputs}>
        <TextInput
          placeholder="¡Vuelve a ingresar la contraseña!"
          secureTextEntry={true}
          style={styles.textPlaceholder}
          onChangeText={(text) => setContraseña2(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.btnEditar}
        onPressIn={() => changeModalVisible(true)}
      >
        <Text style={styles.textBtn}>Cambiar</Text>
        {/* MODAL */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          nRequestClose={() => changeModalVisible(false)}
        >
          <ModalContraseña
            changeModalVisible={changeModalVisible}
            setData={setData}
            id={data.id}
            contraseña={contraseña}
          />
        </Modal>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible2}
          nRequestClose={() => changeModalVisible2(false)}
        >
          <ModalSuccess
            changeModalVisible2={changeModalVisible2}
            setData2={setData2}
          />
        </Modal>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible80}
          nRequestClose={() => changeModalVisible80(false)}
        >
          <SimpleModal80
            changeModalVisible80={changeModalVisible80}
            setData80={setData80}
          />
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  viewsInputs: {
    marginTop: wp('2%'),
    backgroundColor: "#EAEAEA",
    height: 55,
    width: "85%",
    marginBottom: 15,
    borderRadius: 15,
    marginLeft: 30,
  },
  textPlaceholder: {
    fontSize: 17,
    marginTop: 12,
    textAlign: "center",
  },
  containerImg: {
    alignContent: "center",
    alignItems: "center",
    marginTop: wp('3%'),
  },
  textNewContra: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textPass: {
    marginTop: 27,
    marginBottom: 45,
    fontSize: 25,
    fontWeight: "bold",
  },
  btnEditar: {
    alignSelf: "center",
    backgroundColor: "#FFC107",
    borderRadius: 10,
    width: wp('86%'),
    height: hp('7%'),
    marginTop: wp('3.5%'),
  },
  textBtn: {
    color: "white",
    fontSize: 19,
    alignSelf: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});

export default CambiarContraseña;
