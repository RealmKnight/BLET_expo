import Feather from '@expo/vector-icons/Feather';
import { Redirect, Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MemberListItem from '~/components/MemberListItem';

import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import { combineDWPArrays } from '~/components/RosterFunctions';

export default function Home() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchDWPMembers();
  }, []);

  const fetchDWPMembers = async () => {
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

    const dwpMembers = await supabase
      .from('members')
      .select('*')
      .eq('status', 'ACTIVE')
      .eq('system_sen_type', 'DWP')
      .order('prior_vac_sys');
    setMembers(dwpMembers.data || []);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'DWP Roster' }} />
      <View>
        <View className="items-center">
          <Text className="text-2xl font-semibold uppercase">DWP Roster</Text>
          <Pressable className="m-2 flex-row">
            <Text className="mr-2">Search</Text>
            <Feather name="search" size={20} color="black" />
          </Pressable>
        </View>
        <View className="ml-auto p-3 pr-5">
          <Pressable className=" m-1 flex-row">
            <Text>Recalculate Roster </Text>
            <Feather name="check-circle" size={20} color="black" />
          </Pressable>
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
