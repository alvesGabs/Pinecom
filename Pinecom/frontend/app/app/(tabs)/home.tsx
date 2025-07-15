import { Link, router } from "expo-router";
import { View, TouchableOpacity, FlatList, ScrollView, StyleSheet, Image, TextInput} from "react-native";
import { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { useCart } from "../detalhes/contextoCarrinho";
import axios from "axios";
import getIP from "../ip";

const STORAGE_KEY = "@search_history";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, paddingTop: 60 },
  searchContainer: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 25, paddingHorizontal: 15, alignItems: "center", marginBottom: 15, height: 40},
  searchInput: { flex: 1, fontSize: 16, color: "#000", paddingVertical: 0},
  searchIcon: { fontSize: 18, marginLeft: 10, color: "#666"},
  historyItem: { backgroundColor: "#222", padding: 10, borderBottomColor: "#444", borderBottomWidth: 1},
  historyText: { color: "#FFF"},
  clearHistoryBtn: { padding: 10, backgroundColor: "#007bff", marginVertical: 10, borderRadius: 5, alignSelf: "center"},
  clearHistoryText: { color: "#FFF", fontWeight: "bold"},
  banner: { height: 200, borderRadius: 12, marginBottom: 20, justifyContent: "center", alignItems: "center", backgroundColor: "rgb(167 40 153)"},
  bannerText: { fontSize: 24, fontWeight: "bold", color: "#FFF"},
  sectionTitle: { color: "#FFF", fontSize: 20, fontWeight: "bold", marginBottom: 10},
  circle: { width: 80, height: 80, backgroundColor: "rgb(167 40 153)", borderRadius: 35, justifyContent: "center", alignItems: "center", padding: 5, marginRight: 15},
  circleText: { color: "#FFF", fontSize: 10, textAlign: "center", marginTop: 4},
  card: { backgroundColor: "#1A1A1A", width: 120, height: 210, borderRadius: 10, padding: 10, justifyContent: "center", alignItems: "center", marginRight: 15},
  cardImage: { width: "100%", aspectRatio: 0.9, borderRadius: 8, marginBottom: 8},
  cardText: { color: "#FFF", fontSize: 14, fontWeight: "bold", textAlign: "center"},
  largeBlock: { backgroundColor: "rgb(167 40 153)", height: 150, borderRadius: 10, borderWidth: 1, marginBottom: 30, justifyContent: "center", alignItems: "center"},
  largeBlockText: { color: "white", fontSize: 18, fontWeight: "bold"},
});

