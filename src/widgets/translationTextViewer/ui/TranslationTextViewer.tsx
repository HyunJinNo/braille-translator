import { tw } from '@src/shared/lib/utils';
import { ScrollView, Text, View } from 'react-native';

export const TranslationTextViewer = () => {
  return (
    <View style={tw`bg-white`}>
      <ScrollView style={tw`h-40 border-b border-t border-gray-400`}>
        <Text style={tw`pt-2 text-xl text-gray-400`}>인식된 글자</Text>
      </ScrollView>
      <ScrollView style={tw`h-40`}>
        <Text style={tw`pt-2 text-xl text-gray-400`}>번역된 글자</Text>
      </ScrollView>
    </View>
  );

  // TODO
  //
  // return (
  //   <View style={tw`bg-white`}>
  //     <ScrollView style={tw`h-40 border-b border-t border-gray-400`}>
  //       <Text style={tw`pt-2 text-xl`}>남자장애인화장실</Text>
  //     </ScrollView>
  //     <ScrollView style={tw`h-40`}>
  //       <Text style={tw`pt-2 text-xl`}>⠉⠢⠨⠨⠶⠗⠟⠚⠧⠨⠶⠠⠕⠂</Text>
  //     </ScrollView>
  //   </View>
  // );
};
