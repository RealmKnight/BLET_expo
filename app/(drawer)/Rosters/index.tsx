import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MemberListItem from '~/components/MemberListItem';

import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import { combineWCArrays } from '~/components/RosterFunctions';

export default function Home() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchWCMembers();
  }, []);

  const fetchWCMembers = async () => {
    const wcmembers = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('status', 'ACTIVE')
        .eq('system_sen_type', 'WC')
        .order('prior_vac_sys');
      return data || [];
    };

    const dmirmembers = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('status', 'ACTIVE')
        .eq('system_sen_type', 'DMIR')
        .order('prior_vac_sys');
      return data || [];
    };

    const dwpmembers = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('status', 'ACTIVE')
        .eq('system_sen_type', 'DWP')
        .order('prior_vac_sys');
      return data || [];
    };

    const sys1members = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('status', 'ACTIVE')
        .eq('system_sen_type', 'SYS1')
        .order('prior_vac_sys');
      return data || [];
    };

    const ejemembers = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('status', 'ACTIVE')
        .eq('system_sen_type', 'EJ&E')
        .order('prior_vac_sys');
      return data || [];
    };

    const sys2members = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('status', 'ACTIVE')
        .eq('system_sen_type', 'SYS2')
        .order('prior_vac_sys');
      return data || [];
    };

    const combinedData = combineWCArrays(
      await wcmembers(),
      await dmirmembers(),
      await dwpmembers(),
      await sys1members(),
      await ejemembers(),
      await sys2members()
    );
    setMembers(combinedData);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'WC Roster' }} />
      <View>
        <View>
          <View className="items-center">
            <Text className="text-2xl font-semibold uppercase">WC Roster</Text>
          </View>
          <View className="flex-row justify-between">
            <Pressable className="m-2 flex-row pl-2">
              <Text className="mr-2">Search</Text>
              <Feather name="search" size={20} color="black" />
            </Pressable>
            <Pressable onPress={fetchWCMembers} className=" m-2 flex-row pr-2">
              <Text>Recalculate Roster </Text>
              <Feather name="check-circle" size={20} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        data={members}
        renderItem={({ item, index }) => (
          <MemberListItem member={item} index={index + 1} fullRoster={false} />
        )}
        className="bg-gray-200"
      />
    </>
  );
}
