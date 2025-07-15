import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarStyle: { backgroundColor: 'black' },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    }}>

      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="opcoes"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name = "detalhes/[id]"/>

    </Tabs>
  );
}
