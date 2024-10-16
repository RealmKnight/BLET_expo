import { useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '~/components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import { useRoster } from '~/contexts/RosterContext';
import { showAlert } from '~/utils/alert';
import CustomPicker from '~/components/CustomPicker';

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

export default function AddNewMember() {
  const [newMember, setNewMember] = useState<any>({
    system_sen_type: 'SYS2',
    pin_number: null,
    prior_vac_sys: null,
  });
  const [pinError, setPinError] = useState<string | null>(null);
  const [dobError, setDobError] = useState<string | null>(null);
  const [hireDateError, setHireDateError] = useState<string | null>(null);
  const [engineerDateError, setEngineerDateError] = useState<string | null>(null);

  const { triggerRosterUpdate } = useRoster();

  const initialState = {
    system_sen_type: 'SYS2',
    first_name: '',
    last_name: '',
    pin_number: '',
    date_of_birth: '',
    prior_vac_sys: '',
    company_hire_date: '',
    engineer_date: '',
    zone: '',
    division: '',
    status: '',
    misc_notes: '',
  };

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

  const validatePin = async (pin: number) => {
    if (isNaN(pin) || pin < 100000 || pin > 999999) {
      setPinError('PIN must be a 6-digit number');
      return false;
    }

    const { data, error } = await supabase
      .from('members')
      .select('pin_number')
      .eq('pin_number', pin);

    if (error) {
      console.error('Error checking PIN:', error);
      return false;
    }

    if (data && data.length > 0) {
      setPinError('This PIN is already in use');
      return false;
    }

    setPinError(null);
    return true;
  };

  const addNewMemberToDatabase = async () => {
    if (!newMember.pin_number || !(await validatePin(newMember.pin_number))) {
      showAlert('Error', 'Please enter a valid PIN');
      return;
    }

    if (!newMember.system_sen_type) {
      showAlert('Error', 'Please select a Prior Sen Type');
      return;
    }

    if (
      !newMember.first_name ||
      newMember.first_name === '' ||
      newMember.first_name === null ||
      newMember.first_name === 'Enter First Name :'
    ) {
      showAlert('Error', 'Please enter a First Name');
      return;
    }

    if (
      !newMember.last_name ||
      newMember.last_name === '' ||
      newMember.last_name === null ||
      newMember.last_name === 'Enter Last Name :'
    ) {
      showAlert('Error', 'Please enter a Last Name');
      return;
    }

    if (!newMember.date_of_birth || newMember.date_of_birth === 'MM/DD/YYYY') {
      showAlert('Error', 'Please enter a Date of Birth');
      return;
    }

    if (!newMember.company_hire_date || newMember.company_hire_date === 'MM/DD/YYYY') {
      showAlert('Error', 'Please enter a Hire Date');
      return;
    }

    if (!newMember.engineer_date || newMember.engineer_date === 'MM/DD/YYYY') {
      showAlert('Error', 'Please enter a Engineer Date');
      return;
    }

    if (!newMember.pin_number) {
      showAlert('Error', 'Please enter a Pin Number');
      return;
    }

    if (
      !newMember.misc_notes ||
      newMember.misc_notes === '' ||
      newMember.misc_notes === 'Enter Misc Notes:'
    ) {
      newMember.misc_notes = null;
    }
    console.log(newMember);

    try {
      const { data, error } = await supabase.from('members').insert([newMember]).select();

      if (error) {
        throw error;
      }

      showAlert('Success', 'New member added successfully!');
      // Reset form and trigger updates here
    } catch (error) {
      console.error('Error adding new member:', error);
      showAlert('Error', 'Failed to add new member. Please try again.');
    }
  };

  return (
    <>
      <View className="flex-1 place-items-center pt-5">
        <KeyboardAwareScrollView className="justify-items-center pl-3 pr-3">
          <Text className="pl-2 text-2xl font-bold">Add New Member</Text>
          <Input
            label="First Name : "
            secure={false}
            onChangeHandler={(text) =>
              setNewMember({ ...newMember, first_name: text.toUpperCase() })
            }
          />
          <Input
            label="Last Name : "
            secure={false}
            onChangeHandler={(text) =>
              setNewMember({ ...newMember, last_name: text.toUpperCase() })
            }
          />
          <Input
            label="PIN : "
            secure={false}
            onChangeHandler={async (text) => {
              const numericValue = parseInt(text, 10);
              setNewMember({ ...newMember, pin_number: isNaN(numericValue) ? null : numericValue });
              if (!isNaN(numericValue)) {
                await validatePin(numericValue);
              }
            }}
          />
          {pinError && <Text className="text-red-500">{pinError}</Text>}
          <Input
            label="DOB :"
            placeHolder="MM/DD/YYYY"
            secure={false}
            onChangeHandler={async (text) => {
              setNewMember({ ...newMember, date_of_birth: text });
              validateDob(text);
            }}
          />
          {dobError && <Text className="text-red-500">{dobError}</Text>}
          <CustomPicker
            label="Prior Sen Type :"
            selectedValue={newMember.system_sen_type}
            onValueChange={(itemValue) =>
              setNewMember({ ...newMember, system_sen_type: itemValue })
            }
            options={senTypeOptions}
          />
          <Input
            label="Sen Ranking :"
            secure={false}
            onChangeHandler={(text) => {
              const numericValue = parseInt(text, 10);
              setNewMember({
                ...newMember,
                prior_vac_sys: isNaN(numericValue) ? null : numericValue,
              });
            }}
          />
          <Input
            label="Hire Date : "
            placeHolder="MM/DD/YYYY"
            secure={false}
            onChangeHandler={async (text) => {
              setNewMember({ ...newMember, company_hire_date: text });
              validateHireDate(text);
            }}
          />
          {hireDateError && <Text className="text-red-500">{hireDateError}</Text>}
          <Input
            label="Engineer Date: "
            placeHolder="MM/DD/YYYY"
            secure={false}
            onChangeHandler={(text) => {
              setNewMember({ ...newMember, engineer_date: text });
              validateEngineerDate(text);
            }}
          />
          {engineerDateError && <Text className="text-red-500">{engineerDateError}</Text>}
          <CustomPicker
            label="Zone :"
            selectedValue={newMember.zone}
            onValueChange={(itemValue) => setNewMember({ ...newMember, zone: itemValue })}
            options={zoneOptions}
          />
          <CustomPicker
            label="Division :"
            selectedValue={newMember.division}
            onValueChange={(itemValue) => setNewMember({ ...newMember, division: itemValue })}
            options={divTypeOptions}
          />
          <CustomPicker
            label="Status :"
            selectedValue={newMember.status}
            onValueChange={(itemValue) => setNewMember({ ...newMember, status: itemValue })}
            options={statusOptions}
          />
          <Input
            label="Misc Notes: "
            numLines={3}
            secure={false}
            onChangeHandler={(text) =>
              setNewMember({ ...newMember, misc_notes: text.toUpperCase() })
            }
          />
        </KeyboardAwareScrollView>
      </View>
      <View className="flex-row items-center border-t-2 border-gray-200 bg-gray-200 p-2 pr-3">
        <Text className="mr-auto pl-3 font-semibold">Add New Member-&gt;</Text>
        <Pressable
          onPress={addNewMemberToDatabase}
          className="rounded-lg bg-yellow-300 p-2 pl-5 pr-5">
          <View className="flex-row justify-between">
            <Text className="p-1 text-lg font-semibold">Save </Text>
            <FontAwesome name="save" size={28} color="black" />
          </View>
        </Pressable>
      </View>
    </>
  );
}
