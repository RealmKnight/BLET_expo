import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface CustomPickerProps {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: string[];
}

export default function CustomPicker({
  label,
  selectedValue,
  onValueChange,
  options,
}: CustomPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          mode="dropdown">
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  label: {
    flex: 1,
    marginRight: 10,
  },
  pickerContainer: {
    flex: 2,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingLeft: 12,
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        elevation: 1,
        backgroundColor: 'white',
      },
    }),
    overflow: 'hidden',
  },
  picker: {
    ...Platform.select({
      ios: {
        height: 150,
      },
      android: {
        height: 50,
      },
      web: {
        height: 40,
      },
    }),
  },
});
