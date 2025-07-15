import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import CustomLightTheme from "./theme";
import { CartProvider } from "./detalhes/contextoCarrinho";

export default function RootLayout() {
  return (
    <CartProvider>
      <PaperProvider theme={CustomLightTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="cadastro" />
          <Stack.Screen name="tabs" />
          <Stack.Screen name="carrinho" />
          <Stack.Screen name="teste_login" />
        </Stack>
      </PaperProvider>
    </CartProvider>
  );
}
