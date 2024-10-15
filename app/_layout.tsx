import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from '~/contexts/AuthProvider';
import { RosterProvider } from '~/contexts/RosterContext';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RosterProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="[id]"
              options={{ title: 'Edit Member Info', presentation: 'modal' }}
            />
          </Stack>
        </GestureHandlerRootView>
      </RosterProvider>
    </AuthProvider>
  );
}
