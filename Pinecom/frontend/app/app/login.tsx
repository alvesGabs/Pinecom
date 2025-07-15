import { View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { Text } from "react-native-paper";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Authenticator} from "./biometricScreen";
import getIP from "./ip";

export default function Login(props: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const ip = getIP();
  const [bio, setBio] = useState(false);

  const storeData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
    }
  };

  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Erro ao recuperar dados:", e);
      return null;
    }
  };

  const updateContent = (key: string, content: string) => {
    storeData(key, content);
  };

  const verifyLogin = async () => {
    const user = {
      email: email,
      password: senha,
      type: "cliente"
    };
    const response = await axios.post("http://"+ip+":5000/login", user);
    if (!response.data.error) {
      alert(response.data.token);
      updateContent("token", response.data.token);
      const response_info = await axios.post("http://"+ip+":5000/get-my-info", {token: response.data.token});
      updateContent("name", response_info.data.user.name);
      alert(response_info.data.user.name);
      router.push("/home");
    }else{
      setEmail("");
      setSenha("");
    }
  }
  const verifyBiometric = async () => {
    if (await getData("token") != undefined || await getData("token") != null){
      Authenticator();
    };
  }
  const styles = StyleSheet.create({
    main_view: { flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20},
    pinCom: { width: 150, height: 150, marginBottom: 20},
    title: { color: "white", fontSize: 50, marginBottom: 42, textAlign: "center"},
    containerInsert: { width: "90%", maxWidth: 400, marginBottom: 20},
    getIn_container: { width: "90%", maxWidth: 400, alignSelf: "center", marginBottom: 20},
    emailPassword: { color: "#fff", backgroundColor: "#1A1A1A", width: "100%", padding: 13, paddingHorizontal: 20, borderRadius: 10, marginBottom: 15, fontSize: 16},
    registerText: { color: "#989898", marginBottom: 10,fontSize: 16},
    button: { backgroundColor: "white", padding: 13, paddingHorizontal: 20, borderRadius: 10, alignItems: "center", shadowOpacity: 0.3, shadowColor: "black", shadowOffset: { width: 0, height: 4 }, shadowRadius: 4,},
    buttonText: { color: "#000", fontWeight: "bold", fontSize: 18},
    cadastro_container: { position: "absolute", bottom: 30, flexDirection: "row", justifyContent: "center", width: "100%", paddingHorizontal: 20},
    abre_cadastro: { color: "#fff", fontWeight: "bold", textShadowColor: "black", textShadowRadius: 2, marginLeft: 5, fontSize: 16},
  });

  useEffect(() => {verifyBiometric()}, []);

  return (
    <View style={styles.main_view}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/3577/3577899.png", 
        }}
        style={styles.pinCom}
      />

      <Text style={styles.title}>PIN&COM</Text>
      <View style={styles.containerInsert}>
        <TextInput style={styles.emailPassword} placeholder="Email" placeholderTextColor="#999" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false}/>
        <TextInput style={styles.emailPassword} placeholder="Senha" placeholderTextColor="#999" secureTextEntry value={senha} onChangeText={setSenha}/>
      </View>
      <View style={styles.getIn_container}>
        <TouchableOpacity style={styles.button} onPress={verifyLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cadastro_container}>
        <Text style={styles.registerText}>Não tem uma conta?</Text>
        <Link href="/cadastro">
          <Text style={styles.abre_cadastro}>Cadastre-se</Text>
        </Link>
      </View>
    </View>
  );
}
