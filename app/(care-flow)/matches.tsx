import { StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

const mockCaregivers = [
  {
    id: 1,
    name: 'Amira H.',
    rating: 4.9,
    reviews: 28,
    experience: '7 years',
    languages: ['Arabic', 'English'],
    photo: '👩🏽',
  },
  {
    id: 2,
    name: 'Fatima S.',
    rating: 4.8,
    reviews: 42,
    experience: '5 years',
    languages: ['Urdu', 'English'],
    photo: '👩🏽',
  },
  // Add more mock caregivers...
];

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    features: [
      'View caregiver matches',
      'Basic search filters',
      'Limited profile views',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$14.99/month',
    features: [
      'Contact caregivers directly',
      'View detailed profiles',
      'Advanced search filters',
      'Background check access',
    ],
    recommended: true,
  },
  {
    id: 'family',
    name: 'Family Plan',
    price: '$29.99/month',
    features: [
      'All Premium features',
      'Multiple family members',
      'Priority support',
      'Care coordination tools',
    ],
  },
];

export default function MatchesScreen() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<number | null>(null);

  const handleCaregiverPress = (id: number) => {
    setSelectedCaregiver(id);
    setShowPaywall(true);
  };

  const renderCaregiver = (caregiver: typeof mockCaregivers[0]) => (
    <TouchableOpacity
      key={caregiver.id}
      style={styles.caregiverCard}
      onPress={() => handleCaregiverPress(caregiver.id)}
    >
      <View style={styles.caregiverHeader}>
        <Text style={styles.caregiverPhoto}>{caregiver.photo}</Text>
        <View style={styles.caregiverInfo}>
          <Text style={styles.caregiverName}>{caregiver.name}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{caregiver.rating}</Text>
            <Text style={styles.reviews}>({caregiver.reviews} reviews)</Text>
          </View>
        </View>
      </View>
      <View style={styles.caregiverDetails}>
        <View style={styles.detailItem}>
          <FontAwesome name="briefcase" size={14} color={Colors.light.text} />
          <Text style={styles.detailText}>{caregiver.experience}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="language" size={14} color={Colors.light.text} />
          <Text style={styles.detailText}>{caregiver.languages.join(', ')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPlan = (plan: typeof subscriptionPlans[0]) => (
    <TouchableOpacity
      key={plan.id}
      style={[
        styles.planCard,
        plan.recommended && styles.recommendedPlan,
      ]}
    >
      {plan.recommended && (
        <View style={styles.recommendedBadge}>
          <Text style={styles.recommendedText}>Recommended</Text>
        </View>
      )}
      <Text style={styles.planName}>{plan.name}</Text>
      <Text style={styles.planPrice}>{plan.price}</Text>
      <View style={styles.planFeatures}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <FontAwesome name="check" size={14} color={Colors.light.tint} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity 
        style={[
          styles.selectPlanButton,
          plan.recommended && styles.recommendedButton,
        ]}
      >
        <Text style={styles.selectPlanButtonText}>
          {plan.id === 'basic' ? 'Continue with Free' : 'Select Plan'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Matches</Text>
        <Text style={styles.subtitle}>Based on your preferences</Text>
      </View>

      <View style={styles.matchesContainer}>
        {mockCaregivers.map(renderCaregiver)}
      </View>

      <Modal
        visible={showPaywall}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPaywall(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPaywall(false)}
            >
              <FontAwesome name="times" size={24} color={Colors.light.text} />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Choose a Plan</Text>
            <Text style={styles.modalSubtitle}>
              To view and contact caregivers
            </Text>

            <ScrollView style={styles.plansContainer}>
              {subscriptionPlans.map(renderPlan)}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
  },
  matchesContainer: {
    padding: 16,
    gap: 16,
  },
  caregiverCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  caregiverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  caregiverPhoto: {
    fontSize: 40,
    marginRight: 12,
  },
  caregiverInfo: {
    flex: 1,
  },
  caregiverName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
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
  caregiverDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.light.tabIconDefault,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: Colors.light.subtle,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  recommendedPlan: {
    borderColor: Colors.light.tint,
    borderWidth: 2,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.tint,
    marginTop: 4,
  },
  planFeatures: {
    marginTop: 16,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectPlanButton: {
    backgroundColor: Colors.light.subtle,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  recommendedButton: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  selectPlanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
}); 