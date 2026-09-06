import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="course/[courseId]"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="lesson/[lessonId]"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="practice/index"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="challenge/[challengeId]"
          options={{ headerShown: false }}
        />
      </Stack>

      <StatusBar style="dark" />
    </>
  );
}