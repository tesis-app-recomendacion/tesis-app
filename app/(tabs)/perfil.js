import { Picker } from "@react-native-picker/picker";
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

const LABELS = {
  nivelEducativo: {
    "primaria": "Básica Primaria",
    "secundaria": "Secundaria",
    "media": "Media"
  },
  area: {
    "geometria": "Geometría",
    "algebra": "Álgebra",
    "estadistica": "Estadística",
    "trigonometria": "Trigonometría"
  },
  experiencia: {
    "basica": "Básica",
    "intermedia": "Intermedia",
    "avanzada": "Avanzada"
  },
  estrategias: {
    "activo": "Aprendizaje activo",
    "colaborativo": "Aprendizaje colaborativo",
    "gamificacion": "Gamificación",
    "problemas": "Aprendizaje basado en problemas"
  },
  dispositivo: {
    "pc": "PC",
    "tablet": "Tablet",
    "celular": "Celular"
  },
  conectividad: {
    "alta": "Alta",
    "media": "Media",
    "baja": "Baja",
    "sin": "Sin conexión"
  },
  estadoEquipo: {
    "no": "No disponible",
    "bajo": "Bajo",
    "medio": "Medio",
    "alto": "Alto"
  }
};

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

  useEffect(() => {
    if (authLoaded && !user) {
      router.replace("/login");
    }
  }, [authLoaded, user]);

  useEffect(() => {
    if (!authLoaded || !user) return;

    const db = getDatabase();
    const uid = user.uid;
    const userRef = ref(db, 'users/' + uid);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Datos obtenidos de Firebase:", data); 
      if (data) {
        setPerfil(prev => ({
          ...prev,
          email: data.email || '',
          nivelEducativo: data.nivelEducativo || '',
          area: data.area || '',
          experiencia: data.experiencia || '',
          estrategias: data.estrategias || '',
          dispositivo: data.dispositivo || '',
          conectividad: data.conectividad || '',
          estadoEquipo: data.estadoEquipo || '',
        }));
      }
    });

    return () => unsubscribe();
  }, [authLoaded, user]);

  if (!authLoaded || !user) return null;

  const validarCampos = () => {
    const campos = Object.values(perfil).filter((_, idx) => idx !== 0); // omit email
    if (campos.some(campo => campo === '')) {
      Alert.alert("Error", "Por favor completa todos los campos antes de guardar.");
      return false;
    }
    return true;
  };

  const guardarCambios = () => {
    if (!validarCampos()) return;

    const uid = user.uid;
    const db = getDatabase();
    const userRef = ref(db, 'users/' + uid);

    update(userRef, perfil)
      .then(() => Alert.alert("Perfil actualizado"))
      .catch((err) => Alert.alert("Error al guardar", err.message));
  };

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    } catch (error) {
      Alert.alert("Error al cerrar sesión", error.message);
    }
  };

  const updateField = (field, value) => {
    setPerfil(prev => ({ ...prev, [field]: value }));
  };

  const renderPicker = (label, field) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={perfil[field]}
          onValueChange={value => updateField(field, value)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Seleccione una opción" value="" color="#999" />
          {Object.entries(LABELS[field]).map(([val, label]) => (
            <Picker.Item key={val} label={label} value={val} />
          ))}
        </Picker>
      </View>
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Información personal</Text>
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        value={perfil.email}
        editable={false}
        style={styles.input}
      />

      {renderPicker("Nivel educativo", "nivelEducativo")}
      {renderPicker("Área de enseñanza", "area")}
      
      {renderPicker("Experiencia en robótica", "experiencia")}
      {renderPicker("Estrategias de enseñanza", "estrategias")}

      <Text style={styles.title}>🏫 Recursos tecnológicos disponibles</Text>
      {renderPicker("Tipo de dispositivo disponible", "dispositivo")}
      {renderPicker("Disponibilidad y estado del equipo", "estadoEquipo")}
      {renderPicker("Conectividad", "conectividad")}
      <TouchableOpacity style={styles.button} onPress={guardarCambios}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={cerrarSesion}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
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
