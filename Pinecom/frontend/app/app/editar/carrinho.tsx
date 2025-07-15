import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useCart } from "../detalhes/contextoCarrinho";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Carrinho() {
  const { carrinho, limparCarrinho } = useCart();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Carrinho de Compras</Text>
      </View>

      {carrinho.map((item, i) => (
        <View key={i} style={styles.item}>
          <Text style={styles.name}>{item.nome}</Text>
        </View>
      ))}

      {carrinho.length > 0 ? (
        <>
<TouchableOpacity
  style={styles.checkoutBtn}
  onPress={() => {
    limparCarrinho();
    router.push("/editar/compra");
  }}
>
  <Text style={styles.checkoutText}>Finalizar Compra</Text>
</TouchableOpacity>

          <TouchableOpacity onPress={limparCarrinho}>
            <Text style={styles.clearText}>Limpar Carrinho</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20},
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20},
  title: { fontSize: 20, fontWeight: "bold", color: "#FFF", marginLeft: 10},
  item: { flexDirection: "row", alignItems: "center", marginBottom: 15},
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10},
  name: { color: "#FFF", fontSize: 16},
  checkoutBtn: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, marginTop: 20},
  checkoutText: { color: "#FFF", fontWeight: "bold", textAlign: "center"},
  clearText: { color: "red", textAlign: "center", marginTop: 10},
  emptyText: {color: "#999",marginTop: 20},
});
