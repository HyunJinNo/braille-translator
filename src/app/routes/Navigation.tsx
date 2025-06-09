import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';
import { BottomTabs } from './BottomTabs';
import {
  CameraTranslationScreen,
  PictureTranslationScreen,
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
          name="CameraTranslation"
          component={CameraTranslationScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
