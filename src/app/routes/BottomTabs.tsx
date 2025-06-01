import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './navigationTypes';
import { HomeScreen } from '@src/pages/home';
import { SettingScreen } from '@src/pages/setting';
import { HistoryScreen } from '@src/pages/history';
import { Image } from 'react-native';
import { tw } from '@src/shared/lib/utils';

interface IconProps {
  focused: boolean;
}

const HomeIcon = ({ focused }: IconProps) => {
  return (
    <Image
      style={tw`h-6 w-6`}
      source={
        focused
          ? require('@assets/icons/home-active.png')
          : require('@assets/icons/home.png')
      }
    />
  );
};

const HistoryIcon = ({ focused }: IconProps) => {
  return (
    <Image
      style={tw`h-6 w-6`}
      source={
        focused
          ? require('@assets/icons/history-active.png')
          : require('@assets/icons/history.png')
      }
    />
  );
};

const SettingIcon = ({ focused }: IconProps) => {
  return (
    <Image
      style={tw`h-6 w-6`}
      source={
        focused
          ? require('@assets/icons/setting-active.png')
          : require('@assets/icons/setting.png')
      }
    />
  );
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '홈', tabBarIcon: HomeIcon }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: '번역 기록', tabBarIcon: HistoryIcon }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: '설정', tabBarIcon: SettingIcon }}
      />
    </Tab.Navigator>
  );
};
