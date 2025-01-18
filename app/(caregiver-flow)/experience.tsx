import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { useState } from 'react';

const ageGroups = [
  'Infant', '1 year', '2 years', '3 years', '4 years', '5 years',
  '6 years', '7 years', '8 years', '9 years', '10 years',
  '11-14 years', '15-17 years', '18-25 years', '26-35 years',
  '36-45 years', '46-55 years', '56-64 years', '65+ years'
];

const capacityOptions = [
  { id: 'single', label: 'Only one individual' },
  { id: 'multiple', label: 'Multiple individuals' },
];

const termOptions = [
  { id: 'long', label: 'Long term caregiver' },
  { id: 'short', label: 'Short term caregiver' },
];

export default function ExperienceScreen() {
  const [experience, setExperience] = useState({
    agesServed: [] as string[],
    capacity: '',
    term: '',
  });

  const canContinue = 
    experience.agesServed.length > 0 && 
    experience.capacity && 
    experience.term;

  const handleContinue = () => {
    if (canContinue) {
      router.push('/(caregiver-flow)/matches');
    }
  };

  const toggleAgeGroup = (age: string) => {
    setExperience(prev => ({
      ...prev,
      agesServed: prev.agesServed.includes(age)
        ? prev.agesServed.filter(a => a !== age)
        : [...prev.agesServed, age]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ages You Can Serve</Text>
        <Text style={styles.sectionSubtitle}>Select all that apply</Text>
        <View style={styles.ageGrid}>
          {ageGroups.map((age) => (
            <TouchableOpacity
              key={age}
              style={[
                styles.ageButton,
                experience.agesServed.includes(age) && styles.selectedAge,
              ]}
              onPress={() => toggleAgeGroup(age)}
            >
              <Text style={[
                styles.ageText,
                experience.agesServed.includes(age) && styles.selectedAgeText,
              ]}>
                {age}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Care Capacity</Text>
        <View style={styles.optionsContainer}>
          {capacityOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                experience.capacity === option.id && styles.selectedCard,
              ]}
              onPress={() => setExperience(prev => ({ ...prev, capacity: option.id }))}
            >
              <Text style={[
                styles.optionText,
                experience.capacity === option.id && styles.selectedOptionText,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type of Care</Text>
        <View style={styles.optionsContainer}>
          {termOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                experience.term === option.id && styles.selectedCard,
              ]}
              onPress={() => setExperience(prev => ({ ...prev, term: option.id }))}
            >
              <Text style={[
                styles.optionText,
                experience.term === option.id && styles.selectedOptionText,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.continueButton, !canContinue && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!canContinue}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.subtle,
  },
  section: {
    backgroundColor: Colors.light.background,
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginBottom: 16,
  },
  ageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ageButton: {
    backgroundColor: Colors.light.subtle,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    minWidth: '30%',
    alignItems: 'center',
  },
  selectedAge: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  ageText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedAgeText: {
    color: '#fff',
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.subtle,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedCard: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  optionText: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: Colors.light.tint,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
}); 