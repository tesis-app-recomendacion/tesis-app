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
  const [conectividad, setConectividad] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [estadoEquipo, setEstadoEquipo] = useState("");

  const [areas, setAreas] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [estrategias, setEstrategias] = useState([]);

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !nivelEducativo ||
      !conectividad ||
      !experiencia ||
      !estadoEquipo ||
      areas.length === 0 ||
      dispositivos.length === 0 ||
      estrategias.length === 0
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const db = getDatabase();
      const userRef = ref(db, "users/" + uid);

      await set(userRef, {
        email,
        nivelEducativo,
        conectividad,
        experiencia,
        estadoEquipo,
        area: areas,
        dispositivo: dispositivos,
        estrategias,
      });

      Alert.alert("Éxito", "Cuenta creada correctamente");
      router.replace("/recomendador");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Confirmar contraseña</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Nivel educativo</Text>
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

      <Text style={styles.label}>Conectividad</Text>
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

      <Text style={styles.label}>Experiencia en robótica</Text>
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

      <Text style={styles.label}>Disponibilidad y estado del equipo</Text>
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

      <Text style={styles.label}>Área de enseñanza</Text>
      <View style={styles.checkboxGroup}>
        {["Geometría", "Álgebra", "Estadística", "Trigonometría"].map(
          (item) => (
            <TouchableOpacity
              key={item}
              onPress={() =>
                setAreas((prev) =>
                  prev.includes(item)
                    ? prev.filter((i) => i !== item)
                    : [...prev, item]
                )
              }
              style={styles.checkboxItem}
            >
              <Text
                style={{ color: areas.includes(item) ? "#4A148C" : "#000" }}
              >
                {areas.includes(item) ? "☑" : "☐"} {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <Text style={styles.label}>Tipo de dispositivo disponible</Text>
      <View style={styles.checkboxGroup}>
        {["PC", "Tablet", "Celular"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() =>
              setDispositivos((prev) =>
                prev.includes(item)
                  ? prev.filter((i) => i !== item)
                  : [...prev, item]
              )
            }
            style={styles.checkboxItem}
          >
            <Text
              style={{
                color: dispositivos.includes(item) ? "#4A148C" : "#000",
              }}
            >
              {dispositivos.includes(item) ? "☑" : "☐"} {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Estrategias de enseñanza</Text>
      <View style={styles.checkboxGroup}>
        {[
          "Aprendizaje activo",
          "Aprendizaje colaborativo",
          "Gamificación",
          "Aprendizaje basado en problemas",
        ].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() =>
              setEstrategias((prev) =>
                prev.includes(item)
                  ? prev.filter((i) => i !== item)
                  : [...prev, item]
              )
            }
            style={styles.checkboxItem}
          >
            <Text
              style={{ color: estrategias.includes(item) ? "#4A148C" : "#000" }}
            >
              {estrategias.includes(item) ? "☑" : "☐"} {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignItems: "center", marginTop: 12, paddingBottom: 30 }}
        onPress={() => router.replace("/login")}
      >
        <Text style={{ color: "#4A148C", fontWeight: "bold" }}>
          Ya tengo cuenta
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A148C",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    color: "#000",
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    height: 60,
    color: "#000",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#7e57c2",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxGroup: {
    marginBottom: 24,
  },
  checkboxItem: {
    paddingVertical: 6,
  },
});
