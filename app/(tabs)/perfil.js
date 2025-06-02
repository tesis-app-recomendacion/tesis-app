import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function Perfil() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Información personal</Text>

      <Input label="Correo electrónico" placeholder="usuario@email.com" icon="mail" />
      <Input label="Contraseña" placeholder="********" icon="lock-closed" secure />
      <Input label="Nivel educativo" placeholder="Secundaria / Universitario" icon="school" />
      <Input label="Área de enseñanza" placeholder="Tecnología / Ciencias" icon="book" />
      <Input label="Experiencia en robótica" placeholder="Básica / Intermedia / Avanzada" icon="construct" />
      <Input label="Estrategias de enseñanza" placeholder="Proyectos, retos, etc." icon="bulb" />

      <Text style={styles.title}>🏫 Recursos tecnológicos disponibles</Text>

      <Input label="Tipo de dispositivo disponible" placeholder="Computador / Tablet / Celular" icon="laptop" />
      <Input label="Conectividad" placeholder="Estable / Intermitente / Sin conexión" icon="wifi" />
      <Input label="Estado del equipo de cómputo" placeholder="Bueno / Regular / Malo" icon="hardware-chip" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}  onPress={() => router.push("/perfil")}>Guardar cambios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}  onPress={() => router.push("/login")}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Input({ label, placeholder, icon, secure }) {
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
