import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth } from "../utils/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/recomendador"); // Redirige al motor si login exitoso
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Contraseña</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Ingresar" onPress={login} />
      <Button title="¿No tienes cuenta?" onPress={() => router.push("/register")} />
      <Button title="Olvidé mi contraseña" onPress={() => router.push("/reset-password")} />
    </View>
  );
}
