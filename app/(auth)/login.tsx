import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, View, AppState, Text, Pressable } from 'react-native';
import Input from '~/components/Input';
import { supabase } from '~/utils/supabase';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <View className="mt-10 flex-1 gap-3 p-5">
      <Stack.Screen options={{ title: 'Sign In / Sign Up' }} />
      <View>
        <Input
          label="Email:"
          leftIcon={<Feather name="mail" size={24} color="black" />}
          onChangeHandler={(text) => setEmail(text)}
          value={email}
          placeHolder="email@address.com"
        />
      </View>
      <View>
        <Input
          label="Password:"
          leftIcon={<Feather name="lock" size={24} />}
          onChangeHandler={(text) => setPassword(text)}
          value={password}
          secure={true}
          placeHolder="Password"
          rightIcon={<Feather name="eye" size={24} />}
        />
      </View>
      <View>
        <Pressable
          onPress={() => signInWithEmail()}
          disabled={loading}
          className="rounded-lg border-2 border-yellow-300 bg-gray-500 p-2 pl-5 pr-5">
          <View className="flex-row justify-center">
            <Text className="p-1 text-lg font-semibold text-yellow-300">Sign In </Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => signUpWithEmail()}
          disabled={loading}
          className="rounded-lg bg-yellow-300 p-2 pl-5 pr-5">
          <View className="flex-row justify-center">
            <Text className="p-1 text-lg font-semibold">Sign Up </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
