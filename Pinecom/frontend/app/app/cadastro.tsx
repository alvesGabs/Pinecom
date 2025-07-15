import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import getIP from "./ip";

const styles = StyleSheet.create({
  viewMain: { flex: 1, backgroundColor: 'black', paddingTop: 50, paddingHorizontal: 20},
  header: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 20},
  title: { color: 'white', fontSize: 40, marginBottom: 42, textAlign: 'center'},
  containerInput: { width: '100%', maxWidth: 400, alignSelf: 'center'},
  input: { color: '#989898', backgroundColor: '#1A1A1A', width: '100%', padding: 13, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10},
  buttonText : {color: "#000", fontWeight: "bold", fontSize: 18,},
  button: { width: '100%', padding: 13, paddingHorizontal: 20, borderRadius: 10, marginTop: 15, backgroundColor: 'white', alignItems: 'center', shadowOpacity: 0.3, shadowColor: 'black', shadowOffset: { width: 0, height: 4 }, shadowRadius: 4},
});

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const ip = getIP();

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

  const updateContent = (key: string, content: string, setterFunction: Function) => {
    setterFunction(content);
    storeData(key, content);
  };

  const register = async () => {
    if (senha == confirmarSenha){
      const user = {
        name: nome,
        email: email,
        cpf: cpf,
        password: senha
      };
      const response = await axios.post("http://"+ip+":5000/register-client", user);
      if (response.data.status == "ok") {
        alert("criado");
        router.push("/");
      };
    }else{
      setNome("");
      setEmail("");
      setCpf("");
      setSenha("");
      setConfirmarSenha("");
    }
  }

  useEffect(() => {
    const loadInitialData = async () => {
      const savedNome = await getData("nome");
      if (savedNome) setNome(savedNome);
      const savedEmail = await getData("email");
      if (savedEmail) setEmail(savedEmail);
      const savedCpf = await getData("cpf");
      if (savedCpf) setCpf(savedCpf);
      const savedSenha = await getData("senha");
      if (savedSenha) setSenha(savedSenha);
      const savedConfirmarSenha = await getData("confirmarSenha");
      if (savedConfirmarSenha) setConfirmarSenha(savedConfirmarSenha);
    };

    loadInitialData();
  }, []);

  return (
    <View style={styles.viewMain}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>PIN&COM</Text>
      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholder="Nome completo" placeholderTextColor="#989898" value={nome} onChangeText={(value) => updateContent("nome", value, setNome)}/>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#989898" keyboardType="email-address" value={email} onChangeText={(value) => updateContent("email", value, setEmail)}/>
        <TextInput style={styles.input} placeholder="CPF" placeholderTextColor="#989898" value={cpf} onChangeText={(value) => updateContent("cpf", value, setCpf)}/>
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#989898" secureTextEntry value={senha} onChangeText={(value) => updateContent("senha", value, setSenha)}/>
        <TextInput style={styles.input} placeholder="Confirme a senha" placeholderTextColor="#989898" secureTextEntry value={confirmarSenha} onChangeText={(value) => updateContent("confirmarSenha", value, setConfirmarSenha)}/>

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}