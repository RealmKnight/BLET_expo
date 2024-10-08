import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MemberListItem from '~/components/MemberListItem';

import members from '~/assets/members.json';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Full Member List' }} />
      <View className="items-center">
        <Text className="text-2xl font-semibold uppercase">
          Full Member List Including In-Active Members
        </Text>
        <Text className="p-4">
          This is a list of all members including those who have retired or otherwise been listed as
          inactive for Union Purposes since January when the new Rosters came out.
        </Text>
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
