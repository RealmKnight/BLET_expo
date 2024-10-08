import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';
import { useAuth } from '~/contexts/AuthProvider';
import { Pressable } from 'react-native';
import { supabase } from '~/utils/supabase';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
        headerRight: () => (
          <Pressable onPress={() => supabase.auth.signOut()} className="pr-4">
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        ),
      }}
    />
    <Drawer.Screen
      name="Rosters"
      options={{
        headerTitle: 'Rosters',
        drawerLabel: 'Rosters',
        drawerIcon: ({ size, color }) => <FontAwesome name="list-alt" size={size} color={color} />,
        headerRight: () => (
          <Pressable onPress={() => supabase.auth.signOut()} className="pr-4">
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        ),
      }}
    />
    <Drawer.Screen
      name="Full Member List"
      options={{
        headerTitle: 'Full Member List',
        drawerLabel: 'Full Member List',
        drawerIcon: ({ size, color }) => <Feather name="users" size={size} color={color} />,
        headerRight: () => (
          <Pressable onPress={() => supabase.auth.signOut()} className="pr-4">
            <MaterialIcons name="logout" size={24} color="black" />
          </Pressable>
        ),
      }}
    />
  </Drawer>
);

export default DrawerLayout;
