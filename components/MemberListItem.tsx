import React, { memo } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { View, Text } from 'react-native';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import { Database } from '~/database.types';

export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  pin_number: number;
  system_sen_type: Database['public']['Enums']['sys_seniority_type'] | null;
  prior_vac_sys: number | null;
  engineer_date: string;
  company_hire_date: string;
  zone: Database['public']['Enums']['zone'] | null;
  division: Database['public']['Enums']['division'] | null;
  status: string;
  misc_notes: string;
  date_of_birth: string;
}

const MemberListItem = memo(function MemberListItem({
  member,
  index,
  fullRoster,
}: {
  member: Member;
  index: number;
  fullRoster?: boolean;
}): React.JSX.Element {
  const classNames = [];

  const dataNotes =
    member.misc_notes === '' || member.misc_notes === null || member.misc_notes === undefined;

  if (member.status === 'IN-ACTIVE') {
    classNames.push(' text-red-500 ');
  }
  return (
    <>
      <View className="m-3 place-items-center border-b-4 border-gray-300 bg-white pb-3">
        <View className="flex-row items-center justify-items-start">
          <View className="pb-3 pr-4">
            <Text className="font-bold text-pink-500">Rank {index}</Text>
          </View>
          <View className="flex-column">
            <View className="flex-row">
              <View className="mr-auto flex-row">
                <Text>
                  {member.first_name} {member.last_name}
                </Text>
              </View>
              <Text className="pl-1 text-red-600">{member.pin_number}</Text>
            </View>
            <View className="flex-row">
              <Text className="mr-auto text-blue-500">{member.system_sen_type}</Text>
              <Text className="pl-1 pr-1 text-blue-500">{member.prior_vac_sys}</Text>
              <Text className="mr-auto text-green-500">
                {dayjs(member.engineer_date).format('MM/DD/YYYY')}
              </Text>
              <Text className="pl-1 text-gray-400">
                {dayjs(member.company_hire_date).format('MM/DD/YYYY')}
              </Text>
            </View>
            <View className="flex-row justify-between ">
              <Text className=" text-amber-700">{member.zone} </Text>
              {member.date_of_birth && dayjs(member.date_of_birth).isValid() && (
                <Text className="text-sm text-blue-400">
                  {dayjs(member.date_of_birth).format('MM/DD/YYYY')}
                </Text>
              )}
              {member.division && (
                <Text className="pl-1 text-yellow-600">Div {member.division}</Text>
              )}
            </View>
          </View>
          {/* Seperate column */}
          <View className=" flex-col p-2">
            <Text>{dataNotes ? `` : `${member.misc_notes}`}</Text>
            <Text>
              {!fullRoster ? (
                ' '
              ) : (
                <>
                  <Text className={classNames.join(' ') + ' '}>{member.status}</Text>
                </>
              )}
            </Text>
            <View className="flex-row">
              <Text className="mr-auto"> </Text>
              <Link href={`/${member.pin_number.toString()}`}>
                <Feather name="edit" size={20} color="black" />
              </Link>
              <Feather name="share" size={20} color="black" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
});

export default MemberListItem;
