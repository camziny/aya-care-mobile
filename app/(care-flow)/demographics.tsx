import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { useState } from 'react';

const religions = ['Muslim', 'Sikh', 'Hindu', 'Buddhist', 'Jain', 'Christian', 'Zorastrian', 'No Preference'];
const muslimSects = ['Sunni', 'Shia', 'Ahmadiyya', 'Ismaili', 'Ibadi', 'Mahdavia', 'Barelvi', 'Deobandi', 'Alawite', 'Druze', 'Yazidi', 'Alevi', 'Just Muslim'];
const ethnicities = ['Pakistani', 'Indian', 'Bangladeshi', 'Sri Lankan', 'Nepalese', 'Afghan', 'Bhutanese', 'Maldivian', 'Arab', 'Kurdish', 'Indonesian', 'Malaysian', 'No Preference'];
const languages = ['Urdu', 'Turkish', 'Arabic', 'Hindi', 'Kurdish', 'Punjabi', 'Gujarati', 'Bangla', 'Balochi', 'Farsi', 'Dari', 'Pashto', 'Oriya', 'Bhojpuri', 'Sindhi', 'Singhalese', 'Marathi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Nepali', 'Assamese', 'Magahi', 'Malay', 'No Preference'];
const countries = ['Pakistan', 'India', 'Bangladesh', 'Nepal', 'Bhutan', 'Sri Lanka', 'Afghanistan', 'Maldives', 'Palestine', 'Lebanon', 'Iraq', 'Syria', 'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Yemen', 'Libya', 'Bahrain', 'Jordan', 'Indonesia', 'Malaysia', 'Djibouti', 'Oman', 'Tunisia', 'Somalia', 'Algeria', 'Morocco', 'Chad', 'No Preference'];

export default function DemographicsScreen() {
  const [preferences, setPreferences] = useState({
    religion: '',
    muslimSect: '',
    ethnicity: '',
    language: '',
    country: '',
  });

  const isMuslim = preferences.religion === 'Muslim';
  const canContinue = preferences.religion && 
    (!isMuslim || (isMuslim && preferences.muslimSect)) &&
    preferences.ethnicity &&
    preferences.language &&
    preferences.country;

  const handleContinue = () => {
    if (canContinue) {
      router.push('/(care-flow)/care-details');
    }
  };

  const renderSection = (title: string, options: string[], key: keyof typeof preferences) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsScroll}>
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                preferences[key] === option && styles.selectedOption,
              ]}
              onPress={() => setPreferences(prev => ({ ...prev, [key]: option }))}
            >
              <Text style={[
                styles.optionText,
                preferences[key] === option && styles.selectedOptionText,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderSection('Religion', religions, 'religion')}
      
      {isMuslim && renderSection('Muslim Sect', muslimSects, 'muslimSect')}
      
      {renderSection('Ethnicity', ethnicities, 'ethnicity')}
      
      {renderSection('Language', languages, 'language')}
      
      {renderSection('Country', countries, 'country')}

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
  optionsScroll: {
    marginHorizontal: -20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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