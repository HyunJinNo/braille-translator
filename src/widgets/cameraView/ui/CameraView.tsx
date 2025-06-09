import { tw } from '@src/shared/lib/utils';
import { Text, View } from 'react-native';
import { Camera, CameraDevice } from 'react-native-vision-camera';

interface CameraViewProps {
  device?: CameraDevice;
  isActive: boolean;
  camera: React.RefObject<Camera | null>;
}

export const CameraView = ({ device, isActive, camera }: CameraViewProps) => {
  if (!device) {
    return <View style={tw`w-full flex-1 bg-black`} />;
  }

  return (
    <View style={tw`relative flex-1`}>
      <Camera
        style={tw`h-full w-full`}
        device={device}
        isActive={isActive}
        photo={true}
        ref={camera}
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
      <View
        style={tw`absolute left-4 right-4 top-1/2 h-24 -translate-y-12 border-2 border-white`}
      />
      <Text
        style={tw`absolute left-0 right-0 top-1/2 translate-y-14 text-center text-base text-white`}>
        {isActive
          ? '텍스트를 박스에 비춰 주세요'
          : '아래 재생 버튼을 눌러 주세요'}
      </Text>
    </View>
  );
};
