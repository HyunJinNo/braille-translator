import { tw } from '@src/shared/lib/utils';
import { HomeButtonList } from '@src/widgets/homeButtonList';
import { View } from 'react-native';

export const HomeScreen = () => {
  return (
    <View style={tw`flex h-full flex-col items-center justify-center bg-white`}>
      <HomeButtonList />
    </View>
  );
};
