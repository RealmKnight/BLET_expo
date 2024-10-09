import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import MemberListItem from '~/components/MemberListItem';

import members from '~/assets/members.json';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '~/utils/supabase';

interface InputProps {
  label: string;
  placeHolder?: string;
  secure?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  numLines?: number;
  onChangeHandler?: (text: string) => void;
  validate?: () => void;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
}

export default function Input({
  label,
  placeHolder,
  secure,
  leftIcon,
  rightIcon,
  numLines = 1,
  onChangeHandler,
  validate,
  errorMessage,
  disabled = false,
  value,
}: InputProps): React.JSX.Element {
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

  if (!member && id != null) {
    return <Text>Member not found</Text>;
  }

  const classNames = [];

  if (disabled) {
    classNames.push(' bg-gray-200 rounded-xl ');
    errorMessage = 'Contact Admin to change this field';
  }

  return (
    <>
      <View className={classNames.join(' ') + 'flex-row place-items-center p-2 '}>
        <Text className="mr-auto">{label}</Text>
        <View className="w-2/3 flex-row rounded-xl border-2 border-gray-400">
          <View>{leftIcon}</View>
          <TextInput
            placeholder={placeHolder ? placeHolder : label ? `Enter ${label}` : ''}
            defaultValue={placeHolder}
            secureTextEntry={secure}
            id={label}
            onChangeText={onChangeHandler}
            onEndEditing={validate}
            multiline={numLines > 1}
            numberOfLines={numLines}
            className="m-2 mr-auto"
            readOnly={disabled}
          />
          <View>{rightIcon}</View>
        </View>
      </View>
      <Text className="pl-10 align-middle text-red-600">{errorMessage}</Text>
    </>
  );
}
