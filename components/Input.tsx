import React from 'react';
import { View, Text, TextInput } from 'react-native';
import MemberListItem from '~/components/MemberListItem';

import members from '~/assets/members.json';
import { useLocalSearchParams } from 'expo-router';

export default function Input({
  label,
  placeHolder,
  secure,
  leftIcon,
  rightIcon,
  numLines,
  onChangeHandler,
  validate,
  errorMessage,
}): React.JSX.Element {
  const { id } = useLocalSearchParams();

  const member = members.find((m) => m.id.toString() === id);

  if (!member) {
    return <Text>Member not found</Text>;
  }
  return (
    <View className="flex-row place-items-center p-2">
      <Text className="mr-auto">{label}</Text>
      <View className="flex-row rounded-xl border-2 border-gray-400">
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
          className="m-2"
        />
        <View>{rightIcon}</View>
      </View>
      <Text className="text-red-600">{errorMessage}</Text>
    </View>
  );
}