export default function Home() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const id_products = ["1","2","3"];
  const [produtos, setProdutos] = useState([
    {id: "1", nome: "Bota Preta Masculina – Tamanho 47", imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQqGFGvWCBgS6EJ-2K27PeCqs7qiZDzp71EIlYfjVPBrRLjC7l1897aKVGPbQntAAXUimru0DrQ7SSeUcSVHUmXvneHDlQctzEDu1hhNkFKzJKCZRy3v_pDEclT9NO9uh1H9l4Z1wFHog&usqp=CAc"},
    {id: "2", nome: "Bicicleta Adulto – Azul Ciano", imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSS3YykU3V6nfkjIdFv8SS_drbF5Msp2RICl2DNKhbYTr2gX6d52dBnsw7T4J_s411GCLo-ISA0Lb3Hd8mBw6kygcQSGyqYIG7Bp4hbDYHIyfL7Iv4AeWK53966bCOqnlBRwvopKNlZn-g&usqp=CAc"},
    {id: "3", nome: "iPhone X – 64GB", imagem: "https://i5.walmartimages.com/seo/Restored-Apple-iPhone-X-64GB-Space-Gray-Sprint-Refurbished_44fdb555-bb58-4d20-87c3-7446d3e07da9.b635cca32fd343d2149ad5da5b9c1b0b.jpeg"}
  ])
  const ip = getIP();

  // Dentro do componente Home
  const { carrinho } = useCart();

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
  
  const setup = async () => {
    let id = 1;
    let produtos_local = produtos;
    while(id <= 3){
      let response = await axios.post("http://"+ip+":5000/get-product", {product_id: String(id)});
      console.log(response);
      produtos_local.push({
        id: String(id),
        nome: response.data.product_name,
        imagem: response.data.product_image
      });
      id++;
    };
    produtos.shift();
    setProdutos(produtos_local);
  };
  
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setHistory(JSON.parse(data));
    });
    setup();
  }, []);

  async function saveHistory(newHistory: string[]) {
    setHistory(newHistory);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  }

  function addToHistory(term: string) {
    if (!term.trim()) return;
    let newHistory = [term, ...history.filter((h) => h !== term)];
    if (newHistory.length > 10) newHistory = newHistory.slice(0, 10);
    saveHistory(newHistory);
  }

  function onSubmitSearch() {
    addToHistory(search);
    setShowHistory(false);
    console.log("Pesquisar por:", search);
  }

  function onSelectHistoryItem(item: string) {
    setSearch(item);
    setShowHistory(false);
  }

  function clearHistory() {
    saveHistory([]);
  }

  const categorias = [
    { nome: "Eletrônicos", imagem: "https://cdn-icons-png.flaticon.com/128/2413/2413334.png" },
    { nome: "Moda", imagem: "https://cdn-icons-png.flaticon.com/128/1198/1198409.png" },
    { nome: "Casa", imagem: "https://cdn-icons-png.flaticon.com/512/263/263115.png" },
    { nome: "Brinquedos", imagem: "https://cdn-icons-png.flaticon.com/128/1687/1687878.png" },
    { nome: "Esportes", imagem: "https://cdn-icons-png.flaticon.com/512/833/833472.png" },
  ];

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Olá, {getData("name")}!</Text>
        <TouchableOpacity onPress={() => router.push("/editar/carrinho")} style={{ position: 'relative' }}>
          <Ionicons name="cart-outline" size={28} color="#fff" />
          {carrinho.length > 0 && (
            <View style={{
              position: 'absolute',
              top: -5,
              right: -10,
              backgroundColor: 'red',
              borderRadius: 10,
              paddingHorizontal: 5,
              paddingVertical: 1,
            }}>
              <Text style={{ color: 'white', fontSize: 10 }}>{carrinho.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar produtos, marcas e muito mais..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          returnKeyType="search"
          onSubmitEditing={onSubmitSearch}
        />
        <TouchableOpacity onPress={onSubmitSearch}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {showHistory && history.length > 0 && (
        <View
          style={{
            maxHeight: 200,
            backgroundColor: "#111",
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <FlatList
            data={history}
            keyExtractor={(item, i) => item + i}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onSelectHistoryItem(item)} style={styles.historyItem}>
                <Text style={styles.historyText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity onPress={clearHistory} style={styles.clearHistoryBtn}>
                <Text style={styles.clearHistoryText}>Limpar Histórico</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <Link href={{ pathname: "/detalhes/[id]", params: { id: "1234" } }} asChild>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Super Ofertas!</Text>
        </View>
      </Link>

      <Text style={styles.sectionTitle}>Categorias em Destaque</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {categorias.map((cat, i) => (
          <View key={i} style={styles.circle}>
            <Image source={{ uri: cat.imagem }} style={{ width: 30, height: 30 }} resizeMode="contain" />
            <Text style={styles.circleText}>{cat.nome}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Mais Vendidos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {produtos.map((produto, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(`/detalhes/${produto.id}`)}
          >
            <View style={styles.card}>
              {produto.imagem ? (
                <Image source={{ uri: produto.imagem }} style={styles.cardImage} resizeMode="cover" />
              ) : (
                <View
                  style={[
                    styles.cardImage,
                    { backgroundColor: "#333", justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  <Text style={{ color: "#999", fontSize: 12 }}>Imagem não disponível</Text>
                </View>
              )}
              <Text style={styles.cardText}>{produto.nome}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.largeBlock}>
        <Text style={styles.largeBlockText}>Explore mais categorias</Text>
      </View>
    </ScrollView>
  );
}
