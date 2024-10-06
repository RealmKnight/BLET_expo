import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MemberListItem from '~/components/MemberListItem';

import members from '~/assets/members.json';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'DMIR Roster' }} />
      <View className="items-center">
        <Text className="text-2xl font-semibold uppercase">DMIR Roster</Text>
        <View className="m-2 flex-row">
          <Text className="mr-2">Search</Text>
          <Feather name="search" size={20} color="black" />
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
