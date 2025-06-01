import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './navigationTypes';
import { HomeScreen } from '@src/pages/home';
import { SettingScreen } from '@src/pages/setting';
import { HistoryScreen } from '@src/pages/history';
import { tw } from '@src/shared/lib/utils';
import { HistoryIcon, HomeIcon, SettingIcon } from '@src/shared/ui/icon';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: tw`text-lg`,
        tabBarStyle: tw`h-14`,
        tabBarLabelStyle: tw`text-xs`,
        tabBarInactiveTintColor: '#9CA3AF',
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarActiveTintColor: '#E879F9',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: '번역 기록',
          tabBarActiveTintColor: '#34D399',
          tabBarIcon: HistoryIcon,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: '설정',
          tabBarActiveTintColor: '#60A5FA',
          tabBarIcon: SettingIcon,
        }}
      />
    </Tab.Navigator>
  );
};
