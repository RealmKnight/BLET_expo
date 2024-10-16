import { observer } from '@legendapp/state/react';
import { members$, setupRealtimeSubscription, fetchInitialMembers } from '~/utils/SupaLegend';
import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { View, Text, Pressable, Dimensions } from 'react-native';
import MemberListItem, { Member } from '~/components/MemberListItem';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { combineWCArrays } from '~/components/RosterFunctions';

const Home = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const members = members$.get();

  useEffect(() => {
    console.log('Home component mounted');
    const fetchData = async () => {
      setIsLoading(true);
      await fetchInitialMembers();
      setIsLoading(false);
    };
    fetchData();
    const unsubscribe = setupRealtimeSubscription();

    return () => {
      console.log('Home component unmounting');
      unsubscribe();
    };
  }, []);

  const sortedMembers = useMemo(() => {
    const membersArray = Object.values(members).filter((m) => m.status === 'ACTIVE');
    const sortByPriorVacSys = (a: Member, b: Member) => {
      if (a.prior_vac_sys === null || b.prior_vac_sys === null) {
        return 0; // Handle null values
      }
      if (typeof a.prior_vac_sys === 'number' && typeof b.prior_vac_sys === 'number') {
        return a.prior_vac_sys - b.prior_vac_sys; // Compare numbers
      }
      return String(a.prior_vac_sys).localeCompare(String(b.prior_vac_sys)); // Compare as strings
    };

    const wcmembers = membersArray
      .filter((m) => m.system_sen_type === 'WC')
      .sort(sortByPriorVacSys);
    const dmirmembers = membersArray
      .filter((m) => m.system_sen_type === 'DMIR')
      .sort(sortByPriorVacSys);
    const dwpmembers = membersArray
      .filter((m) => m.system_sen_type === 'DWP')
      .sort(sortByPriorVacSys);
    const sys1members = membersArray
      .filter((m) => m.system_sen_type === 'SYS1')
      .sort(sortByPriorVacSys);
    const ejemembers = membersArray
      .filter((m) => m.system_sen_type === 'EJ&E')
      .sort(sortByPriorVacSys);
    const sys2members = membersArray
      .filter((m) => m.system_sen_type === 'SYS2')
      .sort(sortByPriorVacSys);

    const sortedArray = combineWCArrays(
      wcmembers,
      dmirmembers,
      dwpmembers,
      sys1members,
      ejemembers,
      sys2members
    );
    return sortedArray;
  }, [members]);

  const renderItem = useCallback(
    ({ item, index }: { item: Member; index: number }) => (
      <MemberListItem member={item} index={index + 1} fullRoster={false} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Member) => {
    if (item && item.id) {
      return item.id.toString();
    }
    return `member-${item?.pin_number || Math.random()}`;
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'WC ' }} />
      <View
        style={{
          flex: 1,
          height: Dimensions.get('window').height,
          backgroundColor: 'rgb(229, 231, 235)',
        }}>
        {isLoading ? (
          <Text>Loading members...</Text>
        ) : sortedMembers.length > 0 ? (
          <FlashList
            data={sortedMembers}
            renderItem={renderItem}
            estimatedItemSize={100}
            keyExtractor={keyExtractor}
          />
        ) : (
          <Text>No members available</Text>
        )}
      </View>
    </>
  );
});

export default Home;
