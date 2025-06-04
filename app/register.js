import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../utils/firebase";
import styles from "./styles/registerStyles";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nivelEducativo, setNivelEducativo] = useState("");
  const [area, setArea] = useState("");
  const [dispositivo, setDispositivo] = useState("");
  const [conectividad, setConectividad] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [estrategia, setEstrategia] = useState("");
  const [estadoEquipo, setEstadoEquipo] = useState("");

  const handleRegister = async () => {
    // Validar campos vacíos
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !nivelEducativo ||
      !area ||
      !dispositivo ||
      !conectividad ||
      !experiencia ||
      !estrategia ||
      !estadoEquipo
    ) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido.");
      return;
    }

    // Validar contraseñas iguales
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Éxito", "Cuenta creada correctamente");
      router.replace("/recomendador");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Correo electrónico</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <Text>Contraseña</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text>Confirmar contraseña</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text>Nivel educativo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={nivelEducativo}
          onValueChange={setNivelEducativo}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccione una opción"
            value=""
            color="#999"
            style={{ fontSize: 13 }}
          />
          <Picker.Item label="Básica Primaria" value="primaria" />
          <Picker.Item label="Secundaria" value="secundaria" />
          <Picker.Item label="Media" value="media" />
        </Picker>
      </View>

      <Text>Área de enseñanza</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={area}
          onValueChange={setArea}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccione una opción"
            value=""
            color="#999"
            style={{ fontSize: 13 }}
          />
          <Picker.Item label="Geometría" value="geometria" />
          <Picker.Item label="Álgebra" value="algebra" />
          <Picker.Item label="Estadística" value="estadistica" />
          <Picker.Item label="Trigonometría" value="trigonometria" />
        </Picker>
      </View>

      <Text>Tipo de dispositivo disponible</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dispositivo}
          onValueChange={setDispositivo}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccione una opción"
            value=""
            color="#999"
            style={{ fontSize: 13 }}
          />
          <Picker.Item label="PC" value="pc" />
          <Picker.Item label="Tablet" value="tablet" />
          <Picker.Item label="Celular" value="celular" />
        </Picker>
      </View>

      <Text>Conectividad</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={conectividad}
          onValueChange={setConectividad}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccione una opción"
            value=""
            color="#999"
            style={{ fontSize: 13 }}
          />
          <Picker.Item label="Alta" value="alta" />
          <Picker.Item label="Media" value="media" />
          <Picker.Item label="Baja" value="baja" />
          <Picker.Item label="Sin conexión" value="sin" />
        </Picker>
      </View>

      <Text>Experiencia en robótica</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={experiencia}
          onValueChange={setExperiencia}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccione una opción"
            value=""
            color="#999"
            style={{ fontSize: 13 }}
          />
          <Picker.Item label="Básica" value="basica" />
          <Picker.Item label="Intermedia" value="intermedia" />
          <Picker.Item label="Avanzada" value="avanzada" />
        </Picker>
      </View>

      <Text>Estrategias de enseñanza</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estrategia}
          onValueChange={setEstrategia}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccione una opción"
            value=""
            color="#999"
            style={{ fontSize: 13 }}
          />
          <Picker.Item label="Aprendizaje activo" value="activo" />
          <Picker.Item label="Aprendizaje colaborativo" value="colaborativo" />
          <Picker.Item label="Gamificación" value="gamificacion" />
          <Picker.Item
            label="Aprendizaje basado en problemas"
            value="problemas"
          />
        </Picker>
      </View>

      <Text>Disponibilidad y estado del equipo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estadoEquipo}
          onValueChange={setEstadoEquipo}
          style={styles.picker}
        >
          <Picker.Item
            label="Seleccione una opción"
            value=""
            color="#999"
            style={{ fontSize: 13 }}
          />
          <Picker.Item label="No disponible" value="no" />
          <Picker.Item label="Bajo" value="bajo" />
          <Picker.Item label="Medio" value="medio" />
          <Picker.Item label="Alto" value="alto" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.linkText}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
