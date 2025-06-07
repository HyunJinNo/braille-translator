import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from './navigationTypes';
import {
  BrailleToHangulHistoryScreen,
  HangulToBrailleHistoryScreen,
} from '@src/pages/history';
import { tw } from '@src/shared/lib/utils';
import { COLOR } from '@src/shared/config';
import { BrailleToHangulIcon, HangulToBrailleIcon } from '@src/shared/ui/icon';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export const TopTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HangulToBrailleHistory"
      screenOptions={{
        tabBarStyle: tw`h-12 bg-green-50`,
        tabBarLabelStyle: tw`text-sm`,
        tabBarIndicatorStyle: tw`bg-green-400`,
        tabBarActiveTintColor: COLOR['green-400'],
        tabBarInactiveTintColor: COLOR['gray-400'],
        tabBarItemStyle: tw`flex flex-row items-center gap-1`,
      }}>
      <Tab.Screen
        name="HangulToBrailleHistory"
        component={HangulToBrailleHistoryScreen}
        options={{ title: '한글→점자', tabBarIcon: HangulToBrailleIcon }}
      />
      <Tab.Screen
        name="BrailleToHangulHistory"
        component={BrailleToHangulHistoryScreen}
        options={{ title: '점자→한글', tabBarIcon: BrailleToHangulIcon }}
      />
    </Tab.Navigator>
  );
};
