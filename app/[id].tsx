import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import members from '~/assets/members.json';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '~/components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import dayjs from 'dayjs';

export default function EditMember() {
  const { id } = useLocalSearchParams();

  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('members').select('*').order('wc_sen_roster');
    setMembers(data || []);
  };

  const member = members.find((m) => m.pin_number.toString() === id);
  console.log(member);

  if (!member) {
    return <Text>Member not found</Text>;
  }

  return (
    <>
      <View className="flex-1 place-items-center pt-5">
        <KeyboardAwareScrollView className="justify-items-center">
          <Text className="pb-4 font-bold">
            Member: {member.first_name} {member.last_name} {member.pin_number}
          </Text>
          <Input label="First Name : " placeHolder={member.first_name} secure={false} />
          <Input label="Last Name : " placeHolder={member.last_name} secure={false} />
          <Input label="PIN : " placeHolder={member.pin_number} secure={false} disabled={true} />
          <Input label="Prior Sen  Type :" placeHolder={member.system_sen_type} secure={false} />
          <Input label="Prior Sen Rank :" placeHolder={member.prior_vac_sys} secure={false} />
          <Input
            label="Hire Date : "
            placeHolder={dayjs(member.company_hire_date).format('MM/DD/YYYY')}
            secure={false}
          />
          <Input
            label="Engineer Date: "
            placeHolder={dayjs(member.engineer_date).format('MM/DD/YYYY')}
            secure={false}
          />
          <Input label="Zone : " placeHolder={member.zone} secure={false} />
          <Input label="Division : " placeHolder={member.division} secure={false} />
          <Input label="Status : " placeHolder={member.status} secure={false} />
        </KeyboardAwareScrollView>
      </View>
      <View className="flex-row items-center border-t-2 border-gray-200 bg-gray-200 p-2 pr-3">
        <Text className="mr-auto pl-3 font-semibold">Update Member Info -&gt;</Text>
        <Pressable className="rounded-lg bg-yellow-300 p-2 pl-5 pr-5">
          <View className="flex-row justify-between">
            <Text className="p-1 text-lg font-semibold">Save </Text>
            <FontAwesome name="save" size={28} color="black" />
          </View>
        </Pressable>
      </View>
    </>
  );
}
