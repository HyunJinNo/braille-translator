import { COLOR } from '@src/shared/config';
import { tw } from '@src/shared/lib/utils';
import { TranslationTextViewer } from '@src/widgets/translationTextViewer';
import { Pressable, Text, View } from 'react-native';

export const PictureTranslationScreen = () => {
  return (
    <View style={tw`flex h-full flex-col justify-between bg-white`}>
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <Pressable
          style={tw`flex h-80 w-80 items-center justify-center rounded-2xl border border-dashed border-gray-400 bg-gray-100`}
          android_ripple={{ color: COLOR['gray-200'] }}>
          <Text style={tw`text-base text-gray-400`}>사진을 선택해 주세요.</Text>
        </Pressable>
      </View>
      <View style={tw`px-4`}>
        <TranslationTextViewer />
      </View>
    </View>
  );
};
