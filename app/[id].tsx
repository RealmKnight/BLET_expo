import { useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '~/components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import dayjs from 'dayjs';
import { Picker } from '@react-native-picker/picker';

const senTypeOptions = ['WC', 'DMIR', 'DWP', 'SYS1', 'EJ&E', 'SYS2'];
const divTypeOptions = ['163', '173', '174', '175', '184', '185', '188', '209', '520'];
const statusOptions = ['ACTIVE', 'IN-ACTIVE'];
const zoneOptions = [
  'zone 1',
  'zone 2',
  'zone 3',
  'zone 4',
  'zone 5',
  'zone 6',
  'zone 7',
  'zone 8',
  'zone 9',
  'zone 10',
  'zone 11',
  'zone 12',
  'zone 13',
];

export default function EditMember() {
  const { id } = useLocalSearchParams();
  const [member, setMember] = useState<any>(null);

  const [members, setMembers] = useState<any[]>([]);
  const [dobError, setDobError] = useState<string | null>(null);
  const [hireDateError, setHireDateError] = useState<string | null>(null);
  const [engineerDateError, setEngineerDateError] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('members').select('*').order('wc_sen_roster');
    if (data) {
      const foundMember = data.find((m) => m.pin_number.toString() === id);
      if (foundMember) {
        setMember(foundMember);
      }
    }
  };

  if (!member) {
    return <Text>Member not found</Text>;
  }

  const validateDob = (dob: string) => {
    if (!dob || dob === 'MM/DD/YYYY') {
      setDobError('Please enter a valid Date of Birth in MM/DD/YYYY format');
      return false;
    }
    // Check if the date matches the MM/DD/YYYY format
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!dateRegex.test(dob)) {
      setDobError('Please enter date in MM/DD/YYYY format');
      return false;
    }

    // Parse the date and check if it's valid
    const parsedDate = dayjs(dob, 'MM/DD/YYYY');
    if (!parsedDate.isValid()) {
      setDobError('Please enter a valid date in MM/DD/YYYY format');
      return false;
    }

    // Check if the date is not in the future
    if (parsedDate.isAfter(dayjs())) {
      setDobError('Hire Date cannot be in the future');
      return false;
    }
    setDobError(null);
    return true;
  };

  const validateHireDate = (hireDate: string) => {
    if (!hireDate || hireDate === 'MM/DD/YYYY') {
      setHireDateError('Please enter a valid Hire Date');
      return false;
    }

    // Check if the date matches the MM/DD/YYYY format
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!dateRegex.test(hireDate)) {
      setHireDateError('Please enter date in MM/DD/YYYY format');
      return false;
    }

    // Parse the date and check if it's valid
    const parsedDate = dayjs(hireDate, 'MM/DD/YYYY');
    if (!parsedDate.isValid()) {
      setHireDateError('Please enter a valid date in MM/DD/YYYY format');
      return false;
    }

    // Check if the date is not in the future
    if (parsedDate.isAfter(dayjs())) {
      setHireDateError('Hire Date cannot be in the future');
      return false;
    }

    setHireDateError(null);
    return true;
  };

  const validateEngineerDate = (engineerDate: string) => {
    if (!engineerDate || engineerDate === 'MM/DD/YYYY') {
      setEngineerDateError('Please enter a valid Engineer Date');
      return false;
    }

    // Check if the date matches the MM/DD/YYYY format
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!dateRegex.test(engineerDate)) {
      setEngineerDateError('Please enter date in MM/DD/YYYY format');
      return false;
    }

    // Parse the date and check if it's valid
    const parsedDate = dayjs(engineerDate, 'MM/DD/YYYY');
    if (!parsedDate.isValid()) {
      setEngineerDateError('Please enter a valid date in MM/DD/YYYY format');
      return false;
    }

    // Check if the date is not in the future
    if (parsedDate.isAfter(dayjs())) {
      setEngineerDateError('Engineer Date cannot be in the future');
      return false;
    }

    setEngineerDateError(null);
    return true;
  };

  const updateMember = async () => {
    if (!member.system_sen_type) {
      Alert.alert('Error', 'Please select a Prior Sen Type');
      return;
    }

    if (
      !member.first_name ||
      member.first_name === '' ||
      member.first_name === null ||
      member.first_name === 'Enter First Name :'
    ) {
      Alert.alert('Error', 'Please enter a First Name');
      return;
    }

    if (
      !member.last_name ||
      member.last_name === '' ||
      member.last_name === null ||
      member.last_name === 'Enter Last Name :'
    ) {
      Alert.alert('Error', 'Please enter a Last Name');
      return;
    }

    if (!member.date_of_birth || member.date_of_birth === 'MM/DD/YYYY') {
      Alert.alert('Error', 'Please enter a Date of Birth');
      return;
    }

    if (!member.company_hire_date || member.company_hire_date === 'MM/DD/YYYY') {
      Alert.alert('Error', 'Please enter a Hire Date');
      return;
    }

    if (!member.engineer_date || member.engineer_date === 'MM/DD/YYYY') {
      Alert.alert('Error', 'Please enter a Engineer Date');
      return;
    }

    if (!member.pin_number) {
      Alert.alert('Error', 'Please enter a Pin Number');
      return;
    }

    if (
      !member.misc_notes ||
      member.misc_notes === '' ||
      member.misc_notes === 'Enter Misc Notes:'
    ) {
      member.misc_notes = null;
    }

    try {
      const { data, error } = await supabase
        .from('members')
        .update([member])
        .eq('pin_number', member.pin_number);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (data) {
        console.log('Update response:', data);
      }

      Alert.alert('Success', 'Member Updated successfully!');
      console.log('success');
    } catch (error) {
      console.error('Error updating member:', error);
      Alert.alert('Error', 'Failed to update member. Please try again.');
    }
  };

  return (
    <>
      <View className="flex-1 place-items-center pt-5">
        <KeyboardAwareScrollView className="justify-items-center">
          <Text className="pb-4 font-bold">
            Member: {member.first_name} {member.last_name} {member.pin_number}
          </Text>
          <Input
            label="First Name : "
            placeHolder={member.first_name}
            secure={false}
            onChangeHandler={(text) => setMember({ ...member, first_name: text.toUpperCase() })}
          />
          <Input
            label="Last Name : "
            placeHolder={member.last_name}
            secure={false}
            onChangeHandler={(text) => setMember({ ...member, last_name: text.toUpperCase() })}
          />
          <Input label="PIN : " placeHolder={member.pin_number} secure={false} disabled={true} />
          <Input
            label="DOB :"
            placeHolder={dayjs(member.date_of_birth).format('MM/DD/YYYY')}
            secure={false}
            onChangeHandler={async (text) => {
              setMember({ ...member, date_of_birth: text });
              validateDob(text);
            }}
          />
          {dobError && <Text className="text-red-500">{dobError}</Text>}
          <View className="mb-2 flex-row items-baseline justify-between pr-2">
            <Text className="mb-2 pr-2">Prior Sen Type :</Text>
            <View className="overflow-hidden rounded-xl border-2 border-gray-400 p-2">
              <Picker
                id="system_sen_type"
                selectedValue={member?.system_sen_type}
                onValueChange={(itemValue) =>
                  setMember((prevMember: typeof member) =>
                    prevMember ? { ...prevMember, system_sen_type: itemValue } : null
                  )
                }>
                {senTypeOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>
          <Input
            label="Hire Date : "
            placeHolder={dayjs(member.company_hire_date).format('MM/DD/YYYY')}
            secure={false}
            onChangeHandler={(text) => {
              setMember({ ...member, company_hire_date: text });
              validateHireDate(text);
            }}
          />
          {hireDateError && <Text className="text-red-500">{hireDateError}</Text>}
          <Input
            label="Engineer Date: "
            placeHolder={dayjs(member.engineer_date).format('MM/DD/YYYY')}
            secure={false}
            onChangeHandler={(text) => {
              setMember({ ...member, engineer_date: text });
              validateEngineerDate(text);
            }}
          />
          {engineerDateError && <Text className="text-red-500">{engineerDateError}</Text>}
          <View className="mb-4 mt-2 flex-row items-baseline justify-between pr-2">
            <Text className="mb-2 pr-2">Zone :</Text>
            <View className="overflow-hidden rounded-xl border-2 border-gray-400 p-2">
              <Picker
                id="zone"
                selectedValue={member.zone}
                onValueChange={(itemValue) =>
                  setMember((prevMember: any) => ({
                    ...prevMember,
                    zone: itemValue,
                  }))
                }>
                {zoneOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>
          <View className="mb-4 flex-row items-baseline justify-between pr-2">
            <Text className="mb-2 pr-2">Division :</Text>
            <View className="overflow-hidden rounded-xl border-2 border-gray-400 p-2">
              <Picker
                id="division"
                selectedValue={member.division}
                onValueChange={(itemValue) =>
                  setMember((prevMember: any) => ({
                    ...prevMember,
                    division: itemValue,
                  }))
                }>
                {divTypeOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>
          <View className="mb-4 flex-row items-baseline justify-between pr-2">
            <Text className="mb-2 pr-2">Status :</Text>
            <View className="overflow-hidden rounded-xl border-2 border-gray-400 p-2">
              <Picker
                id="status"
                selectedValue={member.status}
                onValueChange={(itemValue) =>
                  setMember((prevMember: any) => ({
                    ...prevMember,
                    status: itemValue,
                  }))
                }>
                {statusOptions.map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>
          <Input
            label="Misc Notes: "
            placeHolder={member.misc_notes || ''}
            numLines={3}
            secure={false}
            onChangeHandler={(text) => setMember({ ...member, misc_notes: text.toUpperCase() })}
          />
        </KeyboardAwareScrollView>
      </View>
      <View className="flex-row items-center border-t-2 border-gray-200 bg-gray-200 p-2 pr-3">
        <Text className="mr-auto pl-3 font-semibold">Update Member Info -&gt;</Text>
        <Pressable onPress={updateMember} className="rounded-lg bg-yellow-300 p-2 pl-5 pr-5">
          <View className="flex-row justify-between">
            <Text className="p-1 text-lg font-semibold">Save </Text>
            <FontAwesome name="save" size={28} color="black" />
          </View>
        </Pressable>
      </View>
    </>
  );
}
