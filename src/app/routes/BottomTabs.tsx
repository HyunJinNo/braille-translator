import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './navigationTypes';
import { HomeScreen } from '@src/pages/home';
import { SettingScreen } from '@src/pages/setting';
import { tw } from '@src/shared/lib/utils';
import { HistoryIcon, HomeIcon, SettingIcon } from '@src/shared/ui/icon';
import { COLOR } from '@src/shared/config';
import { TopTabs } from './TopTabs';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: tw`ml-px text-lg`,
        tabBarStyle: tw`h-14`,
        tabBarLabelStyle: tw`text-xs`,
        tabBarInactiveTintColor: COLOR['gray-400'],
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarActiveTintColor: COLOR['fuchsia-400'],
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="topTabs"
        component={TopTabs}
        options={{
          title: '번역 기록',
          tabBarActiveTintColor: COLOR['green-400'],
          tabBarIcon: HistoryIcon,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: '설정',
          tabBarActiveTintColor: COLOR['blue-400'],
          tabBarIcon: SettingIcon,
        }}
      />
    </Tab.Navigator>
  );
};
