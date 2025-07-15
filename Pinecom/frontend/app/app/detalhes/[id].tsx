import { useLocalSearchParams, router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCart } from "./contextoCarrinho";
import axios from "axios";
import getIP from "../ip";

const imagensPorId: Record<string, string> = {
  "1": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ-cm49yquMfz9JbpREYWBg10_MDiHfeLCBD3ZpmXLSChO_kOlvO2qGsmw4ewYCgzdibgwcgrhQ8wYex1o52vtsG-mdCyUYiZQsJHGkmQwa5UBR-RE4DgS5MJEhlBX2GSGxP4Iu77VDZT4&usqp=CAc",
  "2": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ9jME7UqzXYF7tR0ku3LO4BI1i8JfZ4n355bS5R2CZmCYyLGq1MIcGkQG2bNGF3_IVoHPTFCFu70XsJytQsZnInT4Fc0ZwOodvla4IB2Wdj_Z8TYWh1Z1CocD6y-iCrle_89wT6P9jBg&usqp=CAc",
  "3": "https://via.placeholder.com/300x200?text=Produto",
};

export default function DetalhesProduto() {
  const { id } = useLocalSearchParams();
  const { adicionarProduto } = useCart();
  const [mensagem, setMensagem] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const ip = getIP();

  const imagem = imagensPorId[id as string] || "https://via.placeholder.com/300x200?text=Produto";

  const handleAdicionar = () => {
    adicionarProduto({ id });
    setMensagem("Produto adicionado ao carrinho!");

    setTimeout(() => setMensagem(""), 3000);
  };
  
  const storeData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
    }
  };

  const setup = async () => {
    const response = await axios.post("http://"+ip+":5000/get-product", {product_id: String(id)});
    setName(response.data.product_name);
    setDescription(response.data.product_description);
    setImage(response.data.product_image);
    setPrice(response.data.product_price);
    storeData("product_id", String(id));
  };
  useEffect(() => {
    setup();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Imagem e Nome do Produto */}
        <View style={styles.productImageBox}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.nomeProduto}>{name}</Text>
        </View>

        {/* Preço e Ajuda */}
        <View style={styles.row}>
          <View style={styles.priceBox}>
            <Text style={styles.placeholderText}>{price}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("/editar/chat")}>
            <Ionicons name="help-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Descrição */}
        <View style={styles.descriptionBox}>
          <Text style={styles.placeholderText}>{description}</Text>
        </View>

        {/* Comentários */}
        <View style={styles.commentsBox}>
          <Text style={styles.placeholderText}>Comentários</Text>
        </View>

        {/* Mensagem de sucesso caso tente colocar no carrinho */}
        {mensagem !== "" && <Text style={styles.successMessage}>{mensagem}</Text>}

        <TouchableOpacity onPress={handleAdicionar} style={styles.addButton}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 50, paddingHorizontal: 20},
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20},
  content: {flexGrow: 1},
  productImageBox: { backgroundColor: "#222", borderRadius: 10, marginBottom: 20, padding: 10, alignItems: "center"},
  image: {width: "100%",height: 200,borderRadius: 10,marginBottom: 10,resizeMode: "cover"},
  nomeProduto: { color: "#fff", fontSize: 18, fontWeight: "bold"},
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20},
  priceBox: {flex: 1,backgroundColor: "#333",height: 40,borderRadius: 8,justifyContent: "center",alignItems: "center",marginRight: 10},
  descriptionBox: {backgroundColor: "#222",height: 120,borderRadius: 10,marginBottom: 20,justifyContent: "center",alignItems: "center", padding: 20},
  commentsBox: { backgroundColor: "#222", height: 150, borderRadius: 10, justifyContent: "center", alignItems: "center"},
  placeholderText: { color: "#aaa"},
  successMessage: { color: "#0f0", textAlign: "center", marginTop: 20, fontWeight: "bold"},
  addButton: { backgroundColor: "rgb(167 40 153)", padding: 15, borderRadius: 8, alignItems: "center", margin: 30},
});
