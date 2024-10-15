import { Redirect, Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/TabBarIcon';
import { useAuth } from '~/contexts/AuthProvider';

export default function TabLayout() {
  const { isAuthenticated } = useAuth() as { isAuthenticated: boolean };

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'WC ',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="DMIR Roster"
        options={{
          title: 'DMIR ',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="DWP Roster"
        options={{
          title: 'DWP ',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="EJE Roster"
        options={{
          title: 'EJ&E ',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
