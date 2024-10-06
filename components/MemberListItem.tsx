import Feather from '@expo/vector-icons/Feather';
import { View, Text } from 'react-native';

export default function MemberListItem({ member }) {
  return (
    <View className="flex-1 place-items-center pb-10">
      <View className="flex-row items-center  border-b-4 border-gray-400">
        <View className="pb-3 pr-4">
          <Text className="font-bold text-pink-500">Rank</Text>
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
            <Text className="mr-auto text-blue-500">{member.prior_sen_type}</Text>
            <Text className="pl-1 text-blue-500">{member.prior_sen_rank}</Text>
          </View>
          <View className="flex-row">
            <Text className="mr-auto text-green-500">{member.engineer_date}</Text>
            <Text className="pl-1 text-gray-400">{member.company_hire_date}</Text>
          </View>
          <View className="flex-row place-items-center ">
            <Text className="mr-auto text-lg text-amber-700">Zone {member.zone}</Text>
            <Text className="pl-1 text-yellow-600">Div {member.division}</Text>
          </View>
          <View className="flex-row">
            <Text className="mr-auto"> </Text>
            <Feather name="edit" size={20} color="black" />
            <Feather name="share" size={20} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
}
