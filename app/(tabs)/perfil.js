import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../utils/firebase";

export default function Perfil() {
  const { user, authLoaded } = useContext(AuthContext);

  const [perfil, setPerfil] = useState({
    email: '',
    nivelEducativo: '',
    area: '',
    experiencia: '',
    estrategias: '',
    dispositivo: '',
    conectividad: '',
    estadoEquipo: '',
  });

  // Redirección segura cuando no hay usuario
  useEffect(() => {
    if (authLoaded && !user) {
      router.replace("/login");
    }
  }, [authLoaded, user]);

  // Cargar datos del perfil desde Firebase
  useEffect(() => {
    const db = getDatabase();
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const userRef = ref(db, 'users/' + uid);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPerfil({
          email: data.email || '',
          nivelEducativo: data.nivelEducativo || '',
          area: data.area || '',
          experiencia: data.experiencia || '',
          estrategias: data.estrategias || '',
          dispositivo: data.dispositivo || '',
          conectividad: data.conectividad || '',
          estadoEquipo: data.estadoEquipo || '',
        });
      }
    });

    return () => unsubscribe();
  }, [authLoaded, user]);

  // Evita renderizar mientras no haya cargado Auth o user no válido
  if (!authLoaded || !user) {
    return null;
  }

  const guardarCambios = () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const db = getDatabase();
    const userRef = ref(db, 'users/' + uid);

    update(userRef, perfil)
      .then(() => Alert.alert("Perfil actualizado"))
      .catch((err) => Alert.alert("Error al guardar", err.message));
  };

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      // Esperar un tick para salir del ciclo de render antes de redirigir
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    } catch (error) {
      Alert.alert("Error al cerrar sesión", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Información personal</Text>

      <Input label="Correo electrónico" icon="mail" value={perfil.email} editable={false} />
      <Input label="Nivel educativo" icon="school" value={perfil.nivelEducativo} onChangeText={(text) => setPerfil({ ...perfil, nivelEducativo: text })} />
      <Input label="Área de enseñanza" icon="book" value={perfil.area} onChangeText={(text) => setPerfil({ ...perfil, area: text })} />
      <Input label="Experiencia en robótica" icon="construct" value={perfil.experiencia} onChangeText={(text) => setPerfil({ ...perfil, experiencia: text })} />
      <Input label="Estrategias de enseñanza" icon="bulb" value={perfil.estrategias} onChangeText={(text) => setPerfil({ ...perfil, estrategias: text })} />

      <Text style={styles.title}>🏫 Recursos tecnológicos disponibles</Text>

      <Input label="Tipo de dispositivo disponible" icon="laptop" value={perfil.dispositivo} onChangeText={(text) => setPerfil({ ...perfil, dispositivo: text })} />
      <Input label="Conectividad" icon="wifi" value={perfil.conectividad} onChangeText={(text) => setPerfil({ ...perfil, conectividad: text })} />
      <Input label="Estado del equipo de cómputo" icon="hardware-chip" value={perfil.estadoEquipo} onChangeText={(text) => setPerfil({ ...perfil, estadoEquipo: text })} />

      <TouchableOpacity style={styles.button} onPress={guardarCambios}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Input({ label, placeholder, icon, secure, value, onChangeText, editable = true }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={secure}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
        />
      </View>
    </View>
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
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
