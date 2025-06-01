import { tw } from '@src/shared/lib/utils';
import { HomeButton } from '@src/shared/ui/button';
import { FlatList, View } from 'react-native';

const data = [
  {
    source: require('@assets/icons/hangul-scan-icon.png'),
    title: '한글→점자',
    description: ['카메라로 스캔한', '한글을 점자로', '번역합니다.'],
    buttonStyle: 'border-fuchsia-200 bg-fuchsia-50',
    textColor: 'text-fuchsia-400',
  },
  {
    source: require('@assets/icons/braille-scan-icon.png'),
    title: '한글→점자',
    description: ['카메라로 스캔한', '점자를 한글로', '번역합니다.'],
    buttonStyle: 'border-green-200 bg-green-50',
    textColor: 'text-green-400',
  },
  {
    source: require('@assets/icons/hangul-to-braille-icon.png'),
    title: '한글→점자',
    description: ['사진 내', '한글을 점자로', '번역합니다.'],
    buttonStyle: 'border-blue-200 bg-blue-50',
    textColor: 'text-blue-400',
  },
  {
    source: require('@assets/icons/braille-to-hangul-icon.png'),
    title: '한글→점자',
    description: ['사진 내', '점자를 한글로', '번역합니다.'],
    buttonStyle: 'border-cyan-200 bg-cyan-50',
    textColor: 'text-cyan-400',
  },
];

export const HomeScreen = () => {
  return (
    <View style={tw`flex h-full flex-col items-center justify-center bg-white`}>
      <FlatList
        contentContainerStyle={tw`flex h-full min-w-full flex-col justify-center gap-5 px-4`}
        columnWrapperStyle={tw`gap-5`}
        data={data}
        renderItem={({ item }) => (
          <HomeButton
            source={item.source}
            title={item.title}
            description={item.description}
            buttonStyle={item.buttonStyle}
            textColor={item.textColor}
          />
        )}
        keyExtractor={(item) => item.description.join(' ')}
        numColumns={2}
      />
    </View>
  );
};
