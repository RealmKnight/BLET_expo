import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import members from '~/assets/members.json';

export default function EditMember() {
  const { id } = useLocalSearchParams();

  const member = members.find((m) => m.id.toString() === id);
  return (
    <>
      <Text>
        Member id: {member?.first_name} {member?.last_name}
      </Text>
    </>
  );
}
