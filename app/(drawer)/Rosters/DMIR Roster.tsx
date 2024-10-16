import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import MemberListItem, { Member } from '~/components/MemberListItem';
import React, { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';

import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';
import { combineDMIRArrays } from '~/components/RosterFunctions';
import { useRoster } from '~/contexts/RosterContext';
import useRealtimeSubscription from '~/hooks/useRealtimeSubscription';

export default function Home() {
  const [members, setMembers] = useState<any[]>([]);
  const { shouldUpdateRoster } = useRoster();

  useEffect(() => {
    fetchDMIRMembers();
  }, [shouldUpdateRoster]);

  useRealtimeSubscription();

  const fetchDMIRMembers = async () => {
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

    const combinedData = combineDMIRArrays(
      await wcmembers(),
      await dmirmembers(),
      await dwpmembers(),
      await sys1members(),
      await ejemembers(),
      await sys2members()
    );
    setMembers(combinedData);
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Member; index: number }) => (
      <MemberListItem member={item} index={index + 1} fullRoster={false} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Member) => item.pin_number.toString(), []);

  return (
    <>
      <Stack.Screen options={{ title: 'DMIR ' }} />
      <View>
        <View>
          <View className="items-center">
            <Text className="text-2xl font-semibold uppercase">DMIR Roster</Text>
          </View>
          <View className="flex-row justify-between">
            <Pressable className="m-2 flex-row">
              <Text className="mr-2 pl-2">Search</Text>
              <Feather name="search" size={20} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
      <View className="flex-1 bg-gray-200">
        <FlashList
          data={members}
          renderItem={renderItem}
          estimatedItemSize={600}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ backgroundColor: 'rgb(229, 231, 235)' }} // This is equivalent to bg-gray-200
        />
      </View>
    </>
  );
}
