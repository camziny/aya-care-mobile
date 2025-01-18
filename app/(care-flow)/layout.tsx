import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function CareFlowLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTintColor: Colors.light.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="care-type"
        options={{
          title: "Type of Care",
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="demographics"
        options={{
          title: "Preferences",
        }}
      />
      <Stack.Screen
        name="care-details"
        options={{
          title: "Care Details",
        }}
      />
      <Stack.Screen
        name="matches"
        options={{
          title: "Your Matches",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
} 