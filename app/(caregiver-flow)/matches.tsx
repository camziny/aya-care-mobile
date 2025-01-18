import { StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

const mockFamilies = [
  {
    id: 1,
    name: 'Ahmed Family',
    location: 'Brooklyn, NY',
    careType: 'Child Care',
    schedule: 'Full-time',
    startDate: 'Immediate',
  },
  {
    id: 2,
    name: 'Rahman Family',
    location: 'Jersey City, NJ',
    careType: 'Elder Care',
    schedule: 'Part-time',
    startDate: 'Next month',
  },
];

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    features: [
      'View family matches',
      'Basic profile visibility',
      'Limited family details',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99/month',
    features: [
      'Contact families directly',
      'Priority profile placement',
      'Advanced search filters',
      'Background check included',
    ],
    recommended: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$19.99/month',
    features: [
      'All Premium features',
      'Featured profile status',
      'Professional certification badge',
      'Priority support',
    ],
  },
];

export default function MatchesScreen() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [showBackgroundCheck, setShowBackgroundCheck] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<number | null>(null);

  const handleFamilyPress = (id: number) => {
    setSelectedFamily(id);
    setShowPaywall(true);
  };

  const handlePlanSelect = (planId: string) => {
    if (planId !== 'basic') {
      setShowPaywall(false);
      setShowBackgroundCheck(true);
    }
  };

  const renderFamily = (family: typeof mockFamilies[0]) => (
    <TouchableOpacity
      key={family.id}
      style={styles.familyCard}
      onPress={() => handleFamilyPress(family.id)}
    >
      <View style={styles.familyHeader}>
        <Text style={styles.familyName}>{family.name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" size={14} color={Colors.light.text} />
          <Text style={styles.location}>{family.location}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <FontAwesome name="user" size={14} color={Colors.light.text} />
          <Text style={styles.detailText}>{family.careType}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="calendar" size={14} color={Colors.light.text} />
          <Text style={styles.detailText}>{family.schedule}</Text>
        </View>
        <View style={styles.detailItem}>
          <FontAwesome name="clock-o" size={14} color={Colors.light.text} />
          <Text style={styles.detailText}>Start: {family.startDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Matching Families</Text>
        <Text style={styles.subtitle}>Based on your preferences</Text>
      </View>

      <View style={styles.matchesContainer}>
        {mockFamilies.map(renderFamily)}
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
              To view and contact families
            </Text>

            <ScrollView style={styles.plansContainer}>
              {subscriptionPlans.map((plan) => (
                <TouchableOpacity
                  key={plan.id}
                  style={[
                    styles.planCard,
                    plan.recommended && styles.recommendedPlan,
                  ]}
                  onPress={() => handlePlanSelect(plan.id)}
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
                    onPress={() => handlePlanSelect(plan.id)}
                  >
                    <Text style={[
                      styles.selectPlanButtonText,
                      plan.recommended && styles.recommendedButtonText,
                    ]}>
                      {plan.id === 'basic' ? 'Continue with Free' : 'Select Plan'}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showBackgroundCheck}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBackgroundCheck(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Background Check Required</Text>
            <Text style={styles.modalSubtitle}>
              To ensure safety and trust, all caregivers must complete a background check
            </Text>
            
            <View style={styles.bcInfoContainer}>
              <Text style={styles.bcPrice}>Background Check Fee: $39.99</Text>
              <Text style={styles.bcDescription}>
                Includes comprehensive criminal history, identity verification, and reference checks
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => setShowBackgroundCheck(false)}
            >
              <Text style={styles.continueButtonText}>Continue to Background Check</Text>
            </TouchableOpacity>
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
  familyCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  familyHeader: {
    marginBottom: 12,
  },
  familyName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  detailsContainer: {
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
  recommendedButtonText: {
    color: '#fff',
  },
  bcInfoContainer: {
    backgroundColor: Colors.light.subtle,
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  bcPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  bcDescription: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: Colors.light.tint,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 