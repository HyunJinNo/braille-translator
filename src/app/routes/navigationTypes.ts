import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  BottomTabs: undefined;
  topTabs: undefined;
  Home: undefined;
  HangulToBrailleHistory: undefined;
  BrailleToHangulHistory: undefined;
  Setting: undefined;
  CameraTranslation: { headerTitle: string };
  PictureTranslation: { headerTitle: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }

  interface RootStackScreenProps<T extends keyof RootStackParamList> {
    navigation: NativeStackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
  }
}
