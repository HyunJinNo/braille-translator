import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigationTypes';
import { HomeScreen } from '@src/pages/home';
import { SettingScreen } from '@src/pages/setting';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Setting" children={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
