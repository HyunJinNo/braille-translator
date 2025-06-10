import { tw } from '@src/shared/lib/utils';
import { Text, View } from 'react-native';

interface FilterProps {
  title?: string;
  children: React.ReactNode;
}

export const Filter = ({ title, children }: FilterProps) => {
  return (
    <View style={tw`relative flex-1`}>
      {children}
      <View
        style={tw`absolute left-4 right-4 top-1/2 h-24 -translate-y-12 border-2 border-white`}
      />
      <View
        style={tw`absolute bottom-1/2 left-0 right-0 top-0 -translate-y-12 bg-black/50`}
      />
      <View
        style={tw`absolute left-0 top-1/2 h-24 w-4 -translate-y-12 bg-black/50`}
      />
      <View
        style={tw`absolute right-0 top-1/2 h-24 w-4 -translate-y-12 bg-black/50`}
      />
      <View
        style={tw`absolute bottom-0 left-0 right-0 top-1/2 translate-y-12 bg-black/50`}
      />
      <Text
        style={tw`absolute left-0 right-0 top-1/2 translate-y-14 text-center text-base text-white`}>
        {title}
      </Text>
    </View>
  );
};
