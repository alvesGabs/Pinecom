import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"; 

export default function Suporte() {
  const abrirEmail = () => {
    Linking.openURL("mailto:suporte@pinecom.com");
  };

  const ligarTelefone = () => {
    Linking.openURL("tel:+40028922");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>SUPORTE</Text>
        <TouchableOpacity style={styles.card} onPress={abrirEmail}>
          <Feather name="mail" size={24} color="white" />
          <Text style={styles.cardText}>suporte@pincom.com</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={ligarTelefone}>
          <Feather name="phone" size={24} color="white" />
          <Text style={styles.cardText}>+55 (81) 99999-9999</Text>
        </TouchableOpacity>

        <View style={styles.sugestoes}>
          <Text style={styles.subtitulo}>Sugestões de ajuda</Text>

          <Text style={styles.sugestaoItem}>• Esqueci minha senha: Tente lembrar!</Text>
          <Text style={styles.sugestaoItem}>• Não recebi e-mail de confirmação: Então não confirme</Text>
          <Text style={styles.sugestaoItem}>• Como editar meus dados? Ah, isso daí eu fiz, só ir em gerenciar conta </Text>
          <Text style={styles.sugestaoItem}>• Aplicativo travando ou fechando: é a vida parceiro</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: "black", flex: 1},
  header: { marginBottom: 20},
  titulo: { fontSize: 36, color: "white", marginBottom: 30, textAlign: "center"},
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#1A1A1A", padding: 15, borderRadius: 10, marginBottom: 15},
  cardText: { color: "white", marginLeft: 15, fontSize: 16},
  sugestoes: { marginTop: 30},
  subtitulo: { color: "white", fontSize: 20, marginBottom: 10},
  sugestaoItem: { color: "#bbb", fontSize: 16, marginBottom: 5},
});