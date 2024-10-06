import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MemberListItem from '~/components/MemberListItem';

import members from '~/assets/members.json';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'WC Roster' }} />
      <View className="items-center">
        <Text className="text-2xl font-semibold uppercase">WC Roster</Text>
        <View className="m-2 flex-row">
          <Text className="mr-2">Search</Text>
          <Feather name="search" size={20} color="black" />
        </View>
      </View>
      <MemberListItem member={members[0]} />
      <MemberListItem member={members[1]} />
      <FlatList data={undefined} renderItem={undefined} />
    </>
  );
}
