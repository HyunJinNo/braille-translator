import { tw } from '@src/shared/lib/utils';
import { ControlBar } from '@src/widgets/controlBar';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { View } from 'react-native';

export const TranslationScreen = () => {
  return (
    <View>
      <View style={tw`h-full bg-black`} />
      <View style={tw`absolute bottom-0 z-10 w-full bg-white px-4`}>
        <ControlBar />
        <TranslationTextViewer />
      </View>
    </View>
  );
};
