import { View, Button} from "react-native";
import Login from "./login";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center"}}>
      <Login></Login>
    </View>
  );
}