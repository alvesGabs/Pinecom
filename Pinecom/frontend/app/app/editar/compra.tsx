import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Compra() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/128/3577/3577899.png" }}
        style={styles.icon}
      />
      <Text style={styles.title}>Compra Realizada com Sucesso!</Text>
      <Text style={styles.subtitle}>Seu pedido está sendo processado.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/home")}>
        <Text style={styles.buttonText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center", paddingHorizontal: 20},
  icon: { width: 100, height: 100, marginBottom: 30},
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center"},
  subtitle: { color: "#aaa", fontSize: 16, marginBottom: 30, textAlign: "center"},
  button: { backgroundColor: "#007bff", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8},
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16},
});
