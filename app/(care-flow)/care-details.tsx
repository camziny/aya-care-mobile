import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ageOptions = [
  'Infant', '1 year', '2 years', '3 years', '4 years', '5 years',
  '6 years', '7 years', '8 years', '9 years', '10 years',
  '11-14 years', '15-17 years', '18-25 years', '26-35 years',
  '36-45 years', '46-55 years', '56-64 years', '65+ years'
];

const careTypes = [
  { id: 'long', label: 'Long Term Care', icon: 'calendar' as const },
  { id: 'short', label: 'Short Term Care', icon: 'clock-o' as const },
];

export default function CareDetailsScreen() {
  const [details, setDetails] = useState({
    numberOfPersons: 0,
    age: '',
    careType: '',
  });

  const canContinue = details.numberOfPersons > 0 && details.age && details.careType;

  const handleContinue = () => {
    if (canContinue) {
      router.push('/(care-flow)/matches');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Number of Person(s) in Need of Care</Text>
        <View style={styles.numberGrid}>
          {[...Array(10)].map((_, i) => (
            <TouchableOpacity
              key={i + 1}
              style={[
                styles.numberButton,
                details.numberOfPersons === i + 1 && styles.selectedNumber,
              ]}
              onPress={() => setDetails(prev => ({ ...prev, numberOfPersons: i + 1 }))}
            >
              <Text style={[
                styles.numberText,
                details.numberOfPersons === i + 1 && styles.selectedNumberText,
              ]}>
                {i + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Age of Person(s) in Need of Care</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
          <View style={styles.optionsContainer}>
            {ageOptions.map((age) => (
              <TouchableOpacity
                key={age}
                style={[
                  styles.optionButton,
                  details.age === age && styles.selectedOption,
                ]}
                onPress={() => setDetails(prev => ({ ...prev, age }))}
              >
                <Text style={[
                  styles.optionText,
                  details.age === age && styles.selectedOptionText,
                ]}>
                  {age}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type of Care Needed</Text>
        <View style={styles.careTypeContainer}>
          {careTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.careTypeButton,
                details.careType === type.id && styles.selectedCareType,
              ]}
              onPress={() => setDetails(prev => ({ ...prev, careType: type.id }))}
            >
              <FontAwesome
                name={type.icon}
                size={24}
                color={details.careType === type.id ? '#fff' : Colors.light.text}
              />
              <Text style={[
                styles.careTypeText,
                details.careType === type.id && styles.selectedCareTypeText,
              ]}>
                {type.label}
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
    marginBottom: 16,
  },
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  numberButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.subtle,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedNumber: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  numberText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  selectedNumberText: {
    color: '#fff',
  },
  optionsScroll: {
    marginHorizontal: -20,
  },
  optionsContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 8,
  },
  optionButton: {
    backgroundColor: Colors.light.subtle,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedOption: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  optionText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '500',
  },
  careTypeContainer: {
    gap: 12,
  },
  careTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.light.subtle,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    gap: 12,
  },
  selectedCareType: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  careTypeText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  selectedCareTypeText: {
    color: '#fff',
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