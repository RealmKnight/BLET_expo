import Feather from '@expo/vector-icons/Feather';
import { View, Text } from 'react-native';
import dayjs from 'dayjs';
import { Link } from 'expo-router';

export interface Member {
  first_name: string;
  last_name: string;
  pin_number: number;
  system_sen_type: string;
  prior_vac_sys: string;
  engineer_date: string;
  company_hire_date: string;
  zone: string;
  division: string;
  status: string;
  misc_notes: string;
}

export default function MemberListItem({
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
      <View className="m-3 place-items-center border-b-4 border-gray-300 pb-3">
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
            <View className="flex-row place-items-center ">
              <Text className="mr-auto text-lg text-amber-700">{member.zone} </Text>
              <Text className="pl-1 text-yellow-600">Div {member.division}</Text>
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
}
