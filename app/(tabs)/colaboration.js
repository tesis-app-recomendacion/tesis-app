import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function colaboration() {
  const [form, setForm] = useState({
    nivelEducativo: '',
    areaEnsenanza: '',
    tipoDispositivo: '',
    conectividad: '',
    experienciaRobotica: '',
    estrategias: '',
    estadoEquipo: '',
    nombreSimulador: '',
    lenguaje: '',
    usabilidad: '',
    requiereInstalacion: '',
    tipoLicencia: '',
    areasEnsenanzaSimulador: '',
    personalizacion: '',
    compatibilidad: '',
    nivelEducativoSim: '',
    estrategiasSim: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* 🧑 Información del Docente */}
      <Text style={styles.sectionTitle}>🧑 Información del Docente</Text>
      <Dropdown label="Nivel educativo" selectedValue={form.nivelEducativo} onValueChange={v => handleChange('nivelEducativo', v)} options={['Primaria', 'Secundaria', 'Media', 'Universitaria']} />
      <Dropdown label="Área de enseñanza" selectedValue={form.areaEnsenanza} onValueChange={v => handleChange('areaEnsenanza', v)} options={['Tecnología', 'Ciencias', 'Matemáticas', 'Otras']} />
      <Dropdown label="Experiencia en robótica" selectedValue={form.experienciaRobotica} onValueChange={v => handleChange('experienciaRobotica', v)} options={['Ninguna', 'Básica', 'Intermedia', 'Avanzada']} />
      <Dropdown label="Estrategias de enseñanza" selectedValue={form.estrategias} onValueChange={v => handleChange('estrategias', v)} options={['Colaborativa', 'Basada en proyectos', 'Tradicional', 'Otro']} />

      {/* 🏫 Recursos Escolares */}
      <Text style={styles.sectionTitle}>🏫 Recursos Tecnológicos</Text>
      <Dropdown label="Tipo de dispositivo disponible" selectedValue={form.tipoDispositivo} onValueChange={v => handleChange('tipoDispositivo', v)} options={['Computador', 'Tablet', 'Celular', 'Ninguno']} />
      <Dropdown label="Conectividad" selectedValue={form.conectividad} onValueChange={v => handleChange('conectividad', v)} options={['Buena', 'Regular', 'Mala', 'Sin conexión']} />
      <Dropdown label="Estado del equipo de cómputo" selectedValue={form.estadoEquipo} onValueChange={v => handleChange('estadoEquipo', v)} options={['Disponible', 'Limitado', 'No disponible']} />

      {/* 🤖 Datos del Simulador Educativo */}
      <Text style={styles.sectionTitle}>🤖 Datos del Simulador Educativo</Text>
      <Dropdown label="Nombre del simulador" selectedValue={form.nombreSimulador} onValueChange={v => handleChange('nombreSimulador', v)} options={['Simulador A', 'Simulador B', 'Simulador C']} />
      <Dropdown label="Lenguaje de programación" selectedValue={form.lenguaje} onValueChange={v => handleChange('lenguaje', v)} options={['Scratch', 'Python', 'C++', 'Otro']} />
      <Dropdown label="Nivel de usabilidad" selectedValue={form.usabilidad} onValueChange={v => handleChange('usabilidad', v)} options={['Fácil', 'Intermedio', 'Avanzado']} />
      <Dropdown label="¿Requiere instalación?" selectedValue={form.requiereInstalacion} onValueChange={v => handleChange('requiereInstalacion', v)} options={['Sí', 'No']} />
      <Dropdown label="Tipo de licencia" selectedValue={form.tipoLicencia} onValueChange={v => handleChange('tipoLicencia', v)} options={['Libre', 'Pago', 'Demo']} />
      <Dropdown label="Áreas de enseñanza" selectedValue={form.areasEnsenanzaSimulador} onValueChange={v => handleChange('areasEnsenanzaSimulador', v)} options={['Tecnología', 'Ciencias', 'Matemáticas', 'Interdisciplinar']} />
      <Dropdown label="Nivel de personalización" selectedValue={form.personalizacion} onValueChange={v => handleChange('personalizacion', v)} options={['Bajo', 'Medio', 'Alto']} />
      <Dropdown label="Compatibilidad de dispositivos" selectedValue={form.compatibilidad} onValueChange={v => handleChange('compatibilidad', v)} options={['Windows', 'Android', 'iOS', 'Web']} />
      <Dropdown label="Nivel educativo" selectedValue={form.nivelEducativoSim} onValueChange={v => handleChange('nivelEducativoSim', v)} options={['Primaria', 'Secundaria', 'Media', 'Universitaria']} />
      <Dropdown label="Estrategias de enseñanza" selectedValue={form.estrategiasSim} onValueChange={v => handleChange('estrategiasSim', v)} options={['Colaborativa', 'Proyectos', 'Exploración', 'Tradicional']} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Componente para cada campo desplegable
const Dropdown = ({ label, selectedValue, onValueChange, options }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      <Picker.Item label="Seleccione una opción..." value="" />
      {options.map((opt, i) => (
        <Picker.Item label={opt} value={opt} key={i} />
      ))}
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#3e3e3e',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontWeight: '500',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    marginTop: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
