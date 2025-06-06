import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../utils/firebase";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nivelEducativo, setNivelEducativo] = useState("");
  const [area, setArea] = useState("");
  const [dispositivo, setDispositivo] = useState("");
  const [conectividad, setConectividad] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [estrategias, setEstrategias] = useState("");
  const [estadoEquipo, setEstadoEquipo] = useState("");

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !nivelEducativo ||
      !area ||
      !dispositivo ||
      !conectividad ||
      !experiencia ||
      !estrategias ||
      !estadoEquipo
    ) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const db = getDatabase();
      const userRef = ref(db, 'users/' + uid);

      await set(userRef, {
        email,
        nivelEducativo,
        area,
        dispositivo,
        conectividad,
        experiencia,
        estrategias,
        estadoEquipo
      });

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
          <Picker.Item label="Seleccione una opción" value="" color="#999" style={{ fontSize: 13 }} />
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
          <Picker.Item label="Seleccione una opción" value="" color="#999" style={{ fontSize: 13 }} />
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
          <Picker.Item label="Seleccione una opción" value="" color="#999" style={{ fontSize: 13 }} />
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
          <Picker.Item label="Seleccione una opción" value="" color="#999" style={{ fontSize: 13 }} />
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
          <Picker.Item label="Seleccione una opción" value="" color="#999" style={{ fontSize: 13 }} />
          <Picker.Item label="Básica" value="basica" />
          <Picker.Item label="Intermedia" value="intermedia" />
          <Picker.Item label="Avanzada" value="avanzada" />
        </Picker>
      </View>

      <Text>Estrategias de enseñanza</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estrategias}
          onValueChange={setEstrategias}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una opción" value="" color="#999" style={{ fontSize: 13 }} />
          <Picker.Item label="Aprendizaje activo" value="activo" />
          <Picker.Item label="Aprendizaje colaborativo" value="colaborativo" />
          <Picker.Item label="Gamificación" value="gamificacion" />
          <Picker.Item label="Aprendizaje basado en problemas" value="problemas" />
        </Picker>
      </View>

      <Text>Disponibilidad y estado del equipo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estadoEquipo}
          onValueChange={setEstadoEquipo}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione una opción" value="" color="#999" style={{ fontSize: 13 }} />
          <Picker.Item label="No disponible" value="no" />
          <Picker.Item label="Bajo" value="bajo" />
          <Picker.Item label="Medio" value="medio" />
          <Picker.Item label="Alto" value="alto" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignItems: 'center', marginTop: 12 ,paddingBottom:30 }} onPress={() => router.replace("/login")}>
        <Text style={{ color: '#4A148C', fontWeight: "bold" }}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    color: '#000',
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    color: '#000',
  },
  pickerItem: {
    fontSize: 14,
    height: 60,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#7e57c2',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
