import { Link, router } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  mainView: { flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 20},
  titulo: { color: "white", fontSize: 40, marginBottom: 42, textAlign: "center"},
  containerInput: { width: "90%", maxWidth: 400, alignItems: "flex-start" },
  input: { color: "white", backgroundColor: "white", width: "100%", padding: 13, paddingHorizontal: 20, borderRadius: 10, marginBottom: 10},
  checkoutBtn: { width: "100%", padding: 13, paddingHorizontal: 20, borderRadius: 10, marginTop: 15, backgroundColor: "#B20000", alignItems: "center", shadowOpacity: 0.3, shadowColor: "black"},
  pinIcon: { width: 100, height: 100, marginBottom: 20},
});

export default function opcoes() {
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    router.push("/login");
  }
   return (
    <View style={styles.mainView}>
          <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/627/627495.png", 
              }}
              style={styles.pinIcon}
            />
      <View style={styles.containerInput}>
        <Link href="/editar/suporte" asChild>
          <TouchableOpacity style={styles.input}>
            <Text>SUPORTE</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={logout} style={styles.checkoutBtn}>
          <Text>SAIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
