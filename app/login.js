import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../utils/firebase";
import styles from "./styles/loginStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/recomendador");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Image
        source={require("../assets/icono_recombot.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>INICIO SESION</Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        {email ? (
          <Ionicons
            name="close-circle"
            size={20}
            color="gray"
            style={styles.iconRight}
            onPress={() => setEmail("")}
          />
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {password ? (
          <Ionicons
            name="close-circle"
            size={20}
            color="gray"
            style={styles.iconRight}
            onPress={() => setPassword("")}
          />
        ) : null}
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/reset-password")}>
        <Text style={{ marginTop: 8, color: "#4A148C", fontWeight: "bold" }}>
          Olvidé mi contraseña
        </Text>
      </TouchableOpacity>
    </View>
  );
}
