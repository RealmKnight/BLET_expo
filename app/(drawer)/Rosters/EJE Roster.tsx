import Feather from '@expo/vector-icons/Feather';
import { Redirect, Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MemberListItem from '~/components/MemberListItem';

import members from '~/assets/members.json';
import { useAuth } from '~/contexts/AuthProvider';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'EJ&E Roster' }} />
      <View>
        <View className="items-center">
          <Text className="text-2xl font-semibold uppercase">EJ&E Roster</Text>
          <Pressable className="m-2 flex-row">
            <Text className="mr-2">Search</Text>
            <Feather name="search" size={20} color="black" />
          </Pressable>
        </View>
        <View className="ml-auto p-3 pr-5">
          <Pressable className=" m-1 flex-row">
            <Text>Recalculate Roster </Text>
            <Feather name="check-circle" size={20} color="black" />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={members}
        renderItem={({ item }) => <MemberListItem member={item} />}
        className="bg-gray-200"
      />
    </>
  );
}
