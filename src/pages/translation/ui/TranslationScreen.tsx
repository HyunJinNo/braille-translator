import { tw } from '@src/shared/lib/utils';
import { ControlBar } from '@src/widgets/controlBar';
import { View } from 'react-native';

export const TranslationScreen = () => {
  return (
    <View style={tw`px-4`}>
      <ControlBar />
    </View>
  );
};
