import { tw } from '@src/shared/lib/utils';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingOverlayProps {
  loading: boolean;
}

export const LoadingOverlay = ({ loading }: LoadingOverlayProps) => {
  if (!loading) {
    return null;
  }

  return (
    <View
      style={tw`absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/50`}>
      <ActivityIndicator size={80} color="#FFFFFF" />
      <Text style={tw`text-xl font-semibold text-white`}>분석 중...</Text>
    </View>
  );
};
