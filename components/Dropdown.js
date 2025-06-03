import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

const Dropdown = ({ label, selectedValue, onValueChange, options, help }) => {
  const [visible, setVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <View style={styles.dropdownLabel}>
        <Text style={styles.label}>{label}</Text>
        <IconButton icon="help-circle-outline" size={18} onPress={() => alert(help)} />
      </View>

      <Button mode="outlined" onPress={() => setVisible(true)}>
        {selectedValue || 'Seleccionar opción'}
      </Button>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)} style={styles.option}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 8,
  },
  dropdownLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginRight: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Dropdown;
