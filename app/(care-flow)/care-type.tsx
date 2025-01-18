import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

const careTypes = [
  { id: 'child', label: 'Child Care', icon: 'child' },
  { id: 'elderly', label: 'Elderly Care', icon: 'user' },
  { id: 'both', label: 'Both', icon: 'users' },
];

export default function CareTypeScreen() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      router.push('/(care-flow)/demographics');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What kind of care are you looking for?</Text>
      
      <View style={styles.optionsContainer}>
        {careTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.optionCard,
              selected === type.id && styles.selectedCard,
            ]}
            onPress={() => setSelected(type.id)}
          >
            <FontAwesome
              name={type.icon as any}
              size={32}
              color={selected === type.id ? Colors.light.tint : Colors.light.text}
            />
            <Text style={[
              styles.optionText,
              selected === type.id && styles.selectedText
            ]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.continueButton, !selected && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!selected}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.subtle,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    gap: 16,
  },
  selectedCard: {
    backgroundColor: `${Colors.light.tint}10`,
    borderColor: Colors.light.tint,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.light.text,
  },
  selectedText: {
    color: Colors.light.tint,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: Colors.light.tint,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 