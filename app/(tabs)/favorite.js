import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

export default function favorite() {
  const [favoritos, setFavoritos] = useState([]);

  // Aquí podrías cargar desde Firebase, SQLite, etc.
  useEffect(() => {
    // Simulación inicial sin favoritos
    setFavoritos([]); // luego reemplaza con tus datos reales
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title title={item.nombre} subtitle={item.descripcion} />
      <Card.Cover source={{ uri: item.imagen }} />
      <Card.Actions>
        <IconButton icon="heart" iconColor="#e91e63" />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {favoritos.length === 0 ? (
        <ScrollView contentContainerStyle={styles.emptyContainer}>
          <Image
            source={require('../../assets/images/robot-vacio.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Aún no tienes favoritos 🤖</Text>
          <Text style={styles.subtitle}>
            Explora simuladores y toca el corazón 💚 para agregarlos aquí.
          </Text>
        </ScrollView>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});
