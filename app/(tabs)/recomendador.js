// RecomendationScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FiltroPopup from '../../components/fieldsPopup'; // ajusta la ruta si es diferente

export default function RecomendationScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar simulador robótico"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
         <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Recommendation Placeholder */}
      <View style={styles.robotContainer}>
        <Image
          source={require('../../assets/icono_recombot.png')} // reemplaza con la ruta de tu imagen de robot investigador
          style={styles.robotImage}
          resizeMode="contain"
        />
        <Text style={styles.messageText}>Buscando simuladores para ti...</Text>
      </View>

       <FiltroPopup
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onApply={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 32,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  robotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  robotImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
});
