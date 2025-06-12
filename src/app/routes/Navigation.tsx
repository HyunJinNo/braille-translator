import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';
import { BottomTabs } from './BottomTabs';
import { CameraTranslationScreen } from '@src/pages/translation';
import { tw } from '@src/shared/lib/utils';
import { HangulImageTranslationScreen } from '@src/pages/hangulImageTranslation';
import { BrailleImageTranslationScreen } from '@src/pages/brailleImageTranslation';

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
          name="BrailleImageTranslation"
          component={BrailleImageTranslationScreen}
          options={{
            title: '점자 이미지 번역',
            headerTitleStyle: tw`text-lg`,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="HangulImageTranslation"
          component={HangulImageTranslationScreen}
          options={{
            title: '한글 이미지 번역',
            headerTitleStyle: tw`text-lg`,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
