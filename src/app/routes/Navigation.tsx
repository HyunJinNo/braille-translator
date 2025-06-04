import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';
import { BottomTabs } from './BottomTabs';
import {
  PictureTranslationScreen,
  RealTimeTranslationScreen,
} from '@src/pages/translation';
import { tw } from '@src/shared/lib/utils';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabs">
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PictureTranslation"
          component={PictureTranslationScreen}
          options={({ route }) => ({
            title: route.params.headerTitle,
            headerTitleStyle: tw`text-lg`,
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="RealTimeTranslation"
          component={RealTimeTranslationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
