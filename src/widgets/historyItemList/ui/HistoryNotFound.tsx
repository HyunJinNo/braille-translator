import { tw } from '@src/shared/lib/utils';
import { Image, Text, View } from 'react-native';

export const HistoryNotFound = () => {
  return (
    <View style={tw`flex flex-col items-center gap-4`}>
      <Image source={require('@assets/icon/translation-history-icon.png')} />
      <Text>번역 기록이 없습니다.</Text>
    </View>
  );
};
