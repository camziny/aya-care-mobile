import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const categoryIcons = ['user-md', 'child', 'heartbeat', 'star'] as const;

export default function SeekCareScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Care</Text>
        <Text style={styles.subtitle}>Connect with qualified caregivers</Text>
        
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color={Colors.light.tabIconDefault} />
          <TextInput 
            placeholder="Search caregivers..."
            style={styles.searchInput}
            placeholderTextColor={Colors.light.tabIconDefault}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <View style={styles.categoriesContainer}>
          {['Elder Care', 'Child Care', 'Physical Therapy', 'Special Needs'].map((category, index) => (
            <View key={index} style={styles.categoryCard}>
              <FontAwesome 
                name={categoryIcons[index]} 
                size={24} 
                color={Colors.light.tint} 
              />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.subtle,
  },
  header: {
    backgroundColor: Colors.light.background,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.tabIconDefault,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.subtle,
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  section: {
    backgroundColor: Colors.light.background,
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: Colors.light.subtle,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '47%',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoryText: {
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
}); 