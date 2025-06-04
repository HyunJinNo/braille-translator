import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';
import { BottomTabs } from './BottomTabs';
import { RealTimeTranslationScreen } from '@src/pages/translation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen
          name="RealTimeTranslation"
          component={RealTimeTranslationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
