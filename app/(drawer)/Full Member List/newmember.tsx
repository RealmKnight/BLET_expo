import { useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '~/components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import dayjs from 'dayjs';

export default function AddNewMember() {
  const [newMember, setNewMember] = useState<any>({});

  return (
    <>
      <View className="flex-1 place-items-center pt-5">
        <KeyboardAwareScrollView className="justify-items-center">
          <Text className="pb-4 font-bold">
            Member: {newMember.first_name} {newMember.last_name} {newMember.pin_number}
          </Text>
          <Input
            label="First Name : "
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, first_name: text })}
          />
          <Input
            label="Last Name : "
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, last_name: text })}
          />
          <Input
            label="PIN : "
            secure={false}
            disabled={true}
            onChangeHandler={(text) => setNewMember({ ...newMember, pin_number: text })}
          />
          <Input
            label="Prior Sen  Type :"
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, system_sen_type: text })}
          />
          <Input
            label="Prior Sen Rank :"
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, prior_vac_sys: text })}
          />
          <Input
            label="Hire Date : "
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, company_hire_date: text })}
          />
          <Input
            label="Engineer Date: "
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, engineer_date: text })}
          />
          <Input
            label="Zone : "
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, zone: text })}
          />
          <Input
            label="Division : "
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, division: text })}
          />
          <Input
            label="Status : "
            secure={false}
            onChangeHandler={(text) => setNewMember({ ...newMember, status: text })}
          />
        </KeyboardAwareScrollView>
      </View>
      <View className="flex-row items-center border-t-2 border-gray-200 bg-gray-200 p-2 pr-3">
        <Text className="mr-auto pl-3 font-semibold">Add New Member-&gt;</Text>
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
