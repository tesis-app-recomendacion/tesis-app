import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Button, IconButton, Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Dropdown from './Dropdown';

const FiltroModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({});
  const insets = useSafeAreaInsets(); // zona segura para evitar barra inferior

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  if (!visible) return null;

  return (
    <Portal>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View />
      </Pressable>

      <SafeAreaView style={styles.modalContainer}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>🧑 Información del Docente</Text>
                <IconButton icon="close" onPress={onClose} />
              </View>

              <Dropdown label="Nivel educativo" help="Nivel de formación del docente" selectedValue={form.nivelEducativo} onValueChange={v => handleChange('nivelEducativo', v)} options={['Primaria', 'Secundaria', 'Media', 'Universitaria']} />
              <Dropdown label="Área de enseñanza" help="Área en la que enseña el docente" selectedValue={form.areaEnsenanza} onValueChange={v => handleChange('areaEnsenanza', v)} options={['Tecnología', 'Ciencias', 'Matemáticas', 'Otras']} />
              <Dropdown label="Experiencia en robótica" help="Experiencia previa en robótica educativa" selectedValue={form.experienciaRobotica} onValueChange={v => handleChange('experienciaRobotica', v)} options={['Ninguna', 'Básica', 'Intermedia', 'Avanzada']} />
              <Dropdown label="Estrategias de enseñanza" help="Método pedagógico utilizado" selectedValue={form.estrategias} onValueChange={v => handleChange('estrategias', v)} options={['Colaborativa', 'Basada en proyectos', 'Tradicional', 'Otro']} />

              <Text style={styles.title}>🏫 Recursos Tecnológicos</Text>
              <Dropdown label="Tipo de dispositivo disponible" help="Tipo de dispositivo que se puede usar en clase" selectedValue={form.tipoDispositivo} onValueChange={v => handleChange('tipoDispositivo', v)} options={['Computador', 'Tablet', 'Celular', 'Ninguno']} />
              <Dropdown label="Conectividad" help="Calidad del acceso a internet en la institución" selectedValue={form.conectividad} onValueChange={v => handleChange('conectividad', v)} options={['Buena', 'Regular', 'Mala', 'Sin conexión']} />
              <Dropdown label="Estado del equipo de cómputo" help="Disponibilidad de equipos en el aula" selectedValue={form.estadoEquipo} onValueChange={v => handleChange('estadoEquipo', v)} options={['Disponible', 'Limitado', 'No disponible']} />

              <Text style={styles.title}>🤖 Datos del Simulador Educativo</Text>
              <Dropdown label="Nombre del simulador" help="Nombre del simulador que desea utilizar" selectedValue={form.nombreSimulador} onValueChange={v => handleChange('nombreSimulador', v)} options={['Simulador A', 'Simulador B', 'Simulador C']} />
              <Dropdown label="Lenguaje de programación" help="Lenguaje que usa el simulador" selectedValue={form.lenguaje} onValueChange={v => handleChange('lenguaje', v)} options={['Scratch', 'Python', 'C++', 'Otro']} />
              <Dropdown label="Nivel de usabilidad" help="Facilidad de uso del simulador" selectedValue={form.usabilidad} onValueChange={v => handleChange('usabilidad', v)} options={['Fácil', 'Intermedio', 'Avanzado']} />
              <Dropdown label="¿Requiere instalación?" help="Si el simulador necesita ser instalado" selectedValue={form.requiereInstalacion} onValueChange={v => handleChange('requiereInstalacion', v)} options={['Sí', 'No']} />
              <Dropdown label="Tipo de licencia" help="Licencia de uso del simulador" selectedValue={form.tipoLicencia} onValueChange={v => handleChange('tipoLicencia', v)} options={['Libre', 'Pago', 'Demo']} />
              <Dropdown label="Áreas de enseñanza" help="Áreas en que se puede aplicar el simulador" selectedValue={form.areasEnsenanzaSimulador} onValueChange={v => handleChange('areasEnsenanzaSimulador', v)} options={['Tecnología', 'Ciencias', 'Matemáticas', 'Interdisciplinar']} />
              <Dropdown label="Nivel de personalización" help="Qué tanto se puede adaptar el simulador" selectedValue={form.personalizacion} onValueChange={v => handleChange('personalizacion', v)} options={['Bajo', 'Medio', 'Alto']} />
              <Dropdown label="Compatibilidad de dispositivos" help="Dispositivos en los que se puede usar el simulador" selectedValue={form.compatibilidad} onValueChange={v => handleChange('compatibilidad', v)} options={['Windows', 'Android', 'iOS', 'Web']} />
              <Dropdown label="Nivel educativo" help="Nivel para el que está pensado el simulador" selectedValue={form.nivelEducativoSim} onValueChange={v => handleChange('nivelEducativoSim', v)} options={['Primaria', 'Secundaria', 'Media', 'Universitaria']} />
              <Dropdown label="Estrategias de enseñanza" help="Metodología educativa del simulador" selectedValue={form.estrategiasSim} onValueChange={v => handleChange('estrategiasSim', v)} options={['Colaborativa', 'Proyectos', 'Exploración', 'Tradicional']} />
            </ScrollView>

            <View style={[styles.fixedButtonContainer, { paddingBottom: insets.bottom || 16 }]}>
              <Button mode="contained" style={styles.applyButton} onPress={onClose}>
                Recomendar
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
  modalContainer: {
    position: 'absolute',
    top: 50,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#3e3e3e',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  applyButton: {
    backgroundColor: '#4caf50',
    marginTop:10,
    marginBottom:10
  },
});

export default FiltroModal;
