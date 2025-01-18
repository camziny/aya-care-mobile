import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Svg, Circle } from 'react-native-svg';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Svg width="150" height="150" viewBox="0 0 150 150">
          <Circle
            cx="75"
            cy="75"
            r="60"
            fill={Colors.light.tint}
            opacity="0.2"
          />
          <Circle
            cx="75"
            cy="75"
            r="45"
            fill={Colors.light.tint}
            opacity="0.4"
          />
          <Circle
            cx="75"
            cy="75"
            r="30"
            fill={Colors.light.tint}
          />
        </Svg>
        <Text style={styles.title}>AyaCare</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/(care-flow)/care-type')}
        >
          <Text style={styles.buttonText}>I'm looking for care</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.push('/(caregiver-flow)/care-type')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            I'm a caregiver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: Colors.light.tint,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: Colors.light.subtle,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: Colors.light.text,
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: Colors.light.text,
  },
});
