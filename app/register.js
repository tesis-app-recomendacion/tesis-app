import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth } from "../utils/firebase";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Éxito", "Cuenta creada correctamente");
      router.replace("/home"); // Redirige a la pantalla principal
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Correo electrónico</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />

      <Text>Contraseña</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Text>Confirmar contraseña</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button title="Registrarse" onPress={handleRegister} />
      <Button title="Ya tengo cuenta" onPress={() => router.replace("/login")} />
    </View>
  );
}
