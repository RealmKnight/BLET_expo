import Feather from '@expo/vector-icons/Feather';
import { Link, Redirect, Stack } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MemberListItem from '~/components/MemberListItem';

import members from '~/assets/members.json';
import { useAuth } from '~/contexts/AuthProvider';
import { useEffect, useState } from 'react';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchWCMembers();
  }, []);

  const fetchWCMembers = async () => {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('system_sen_type', 'WC')
      .order('prior_vac_sys');
    const { data: dmir, error: error2 } = await supabase
      .from('members')
      .select('*')
      .eq('system_sen_type', 'DMIR')
      .order('prior_vac_sys');
    const { data: dwp, error: error3 } = await supabase
      .from('members')
      .select('*')
      .eq('system_sen_type', 'DWP')
      .order('prior_vac_sys');
    const { data: sys1, error: error4 } = await supabase
      .from('members')
      .select('*')
      .eq('system_sen_type', 'SYS1')
      .order('prior_vac_sys');
    const { data: eje, error: error5 } = await supabase
      .from('members')
      .select('*')
      .eq('system_sen_type', 'EJ&E')
      .order('prior_vac_sys');
    const { data: sys2, error: error6 } = await supabase
      .from('members')
      .select('*')
      .eq('system_sen_type', 'SYS2')
      .order('prior_vac_sys');
    const combinedData = [
      ...(data || []),
      ...(dmir || []),
      ...(dwp || []),
      ...(sys1 || []),
      ...(eje || []),
      ...(sys2 || []),
    ];
    setMembers(combinedData);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Full Member List' }} />
      <View>
        <View>
          <View className="items-center">
            <Text className="text-2xl font-semibold uppercase">
              Full Member List Including In-Active Members
            </Text>
            <Text className="p-4">
              This is a list of all members including those who have retired or otherwise been
              listed as inactive for Union Purposes since January when the new Rosters came out.
              Ordered by Prior Senoirity System and Prior System Rank, WC -&gt; DMIR -&gt; DWP -&gt;
              SYS1 -&gt; EJ&E -&gt; SYS2 .
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Pressable className="m-2 flex-row pl-2">
              <Text className="mr-2">Search</Text>
              <Feather name="search" size={20} color="black" />
            </Pressable>
            <Pressable onPress={() => {}} className=" m-2 flex-row pr-2">
              <Text className="mr-2">Filter</Text>
              <Feather name="filter" size={20} color="black" />
            </Pressable>
            <Link href="/newmember" className=" m-2 flex-row pr-2">
              <Text className="mr-2">Add New Member</Text>
              <Feather name="user-plus" size={20} color="black" />
            </Link>
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
          <MemberListItem member={item} index={index + 1} fullRoster={true} />
        )}
        className="bg-gray-200"
      />
    </>
  );
}
