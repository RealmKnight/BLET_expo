import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import members from '~/assets/members.json';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '~/components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EditMember() {
  const { id } = useLocalSearchParams();

  const member = members.find((m) => m.id.toString() === id);

  if (!member) {
    return <Text>Member not found</Text>;
  }

  return (
    <View className="flex-1 place-items-center">
      <KeyboardAwareScrollView className="justify-items-center">
        <Text className="pb-4 font-bold">
          Member: {member.first_name} {member.last_name} {member.pin_number}
        </Text>
        <Input label="First Name: " placeHolder={member.first_name} secure={false} />
        <Input label="Last Name: " placeHolder={member.last_name} secure={false} />
        <Input label="PIN: " placeHolder={member.pin_number} secure={false} />
        <Input label="Seniority Type: " placeHolder={member.prior_sen_type} secure={false} />
        <Input label="Seniority Rank: " placeHolder={member.prior_sen_rank} secure={false} />
        <Input label="Hire Date: " placeHolder={member.company_hire_date} secure={false} />
        <Input label="Engineer Date: " placeHolder={member.engineer_date} secure={false} />
        <Input label="Zone: " placeHolder={member.zone} secure={false} />
        <Input label="Division: " placeHolder={member.division} secure={false} />
      </KeyboardAwareScrollView>
    </View>
  );
}
