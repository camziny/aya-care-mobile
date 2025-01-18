import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function CaregiverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caregiver Portal</Text>
      <Text style={styles.subtitle}>Manage your caregiving profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
}); 