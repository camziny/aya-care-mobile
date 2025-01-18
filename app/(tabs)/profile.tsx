import { StyleSheet, ScrollView, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const mockUserData = {
  name: "Fatima",
  role: "Caregiver",
  rating: 4.8,
  reviews: 24,
  specialties: ["Elder Care", "Physical Therapy", "Medication Management"],
  experience: "5+ years",
  availability: "Full-time",
  bio: "Dedicated caregiver with extensive experience in elder care and rehabilitation. Certified in First Aid and CPR.",
};

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <FontAwesome name="user-circle" size={80} color={Colors.light.tint} />
        </View>
        <Text style={styles.name}>{mockUserData.name}</Text>
        <Text style={styles.role}>{mockUserData.role}</Text>
        
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{mockUserData.rating}</Text>
          <Text style={styles.reviews}>({mockUserData.reviews} reviews)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bio}>{mockUserData.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <View style={styles.specialtiesContainer}>
          {mockUserData.specialties.map((specialty, index) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <FontAwesome name="clock-o" size={20} color={Colors.light.tint} />
          <Text style={styles.infoText}>{mockUserData.availability}</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="briefcase" size={20} color={Colors.light.tint} />
          <Text style={styles.infoText}>{mockUserData.experience}</Text>
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: Colors.light.tint,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  reviews: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
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
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyTag: {
    backgroundColor: Colors.light.subtle,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  specialtyText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  infoSection: {
    backgroundColor: Colors.light.background,
    padding: 20,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: Colors.light.text,
  },
}); 