import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="index"
      options={{
        headerTitle: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Rosters"
      options={{
        headerTitle: 'Rosters',
        drawerLabel: 'Rosters',
        drawerIcon: ({ size, color }) => <FontAwesome name="list-alt" size={size} color={color} />,
        headerRight: () => (
          <Link href="/modal" asChild>
            <HeaderButton />
          </Link>
        ),
      }}
    />
    <Drawer.Screen
      name="Full Member List"
      options={{
        headerTitle: 'Full Member List',
        drawerLabel: 'Full Member List',
        drawerIcon: ({ size, color }) => <Feather name="users" size={size} color={color} />,
      }}
    />
  </Drawer>
);

export default DrawerLayout;
