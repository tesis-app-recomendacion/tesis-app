// app/(tabs)/_layout.js
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthContext } from "../../context/AuthContext";

export default function TabLayout() {
  const { user } = useContext(AuthContext);

  return (
    <PaperProvider>
    <Tabs>
      <Tabs.Screen
        name="recomendador"
        options={{
          title: "Recomendador",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb-outline" size={size} color={color} />
          ),
        }}
      />

      {user && (
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Mi cuenta",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      {user && (
        <Tabs.Screen
          name="favorite"
        options={{
          title: 'Mi Lista',
          tabBarIcon: ({ color, size }) => <Ionicons name="apps-outline" size={size} color={color} />,
        }}
        />
      )}

      <Tabs.Screen
        name="colaboration"
        options={{
          title: "Colaborar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    </PaperProvider>
  );
}
