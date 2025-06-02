import { tw } from '@src/shared/lib/utils';
import { Image, Pressable, Text, View } from 'react-native';

export const SettingScreen = () => {
  return (
    <View style={tw`h-full bg-white`}>
      <Pressable style={tw`flex h-24 flex-row items-center gap-4 px-4`}>
        <Image
          style={tw`h-10 w-10`}
          source={require('@assets/icons/speed-icon.png')}
        />
        <View style={tw`flex flex-col items-start gap-1`}>
          <Text style={tw`text-base font-semibold`}>음성 속도</Text>
          <Text style={tw`text-xs`}>
            음성으로 읽어주는 기능의 재생 속도를 조절합니다.
          </Text>
          <Text style={tw`text-xs text-blue-400`}>느림</Text>
        </View>
      </Pressable>

      <Pressable style={tw`flex h-24 flex-row items-center gap-4 px-4`}>
        <Image
          style={tw`h-10 w-10`}
          source={require('@assets/icons/font-icon.png')}
        />
        <View style={tw`flex flex-col items-start gap-1`}>
          <Text style={tw`text-base font-semibold`}>글자 크기</Text>
          <Text style={tw`text-xs`}>출력되는 글자의 크기를 조절합니다.</Text>
          <Text style={tw`text-xs text-blue-400`}>중간</Text>
        </View>
      </Pressable>
    </View>
  );
};
